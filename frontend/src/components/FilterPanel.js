import React from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, setFilters, products }) => {
  const maxPrice = Array.isArray(products) && products.length > 0
    ? Math.max(...products.map(p => parseFloat(p.price) || 0))
    : 100000;

  const maxRating = 5;
  const maxReviews = Array.isArray(products) && products.length > 0
    ? Math.max(...products.map(p => parseInt(p.count_review) || 0))
    : 1000;

    const handleFilterChange = (key, value) => {
    const numValue = parseFloat(value) || 0;

    setFilters(prev => {
      const newFilters = {
        ...prev,
        [key]: numValue
      };

      if (key === 'minPrice' && numValue > newFilters.maxPrice) {
        newFilters.maxPrice = numValue;
      }
      if (key === 'maxPrice' && numValue < newFilters.minPrice) {
        newFilters.minPrice = numValue;
      }

      return newFilters;
    });
  };

  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: maxPrice,
      minRating: 0,
      minReviews: 0
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price));
  };

  return (
    <div className="filter-panel">
      <h3>Фильтры</h3>

      <div className="filter-group">
        <label>Диапазон цен:</label>
        <div className="price-range-container">
          <div className="price-range-track">
            <input
              type="range"
              min="0"
              max={maxPrice}
              step="100"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              className="range-slider range-slider-min"
            />
            <input
              type="range"
              min="0"
              max={maxPrice}
              step="100"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              className="range-slider range-slider-max"
            />
          </div>
          <div className="price-labels">
            <span className="price-label">
              От: <strong>{formatPrice(filters.minPrice)} ₽</strong>
            </span>
            <span className="price-label">
              До: <strong>{formatPrice(filters.maxPrice)} ₽</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <label>Минимальный рейтинг: {filters.minRating}</label>
        <input
          type="range"
          min="0"
          max={maxRating}
          step="0.1"
          value={filters.minRating}
          onChange={(e) => handleFilterChange('minRating', e.target.value)}
          className="range-slider"
        />
        <div className="rating-display">
          {'★'.repeat(Math.floor(filters.minRating))}
          {'☆'.repeat(5 - Math.floor(filters.minRating))}
        </div>
      </div>

      <div className="filter-group">
        <label>Минимальное количество отзывов: {filters.minReviews}</label>
        <input
          type="range"
          min="0"
          max={maxReviews}
          step="10"
          value={filters.minReviews}
          onChange={(e) => handleFilterChange('minReviews', e.target.value)}
          className="range-slider"
        />
      </div>

      <button onClick={resetFilters} className="reset-filters-btn">
        Сбросить фильтры
      </button>
    </div>
  );
};

export default FilterPanel;