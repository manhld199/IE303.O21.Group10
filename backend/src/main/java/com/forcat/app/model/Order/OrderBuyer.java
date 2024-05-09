package com.forcat.app.model.Order;

import lombok.Data;

@Data
public class OrderBuyer {
    private String order_name;
    private String order_phone;
    private OrderAddress order_address;

    public OrderBuyer() {
    }
}
