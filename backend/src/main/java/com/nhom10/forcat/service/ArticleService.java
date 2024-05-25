package com.nhom10.forcat.service;

import com.nhom10.forcat.model.Article.Article;
import com.nhom10.forcat.repository.Article.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }
}
