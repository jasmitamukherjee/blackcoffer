import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from './FlexBetween';

const TimeSeries = ({ title, startYear, endYear, icon, description }) => {
  const theme = useTheme();
  const svgRef = useRef();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (startYear && endYear) {
      const allYears = [...startYear, ...endYear];
      const yearCounts = allYears.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {});
      const combinedData = Object.entries(yearCounts).map(([year, count]) => ({
        year: new Date(year),
        value: count,
      }));
      setData(combinedData);
    }
  }, [startYear, endYear]);

  useEffect(() => {
    if (data.length > 0) {
      const svg = d3.select(svgRef.current);
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
      const width = svgRef.current.clientWidth; // Get the container width
      const height = svgRef.current.clientHeight; // Get the container height

      svg.selectAll('*').remove();

      const x = d3.scaleTime()
        .domain([new Date('2015'), new Date('2060')])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, 210])
        .nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickFormat(d3.timeFormat('%Y')));

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(height / 40));

      const line = d3.line()
        .x(d => x(d.year))
        .y(d => y(d.value));

      svg.append('g')
        .call(xAxis);

      svg.append('g')
        .call(yAxis);

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);
    }
  }, [data]);

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

export default TimeSeries;
