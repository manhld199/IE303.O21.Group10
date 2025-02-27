package com.nhom10.forcat.controller.customer;

import com.nhom10.forcat.dto.Article.ArticleShortenPageDto;
import com.nhom10.forcat.model.Article.Article;
import com.nhom10.forcat.service.customer.CustomerArticleService;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/articles")
public class CustomerArticleController {

    @Autowired
    private CustomerArticleService articleService;

    @GetMapping("/getArticles")
    public ResponseEntity<ArticleShortenPageDto> getAllArticles(@RequestParam(name = "p", required = true) int page) {
        return articleService.getAllArticles(page, 6);
    }

    @GetMapping("/getArticle/{articleId}")
    public ResponseEntity<Article> getArticle(@PathVariable String articleId) {
        ObjectId articlObjectId = new ObjectId(articleId);

        return articleService.getArticleByArticleId(articlObjectId);
    }

}
