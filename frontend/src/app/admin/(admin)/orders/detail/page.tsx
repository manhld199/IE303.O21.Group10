"use client";

// import libs
import useSWR, { Fetcher } from "swr";
import { notFound } from "next/navigation";
import Skeleton from "react-loading-skeleton";

// import utils
import { BACKEND_URL_ORDERS } from "@/utils/commonConst";
import {
  convertDateToFormatHHMMDDMMYYYY,
  convertOrderStatusToStr,
  parseNumToCurrencyStr,
  convertOrderStatusToIconData,
} from "@/utils";

// import components
import { CustomerProductItemInOrderItem } from "@/components";

// import css
import "./page.css";
import "react-loading-skeleton/dist/skeleton.css";

interface IOrderDetailProps {
  _id: string;
  order_buyer: { order_name: string; order_phone: string };
  order_address: {
    street: string;
    ward: string;
    district: string;
    province: string;
  };
  order_details: IProductItemInOrderItemProps[];
  order_total_cost: number;
  order_status: string;
  payment_id: string;
  createdAt: string;
}

const demoData: IOrderDetailProps = {
  _id: "123456",
  order_buyer: { order_name: "Nguyen Van A", order_phone: "0901234567" },
  order_address: {
    street: "123 Le Loi",
    ward: "Ward 1",
    district: "District 1",
    province: "Ho Chi Minh City",
  },
  order_details: [
    {
      product_id_hashed: "prod1",
      product_name: "Product 1",
      product_price: 100000,
      product_quantity: 2,
    },
    {
      product_id_hashed: "prod2",
      product_name: "Product 2",
      product_price: 200000,
      product_quantity: 1,
    },
  ],
  order_total_cost: 400000,
  order_status: "completed",
  payment_id: "pay123",
  createdAt: "2023-05-01T10:00:00Z",
};

export default function PurchaseDetailPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { data, error, isLoading } = {
    data: demoData,
    error: null,
    isLoading: false,
  };

  if (isLoading)
    return (
      <main className="order-detail">
        <div className="order-detail--top">
          <span className="order-detail__overview">
            <h2>Chi tiết đơn hàng: #{params.orderId}</h2>
            <Skeleton />
          </span>
          <Skeleton />
        </div>
        <div className="order-detail__info-receive">
          <h2>
            <span className="material-icons">location_on</span>
            <span>Thông tin nhận hàng</span>
          </h2>
          <Skeleton className="order-detail__info-receive-data" count={3} />
        </div>
        <div className="order-detail__paying-method">
          <h2>
            <span className="material-icons">credit_card</span>
            <span>Thông tin thanh toán</span>
          </h2>
          <Skeleton className="order-detail__info-receive-data" />
        </div>
        <div className="order-detail__products">
          <h2>
            <span className="material-icons">shopping_bag</span>
            <span>Thông tin sản phẩm</span>
          </h2>
          <Skeleton className="order-detail__products-wrapper" count={3} />
        </div>
      </main>
    );

  if (error) return notFound();

  const {
    _id,
    order_buyer,
    payment_id,
    order_details,
    order_total_cost,
    order_address,
    order_status,
    createdAt: order_date,
  } = data;
  const { order_name, order_phone } = order_buyer;
  const { street, ward, district, province } = order_address;

  return (
    <main className="order-detail">
      <div className="order-detail--top">
        <span className="order-detail__overview">
          <h2>Chi tiết đơn hàng: #{_id}</h2>
          <span>
            Đặt lúc: {convertDateToFormatHHMMDDMMYYYY(new Date(order_date))}
          </span>
        </span>
        <span className={`order-detail__status ${order_status}`}>
          {/* <span className="material-icons">
            {convertOrderStatusToIconData(order_status)}
          </span>
          {convertOrderStatusToStr(order_status)} */}
        </span>
      </div>
      <div className="order-detail__info-receive">
        <h2>
          <span className="material-icons">location_on</span>
          <span>Thông tin nhận hàng</span>
        </h2>
        <table className="order-detail__info-receive-data">
          <tbody>
            <tr>
              <th>Người nhận: </th>
              <td>{order_name}</td>
            </tr>
            <tr>
              <th>Số điện thoại:</th>
              <td>{order_phone}</td>
            </tr>
            <tr>
              <th>Địa chỉ: </th>
              <td>{[street, ward, district, province].join(", ")}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="order-detail__paying-method">
        <h2>
          <span className="material-icons">credit_card</span>
          <span>Thông tin thanh toán</span>
        </h2>
        <span>Thanh toán bằng thẻ tín dụng</span>
      </div>
      <div className="order-detail__products">
        <h2>
          <span className="material-icons">shopping_bag</span>
          <span>Thông tin sản phẩm</span>
        </h2>
        <div className="order-detail__products-wrapper">
          {/* {order_details.map((product) => (
            <CustomerProductItemInOrderItem
              key={product.product_id_hashed}
              {...product}
            />
          ))} */}
        </div>
        <hr />
        <table className="order-detail__cost">
          <tbody>
            <tr>
              <th>Tạm tính:</th>
              <td>{parseNumToCurrencyStr(order_total_cost)} đ</td>
            </tr>
            <tr>
              <th>Thành tiền:</th>
              <td>{parseNumToCurrencyStr(order_total_cost)} đ</td>
            </tr>
            <tr>
              <th>Tổng cộng:</th>
              <td>{parseNumToCurrencyStr(order_total_cost)} đ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
