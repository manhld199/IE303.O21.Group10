package com.nhom10.forcat.dto.Order;

import lombok.Data;
import org.bson.types.ObjectId;

// import java.util.Date;
import java.util.List;

@Data
public class OrderDto {
    private ObjectId guestId;
    private String orderNote;
    private OrderBuyerDto orderBuyer;
    private List<OrderDetailDto> orderDetailList;
    private double orderShippingCost;
    private double orderTotalCost;
}

