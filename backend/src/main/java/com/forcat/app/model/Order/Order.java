package com.forcat.app.model.Order;

import org.bson.types.ObjectId;
import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Document(collection = "orders")
@Data
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

	public Order() {}
}

