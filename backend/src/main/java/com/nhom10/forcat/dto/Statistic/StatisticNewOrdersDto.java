package com.nhom10.forcat.dto.Statistic;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class StatisticNewOrdersDto {

    @JsonProperty("new_orders")
    private List<Integer> newOrders;

    @JsonProperty("payed_orders")
    private List<Integer> payedOrders;

    @JsonProperty("canceled_orders")
    private List<Integer> canceledOrders;

    public StatisticNewOrdersDto() {
        this.newOrders = Arrays.asList(0, 0, 0);
        this.payedOrders = Arrays.asList(0, 0, 0);
        this.canceledOrders = Arrays.asList(0, 0, 0);
    }

}
