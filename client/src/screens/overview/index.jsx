
// import { Box, useTheme, useMediaQuery } from '@mui/material';
// import React from 'react';
// import FlexBetween from '../../components/FlexBetween';
// import Header from '../../components/Header';
// import useFetchAllData from 'state/useFetchAllData';
// import OverviewVisualization from 'components/OverviewVisualization';
// import {
// AppBar,
//   IconButton,
//   InputBase,
//   Toolbar
 
// } from "@mui/material";
// import { Search } from '@mui/icons-material';
// const Overview = () => {
//   const theme = useTheme();
//   const { data } = useFetchAllData();
//   const isLargeScreen = useMediaQuery("(min-width: 1200px)"); // Define large screen breakpoint
//   const isTabletScreen = useMediaQuery("(min-width: 600px) and (max-width: 1199px)"); // Define tablet screen breakpoint
//   const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

//   return (
//     <AppBar sx={{
//       position: "static",
//       background: "none",
//       boxShadow: "none",
//       position:"relative"
//      }}>

// <Toolbar sx={{
//       justifyContent:"space-between"
//     }}>
//     <FlexBetween
//     backgroundColor = {theme.palette.background.alt} 
//     borderRadius="9px" 
//     gap="3rem"
//     p="0.1rem 1.5rem"
//     >
//       <InputBase placeholder='Search...'/>
//       <IconButton>
//         <Search/>
//       </IconButton>
//     </FlexBetween>
//     </Toolbar>
//     <Box m="1.5rem 2.5rem">
//       <FlexBetween>
//         <Header title="Overview" subtitle="Welcome to your Overview" />
//       </FlexBetween>

//       <Box
        
//         mt="20px"
//         display="flex"
//         flexWrap="wrap"
//         // gridTemplateColumns="repeat(12, 1fr)"
//         // gridAutoRows="160px"
//         gap="20px"
//         // sx={{
//         //   "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
//         // }}
//       >
//         <OverviewVisualization data={data} />
//       </Box>
//     </Box>
//     </AppBar>
//   );
// };

// export default Overview;
import { Box, useTheme, useMediaQuery, AppBar, IconButton, InputBase, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import useFetchAllData from 'state/useFetchAllData';
import OverviewVisualization from 'components/OverviewVisualization';
import { Search } from '@mui/icons-material';

const Overview = () => {
  const theme = useTheme();
  const { data } = useFetchAllData();
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchClick = () => {
    const filtered = data.filter(insight =>
      insight.title.toLowerCase().includes(searchText.toLowerCase()) ||
      insight.sector.toLowerCase().includes(searchText.toLowerCase()) ||
      insight.country.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  React.useEffect(() => {
    setFilteredData(data);
  }, [data]);

  return (
    <AppBar sx={{
      position: "static",
      background: "none",
      boxShadow: "none",
      position: "relative"
    }}>
      <Toolbar sx={{
        justifyContent: "space-between"
      }}>
        <FlexBetween
          backgroundColor={theme.palette.background.alt}
          borderRadius="9px"
          gap="3rem"
          p="0.1rem 1.5rem"
        >
          <InputBase
            placeholder='Search...'
            value={searchText}
            onChange={handleSearchChange}
          />
          <IconButton onClick={handleSearchClick}>
            <Search />
          </IconButton>
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
    </AppBar>
  );
};

export default Overview;
