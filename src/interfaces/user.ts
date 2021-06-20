import { type } from "os";

export interface RegisterUserResponse {
    email: string;
    id: string;
    hid: string;
    isAdmin: boolean;    
}

export type RegisterUserResponseArray = RegisterUserResponse[];