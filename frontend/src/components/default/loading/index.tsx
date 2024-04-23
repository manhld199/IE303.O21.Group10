// import libs
import React from "react";
import styles from "./loading.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
