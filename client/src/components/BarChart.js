import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import FlexBetween from './FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';

const BarChart = ({ title, description, icon, value }) => {
  const theme = useTheme();
  const svgRef = useRef(null);
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries) return;
      const { width, height } = entries[0].contentRect;
      setSvgDimensions({ width, height });
    });

    resizeObserver.observe(svgRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (value && svgDimensions.width && svgDimensions.height) {
      const svg = d3.select(svgRef.current);

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const width = svgDimensions.width - margin.left - margin.right;
      const height = svgDimensions.height - margin.top - margin.bottom;

      const xScale = d3.scaleBand()
        .domain(value.map((_, i) => i))
        .range([margin.left, width + margin.left])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(value)])
        .range([height, margin.top]);

      svg.selectAll('.bar').remove(); // Remove any existing bars
      svg.selectAll('.bar')
        .data(value)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (_, i) => xScale(i))
        .attr('y', d => yScale(d))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d))
        .attr('fill', 'steelblue');

      const xAxis = d3.axisBottom(xScale).tickFormat(i => i);
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

export default BarChart;
