package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Integer> {
    Stock findByStockId(final int stockId);
    Stock findByCategoryAndItem(final String category, final String item);

    void deleteByCategoryAndItem(final String category, final String item);

    @Modifying
    @Query("update Stock s set s.count = :count where s.stockId = :stockId")
    void updateCountByStockId(@Param("count") final int count, @Param("stockId") final int stockId);

    @Modifying
    @Query("update Stock s set s.count = :count where s.category = :category and s.item = :item")
    void updateCountByCategoryAndItem(@Param("category") final String category, @Param("item") final String item, @Param("count") final int count);

    @Modifying
    @Query("update Stock s set s.count = s.count + :count where s.category = :category and s.item = :item")
    void addCountByCategoryAndItem(@Param("category") final String category, @Param("item") final String item, @Param("count") final int count);
}
