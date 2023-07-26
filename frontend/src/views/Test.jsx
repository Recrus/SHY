import React from "react";
import { usePaginatedSearch } from "../hooks/usePaginatedSearch.jsx";

function Test() {
    const { data, loading, setSearch } = usePaginatedSearch("/users");

    return (
        <div>
            <input type="search" onChange={(e) => setSearch(e.target.value)} />
            {loading ? (
                <div>Loading...</div>
            ) : (
                data.data.map((item) => <div key={item.id}>{item.id}</div>)
            )}
        </div>
    );
}

export default Test;
