// src/components/Sections/Insights/WordCloud.jsx
import { useEffect, useRef } from 'react';
import { journalKeywords } from '../../../assets/mockData/insights';
import * as d3 from 'd3';

const WordCloud = () => {
  const svgRef = useRef(null);
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();
    
    const width = svgRef.current.clientWidth;
    const height = 300;
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("font-family", "sans-serif")
      .append("g")
      .attr("transform", `translate(${width/2},${height/2})`);
    
    // Find max and min values for scaling
    const maxSize = d3.max(journalKeywords, d => d.value);
    const minSize = d3.min(journalKeywords, d => d.value);
    
    // Scale for font size
    const fontScale = d3.scaleLinear()
      .domain([minSize, maxSize])
      .range([12, 40]);
    
    // Scale for color based on frequency
    const colorScale = d3.scaleLinear()
      .domain([minSize, maxSize])
      .range([0, 100]);
    
    // Simple layout algorithm for the word cloud
    // In a real app, we would use a more sophisticated algorithm like d3-cloud
    const angleScale = d3.scaleLinear()
      .domain([0, journalKeywords.length - 1])
      .range([0, 2 * Math.PI]);
    
    const radiusScale = d3.scaleLinear()
      .domain([minSize, maxSize])
      .range([0, Math.min(width, height) / 3]);
    
    // Draw words in a spiral-like pattern
    journalKeywords.forEach((word, i) => {
      const fontSize = fontScale(word.value);
      const color = `hsl(${210 + colorScale(word.value)}, 70%, 60%)`;
      
      // Calculate position using polar coordinates
      const angle = angleScale(i);
      const radius = radiusScale(minSize + (maxSize - word.value));
      
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      
      svg.append("text")
        .attr("x", x)
        .attr("y", y)
        .attr("text-anchor", "middle")
        .attr("font-size", `${fontSize}px`)
        .attr("fill", color)
        .style("user-select", "none")
        .text(word.text);
    });
    
  }, []);
  
  return (
    <div className="w-full h-full flex justify-center items-center py-2">
      <svg ref={svgRef} className="w-full max-h-64"></svg>
    </div>
  );
};

export default WordCloud;