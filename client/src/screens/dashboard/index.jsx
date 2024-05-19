import { Box, Button, useTheme, useMediaQuery } from '@mui/material';
import LineChart from '../../components/IntensityChart';
import React from 'react';
import FlexBetween from '../../components/FlexBetween';
import Header from '../../components/Header';
import { DownloadOutlined } from '@mui/icons-material';
import useFetchIntensity from '../../state/useFetchIntensity';
import useFetchLikelihood from '../../state/useFetchLikelihood';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import useFetchRelevance from '../../state/useFetchRelevence';
import BarChart from '../../components/BarChart';

const Dashboard = () => {
  const theme = useTheme();
  const { intensity } = useFetchIntensity();
  const { likelihood } = useFetchLikelihood();
  const { relevance } = useFetchRelevance();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
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
        <BarChart
          title="Relevance"
          description="Relevance of the event."
          icon={<MoreTimeIcon sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />}
          value={relevance}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
