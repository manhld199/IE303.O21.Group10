package com.nhom10.forcat.service.admin;

import java.time.Year;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.nhom10.forcat.dto.Statistic.StatisticCategoryPercent;
import com.nhom10.forcat.dto.Statistic.StatisticNewOrdersDto;
import com.nhom10.forcat.dto.Statistic.StatisticSummary;
import com.nhom10.forcat.model.Category.Category;
import com.nhom10.forcat.model.Guest.Guest;
import com.nhom10.forcat.model.Order.Order;
import com.nhom10.forcat.model.Order.OrderDetail;
import com.nhom10.forcat.model.Product.Product;
import com.nhom10.forcat.model.Product.ProductCategory;
import com.nhom10.forcat.repository.Category.CategoryRepository;
import com.nhom10.forcat.repository.Guest.GuestRepository;
import com.nhom10.forcat.repository.Order.OrderRepository;
import com.nhom10.forcat.repository.Product.ProductRepository;

@Service
public class AdminStatisticalService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    GuestRepository guestRepository;

    public ResponseEntity<List<Double>> getRevenue() {
        try {
            List<Double> revenues = Arrays.asList(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0);

            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.YEAR, Year.now().getValue());
            calendar.set(Calendar.MONTH, Calendar.JANUARY);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            Date startOfYear = calendar.getTime();

            calendar.set(Calendar.MONTH, Calendar.DECEMBER);
            calendar.set(Calendar.DAY_OF_MONTH, 31);
            calendar.set(Calendar.HOUR_OF_DAY, 23);
            calendar.set(Calendar.MINUTE, 59);
            calendar.set(Calendar.SECOND, 59);
            Date endOfYear = calendar.getTime();

            List<Order> orders = orderRepository.findAllOrdersByTime(startOfYear, endOfYear);

            if (orders.size() == 0)
                return new ResponseEntity<>(revenues, HttpStatus.OK);

            for (Order order : orders) {
                Calendar createdAt = Calendar.getInstance();
                createdAt.setTime(order.getCreatedAt());
                int month = createdAt.get(Calendar.MONTH);

                revenues.set(month, revenues.get(month) + order.getOrderTotalCost());
            }

            return new ResponseEntity<>(revenues, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<StatisticNewOrdersDto> getNewOrders() {
        try {
            StatisticNewOrdersDto statisticNewOrders = new StatisticNewOrdersDto();

            Calendar calendar = Calendar.getInstance();
            calendar.add(Calendar.MONTH, -3);
            calendar.set(Calendar.DAY_OF_MONTH, 1);
            calendar.set(Calendar.HOUR_OF_DAY, 0);
            calendar.set(Calendar.MINUTE, 0);
            calendar.set(Calendar.SECOND, 0);
            Date startOfThreeMonthsAgo = calendar.getTime();

            Date currentDate = new Date();

            List<Order> orders = orderRepository.findAllOrdersByTime(startOfThreeMonthsAgo, currentDate);

            if (orders.size() == 0)
                return new ResponseEntity<>(statisticNewOrders, HttpStatus.OK);

            calendar.setTime(currentDate);
            int currentMonth = calendar.get(Calendar.MONTH);
            for (Order order : orders) {
                Calendar createdAt = Calendar.getInstance();
                createdAt.setTime(order.getCreatedAt());
                int month = createdAt.get(Calendar.MONTH);

                if (currentMonth - month <= 2) {
                    statisticNewOrders.getNewOrders().set((month - currentMonth) * -1,
                            statisticNewOrders.getNewOrders().get(currentMonth - month) + 1);

                    if (order.getOrderProcessInfo().equalsIgnoreCase("Đã giao"))
                        statisticNewOrders.getPayedOrders().set((month - currentMonth) * -1,
                                statisticNewOrders.getPayedOrders().get(currentMonth - month) + 1);
                    else if (order.getOrderProcessInfo().equalsIgnoreCase("Đã hủy"))
                        statisticNewOrders.getCanceledOrders().set((month - currentMonth) * -1,
                                statisticNewOrders.getCanceledOrders().get(currentMonth - month) + 1);
                }
            }

            return new ResponseEntity<>(statisticNewOrders, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<StatisticCategoryPercent>> getCategoryPercents() {
        try {
            List<Category> categories = categoryRepository.findAll();
            List<String> categoryNames = categories.stream()
                    .map(category -> category.getCategoryName())
                    .collect(Collectors.toList());
            List<StatisticCategoryPercent> categoryPercents = categoryNames.stream()
                    .map(categoryName -> new StatisticCategoryPercent(categoryName))
                    .collect(Collectors.toList());

            Double totalRevenue = 0.0;
            List<Order> orders = orderRepository.findAll();

            for (Order order : orders) {
                totalRevenue += order.getOrderTotalCost();

                for (OrderDetail orderDetail : order.getOrderDetails()) {
                    ObjectId productId = new ObjectId(orderDetail.getProductId());

                    Optional<Product> productOptional = productRepository.findById(productId);
                    if (!productOptional.isPresent())
                        continue;
                    Product product = productOptional.get();

                    for (ProductCategory productCategory : product.getCategories()) {
                        int categoryIndex = categoryNames.indexOf(productCategory.getCategoryName());
                        categoryPercents.get(categoryIndex)
                                .setCategoryTotalRevenue(categoryPercents.get(categoryIndex).getCategoryTotalRevenue()
                                        + orderDetail.getQuantity() * orderDetail.getUnitPrice());
                    }
                }
            }

            for (StatisticCategoryPercent categoryPercent : categoryPercents)
                categoryPercent.setCategoryPercent((categoryPercent.getCategoryTotalRevenue()
                        / totalRevenue) * 100);

            List<StatisticCategoryPercent> filteredCategoryPercents = categoryPercents.stream()
                    .filter(categoryPercent -> categoryPercent.getCategoryPercent() > 0)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(filteredCategoryPercents, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<StatisticSummary> getSummary() {
        try {
            List<Guest> guests = guestRepository.findAll();
            int totalCustomers = guests.size();

            List<Order> orders = orderRepository.findAll();
            int totalOrders = orders.size();

            List<Product> products = productRepository.findAll();
            int totalProducts = products.size();

            StatisticSummary summary = new StatisticSummary(totalCustomers, totalOrders, totalProducts);

            return new ResponseEntity<>(summary, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
