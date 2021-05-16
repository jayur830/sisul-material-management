package org.sisul.material_management.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.sisul.material_management.entity.Log;
import org.sisul.material_management.entity.Stock;
import org.sisul.material_management.service.DashboardService;
import org.springframework.web.bind.annotation.*;

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
    public List<Log> dashboardLogList() {
        return this.dashboardService.dashboardLog();
    }

    @GetMapping("/log/view")
    public Log dashboardLogView(
            @RequestParam("logTime") final String logTime,
            @RequestParam("workClass") final String workClass,
            @RequestParam("workerName") final String workerName) {
        return this.dashboardService.dashboardLogView(logTime, workClass, workerName);
    }

    @DeleteMapping("/log/remove")
    public void removeDashboardLog(@RequestParam("logTime") final String logTime) {
        this.dashboardService.removeDashboardLog(logTime);
    }

    @GetMapping("/stock/list")
    public List<Stock> dashboardStockList() {
        return this.dashboardService.dashboardStockList();
    }

    @GetMapping("/stock/view")
    public List<Log> dashboardStockView(@RequestParam("stockId") final int stockId) {
        return this.dashboardService.dashboardStockView(stockId);
    }

    @GetMapping("/img")
    public void getImage(
            @RequestParam("fileName") final String fileName,
            HttpServletResponse response) throws IOException {
        this.dashboardService.getImage(fileName, response.getOutputStream());
    }
}
