package com.nhom10.forcat.dto.Category;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Category.Category;

import lombok.Data;

@Data
public class CategoryDto {
    @JsonProperty("category_id")
    private ObjectId categoryId;

    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("category_img_url")
    private String categoryImgUrl;

    @JsonProperty("category_img_alt")
    private String categoryImgAlt;

    public CategoryDto(Category category) {
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
        this.categoryImgUrl = category.getCategoryImg().getUrl();
        this.categoryImgAlt = category.getCategoryImg().getAlt();
    }

    public CategoryDto(ObjectId categoryId, String categoryName, String categoryImgUrl, String categoryImgAlt) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.categoryImgUrl = categoryImgUrl;
        this.categoryImgAlt = categoryImgAlt;
    }

}
