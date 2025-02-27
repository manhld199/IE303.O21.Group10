package com.nhom10.forcat.model.Guest;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "guests")
public class Guest {
    @Id
    @Field(name = "_id")
    @JsonProperty("guest_id")
    private ObjectId guestId;

    @Field(name = "guest_phone_number")
    @JsonProperty("guest_phone_number")
    private String guestPhoneNumber;

    @Field(name = "guest_order")
    @JsonProperty("guest_orders")
    private List<ObjectId> guestOrders;

    @Field(name = "guest_total_spent")
    @JsonProperty("guest_total_spent")
    private double guestTotalSpent;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Guest() {
    }

    public Guest(String guestPhoneNumber, ObjectId orderId, double orderTotalCost) {
        this.guestId = new ObjectId();
        this.guestPhoneNumber = guestPhoneNumber;

        this.guestOrders = new ArrayList<>();
        guestOrders.add(orderId);

        this.guestTotalSpent = orderTotalCost;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public void updateOrder(ObjectId orderId, double orderTotalCost) {
        this.guestOrders.add(orderId);
        this.guestTotalSpent += orderTotalCost;
    }

}
