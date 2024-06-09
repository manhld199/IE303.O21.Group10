package com.nhom10.forcat.util;

import static com.nhom10.forcat.util.JwtTokenUtil.getUserIdFromToken;

import org.bson.types.ObjectId;

public class GetIdFromTokenHeader {
    public  static ObjectId getUserIdFromTokenHeader(String tokenHeader){
        String token = tokenHeader.substring(7);
        return getUserIdFromToken(token);
    }
}
