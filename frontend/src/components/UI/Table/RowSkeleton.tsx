import React, { FC } from "react";
import { Skeleton } from "@mui/material";
import { useStateContext } from "../../../context/StateContext";

export interface ExamSkeletonProps {
    length: number;
    index: number;
}

const RowSkeleton: FC<ExamSkeletonProps> = ({ length, index }) => {
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
                    height={30}
                />
            </td>
            <td className={`${classes}`}>
                <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={800}
                    height={30}
                />
            </td>
            {user?.role_id === 1 ? (
                <td className={`${classes}`}>
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        width={200}
                        height={30}
                    />
                </td>
            ) : (
                ""
            )}
        </tr>
    );
};

export default RowSkeleton;
