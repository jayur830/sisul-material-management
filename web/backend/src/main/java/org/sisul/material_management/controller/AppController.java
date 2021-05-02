package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Item;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.service.AppService;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
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
    public Log dashboardLogView(
            @RequestParam("logTime") final String logTime,
            @RequestParam("workClass") final String workClass,
            @RequestParam("workerName") final String workerName) {
        return this.appService.dashboardLogView(logTime, workClass, workerName);
    }

    @GetMapping("/dashboard/stock/list")
    public List<Stock> dashboardStockList() {
        return this.appService.dashboardStockList();
    }

    @GetMapping("/dashboard/stock/view")
    public List<Log> dashboardStockView(@RequestParam("stockId") final int stockId) {
        return this.appService.dashboardStockView(stockId);
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

    @GetMapping("/management/getItems")
    public List<Item> getItems() {
        return this.appService.getItems();
    }

    @PostMapping("/management/commit")
    public void commitItems(@RequestBody final List<String> items) {
        this.appService.commitItems(items);
    }

    @GetMapping("/dashboard/img")
    public void getImage(
            @RequestParam("fileName") final String fileName,
            HttpServletResponse response) throws IOException {
        this.appService.getImage(fileName, response.getOutputStream());
    }
}
