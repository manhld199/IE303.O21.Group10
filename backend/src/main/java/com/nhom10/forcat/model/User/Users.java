package com.nhom10.forcat.model.User;

import lombok.*;
import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@Document(collection = "user")
public class Users {
    @Id
    @Field(name = "_id")
    @JsonProperty("id")
    private ObjectId id;

    @Field(name = "name")
    @JsonProperty("name")
    private String name;

    @Field(name = "email")
    @JsonProperty("email")
    private String email;

    @Field(name = "password")
    @JsonProperty("password")
    private String password;

    @Field(name = "user_type")
    @JsonProperty("user_type")
    private String userType;

    @Field(name = "avatar")
    @JsonProperty("avatar")
    private Avatar avatar;

    @Field(name = "created_at")
    @JsonProperty("created_at")
    private Date createdAt;

    @Field(name = "updated_at")
    @JsonProperty("updated_at")
    private Date updatedAt;

    public Users() {
    }

    public Users (String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}