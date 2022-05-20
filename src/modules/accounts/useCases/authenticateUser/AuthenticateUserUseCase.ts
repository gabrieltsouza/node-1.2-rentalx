import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user:{
        name:string;
        email:string
    },
    token:string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({email, password}: IRequest): Promise<IResponse> {
        // User not exist
        const user = await this.usersRepository.findByEmail(email);
        if (!user){
            throw new AppError("Access denied!", 401, __dirname, __filename)
        }
        // Wrong password
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch){
            throw new AppError("Access denied!", 401, __dirname,__filename)
        }
        // Build jsonwebtoken
        const token = sign({}, "7c0b09d988cdef8f2e84d8dc9b075f35", {
            subject:user.id,
            expiresIn:"1h"
        });

        const tokenReturn: IResponse = {
            token,
            user:{
                name:user.name,
                email:user.email
            }
        }

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }