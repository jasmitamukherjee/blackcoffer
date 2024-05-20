import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import React,{useState,useEffect} from 'react';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import { DownloadOutlined } from '@mui/icons-material';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PieChart from '../../components/PieChart';

import useFetchSource from 'state/useFetchSource';
import useFetchPestle from 'state/useFetchPestle';
import BarGraph from 'components/BarGraph';
const Insights = () => {
  const theme = useTheme();
  
  const {source} = useFetchSource();
  const {pestle}= useFetchPestle();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Insights" subtitle="Welcome to your Insights" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        
         <PieChart
          title="Source"
          description="Sources of the publications."
          icon={<DonutLargeIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          value={source}
        />

        
<BarGraph
          title="PEST"
          description="Pestle Informtion."
          icon={<DonutLargeIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          value={pestle}
        />
       
      </Box>
    </Box>
  );
};

export default Insights;


