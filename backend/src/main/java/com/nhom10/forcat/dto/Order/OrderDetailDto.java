package com.nhom10.forcat.dto.Order;

import lombok.Data;

@Data
public class OrderDetailDto {
    private String orderName;
    private int quantity;
    private double unitPrice;
}

