import { validate } from "class-validator"
import { Request, Response } from "express"
import { Connection, getRepository } from "typeorm"
import { New } from "../entity/New"

export class NewController {

    static getAll = async (req: Request, res: Response) => {
       
        const { pageSize = 2, page = 1 } = req.query 
        const newRepo = getRepository(New)
        const news = await newRepo.find({
            order: {
                title: "ASC",
            },
            skip: +page,
            take: +pageSize,
        })
        
        if(news.length>0) {
            res.send(news)
        } else {
            res.status(404).json({message: 'Not result'})
        }
    }

    static getNewById = async (req: Request, res: Response) => {
        const {id} = req.params
        const newRepo = getRepository(New)

        try {
            const news = await newRepo.findOneOrFail(id)
            res.send(news)
        } catch (err) {
            res.status(404).json({message: 'New not found'})
        }
    }

    static createNew = async(req: Request, res: Response) => {
        const { title, subtitle, text, image } = req.body
        const news = new New

        news.title = title
        news.subtitle = subtitle
        news.text = text
        news.image = image

        const errors = await validate(news)
        if ( errors.length > 0 ) {
            return res.status(400).json(errors)
        }

        const newRepo = getRepository(New)

        try {
            await newRepo.save(news)
        } catch (err) {
            return res.status(409).json({message: 'new already exists'})
        }
        res.send('new created')

    }

    static updateNew = async (req: Request, res: Response) => {
        let news;
        const {id} = req.params
        const { title, subtitle, text, image } = req.body
        const newRepo = getRepository(New)

        try {
            news = await newRepo.findOneOrFail(id)
         } catch (err) {
            return res.status(404).json({message: 'new not found'})
         }

        news.title = title
        news.subtitle = subtitle
        news.text = text
        news.image = image

        const errors = await validate(news);
        if(errors.length > 0) {
           return res.status(400).json(errors)
        }

        try {
            await newRepo.save(news)
         } catch (e) {
            return res.status(409).json({message: 'username already in use'})
         }
         
         res.status(201).json({message: 'new updated'})
    }

    static deleteNew = async (req: Request, res: Response) => {
        const {id} = req.params
        const newRepo = getRepository(New)
        let news : New
        try {
            news = await newRepo.findOneOrFail(id)
        } catch (e) {
            res.status(404).json({message: 'new not found'})
        }
        newRepo.delete(id)
        res.status(201).json({message: 'new deleted'})
    }
    
}


export default NewController