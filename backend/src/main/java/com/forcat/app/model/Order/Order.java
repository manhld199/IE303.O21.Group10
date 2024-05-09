package com.forcat.app.model.Order;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "orders")
public class Order {
	@Id
	private ObjectId orderId;
	private ObjectId guestId;
	private String orderNote;
	private OrderBuyer orderBuyer;
	private OrderDetail orderDetail;
	private double orderShippingCost;
	private double orderTotalCost;
	private String orderProcessInfo;
	private Date created_at;
	private Date updated_at;

	public Order() {
	}
}
