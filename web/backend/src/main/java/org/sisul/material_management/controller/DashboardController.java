package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.projection.LogProjection;
import org.sisul.material_management.service.DashboardService;
import org.sisul.material_management.vo.RequestLogPutDataVO;
import org.sisul.material_management.vo.RequestModifyStockVO;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {
    private final DashboardService dashboardService;

    @GetMapping("/log/list")
    public List<LogProjection> dashboardLogList() {
        return this.dashboardService.dashboardLog();
    }

    @GetMapping("/log/view")
    public LogProjection dashboardLogView(
            @RequestParam("logTime") final String logTime,
            @RequestParam("workClass") final String workClass,
            @RequestParam("workerName") final String workerName) {
        return this.dashboardService.dashboardLogView(logTime, workClass, workerName);
    }

    @PutMapping("/log/modify")
    public void modifyDashboardLog(
            final RequestLogPutDataVO request,
            @Nullable @RequestParam MultipartFile img1,
            @Nullable @RequestParam MultipartFile img2,
            @Nullable @RequestParam MultipartFile img3) {
        this.dashboardService.modifyDashboardLog(request, img1, img2, img3);
    }

    @DeleteMapping("/log/remove")
    public void removeDashboardLog(
            @RequestParam("logTime") final String logTime,
            @RequestParam("category") final String category,
            @RequestParam("item") final String item) {
        this.dashboardService.removeDashboardLog(logTime, category, item);
    }

    @GetMapping("/stock/list")
    public List<Stock> dashboardStockList() {
        return this.dashboardService.dashboardStockList();
    }

    @GetMapping("/stock/view")
    public List<LogProjection> dashboardStockView(@RequestParam("stockId") final int stockId) {
        return this.dashboardService.dashboardStockView(stockId);
    }

    @Deprecated
    @PutMapping("/stock/modify")
    public void modifyDashboardStock(@RequestBody final RequestModifyStockVO request) {
        this.dashboardService.modifyDashboardStock(request);
    }

    @GetMapping("/img")
    public void getImage(
            @RequestParam("fileName") final String fileName,
            HttpServletResponse response) throws IOException {
        this.dashboardService.getImage(fileName, response.getOutputStream());
    }
}
