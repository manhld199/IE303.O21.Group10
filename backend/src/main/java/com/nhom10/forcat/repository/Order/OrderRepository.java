package com.nhom10.forcat.repository.Order;

import com.nhom10.forcat.model.Order.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, ObjectId> {
}

