package org.iesbelen.service;

import org.iesbelen.domain.Admin;
import org.iesbelen.repository.AdminRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public Admin oneByEmail(String email) {
        return this.adminRepository.findByEmail(email);
    }
}
