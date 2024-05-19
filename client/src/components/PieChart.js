import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import FlexBetween from './FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

const PieChart = ({ title, description, icon, value }) => {
  const theme = useTheme();
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Function to process the data
  const processData = (data) => {
    const regionCount = data.reduce((acc, region) => {
      // Exclude empty strings ("") from the data
      if (region !== "") {
        acc[region] = (acc[region] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(regionCount).map(([region, count]) => ({ region, count }));
  };

  useEffect(() => {
    if (svgRef.current) {
      const svgWidth = svgRef.current.clientWidth;
      const svgHeight = svgRef.current.clientHeight;
      setSvgDimensions({ width: svgWidth, height: svgHeight });
    }
  }, [svgRef]);

  useEffect(() => {
    if (value && svgDimensions.width && svgDimensions.height) {
      const svg = d3.select(svgRef.current);

      const width = svgDimensions.width;
      const height = svgDimensions.height;
      const radius = Math.min(width, height) / 2;

      svg.selectAll('*').remove(); // Clear previous elements

      const data = processData(value);
      const totalCount = data.reduce((sum, d) => sum + d.count, 0);

      const pie = d3.pie().value(d => d.count);
      const dataReady = pie(data);

      const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

      const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.region))
        .range(d3.schemeCategory10);

      const g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const arcs = g.selectAll('path')
        .data(dataReady)
        .enter()
        .append('path')
        .attr('d', arcGenerator)
        .attr('fill', d => colorScale(d.data.region))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 0.7);

      // Add hover interaction
      const tooltip = g.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-1em')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .style('fill', theme.palette.text.primary) // Revert to default text color
        .style('opacity', 0);

      arcs.on('mouseover', function (event, d) {
        const percentage = ((d.data.count / totalCount) * 100).toFixed(2);
        tooltip.text(`${d.data.region}: ${percentage}%`)
          .transition()
          .style('opacity', 1);
        
        // Increase the size of the arc on hover
        d3.select(this)
          .transition()
          .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius * 1.1) // Increase the radius by 10%
          );
      });

      arcs.on('mouseout', function () {
        tooltip.transition()
          .style('opacity', 0);
        
        // Reset the size of the arc on mouseout
        d3.select(this)
          .transition()
          .attr('d', arcGenerator);
      });
    }
  }, [value, svgDimensions, theme.palette.text.primary]);

  return (
    <Box
      gridColumn="span 6"
      gridRow="span 3"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>
      <FlexBetween gap="1rem">
        <Typography>{description}</Typography>
      </FlexBetween>
      <svg ref={svgRef} style={{ width: '100%', height: '100%',}} />
    </Box>
  );
};

export default PieChart;
