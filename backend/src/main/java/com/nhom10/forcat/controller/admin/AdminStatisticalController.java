package com.nhom10.forcat.controller.admin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom10.forcat.dto.Statistic.StatisticCategoryPercent;
import com.nhom10.forcat.dto.Statistic.StatisticNewOrdersDto;
import com.nhom10.forcat.dto.Statistic.StatisticSummary;
import com.nhom10.forcat.service.admin.AdminStatisticalService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/statistics")
public class AdminStatisticalController {

    @Autowired
    AdminStatisticalService statisticalService;

    @GetMapping("/getRevenues")
    public ResponseEntity<List<Double>> getRevenues() {
        return statisticalService.getRevenue();
    }

    @GetMapping("/getNewOrders")
    public ResponseEntity<StatisticNewOrdersDto> getNewOrders() {
        return statisticalService.getNewOrders();
    }

    @GetMapping("/getCategoryPercents")
    public ResponseEntity<List<StatisticCategoryPercent>> getCategoryPercents() {
        return statisticalService.getCategoryPercents();
    }

    @GetMapping("/getSummary")
    public ResponseEntity<StatisticSummary> getSummary() {
        return statisticalService.getSummary();
    }

}
