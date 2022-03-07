// DTO = Data Transfer Object
interface ICreateUserDTO {
    name:string;
    email:string;
    password:string;
    driver_license:string;
}

export { ICreateUserDTO}