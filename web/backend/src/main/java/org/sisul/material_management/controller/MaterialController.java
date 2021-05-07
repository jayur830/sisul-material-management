package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.service.MaterialService;
import org.sisul.material_management.vo.RequestMaterialVO;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/material")
@RequiredArgsConstructor
public class MaterialController {
    private final MaterialService materialService;

    @GetMapping("/get")
    public Map<String, List<String>> getMaterials() {
        return this.materialService.getMaterials();
    }

    @PostMapping("/commit")
    public void commitMaterials(@RequestBody final List<RequestMaterialVO> materials) {
        this.materialService.commitMaterials(materials);
    }
}
