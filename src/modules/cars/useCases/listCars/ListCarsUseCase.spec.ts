import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory : CarsRepositoryInMemory;


// No arquivo contem 12 carros, 4 de cada marca/montadora (Toyota, Hyundai e VW), 
// onde 1 carro de cada montadora está com available: false

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    })

    it("Should be able to list all cars available", async () => {
        const cars = await listCarsUseCase.execute({});
        //console.log("Response Cars - " , cars)
        expect(cars).toHaveLength(9);
    })


    it("Should be able to list all cars available by name", async () => {
        const cars = await listCarsUseCase.execute({name : "Tucson"});
        //console.log("Response Cars - " , cars)
        expect(cars).toHaveLength(3);
    })

    it("Should be able to list all cars available by brand", async () => {
        const cars = await listCarsUseCase.execute({brand:"TOYOTA"});
        //console.log("Response Cars - " , cars)
        expect(cars).toHaveLength(3);
    })
})