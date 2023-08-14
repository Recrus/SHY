import React, { useEffect } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
import axiosFetch from "../../../plugins/axios";

const Exams = () => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosFetch.get("/exams");
                console.log(response);
            } catch (e) {
                console.log(e);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Card className="mt-6 w-96">
                <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                        UI/UX Review Check
                    </Typography>
                    <Typography>
                        The place is close to Barceloneta Beach and bus stop
                        just 2 min by walk and near to &quot;Naviglio&quot;
                        where you can enjoy the main night life in Barcelona.
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button>Read More</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Exams;
