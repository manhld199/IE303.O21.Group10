"use client";

// import libs
import React, { useEffect, useRef } from "react";
import Chart, { TooltipItem } from "chart.js/auto";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function RevenueChart({
  categoryPercents,
}: {
  categoryPercents: any;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const greaterThan1Percents = categoryPercents.filter(
    (categoryPercent) => categoryPercent.category_percent >= 1
  );

  const lessThan1Percents = categoryPercents.filter(
    (categoryPercent) => categoryPercent.category_percent < 1
  );

  const elseCategoryPercents = {
    category_name: "Khác",
    category_percent: lessThan1Percents.reduce(
      (sum, categoryPercent) => sum + categoryPercent.category_percent,
      0
    ),
  };

  greaterThan1Percents.push(elseCategoryPercents);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Lấy tham chiếu đến phần tử canvas trong DOM
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const data = {
        labels: greaterThan1Percents.map(
          (categoryPercent) => categoryPercent.category_name
        ), // Nhãn của các danh mục
        datasets: [
          {
            data: greaterThan1Percents.map(
              (categoryPercent) => categoryPercent.category_percent
            ), // Phần trăm doanh thu của các danh mục
            backgroundColor: greaterThan1Percents.map(() => getRandomColor()), // Màu sắc ngẫu nhiên cho các phần tử trong biểu đồ
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
          options: options as any,
        });

        // Lưu tham chiếu đến biểu đồ để tái sử dụng và hủy bỏ sau này
        (chartRef as any).current = chart;
      }
    }
  }, []);

  return <canvas ref={canvasRef} id="donut" />;
}
