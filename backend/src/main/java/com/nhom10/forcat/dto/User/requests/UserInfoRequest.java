package com.nhom10.forcat.dto.User.requests;

import org.bson.types.ObjectId;

import com.nhom10.forcat.model.User.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoRequest {
    private ObjectId id;
    private String name;
    private String email;
    private String image;
    private String user_type;
    private String old_password;
    private String password;
    private String password_confirmation;

    public UserInfoRequest (Users user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.image = user.getAvatar().getUrl();
        this.user_type = user.getUserType();
    }
    public UserInfoRequest (ObjectId id, String name, String email, String user_type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.user_type = user_type;
    }
}
