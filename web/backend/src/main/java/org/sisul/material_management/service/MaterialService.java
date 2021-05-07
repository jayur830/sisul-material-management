package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestMaterialVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class MaterialService {
    private final StockRepository stockRepository;

    public Map<String, List<String>> getMaterials() {
        Map<String, List<String>> materials = new HashMap<>();
        this.stockRepository.findAll().forEach(stock -> {
            final String category = stock.getCategory();
            if (!materials.containsKey(category))
                materials.put(category, new ArrayList<>());
            materials.get(category).add(stock.getItem());
        });
        return materials;
    }
    @Transactional
    public void commitMaterials(final List<RequestMaterialVO> materials) {
        this.stockRepository.deleteAll();
        this.stockRepository.saveAll(IntStream.range(0, materials.size())
                .mapToObj(i -> Stock.builder()
                        .stockId(i + 1)
                        .category(materials.get(i).getCategory())
                        .item(materials.get(i).getItem())
                        .count(materials.get(i).getInitCount())
                        .build()).collect(Collectors.toList()));
    }
}
