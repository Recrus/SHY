import React, { FC } from "react";
import { ResponsiveRadar } from "@nivo/radar";
import { RadarChartProps } from "../../../../types/types";

const RadarChart: FC<RadarChartProps> = ({ data }) => (
    <ResponsiveRadar
        data={data}
        keys={["attempts"]}
        indexBy="tech"
        valueFormat=">-.2f"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: "color" }}
        gridLabelOffset={36}
        theme={{
            textColor: "gray",
        }}
        dotSize={10}
        dotColor={{ theme: "background" }}
        dotBorderWidth={2}
        colors={{ scheme: "nivo" }}
        blendMode="normal"
        motionConfig="wobbly"
        legends={[]}
    />
);

export default RadarChart;
