import { string } from "joi";
import User from "../models/User.model";

import { WhereOptions, FindAttributeOptions , UpdateOptions} from "sequelize";

interface Data  {
    id: string,
    email: string,
    username: string,
    password: string,
    hoten: string,
    ngaysinh: Date,
    gender: number,
    dienthoai: string,
    admin: number,
}

type T = any

class UserService {
    getAllUser(field_condition: WhereOptions = {}) {
        return new Promise<Object> (async (resolve, reject) => {
            await User.findAll({
                where: field_condition
            }).then(data => resolve(data)).catch(err => reject(err))
        })
    };

    // Create admin 
    /**
     * @author Nguyễn Quốc Hào
     * @update_at 16/0/2023
     * @description Create User
     */
    createUser(data: any) {
        return new Promise( async(resolve, reject) => {
            await User.create(data,
            {
                fields: ['id', 'email', 'username', 'password', 'hoten', 'ngaysinh', 'gender', 'dienthoai', 'admin']
            }).then(data => resolve(data)).catch(err => reject(err))
        })
    }

    /**
     * @author Nguyễn quốc Hào
     * @update_at 16/06/2023
     * @description Find One user
     */
    getUser(field_query : WhereOptions, return_query: FindAttributeOptions | Array<T>) {
        return new Promise( async(resolve, reject) => {
            await User.findOne({
                where: field_query,
                attributes: return_query
            })
                .then(data => resolve(data))
                .catch(error => reject(error))
        })
    }

      /**
     * @author Nguyễn quốc Hào
     * @update_at 17/06/2023
     * @description login admin
     */
    updateUser(field_update: Object, field_condition: WhereOptions)  {
        return new Promise( async (resolve, reject) => {            
            await User.update(field_update , {
                where: field_condition,
            }).then(([number_of_rows_updated]) => {
                if (number_of_rows_updated > 0) {
                    return User.findOne({
                        where: field_condition,
                        attributes: ['id']
                    })
                }
                reject(new Error('No rows were updated.'))
            }).then((result) => {
                resolve(result)
            }).catch(err => {
                reject(err)
            })
        })
    }

    getProfile(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            User.findOne({
                where: {
                    id: id,
                },
                attributes: { exclude: ['refresh_token', 'createdAt', 'updatedAt'] },
            }).then(user => {
                resolve(user)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

export default new UserService;