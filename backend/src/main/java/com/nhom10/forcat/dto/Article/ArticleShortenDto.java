package com.nhom10.forcat.dto.Article;

import org.bson.types.ObjectId;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nhom10.forcat.model.Article.Article;
import com.nhom10.forcat.model.Article.ArticleAvt;

public class ArticleShortenDto {
    @JsonProperty("article_id")
    private ObjectId articleId;

    @JsonProperty("article_title")
    private String articleTitle;

    @JsonProperty("article_short_description")
    private String articleShortDescription;

    @JsonProperty("article_slug")
    private String articleSlug;

    @JsonProperty("article_type")
    private String articleType;

    @JsonProperty("article_avt")
    private ArticleAvt articleAvt;

    public ArticleShortenDto(Article article) {
        this.articleId = article.getArticleId();
        this.articleTitle = article.getArticleTitle();
        this.articleShortDescription = article.getArticleShortDescription();
        this.articleSlug = article.getArticleSlug();
        this.articleType = article.getArticleType();
        this.articleAvt = article.getArticleAvt();
    }
}
