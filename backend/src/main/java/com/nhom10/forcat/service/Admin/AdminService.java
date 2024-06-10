package com.nhom10.forcat.service.admin;

import com.nhom10.forcat.config.JwtTokenUtils;
import com.nhom10.forcat.repository.Admin.AdminRepository;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.nhom10.forcat.model.Admin.Admin;

@Service
@RequiredArgsConstructor
public class AdminService implements AdminLogin {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtils jwtTokenUtils;

    @Override
    public ResponseEntity<String> login(String email, String password) {
        try {
            Optional<Admin> adminOptional = adminRepository.findByAdminEmail(email);
            Admin admin = adminOptional.get();

            if (!passwordEncoder.matches(password, admin.getAdminPassword())) {
                return new ResponseEntity<>("Password not match", HttpStatus.UNAUTHORIZED);
            }

            return new ResponseEntity<>(jwtTokenUtils.generateToken(admin), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
