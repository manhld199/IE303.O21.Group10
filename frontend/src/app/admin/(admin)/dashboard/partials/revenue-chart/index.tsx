"use client";

// import libs
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function RevenueChart({ revenues }: { revenues: any }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Lấy tham chiếu đến phần tử canvas trong DOM
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // Định nghĩa dữ liệu biểu đồ (ví dụ)
      const data = {
        labels: [
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
        ],
        datasets: [
          {
            label: "Doanh thu",
            data: revenues,
            backgroundColor: "rgba(75, 192, 192, 0.5)", // Màu nền của area
            borderColor: "rgba(75, 192, 192, 1)", // Màu viền của area
            borderWidth: 2,
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
          type: "line",
          data: data,
          options: options,
        });

        // Lưu tham chiếu đến biểu đồ để tái sử dụng và hủy bỏ sau này
        chartRef.current = chart;
      }
    }
  }, []);

  return <canvas ref={canvasRef} id="area"></canvas>;
}
