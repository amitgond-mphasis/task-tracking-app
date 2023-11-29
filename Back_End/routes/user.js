const { Router } = require("express");//importing  file
const userController = require("../controllers/users");//importing file

const router = Router({ strict: true });
// creating router 
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);
router.post("/addTask", userController.addTaskList);
router.post("/userTasks", userController.getUserTasks);
router.post("/userStatus/:statusId",userController.updateTaskStatus)
router.get("/users",userController.getAllUsers)
router.put("/tasks/:taskDetails",userController.updateTaskDetails)
router.delete("/tasks/:taskDetails",userController.deleteTaskDetails)
router.post("/notification",userController.updateNotification)
router.post("/notificationUpdate",userController.updateNotificationZero)
router.get("/notificationStatus/:emailId",userController.getNotificationStatus)




module.exports = router;