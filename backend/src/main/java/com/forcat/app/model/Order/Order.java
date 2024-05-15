package com.forcat.app.model.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import java.util.Date;

@Data
@Document(collection = "orders")
public class Order {
	@Id
	@Field(name = "order_id")
	@JsonProperty("order_id")
	private ObjectId orderId;

	@Field(name = "guest_id")
	@JsonProperty("guest_id")
	private ObjectId guestId;

	@Field(name = "order_note")
	@JsonProperty("order_note")
	private String orderNote;

	@Field(name = "order_buyer")
	@JsonProperty("order_buyer")
	private OrderBuyer orderBuyer;

	@Field(name = "order_detail")
	@JsonProperty("order_detail")
	private OrderDetail orderDetail;

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
}
