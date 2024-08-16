
import db from "../models/index"
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hasUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
        
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if(isExist) {
                //user already exist
                let user = await db.User.findOne({
                    attributes : ['id', 'email', 'roleId','password', 'firstName', 'lastName'],
                    where : {email : email},
                    raw : true
                });
                if(user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password); // false

                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = `OKe`;

                        delete user.password;
                        userData.user = user;
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }else {
                    userData.errCode = 2;
                    userData.errMessage = `User is not exist!!!`
                }

            }else {
                //return error
                userData.errCode = 1;
                userData.errMessage = `Your email not exist, pls try other email`
            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where : {email : userEmail}
            })
            if(user) {
                resolve(true)
            }else{
                resolve(false)
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser =(userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = '';
            if(userId ==='ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude : ['password']
                    }
                })
            }
            if(userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where : {id: userId},
                    attributes: {
                        exclude : ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let check = await checkUserEmail(data.email);
            if(check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already used, Please try another email'
                })
            } else {
                let hashPasswordFromBcrypt = await hasUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode : 0,
                    errMessage: 'Oke'
                });
            }
            
        } catch (e) {
            reject(e);
        }
    })

}

let deleteUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        let user = await db.User.findOne({
            where : {id : userId}
        })
        if(!user) {
            resolve({
                errCode: 2,
                errMessage: 'The user is not exist'
            })
        }
        await db.User.destroy({
            where : {id : userId}
        })

        resolve({
            errCode: 0,
            message: "The user is deleted"
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.id || !data.roleId || !data.positionId || !data.gender) {
                resolve({
                    errCode: 2,
                    errMessage: `Missing required paremeters`
                })
            }
            let user = await db.User.findOne({
                where: {id : data.id},
                raw: false
            })
            if(user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phoneumber;
                if(data.avatar) {
                    user.image = data.avatar;
                }
                

                await user.save();

                // await db.User.save({
                //     firstName: data.firstName,
                //     lastName: data.lastName,
                //     address: data.address
                // }, {where: {id: userId} })

                resolve({
                    errCode: 0,
                    errMessage: `Update user succeeds`
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: `User is not found`
                });
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'missing required parameters'
                })
            }else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: {type : typeInput}
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }
            
        } catch (error) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin : handleUserLogin,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeService : getAllCodeService
}