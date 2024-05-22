// import libs
import React from "react";

// import partials
import {
  AdminRevenueChart,
  AdminOrderChart,
  AdminCategoryChart,
} from "./partials";

// import css
import "./page.css";

export default async function AdminDashboardPage() {
  return (
    <main className="dashboard">
      <section className="dashboard__summary dashboard-summary">
        <div className="dashboard-summary__item">
          <div className="dashboard-summary__item-icon-div">
            <span className="material-icons-round dashboard-summary__item-icon">
              groups
            </span>
          </div>
          <div className="dashboard-summary__item-content">
            <p className="dashboard-summary__item-title">Khách hàng</p>
            <p className="dashboard-summary__item-number">1.000</p>
          </div>
        </div>
        <div className="dashboard-summary__item">
          <div className="dashboard-summary__item-icon-div">
            <span className="material-icons-round dashboard-summary__item-icon">
              groups
            </span>
          </div>
          <div className="dashboard-summary__item-content">
            <p className="dashboard-summary__item-title">Khách hàng</p>
            <p className="dashboard-summary__item-number">1.000</p>
          </div>
        </div>
        <div className="dashboard-summary__item">
          <div className="dashboard-summary__item-icon-div">
            <span className="material-icons-round dashboard-summary__item-icon">
              groups
            </span>
          </div>
          <div className="dashboard-summary__item-content">
            <p className="dashboard-summary__item-title">Khách hàng</p>
            <p className="dashboard-summary__item-number">1.000</p>
          </div>
        </div>
      </section>

      <section className="dashboard__chart--full chart-full">
        <h2 className="chart-title">Doanh thu trong năm</h2>
        <AdminRevenueChart />
      </section>

      <section className="dashboard__chart-group chart-group">
        <div className="chart-group__item">
          <h2 className="chart-title">Đơn hàng mới</h2>
          <AdminOrderChart />
        </div>

        <div className="chart-group__item">
          <h2 className="chart-title">Doanh thu trên danh mục sản phẩm</h2>
          <AdminCategoryChart />
        </div>
      </section>
    </main>
  );
}
