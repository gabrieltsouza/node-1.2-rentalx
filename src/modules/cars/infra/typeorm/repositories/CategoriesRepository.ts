/* eslint-disable no-use-before-define */
import { Category } from "../entities/Category";
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";

import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category);
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            description,
            name,
        });

        await this.repository.save(category);
    }

    async findByName(name: string): Promise<Category> {
        // select * from categories where name = "name" limit 1
        const category = await this.repository.findOne({name});
        //console.log(category);
        return category;
    }
    async list(): Promise<Category[]> {
        const categories = await this.repository.find();
        return categories;
    }
}

export { CategoriesRepository };
