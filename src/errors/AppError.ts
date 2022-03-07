export class AppError {
    public readonly message:string;
    public readonly statusCode:number;
    public readonly dirName:string;
    public readonly fileName:string

    constructor(message:string, statusCode=400, dirName:string, fileName:string){
        this.message = message;
        this.statusCode = statusCode;
        console.log("AppError -> ", message, statusCode, dirName, fileName)
    }
}