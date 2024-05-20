import { Box, useTheme, AppBar, Toolbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import useFetchAllData from 'state/useFetchAllData';
import OverviewVisualization from 'components/OverviewVisualization';
import SearchBar from 'components/SearchBar';
import FilterMenu from 'components/FilterMenu';

const Overview = () => {
  const theme = useTheme();
  const { data } = useFetchAllData();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('');

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const applyFilters = () => {
    let filtered = data;

    if (selectedFilter) {
      filtered = filtered.filter(insight => insight[selectedFilter] && insight[selectedFilter].trim() !== '');
    }

    if (searchText) {
      filtered = filtered.filter(insight => {
        const searchTextLower = searchText.toLowerCase();
        if (selectedFilter) {
          return insight[selectedFilter]?.toLowerCase().includes(searchTextLower);
        }
        return insight.title.toLowerCase().includes(searchTextLower) ||
          insight.sector?.toLowerCase().includes(searchTextLower) ||
          insight.country?.toLowerCase().includes(searchTextLower);
      });
    }

    setFilteredData(filtered);
  };

  const handleSearchClick = () => {
    applyFilters();
  };

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (field) => {
    setSelectedFilter(field);
    handleFilterClose();
    applyFilters();
  };

  return (
    <>
      <Toolbar sx={{
        justifyContent: "space-between"
      }}>
        <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px"
          gap="1.5rem"
          p="0.1rem 1.5rem"
        >
          <SearchBar
            searchText={searchText}
            onSearchChange={handleSearchChange}
            onSearchClick={handleSearchClick}
          />
          <FilterMenu
            filterAnchorEl={filterAnchorEl}
            selectedFilter={selectedFilter}
            onFilterClick={handleFilterClick}
            onFilterClose={handleFilterClose}
            onFilterSelect={handleFilterSelect}
          />
        </FlexBetween>
      </Toolbar>
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="Overview" subtitle="Welcome to your Overview" />
        </FlexBetween>

        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          gap="20px"
        >
          <OverviewVisualization data={filteredData} />
        </Box>
      </Box>
    </>
  );
};

export default Overview;
