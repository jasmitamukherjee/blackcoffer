import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import useFetchLocation from 'state/useFetchLocation'; // Adjust the import based on your directory structure
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Header from '../../components/Header';

const Location = () => {
  const svgRef = useRef(null);
  const legendRef = useRef(null);
  const theme = useTheme();
  const { location: countries } = useFetchLocation();

  useEffect(() => {
    if (countries && svgRef.current) {
      fetch('https://unpkg.com/world-atlas/countries-50m.json')
        .then((response) => response.json())
        .then((data) => {
          const countriesData = feature(data, data.objects.countries).features;

          const countryCounts = {};
          countries.forEach((country) => {
            const countryObj = countriesData.find((c) => c.properties.name.toLowerCase() === country.toLowerCase());
            if (countryObj) {
              const countryCode = countryObj.id;
              countryCounts[countryCode] = (countryCounts[countryCode] || 0) + 1;
            }
          });

          const svg = d3.select(svgRef.current);

          const projection = d3.geoNaturalEarth1().scale(220).translate([500, 250]);
          const pathGenerator = d3.geoPath().projection(projection);

          // Add gradient legend
          const legendSvg = d3.select(legendRef.current);
          const gradient = legendSvg.append('defs')
            .append('linearGradient')
            .attr('id', 'gradient')
            .attr('x1', '0%')
            .attr('y1', '100%')
            .attr('x2', '0%')
            .attr('y2', '0%');

          gradient.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'gray')
            .attr('stop-opacity', 1);

          gradient.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'blue')
            .attr('stop-opacity', 1);

          legendSvg.append('rect')
            .attr('x', 10)
            .attr('y', 10)
            .attr('width', 20)
            .attr('height', 200)
            .style('fill', 'url(#gradient)');

          legendSvg.append('text')
            .attr('x', 40)
            .attr('y', 20)
            .text('< ')
            .style('font-size', '12px');

          legendSvg.append('text')
            .attr('x', 40)
            .attr('y', 210)
            .text('> ')
            .style('font-size', '12px');

          // Define color scale
          const colorScale = d3.scaleLinear()
            .domain([0, d3.max(Object.values(countryCounts))])
            .range(['gray', 'blue']);

          svg.selectAll('path')
            .data(countriesData)
            .enter().append('path')
            .attr('class', 'country')
            .attr('d', pathGenerator)
            .style('fill', (d) => {
              const countryCode = d.id;
              return countryCounts[countryCode] ? colorScale(countryCounts[countryCode]) : 'gray';
            })
            .on('mouseover', function(event, d) {
              const countryCode = d.id;
              const countryName = d.properties.name;
              const count = countryCounts[countryCode] || 0;
              d3.select(this).style('fill', 'lightblue');
              svg.append('text')
                .attr('x', pathGenerator.centroid(d)[0])
                .attr('y', pathGenerator.centroid(d)[1])
                .attr('id', 'tooltip')
                .text(`${countryName}: ${count}`)
                .style('font-size', '10px')
                .style('text-anchor', 'middle')
                .style('fill', theme.palette.mode === 'dark' ? "white" : "black");
            })
            .on('mouseout', function() {
              d3.select(this).style('fill', (d) => {
                const countryCode = d.id;
                return countryCounts[countryCode] ? colorScale(countryCounts[countryCode]) : 'gray';
              });
              svg.select('#tooltip').remove();
            });
        });
    }
  }, [countries, theme]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LOCATION" subtitle="Find from where the publications are made." />
      <div>
        <svg ref={svgRef} width="1000" height="600" style={{  }} />
      </div>
    </Box>
  );
};

export default Location;
