import React, { useState, useEffect, useMemo } from 'react';
import ProductTable from '../components/ProductTable/ProductTable';
import PriceHistogram from '../components/PriceHistogram/PriceHistogram';
import DiscountRatingChart from '../components/DiscountRatingChart/DiscountRatingChart';
import Filters from '../components/Filters/Filters';
import { generateMockProducts } from '../../utils/mockData';
import { Box, Grid, Paper, Typography } from '@mui/material';

const ProductsPage = () => {
  const allProducts = useMemo(() => generateMockProducts(200), []);

  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    minRating: 0,
    minReviews: 0
  });

  const filteredProducts = useMemo(() => {
    return allProducts.filter(product => {
      return (
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1] &&
        product.rating >= filters.minRating &&
        product.reviewCount >= filters.minReviews
      );
    });
  }, [allProducts, filters]);

  const priceHistogramData = useMemo(() => {
    const priceRanges = [
      { min: 0, max: 1000, label: '0-1000' },
      { min: 1001, max: 2000, label: '1001-2000' },
      { min: 2001, max: 3000, label: '2001-3000' },
      { min: 3001, max: 4000, label: '3001-4000' },
      { min: 4001, max: 5000, label: '4001-5000' },
      { min: 5001, max: 10000, label: '5001-10000' },
    ];

    return priceRanges.map(range => {
      const count = filteredProducts.filter(
        p => p.price >= range.min && p.price <= range.max
      ).length;
      return { ...range, count };
    });
  }, [filteredProducts]);

  const discountRatingData = useMemo(() => {
    return filteredProducts.map(product => ({
      discount: ((product.price - product.discountedPrice) / product.price * 100).toFixed(1),
      rating: product.rating
    }));
  }, [filteredProducts]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Анализ товаров
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Filters
              filters={filters}
              setFilters={setFilters}
              maxPrice={Math.max(...allProducts.map(p => p.price))}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <ProductTable products={filteredProducts} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <PriceHistogram data={priceHistogramData} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <DiscountRatingChart data={discountRatingData} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsPage;