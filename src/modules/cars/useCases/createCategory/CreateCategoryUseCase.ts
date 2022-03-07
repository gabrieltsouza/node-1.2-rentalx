import {inject, injectable} from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}
    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExists =
            await this.categoriesRepository.findByName(name);
        console.log(categoryAlreadyExists);
        if (categoryAlreadyExists) {
            throw new AppError("Category already exists!", 400, __dirname,__filename);
        }
        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUseCase };
