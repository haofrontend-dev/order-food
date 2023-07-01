import { Request, Response, NextFunction } from "express";

// CONTANTS
import CONTANTS from "../config/contants";
import CONFIG from "../config/config";

//* TOKEN
import TOKENS from "../utils/tokens";

//* HELPERS
import HELPERS from "../utils/helper";



class UserMiddleware {

    async accessUserMiddle(req: Request, res: Response, next: NextFunction) {
        // Date now 
        let now = new Date();

        // Log request
        console.info('[Request timeout]:', now.toLocaleTimeString(), req.baseUrl, req.body, req.query)

        // Refresh token cookie
        const refresh_token = req.cookies.token;

        // Take the access token headers
        const access_token = req.headers.authorization?.split(' ')[1] || '';

        const auth_user_decode: any = TOKENS.verifyAccessToken(access_token)

        // Check token
        if (!refresh_token || !access_token) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                status: CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED,
                message: 'Unauthorized'
            })
        }
        
        try {
            const check_access_token = HELPERS.isAccessTokenValid(access_token)

            if (!check_access_token) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                    message: 'Unauthorized'
                })
            }

            req.query.auth_user = auth_user_decode;
            next();
        } catch (error) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).json({
                status: CONTANTS.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
                message: 'server_error_invalid_access_token'
            })
        }

        
    }
}

export default new UserMiddleware