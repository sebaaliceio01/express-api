import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";
import { request } from "http";
import { validate } from "class-validator";

export class UserController {

   static getAllUsers = async (req: Request, res: Response) => {
      const userRepo = getRepository(User)
      const users = await userRepo.find()

      if(users.length > 0) {
         res.send(users)
      } else {
         res.status(404).json({message: 'not Result'})
      }
   }

   static getUserById = async (req: Request, res: Response) => {
      const {id} = req.params
      const userRepo = getRepository(User)

      try {
         const user = await userRepo.findOneOrFail(id)
         res.send(user)
      } catch (err) {
         res.status(404).json({message: 'User not Found'})
      }
   }

   static createUser = async (req: Request, res: Response) => {
      const {userName, password, role} = req.body
      const user = new User()

      user.userName = userName
      user.password = password
      user.role = role

      const errors = await validate(user)
      if (errors.length > 0) {
         return res.status(400).json(errors)
      }

      //TODO: hash password

      const userRepo = getRepository(User)

      try {
         await userRepo.save(user)
      } catch (err) {
        return res.status(409).json({message: 'Username already exists'})
      }
      res.send('User Created')
   }

   static updateUser = async (req: Request, res: Response) => {
      let user;
      const {id} = req.params
      const {userName, role} = req.body;
      const userRepo = getRepository(User)
      
      try {
         user = await userRepo.findOneOrFail(id)
      } catch (err) {
         return res.status(404).json({message: 'user not found'})
      }

      user.userName = userName
      user.role = role

      const errors = await validate(user);
      if(errors.length > 0) {
         return res.status(400).json(errors)
      }

      try {
         await userRepo.save(user)
      } catch (e) {
         return res.status(409).json({message: 'username already in use'})
      }
      
      res.status(201).json({message: 'user updated'})
   }

   static deleteUser = async (req: Request, res: Response) => { 
      const { id } = req.params
      const userRepo = getRepository(User)
      let user: User
      try {
         user = await userRepo.findOneOrFail(id)
      } catch (e) {
         res.status(404).json({message: 'user not found'})
      }

      userRepo.delete(id)
      res.status(201).json({message: 'user deleted'})
   }

}

export default UserController