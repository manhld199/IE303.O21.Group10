package com.forcat.app.model.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class OrderBuyer {
    @Field(name = "order_name")
    @JsonProperty("order_name")
    private String orderName;

    @Field(name = "order_phone")
    @JsonProperty("order_phone")
    private String orderPhone;

    @Field(name = "order_address")
    @JsonProperty("order_address")
    private OrderAddress orderAddress;

    public OrderBuyer() {
    }
}
