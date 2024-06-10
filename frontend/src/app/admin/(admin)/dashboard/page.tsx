// import libs
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// import partials
import {
  AdminRevenueChart,
  AdminOrderChart,
  AdminCategoryChart,
} from "./partials";

// import utils
import { BACKEND_URL } from "@/utils/commonConst";

// import css
import "./page.css";

const getRevenues = async (userToken: any) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/admin/statistics/getRevenues`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        next: { revalidate: 60 },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

const getNewOders = async (userToken: any) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/admin/statistics/getNewOrders`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        next: { revalidate: 60 },
      }
    );

    const data = await response.json();

    const returnedData = {
      new_orders: Array.from(data.new_orders).reverse(),
      payed_orders: Array.from(data.payed_orders).reverse(),
      canceled_order: Array.from(data.canceled_orders).reverse(),
    };

    return returnedData;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

const getCategoryPercents = async (userToken: any) => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/admin/statistics/getCategoryPercents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        next: { revalidate: 60 },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

const getSummary = async (userToken: any) => {
  try {
    const response = await fetch(`${BACKEND_URL}/admin/statistics/getSummary`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      next: { revalidate: 60 },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching recommend products:", error);
  }
};

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const userToken = cookieStore.get("user-token")?.value;

  if (!userToken) redirect("/admin/login");

  const revenues = await getRevenues(userToken);
  // console.log(revenues);

  const newOrders = await getNewOders(userToken);
  // console.log(newOrders);

  const categoryPercents = await getCategoryPercents(userToken);
  // console.log(categoryPercents);

  const summary = await getSummary(userToken);
  // console.log(summary);

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
            <p className="dashboard-summary__item-number">
              {summary.total_customers}
            </p>
          </div>
        </div>
        <div className="dashboard-summary__item">
          <div className="dashboard-summary__item-icon-div">
            <span className="material-icons-round dashboard-summary__item-icon">
              shopping_bag
            </span>
          </div>
          <div className="dashboard-summary__item-content">
            <p className="dashboard-summary__item-title">Đặt hàng</p>
            <p className="dashboard-summary__item-number">
              {summary.total_orders}
            </p>
          </div>
        </div>
        <div className="dashboard-summary__item">
          <div className="dashboard-summary__item-icon-div">
            <span className="material-icons-round dashboard-summary__item-icon">
              inventory_2
            </span>
          </div>
          <div className="dashboard-summary__item-content">
            <p className="dashboard-summary__item-title">Sản phẩm</p>
            <p className="dashboard-summary__item-number">
              {summary.total_products}
            </p>
          </div>
        </div>
      </section>

      <section className="dashboard__chart--full chart-full">
        <h2 className="chart-title">Doanh thu trong năm</h2>
        <AdminRevenueChart revenues={revenues} />
      </section>

      <section className="dashboard__chart-group chart-group">
        <div className="chart-group__item">
          <h2 className="chart-title">Đơn hàng mới</h2>
          <AdminOrderChart newOrders={newOrders} />
        </div>

        <div className="chart-group__item">
          <h2 className="chart-title">Doanh thu trên danh mục sản phẩm</h2>
          <AdminCategoryChart categoryPercents={categoryPercents} />
        </div>
      </section>
    </main>
  );
}
