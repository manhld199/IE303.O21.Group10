package com.nhom10.forcat.dto.User.responses;

import com.nhom10.forcat.model.User.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class UsersResponse {
    private Users users;
    private int orderQuantity;
}
