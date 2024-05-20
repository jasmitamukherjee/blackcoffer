import React from 'react';
import { Button, Menu, MenuItem, useTheme } from '@mui/material';
import { FilterList } from '@mui/icons-material';

const FilterMenu = ({ filterAnchorEl, selectedFilter, onFilterClick, onFilterClose, onFilterSelect }) => {
  const theme = useTheme()
  return (
    <>
      <Button
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={onFilterClick}
        startIcon={<FilterList />}
        sx={{ ml: 2 ,color: theme.palette.text.primary }}
      >
        {selectedFilter ? `Filter: ${selectedFilter}` : 'Filter'}
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={filterAnchorEl}
        keepMounted
        open={Boolean(filterAnchorEl)}
        onClose={onFilterClose}
      >
        <MenuItem onClick={() => onFilterSelect('')}>No Filter</MenuItem>
        <MenuItem onClick={() => onFilterSelect('end_year')}>End Year</MenuItem>
        <MenuItem onClick={() => onFilterSelect('sector')}>Sector</MenuItem>
        <MenuItem onClick={() => onFilterSelect('topic')}>Topic</MenuItem>
        <MenuItem onClick={() => onFilterSelect('region')}>Region</MenuItem>
        <MenuItem onClick={() => onFilterSelect('pestel')}>PESTEL</MenuItem>
        <MenuItem onClick={() => onFilterSelect('source')}>Source</MenuItem>
        <MenuItem onClick={() => onFilterSelect('country')}>Country</MenuItem>
      </Menu>
    </>
  );
};

export default FilterMenu;
