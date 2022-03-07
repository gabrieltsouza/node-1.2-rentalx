import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
    sub: string;
}

export async function ensureAthenticated(request:Request, response:Response, next:NextFunction){

    const authHeader = request.headers.authorization;

    if (!authHeader){
        throw new AppError("Token missing", 401, __dirname, __filename);
    }

    const [, token] = authHeader.split(" ");

    try {
        const {sub: user_id} = await verify(token, "7c0b09d988cdef8f2e84d8dc9b075f35") as IPayload;
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
        
        if (!user) {
            throw new AppError("User does not exists!", 401, __dirname, __filename);
        }

        request.user = {id:user_id};
        console.log("request.user", user_id)
        next();
    } catch (error) {
        throw new AppError("Invalid token", 401, __dirname, __filename);
    }
}