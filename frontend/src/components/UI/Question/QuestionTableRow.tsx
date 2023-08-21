import React from "react";
import { Typography } from "@material-tailwind/react";
import { QuestionTableRowProps } from "../../../../types/types";
import { PencilIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const QuestionTableRow: React.FC<QuestionTableRowProps> = ({
    classes,
    question,
}) => {
    return (
        <tr>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-theme"
                >
                    {question.name}
                </Typography>
            </td>
            <td className={classes}>
                <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal text-theme"
                >
                    {question.description}
                </Typography>
            </td>
            <td className={classes}>
                <Link
                    to={`question/${question.id}/edit`}
                    state={{ question: question }}
                >
                    <PencilIcon className="h-4 w-4 hover:text-primary transition-all" />
                </Link>
            </td>
        </tr>
    );
};

export default QuestionTableRow;
