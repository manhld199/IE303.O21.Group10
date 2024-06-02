package com.nhom10.forcat.service.admin;

import com.nhom10.forcat.model.Admin.Admin;
import com.nhom10.forcat.repository.Admin.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AdminLoginService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    // @Autowired
    // private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByAdminLoginName(username)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found with username: " + username));
        return new AdminPrincipal(admin);
    }

    public Admin authenticate(String username, String password) {
        Admin admin = adminRepository.findByAdminLoginName(username)
                .orElse(null);
        if (admin != null) {
            return admin;
        }
        return null;
    }
}
