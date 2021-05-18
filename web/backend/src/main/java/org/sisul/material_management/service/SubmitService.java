package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Item;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Member;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.ItemRepository;
import org.sisul.material_management.repository.LogRepository;
import org.sisul.material_management.repository.MemberRepository;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.sisul.material_management.vo.RequestMaterialVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.sisul.material_management.vo.ResponseSubmitUserInfoVO;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubmitService {
    private final LogRepository logRepository;
    private final StockRepository stockRepository;
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;

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

        return response.withMaterials(getMaterials());
    }

    public int isExistMaterial(final String category, final String item) {
        return this.stockRepository.findByCategoryAndItem(category, item) != null ? 1 : 0;
    }

    @Transactional
    public void submit(final RequestInsertLogVO request, MultipartFile...imgs) {
        String[] fileNames = uploadImage(imgs);

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
                .img1(fileNames[0])
                .img2(fileNames[1])
                .img3(fileNames[2])
                .build());
    }

    @Transactional
    public void addMaterials(final RequestMaterialVO material) {
        this.stockRepository.save(Stock.builder()
                .stockId((int) (this.stockRepository.count() + 1))
                .category(material.getCategory())
                .item(material.getItem())
                .count(material.getInitCount())
                .build());
    }

    private Map<String, List<String>> getMaterials() {
        Map<String, List<String>> materials = new HashMap<>();
        this.stockRepository.findAll().forEach(stock -> {
            final String category = stock.getCategory();
            if (!materials.containsKey(category))
                materials.put(category, new ArrayList<>());
            materials.get(category).add(stock.getItem());
        });
        return materials;
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
                final String path = "src/main/resources/img/" + fileName;
                OutputStream outputStream = new FileOutputStream(new File(path));
                outputStream.write(bytes);
                outputStream.flush();

                fileNames[i] = fileName;
            } catch (IOException e) {
                e.printStackTrace();
            } finally {
                ++i;
            }
        }
        return fileNames;
    }

    public ResponseSubmitUserInfoVO getUserInfo() {
        Member member = this.memberRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        return ResponseSubmitUserInfoVO.builder()
                .workClass(member.getWorkClass())
                .workerName(member.getWorkerName())
                .build();
    }
}
