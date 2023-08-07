import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

import carsFile from "./carsFile.json";

class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[];
    constructor() {
        this.cars = carsFile;
    }
    async create({brand, category_id, daily_rate, description, fine_amount, name, license_plate} : ICreateCarDTO): Promise<Car>{
        const car = new Car();

        Object.assign(car, {brand, category_id, daily_rate, description, fine_amount, name, license_plate});

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car>{
        return this.cars.find((car) => car.license_plate === license_plate);
    };

    async findAvailable(category_id?:string, brand?:string, name?:string): Promise<Car[]> {
        const cars = 
            this.cars
            .filter((car) => car.available === true && 
            ((category_id && category_id === car.category_id) || 
             (brand && brand === car.brand) || 
             (name && name === car.name)
            )
            );
        return cars;
    }
}

export {CarsRepositoryInMemory}