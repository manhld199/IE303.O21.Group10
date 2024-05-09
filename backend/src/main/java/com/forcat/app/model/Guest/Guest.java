package com.forcat.app.model.Guest;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "guests")
public class Guest {
    @Id
    private ObjectId guestId;
    private String guestPhoneNumber;
    private String[] guestOrder;
    private double guestTotalSpent;
    private Date created_at;
    private Date updated_at;

    public Guest() {
    }
}
