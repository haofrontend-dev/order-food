import { ReasonPhrases } from './../share/utils/reasonPhrases';
import { StatusCodes } from './../share/utils/statusCode';
//* TYPE ERROR
import { ErrorResponseCore } from '../types/core_type'



//* STATUS CODE
export class ErrorResponse extends Error {
    status?: number
    constructor({ message, status }: ErrorResponseCore) {
        super(message);
        this.status = status
    }
}

export class ErrorBadrequest extends ErrorResponse {
    constructor({ 
        message = ReasonPhrases.BAD_REQUEST, 
        statusCode = StatusCodes.BAD_REQUEST 
    } : ErrorResponseCore = {}) {
        super({message, status: statusCode})
    }
} 

export class ErrorServer extends ErrorResponse {
    constructor({ 
        message = ReasonPhrases.INTERNAL_SERVER_ERROR, 
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR 
    } : ErrorResponseCore = {}) {
        super({message, status: statusCode})
    }
}

export class ErrorUnauthorized extends ErrorResponse {
    constructor({
        message = ReasonPhrases.UNAUTHORIZED,
        statusCode = StatusCodes.UNAUTHORIZED
    }: ErrorResponseCore = {}) {
        super({message, status: statusCode})
    }
}