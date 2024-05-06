package com.forcat.app.model.Product;

import org.bson.types.ObjectId;
import java.util.Date;
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
    private String[] categories;
    private ProductImg[] product_imgs;
    private String product_description;
    private String product_short_description;
    private Object product_detail;
    private ProductVariant[] product_variants;
    private double product_supp_price;
    private Date created_at;
    private Date updated_at;    

	public Product() {}
}
