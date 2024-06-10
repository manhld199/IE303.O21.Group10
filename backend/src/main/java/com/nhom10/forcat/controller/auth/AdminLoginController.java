package com.nhom10.forcat.controller.auth;

import com.nhom10.forcat.dto.Admin.AdminLoginDto;
import com.nhom10.forcat.service.admin.AdminService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/admin/auth")
@RequiredArgsConstructor
public class AdminLoginController {
    private final AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminLoginDto adminLoginDTO, HttpServletRequest request) {
        try {
            return adminService.login(adminLoginDTO.getEmail(), adminLoginDTO.getPassword());
        } catch (Exception e) {
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.OK, "Invalid email or password");
        }
    }
}