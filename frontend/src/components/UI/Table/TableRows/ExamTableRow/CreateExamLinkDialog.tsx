import React, { ChangeEvent, FC, useReducer, useState } from "react";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import axiosFetch from "../../../../../plugins/axios";
import {
    CreateExamLinkDialogProps,
    initialFromDataExamEdit,
    UserData,
} from "../../../../../../types/types";
import { Autocomplete, TextField } from "@mui/material";
import TheDialog from "../../../TheDialog/TheDialog";
import { PlusIcon } from "@heroicons/react/24/outline";
import ErrorMessage from "../../../Error/ErrorMessage";

const CreateExamLinkDialog: FC<CreateExamLinkDialogProps> = ({
    employeesData,
    setRefetch,
    reviewersData,
    exam_id,
}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    type Action =
        | { type: "SET_REVIEWER"; payload?: string | number | null }
        | { type: "SET_EMPLOYEE"; payload: number | null }
        | { type: "SET_LINK"; payload: string }
        | { type: "RESET_FORM" }
        | { type: "SAVE_CHANGES"; payload: typeof initialState }
        | {
              type: "SET_ERROR";
              payload: {
                  reviewerError: string;
                  employeeError: string;
                  linkError: string;
              };
          };

    const initialState: initialFromDataExamEdit & {
        reviewerError: string;
        employeeError: string;
        linkError: string;
    } = {
        reviewer_id: null,
        employee_id: null,
        link: "",
        exam_id: exam_id,
        reviewerError: "",
        employeeError: "",
        linkError: "",
        isFormModified: false,
    };

    const reducer = (
        state: typeof initialState,
        action: Action,
    ): typeof initialState => {
        switch (action.type) {
            case "SET_REVIEWER":
                return {
                    ...state,
                    reviewer_id: action.payload as number | null,
                    isFormModified: true,
                };
            case "SET_EMPLOYEE":
                return {
                    ...state,
                    employee_id: action.payload,
                    isFormModified: true,
                };
            case "SET_LINK":
                return { ...state, link: action.payload, isFormModified: true };
            case "SET_ERROR":
                return { ...state, ...action.payload };
            case "RESET_FORM":
                return { ...initialState };
            case "SAVE_CHANGES":
                return { ...action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const autocompleteData = employeesData.map(
        (employee) => `${employee.first_name} ${employee.last_name}`,
    );

    const handleSelectReviewer = (value: string | undefined) => {
        dispatch({ type: "SET_REVIEWER", payload: value });
    };

    const handleSelectEmployee = (event: any, value: string | null) => {
        const selectedEmployee = employeesData.find(
            (emp) => `${emp.first_name} ${emp.last_name}` === value,
        );
        const employeeId = selectedEmployee ? selectedEmployee.id : null;
        dispatch({ type: "SET_EMPLOYEE", payload: employeeId });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        dispatch({ type: "SET_LINK", payload: value });
    };

    const handleDiscardChanges = () => {
        dispatch({ type: "RESET_FORM" });
        handleOpen();
    };

    const handleSaveChanges = async () => {
        const { reviewer_id, employee_id, link, exam_id } = state;

        try {
            await axiosFetch.post(`/exam-links`, {
                reviewer_id,
                employee_id,
                link,
                exam_id,
            });

            setRefetch((prevState) => (prevState += 1));
            dispatch({ type: "SAVE_CHANGES", payload: initialState });
            handleOpen();
        } catch (error: any) {
            if (error.response) {
                const { data } = error.response;
                const errors = data.errors;

                if (errors) {
                    dispatch({
                        type: "SET_ERROR",
                        payload: {
                            reviewerError: errors.reviewer_id,
                            employeeError: errors.employee_id,
                            linkError: errors.link,
                        },
                    });
                }
            } else {
                console.log("Error", error.message);
            }
        }
    };

    const findNameById = (
        data: UserData[],
        id: number | null,
        fallback: null | undefined,
    ) => {
        const found = data.find((item) => item.id === id);
        return found ? `${found.first_name} ${found.last_name}` : fallback;
    };

    const employeeName = findNameById(employeesData, state.employee_id, null);
    const reviewerName = findNameById(
        reviewersData,
        state.reviewer_id,
        undefined,
    );

    const customBody = (
        <div className="text-theme">
            <div className="mb-2">
                <Select
                    label="Select reviewer"
                    labelProps={{
                        className: "!text-silver",
                    }}
                    name="reviewer_id"
                    color="indigo"
                    value={reviewerName as string | undefined}
                    className="text-theme"
                    onChange={handleSelectReviewer}
                >
                    {reviewersData.map((user) => (
                        <Option
                            key={user.id}
                            value={String(user.id)}
                            className="text-black"
                        >
                            {user.first_name + " " + user.last_name}
                        </Option>
                    ))}
                </Select>
                <ErrorMessage error={state.reviewerError} />
            </div>
            <div className="mb-2">
                <Input
                    crossOrigin="anonymous"
                    color="indigo"
                    name="link"
                    label="Link"
                    labelProps={{
                        className: "!text-silver",
                    }}
                    value={state.link}
                    onChange={handleInputChange}
                    className="text-theme"
                />
                <ErrorMessage error={state.linkError} />
            </div>
            <div>
                {/*todo autocomplete styles*/}
                <Autocomplete
                    disablePortal
                    value={employeeName}
                    onChange={handleSelectEmployee}
                    options={autocompleteData}
                    sx={{
                        width: { sm: "100%" },
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select employee"
                            InputLabelProps={{
                                sx: {
                                    color: "silver",
                                },
                            }}
                        />
                    )}
                />
                <ErrorMessage error={state.employeeError} />
            </div>
        </div>
    );

    const customFooter = (
        <>
            <Button variant="text" color="red" className="mr-1">
                <span onClick={handleDiscardChanges}>Cancel</span>
            </Button>
            <Button
                variant="gradient"
                color="green"
                disabled={!state.isFormModified}
            >
                <span onClick={handleSaveChanges}>Confirm</span>
            </Button>
        </>
    );

    return (
        <>
            <TheDialog
                openButton={PlusIcon}
                open={open}
                handleOpen={handleDiscardChanges}
                title="Create exam link"
                bodyContent={customBody}
                footerButtons={customFooter}
                iconSize="w-6 h-6"
            ></TheDialog>
        </>
    );
};

export default CreateExamLinkDialog;
