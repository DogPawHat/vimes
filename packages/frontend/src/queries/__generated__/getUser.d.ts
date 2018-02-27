export interface getUser_user {
    __typename: "User";
    firstName: string | null;
    lastName: string | null;
}
export interface getUser {
    user: getUser_user | null;
}
export interface getUserVariables {
    id: number;
}
