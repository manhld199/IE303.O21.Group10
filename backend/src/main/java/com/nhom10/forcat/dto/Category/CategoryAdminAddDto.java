package com.nhom10.forcat.dto.Category;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Category.CategoryImg;
import lombok.Data;

@Data
public class CategoryAdminAddDto {
    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("category_img")
    private CategoryImg categoryImg;

    @JsonProperty("category_short_description")
    private String categoryShortDescription;

    public CategoryAdminAddDto() {
    }
}
