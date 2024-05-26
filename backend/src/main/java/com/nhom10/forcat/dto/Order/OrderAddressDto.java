package com.nhom10.forcat.dto.Order;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class OrderAddressDto {
    @JsonProperty("street")
    private String street;

    @JsonProperty("ward")
    private String ward;

    @JsonProperty("district")
    private String district;

    @JsonProperty("province")
    private String province;

    public OrderAddressDto(String street, String ward, String district, String province) {
        this.street = street;
        this.ward = ward;
        this.district = district;
        this.province = province;
    }
}