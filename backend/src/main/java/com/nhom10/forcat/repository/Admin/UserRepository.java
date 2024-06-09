package com.nhom10.forcat.repository.Admin;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.nhom10.forcat.model.User.Users;

import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<Users, ObjectId>  {
    Users findByEmail(String email);
    long countByUserType(String userType);
    Users findByEmailAndPassword(String email, String password);
}
