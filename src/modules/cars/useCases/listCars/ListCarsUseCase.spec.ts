import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;

describe("List Cars", () => {

    beforeEach(() => {
        listCarsUseCase = new ListCarsUseCase();
    })

    it("Should be able to list all cars available", async () => {
        await listCarsUseCase.execute();
    })
})