import { type } from "os";

export interface RegisterUserResponse {
    email: string;
    id: string;
    hid: string;    
}

export type RegisterUserResponseArray = RegisterUserResponse[];