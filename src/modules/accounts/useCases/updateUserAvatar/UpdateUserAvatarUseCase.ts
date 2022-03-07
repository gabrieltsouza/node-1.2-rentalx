import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
    user_id:string,
    avatar_file:string
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository : IUsersRepository
    ){}
    async execute({user_id, avatar_file}:IRequest) : Promise<void>{
        const user = await this.usersRepository.findById(user_id);
        if (!user) { throw new AppError("Some complex problem", 500, __dirname,__filename);}
        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        user.avatar = avatar_file;
        await this.usersRepository.updateAvatar(user);
    }
}
export {UpdateUserAvatarUseCase}