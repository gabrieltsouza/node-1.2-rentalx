import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { parse } from "csv-parse";
import { json } from "express";
import fs from "fs";
import { inject, injectable } from "tsyringe";


interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const categories: IImportCategory[] = [];
            fs.existsSync(file.path)
            const stream = fs.createReadStream(file.path);
            const parseFile = parse();
            stream.pipe(parseFile);
            parseFile
            .on("data", async (line) => {
                const [name, description] = line;
                categories.push({ name, description });
            })
            .on("end", () => {
                console.log(`Removendo arquivo -> ${file.path}`);
                fs.promises.unlink(file.path);
                resolve(categories);
            })
            .on("error", (err) => {
                reject(err);
            });
        });
    }
    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        categories.map(async (category) => {
            const { name, description } = category;
            console.info("Row : " + name + "  /  " + description);
            const existCategory = await this.categoriesRepository.findByName(name);
            console.info("Row found : " + JSON.stringify(existCategory));

            if (!existCategory) {
                await this.categoriesRepository.create({ name, description });
            }
        });
    }
}

export { ImportCategoryUseCase };
