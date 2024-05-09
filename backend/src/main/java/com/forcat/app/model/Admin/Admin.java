package com.forcat.app.model.Admin;

import java.util.Date;
import lombok.Data;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "admins")
public class Admin {
    @Id
    private ObjectId admin_id;
    private String admin_login_name;
    private String admin_password;
    private String admin_email;
    private String admin_name;
    private AdminAvatar admin_avatar;
    private Date admin_created_at;
    private String[] admin_permissions;
    private Date created_at;
    private Date updated_at;

    public Admin() {
    }
}
