import React from 'react';
import { ResponsivePie } from "@nivo/pie";

const PieChart = (props) => {
  return (
    <ResponsivePie
      data={props.data}
      margin={{ top: 40, right: 0, bottom: 80, left: 0 }}
      startAngle={-180}
      innerRadius={0.5}
      padAngle={2}
      cornerRadius={0}
      activeOuterRadiusOffset={8}
      colors={{ scheme: "set1" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", "0.2"]],
      }}
      arcLinkLabelsTextColor={{ from: "color", modifiers: [] }}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color", modifiers: [] }}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      motionConfig="slow"
      transitionMode="pushOut"
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
