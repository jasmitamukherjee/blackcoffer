
// // export default OverviewVisualization;
// import React, { useState } from 'react';
// import { Box, Typography, List, ListItem, ListItemText, Link ,useTheme} from '@mui/material';

// const OverviewVisualization = ({ data }) => {
//   const theme = useTheme();

//   // State to store selected insight for detailed view
//   const [selectedInsight, setSelectedInsight] = useState(null);
//   // Function to handle click on an insight
//   const handleClick = (insight) => {
//     setSelectedInsight(insight);
    
//     renderDetailedView();
//   };

//   // Render overview list items
//   const renderOverviewItems = () => {
//     if (!data || data.length === 0) {
//       return <Typography variant="body1">Loading.. Please wait...</Typography>;
//     }

//     return data.map((insight, index) => (
//       <ListItem key={index} button onClick={() => handleClick(insight)}>
//         <ListItemText
//           primary={insight.title}
//           secondary={
//             <Box>
//             <Typography variant="body2">{`${insight.sector}-${insight.country}`}</Typography>
//             <Typography variant="body2">{`Relevance: ${insight.relevance}`}</Typography>
//             <Typography variant="body2">
//                 {`Impact: ${insight.impact  ? `${insight.impact}` : 'Unknown'}`}
//               </Typography>            
//               <Typography variant="body2">{`Intensity: ${insight.intensity}`}</Typography>
//             <Typography variant="body2">{`Source: ${insight.source}`}</Typography>
//             <Typography variant="body2">
//                 {`Duration: ${insight.start_year || insight.end_year ? `${insight.start_year}-${insight.end_year}` : 'Unknown'}`}
//               </Typography>
//             <Typography variant="body2">{`Likelihood: ${insight.likelihood}`}</Typography>
//             <Link href={insight.url} target="_blank" rel="noopener">
//               Read More
//             </Link>
//           </Box>
//           }
//         />
//       </ListItem>
//     ));
//   };

//   // Render detailed view of selected insight
//   function renderDetailedView(){
//       return (
//         <Box>
//           <Typography variant="h6">{selectedInsight.title}</Typography>
//           <Typography variant="body1">{`Sector: ${selectedInsight.sector}`}</Typography>
//           <Typography variant="body1">{`Country: ${selectedInsight.country}`}</Typography>
//           <Typography variant="body1">{`Relevance: ${selectedInsight.relevance}`}</Typography>
//           <Typography variant="body1">{`Impact: ${selectedInsight.impact}`}</Typography>
//           <Typography variant="body1">{`Intensity: ${selectedInsight.intensity}`}</Typography>
//           <Typography variant="body1">{`Likelihood: ${selectedInsight.likelihood}`}</Typography>
//           <Link href={selectedInsight.url} target="_blank" rel="noopener">
//             Read More
//           </Link>
//         </Box>
//       );
    
//   };

//   return (
//     <Box
//     // gridColumn="span 5"
//     // gridRow="span 3"
//     display="flex"
//     flexWrap="wrap"
//     flexDirection="column"
//     justifyContent="space-between"
//     p="1.25rem 1rem"
//     flex="1 1 100%"

//     >
//       <List>{renderOverviewItems()}</List>
//     </Box>
//   );
// };

// export default OverviewVisualization;
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Link, useTheme } from '@mui/material';
import './OverviewVisulization.css'; // Import custom CSS for styling

const OverviewVisualization = ({ data }) => {
  const theme = useTheme();

  // Render overview list items
  const renderOverviewItems = () => {
    if (!data || data.length === 0) {
      return <Typography variant="body1">Tring to fetch content ...</Typography>;
    }

    return data.map((insight, index) => (
      <ListItem key={index} className="overview-item">
        <ListItemText
          primary={<Typography variant="h6">{insight.title}</Typography>}
          secondary={
            <Box>
              <Typography variant="body2">{`${insight.sector} - ${insight.country}`}</Typography>
              <Typography variant="body2">{`Relevance: ${insight.relevance}`}</Typography>
              <Typography variant="body2">{`Impact: ${insight.impact}`}</Typography>
              <Typography variant="body2">{`Intensity: ${insight.intensity}`}</Typography>
              <Typography variant="body2">{`Source: ${insight.source}`}</Typography>
              <Typography variant="body2">
                {`Duration: ${insight.start_year || insight.end_year ? `${insight.start_year}-${insight.end_year}` : 'Unknown'}`}
              </Typography>
              <Typography variant="body2">{`Likelihood: ${insight.likelihood}`}</Typography>
              <Link href={insight.url} target="_blank" rel="noopener">
                Read More
              </Link>
            </Box>
          }
        />
      </ListItem>
    ));
  };

  return (
    <Box className="overview-container">
      <List className="overview-list">{renderOverviewItems()}</List>
    </Box>
  );
};

export default OverviewVisualization;
