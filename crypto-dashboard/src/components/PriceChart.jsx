import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js';

// Register the CategoryScale
Chart.register(CategoryScale);

const PriceChart = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return <div>Loading...</div>; // Loading state or message
  }

  const data = {
    labels: chartData.map((entry) => entry.date),
    datasets: [
      {
        label: 'Price (USD)',
        data: chartData.map((entry) => entry.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        type: 'category', // Ensure the type is set to category
        display: true,
        title: { display: true, text: 'Date' },
      },
      y: {
        display: true,
        title: { display: true, text: 'Price (USD)' },
      },
    },
  };

  return <Line data={data} options={options} />;
};

// PropTypes validation
PriceChart.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PriceChart;