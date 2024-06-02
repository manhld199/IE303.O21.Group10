package com.nhom10.forcat.dto.Statistic;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class StatisticSummary {

    @JsonProperty("total_customers")
    private int totalCustomers;

    @JsonProperty("total_orders")
    private int totalOrders;

    @JsonProperty("total_products")
    private int totalProducts;

    public StatisticSummary(int totalCustomers, int totalOrders, int totalProducts) {
        this.totalCustomers = totalCustomers;
        this.totalOrders = totalOrders;
        this.totalProducts = totalProducts;
    }

}
