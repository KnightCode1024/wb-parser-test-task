import React, { useState } from 'react';
import './ProductTable.css';

const ProductTable = ({ products }) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    if (['price', 'discounted_price', 'rating', 'count_review'].includes(sortConfig.key)) {
      aValue = parseFloat(aValue) || 0;
      bValue = parseFloat(bValue) || 0;
    } else {
      aValue = aValue || '';
      bValue = bValue || '';
    }

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="no-data">
        <p>Нет данных для отображения. Выполните поиск товаров.</p>
      </div>
    );
  }

  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} className="sortable">
              Название товара {getSortIcon('name')}
            </th>
            <th onClick={() => handleSort('price')} className="sortable">
              Цена {getSortIcon('price')}
            </th>
            <th onClick={() => handleSort('discounted_price')} className="sortable">
              Цена со скидкой {getSortIcon('discounted_price')}
            </th>
            <th onClick={() => handleSort('rating')} className="sortable">
              Рейтинг {getSortIcon('rating')}
            </th>
            <th onClick={() => handleSort('count_review')} className="sortable">
              Количество отзывов {getSortIcon('count_review')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product, index) => (
            <tr key={product.id || index}>
              <td className="product-name">{product.name}</td>
              <td className="price">{formatPrice(product.price)}</td>
              <td className="discounted-price">
                {product.discounted_price ? formatPrice(product.discounted_price) : '-'}
              </td>
              <td className="rating">
                <span className="rating-value">{product.rating}</span>
                <span className="rating-stars">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
              </td>
              <td className="reviews">{product.count_review}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;