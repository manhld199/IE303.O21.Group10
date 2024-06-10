package com.nhom10.forcat.dto.Category;

import org.bson.types.ObjectId;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.model.Category.CategoryImg;

public class CategoryAdminShortenDto  {
    @JsonProperty("category_id")
    private ObjectId categoryId;

    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("category_img")
    private CategoryImg categoryImg;

    @JsonProperty("category_short_description")
    private String categoryShortDescription;

    public CategoryAdminShortenDto(Category category) {
        this.categoryId = category.getCategoryId();
        this.categoryName = category.getCategoryName();
        this.categoryImg = category.getCategoryImg();
        this.categoryShortDescription = category.getCategoryShortDescription();
    }
}
