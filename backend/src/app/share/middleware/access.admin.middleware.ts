import { Request, Response, NextFunction } from "express";

// CONTANTS
import CONTANTS from "../config/contants";

//* TOKEN
import TOKENS from "../utils/tokens";

//* HELPERS
import HELPERS from "../utils/helper";

//* TYPES
import { TokenDecoder } from '../../types/config_type'
import { ErrorBadrequest , ErrorServer} from '../../core/error.response'
declare module 'express' {
    interface Request {
      auth_user?: TokenDecoder; // Thay any bằng kiểu dữ liệu phù hợp của 'auth_user'
    }
}

class AdminMiddleware {

    async accessAdminMiddle(req: Request, res: Response, next: NextFunction) {
        // Date now 
        let now = new Date();

        // Log request
        console.info('[Request timeout]:', now.toLocaleTimeString(), req.baseUrl, req.body, req.query)

        // Refresh token cookie
        const refresh_token = req.cookies.token;

        // Take the access token headers
        const access_token = req.headers.authorization?.split(' ')[1] || '';

        // Check token invalid
        if (!refresh_token || !access_token) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                status: CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED,
                message: 'Unauthorized'
            })
        }
        
        try {
            const auth_admin_decode = await TOKENS.verifyAccessToken(access_token) as TokenDecoder
            // Check access token
            const check_access_token = HELPERS.isAccessTokenValid(access_token)
            console.log(check_access_token, '-----1-----');
            
            if (!check_access_token) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                    message: 'Unauthorized'
                })
            }
            
            // User permisstion
            if ( auth_admin_decode.role == CONTANTS.ROLE.CUSTOMSER) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                    status: CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED,
                    message: 'account_no_permission'
                })
            }
            req.auth_user = auth_admin_decode
            next();
        } catch (error) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE).json({
                status: CONTANTS.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
                message: (error as Error).message
            })
        }
    }
}

export default new AdminMiddleware