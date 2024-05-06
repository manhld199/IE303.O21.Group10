package com.forcat.app.model.Order;

// import org.bson.types.ObjectId;

import lombok.Data;

@Data
public class OrderAddress {
    private String street;
    private String ward;
    private String district;
    private String province;

    public OrderAddress() {}
}
