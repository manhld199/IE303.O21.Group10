package com.forcat.app.model.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import java.util.Date;

@Data
public class OrderProcess {
    @Field(name = "order_status")
    @JsonProperty("order_status")
    private String orderStatus;

    @Field(name = "order_date")
    @JsonProperty("order_date")
    private Date orderDate;

    public OrderProcess() {
    }
}
