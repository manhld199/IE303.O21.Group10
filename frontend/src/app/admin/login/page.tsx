// import libs
import classNames from "classnames/bind";
import Image from "next/image";
import type { Metadata } from "next";

// import components
import { AuthLoginForm } from "@/components";

import "./page.css";

const AdminLoginPage = () => {
  return (
    <main className="login-container">
      <div className="auth__forms-wrap">
        <div className="auth__form__inner-box">
          <div className="login__forms-wrap">
            <AuthLoginForm />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLoginPage;
