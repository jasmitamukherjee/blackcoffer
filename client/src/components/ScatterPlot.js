import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from './FlexBetween';

const ScatterPlot = ({ title, description, data, icon }) => {
  const theme = useTheme();
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 500;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Filter data to remove points with empty topic and capitalize the first word of each topic
    const filteredData = data.filter(d => d.topic && d.topic.trim() !== '').map(d => ({
      ...d,
      topic: d.topic.trim().charAt(0).toUpperCase() + d.topic.trim().slice(1)
    }));

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.frequency)])
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => d.relevance)])
      .range([height - margin.bottom, margin.top]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg.selectAll('circle').remove(); // Remove existing points

    svg.selectAll('circle')
      .data(filteredData)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.frequency))
      .attr('cy', d => yScale(d.relevance))
      .attr('r', 5)
      .attr('fill', d => colorScale(d.topic));

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.select('.x-axis').remove(); // Remove existing x-axis
    svg.select('.y-axis').remove(); // Remove existing y-axis

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    svg.append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},0)`)
      .call(yAxis);

    // Create the legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - margin.right + 20}, ${margin.top})`);

    const uniqueTopics = [...new Set(filteredData.map(d => d.topic))];

    legend.selectAll('rect')
      .data(uniqueTopics)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', d => colorScale(d));

    legend.selectAll('text')
      .data(uniqueTopics)
      .enter()
      .append('text')
      .attr('x', 20)
      .attr('y', (d, i) => i * 20 + 9)
      .text(d => d)
      .attr('font-size', '12px')
      .attr('fill', theme.palette.text.primary);
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

export default ScatterPlot;
