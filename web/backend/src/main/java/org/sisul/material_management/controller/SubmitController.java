package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.service.SubmitService;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.sisul.material_management.vo.RequestMaterialVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.sisul.material_management.vo.ResponseSubmitUserInfoVO;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;

@Slf4j
@RestController
@RequestMapping("/api/submit")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SubmitController {
    private final SubmitService submitService;

    @GetMapping("/items")
    public ResponseSubmitItemsVO getSubmitItems() {
        return this.submitService.getSubmitItems();
    }

    @GetMapping("/isExistMaterial")
    public int isExistMaterial(
            @RequestParam("category") final String category,
            @RequestParam("item") final String item) {
        return this.submitService.isExistMaterial(category, item);
    }

    @PostMapping("/addMaterial")
    public void addMaterial(@RequestBody RequestMaterialVO material) {
        this.submitService.addMaterials(material);
    }

    @PostMapping("/submit")
    public void submit(
            final RequestInsertLogVO request,
            @Nullable @RequestParam MultipartFile img1,
            @Nullable @RequestParam MultipartFile img2,
            @Nullable @RequestParam MultipartFile img3) {
        this.submitService.submit(request, img1, img2, img3);
    }

    @GetMapping("/getUserInfo")
    public ResponseSubmitUserInfoVO getUserInfo() {
        return this.submitService.getUserInfo();
    }
}
