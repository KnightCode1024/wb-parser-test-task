import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

const DiscountRatingChart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: 'Скидка vs Рейтинг',
        data: data.map(item => ({
          x: parseFloat(item.discount),
          y: parseFloat(item.rating)
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        pointRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Зависимость скидки от рейтинга'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Рейтинг'
        },
        min: 0,
        max: 5
      },
      x: {
        title: {
          display: true,
          text: 'Размер скидки (%)'
        },
        min: 0
      }
    }
  };

  return <Scatter data={chartData} options={options} />;
};

export default DiscountRatingChart;