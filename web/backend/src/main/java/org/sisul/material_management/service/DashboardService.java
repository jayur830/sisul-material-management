package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.projection.LogProjection;
import org.sisul.material_management.repository.LogRepository;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestLogPutDataVO;
import org.sisul.material_management.vo.RequestModifyStockVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {
    private final LogRepository logRepository;
    private final StockRepository stockRepository;

    public List<LogProjection> dashboardLog() {
        return this.logRepository.findAllByOrderByLogTimeDesc();
    }

    public LogProjection dashboardLogView(final String logTime, final String workClass, final String workerName) {
        return this.logRepository.findByLogTimeAndWorkClassAndWorkerName(logTime, workClass, workerName);
    }

    @Transactional
    public void modifyDashboardLog(final RequestLogPutDataVO request, MultipartFile...imgs) {
        String[] fileNames = uploadImage(imgs);

        List<Log> srcLogs = this.logRepository.findAllByCategoryAndItemOrderByLogTimeAsc(request.getCategory(), request.getItem()),
                dstLogs = srcLogs.stream()
                        .map(Log::clone)
                        .collect(Collectors.toList());
        final int firstLastCount = srcLogs.get(0).getLastCount() + srcLogs.get(0).getCount() * (srcLogs.get(0).getInOut() == 0 ? -1 : 1);
        for (Log log : dstLogs)
            if (log.getLogTime().equals(request.getSrcLogTime())) {
                if (log.getImg1() != null) new File("/sisul/img/" + log.getImg1()).delete();
                if (log.getImg2() != null) new File("/sisul/img/" + log.getImg2()).delete();
                if (log.getImg3() != null) new File("/sisul/img/" + log.getImg3()).delete();

                log.setLogTime(request.getLogTime());
                log.setInOut(request.getInOut());
                log.setCount(request.getCount());
                log.setUnit(request.getUnit());
                log.setWorkClass(request.getWorkClass());
                log.setWorkerName(request.getWorkerName());
                log.setImg1(fileNames[0]);
                log.setImg2(fileNames[1]);
                log.setImg3(fileNames[2]);
            }
        dstLogs.sort(Comparator.comparing(Log::getLogTime));

        for (int i = 0; i < dstLogs.size(); ++i) {
            int preLastCount = -99999999;
            if (i == 0 && dstLogs.get(0).getLastCount() != firstLastCount + dstLogs.get(0).getCount() * (dstLogs.get(0).getInOut() == 0 ? 1 : -1))
                preLastCount = firstLastCount;
            else if (i != 0 && dstLogs.get(i).getLastCount() != dstLogs.get(i - 1).getLastCount() + dstLogs.get(i - 1).getCount() * (dstLogs.get(i - 1).getInOut() == 0 ? 1 : -1))
                preLastCount = dstLogs.get(i - 1).getLastCount();
            if (preLastCount != -99999999) {
                for (int j = i; j < dstLogs.size(); ++j) {
                    final int lastCount = preLastCount + dstLogs.get(j).getCount() * (dstLogs.get(j).getInOut() == 0 ? 1 : -1);
                    dstLogs.get(j).setLastCount(lastCount);
                    preLastCount = lastCount;
                }
                break;
            }
        }
        this.logRepository.saveAll(dstLogs);
        if (this.stockRepository.findByCategoryAndItem(request.getCategory(), request.getItem()) != null)
            this.stockRepository.updateCountByCategoryAndItem(request.getCategory(), request.getItem(), dstLogs.get(dstLogs.size() - 1).getLastCount());
    }

    @Transactional
    public void removeDashboardLog(final String logTime, final String category, final String item) {
        List<Log> logs = this.logRepository.findAllByLogTimeAndCategoryAndItem(logTime, category, item);
        if (logs.size() == 1) {
            this.stockRepository.updateCountByCategoryAndItem(category, item, logs.get(0).getLastCount() - logs.get(0).getCount() * (logs.get(0).getInOut() == 0 ? 1 : -1));
            this.logRepository.deleteAllByLogTimeAndStockId(logs.get(0).getLogTime(), logs.get(0).getStockId());
        } else {
            LogProjection _log = this.logRepository.findByLogTime(logTime);
            String img1 = _log.getImg1();
            String img2 = _log.getImg2();
            String img3 = _log.getImg3();
            if (img1 != null) new File("/sisul/img/" + img1).delete();
            if (img2 != null) new File("/sisul/img/" + img2).delete();
            if (img3 != null) new File("/sisul/img/" + img3).delete();
            final int count = _log.getCount() * (_log.getInOut() == 0 ? -1 : 1);
            Stock stock = this.stockRepository.findById(_log.getStockId()).get();
            this.logRepository.updateCountAllByLogTimeGreaterThan(count, logTime, stock.getStockId());
            this.logRepository.deleteByLogTime(_log.getLogTime());

            LogProjection lastLog = this.logRepository.findFirst1ByStockCategoryAndStockItemOrderByLogTimeDesc(stock.getCategory(), stock.getItem()).get(0);
            if (lastLog != null)
                this.stockRepository.updateCountByCategoryAndItem(
                        stock.getCategory(),
                        stock.getItem(),
                        lastLog.getLastCount());
            else
                this.stockRepository.addCountByCategoryAndItem(
                        stock.getCategory(),
                        stock.getItem(),
                        count);
        }
    }

    public List<Stock> dashboardStockList() {
        return this.stockRepository.findAllByAvailable(true);
    }

    public List<LogProjection> dashboardStockView(final int stockId) {
        return this.logRepository.findAllByStockIdOrderByLogTimeDesc(stockId);
    }

    @Deprecated
    @Transactional
    public void modifyDashboardStock(final RequestModifyStockVO request) {
        Stock stock = this.stockRepository.findByStockId(request.getStockId());
        final int count = request.getCount() - stock.getCount();
        this.stockRepository.updateCountByStockId(request.getCount(), request.getStockId());
        this.logRepository.updateCountAll(count, stock.getStockId());
    }

    public void getImage(final String fileName, ServletOutputStream outputStream) throws IOException {
        File imgFile = new File("/sisul/img/" + fileName);

        if (!imgFile.isFile() || !imgFile.exists()) imgFile = new File("/sisul/img/not_found.png");

        byte[] buf = new byte[1024];
        int readByte;
        int length;
        byte[] imgBuf;

        FileInputStream fileInputStream = null;
        ByteArrayOutputStream byteArrayOutputStream = null;

        try {
            fileInputStream = new FileInputStream(imgFile);
            byteArrayOutputStream = new ByteArrayOutputStream();

            while ((readByte = fileInputStream.read(buf)) != -1)
                byteArrayOutputStream.write(buf, 0, readByte);

            imgBuf = byteArrayOutputStream.toByteArray();
            length = imgBuf.length;
            outputStream.write(imgBuf, 0, length);
            outputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fileInputStream != null && byteArrayOutputStream != null && outputStream != null) {
                fileInputStream.close();
                byteArrayOutputStream.close();
                outputStream.close();
            }
        }
    }

    private String[] uploadImage(MultipartFile ...imgs) {
        String[] fileNames = new String[3];
        int i = 0;
        for (MultipartFile img : imgs) {
            if (img == null) continue;
            try {
                String fileName = Objects.requireNonNull(img.getOriginalFilename()).substring(0, img.getOriginalFilename().lastIndexOf("."));
                fileName += "_" + System.currentTimeMillis() + img.getOriginalFilename().substring(img.getOriginalFilename().lastIndexOf("."));
                byte[] bytes = img.getBytes();
                final String path = "/sisul/img/" + fileName;
                OutputStream outputStream = new FileOutputStream(new File(path));
                outputStream.write(bytes);
                outputStream.flush();
                outputStream.close();

                fileNames[i] = fileName;
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                ++i;
            }
        }
        return fileNames;
    }
}
