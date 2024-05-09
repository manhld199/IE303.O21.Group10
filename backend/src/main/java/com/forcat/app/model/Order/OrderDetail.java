package com.forcat.app.model.Order;

import lombok.Data;

@Data
public class OrderDetail {
    private String order_name;
    private int quantity;
    private double unit_price;

    public OrderDetail() {
    }
}
