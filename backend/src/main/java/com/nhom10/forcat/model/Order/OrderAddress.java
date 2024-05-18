package com.nhom10.forcat.model.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Field;
import lombok.Data;

@Data
public class OrderAddress {
    @Field(name = "street")
    @JsonProperty("street")
    private String street;

    @Field(name = "ward")
    @JsonProperty("ward")
    private String ward;

    @Field(name = "district")
    @JsonProperty("district")
    private String district;

    @Field(name = "province")
    @JsonProperty("province")
    private String province;

    public OrderAddress() {
    }
}
