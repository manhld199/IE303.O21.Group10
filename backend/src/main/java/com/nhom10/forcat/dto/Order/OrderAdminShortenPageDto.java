package com.nhom10.forcat.dto.Order;

import java.util.List;
import lombok.Data;

@Data
public class OrderAdminShortenPageDto {
    private List<OrderAdminShortenDto> orders;
    private int totalPages;

    public OrderAdminShortenPageDto(List<OrderAdminShortenDto> orders, int totalPages) {
        this.orders = orders;
        this.totalPages = totalPages;
    }
}
