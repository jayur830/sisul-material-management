package org.sisul.material_management.repository;

import org.sisul.material_management.entity.Item;
import org.sisul.material_management.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query("select i.itemName from Item i where i.itemCategory = '근무반'")
    List<String> findAllByItemCategory();
}
