import React, { FC } from "react";
import { Input, Radio } from "@material-tailwind/react";
import { EditUserProps } from "../../../../types/types";

const EditUser: FC<EditUserProps> = ({
    formData,
    handleInputChange,
    footer,
}) => {
    return (
        <>
            <label htmlFor="first_name">First name</label>
            <Input
                crossOrigin="anonymous"
                color="indigo"
                type="text"
                name="first_name"
                label="First Name"
                labelProps={{
                    className: "!text-silver",
                }}
                className="text-dark-accent dark:text-neutral"
                value={formData.first_name}
                onChange={handleInputChange}
            />
            <label htmlFor="last_name">Last name</label>
            <Input
                crossOrigin="anonymous"
                color="indigo"
                type="text"
                name="last_name"
                label="Last Name"
                labelProps={{
                    className: "!text-silver",
                }}
                className="text-dark-accent dark:text-neutral"
                value={formData.last_name}
                onChange={handleInputChange}
            />
            <label htmlFor="user_name">User name</label>
            <Input
                crossOrigin="anonymous"
                color="indigo"
                type="text"
                name="user_name"
                label="User Name"
                labelProps={{
                    className: "!text-silver",
                }}
                className="text-dark-accent dark:text-neutral"
                value={formData.user_name}
                onChange={handleInputChange}
            />
            <label htmlFor="phone">Phone</label>
            <Input
                crossOrigin="anonymous"
                color="indigo"
                type="text"
                name="phone"
                label="Phone"
                labelProps={{
                    className: "!text-silver",
                }}
                className="text-dark-accent dark:text-neutral"
                value={formData.phone}
                onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            <Input
                crossOrigin="anonymous"
                color="indigo"
                type="email"
                name="email"
                label="Email"
                labelProps={{
                    className: "!text-silver",
                }}
                className="text-dark-accent dark:text-neutral"
                value={formData.email}
                onChange={handleInputChange}
            />
            {footer ? (
                <>
                    <label htmlFor="password">New password</label>
                    <Input
                        crossOrigin="anonymous"
                        color="indigo"
                        type="password"
                        name="password"
                        label="Password"
                        labelProps={{
                            className: "!text-silver",
                        }}
                        className="text-dark-accent dark:text-neutral"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <legend className="col-span-2">
                        Do you want to receive our special offers?
                    </legend>
                    <div className="flex gap-10 col-span-2 mx-auto">
                        {/*default checked to do adds*/}
                        <Radio
                            crossOrigin="anonymous"
                            id="true"
                            name="permission_for_email"
                            label="yes"
                            onChange={handleInputChange}
                            defaultChecked
                        />
                        <Radio
                            crossOrigin="anonymous"
                            id="false"
                            name="permission_for_email"
                            label="no"
                            onChange={handleInputChange}
                        />
                    </div>
                </>
            ) : null}
        </>
    );
};

export default EditUser;
