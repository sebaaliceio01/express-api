import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";

export class AuthController {
  static login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res
        .status(400)
        .json({ message: "Username & password are required!" });
    }

    const userRepo = getRepository(User);
    let user: User;

    try {
      user = await userRepo.findOneOrFail({ where: { username: username } });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Username or Password incorrect!" });
    }

    res.send(user);
  };
}

export default AuthController;
