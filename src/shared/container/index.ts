import { container } from "tsyringe";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";

//import {ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository";
//import {CategoriesRepository} from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
//import {ISpecificationsRepository} from "../../modules/cars/repositories/ISpecificationsRepository";
//import {SpecificationsRepository} from "../../modules/cars/repositories/implementations/SpecificationsRepository";
//import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
//import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";

// ICategoryRepository
container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>(
    "SpecificationsRepository",
    SpecificationsRepository
)

// IUsersRepository
container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

//ICarsRepository
container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)