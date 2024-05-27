package com.nhom10.forcat.model.Article;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import java.util.Date;

@Data
@Document(collection = "articles")
public class Article {
    @Id
    @Field(name = "_id")
    @JsonProperty("article_id")
    private ObjectId articleId;

    @Field(name = "article_title")
    @JsonProperty("article_title")
    private String articleTitle;

    @Field(name = "article_subtitle")
    @JsonProperty("article_subtitle")
    private String articleSubtitle;

    @Field(name = "article_slug")
    @JsonProperty("article_slug")
    private String articleSlug;

    @Field(name = "article_type")
    @JsonProperty("article_type")
    private String articleType;

    @Field(name = "article_avt")
    @JsonProperty("article_avt")
    private ArticleAvt articleAvt;

    @Field(name = "article_short_description")
    @JsonProperty("article_short_description")
    private String articleShortDescription;

    @Field(name = "article_description")
    @JsonProperty("article_description")
    private String articleDescription;

    @Field(name = "article_author")
    @JsonProperty("article_author")
    private String articleAuthor;

    @Field(name = "article_published_date")
    @JsonProperty("article_published_date")
    private Date articlePublishedDate;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Article() {
    }
}
