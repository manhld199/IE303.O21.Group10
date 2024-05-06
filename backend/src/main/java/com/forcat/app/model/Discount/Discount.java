package com.forcat.app.model.Discount;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import lombok.Data;

@Data
@Document(collection = "discounts")
public class Discount {
    @Id
    private ObjectId discount_id;
    private String discount_name;
    private int discount_amount;
    private Date discount_start_date;
    private Date discount_end_date;
    private DiscountProducts discount_products;
    private Date created_at;
    private Date updated_at;
    
    public Discount() {}
}
