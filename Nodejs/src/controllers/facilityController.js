import facilityService from "../services/facilityService"

let createFacility = async(req, res) => {
    try {
        let infor = await facilityService.createFacility(req.body);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getAllFacility =async (req, res) => {
    try {
        let infor = await facilityService.getAllFacility();
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let getDetailFacilityById =async (req, res) => {
    try {
        let infor = await facilityService.getDetailFacilityById(req.query.id);
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

module.exports = {
    createFacility: createFacility,
    getAllFacility: getAllFacility,
    getDetailFacilityById: getDetailFacilityById
}