package com.nhom10.forcat.service.customer;

import com.nhom10.forcat.dto.Article.ArticleShortenDto;
import com.nhom10.forcat.dto.Article.ArticleShortenPageDto;
import com.nhom10.forcat.model.Article.Article;
import com.nhom10.forcat.repository.Article.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public ResponseEntity<ArticleShortenPageDto> getAllArticles(int p, int n) {
        try {
            Pageable pageable = PageRequest.of(p, n);
            Page<Article> page = articleRepository.findAllByOrderByCreatedAtDesc(pageable);
            List<Article> articles = page.getContent();
            int totalPages = page.getTotalPages();

            if (articles.isEmpty())
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);

            List<ArticleShortenDto> shortenArticles = articles.stream()
                    .map(article -> new ArticleShortenDto(article))
                    .collect(Collectors.toList());

            ArticleShortenPageDto returnedArticles = new ArticleShortenPageDto(shortenArticles, totalPages);

            return new ResponseEntity<>(returnedArticles, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
