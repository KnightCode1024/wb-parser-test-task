import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const ProductTable = ({ products }) => {
  const columns = [
    { field: 'name', headerName: 'Название товара', width: 250 },
    {
      field: 'price',
      headerName: 'Цена',
      width: 120,
      valueFormatter: (params) => `${params.value.toLocaleString()} ₽`
    },
    {
      field: 'discountedPrice',
      headerName: 'Цена со скидкой',
      width: 150,
      valueFormatter: (params) => `${params.value.toLocaleString()} ₽`,
      renderCell: (params) => (
        <Box sx={{ color: params.row.discountedPrice < params.row.price ? 'success.main' : 'inherit' }}>
          {params.value.toLocaleString()} ₽
        </Box>
      )
    },
    {
      field: 'rating',
      headerName: 'Рейтинг',
      width: 120,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ color: 'warning.main', mr: 1 }}>★</Box>
          {params.value.toFixed(1)}
        </Box>
      )
    },
    { field: 'reviewCount', headerName: 'Отзывов', width: 120 }
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductTable;