import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import { usePaginatedSearch } from "../../../hooks/usePaginatedSearch";
import debounce from "../../../functions/debounce";
import TableHead from "../../../components/UI/Table/TableHead/TableHead";
import CardTableHeader from "../../../components/UI/Table/CardTableHeader/CardTableHeader";
import TableCreateUserForm from "../../../components/UI/Table/TableCreateUserForm";
import UsersPlaceholderRow from "../../../components/UI/Table/PlaceholderRow/PlaceholderRow";
import UserTableRow from "../../../components/UI/Table/TableRows/UserTableRow/UserTableRow";
import Pagination from "../../../components/UI/Table/Pagination/Pagination";
import { SortKeys, TheTableHead, UserData } from "../../../../types/types";

const TABLE_HEAD: TheTableHead = [
    "Full name",
    "User name",
    "Phone",
    "Signed at",
    "",
];
const sortKeys: SortKeys = {
    "Full name": "id",
    "User name": "user_name",
    Phone: "phone",
    "Signed at": "created_at",
};

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const {
        data: usersData,
        loading: isLoading,
        setLoading: setIsLoading,
        setSearch: setServerSearch,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        setDataVersion,
    } = usePaginatedSearch<UserData>(
        `/users?itemsPerPage=10&page=${currentPage}`,
    );
    const PLACEHOLDER_ROWS: number = search ? search.split(" ").length : 10;

    const refetchData = () => setDataVersion((prevVersion) => prevVersion + 1);

    const debouncedSearch = useMemo(
        () => debounce(setServerSearch, 500),
        [setServerSearch],
    );

    useEffect(() => {
        setIsLoading(true);
        setCurrentPage(1);
        debouncedSearch(search);

        return () => {
            debouncedSearch.cancel();
        };
    }, [search, debouncedSearch]);

    return (
        <Card className="h-full w-full bg-white dark:bg-dark-accent transition-all">
            <CardHeader
                floated={false}
                shadow={false}
                className="rounded-none bg-white dark:bg-dark-accent transition-all"
            >
                <CardTableHeader
                    search={search}
                    setSearch={setSearch}
                    createButton={
                        <TableCreateUserForm refetchData={refetchData} />
                    }
                    subTitle="See information about all members"
                    title="Members list"
                />
            </CardHeader>
            <CardBody className="overflow-scroll px-0 py-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <TableHead
                        sortKey={sortKey}
                        setSortDirection={setSortDirection}
                        setSortKey={setSortKey}
                        sortDirection={sortDirection}
                        TABLE_HEAD={TABLE_HEAD}
                        sortKeys={sortKeys}
                    />
                    <tbody>
                        {isLoading
                            ? Array.from(
                                  { length: PLACEHOLDER_ROWS },
                                  (_, index) => (
                                      <UsersPlaceholderRow
                                          key={index}
                                          index={index}
                                          lastRow={
                                              index === PLACEHOLDER_ROWS - 1
                                          }
                                      />
                                  ),
                              )
                            : usersData.data.map((user, index) => (
                                  <UserTableRow
                                      key={user.id}
                                      userData={user}
                                      isLast={
                                          index === usersData.data.length - 1
                                      }
                                      refetchData={refetchData}
                                      setCurrentPage={setCurrentPage}
                                  />
                              ))}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="p-0">
                <Pagination
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                    totalPages={usersData.meta.last_page}
                />
            </CardFooter>
        </Card>
    );
};

export default Users;
