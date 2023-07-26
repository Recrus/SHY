import React, { useState } from "react";
import { useStateContext } from "../../../context/ContextProvider.jsx";
import TheButton from "../../../components/UI/Button/TheButton.jsx";
import { Input, Radio } from "@material-tailwind/react";
import axiosFetch from "../../../plugins/axios.js";

const UserProfile = () => {
    const { user } = useStateContext();
    const initialFormData = {
        first_name: user.first_name,
        last_name: user.last_name,
        user_name: user.user_name,
        phone: user.phone,
        email: user.email,
        password: "",
        role_id: user.role_id,
        permission_for_email: true,
    };
    const [formData, setFormData] = useState({ ...initialFormData });
    const [isFormModified, setIsFormModified] = useState(false);
    const saveButtonDisabled = !isFormModified;
    const discardButtonDisabled = !isFormModified;

    const handleInputChange = (e) => {
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

    const handler = (e) => {
        e.preventDefault(e);
        console.log(formData);
    };

    const handleDiscardChanges = (e) => {
        e.preventDefault();
        setFormData({ ...initialFormData });
        setIsFormModified(false);
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const formDataToSend = { ...formData };
        if (formData.password === "") {
            delete formDataToSend.password;
        }

        try {
            await axiosFetch.patch(`/users/${user.id}`, formDataToSend);
            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className="max-w-[800px] mx-auto py-4">
            <div className="flex items-center bg-neutral rounded shadow-md dark:bg-dark-accent transition-all">
                <img
                    src="https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette.png"
                    alt=""
                    className="w-[100px] m-4 rounded-full bg-gray-light"
                />
                <div className="mx-auto">
                    <TheButton
                        text="Change picture"
                        className="h-[50px] !text-base !px-4 !text-gray !border-gray !p-0"
                        handler={handler}
                    />
                    <TheButton
                        text="Download resume"
                        className="h-[50px] ml-6 !text-base !px-4 !text-gray !border-gray !p-0"
                        handler={handler}
                    />
                </div>
            </div>
            <form className="grid grid-cols-4 grid-rows-4 gap-4 mt-4 p-4 rounded shadow-md items-center bg-neutral dark:bg-dark-accent transition-all">
                <label htmlFor="first_name">First name</label>
                <Input
                    type="text"
                    placeholder="First name"
                    className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                />
                <label htmlFor="last_name">Last name</label>
                <Input
                    type="text"
                    placeholder="Last name"
                    className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                />
                <label htmlFor="user_name">User name</label>
                <Input
                    type="text"
                    placeholder="User name"
                    className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                />
                <label htmlFor="phone">Phone</label>
                <Input
                    type="text"
                    placeholder="Phone"
                    className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                />
                <label htmlFor="email">Email</label>
                <Input
                    type="email"
                    placeholder="Email"
                    className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <label htmlFor="password">New password</label>
                <Input
                    type="password"
                    placeholder="Password"
                    className="focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 !font-primary"
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px]" }}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <legend className="col-span-2">
                    Do you want to receive our special offers?
                </legend>
                <div className="flex gap-10 col-span-2 mx-auto">
                    <Radio
                        id="true"
                        name="permission_for_email"
                        label="yes"
                        onChange={handleInputChange}
                        defaultChecked
                    />
                    <Radio
                        id="false"
                        name="permission_for_email"
                        label="no"
                        onChange={handleInputChange}
                    />
                </div>
                <TheButton
                    text="Save changes"
                    className="h-[50px] !text-base !px-4 !text-gray !border-gray !p-0 disabled:opacity-50"
                    handler={handleSaveChanges}
                    type="submit"
                    disabled={saveButtonDisabled}
                />
                <TheButton
                    text="Discard changes"
                    className="h-[50px] !text-base !px-4 !text-gray !border-gray !p-0 col-start-4 disabled:opacity-50"
                    handler={handleDiscardChanges}
                    type="submit"
                    disabled={discardButtonDisabled}
                />
            </form>
        </main>
    );
};

export default UserProfile;
