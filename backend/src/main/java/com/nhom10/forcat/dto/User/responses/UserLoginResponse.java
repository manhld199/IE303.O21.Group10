package com.nhom10.forcat.dto.User.responses;

import com.nhom10.forcat.model.User.Users;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserLoginResponse {
    private Users user;
    private String token;

    public UserLoginResponse(Users user, String token){
        this.user = user;
        this.token = token;
    }
}
