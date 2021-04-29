package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.service.AppService;
import org.sisul.material_management.vo.RequestInsertLogVO;
import org.sisul.material_management.vo.ResponseDashboardDataVO;
import org.sisul.material_management.vo.ResponseSubmitItemsVO;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AppController {
    private final AppService appService;

    @GetMapping("/dashboard/list")
    public List<ResponseDashboardDataVO> dashboardList() {
        return this.appService.dashboardList();
    }

    @GetMapping("/dashboard/view")
    public ResponseDashboardDataVO dashboardView(@RequestParam("stockId") final int stockId) {
        return this.appService.dashboardView(stockId);
    }

    @GetMapping("/submit/items")
    public ResponseSubmitItemsVO getSubmitItems() {
        return this.appService.getSubmitItems();
    }

    @PostMapping("/submit/submit")
    public void submit(final RequestInsertLogVO request) throws ParseException {
        this.appService.submit(request);
    }

    @PostMapping("/management/setItem")
    public void setItem(@RequestBody final List<String> items) {
        this.appService.setItem(items);
    }
}
