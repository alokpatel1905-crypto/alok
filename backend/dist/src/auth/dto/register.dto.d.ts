import { AppRole } from '../../roles/roles.enum';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role?: AppRole;
}
