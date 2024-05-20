import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import FlexBetween from './FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

const BarGraph = ({ title, description, icon, value }) => {
  const theme = useTheme();
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

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

      svg.selectAll('*').remove(); // Clear previous elements

      const xScale = d3.scaleLinear() // Use linear scale for pestle count on x-axis
        .domain([0, d3.max(value, d => d.count)])
        .range([0, width]);

      const yScale = d3.scaleBand() // Use band scale for pestle name on y-axis
        .domain(value.map(d => d.pestle))
        .range([0, height])
        .padding(0.1);

      svg.append('g')
        .call(d3.axisBottom(xScale));

      svg.append('g')
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .attr('transform', 'rotate(-45)')
        .style('text-anchor', 'end')
        .style('font-size', '14px');

      // Define a color scale
      const colorScale = d3.scaleOrdinal()
        .domain(value.map((d, i) => i))
        .range(d3.schemeCategory10); // Use a built-in color scheme

      const bars = svg.selectAll('rect')
        .data(value)
        .enter()
        .append('rect')
        .attr('x', 0) // Start from the left side of the plot area
        .attr('y', d => yScale(d.pestle)) // Use yScale for positioning
        .attr('width', d => xScale(d.count)) // Use xScale for width
        .attr('height', yScale.bandwidth()) // Use yScale.bandwidth() for height
        .attr('fill', (d, i) => colorScale(i)); // Assign colors using the color scale

      // Add tooltips
      bars.append('title')
        .text(d => `${d.pestle}: ${d.count}`);
    }
  }, [value, svgDimensions]);

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
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default BarGraph;
