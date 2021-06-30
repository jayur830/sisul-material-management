package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.repository.StockRepository;
import org.sisul.material_management.vo.RequestMaterialVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

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
        AtomicInteger lastStockId = new AtomicInteger((int) (this.stockRepository.count() + 1));
        materials.forEach(material -> {
            if (material.getItem() == null && this.stockRepository.findByCategoryAndItemIsNull(material.getCategory()) == null)
                this.stockRepository.save(Stock.builder()
                        .stockId(lastStockId.getAndIncrement())
                        .category(material.getCategory())
                        .item(null)
                        .count(material.getInitCount())
                        .build());
            else {
                final Stock nullStock = this.stockRepository.findByCategoryAndItem(material.getCategory(), "");
                if (nullStock != null) this.stockRepository.delete(nullStock);
                final Stock stock = this.stockRepository.findByCategoryAndItem(material.getCategory(), material.getItem());
                if (stock == null)
                    this.stockRepository.save(Stock.builder()
                            .stockId(lastStockId.getAndIncrement())
                            .category(material.getCategory())
                            .item(material.getItem())
                            .count(material.getInitCount())
                            .build());
            }
        });
    }

    @Transactional
    public void deleteMaterial(final String category, final String item) {
        this.stockRepository.updateAvailableByCategoryAndItem(category, item);
    }
}
