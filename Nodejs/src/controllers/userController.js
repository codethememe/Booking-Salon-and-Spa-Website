import userService from "../services/userService"

let handleLogin = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input'
        })
    }

    let userData = await userService.handleUserLogin(email, password);
    console.log(userData)
    //check email exist
    //compare password
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {},
    })
}

let handleGetAllUser = async (req, res) => {
    let id = req.query.id; //get all, id user

    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMassage: 'Missing required parameters',
            users : []
        })
    }
    let users = await userService.getAllUser(id);
    console.log(users)

    return res.status(200).json({
        errCode: 0,
        errMassage: 'OKe',
        users
    })
}

let handleCreateNewUser = async(req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleEditUser = async(req, res) => {
    let data = req.body;
    let message = await userService.updateUserData(data);
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if(!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMassage: "Missing required parameters"
        })
    }
    let message = await userService.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let getAllCode = async (req, res) => {
    try {
        let data = await userService.getAllCodeService(req.query.type);
        return res.status(200).json(data);
        
    } catch (e) {
        console.log('get alllcode error', e)
        return res.status(200).json({
            errCode: -1,
            errMassage: 'Error from server'
        })
    }
}

module.exports = {
    handleLogin : handleLogin,
    handleGetAllUser : handleGetAllUser,
    handleCreateNewUser : handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    getAllCode : getAllCode
}