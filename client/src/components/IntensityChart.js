import React, { useState, useEffect, useRef } from 'react';
import useFetchIntensity from '../state/useFetchIntensity';
import * as d3 from 'd3';
import FlexBetween from './FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

const LineChart = ({ title, description, icon, value }) => {
  const theme = useTheme();
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (svgRef.current) {
      const svgWidth = svgRef.current.clientWidth;
      const svgHeight = svgRef.current.clientHeight;
      setSvgDimensions({ width: svgWidth, height: svgHeight });
    }
  }, [svgRef, value]);

  useEffect(() => {
    if (value && svgDimensions.width && svgDimensions.height) {
      const svg = d3.select(svgRef.current);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = svgDimensions.width - margin.left - margin.right;
      const height = svgDimensions.height - margin.top - margin.bottom;

      const xScale = d3.scaleLinear()
        .domain([0, 600]) // Limit x-axis till 600
        .range([margin.left, width + margin.left]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(value)])
        .range([height, margin.top]);

      svg.selectAll('path').remove(); // Remove any existing line paths

      const line = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

      svg.append('path')
        .datum(value)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 1.5)
        .attr('d', line);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.select('.x-axis').remove(); // Remove any existing x-axis
      svg.select('.y-axis').remove(); // Remove any existing y-axis

      svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);
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

export default LineChart;


