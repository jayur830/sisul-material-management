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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppService {
    private final LogRepository logRepository;
    private final StockRepository stockRepository;
    private final ItemRepository itemRepository;

    public List<Log> dashboardLog() {
        return this.logRepository.findAll();
    }

    public Log dashboardLogView(final int stockId) {
        return this.logRepository.findByStock(this.stockRepository.findByStockId(stockId));
    }

    public List<Stock> dashboardStockList() {
        return this.stockRepository.findAll();
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

    @Transactional
    public void setItem(final List<String> items) {
        this.itemRepository.deleteAll();
        this.itemRepository.saveAll(items.stream()
                .map(_item -> _item.split(":"))
                .map(item -> Item.builder()
                        .itemCategory(item[0])
                        .itemName(item[1])
                        .build())
                .collect(Collectors.toList()));
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
