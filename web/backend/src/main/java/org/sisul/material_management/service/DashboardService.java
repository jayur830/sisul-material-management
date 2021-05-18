package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.LogRepository;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import java.io.*;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {
    private final LogRepository logRepository;
    private final StockRepository stockRepository;

    public List<Log> dashboardLog() {
        return this.logRepository.findAllByOrderByLogTimeDesc();
    }

    public Log dashboardLogView(final String logTime, final String workClass, final String workerName) {
        return this.logRepository.findByLogTimeAndWorkClassAndWorkerName(logTime, workClass, workerName);
    }

    @Transactional
    public void modifyDashboardLog(final RequestInsertLogVO request, MultipartFile...imgs) {
        uploadImage(imgs);

        Log log = this.logRepository.findByLogTime(request.getLogTime());
        final int subCount = log.getCount() * (log.getInOut() == 0 ? -1 : 1);

        log.setLastCount(log.getLastCount() + subCount);
        log.setWorkClass(request.getWorkClass());
        log.setWorkerName(request.getWorkerName());
        log.setInOut(request.getInOut());
        Stock stock = log.getStock();
        stock.setCategory(request.getCategory());
        stock.setItem(request.getItem());
        log.setUnit(request.getUnit());
        log.setImg1(imgs[0] == null ? null : imgs[0].getOriginalFilename());
        log.setImg2(imgs[1] == null ? null : imgs[1].getOriginalFilename());
        log.setImg3(imgs[2] == null ? null : imgs[2].getOriginalFilename());
        log.setLastCount(log.getLastCount() + request.getCount() * (request.getInOut() == 0 ? 1 : -1));

        this.logRepository.save(log);
        this.logRepository.updateCountAllByLogTimeGreaterThan(subCount, request.getCount() * (request.getInOut() == 0 ? 1 : -1), request.getLogTime());
    }

    @Transactional
    public void removeDashboardLog(final String logTime) {
        Log log = this.logRepository.findByLogTime(logTime);
        String img1 = log.getImg1();
        String img2 = log.getImg2();
        String img3 = log.getImg3();
        if (img1 != null) {
            File img = new File("src/main/resources/img/" + img1);
            if (img.isFile() && img.exists()) img.delete();
        }
        if (img2 != null) {
            File img = new File("src/main/resources/img/" + img2);
            if (img.isFile() && img.exists()) img.delete();
        }
        if (img3 != null) {
            File img = new File("src/main/resources/img/" + img3);
            if (img.isFile() && img.exists()) img.delete();
        }
        final int count = log.getCount() * (log.getInOut() == 0 ? -1 : 1);
        this.logRepository.updateCountAllByLogTimeGreaterThan(count, logTime);
        this.logRepository.delete(log);

        Stock stock = log.getStock();
        Log lastLog = this.logRepository.findFirst1ByStockCategoryAndStockItemOrderByLogTimeDesc(stock.getCategory(), stock.getItem());
        if (lastLog != null)
            this.stockRepository.updateByCategoryAndItem(
                    stock.getCategory(),
                    stock.getItem(),
                    lastLog.getLastCount());
    }

    public List<Stock> dashboardStockList() {
        return this.stockRepository.findAll();
    }

    public List<Log> dashboardStockView(final int stockId) {
        return this.logRepository.findAllByStockStockIdOrderByLogTimeDesc(stockId);
    }

    public void getImage(final String fileName, ServletOutputStream outputStream) throws IOException {
        File imgFile = new File("src/main/resources/img/" + fileName);

        if (!imgFile.isFile()) imgFile = new File("src/main/resources/not_found.png");

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

    private void uploadImage(MultipartFile ...imgs) {
        for (MultipartFile img : imgs) {
            if (img == null) continue;
            try {
                byte[] bytes = img.getBytes();

                final String path = "src/main/resources/img/" + img.getOriginalFilename();
                OutputStream outputStream = new FileOutputStream(new File(path));
                outputStream.write(bytes);
                outputStream.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
