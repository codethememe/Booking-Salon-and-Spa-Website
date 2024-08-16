import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import staffController from "../controllers/staffController";
import customerController from "../controllers/customerController";
import specialtyController from "../controllers/specialtyController";
import facilityController from "../controllers/facilityController"

let router = express.Router();

//restAPI
let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud',homeController.displayGetCRUD);
    router.get('/edit-crud',homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users',userController.handleGetAllUser);
    router.post('/api/create-new-user',userController.handleCreateNewUser);
    router.put('/api/edit-user',userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.get('/api/allcode', userController.getAllCode);

    router.get('/api/top-staff-home',staffController.getTopStaffHome);
    router.get('/api/get-all-staffs',staffController.getAllStaffs);
    router.post('/api/save-infor-staffs',staffController.postInforStaff);
    router.get('/api/get-detail-staff-by-id',staffController.getDetailStaffById);
    router.post('/api/bulk-create-schedule',staffController.bulkCreateSchedule);
    router.get('/api/get-schedule-staff-by-date',staffController.getScheduleByDate);
    router.get('/api/get-extra-infor-staff-by-id',staffController.getExtraInforStaffById);
    router.get('/api/get-profile-staff-by-id',staffController.getProfileStaffById);

    router.get('/api/get-list-customer-for-staff',staffController.getListCustomerForStaff);
    router.post('/api/send-bill',staffController.sendBill);

    router.post('/api/customer-book-appointment',customerController.postBookAppointment);
    router.post('/api/verify-book-appointment',customerController.postVerifyAppointment);

    router.post('/api/create-new-specialty',specialtyController.createSpecialty);
    router.get('/api/get-all-specialty',specialtyController.getAllSpecialty);
    router.get('/api/get-detail-specialty-by-id',specialtyController.getDetailSpecialtyById);

    router.post('/api/create-new-facility',facilityController.createFacility);
    router.get('/api/get-all-facility',facilityController.getAllFacility);
    router.get('/api/get-detail-facility-by-id',facilityController.getDetailFacilityById);



    return app.use("/", router);
}

module.exports = initWebRoutes;