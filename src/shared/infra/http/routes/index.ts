import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";

import { categoriesRoutes } from "./categories.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/cars", carsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);

export { router };