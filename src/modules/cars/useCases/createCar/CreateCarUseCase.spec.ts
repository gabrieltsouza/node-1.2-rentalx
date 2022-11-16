import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;

describe("Create Car", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it("Should be able to register a new car", async () => {
        const car = await createCarUseCase.execute(
            {
                name: "Car Test Name",
                description: "Car Test Description",
                daily_rate: 1.99,
                license_plate: "OKJ-9897",
                fine_amount: 1.98,
                brand: "Brand Test",
                category_id: "Category Test"
            });
        expect(car).toHaveProperty("id");
    });

    it("Should not be able to register a car with an existing license plate", async () => {
        expect(async () => {
        await createCarUseCase.execute(
            {
                name: "Car Test Name 1",
                description: "Car Test Description 1",
                daily_rate: 1.99,
                license_plate: "OKJ-9897",
                fine_amount: 1.98,
                brand: "Brand Test",
                category_id: "Category Test"
            })

            await createCarUseCase.execute(
                {
                    name: "Car Test Name 2",
                    description: "Car Test Description 2",
                    daily_rate: 1.99,
                    license_plate: "OKJ-9897",
                    fine_amount: 1.98,
                    brand: "Brand Test",
                    category_id: "Category Test"
                })
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should register a default availability when a new car ", async () => {
            const car = await createCarUseCase.execute(
                {
                    name: "Car Available",
                    description: "Car Test Available",
                    daily_rate: 1.99,
                    license_plate: "OKJ-1618",
                    fine_amount: 1.98,
                    brand: "Brand Test",
                    category_id: "Category Test"
                });

                expect(car.available).toBe(true);
        })
})