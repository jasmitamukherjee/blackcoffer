import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import LineChart from '../../components/IntensityChart';
import React,{useState,useEffect} from 'react';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import { DownloadOutlined } from '@mui/icons-material';
import useFetchIntensity from '../../state/useFetchIntensity';
import useFetchLikelihood from '../../state/useFetchLikelihood';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import useFetchRelevance from '../../state/useFetchRelevence';
import BarChart from '../../components/BarChart';
import AirlineStopsIcon from '@mui/icons-material/AirlineStops';
import useFetchYear from '../../state/useFetchYear';
import TimeSeries from '../../components/TimeSeries';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import useFetchRegion from '../../state/useFetchRegion';
import PieChart from '../../components/PieChart';
import { Pie, PieCanvas } from '@nivo/pie';
import useFetchTopicList from '../../state/useFetchTopicList';
import useFetchTopicData from '../../state/useFetchTopicData';
import ScatterPlot from 'components/ScatterPlot';
const Dashboard = () => {
  const theme = useTheme();
  const { intensity } = useFetchIntensity();
  const { likelihood } = useFetchLikelihood();
  const { relevance } = useFetchRelevance();
  const {startYear,endYear} = useFetchYear();
  const {region} = useFetchRegion()
  const { topics } = useFetchTopicList();
  // console.log(topics)
  const { topicData } = useFetchTopicData(topics);
// console.log("topicdata from dash",topicData)
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <Box>
          {/* <Button
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
          </Button> */}
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
        <LineChart
          title="Intensity"
          description="Intensity of the event."
          icon={<ShowChartIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          value={intensity}
        />
        <LineChart
          title="Likelihood"
          description="Likelihood for the event to occur."
          icon={<MoreTimeIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          value={likelihood}
        />
        
        <TimeSeries
          title="Years"
          description="Time Series Data: No Of Pubcations made in respective years."
          icon={<DonutLargeIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          startYear={startYear}
          endYear={endYear}
        />
         <PieChart
          title="Region"
          description="Regions from where the the publications are made."
          icon={<DonutLargeIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          value={region}
        />
        <ScatterPlot
            title="Topic Data"
            description="Relevance vs Frequency of Topics"
            icon={<DonutLargeIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}

            data={topicData}
          />
      </Box>
    </Box>
  );
};

export default Dashboard;


