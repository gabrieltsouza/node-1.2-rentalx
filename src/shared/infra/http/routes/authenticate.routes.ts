import { Router } from "express";
import { AuthenticateUserController } from "@modules/accounts/useCases/authenticateUser/AuthenticateUserController";
//import { ensureAthenticated } from "../shared/infra/http/middlewares/ensureAuthenticated";
//import { AuthenticateUserController } from "../modules/accounts/useCases/authenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const authenticateUserController = new AuthenticateUserController;

//authenticateRoutes.use(ensureAthenticated);

authenticateRoutes.post("/sessions", authenticateUserController.handle);

export {authenticateRoutes};