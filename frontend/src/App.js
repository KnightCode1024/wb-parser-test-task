import React, { useState, useEffect } from 'react';
import './App.css';
import ProductTable from './components/ProductTable';
import PriceHistogram from './components/PriceHistogram';
import DiscountRatingChart from './components/DiscountRatingChart';
import FilterPanel from './components/FilterPanel';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 100000,
    minRating: 0,
    minReviews: 0
  });

    const fetchProducts = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/products/?search=${encodeURIComponent(query)}`);
      const data = await response.json();

      const productsArray = Array.isArray(data) ? data : (data.results || []);

      setProducts(productsArray);
      setFilteredProducts(productsArray);
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      alert('Ошибка загрузки данных. Убедитесь, что backend сервер запущен.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products.filter(product => {
      const price = parseFloat(product.price);
      const rating = parseFloat(product.rating);
      const reviews = parseInt(product.count_review);

      return price >= filters.minPrice &&
             price <= filters.maxPrice &&
             rating >= filters.minRating &&
             reviews >= filters.minReviews;
    });

    setFilteredProducts(filtered);
  }, [products, filters]);

  useEffect(() => {
    if (products.length > 0) {
      const maxPrice = Math.max(...products.map(p => parseFloat(p.price) || 0));
      setFilters(prev => ({
        ...prev,
        maxPrice: Math.max(prev.maxPrice, maxPrice)
      }));
    }
  }, [products]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(searchQuery);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wildberries Парсер</h1>
      </header>

      <main className="App-main">
                <div className="search-section">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Введите поисковый запрос..."
              className="search-input"
            />
            <button type="submit" disabled={loading} className="search-button">
              {loading ? 'Загрузка...' : 'Найти товары'}
            </button>
          </form>
        </div>

        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          products={products}
        />

        <div className="charts-section">
          <div className="chart-container">
            <h3>Распределение цен</h3>
            <PriceHistogram products={filteredProducts} />
          </div>
          <div className="chart-container">
            <h3>Скидка vs Рейтинг</h3>
            <DiscountRatingChart products={filteredProducts} />
          </div>
        </div>

        <div className="table-section">
          <h3>Товары ({filteredProducts.length})</h3>
          <ProductTable products={filteredProducts} />
        </div>
      </main>
    </div>
  );
}

export default App;
