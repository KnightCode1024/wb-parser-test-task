import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DiscountRatingChart = ({ products }) => {
  if (!Array.isArray(products) || products.length === 0) {
    return <div className="no-data">Нет данных для отображения</div>;
  }

  const productsWithDiscount = products.filter(p =>
    p.discounted_price && parseFloat(p.discounted_price) < parseFloat(p.price)
  );

  if (productsWithDiscount.length === 0) {
    return <div className="no-data">Нет товаров со скидками</div>;
  }

  const discountData = productsWithDiscount.map(p => {
    const originalPrice = parseFloat(p.price);
    const discountedPrice = parseFloat(p.discounted_price);
    const discountPercent = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return {
      rating: parseFloat(p.rating),
      discount: discountPercent
    };
  });

  const groupedData = {};
  discountData.forEach(item => {
    const roundedRating = Math.round(item.rating * 2) / 2;
    if (!groupedData[roundedRating]) {
      groupedData[roundedRating] = [];
    }
    groupedData[roundedRating].push(item.discount);
  });

  const ratings = Object.keys(groupedData).sort((a, b) => parseFloat(a) - parseFloat(b));
  const avgDiscounts = ratings.map(rating => {
    const discounts = groupedData[rating];
    const avgDiscount = discounts.reduce((sum, discount) => sum + discount, 0) / discounts.length;
    return avgDiscount;
  });

  const data = {
    labels: ratings.map(r => `${r}★`),
    datasets: [
      {
        label: 'Средняя скидка (%)',
        data: avgDiscounts,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.1,
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
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
            return `Средняя скидка: ${context.parsed.y.toFixed(1)}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Скидка (%)'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Рейтинг'
        }
      }
    }
  };

  return (
    <div className="chart-wrapper">
      <Line data={data} options={options} height={300} />
    </div>
  );
};

export default DiscountRatingChart;