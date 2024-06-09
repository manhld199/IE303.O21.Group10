package com.nhom10.forcat.model.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class Avatar {
    @Field(name = "url")
    @JsonProperty("url")
    private String url;

    @Field(name = "alt")
    @JsonProperty("alt")
    private String alt;

    public Avatar() {
    }
}
