import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PriceHistogram = ({ products }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <div className="no-data">Нет данных для отображения</div>;
  }

  const prices = products.map(p => parseFloat(p.price) || 0);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const rangeCount = 10;
  const rangeSize = (maxPrice - minPrice) / rangeCount;

  const ranges = [];
  const counts = [];

  for (let i = 0; i < rangeCount; i++) {
    const start = minPrice + i * rangeSize;
    const end = minPrice + (i + 1) * rangeSize;

    ranges.push(`${Math.round(start).toLocaleString()} - ${Math.round(end).toLocaleString()} ₽`);

    const count = prices.filter(price => price >= start && price < end).length;
    counts.push(count);
  }

  const data = {
    labels: ranges,
    datasets: [
      {
        label: 'Количество товаров',
        data: counts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Товаров: ${context.parsed.y}`;
          }
        }
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
          text: 'Диапазон цен'
        }
      }
    }
  };

  return (
    <div className="chart-wrapper">
      <Bar data={data} options={options} height={300} />
    </div>
  );
};

export default PriceHistogram;