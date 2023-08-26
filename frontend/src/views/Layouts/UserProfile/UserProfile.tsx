import React, { ChangeEvent, useState } from "react";
import { useStateContext } from "../../../context/StateContext";
import { Button } from "@material-tailwind/react";
import axiosFetch from "../../../plugins/axios";
import { InitialFormDataProfile } from "../../../../types/types";
import EditUser from "../../../components/UI/Forms/EditUser";

const UserProfile = () => {
    const { user } = useStateContext();
    const initialFormData: InitialFormDataProfile = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        user_name: user?.user_name,
        phone: user?.phone,
        email: user?.email,
        password: "",
        role_id: user?.role_id,
        permission_for_email: true,
    };
    const [formData, setFormData] = useState({ ...initialFormData });
    const [isFormModified, setIsFormModified] = useState(false);
    const saveButtonDisabled = !isFormModified;
    const discardButtonDisabled = !isFormModified;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, id } = e.target;

        if (type === "radio") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                permission_for_email: id === "true",
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }

        setIsFormModified(true);
    };

    //todo change picture
    const handler = () => {
        console.log(formData);
    };

    const handleDiscardChanges = () => {
        setFormData({ ...initialFormData });
        setIsFormModified(false);
    };

    const handleSaveChanges = async () => {
        const formDataToSend = { ...formData };
        if (formData.password === "") {
            delete formDataToSend.password;
        }

        try {
            await axiosFetch.patch(`/users/${user?.id}`, formDataToSend);
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="w-2/3 mx-auto py-4">
            <div className="flex items-center bg-neutral rounded shadow-md dark:bg-dark-accent transition-all">
                <img
                    src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette.png"
                    alt=""
                    className="w-[100px] m-4 rounded-full bg-gray-light"
                />
                <div className="mx-auto">
                    <Button
                        variant="outlined"
                        color="indigo"
                        className="mr-4"
                        onClick={handler}
                    >
                        <span>Change picture</span>
                    </Button>
                    <Button variant="outlined" color="indigo" onClick={handler}>
                        <span>Download resume</span>
                    </Button>
                </div>
            </div>
            <form className="grid grid-cols-4 gap-6 mt-4 p-4 rounded shadow-md items-center bg-neutral dark:bg-dark-accent transition-all">
                <EditUser
                    formData={formData}
                    handleInputChange={handleInputChange}
                    footer={true}
                />
                <Button
                    variant="text"
                    color="red"
                    onClick={handleDiscardChanges}
                    disabled={discardButtonDisabled}
                    className="disabled:opacity-50"
                >
                    <span>Cancel</span>
                </Button>
                <Button
                    color="indigo"
                    onClick={handleSaveChanges}
                    disabled={saveButtonDisabled}
                    className="disabled:opacity-50 col-start-4"
                >
                    <span>Confirm</span>
                </Button>
            </form>
        </main>
    );
};

export default UserProfile;
