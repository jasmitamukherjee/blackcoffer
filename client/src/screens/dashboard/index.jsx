import { Box, Button,  useTheme,  useMediaQuery,

} from '@mui/material'
import LineChart from '../../components/IntensityChart'
import React from 'react'
import FlexBetween from '../../components/FlexBetween'
import Header from '../../components/Header'
import {
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import { DownloadOutlined } from '@mui/icons-material'
import useFetchIntensity from '../../state/useFetchIntensity'
const Dashboard = () => {
  const theme = useTheme();
  const { intensity } = useFetchIntensity();

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
        
        description="Intensity for the event to occur"
        icon={
          <PointOfSale
            sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
        
            />}
            value = {intensity}
            />
      </Box>

    </Box>
  )
}

export default Dashboard
