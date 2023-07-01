import {DataTypes, FindAttributeOptions } from "sequelize";
import db from "../database/connect_db";



const withHash: {attributes?: FindAttributeOptions } = {}

const User = db.sequelize.define('users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    hoten: {
        type: DataTypes.STRING,
        defaultValue: 'Giá trị mặc định'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    username: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ngaysinh: {
        type: DataTypes.DATE
    }, 
    gender: {
        type: DataTypes.NUMBER
    },
    dienthoai: {
        type: DataTypes.STRING,
    },
    admin: {
        type: DataTypes.NUMBER
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    },
    refresh_token: {
        type: DataTypes.STRING
    }
},{
    defaultScope: {
        // exclude password hash by default
        attributes: { exclude: ['password'] }
    },
    scopes:  {
        // include hash with this scope
        withHash
    }
})

export default User;