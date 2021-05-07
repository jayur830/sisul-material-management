package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.LogRepository;
import org.sisul.material_management.repository.StockRepository;
import org.springframework.stereotype.Service;

import javax.servlet.ServletOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
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

    public List<Stock> dashboardStockList() {
        return this.stockRepository.findAll();
    }

    public List<Log> dashboardStockView(final int stockId) {
        return this.logRepository.findAllByStockStockIdOrderByLogTimeDesc(stockId);
    }

    public void getImage(final String fileName, ServletOutputStream outputStream) throws IOException {
        File imgFile = new File("src/main/resources/img/" + fileName);

        if (!imgFile.isFile()) imgFile = new File("src/main/resources/img/not_found.png");

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
}
