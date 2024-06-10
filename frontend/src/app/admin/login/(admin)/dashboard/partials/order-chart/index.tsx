"use client";

// import libs
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

function getLastThreeMonths() {
  const currentDate = new Date();
  const months = [];
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  for (let i = 0; i < 3; i++) {
    const month = currentDate.getMonth(); // Lấy tháng hiện tại (0-11)

    // Thêm tên tháng vào mảng
    months.push(monthNames[month]);

    // Trừ 1 tháng từ ngày hiện tại
    currentDate.setMonth(currentDate.getMonth() - 1);
  }

  return months.reverse();
}

export default function OrderChart({ newOrders }: { newOrders: any }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Lấy tham chiếu đến phần tử canvas trong DOM
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // Định nghĩa dữ liệu biểu đồ
      const data = {
        labels: getLastThreeMonths(), // Nhãn của các tháng
        datasets: [
          {
            label: "Đơn đặt mới",
            data: newOrders.new_orders, // Dữ liệu số đơn đặt mới theo tháng
            backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền của cột "Đơn đặt mới"
            borderColor: "rgba(75, 192, 192, 1)", // Màu viền của cột "Đơn đặt mới"
            borderWidth: 1,
          },
          {
            label: "Đã thanh toán",
            data: newOrders.payed_orders, // Dữ liệu số đơn đã thanh toán theo tháng
            backgroundColor: "rgba(54, 162, 235, 0.5)", // Màu nền của cột "Đã thanh toán"
            borderColor: "rgba(54, 162, 235, 1)", // Màu viền của cột "Đã thanh toán"
            borderWidth: 1,
          },
          {
            label: "Đã hủy",
            data: newOrders.canceled_orders, // Dữ liệu số đơn đã hủy theo tháng
            backgroundColor: "rgba(255, 99, 132, 0.5)", // Màu nền của cột "Đã hủy"
            borderColor: "rgba(255, 99, 132, 1)", // Màu viền của cột "Đã hủy"
            borderWidth: 1,
          },
        ],
      };

      // Cấu hình biểu đồ
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            maxTicksLimit: 5, // Giới hạn số lượng tick trên trục y
          },
        },
      };

      if (ctx) {
        // Hủy bỏ biểu đồ trước nếu tồn tại
        if (chartRef.current) {
          chartRef.current.destroy();
        }

        // Tạo biểu đồ mới
        const chart = new Chart(ctx, {
          type: "bar",
          data: data,
          options: options,
        });

        // Lưu tham chiếu đến biểu đồ để tái sử dụng và hủy bỏ sau này
        chartRef.current = chart;
      }
    }
  }, []);

  return <canvas ref={canvasRef} id="bar"></canvas>;
}
