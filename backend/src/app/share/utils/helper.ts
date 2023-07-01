import { Sonyflake } from "sonyflake";

//* TOKEN
import TOKENS from "./tokens";

export default {

    /**
     * @author Nguyễn Quốc Hào
     * @param email 
     * @returns Boolean
     */
    regExpEmail (email: string) :boolean {
        const regex = /^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/;
        return regex.test(email)
    },

    /**
     * @author Nguyễn Quốc Hào
     * @returns String
     */
    createID () :string {
        const sonyflake = new Sonyflake({
            machineId: 2, //in range 2^16,
            epoch: Date.UTC(2023, 1, 1, 0, 0, 0)//timestamp
        });
        const id = sonyflake.nextId();
        return id
    },

    isAccessTokenValid(token: string) :boolean {
        try {
            const decode: any = TOKENS.verifyAccessToken(token);

            const currentTime = Math.floor(Date.now() / 1000);
            if (decode.exp <= currentTime) {
                return false
            }
            return true
        } catch (error) {
            return false
        }
    },

    validateBigInt(id: string ) {
        try {
            if (!id) {
                return false
            }
    
            const id_big_int = BigInt(id);
    
            if (id_big_int.toString() !== id) {
                return false
            }
    
            return false
        } catch (error) {
            return false
        }
    },

    parseData(string_data: string) :Object | null {
        if (!string_data) {
            return null
        }
        return JSON.parse(JSON.stringify(string_data))
    } 
}