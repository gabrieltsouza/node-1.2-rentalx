import { Router } from "express";
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/cars/useCases/listSpecifications/ListSpecificationsController";

//import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
//import { ListSpecificationsController } from "../modules/cars/useCases/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAthenticated);

specificationsRoutes.post("/", createSpecificationController.handle);
specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
