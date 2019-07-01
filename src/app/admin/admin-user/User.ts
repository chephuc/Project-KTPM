export interface User{
    idUsers: number
    UsersName: string
    UsersEmail: string
    UsersAddress: string;
    UsersPhoneNum: string
}

export interface Order{
    idOrder: number
    Total: number
    Date: Date
    idUsers: number
    UsersName: string;
}