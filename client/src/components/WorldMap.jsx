import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';
import { feature } from 'topojson';

const WorldMap = () => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 500;

    // Create SVG element
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Define a projection for the map
    const projection = d3.geoNaturalEarth1()
      .translate([width / 2, height / 2])
      .scale(150);

    // Create a path generator
    const path = d3.geoPath().projection(projection);

    // Load world map data
    d3.json("https://cdn.jsdelivr.net/npm/world-map@0.0.9/src/world-map.min.js").then((data) => {
      // Convert TopoJSON to GeoJSON format
      const countries = topojson.feature(data, data.objects.countries);

      // Draw countries
      svg.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', 'lightgrey')
        .attr('stroke', 'white')
        .attr('stroke-width', 0.5);
    });
  }, []);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default WorldMap;
