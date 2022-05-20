import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase : AuthenticateUserUseCase;
let usersRepositoryInMemory : UsersRepositoryInMemory;
let createUserUseCase : CreateUserUseCase;

describe("Authenticate User", () => {
    beforeEach(()=> {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async ()=>{
        const user : ICreateUserDTO = {
            driver_license : "000123",
            name: "User Test",
            password:"1234",
            email: "user@test.com"
        };
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            password: user.password,
            email: user.email
        });
  
        expect(result).toHaveProperty("token");
    });

    it("Should not be able to athenticate a non existent user", ()=>{
        expect(async () => {
            await authenticateUserUseCase.execute({
                password: "1234",
                email: "fakeuser@email.com"
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("Should not be able to athenticate with incorrect password", ()=>{
        expect(async () => {
            const user : ICreateUserDTO = {
                driver_license : "000123",
                name: "User Test",
                password:"1234",
                email: "user2@test.com"
            };
            await createUserUseCase.execute(user);
            await authenticateUserUseCase.execute({
                password: "1234oqicbwd",
                email: user.email
            });    
        }).rejects.toBeInstanceOf(AppError);

    })

})