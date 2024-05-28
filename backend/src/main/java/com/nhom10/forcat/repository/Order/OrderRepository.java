package com.nhom10.forcat.repository.Order;

import com.nhom10.forcat.model.Order.Order;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderRepository extends MongoRepository<Order, ObjectId> {
    @Query("{ '_id' : { $in: ?0 } }")
    List<Order> findOrdersByIds(List<ObjectId> orderIds);
}
