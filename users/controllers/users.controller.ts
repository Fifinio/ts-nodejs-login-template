import * as UserModel from '../models/users.model';
import crypto from 'crypto';
import {Request ,Response} from 'express';

export const insert = (req: Request, res: Response) => {
    console.log('got to the controller - insert')
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    UserModel.createUser(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

export const list = (req: Request, res: Response) => {
    let limit = req.query.limit?.toString() && parseInt(req.query.limit.toString()) <= 100 ? parseInt(req.query.limit.toString()) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            page = Number.isInteger(req.query.page.toString()) ? parseInt(req.query.page.toString()) : 0;
        }
    }
    UserModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

export const getById = (req: Request, res: Response) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        });
};
export const patchById = (req: Request, res: Response) => {
    if (req.body.password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        req.body.password = salt + "$" + hash;
    }

    UserModel.patchUser(req.params.userId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

export const removeById = (req: Request, res: Response) => {
    UserModel.removeById(req.params.userId)
        .then((result)=>{
            res.status(204).send({});
        });
};
