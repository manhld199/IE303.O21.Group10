package com.nhom10.forcat.service.user;

import com.nhom10.forcat.dto.User.requests.UserInfoRequest;
import com.nhom10.forcat.model.User.Users;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.io.IOException;
import  java.util.List;

@Service
public interface UsersService {
    public List<Users> getAllUser();
    public void saveUser(Users user);
    public boolean isEmailRegistered(String email);
    public com.nhom10.forcat.model.User.Users isEmailAndPasswordCorrect(String email, String password);
    public boolean authenticate (String enteredPassword, String storedPassword);
    public Users findById(ObjectId userId);
    public Users updateUserProfile(String tokenHeader, UserInfoRequest userNewInfo) throws IOException;
    // public void countOrdersAndMessages(UserInfoResponse userInfoResponse);
}
