package com.nhom10.forcat.dto.User.responses;

import com.nhom10.forcat.model.User.Users;
import org.bson.types.ObjectId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {
    private ObjectId id;
    private String name;
    private String email;
    private String image_url;
    private String user_type;
    private int totalOrders;
    private int totalMessages;

    public UserInfoResponse (Users user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.image_url = user.getAvatar().getUrl();
        this.user_type = user.getUserType();
    }
    public UserInfoResponse (ObjectId id, String name, String email, String user_type){
        this.id = id;
        this.name = name;
        this.email = email;
        this.user_type = user_type;
    }
}
