package org.sisul.material_management.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Item;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.ItemRepository;
import org.sisul.material_management.repository.LogRepository;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.sisul.material_management.vo.ResponseDashboardDataVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AppService {
    private final LogRepository logRepository;
    private final StockRepository stockRepository;
    private final ItemRepository itemRepository;

    private final ObjectMapper jacksonObjectMapper;

    public List<ResponseDashboardDataVO> dashboardList() {
        return this.logRepository.findAll()
                .stream()
                .map(log -> ResponseDashboardDataVO.builder()
                        .logTime(log.getLogTime())
                        .inOut(log.getInOut())
                        .category(log.getStock().getCategory())
                        .item(log.getStock().getItem())
                        .count(log.getCount())
                        .unit(log.getUnit())
                        .workClass(log.getWorkClass())
                        .workerName(log.getWorkerName())
                        .build())
                .collect(Collectors.toList());
    }

    public ResponseDashboardDataVO dashboardView(final int stockId) {
        Log log = this.logRepository.findByStock(this.stockRepository.findByStockId(stockId));
        return ResponseDashboardDataVO.builder()
                .logTime(log.getLogTime())
                .inOut(log.getInOut())
                .category(log.getStock().getCategory())
                .item(log.getStock().getItem())
                .count(log.getCount())
                .unit(log.getUnit())
                .workClass(log.getWorkClass())
                .workerName(log.getWorkerName())
                .build();
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
    public void submit(final RequestInsertLogVO request) throws ParseException {
        try {
            log.info("{}", this.jacksonObjectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(request));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        uploadImage(request.getImg1(), request.getImg2(), request.getImg3());

        final DateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
        Stock stock = this.stockRepository.findByCategoryAndItem(
                request.getCategory(),
                request.getItem());
        this.logRepository.save(Log.builder()
                .logTime(dateFormat.parse(request.getLogTime()))
                .stock(stock)
                .inOut(request.getInOut())
                .count(request.getCount())
                .unit(request.getUnit())
                .workClass(request.getWorkClass())
                .workerName(request.getWorkerName())
                .img1(request.getImg1().getOriginalFilename())
                .img2(request.getImg2().getOriginalFilename())
                .img3(request.getImg3().getOriginalFilename())
                .build());
        this.stockRepository.save(stock.withCount(stock.getCount() + request.getCount() * (request.getInOut() == 0 ? 1 : -1)));
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

                OutputStream outputStream = new FileOutputStream(new File(Paths.get(new ClassPathResource("/img").getURI()).toString() + "/" + img.getOriginalFilename()));
                outputStream.write(bytes);
                outputStream.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
