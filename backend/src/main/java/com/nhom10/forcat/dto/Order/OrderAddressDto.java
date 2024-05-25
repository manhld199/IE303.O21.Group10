package com.nhom10.forcat.dto.Order;

import lombok.Data;

@Data
public class OrderAddressDto {
    private String street;
    private String ward;
    private String district;
    private String province;
}

