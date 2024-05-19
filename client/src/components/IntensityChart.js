import React, { useState, useEffect, useRef } from 'react';
import useFetchIntensity from '../state/useFetchIntensity';
import * as d3 from 'd3';
import FlexBetween from './FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

const IntensityChart = ({ title, description, icon }) => {
  const theme = useTheme();
  const { intensity } = useFetchIntensity();
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
    if (intensity && svgDimensions.width && svgDimensions.height) {
      const svg = d3.select(svgRef.current);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = svgDimensions.width - margin.left - margin.right;
      const height = svgDimensions.height - margin.top - margin.bottom;

      const xScale = d3.scaleBand()
        .domain(d3.range(intensity.length))
        .range([margin.left, width + margin.left])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(intensity)])
        .range([height, margin.top]);

      svg.selectAll('rect')
        .data(intensity)
        .enter()
        .append('rect')
        .attr('x', (d, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d))
        .attr('fill', 'steelblue');

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(yAxis);
    }
  }, [intensity, svgDimensions]);

  return (
    <Box
      gridColumn="auto"
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

export default IntensityChart;
