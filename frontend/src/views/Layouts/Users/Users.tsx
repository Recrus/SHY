import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
} from "@material-tailwind/react";
import React, { useEffect, useMemo, useState } from "react";
import { usePaginatedSearch } from "../../../hooks/usePaginatedSearch/usePaginatedSearch";
import debounce from "../../../functions/debounce";
import TableHeader from "../../../components/UI/Table/TableHeader/TableHeader";
import CardTableHeader from "../../../components/UI/Table/CardTableHeader/CardTableHeader";
import TableCreateUserForm from "../../../components/UI/Table/TableCreateUserForm";
import PlaceholderRow from "../../../components/UI/Table/PlaceholderRow/PlaceholderRow";
import UserTableRow from "../../../components/UI/Table/UserTableRow/UserTableRow";
import Pagination from "../../../components/UI/Table/Pagination/Pagination";
import { SortKeys, TableHead } from "../../../../types/types";

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
    } = usePaginatedSearch(`/users?itemsPerPage=10&page=${currentPage}`);
    const PLACEHOLDER_ROWS: number = search ? search.split(" ").length : 10;

    const TABLE_HEAD: TableHead = [
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
                        <TableCreateUserForm
                            refetchData={() =>
                                setDataVersion((prevVersion) => prevVersion + 1)
                            }
                        />
                    }
                    subTitle="See information about all members"
                    title="Members list"
                />
            </CardHeader>
            <CardBody className="overflow-scroll px-0 py-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <TableHeader
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
                                      <PlaceholderRow
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
                                      refetchData={() =>
                                          setDataVersion(
                                              (prevVersion) => prevVersion + 1,
                                          )
                                      }
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
