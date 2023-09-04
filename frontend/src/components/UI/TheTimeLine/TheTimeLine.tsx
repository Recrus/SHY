import React, { FC } from "react";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
} from "@material-tailwind/react";
import { Item } from "../../../../types/types";

const TheTimeLine: FC<{ props: Item[] }> = ({ props }) => {
    return (
        <div className="w-2/3">
            <Timeline>
                {props.map((item, index) => (
                    <TimelineItem
                        key={index}
                        className={index > 2 ? "gap-0" : ""}
                    >
                        {index > 2 ? "" : <TimelineConnector />}
                        <TimelineHeader
                            className={"h-5 " + (index > 2 ? "mb-2" : "")}
                        >
                            <TimelineIcon className="bg-primary h-5 w-5" />
                            <Typography className="text-[26px] font-medium ease-in-out duration-300">
                                {item.title}
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-8">
                            <Typography className="text-lg leading-7 opacity-90 ease-in-out duration-300">
                                {item.content}
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
};

export default TheTimeLine;
