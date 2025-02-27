package com.nhom10.forcat.repository.Order;

import com.nhom10.forcat.model.Order.Order;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderRepository extends MongoRepository<Order, ObjectId> {
    Page<Order> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("{ '_id' : { $in: ?0 } }")
    List<Order> findOrdersByIds(List<ObjectId> orderIds);

    @Query("{ 'created_at' : { $gte: ?0, $lt: ?1 } }")
    List<Order> findAllOrdersByTime(Date startOfYear, Date endOfYear);
}
