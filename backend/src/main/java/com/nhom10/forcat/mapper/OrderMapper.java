package com.nhom10.forcat.mapper;

import com.nhom10.forcat.dto.Order.OrderDto;
import com.nhom10.forcat.dto.Order.OrderDetailDto;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.model.Order.OrderDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "orderId", ignore = true)
    @Mapping(target = "orderProcessInfo", ignore = true)
    @Mapping(target = "orderDetails", source = "orderDetailList")
    Order toModel(OrderDto orderDto);

    @Mapping(target = "orderDetailList", source = "orderDetails")
    OrderDto toDto(Order order);

    @Mapping(target = "productIdHashed", source = "productId")
    OrderDetailDto toOrderDetailDto(OrderDetail orderDetail);

    @Mapping(target = "productId", source = "productIdHashed")
    OrderDetail toOrderDetail(OrderDetailDto orderDetailDto);
}
