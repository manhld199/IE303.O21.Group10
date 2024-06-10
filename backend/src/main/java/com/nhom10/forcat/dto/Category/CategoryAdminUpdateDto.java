package com.nhom10.forcat.dto.Category;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Category.CategoryImg;
import lombok.Data;

@Data
public class CategoryAdminUpdateDto {

    @JsonProperty("category_id")
    private String categoryId;

    @JsonProperty("category_name")
    private String categoryName;

    @JsonProperty("category_img")
    private CategoryImg CategoryImg;

    @JsonProperty("category_short_description")
    private String categoryShortDescription;

    @JsonProperty("created_at")
    private Date createdAt;

    public CategoryAdminUpdateDto() {
    }
}
