package com.forcat.app.model.Category;

import lombok.Data;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "categories")
public class Category {
    @Id
    private ObjectId category_id;
    private String category_name;
    private String category_slug;
    private CategoryImg category_img;
    private String category_short_description;
    private Date created_at;
    private Date updated_at;

    public Category() {
    }
}
