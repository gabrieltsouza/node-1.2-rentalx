import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";


//import { ensureAthenticated } from "../shared/infra/http/middlewares/ensureAuthenticated";
//import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
//import { ImportCategoryController } from "../modules/cars/useCases/importCategory/ImportCategoryController";
//import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({ dest: "./tmp" });

categoriesRoutes.use(ensureAthenticated);

const createCategoryController = new CreateCategoryController();
categoriesRoutes.post("/", ensureAdmin, createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoriesRoutes.get("/", listCategoriesController.handle);

const importCategoryController = new ImportCategoryController();
categoriesRoutes.post("/import", ensureAdmin, upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };
