package com.forcat.app.model.Product;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "products")
public class Product {
    @Id
    private ObjectId product_id;
    private String product_name;
    private String product_slug;
    private List<ObjectId> categories;
    private List<ProductImg> product_imgs;
    private String product_description;
    private String product_short_description;
    private Object product_detail;
    private List<ProductVariant> product_variants;
    private double product_supp_price;
    private Date created_at;
    private Date updated_at;

    public Product() {
    }
}
