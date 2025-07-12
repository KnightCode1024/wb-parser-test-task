import React from 'react';
import {
  Slider,
  Typography,
  Divider,
  Stack,
  TextField
} from '@mui/material';

const Filters = ({ filters, setFilters, maxPrice }) => {
  const handlePriceChange = (event, newValue) => {
    setFilters({ ...filters, priceRange: newValue });
  };

  const handleRatingChange = (event) => {
    setFilters({ ...filters, minRating: parseFloat(event.target.value) });
  };

  const handleReviewsChange = (event) => {
    setFilters({ ...filters, minReviews: parseInt(event.target.value) });
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6">Фильтры</Typography>

      <div>
        <Typography gutterBottom>Диапазон цен</Typography>
        <Slider
          value={filters.priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          step={100}
          valueLabelFormat={(value) => `${value} ₽`}
        />
      </div>

      <Divider />

      <TextField
        label="Минимальный рейтинг"
        type="number"
        inputProps={{ min: 0, max: 5, step: 0.1 }}
        value={filters.minRating}
        onChange={handleRatingChange}
        fullWidth
      />

      <TextField
        label="Минимальное количество отзывов"
        type="number"
        inputProps={{ min: 0 }}
        value={filters.minReviews}
        onChange={handleReviewsChange}
        fullWidth
      />
    </Stack>
  );
};

export default Filters;