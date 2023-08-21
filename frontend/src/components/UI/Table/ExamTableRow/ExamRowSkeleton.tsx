import React from "react";
import { Skeleton } from "@mui/material";
import { useStateContext } from "../../../../context/StateContext";

export interface ExamSkeletonProps {
    length: number;
    index: number;
}

const ExamRowSkeleton: React.FC<ExamSkeletonProps> = ({ length, index }) => {
    const { user } = useStateContext();
    const isLast = index === length - 1;
    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

    return (
        <tr>
            <td className={`${classes}`}>
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={238}
                    height={41}
                />
            </td>
            <td className={`${classes}`}>
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={900}
                    height={41}
                />
            </td>
            {user?.role_id === 1 ? (
                <td className={`${classes}`}>
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={161}
                        height={41}
                    />
                </td>
            ) : (
                ""
            )}
        </tr>
    );
};

export default ExamRowSkeleton;
