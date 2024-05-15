package com.forcat.app.model.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class OrderDetail {
    @Field(name = "order_name")
    @JsonProperty("order_name")
    private String orderName;

    @Field(name = "quantity")
    @JsonProperty("quantity")
    private int quantity;

    @Field(name = "unit_price")
    @JsonProperty("unit_price")
    private double unitPrice;

    public OrderDetail() {
    }
}
