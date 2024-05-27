package com.nhom10.forcat.repository.Guest;

import com.nhom10.forcat.model.Guest.Guest;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GuestRepository extends MongoRepository<Guest, ObjectId> {
    Optional<Guest> findByGuestPhoneNumber(String guestPhoneNumber);
}

