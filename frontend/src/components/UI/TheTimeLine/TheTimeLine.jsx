import React from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
} from "@material-tailwind/react";

function TheTimeLine({props}) {
    return (
        <div className="w-[22rem] md:w-[40rem] xl:w-[54rem]">
            <Timeline>
                {props.map((item, index) => (
                        <TimelineItem key={index} className={(index > 2 ? 'gap-0' : '')}>
                            {index > 2 ? '' : <TimelineConnector />}
                            <TimelineHeader className={"h-5 " + (index > 2 ? 'mb-2' : '')}>
                                <TimelineIcon className="bg-primary h-5 w-5"/>
                                <Typography className="text-black font-accent text-[26px] font-medium dark:text-neutral ease-in-out duration-300">
                                    {item.title}
                                </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-8">
                                <Typography
                                    className="text-black font-accent text-lg font-medium leading-7 opacity-90 dark:text-neutral ease-in-out duration-300"
                                >
                                    {item.content}
                                </Typography>
                            </TimelineBody>
                        </TimelineItem>
                    ))}
            </Timeline>
        </div>
    );
}

export default TheTimeLine;
