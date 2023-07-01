import bcrypt from "bcrypt";

export default {
    /**
     * @author Nguyễn Quốc Hào
     * @param {string} password
     * @created_at 13/06/2023
     * @description encode password
     * @returns {string} - password hash
     */
    encodePassword: (password: string) :string => {
        const salt = bcrypt.genSaltSync();
        const hassPassword = bcrypt.hashSync(password, salt);
        return hassPassword;
    },

      /**
     * @author Nguyễn Quốc Hào
     * @param {string} password
     * @created_at 13/06/2023
     * @description compare password
     * @returns {string} - password hash
     */
    conparePassword: (password: string, password_hash: string) => bcrypt.compare(password, password_hash) 
}