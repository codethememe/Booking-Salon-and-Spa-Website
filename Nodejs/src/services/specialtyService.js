import db from "../models/index";


let createSpecialty = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            
            if(!data.name || !data.imageBase64 || !data.descriptionHTML || !data.descriptionMarkdown ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else {
                await db.Specialty.create({
                    name: data.name,
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

let getAllSpecialty =() => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Specialty.findAll();
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
            reject(e);
        }
        
    })
}

let getDetailSpecialtyById = (inputId, location) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(!inputId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }else {
                
                
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: ['descriptionHTML', 'descriptionMarkdown']
                })
                if(data) {
                    let staffSpecialty = [];
                    if(location === 'ALL') {
                        staffSpecialty = await db.Staff_Infor.findAll({
                            where: {specialtyId: inputId},
                            attributes: ['staffId', 'provinceId']
                        })
                    }else {
                        //find by location
                        staffSpecialty = await db.Staff_Infor.findAll({
                            where: {
                                specialtyId: inputId,
                                provinceId: location
                            },
                            attributes: ['staffId', 'provinceId']
                        })
                    }
                    
                    data.staffSpecialty = staffSpecialty;

                }else data = {};
    
                resolve({
                    errCode: 0,
                    errMessage: 'Oke',
                    data
                })
                
                
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById
}