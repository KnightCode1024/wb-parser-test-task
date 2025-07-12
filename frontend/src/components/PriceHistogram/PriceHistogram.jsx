import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PriceHistogram = ({ data }) => {
  const chartData = {
    labels: data.map(range => range.label),
    datasets: [
      {
        label: 'Количество товаров',
        data: data.map(range => range.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Распределение цен на товары'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Количество товаров'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Диапазон цен (₽)'
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default PriceHistogram;