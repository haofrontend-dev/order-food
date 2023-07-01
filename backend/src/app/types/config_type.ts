import {Request, Response, NextFunction} from 'express'

//Todo: -----Token Decode
export interface TokenDecoder {
    id: string,
    username: string,
    role: number,
}

//Todo: -----Public Key
export interface Key {
    public_key: string,
    private_key: string
}

export type paramsController = (
    req: Request,
    res: Response,
    next?: NextFunction
) => void