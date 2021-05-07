package org.sisul.material_management.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Item;
import org.sisul.material_management.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.IntStream;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManagementService {
    private final ItemRepository itemRepository;

    public List<Item> getItems() {
        return this.itemRepository.findAll();
    }

    @Transactional
    public void commitItems(final List<String> items) {
        this.itemRepository.deleteAll();

        List<Item> list = new ArrayList<>();
        IntStream.range(0, items.size()).forEach(i -> {
            final String[] splittedStr = items.get(i).split(":");
            final String category = splittedStr[0];
            final String item = splittedStr[1];
            list.add(Item.builder()
                    .id(i + 1)
                    .itemCategory(category)
                    .itemName(item)
                    .build());
        });
        this.itemRepository.saveAll(list);
    }
}
