import { useState, useEffect } from "react";
import axiosFetch from "../plugins/axios.js";

export function usePaginatedSearch(url, itemsPerPage = 10) {
    const [data, setData] = useState({ data: [], meta: {} });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(itemsPerPage);
    const [sortKey, setSortKey] = useState(null);
    const [sortDirection, setSortDirection] = useState(null);
    const [dataVersion, setDataVersion] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axiosFetch.get(url, {
                    params: {
                        "filter[search]=": search,
                        sort: sortKey
                            ? `${sortDirection === "asc" ? "" : "-"}${sortKey}`
                            : undefined,
                        itemsPerPage: perPage,
                    },
                });
                setData(response.data);
            } catch (e) {
                console.log(e);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };

        fetchData();
    }, [url, search, perPage, sortKey, sortDirection, dataVersion]);

    return {
        data,
        loading,
        setLoading,
        setSearch,
        setPerPage,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        dataVersion,
        setDataVersion,
    };
}
