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
import org.sisul.material_management.vo.RequestMaterialVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubmitService {
    private final LogRepository logRepository;
    private final StockRepository stockRepository;
    private final ItemRepository itemRepository;

    private final MaterialService materialService;

    public ResponseSubmitItemsVO getSubmitItems() {
        ResponseSubmitItemsVO response = new ResponseSubmitItemsVO();
        List<String> workClasses = response.getWorkClasses();
        List<String> units = response.getUnits();

        List<Item> itemList = this.itemRepository.findAll();
        itemList.forEach(item -> {
            if ("근무반".equals(item.getItemCategory()))
                workClasses.add(item.getItemName());
            else if ("단위".equals(item.getItemCategory()))
                units.add(item.getItemName());
        });

        return response.withMaterials(this.materialService.getMaterials());
    }

    public int isExistMaterial(final String category, final String item) {
        return this.stockRepository.findByCategoryAndItem(category, item) != null ? 1 : 0;
    }

    @Transactional
    public void submit(final RequestInsertLogVO request, MultipartFile...imgs) {
        uploadImage(imgs);

        Stock stock = this.stockRepository.findByCategoryAndItem(
                request.getCategory(),
                request.getItem());
        stock.setCount(stock.getCount() + request.getCount() * (request.getInOut() == 0 ? 1 : -1));
        this.stockRepository.save(stock);
        this.logRepository.save(Log.builder()
                .logTime(request.getLogTime())
                .stock(stock)
                .inOut(request.getInOut())
                .count(request.getCount())
                .lastCount(stock.getCount())
                .unit(request.getUnit())
                .workClass(request.getWorkClass())
                .workerName(request.getWorkerName())
                .img1(imgs[0] == null ? null : imgs[0].getOriginalFilename())
                .img2(imgs[1] == null ? null : imgs[1].getOriginalFilename())
                .img3(imgs[2] == null ? null : imgs[2].getOriginalFilename())
                .build());
    }

    @Transactional
    public void addMaterials(final RequestMaterialVO material) {
        this.stockRepository.save(Stock.builder()
                .category(material.getCategory())
                .item(material.getItem())
                .count(material.getInitCount())
                .build());
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
