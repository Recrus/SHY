import React, {
    ChangeEvent,
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
} from "react";

//Utility types

export type SetState<T> = Dispatch<SetStateAction<T>>;
type SVGProps = React.PropsWithoutRef<React.ComponentProps<"svg">>;
interface DialogProps {
    open: boolean;
    handleOpen: () => void;
}

//HeroIcons type

export type HeroIcon = React.ComponentType<
    SVGProps & {
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
    setUser: SetState<UserData | null>;
    setToken: (newToken: string | null) => void;
    isMenuOpen: boolean;
    setIsMenuOpen: SetState<boolean>;
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
    links: Record<string, string>[];
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
    setLoading: SetState<boolean>;
    setSearch: SetState<string>;
    setPerPage: SetState<number>;
    sortKey?: string;
    setSortKey: SetState<string>;
    sortDirection?: string;
    setSortDirection: SetState<string>;
    dataVersion: number;
    setDataVersion: SetState<number>;
}

//axios types

export interface Config {
    baseURL: string;
    headers: Record<string, string>;
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
    setIsOpen: SetState<boolean>;
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
    setSortDirection: SetState<string>;
    setSortKey: SetState<string>;
    TABLE_HEAD: TableHead;
    sortKeys: SortKeys;
}

//CardTableHeader types

export interface CardTableHeaderProps {
    title: string;
    subTitle: string;
    search: string;
    setSearch: SetState<string>;
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
    setCurrentPage: SetState<number>;
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

//ProfileMenu types

export interface ProfileMenuItems {
    label: string;
    icon: HeroIcon;
    route: string;
}

//Pagination types

export interface PaginationProps {
    currentPage: number;
    setPage: SetState<number>;
    totalPages: number;
}

//Exams types

export interface Exam {
    id: number;
    name: string;
    description: string;
    reviewer_id: number;
    created_at: string;
    updated_at: string;
    avgMark: number | null;
    colorClass?: string;
}

export type RadarDataPoint = {
    [key: string]: string | number;
};

interface BaseExamAnalytics {
    exam_id: number;
}

export interface ExamAnalyticsAdmin extends BaseExamAnalytics {
    average_mark: number;
    exam_total_attempts: number;
}

export interface ExamAnalyticsEmployee extends BaseExamAnalytics {
    id: number;
    mark: number;
    is_accepted: number;
    junior_id: number;
    review_text: string;
    reviewed_at: string;
}

export interface AnalyticsDataAdmin {
    exams: ExamAnalyticsAdmin[];
    total_attempts: number;
    total_success_rate: number;
}

//RadarChart types

export interface RadarChartProps {
    data: RadarDataPoint[];
}

//ExamOverview types

export interface ExamOverviewProps {
    loading: boolean;
    avgPerformance: number | undefined;
    totalAttempts: number;
    passedRate: number;
    radarData: RadarDataPoint[];
    role?: number;
    setRefetch: SetState<number>;
}

//ExamCard types

export interface ExamCardProps {
    exam: Exam;
    setRefetch: SetState<number>;
}

//EditExam types

export interface LinkData {
    id: number;
    link: string;
    reviewer: UserData;
    employee: UserData;
    exam_id: number;
    created_at: string;
}

//ExamTableRow types

export interface ExamTableRowProps {
    id: number;
    exam_id: number;
    classes: string;
    link: string;
    reviewer: UserData;
    employee: UserData;
    reviewersData: UserData[];
    setRefetch: SetState<number>;
}

export interface initialFromDataExamEdit {
    reviewer_id: number | null;
    employee_id: number | null;
    link: string;
    exam_id: number;
}

//EditExamDialog types

export interface EditExamDialogProps extends DialogProps {
    select: string | undefined;
    handler: (value: string | undefined) => void;
    reviewersData: UserData[];
    formData: initialFromDataExamEdit;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDiscardChanges: () => void;
    saveButtonDisabled: boolean;
    handleSaveChanges: () => Promise<void>;
}

//CreateExamLinkDialog types

export interface CreateExamLinkDialogProps extends DialogProps {
    employeesData: UserData[];
    setRefetch: SetState<number>;
    reviewersData: UserData[];
    exam_id: number;
}

//ExamCreateDialog types

export interface ExamCreateDialogProps extends DialogProps {
    name: RefObject<HTMLInputElement>;
    description: RefObject<HTMLInputElement>;
    handleSubmit: () => Promise<void>;
    nameError: string;
    descriptionError: string;
}

//Tests types

export interface Test {
    id: number;
    name: string;
    description: string;
    mark?: number;
    is_passed?: number;
}

//TestOverview types

export interface Question {
    id: number;
    name: string;
    description: string;
}

export interface Questions {
    id: number;
    test_id: number;
    question: Question;
}

//QuestionTableRow types

export interface QuestionTableRowProps {
    classes: string;
    question: Question;
}

//QuestionEdit types

export interface Answer {
    id: number;
    text: string;
    answer: boolean;
    question_id: number;
}

//QuestionEditDialog types

export interface QuestionEditDialogProps {
    answer: Answer;
    setRefetch: SetState<number>;
    correctAnswerCount: number;
}
