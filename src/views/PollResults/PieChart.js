// MyPieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = ({ optionsData }) => {
  const filteredData =
    optionsData?.length > 0
      ? optionsData?.map((item) => item?.option_count)
      : [];

  const labelData = 
  optionsData?.length > 0
      ? optionsData?.map((item) => item?.option)
      : [];

       
  const data = {
    labels:labelData,
    datasets: [
      {
        label: labelData,
        data: filteredData,
        backgroundColor: [
          "#F2C472",
          "#985218",
          "#F2C472",
          "#C1783C",
          "#EEB07E",
          "#3101013B",
        ],
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 0,
      },
    },
  };

  return (
    <div style={{ margin: "0px", padding: "0px" }}>
      <Pie data={data} options={labelData} />
    </div>
  );
};

export default PieChart;
