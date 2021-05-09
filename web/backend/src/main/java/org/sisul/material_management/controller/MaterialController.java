package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.service.MaterialService;
import org.sisul.material_management.vo.RequestMaterialVO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/material")
@RequiredArgsConstructor
public class MaterialController {
    private final MaterialService materialService;

    @GetMapping("/get")
    public List<Stock> getMaterials() {
        return this.materialService.getMaterials();
    }

    @PostMapping("/commit")
    public void commitMaterials(@RequestBody final List<RequestMaterialVO> materials) {
        this.materialService.commitMaterials(materials);
    }

    @DeleteMapping("/delete")
    public void deleteMaterial(
            @RequestParam("category") final String category,
            @RequestParam("item") final String item) {
        this.materialService.deleteMaterial(category, item);
    }
}
