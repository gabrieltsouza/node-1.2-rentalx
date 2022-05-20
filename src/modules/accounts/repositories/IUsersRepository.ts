import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../dtos/IUpdateUserAvatarDTO";
import { User } from "../infra/typeorm/entities/User";


interface IUsersRepository{
    create(data: ICreateUserDTO) : Promise<void>;
    list(): Promise<User[]>;
    findByName(name:string): Promise<User>;
    findByEmail(email:string): Promise<User>;
    findById(id:string): Promise<User>;
    updateAvatar(data: IUpdateUserAvatarDTO) : Promise<void>;
}

export { IUsersRepository}