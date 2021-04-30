package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.service.AppService;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.text.ParseException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppController {
    private final AppService appService;

    @GetMapping("/dashboard/log/list")
    public List<Log> dashboardLogList() {
        return this.appService.dashboardLog();
    }

    @GetMapping("/dashboard/log/view")
    public Log dashboardLogView(@RequestParam("stockId") final int stockId) {
        return this.appService.dashboardLogView(stockId);
    }

    @GetMapping("/dashboard/stock/list")
    public List<Stock> dashboardStockList() {
        return this.appService.dashboardStockList();
    }

    @GetMapping("/submit/items")
    public ResponseSubmitItemsVO getSubmitItems() {
        return this.appService.getSubmitItems();
    }

    @PostMapping("/submit/submit")
    public void submit(
            final RequestInsertLogVO request,
            @Nullable @RequestParam MultipartFile img1,
            @Nullable @RequestParam MultipartFile img2,
            @Nullable @RequestParam MultipartFile img3) throws ParseException {
        this.appService.submit(request, img1, img2, img3);
    }

    @PostMapping("/management/setItem")
    public void setItem(@RequestBody final List<String> items) {
        this.appService.setItem(items);
    }
}
