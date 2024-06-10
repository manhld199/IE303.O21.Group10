package com.nhom10.forcat.model.Admin;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import lombok.Data;
import java.util.Date;

@Data
@Document(collection = "admin")
public class Admin {
    @Id
    @Field(name = "_id")
    @JsonProperty("admin_id")
    private ObjectId adminId;

    @Field(name = "admin_login_name")
    @JsonProperty("admin_login_name")
    private String adminLoginName;

    @Field(name = "admin_password")
    @JsonProperty("admin_password")
    private String adminPassword;

    @Field(name = "admin_email")
    @JsonProperty("admin_email")
    private String adminEmail;

    @Field(name = "admin_name")
    @JsonProperty("admin_name")
    private String adminName;

    @Field(name = "role")
    @JsonProperty("role")
    private String role;

    @Field(name = "admin_avatar")
    @JsonProperty("admin_avatar")
    private AdminAvatar adminAvatar;

    @Field(name = "admin_created_at")
    @JsonProperty("admin_created_at")
    private Date adminCreatedAt;

    @Field(name = "admin_permissions")
    @JsonProperty("admin_permissions")
    private String[] adminPermissions;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Admin() {
    }
}
