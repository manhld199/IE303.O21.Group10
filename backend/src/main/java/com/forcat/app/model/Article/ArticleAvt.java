package com.forcat.app.model.Article;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class ArticleAvt {
    @Field(name = "url")
    @JsonProperty("url")
    private String url;

    @Field(name = "alt")
    @JsonProperty("alt")
    private String alt;

    public ArticleAvt() {
    }
}
