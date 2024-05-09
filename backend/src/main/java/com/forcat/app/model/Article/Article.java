package com.forcat.app.model.Article;

import java.util.Date;
import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "articles")
public class Article {
    @Id
    private ObjectId article_id;
    private String article_title;
    private String article_subtitle;
    private String article_slug;
    private String article_type;
    private ArticleAvt article_avt;
    private String article_short_description;
    private String article_author;
    private Date article_published_date;
    private Date created_at;
    private Date updated_at;

    public Article() {
    }
}
