import {inject, injectable} from "tsyringe";
import { hash } from "bcryptjs";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository : IUsersRepository
    ){}

    async execute({name, email, password, driver_license}:ICreateUserDTO): Promise<void>{
        const userNameAlreadyExists = await this.userRepository.findByName(name);
        const userEmailAlreadyExists = await this.userRepository.findByEmail(email);
        const ErrorMessage = userNameAlreadyExists ? "User name already exists" : userEmailAlreadyExists ? "User email already exists" : "";
        const passwordHash = await hash(password, 8)

        if (ErrorMessage === "") {this.userRepository.create({name, email, password:passwordHash, driver_license})} 
        else {throw new AppError(ErrorMessage, 400,__dirname,__filename)}
    }
}

export {CreateUserUseCase};