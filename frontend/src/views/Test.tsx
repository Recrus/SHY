import React, {ChangeEvent} from "react";
import { usePaginatedSearch } from "../hooks/usePaginatedSearch/usePaginatedSearch";
import {Spinner} from "@material-tailwind/react";

function Test() {
    const { data, loading, setSearch } = usePaginatedSearch("/users");

    return (
        <div>
            <input type="search" onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
            {loading ? (
                <Spinner />
            ) : (
                data.data.map((item: {id: number}) => <div key={item.id}>{item.id}</div>)
            )}
        </div>
    );
}

export default Test;
