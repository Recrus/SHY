import { useState, useEffect } from "react";
import axiosFetch from "../../plugins/axios";
import { PaginatedSearchData, PaginatedSearchHook } from "../../../types/types";

export function usePaginatedSearch(
    url: string,
    itemsPerPage = 10,
): PaginatedSearchHook {
    const [data, setData] = useState<PaginatedSearchData>({
        data: [],
        meta: {
            current_page: 1,
            from: 0,
            last_page: 1,
            links: [],
            path: "",
            per_page: itemsPerPage,
            to: 0,
            total: 0,
        },
    });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(itemsPerPage);
    const [sortKey, setSortKey] = useState("");
    const [sortDirection, setSortDirection] = useState("");
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
