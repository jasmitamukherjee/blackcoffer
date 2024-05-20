import React from 'react';
import { Box, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = ({ searchText, onSearchChange, onSearchClick }) => {
  return (
    <Box
      backgroundColor="background.alt"
      borderRadius="9px"
      gap="1.5rem"
      p="0.1rem 1.5rem"
      display="flex"
      alignItems="center"
    >
      <InputBase
        placeholder='Search...'
        value={searchText}
        onChange={onSearchChange}
      />
      <IconButton onClick={onSearchClick}>
        <Search />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
