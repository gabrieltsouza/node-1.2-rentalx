import { User } from "../../entities/User";

import { IUsersRepository } from "../IUsersRepository";

import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserAvatarDTO } from "../../dtos/IUpdateUserAvatarDTO";

class UsersRepository implements IUsersRepository {
    private repository : Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    async updateAvatar(data: IUpdateUserAvatarDTO): Promise<void> {
        await this.repository.update({id:data.id}, {avatar:data.avatar});
    }
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({email});
        return user;
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({id});
        return user;
    }
    async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({name, email, password, driver_license});
        await this.repository.save(user);
    }
    async list(): Promise<User[]> {
        return await this.repository.find();
    }
    async findByName(name: string): Promise<User> {
        const user = this.repository.findOne({name});
        return user;
    }
}

export {UsersRepository}