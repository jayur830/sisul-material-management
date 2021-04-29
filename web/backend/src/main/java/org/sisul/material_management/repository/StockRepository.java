package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {
    Stock findByStockId(final int stockId);
    Stock findByCategoryAndItem(final String category, final String item);
}
