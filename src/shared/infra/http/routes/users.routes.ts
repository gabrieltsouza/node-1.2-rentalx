import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { ensureAthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

//import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
//import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "../../../../config/upload";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";

//import { ensureAthenticated } from "../shared/infra/http/middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.use(ensureAthenticated);
usersRoutes.post("/", ensureAdmin, createUserController.handle);
usersRoutes.patch("/avatar", uploadAvatar.single("avatar"), updateUserAvatarController.handle);

export {usersRoutes};