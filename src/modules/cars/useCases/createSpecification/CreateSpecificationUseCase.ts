import { AppError } from "@shared/errors/AppError";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: 
    ISpecificationsRepository) {}
    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlredyExists =
            await this.specificationsRepository.findByName(name);
        if (specificationAlredyExists) {
            throw new AppError("Specification already exists!", 401, __dirname,__filename);
        }
        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUseCase };
