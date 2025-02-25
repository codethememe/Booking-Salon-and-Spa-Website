import db from "../models/index";

let createFacility = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            
            if(!data.name || !data.address || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else {
                await db.Businessaddress.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Oke'
                })

            }
        } catch (e) {
            reject(e)
        }
    })
}

let getAllFacility = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Businessaddress.findAll();
            if(data && data.length > 0) {
                data.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Oke',
                data
            })
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailFacilityById = (inputId) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else {
                
                
                let data = await db.Businessaddress.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown']
                })
                if(data) {
                    let staffFacility = [];
                    
                        staffFacility = await db.Staff_Infor.findAll({
                            where: {addressId: inputId},
                            attributes: ['staffId', 'provinceId']
                        })
                    
                    
                    data.staffFacility = staffFacility;

                }else data = {};
    
                resolve({
                    errCode: 0,
                    errMessage: 'Oke',
                    data
                })
                
                
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createFacility: createFacility,
    getAllFacility: getAllFacility,
    getDetailFacilityById: getDetailFacilityById
}