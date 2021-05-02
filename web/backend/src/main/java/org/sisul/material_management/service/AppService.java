package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Item;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.ItemRepository;
import org.sisul.material_management.repository.LogRepository;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import java.io.*;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppService {
    private final LogRepository logRepository;
    private final StockRepository stockRepository;
    private final ItemRepository itemRepository;

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

    public ResponseSubmitItemsVO getSubmitItems() {
        ResponseSubmitItemsVO response = new ResponseSubmitItemsVO();
        List<String> categories = response.getCategories();
        List<String> items = response.getItems();
        List<String> workClasses = response.getWorkClasses();
        List<String> units = response.getUnits();

        List<Item> itemList = this.itemRepository.findAll();
        for (final Item item : itemList) {
            switch (item.getItemCategory()) {
            case "근무반":
                workClasses.add(item.getItemName());
                break;
            case "자재 종류":
                categories.add(item.getItemName());
                break;
            case "자재 제품명":
                items.add(item.getItemName());
                break;
            case "단위":
                units.add(item.getItemName());
                break;
            }
        }

        return response;
    }

    @Transactional
    public void submit(final RequestInsertLogVO request, MultipartFile ...imgs) throws ParseException {
        uploadImage(imgs);

        Stock stock = this.stockRepository.findByCategoryAndItem(
                request.getCategory(),
                request.getItem());
        if (stock == null)
            stock = Stock.builder()
                .category(request.getCategory())
                .item(request.getItem())

                    /**
                     * TODO Initialize a value of count
                     * */
                .count(100)
                .unit(request.getUnit())
                .build();
        stock.setCount(stock.getCount() + request.getCount() * (request.getInOut() == 0 ? 1 : -1));
        this.stockRepository.save(stock);
        this.logRepository.save(Log.builder()
                .logTime(request.getLogTime())
                .stock(stock)
                .inOut(request.getInOut())
                .count(request.getCount())
                .unit(request.getUnit())
                .workClass(request.getWorkClass())
                .workerName(request.getWorkerName())
                .img1(imgs[0] == null ? null : imgs[0].getOriginalFilename())
                .img2(imgs[1] == null ? null : imgs[1].getOriginalFilename())
                .img3(imgs[2] == null ? null : imgs[2].getOriginalFilename())
                .build());
    }

    public List<Item> getItems() {
        return this.itemRepository.findAll();
    }

    @Transactional
    public void commitItems(final List<String> items) {
        this.itemRepository.deleteAll();

        List<Item> list = new ArrayList<>();
        IntStream.range(0, items.size()).forEach(i -> {
            final String[] splittedStr = items.get(i).split(":");
            final String category = splittedStr[0];
            final String item = splittedStr[1];
            list.add(Item.builder()
                    .id(i + 1)
                    .itemCategory(category)
                    .itemName(item)
                    .build());
        });
        this.itemRepository.saveAll(list);
    }

    @Transactional
    public void removeItem(int itemId) {
        this.itemRepository.deleteById(itemId);
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
