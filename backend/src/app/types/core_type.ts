export interface SuccessResponseCore {
    message?: string;
    status?: number;
    statusCode?: number;
    metadata?: Object
}


export interface ErrorResponseCore {
    message?: string;
    status?: number;
    statusCode?: number;
}