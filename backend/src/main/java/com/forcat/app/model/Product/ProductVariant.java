package com.forcat.app.model.Product;

import lombok.Data;

@Data
public class ProductVariant {
    private String variant_name;
    private String variant_slug;
    private double variant_price;
    private ProductImg variant_img;
    private String discount_id;
    private int in_stock;

    public ProductVariant() {
    }
}
