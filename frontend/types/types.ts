import React, { Dispatch, ReactNode, SetStateAction } from "react";

//HeroIcons type

export type HeroIcon = React.ComponentType<
    React.PropsWithoutRef<React.ComponentProps<"svg">> & {
        title?: string | undefined;
        titleId?: string | undefined;
    }
>;

//ContextProvider types

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    user_name?: string;
    phone: string;
    email: string;
    permission_for_email: boolean;
    role_id: number;
    created_at: string;
    updated_at: string;
}

export interface StateContextType {
    user: UserData | null;
    token: string | null;
    setUser: (user: UserData | null) => void;
    setToken: (token: string | null) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
}

export interface ContextProviderProps {
    children: ReactNode;
}

//usePaginatedSearch types

export interface MetaData {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{ [key: string]: string }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

export interface PaginatedSearchData {
    data: UserData[];
    meta: MetaData;
}

export interface PaginatedSearchHook {
    data: PaginatedSearchData;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setSearch: Dispatch<SetStateAction<string>>;
    setPerPage: Dispatch<SetStateAction<number>>;
    sortKey?: string;
    setSortKey: Dispatch<SetStateAction<string>>;
    sortDirection?: string;
    setSortDirection: Dispatch<SetStateAction<string>>;
    dataVersion: number;
    setDataVersion: Dispatch<SetStateAction<number>>;
}

//axios types

export interface Config {
    baseURL: string;
    headers: {
        "Content-Type": string;
    };
}

//useDarkSide types

export type Theme = "dark" | "light";

//DarkModeSwitcher types

export interface DarkModeSwitcherProps {
    sunColor?: string;
    moonColor?: string;
}

//tokenValidation types

export type Token = string | null | undefined;

export interface DecodedToken {
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    nbf: number;
    prv: string;
    role: number;
    sub: string;
}

//requireRole types

export interface RequireRoleProps {
    role?: number | null;
    children: React.ReactNode;
}

//DefaultLayout types

export interface ListItems {
    item: string;
    route: string;
}

//TheNavbar types

export interface TheNavbarProps {
    listItems: ListItems[];
}

//Landing types

export interface Item {
    title: string;
    content: string;
}

export interface Overview {
    author: string;
    content: string;
    occupation: string;
    avatar: string;
    git: string;
}

//TheButton types

export interface TheButtonProps {
    text?: string;
    className?: string;
    handler?: () => void;
    type?: "button" | "submit" | "reset" | undefined;
    disabled?: boolean;
}

//BurgerMenu types

export interface BurgerMenuProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

//Users component types

export interface SortKeys {
    "Full name": string;
    "User name": string;
    Phone: string;
    "Signed at": string;
    [key: string]: string;
}

export type TableHead = string[];

//TableHeader types

export interface TableHeaderProps {
    sortKey?: string;
    sortDirection?: string;
    setSortDirection: Dispatch<SetStateAction<string>>;
    setSortKey: Dispatch<SetStateAction<string>>;
    TABLE_HEAD: TableHead;
    sortKeys: SortKeys;
}

//CardTableHeader types

export interface CardTableHeaderProps {
    title: string;
    subTitle: string;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    createButton: React.ReactNode;
}

//TableCreateUserForm types

export interface TableCreateUserFormProps {
    refetchData: () => void;
}

//PlaceholderRow types

export interface PlaceholderRowProps {
    key: number;
    index: number;
    lastRow: boolean;
}

//UserTableRow types

export interface UserTableRowProps {
    userData: UserData;
    isLast: boolean;
    refetchData: () => void;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export interface InitialFormDataUserRow {
    first_name: string;
    last_name: string;
    user_name: string;
    phone: string;
    email: string;
}

//UserProfile types

export interface InitialFormDataProfile {
    first_name?: string;
    last_name?: string;
    user_name?: string;
    phone?: string;
    email?: string;
    password?: string;
    role_id?: number;
    permission_for_email?: boolean;
}

//Pagination types

export interface PaginationProps {
    currentPage: number;
    setPage: Dispatch<SetStateAction<number>>;
    totalPages: number;
}
