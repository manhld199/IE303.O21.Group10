package com.nhom10.forcat.controller.user;

// import com.nhom10.forcat.dto.User.requests.UserInfoRequest;
// import com.nhom10.forcat.dto.User.responses.UserInfoResponse;
import com.nhom10.forcat.dto.User.responses.UserLoginResponse;
// import com.nhom10.forcat.dto.User.responses.UsersResponse;
import com.nhom10.forcat.enums.Role;
import com.nhom10.forcat.model.User.Users;
import com.nhom10.forcat.service.user.UsersImpl;
import com.nhom10.forcat.util.JwtTokenUtil;

// import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

// import  java.util.List;
// import static com.nhom10.forcat.util.AddHostUrl.addHostUrlForImage;
// import static com.nhom10.forcat.util.GenerateSlugUtil.convertToSlug;
// import static com.nhom10.forcat.util.GetIdFromTokenHeader.getUserIdFromTokenHeader;
// import static com.nhom10.forcat.util.SaveImageBase64Util.saveBase64ImageToFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin/auth")
public class UsersController {

    @Autowired
    private UsersImpl usersService;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody Users user) {
        try {
            Users loginUser = usersService.isEmailAndPasswordCorrect(user.getEmail(), user.getPassword());
            if (loginUser != null) {
                if (loginUser.getUserType().equals(Role.ADMIN.name())) {
                    //Them duong dan cho anh
                    // addHostUrlForImage(loginUser);
                    String token = JwtTokenUtil.generateToken(loginUser);
                    return ResponseEntity.ok().body(new UserLoginResponse(loginUser, token));
                }
                return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                        .body("Email hoặc mật khẩu không chính xác");
            }
            return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
                    .body("Không tồn tại tài khoản!");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi đăng nhập" + ex.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> adminLogout() {
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok().build();
    }

    // @GetMapping({""})
    // public ResponseEntity<?> getListUser(){
    //     List<Users> users = usersService.getAllUser();
    //     return ResponseEntity.ok(users);
    // }

//     @GetMapping({"/admin/useraccount"})
//     public ResponseEntity<?> getListUserByAdmin(){
//         List<UsersResponse> users = usersService.getAllUserByAdmin();
// //        List<Users> users = new ArrayList<>();
//         return ResponseEntity.ok(users);
//     }

//     @GetMapping({"/admin/staffaccount"})
//     public ResponseEntity<?> getListSellerByAdmin(){
//         List<UsersResponse> users = usersService.getAllSellerByAdmin();
// //        List<Users> users = new ArrayList<>();
//         return ResponseEntity.ok(users);
//     }

    // @PostMapping("/login")
    // public ResponseEntity<?> customerLogin(@RequestBody Users user){
    //     try {
    //         Users loginUser = usersService.isEmailAndPasswordCorrect(user.getEmail(), user.getPassword());
    //         if (loginUser != null) {
    //             if(loginUser.getUserType().equals(Role.client.name())){
    //                 //Them duong dan cho anh
    //                 // addHostUrlForImage(loginUser);
    //                 String token = JwtTokenUtil.generateToken(loginUser);
    //                 return ResponseEntity.ok().body(new UserLoginResponse(loginUser, token));
    //             }
    //             return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
    //                     .body("Email hoặc mật khẩu không chính xác");
    //         }
    //         return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
    //                 .body("Email hoặc mật khẩu không chính xác");
    //     } catch (Exception ex) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi đăng nhập" + ex.getMessage());
    //     }
    // }
    // @PostMapping("/register")
    // public  ResponseEntity<?> customerRegister(@RequestBody Users user){
    //     try {
    //         if (usersService.isEmailRegistered(user.getEmail())) {
    //             return ResponseEntity.badRequest().body("Email này đã được đăng ký rồi");
    //         }
    //         // user.setImage(saveBase64ImageToFile(user.getImage(), convertToSlug(user.getEmail())));
    //         user.setUserType(Role.client.name());
    //         usersService.saveUser(user);
    //         return ResponseEntity.ok().body("Đăng ký thành công");
    //     } catch (Exception ex) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đăng ký thất bại: " + ex.getMessage());
    //     }
    // }


    // @PostMapping("/getlogout")
    // public ResponseEntity<?> customerLogout() {
    //     SecurityContextHolder.clearContext();
    //     return ResponseEntity.ok().build();
    // }

    // @PostMapping("/seller/login")
    // public ResponseEntity<?> sellerLogin(@RequestBody Users user){
    //     try {
    //         Users loginUser = usersService.isEmailAndPasswordCorrect(user.getEmail(), user.getPassword());
    //         if (loginUser != null) {
    //             if(loginUser.getUserType().equals(Role.seller.name())){
    //                 //Them duong dan cho anh
    //                 // addHostUrlForImage(loginUser);
    //                 String token = JwtTokenUtil.generateToken(loginUser);
    //                 return ResponseEntity.ok().body(new UserLoginResponse(loginUser, token));
    //             }
    //             return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
    //                     .body("Email hoặc mật khẩu không chính xác");
    //         }
    //         return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY)
    //                 .body("Email hoặc mật khẩu không chính xác");
    //     } catch (Exception ex) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi đăng nhập" + ex.getMessage());
    //     }
    // }
    // @PostMapping("/admin/addstaff")
    // public  ResponseEntity<?> sellerRegister(@RequestBody Users user){
    //     try {
    //         if (usersService.isEmailRegistered(user.getEmail())) {
    //             return ResponseEntity.badRequest().body("Email này đã được đăng ký rồi");
    //         }
    //         // user.setImage(saveBase64ImageToFile(user.getImage(), convertToSlug(user.getEmail())));
    //         user.setUserType(Role.seller.name());
    //         usersService.saveUser(user);
    //         return ResponseEntity.ok().body("Đăng ký thành công");
    //     } catch (Exception ex) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đăng ký thất bại: " + ex.getMessage());
    //     }
    // }

    // @PostMapping("/seller/logout")
    // public ResponseEntity<?> sellerLogout() {
    //     SecurityContextHolder.clearContext();
    //     return ResponseEntity.ok().build();
    // }

    
    // @PostMapping("/admin/register")
    // public  ResponseEntity<?> adminRegister(@RequestBody Users user){
    //     try {
    //         if (usersService.isEmailRegistered(user.getEmail())) {
    //             return ResponseEntity.badRequest().body("Email này đã được đăng ký rồi");
    //         }
    //         // user.setImage(saveBase64ImageToFile(user.getImage(), convertToSlug(user.getEmail())));
    //         user.setUserType(Role.ADMIN.name());
    //         usersService.saveUser(user);
    //         return ResponseEntity.ok().body("Đăng ký thành công");
    //     } catch (Exception ex) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Đăng ký thất bại: " + ex.getMessage());
    //     }
    // }

    // @GetMapping({"/seller", "/admin", "/me"})
    // public ResponseEntity<?> getSelfInfo(@RequestHeader ("Authorization") String tokenHeader){
    //     ObjectId userId = getUserIdFromTokenHeader(tokenHeader);
    //     UserInfoResponse userRequire = new UserInfoResponse(usersService.findById(userId));
    //     // if (userRequire.getUser_type().equals(Role.client.name())){
    //     //     usersService.countOrdersAndMessages(userRequire);
    //     // }
    //     return ResponseEntity.ok().body(userRequire);
    // }

    // @PostMapping({"/admin/updateprofile", "/seller/updateprofile", "/updateprofile"})
    // public ResponseEntity<?> updateProfile(@RequestHeader ("Authorization") String tokenHeader, @RequestBody UserInfoRequest userNewInfo){
    //     try {
    //         Users userStored = usersService.updateUserProfile(tokenHeader, userNewInfo);
    //         if(userStored != null) {
    //             return ResponseEntity.ok().body(new UserInfoResponse(userStored));
    //         } else {
    //             return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Cập nhật thất bại");
    //         }
    //     } catch (Exception ex) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Cập nhật thất bại: " + ex.getMessage());
    //     }
    // }
}
