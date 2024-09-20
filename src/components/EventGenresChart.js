// src/components/EventGenresChart.js
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  // List of event genres to track in the pie chart
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

  // Generate data based on the number of events per genre
  useEffect(() => {
    const getData = () => {
      return genres.map((genre) => {
        const filteredEvents = events.filter((event) =>
          event.summary.includes(genre)
        );
        return {
          name: genre, // Genre name
          value: filteredEvents.length // Number of events for this genre
        };
      });
    };

    setData(getData()); // Set the data for the pie chart
  }, [events]); // Recalculate data whenever the `events` prop changes

  // Colors for each slice of the pie chart
  const COLORS = ['#DD0000', '#00DD00', '#0000DD', '#DDDD00', '#DD00DD'];

  // Custom label to show genre and percentage
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.1;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%" // Center the pie chart horizontally
          cy="50%" // Center the pie chart vertically
          outerRadius={150} // Radius of the pie chart
          fill="#8884d8"
          labelLine={false} // Disable the default label line
          label={renderCustomizedLabel} // Use custom labels for each slice
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" align="center" /> {/* Add a legend at the bottom */}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default EventGenresChart;
