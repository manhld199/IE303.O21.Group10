package com.nhom10.forcat.service.user;

import com.nhom10.forcat.dto.User.requests.UserInfoRequest;
// import com.nhom10.forcat.dto.User.responses.UserInfoResponse;
import com.nhom10.forcat.dto.User.responses.UsersResponse;
import com.nhom10.forcat.model.User.Users;
// import com.nhom10.forcat.repositories.MessagesDAO;
import com.nhom10.forcat.repository.Admin.UserRepository;
import org.bson.types.ObjectId;
// import com.nhom10.forcat.repositories.OrdersDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

// import static com.nhom10.forcat.util.AddHostUrl.addHostUrlForImage;
// import static com.nhom10.forcat.util.GenerateSlugUtil.convertToSlug;
import static com.nhom10.forcat.util.JwtTokenUtil.getUserInfoFromTokenHeader;

// @Component
@Service
public class UsersImpl implements UsersService {

    @Autowired
    private UserRepository userRepository;
    // @Autowired
    // private OrdersDAO ordersDAO;
    @Autowired
    private PasswordEncoder passwordEncoder;
    // @Autowired
    // private MessagesDAO messagesDAO;
    @Override
    public List<Users> getAllUser() {
        return userRepository.findAll();
    }

    @Override
    public void saveUser(Users user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    @Override
    public boolean isEmailRegistered(String email) {
        return userRepository.findByEmail(email) != null;
    }

    @Override
    public Users isEmailAndPasswordCorrect(String email, String enteredPassword) {
        Users storedUser = userRepository.findByEmail(email);
        if (storedUser != null && authenticate(enteredPassword, storedUser.getPassword())){
            return storedUser;
        }
        return null;
    }

    @Override
    public boolean authenticate(String enteredPassword, String storedPassword) {
        return passwordEncoder.matches(enteredPassword, storedPassword);
    }

    public List<UsersResponse> getAllSellerByAdmin() {
        List<Users> users = userRepository.findAll();
        List<Users> sellersList = new ArrayList<>();
        for (Users user : users) {
            if (user.getUserType().equals("seller")) {
                sellersList.add(user);
            }
        }
        List<UsersResponse> usersList = new ArrayList<>();

        // for (Users seller : sellersList) {
        //     addHostUrlForImage(seller);
        //     UsersResponse user = UsersResponse.builder()
        //             .users(seller)
        //             .build();
        //     usersList.add(user);
        // }
        return usersList;
    }

    public List<UsersResponse> getAllUserByAdmin() {
        List<Users> users = userRepository.findAll();
        List<Users> customersList = new ArrayList<>();
        for (Users user : users) {
            if (user.getUserType().equals("client")) {
                customersList.add(user);
            }
        }
        List<UsersResponse> usersList = new ArrayList<>();

        // for (Users cus : customersList) {
        //     addHostUrlForImage(cus);
        //     int orderQuantity = ordersDAO.countByUserId(cus.getId());
        //     UsersResponse user = UsersResponse.builder()
        //             .users(cus)
        //             .orderQuantity(orderQuantity)
        //             .build();
        //     usersList.add(user);
        // }
        return usersList;
    }

    @Override
    public Users findById(ObjectId userId){
        Optional<Users> optionalUser = userRepository.findById(userId);
        Users user = optionalUser.get();
        //Them duong dan cho anh
        // addHostUrlForImage(user);
        return user;
    }
    @Override
    public Users updateUserProfile(String tokenHeader, UserInfoRequest userNewInfo) throws IOException {
        UserInfoRequest userInfoRequest = getUserInfoFromTokenHeader(tokenHeader);
        Users userStored = isEmailAndPasswordCorrect(userInfoRequest.getEmail(), userNewInfo.getOld_password());
        if(userStored != null){
            if(!(userNewInfo.getName() == null || userNewInfo.getName().isBlank())){
                userStored.setName(userNewInfo.getName());
            }
            if(!(userNewInfo.getEmail() == null || userNewInfo.getEmail().isBlank())){
                userStored.setEmail(userNewInfo.getEmail());
            }
            // if(!(userNewInfo.getImage() == null || userNewInfo.getImage().isBlank())){
            //     String imagePath = saveBase64ImageToFile(userNewInfo.getImage(),convertToSlug(userStored.getEmail()));
            //     userStored.setImage(imagePath);
            // }
            if(!(userNewInfo.getPassword() == null || userNewInfo.getPassword().isBlank())){
                userStored.setPassword(passwordEncoder.encode(userNewInfo.getPassword()));
            }
            userRepository.save(userStored);

            //Them duong dan cho anh
            // addHostUrlForImage(userStored);
            return  userStored;
        } else {
            return null;
        }
    }
    // @Override
    // public void countOrdersAndMessages(UserInfoResponse userInfoResponse){
    //     userInfoResponse.setTotalMessages(messagesDAO.findByUserId(userInfoResponse.getId()).size());
    //     userInfoResponse.setTotalOrders(ordersDAO.findByUserId(userInfoResponse.getId()).size());
    // }
}
