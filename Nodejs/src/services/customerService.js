import { defaults } from "lodash";
import db from "../models/index";
require('dotenv').config();
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (staffId, token) => {
    let resutl = `${process.env.URL_REACT}/verify-booking?token=${token}&staffId=${staffId}`
    return resutl;
}

let saveBookAppointment = (data) => {
    return new Promise(async(resolve, reject) => {
        // try {
        //     if(!data.email || !data.staffId || !data.timeType || !data.date) {
        //         resolve({
        //             errCode: 1,
        //             errMessage: 'Missing paramater'
        //         })
        //     }else{
        //         await db.User.findOrCreate({
        //             where: { email: data.email },
        //             defaults: {
        //               email: data.email,
        //               roleId: 'R3'
        //             },
        //           });
        //           console.log('check user', user[0])
        //           //create a booking record
        //           if(user && user[0]) {
        //             await db.Booking.create({
        //                 statusId:'S1',
        //                 staffId: data.staffId,
        //                 customerId: user[0].id,
        //                 date: data.date,
        //                 timeType: data.timeType
        //             })
        //           }

        //           resolve({
        //             errCode: 0,
        //             errMessage: 'Save succeed'
        //           })
        //     }

            
        // } catch (e) {
        //     reject(e);
        // }
        try {
            if(!data.email || !data.staffId || !data.timeType || !data.date || !data.fullName
                || !data.selectedGender || !data.address
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

                await emailService.sendSimpleEmail({
                    reciverEmail: data.email,
                    customerName: data.fullName,
                    time: data.timeString,
                    staffName: data.staffName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.staffId, token)
                })



                // Create or find user
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName
                    },
                });
        
        
                // Create booking record if user is found
                // if(user && user[0]) {
                //     await db.Booking.create({
                //         statusId: 'S1',
                //         staffId: data.staffId,
                //         customerId: user[0].id,
                //         date: data.date,
                //         timeType: data.timeType,
                //         token: token
                //     });
                // }
                if(user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { customerId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            staffId: data.staffId,
                            customerId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                            token: token
                        },
                    })
                }
        
                resolve({
                    errCode: 0,
                    errMessage: 'Save succeed'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let postVerifyAppointment=(data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!data.token || !data.staffId ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else {
                let appointment = await db.Booking.findOne({
                    where: {
                        staffId: data.staffId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })

                if(appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save();
                    
                    resolve({
                        errCode: 0,
                        ErrMessage: 'Update appointment succeed'
                    })
                }else {
                    resolve({
                        errCode: 2,
                        ErrMessage: 'Appointment has been actived or does not exist'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    saveBookAppointment: saveBookAppointment,
    postVerifyAppointment: postVerifyAppointment
}