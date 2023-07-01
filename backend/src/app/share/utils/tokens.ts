import JWT ,{ Secret, VerifyCallback, JwtPayload } from 'jsonwebtoken';

//* CONSTANTS
import CONSTANTS from '../config/contants';

//* CONFIG
import CONFIG from '../config/config'; 

//* TYPES
import { TokenDecoder } from '../../types/config_type'
export default {
    createAccessToken: (character_access: Object, primaty_key: Secret) => {
        return JWT.sign(character_access, primaty_key, {
            expiresIn: '1h' ,
            algorithm: 'HS256',
        })
    },
    createRefreshToken: (character_refresh: Object, primaty_key: Secret) => {
        return JWT.sign(character_refresh, primaty_key, {
            expiresIn: CONSTANTS._1_DAY_S,
            algorithm: 'HS256'
        })
    },
    verifyAccessToken: (token: string) =>  {
        return new Promise((resolve, reject) => {
            JWT.verify(token, CONFIG.ACCESS_TOKEN_SECRET, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data as TokenDecoder)
            });
        }) as Promise<TokenDecoder>
    }
}