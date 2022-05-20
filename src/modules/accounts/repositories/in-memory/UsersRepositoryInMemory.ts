import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/IUpdateUserAvatarDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository{
    Users: User[]=[];

    async create({driver_license, email, password, name}: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, {driver_license, email, password, name});
        this.Users.push(user);
    }
    async list(): Promise<User[]> {
        return await this.Users;
    }
    async findByName(name: string): Promise<User> {
        return await this.Users.find((user) => user.name === name);
    }
    async findByEmail(email: string): Promise<User> {
        return await this.Users.find((user) => user.email === email);
    }
    async findById(id: string): Promise<User> {
        return await this.Users.find((user) => user.id === id);
    }
    async updateAvatar(data: IUpdateUserAvatarDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export {UsersRepositoryInMemory};