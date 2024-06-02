package com.nhom10.forcat.dto.Statistic;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class StatisticCategoryPercent {

    @JsonProperty("category_name")
    private String categoryName;

    @JsonIgnore
    private double categoryTotalRevenue;

    @JsonProperty("category_percent")
    private double categoryPercent;

    public StatisticCategoryPercent(String categoryName) {
        this.categoryName = categoryName;
        this.categoryTotalRevenue = 0.0;
        this.categoryPercent = 0.0;
    }

}
