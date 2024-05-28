package com.nhom10.forcat.dto.Order;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Order.Order;

import lombok.Data;

@Data
public class OrderLookupDto {

    @JsonProperty("all_orders")
    private List<OrderLookupItemDto> allOrders;

    @JsonProperty("preparing_orders")
    private List<OrderLookupItemDto> preparingOrders;

    @JsonProperty("delivering_orders")
    private List<OrderLookupItemDto> deliveringOrders;

    @JsonProperty("finished_orders")
    private List<OrderLookupItemDto> finishedOrders;

    @JsonProperty("canceled_orders")
    private List<OrderLookupItemDto> canceledOrders;

    public OrderLookupDto(List<Order> orders) {
        List<OrderLookupItemDto> allItems = orders.stream()
                .map(order -> new OrderLookupItemDto(order))
                .collect(Collectors.toList());
        this.allOrders = allItems;

        List<OrderLookupItemDto> preparingOrders = orders.stream()
                .map(order -> new OrderLookupItemDto(order))
                .filter(order -> order.getOrderProcessInfo().equalsIgnoreCase("Chuẩn bị hàng"))
                .collect(Collectors.toList());
        this.preparingOrders = preparingOrders;

        List<OrderLookupItemDto> deliveringOrders = orders.stream()
                .map(order -> new OrderLookupItemDto(order))
                .filter(order -> order.getOrderProcessInfo().equalsIgnoreCase("Đang giao"))
                .collect(Collectors.toList());
        this.deliveringOrders = deliveringOrders;

        List<OrderLookupItemDto> finishedOrders = orders.stream()
                .map(order -> new OrderLookupItemDto(order))
                .filter(order -> order.getOrderProcessInfo().equalsIgnoreCase("Đã giao"))
                .collect(Collectors.toList());
        this.finishedOrders = finishedOrders;

        List<OrderLookupItemDto> canceledOrders = orders.stream()
                .map(order -> new OrderLookupItemDto(order))
                .filter(order -> order.getOrderProcessInfo().equalsIgnoreCase("Đã hủy"))
                .collect(Collectors.toList());
        this.canceledOrders = canceledOrders;
    }

}
