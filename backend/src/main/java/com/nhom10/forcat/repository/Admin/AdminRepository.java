package com.nhom10.forcat.repository.Admin;

import com.nhom10.forcat.model.Admin.Admin;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, ObjectId> {
    Optional<Admin> findByAdminLoginName(String adminLoginName);

    Optional<Admin> findByAdminEmail(String adminEmail);
}
