import customerService from '../services/customerService';

let postBookAppointment = async (req, res) => {
    try {
        let infor = await customerService.saveBookAppointment(req.body);
        console.log('infor',infor)
        return res.status(200).json(infor)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server'
        })
    }
}

let postVerifyAppointment = async (req, res) => {
    try {
        let infor = await customerService.postVerifyAppointment(req.body);
        console.log('infor',infor)
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
    postBookAppointment: postBookAppointment,
    postVerifyAppointment: postVerifyAppointment
}