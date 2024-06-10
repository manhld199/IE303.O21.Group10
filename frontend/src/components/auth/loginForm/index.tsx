"use client";
// Import các thư viện cần thiết
import classNames from "classnames/bind";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

// Import các tiện ích
import { BACKEND_URL } from "@/utils/commonConst";

// Import CSS
import styles from "../authForm.module.css";

const cx = classNames.bind(styles);

interface FormData {
  user_name: string;
  user_password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    user_name: "",
    user_password: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const router = useRouter(); // Sử dụng useRouter từ Next.js để điều hướng

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Kiểm tra tính hợp lệ của dữ liệu
    let isValid = true;
    const newErrors: Partial<FormData> = {};

    if (!formData.user_name) {
      newErrors.user_name = "Tên đăng nhập không được bỏ trống!";
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
        const res = await fetch(`${BACKEND_URL}/admin/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.user_name,
            password: formData.user_password,
          }),
          credentials: "include",
        });

        const data = await res.text();
        setLoading(false);

        if (res.status === 200) {
          window.alert("Login successful");
          // localStorage.setItem("user-token", JSON.stringify(data));
          Cookies.set("user-token", data, { expires: 7 });
          location.href = "/admin/dashboard"; // Điều hướng đến trang /admin/dashboard
        } else if (res.status === 404) {
          setErrors({ user_name: "Tài khoản không tồn tại!" });
        } else if (res.status === 401) {
          setErrors({
            user_name: "Tên đăng nhập không chính xác!",
            user_password: "Mật khẩu không chính xác!",
          });
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    }
  };

  return (
    <form className={cx("form-auth")} onSubmit={handleSubmit}>
      <div className={cx("form-auth__title")}>
        <h1>ĐĂNG NHẬP HỆ THỐNG QUẢN TRỊ FORCAT!</h1>
      </div>

      <div className={cx("form-auth__input-content")}>
        <label htmlFor="user_name">
          Tên đăng nhập<span className={cx("red-start")}> *</span>
        </label>
        <div className={cx("input-container")}>
          <input
            className={cx("input-field")}
            type="text"
            placeholder="Nhập tên đăng nhập"
            name="user_name"
            id="user_name"
            onChange={handleChange}
          />
        </div>
        {errors.user_name && (
          <p className={cx("text-error", "form-error")}>{errors.user_name}</p>
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
