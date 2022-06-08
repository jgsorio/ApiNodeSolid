import { Request, Response, Router } from "express";
import { createUserController } from "./useCases/CreateUser";
const router = Router();

router.post('/', (request: Request, response: Response) => {
    return createUserController.handle(request, response);
});

export default router;