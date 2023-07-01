import { Request, Response } from "express"

import HELPER from '../share/utils/helper'
import PASSWORD from '../share/utils/password'

import CONTANTS from '../share/config/contants'
import CONFIG from "../share/config/config"

import UserService from "../share/services/User.service"

// import GENERAL_KEY from '../share/utils/general_key'
import TOKENS from "../share/utils/tokens"

//* Handle error
import HANDLERERROR from "../share/middleware/hander.error"
import handerError from "../share/middleware/hander.error"

//* ErrorCore
import { ErrorBadrequest, ErrorServer, ErrorUnauthorized } from "../core/error.response"

interface User  {
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

class UserCotroller {

    async getAllAdmin(req: Request, res: Response) {
        try {
            const data = await UserService.getAllUser({
                admin: CONTANTS.ROLE.ADMIN
            });
            
            return res.status(200).json({
                data: data
            })
            
        } catch (error) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVER_ERROR).json({
                message: error
            })
        }
    }
    async registerAdmin(req: Request, res: Response) {
        // Check input empty
        const isInputEmpty = !req.body.input || !req.body.input.user_form_input;
        if(isInputEmpty) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: 'input_is_empty'
            })
        }
        const { email, username, fullname, password, birthday, gender, phone} = req.body.input.user_form_input;

        if (!email || !password || !username) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: 'email_or_password_is_empty'
            })
        }

        const check_valid_email = HELPER.regExpEmail(email);

        if (!check_valid_email) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                message: 'email_in_valid'
            })
        }
        
        const password_hash = PASSWORD.encodePassword(password);  
        
        const user: User = {
            id: HELPER.createID(),
            email: email,
            username: username,
            password: password_hash,
            hoten: fullname,
            ngaysinh: new Date(birthday),
            gender: gender,
            dienthoai: phone,
            admin: CONTANTS.ROLE.ADMIN,
        }
        try {

            // Get Data before create user in database
            const find_user = await UserService.getUser({
                username: username,
                deleted_fg: 0
            }, [ 'id' ,'username'])

            // Conver user 
            const result_user = JSON.parse(JSON.stringify(find_user))

            if (result_user) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                    message: 'user_already_exists'
                })
            }
            
            // Create User
            const result = await UserService.createUser(user);
            
            const data = JSON.parse(JSON.stringify(result))
            
            return res.status(CONTANTS.HTTP_STATUS_CODES.OK).json({
                message: 'success',
                data: {
                    id: data.id
                }
            })
        } catch (error) {
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVER_ERROR).json({
                message: error
            })
        }
    }

    async registerCustomer(req: Request, res: Response) {
          // Check input empty
          const isInputEmpty = !req.body.input || !req.body.input.user_form_input;
          if(isInputEmpty) {
              return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                  message: 'input_is_empty'
              })
          }
          const { email, username, fullname, password, birthday, gender, phone} = req.body.input.user_form_input;
  
          if (!email || !password || !username) {
              return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                  message: 'email_or_password_is_empty'
              })
          }
  
          const check_valid_email = HELPER.regExpEmail(email);
  
          if (!check_valid_email) {
              return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                  message: 'email_in_valid'
              })
          }
          
          const password_hash = PASSWORD.encodePassword(password);  
          
          const user: User = {
              id: HELPER.createID(),
              email: email,
              username: username,
              password: password_hash,
              hoten: fullname,
              ngaysinh: new Date(birthday),
              gender: gender,
              dienthoai: phone,
              admin: CONTANTS.ROLE.CUSTOMSER,
          }
          try {
  
              // Get Data before create user in database
              const find_user = await UserService.getUser({
                  username: username,
                  deleted_fg: 0
              }, [ 'id' ,'username'])
  
              // Conver user 
              const result_user = JSON.parse(JSON.stringify(find_user))
  
              if (result_user) {
                  return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                      message: 'user_already_exists'
                  })
              }
              
              // Create User
              const result = await UserService.createUser(user);
              
              const data = JSON.parse(JSON.stringify(result))
              
              return res.status(CONTANTS.HTTP_STATUS_CODES.OK).json({
                  message: 'success',
                  data: {
                      id: data.id
                  }
              })
          } catch (error) {
              return res.status(CONTANTS.HTTP_STATUS_CODES.SERVER_ERROR).json({
                  message: error
              })
          }
    }

    async loginAdmin( req: Request, res: Response) {
        try {
            const {user_name , password } = req.body.input

            if (!user_name || !password) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                    message: 'user_name_or_password_is_empty'
                })
            }

            // Get Data before create user in database
            const find_user = await UserService.getUser({
                username: user_name,
                admin: CONTANTS.ROLE.ADMIN,
                deleted_fg: 0
            }, [ 'id' ,'username', 'password', 'admin'])

            // Check not found user
            if (!find_user) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                    message: 'unregistered_account'
                })
            }
            
            // Conver user from database
            const user_convert = JSON.parse(JSON.stringify(find_user));
            if (Array.isArray(user_convert) && !user_convert.length) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                    message: 'Unauthorized'
                })
            }

            // Combare password from database and password input
            const check_pass = await PASSWORD.conparePassword(password, user_convert.password)

            // Check password incorrect
            if (!check_pass) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                    message: 'password_incorrect'
                })
            }
            
            
            const access_token = TOKENS.createAccessToken(
                {
                    id: user_convert.id,
                    username: user_convert.username,
                    role: user_convert.admin
                },

                CONFIG.ACCESS_TOKEN_SECRET
            )
            
            const refresh_token = TOKENS.createRefreshToken(
                {
                    id: user_convert.id,
                    username: user_convert.username,
                    role: user_convert.admin
                },
                CONFIG.REFRESH_TOKEN_SECRET
            )
            
            res.cookie('token', refresh_token, {
                httpOnly: false,
                maxAge: CONTANTS._1_DAY_S,
                secure: false,
                sameSite: false
            })

            const result = await UserService.updateUser(
                {
                    refresh_token: refresh_token
                },
                {
                    id: user_convert.id,
                    deleted_fg: CONTANTS.DELETED_DISABLE
                }
            )
            
            if (result) {
                return res.status(CONTANTS.HTTP_STATUS_CODES.OK).json({
                    message: 'success',
                    data: {
                        access_token,
                        refresh_token,
                        role: user_convert.admin,
                        id: user_convert.id
                    }
                })
            }
 
        } catch (error) {
            console.debug('Error login user admin:::', error);
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVER_ERROR).json({
                message: HANDLERERROR.errorParse(error)
            })
        }
    }

    /**
     * @update_code Nguyễn Quốc Hào
     * @param req 
     * @param res 
     * @returns Object 
     * @description Login Admin
     */
    async logoutAdmin(req: Request, res: Response) {
        const token = req.cookies.token;
        try {
            res.clearCookie('token');
            
            await UserService.updateUser({
                refresh_token: null
            },
            {   
                refresh_token: token
            })

            return res.status(CONTANTS.HTTP_STATUS_CODES.OK).json({
                status: CONTANTS.HTTP_STATUS_CODES.OK,
                message: 'logout_success'
            })
            
        } catch (error) {
            console.debug('Error logout user admin:::', error);
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVER_ERROR).json({
                message: handerError.errorParse(error)
            })
        }
    }

    /**
     * @update_code Nguyễn Quốc Hào
     * @param req 
     * @param res 
     * @returns Object 
     * @description Renew Token
     */
    async renewToken(req: Request, res: Response) {
        
        const refresh_token = req.cookies.token;

        try {
            if (refresh_token) {
                const user = await UserService.getUser({
                    refresh_token: refresh_token,
                    deleted_fg: CONTANTS.DELETED_DISABLE
                }, ['id', 'username', 'admin'])

                if (!user) {
                    return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                        message: 'user_not_found',
                    })
                }

                const user_converted = JSON.parse(JSON.stringify(user))

                const access_token = TOKENS.createAccessToken(user_converted, CONFIG.ACCESS_TOKEN_SECRET)

                return res.status(CONTANTS.HTTP_STATUS_CODES.OK).json({
                    message: 'success',
                    data: {
                        access_token: access_token,
                        id: user_converted.id,
                        username: user_converted.username,
                        role: user_converted.admin
                    }
                })

            } else {
                return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({
                    message: 'please_login'
                })
            }
        } catch (error) {
            console.debug('Error refreshing token:::::::: ', error)
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVER_ERROR).json({
                message: HANDLERERROR.errorParse(error)
            })
       }
    }

        /**
     * @update_code Nguyễn Quốc Hào
     * @param req 
     * @param res 
     * @returns Object 
     * @description Get Profile
     */
    async getProfile (req: Request, res: Response) {
        // Check admin id
        const admin_id = req.auth_user?.id;

        if (!admin_id) {
            const { message, status } = new ErrorUnauthorized();
            return res.status(CONTANTS.HTTP_STATUS_CODES.UNAUTHORIZED).json({ message, status});
        }

        try {
            const admin = await UserService.getProfile(admin_id)
            const data_parse = HELPER.parseData(admin)

            if (!data_parse || Object.keys(data_parse).length === 0) {
                const {message, status} = new ErrorBadrequest({
                    message: 'admin_not_found',
                });
                return res.status(CONTANTS.HTTP_STATUS_CODES.BAD_REQUEST).json({
                    message,
                    status
                })
            }
            
            return res.status(CONTANTS.HTTP_STATUS_CODES.OK).json({
                message: 'success',
                status: CONTANTS.HTTP_STATUS_CODES.OK,
                metaData: {
                    ...data_parse
                }
            })
        } catch (err) {
            const { message, status } = new ErrorServer({
                message: (err as Error).message ,
            })
            return res.status(CONTANTS.HTTP_STATUS_CODES.SERVER_ERROR).json({
                message,
                status
            })
        }
        
    }
}

export default new UserCotroller();