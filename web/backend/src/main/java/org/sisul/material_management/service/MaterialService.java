package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestMaterialVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MaterialService {
    private final StockRepository stockRepository;

    public List<Stock> getMaterials() {
        return this.stockRepository.findAllByAvailable(true);
    }

    @Transactional
    public void commitMaterials(final List<RequestMaterialVO> materials) {
        int lastStockId = (int) (this.stockRepository.count() + 1);
        for (final RequestMaterialVO material : materials) {
            final Stock stock = this.stockRepository.findByCategoryAndItem(material.getCategory(), material.getItem());
            this.stockRepository.save(stock != null ?
                    stock.withCount(material.getInitCount()) :
                    Stock.builder()
                            .stockId(lastStockId++)
                            .category(material.getCategory())
                            .item(material.getItem())
                            .count(material.getInitCount())
                            .build());
        }
    }

    @Transactional
    public void deleteMaterial(final String category, final String item) {
        this.stockRepository.updateAvailableByCategoryAndItem(category, item);
    }
}
