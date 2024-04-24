"use client";

// import libs
import React, { useEffect, useRef } from "react";
import Chart, { TooltipItem } from "chart.js/auto";

export default function RevenueChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Lấy tham chiếu đến phần tử canvas trong DOM
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const data = {
        labels: ["Danh mục A", "Danh mục B", "Danh mục C"], // Nhãn của các danh mục
        datasets: [
          {
            data: [40, 30, 30], // Phần trăm doanh thu của các danh mục
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Màu sắc cho các phần tử trong biểu đồ
          },
        ],
      };

      // Cấu hình biểu đồ
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context: any) => {
                const label = context.label || "";
                const value = context.parsed || 0;
                return `${label}: ${value}%`;
              },
            },
          },
          legend: {
            display: true,
            position: "bottom",
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
          type: "doughnut",
          data: data,
          options: options,
        });

        // Lưu tham chiếu đến biểu đồ để tái sử dụng và hủy bỏ sau này
        chartRef.current = chart;
      }
    }
  }, []);

  return <canvas ref={canvasRef} id="donut" />;
}
