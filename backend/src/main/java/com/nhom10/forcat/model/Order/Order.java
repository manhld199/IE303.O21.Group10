package com.nhom10.forcat.model.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.dto.Order.OrderDto;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
    @Id
    @Field(name = "_id")
    @JsonProperty("order_id")
    private ObjectId orderId;

    @Field(name = "order_note")
    @JsonProperty("order_note")
    private String orderNote;

    @Field(name = "order_buyer")
    @JsonProperty("order_buyer")
    private OrderBuyer orderBuyer;

    @Field(name = "order_detail")
    @JsonProperty("order_detail")
    private List<OrderDetail> orderDetails;

    @Field(name = "order_shipping_cost")
    @JsonProperty("order_shipping_cost")
    private double orderShippingCost;

    @Field(name = "order_total_cost")
    @JsonProperty("order_total_cost")
    private double orderTotalCost;

    @Field(name = "order_process_info")
    @JsonProperty("order_process_info")
    private String orderProcessInfo;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Order() {
    }

    public Order(OrderDto order) {
        this.orderId = new ObjectId();
        this.orderNote = order.getOrderNote();
        this.orderBuyer = order.getOrderBuyer();
        this.orderDetails = order.getOrderDetails();
        this.orderShippingCost = 0;
        this.orderTotalCost = order.getOrderTotalCost();
        this.orderProcessInfo = "Chuẩn bị hàng";
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

}