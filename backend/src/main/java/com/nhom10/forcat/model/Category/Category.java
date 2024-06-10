package com.nhom10.forcat.model.Category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.dto.Category.CategoryAdminAddDto;
import com.nhom10.forcat.dto.Category.CategoryAdminUpdateDto;
import com.nhom10.forcat.util.Util;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;
import java.util.Date;

@Data
@Document(collection = "categories")
public class Category {
    @Id
    @Field(name = "_id")
    @JsonProperty("category_id")
    private ObjectId categoryId;

    @Field(name = "category_name")
    @JsonProperty("category_name")
    private String categoryName;

    @Field(name = "category_slug")
    @JsonProperty("category_slug")
    private String categorySlug;

    @Field(name = "category_img")
    @JsonProperty("category_img")
    private CategoryImg categoryImg;

    @Field(name = "category_short_description")
    @JsonProperty("category_short_description")
    private String categoryShortDescription;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Category() {
    };

    public Category(CategoryAdminAddDto category) {
        this.categoryId = new ObjectId();
        this.categoryName = category.getCategoryName();
        this.categorySlug = Util.createSlug(category.getCategoryName());
        this.categoryImg = category.getCategoryImg();
        this.categoryShortDescription = category.getCategoryShortDescription();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    public Category(CategoryAdminUpdateDto category) {
        this.categoryId = new ObjectId(category.getCategoryId());
        this.categoryName = category.getCategoryName();
        this.categorySlug = Util.createSlug(category.getCategoryName());
        this.categoryImg = category.getCategoryImg();
        this.categoryShortDescription = category.getCategoryShortDescription();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
