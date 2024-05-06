package com.forcat.app.model.Order;
// import org.bson.types.ObjectId;
import java.util.Date;

import lombok.Data;

@Data
public class OrderProcess {
    private String order_status;
    private Date order_date;
    
    public OrderProcess() {}
}
