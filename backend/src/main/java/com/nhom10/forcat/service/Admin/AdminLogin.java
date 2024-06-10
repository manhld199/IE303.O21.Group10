package com.nhom10.forcat.service.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface AdminLogin {
    ResponseEntity<String> login(String email, String password);
}
