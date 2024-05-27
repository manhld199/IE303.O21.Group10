package com.nhom10.forcat.dto.Article;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ArticleShortenPageDto {

    @JsonProperty("articles")
    private List<ArticleShortenDto> articles;

    @JsonProperty("totalPages")
    private int totalPages;

    public ArticleShortenPageDto(List<ArticleShortenDto> articles, int totalPages) {
        this.articles = articles;
        this.totalPages = totalPages;
    }
}
