package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Item;
import org.sisul.material_management.service.ManagementService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/management")
@RequiredArgsConstructor
public class ManagementController {
    private final ManagementService managementService;

    @GetMapping("/getItems")
    public List<Item> getItems() {
        return this.managementService.getItems();
    }

    @PostMapping("/commit")
    public void commitItems(@RequestBody final List<String> items) {
        this.managementService.commitItems(items);
    }
}
