// "use client";
// // import libs
// import classNames from "classnames/bind";
// import Link from "next/link";
// import { useState } from "react";

// // import utils
// import { isValidEmail } from "@/utils/index";
// import { BACKEND_URL } from "@/utils/commonConst";

// // import components
// // import OAuth from "../oAuth";

// // import css
// import styles from "../authForm.module.css";

// const cx = classNames.bind(styles);

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const initialForms = {
//     user_email: "",
//     user_password: "",
//   };

//   const [formData, setFormData] = useState(initialForms);
//   const [errors, setErrors] = useState(initialForms);
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors(initialForms);

//     // Check for validation
//     let isValid = true;
//     const newErrors = { ...initialForms };

//     if (!formData.user_email) {
//       newErrors.user_email = "Email không được bỏ trống!";
//       isValid = false;
//     } else if (!isValidEmail(formData.user_email)) {
//       newErrors.user_email = "Email không đúng định dạng!";
//       isValid = false;
//     }

//     if (!formData.user_password) {
//       newErrors.user_password = "Mật khẩu không được bỏ trống!";
//       isValid = false;
//     } else if (formData.user_password.length < 8) {
//       newErrors.user_password = "Độ dài mật khẩu phải trên 8 ký tự!";
//       isValid = false;
//     }

//     // Update state with errors
//     setErrors(newErrors);

//     if (isValid) {
//       try {
//         setLoading(true);
//         setErrors(initialForms);
//         const res = await fetch(`${BACKEND_URL}/auth/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData), // Assuming formData is an object
//           credentials: "include",
//         });
//         let data = await res.json();
//         setLoading(false);
//         if (data.status === 200) {
//           console.log("Login successful");
//           // Set the localStorage and currentUser state
//           localStorage.setItem("currentUser", JSON.stringify(data.data));
//           window.location.href = "/admin"; //xác thực thành công thì điều hướng về home
//         }

//         if (data.status == 404) {
//           newErrors.user_email = "Tài khoản không tồn tại!";
//           setErrors(newErrors);
//           return;
//         }

//         if (data.status == 401) {
//           newErrors.user_email = "Email không chính xác!";
//           newErrors.user_password = "Mật khẩu không chính xác!";
//           setErrors(newErrors);
//           return;
//         }
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//         setError(true);
//       }
//     }
//   };

//   return (
//     <form className={cx("form-auth")} onSubmit={handleSubmit}>
//       <div className={cx("form-auth__title")}>
//         <h1>ĐĂNG NHẬP HỆ THỐNG QUẢN TRỊ FORCAT!</h1>
//       </div>
//       <div className={cx("form-auth__input-content")}>
//         <label htmlFor="user_name">
//           Tên đăng nhập<span className={cx("red-start")}> *</span>
//         </label>
//         <div className={cx("input-container")}>
//           <input
//             className={cx("input-field")}
//             type="text"
//             placeholder="Nhập tên đăng nhập "
//             name="user_name"
//             id="user_name"
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className={cx("form-auth__input-content")}>
//         <label htmlFor="password">
//           Mật khẩu<span className={cx("red-start")}> *</span>
//         </label>
//         <div className={cx("input-container")}>
//           <input
//             className={cx("input-field")}
//             type={showPassword ? "text" : "password"}
//             placeholder="Nhập mật khẩu"
//             name="user_password"
//             id="user_password"
//             onChange={handleChange}
//           />
//           <span
//             className={cx("material-icons-outlined eye-open", "icon")}
//             onClick={handleTogglePasswordVisibility}>
//             {showPassword ? "visibility_off" : "visibility"}
//           </span>
//         </div>
//         {errors.user_password && (
//           <p className={cx("text-error", "form-error")}>
//             {errors.user_password}
//           </p>
//         )}
//       </div>
//       <Link href="/forgot" className={cx("align-right")}>
//         <p>Quên mật khẩu?</p>
//       </Link>
//       <button disabled={loading} className={cx("form-button")}>
//         <h3>{loading ? "Đang xử lý..." : "Đăng nhập"}</h3>
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

// "use client";
// // Import các thư viện cần thiết
// import React, { useReducer } from "react";
// import classNames from "classnames/bind";
// import Link from "next/link";
// import { useState } from "react";
// import { useRouter } from "next/router";

// // Import các tiện ích
// import { BACKEND_URL } from "@/utils/commonConst";

// // Import CSS
// import styles from "../authForm.module.css";

// const cx = classNames.bind(styles);

// interface FormData {
//   user_name: string;
//   user_password: string;
// }

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     user_name: "",
//     user_password: "",
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   // const router = useRouter(); // Sử dụng useRouter từ Next.js để điều hướng

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({});

//     // Kiểm tra tính hợp lệ của dữ liệu
//     let isValid = true;
//     const newErrors: Partial<FormData> = {};

//     if (!formData.user_name) {
//       newErrors.user_name = "Tên đăng nhập không được bỏ trống!";
//       isValid = false;
//     }

//     if (!formData.user_password) {
//       newErrors.user_password = "Mật khẩu không được bỏ trống!";
//       isValid = false;
//     } else if (formData.user_password.length < 8) {
//       newErrors.user_password = "Độ dài mật khẩu phải trên 8 ký tự!";
//       isValid = false;
//     }

//     setErrors(newErrors);

//     if (isValid) {
//       try {
//         setLoading(true);
//         const res = await fetch(`${BACKEND_URL}/admin/auth/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             username: formData.user_name,
//             password: formData.user_password,
//           }),
//           credentials: "include",
//         });

//         const data = await res.json();
//         setLoading(false);

//         if (res.status === 200) {
//           window.alert("Login successful");
//           localStorage.setItem("currentUser", JSON.stringify(data));
//           // router.push("/admin/dashboard"); // Điều hướng đến trang /admin/dashboard
//         } else if (res.status === 404) {
//           setErrors({ user_name: "Tài khoản không tồn tại!" });
//         } else if (res.status === 401) {
//           setErrors({
//             user_name: "Tên đăng nhập không chính xác!",
//             user_password: "Mật khẩu không chính xác!",
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//         setError(true);
//       }
//     }
//   };

//   return (
//     <form className={cx("form-auth")} onSubmit={handleSubmit}>
//       <div className={cx("form-auth__title")}>
//         <h1>ĐĂNG NHẬP HỆ THỐNG QUẢN TRỊ FORCAT!</h1>
//       </div>

//       <div className={cx("form-auth__input-content")}>
//         <label htmlFor="user_name">
//           Tên đăng nhập<span className={cx("red-start")}> *</span>
//         </label>
//         <div className={cx("input-container")}>
//           <input
//             className={cx("input-field")}
//             type="text"
//             placeholder="Nhập tên đăng nhập"
//             name="user_name"
//             id="user_name"
//             onChange={handleChange}
//           />
//         </div>
//         {errors.user_name && (
//           <p className={cx("text-error", "form-error")}>{errors.user_name}</p>
//         )}
//       </div>

//       <div className={cx("form-auth__input-content")}>
//         <label htmlFor="user_password">
//           Mật khẩu<span className={cx("red-start")}> *</span>
//         </label>
//         <div className={cx("input-container")}>
//           <input
//             className={cx("input-field")}
//             type={showPassword ? "text" : "password"}
//             placeholder="Nhập mật khẩu"
//             name="user_password"
//             id="user_password"
//             onChange={handleChange}
//           />
//           <span
//             className={cx("material-icons-outlined eye-open", "icon")}
//             onClick={handleTogglePasswordVisibility}>
//             {showPassword ? "visibility_off" : "visibility"}
//           </span>
//         </div>
//         {errors.user_password && (
//           <p className={cx("text-error", "form-error")}>
//             {errors.user_password}
//           </p>
//         )}
//       </div>

//       <Link href="/forgot" className={cx("align-right")}>
//         <p>Quên mật khẩu?</p>
//       </Link>

//       <button disabled={loading} className={cx("form-button")}>
//         <h3>{loading ? "Đang xử lý..." : "Đăng nhập"}</h3>
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

// "use client";
// // Import các thư viện cần thiết
// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import Link from "next/link";
// // import { useRouter } from "next/router";

// // Import các tiện ích
// import { BACKEND_URL } from "@/utils/commonConst";

// // Import CSS
// import styles from "../authForm.module.css";

// const cx = classNames.bind(styles);

// interface FormData {
//   user_email: string;
//   user_password: string;
// }

// const LoginForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState<FormData>({
//     user_email: "",
//     user_password: "",
//   });
//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   // const router = useRouter(); // Sử dụng useRouter từ Next.js để điều hướng

//   const handleTogglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setErrors({});

//     // Kiểm tra tính hợp lệ của dữ liệu
//     let isValid = true;
//     const newErrors: Partial<FormData> = {};

//     if (!formData.user_email) {
//       newErrors.user_email = "Email không được bỏ trống!";
//       isValid = false;
//     }

//     if (!formData.user_password) {
//       newErrors.user_password = "Mật khẩu không được bỏ trống!";
//       isValid = false;
//     } else if (formData.user_password.length < 8) {
//       newErrors.user_password = "Độ dài mật khẩu phải trên 8 ký tự!";
//       isValid = false;
//     }

//     setErrors(newErrors);

//     if (isValid) {
//       try {
//         setLoading(true);
//         const requestBody = JSON.stringify({
//           email: formData.user_email,
//           password: formData.user_password,
//         });

//         console.log("Request Body:", requestBody);

//         const res = await fetch(`${BACKEND_URL}/admin/auth/login`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: formData.user_email,
//             password: formData.user_password,
//           }),
//           credentials: "include",
//         });
//         console.log("Response Text:", res);

//         const data = await res.json();
//         setLoading(false);

//         if (res.status === 200) {
//           window.alert("Login successful");
//           localStorage.setItem("currentUser", JSON.stringify(data));
//           // router.push("/admin/dashboard"); // Điều hướng đến trang /admin/dashboard
//         } else if (res.status === 404) {
//           setErrors({ user_email: "Tài khoản không tồn tại!" });
//         } else if (res.status === 401) {
//           setErrors({
//             user_email: "Email không chính xác!",
//             user_password: "Mật khẩu không chính xác!",
//           });
//         }
//       } catch (error) {
//         console.error(error);
//         setLoading(false);
//         setError(true);
//       }
//     }
//   };

//   return (
//     <form className={cx("form-auth")} onSubmit={handleSubmit}>
//       <div className={cx("form-auth__title")}>
//         <h1>ĐĂNG NHẬP HỆ THỐNG QUẢN TRỊ FORCAT!</h1>
//       </div>

//       <div className={cx("form-auth__input-content")}>
//         <label htmlFor="user_email">
//           Email<span className={cx("red-start")}> *</span>
//         </label>
//         <div className={cx("input-container")}>
//           <input
//             className={cx("input-field")}
//             type="email"
//             placeholder="Nhập email"
//             name="user_email"
//             id="user_email"
//             onChange={handleChange}
//           />
//         </div>
//         {errors.user_email && (
//           <p className={cx("text-error", "form-error")}>{errors.user_email}</p>
//         )}
//       </div>

//       <div className={cx("form-auth__input-content")}>
//         <label htmlFor="user_password">
//           Mật khẩu<span className={cx("red-start")}> *</span>
//         </label>
//         <div className={cx("input-container")}>
//           <input
//             className={cx("input-field")}
//             type={showPassword ? "text" : "password"}
//             placeholder="Nhập mật khẩu"
//             name="user_password"
//             id="user_password"
//             onChange={handleChange}
//           />
//           <span
//             className={cx("material-icons-outlined eye-open", "icon")}
//             onClick={handleTogglePasswordVisibility}>
//             {showPassword ? "visibility_off" : "visibility"}
//           </span>
//         </div>
//         {errors.user_password && (
//           <p className={cx("text-error", "form-error")}>
//             {errors.user_password}
//           </p>
//         )}
//       </div>

//       <Link href="/forgot" className={cx("align-right")}>
//         <p>Quên mật khẩu?</p>
//       </Link>

//       <button disabled={loading} className={cx("form-button")}>
//         <h3>{loading ? "Đang xử lý..." : "Đăng nhập"}</h3>
//       </button>
//     </form>
//   );
// };

// export default LoginForm;

"use client";
// Import các thư viện cần thiết
import React, { useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";

// Import các tiện ích
import { BACKEND_URL } from "@/utils/commonConst";

// Import CSS
import styles from "../authForm.module.css";

const cx = classNames.bind(styles);

interface FormData {
  user_email: string;
  user_password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    user_email: "",
    user_password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setError(null);

    // Kiểm tra tính hợp lệ của dữ liệu
    let isValid = true;
    const newErrors: Partial<FormData> = {};

    if (!formData.user_email) {
      newErrors.user_email = "Email không được bỏ trống!";
      isValid = false;
    }

    if (!formData.user_password) {
      newErrors.user_password = "Mật khẩu không được bỏ trống!";
      isValid = false;
    } else if (formData.user_password.length < 8) {
      newErrors.user_password = "Độ dài mật khẩu phải trên 8 ký tự!";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        setLoading(true);
        const requestBody = JSON.stringify({
          email: formData.user_email,
          password: formData.user_password,
        });

        console.log("Request Body:", requestBody);

        const res = await fetch(`${BACKEND_URL}/admin/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: requestBody,
          credentials: "include",
        });

        const text = await res.text();
        console.log("Response Text:", text);

        if (res.status === 200) {
          const data = JSON.parse(text);
          console.log("Response Data:", data);
          setLoading(false);
          window.alert("Login successful"); // Thông báo đăng nhập thành công
          localStorage.setItem("currentUser", JSON.stringify(data));
        } else {
          console.error("Error Response:", res);
          setLoading(false);
          setError(`Error ${res.status}: ${text}`);
          // Optionally parse error text for more details if it's JSON
          try {
            const errorData = JSON.parse(text);
            console.error("Error Data:", errorData);
            setError(`Error ${res.status}: ${errorData}`);
          } catch (parseError) {
            console.error("Failed to parse error response as JSON.");
          }
        }
      } catch (error) {
        console.error("Fetch Error:", error);
        setLoading(false);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form className={cx("form-auth")} onSubmit={handleSubmit}>
      <div className={cx("form-auth__title")}>
        <h1>ĐĂNG NHẬP HỆ THỐNG QUẢN TRỊ FORCAT!</h1>
      </div>

      <div className={cx("form-auth__input-content")}>
        <label htmlFor="user_email">
          Email<span className={cx("red-start")}> *</span>
        </label>
        <div className={cx("input-container")}>
          <input
            className={cx("input-field")}
            type="email"
            placeholder="Nhập email"
            name="user_email"
            id="user_email"
            onChange={handleChange}
          />
        </div>
        {errors.user_email && (
          <p className={cx("text-error", "form-error")}>{errors.user_email}</p>
        )}
      </div>

      <div className={cx("form-auth__input-content")}>
        <label htmlFor="user_password">
          Mật khẩu<span className={cx("red-start")}> *</span>
        </label>
        <div className={cx("input-container")}>
          <input
            className={cx("input-field")}
            type={showPassword ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            name="user_password"
            id="user_password"
            onChange={handleChange}
          />
          <span
            className={cx("material-icons-outlined eye-open", "icon")}
            onClick={handleTogglePasswordVisibility}>
            {showPassword ? "visibility_off" : "visibility"}
          </span>
        </div>
        {errors.user_password && (
          <p className={cx("text-error", "form-error")}>
            {errors.user_password}
          </p>
        )}
      </div>

      {error && <p className={cx("text-error", "form-error")}>{error}</p>}

      <Link href="/forgot" className={cx("align-right")}>
        <p>Quên mật khẩu?</p>
      </Link>

      <button disabled={loading} className={cx("form-button")}>
        <h3>{loading ? "Đang xử lý..." : "Đăng nhập"}</h3>
      </button>
    </form>
  );
};

export default LoginForm;
