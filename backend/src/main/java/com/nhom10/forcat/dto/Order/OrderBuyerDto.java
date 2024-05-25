package com.nhom10.forcat.dto.Order;

import lombok.Data;

@Data
public class OrderBuyerDto {
    private String orderName;
    private String orderPhone;
    private OrderAddressDto orderAddress;
}


