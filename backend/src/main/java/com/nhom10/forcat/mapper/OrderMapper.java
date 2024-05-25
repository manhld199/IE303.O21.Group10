package com.nhom10.forcat.mapper;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.dto.Order.OrderBuyerDto;
import com.nhom10.forcat.dto.Order.OrderAddressDto;
import com.nhom10.forcat.dto.Order.OrderDetailDto;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.model.Order.OrderBuyer;
import com.nhom10.forcat.model.Order.OrderAddress;
import com.nhom10.forcat.model.Order.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "orderProcessInfo", ignore = true)
    @Mapping(target = "orderDetail", ignore = true)
    Order toModel(OrderDto orderDTO);

    OrderDto toDTO(Order order);

    OrderBuyer toModel(OrderBuyerDto orderBuyerDto);
    OrderBuyerDto toDTO(OrderBuyer orderBuyer);

    OrderAddress toModel(OrderAddressDto orderAddressDto);
    OrderAddressDto toDTO(OrderAddress orderAddress);

    OrderDetail toModel(OrderDetailDto orderDetailDto);
    OrderDetailDto toDTO(OrderDetail orderDetail);
}
