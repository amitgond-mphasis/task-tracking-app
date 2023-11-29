const mongoose = require('mongoose');
const User = require("../models/userModel");//importing file
const jwt=require('jsonwebtoken')//importing file
const bcrypt=require('bcrypt');//importing file
const { notify } = require('../routes/user');//importing file


exports.loginUser = async (req, res, next) => {
  const { email,  password} = req.body;
  console.log(email,password);
  if(!email  || !password ){

    return res.status(400).send("Please fill in all the required fields!")
  }
try {
  const found_user = await User.findOne({email:email});
  // console.log("rerturn obj",found_comp);
  let all_users=User.find({})
  if(found_user){
   
    if (found_user && (await bcrypt.compare(password, found_user.password))) {
      const jwttoken = jwt.sign(
        {
          user: {
            email: found_user.email,
            _id: found_user._id,
          },
        },
        process.env.jwtsecret,
        { expiresIn: "10m" }
      );
      console.log("usssss.",found_user.username)
      if(found_user.role=="admin"){

        
        // console.log("all auser.........",all_users)
        res.status(200).json({ token:jwttoken ,role:found_user.role,username:found_user.username,email:found_user.email});
        // res.status(200).json({ token:jwttoken ,role:found_user.role,username:found_user.username,email:found_user.email,users:all_users});
      }else{
      res.status(200).json({ token:jwttoken,username:found_user.username ,email:found_user.email});
    }
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
    
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};

  


exports.registerUser = async (req, res, next) => {
  const { username,email,  password} = req.body;
  console.log(username,email,password);
  if(!username||!email  || !password ){

    return res.status(400).send("Please fill in all the required fields!")
  }
try {
  const found_user = await User.findOne({email:email});
  // console.log("rerturn obj",found_comp);
  if(found_user){
    return res.status(400).json({"msg":"user allready exists"});
  }
  const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed password: ", hashedPassword);
        const user = await User.create({
           username: username,
            email: email,
            password: hashedPassword,
            notification:0
        });
        return res.status(201).json(user)  ;

 } catch (error) {
    return res.status(500).send(error.message);
  }
};

/////////////////////////////////////////

exports.addTaskList = async (req, res, next) => {
  const { taskName,taskDesc,taskAssigned} = req.body;
  console.log(taskName,taskDesc,taskAssigned);
  if(!taskName  || !taskDesc ||!taskAssigned){

    return res.status(400).send("Please fill in all the required fields!")
  }
try {

  const found_user = await User.findOne({username:taskAssigned});
  console.log("rerturn obj",found_user);

  if(found_user){
    let temp={taskName:taskName,
    discription:taskDesc,
    assignedEmployee:taskAssigned,
    status:"pending"}
   found_user.taskList.push(temp)
    await User.updateOne({username:taskAssigned},found_user)
    return res.status(200).json(found_user)
    
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};

///////////////


exports.getUserTasks = async (req, res, next) => {
  const { email} = req.body;
  // console.log("hfdfh ...........",email);
  // if(!email ){

  //   return res.status(400).send("Please fill in all the required fields!")
  // }
try {
  const found_user = await User.findOne({email:email});
  // console.log("rerturn obj",found_comp);
  if(found_user){
    // console.log("errrrr..............",found_user)
    return res.status(200).json(found_user)
   
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};

//////////////////////

exports.updateTaskStatus = async (req, res, next) => {
  const { email,status} = req.body;
  console.log("key....................",req.params.statusId);
  if(!email  || !status){

    return res.status(400).send("Please fill in all the required fields!")
  }
try {

  const found_user = await User.findOne({email:email});
  console.log("rerturn obj.........//////////",found_user);

  if(found_user){
    
  let temp={taskName:found_user.taskList[Number(req.params.statusId)].taskName,
    discription:found_user.taskList[Number(req.params.statusId)].discription,
    assignedEmployee:found_user.taskList[Number(req.params.statusId)].assignedEmployee,
    status:status}
   found_user.taskList.splice(Number(req.params.statusId),1,temp)
   console.log("find.......///////",found_user.taskList[Number(req.params.statusId)],status,Number(req.params.statusId))
    await User.updateOne({email:email},found_user)
    return res.status(200).json({found_user})
    
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};


/////////////////////////////

// getAllUsers

exports.getAllUsers = async (req, res, next) => {


try {
  const found_user = await User.find({});

  // console.log("rerturn obj",found_comp);
  // let all_users=User.find({})
  if(found_user){
   return res.status(200).json({found_user});
   
    
  }else{
    return res.status(404).send("No users");
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};

/////////////////////////////////////////////////////////////

exports.updateTaskDetails = async (req, res, next) => {
  const { taskName,discription,assignedEmployee} = req.body;
  // console.log("key....................",req.params.statusId);

  let taskDe=req.params.taskDetails;
  // console.log("task de ...................",taskDe)
  let taskDArr=taskDe.split('')
  console.log("taskdrr ...................",taskDArr)
  let email=taskDArr.slice(0,taskDArr.length-1)
  console.log("email ...................",email)
  let emailStr=email.join('')
  console.log("emailStr ...................",emailStr)
  let taskId=Number(taskDArr[taskDArr.length-1])
  console.log("taskId ...................",taskId)
  
try {

  const found_user = await User.findOne({email:emailStr});
  console.log("rerturn obj.........//////////",found_user);

  if(found_user){
    
  let temp={taskName:taskName,
    discription:discription,
    assignedEmployee:found_user.taskList[taskId].assignedEmployee,
    status:found_user.taskList[taskId].status}
   found_user.taskList.splice(taskId,1,temp)
  //  console.log("find.......///////",found_user.taskList[Number(req.params.statusId)],status,Number(req.params.statusId))
    await User.updateOne({email:emailStr},found_user)
    return res.status(200).json({found_user})
    
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};



exports.deleteTaskDetails = async (req, res, next) => {
  
  const { taskName,discription,assignedEmployee} = req.body;
  // console.log("key....................",req.params.statusId);

  let taskDe=req.params.taskDetails;
  // console.log("task de ...................",taskDe)
  let taskDArr=taskDe.split('')
  console.log("taskdrr ...................",taskDArr)
  let email=taskDArr.slice(0,taskDArr.length-1)
  console.log("email ...................",email)
  let emailStr=email.join('')
  console.log("emailStr ...................",emailStr)
  let taskId=Number(taskDArr[taskDArr.length-1])
  console.log("taskId ...................",taskId)
  
try {

  const found_user = await User.findOne({email:emailStr});
  console.log("rerturn obj.........//////////",found_user);
  

  if(found_user){
    // let temp={taskName:found_user.taskList[req.params.statusId],
    // discription:taskDesc,
    // assignedEmployee:taskAssigned,
    // status:"pending"}
    // let updatedData={...found_user}
  //  found_user.taskList[req.params.statusId].status=status
  // let temp={taskName:taskName,
  //   discription:discription,
  //   assignedEmployee:found_user.taskList[taskId].assignedEmployee,
  //   status:found_user.taskList[taskId].status}
   found_user.taskList.splice(taskId,1)
  //  console.log("find.......///////",found_user.taskList[Number(req.params.statusId)],status,Number(req.params.statusId))
    await User.updateOne({email:emailStr},found_user)
    return res.status(200).json({found_user})
    
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};
///////////----------------------------------

// updateNotification

exports.updateNotification = async (req, res, next) => {
  const { username,notification} = req.body;
  console.log("usrname....................",username);
  
try {

  const found_user = await User.findOne({username:username});
  console.log("rerturn obj.........//////////",found_user);

  if(found_user){
    
 
    await User.updateOne({username:username },{ $set: { notification: notification } })
    return res.status(200).json({found_user})
    
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};

////////////////////////////notification zero//////////////////
exports.updateNotificationZero = async (req, res, next) => {
  const { email,notification} = req.body;
  console.log("usrname....................",email);
  
try {

  const found_user = await User.findOne({email:email});
  // console.log("rerturn obj.........//////////",found_user);

  if(found_user){
    
  // let temp={notification:found_user.notification}
  // let x=1;
  //  found_user.taskList.splice(Number(req.params.statusId),1,temp)
  //  console.log("find.......///////",found_user.taskList[Number(req.params.statusId)],status,Number(req.params.statusId))
    await User.updateOne({email:email},{ $set: { notification: notification } })
    return res.status(200).json({found_user})
    
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};




////////////=============================getting notification status===================

exports.getNotificationStatus = async (req, res, next) => {
  const email = req.params.emailId;
  console.log(email);
  // if(!email  || !password ){

  //   return res.status(400).send("Please fill in all the required fields!")
  // }
try {
  const found_user = await User.find({email:email});

  console.log("rerturn obj",found_user);
  // let all_users=User.find({})
  if(found_user){
   return res.status(200).json({found_user});
   
    
  }else{
    return res.status(404).send("No users");
  }


 } catch (error) {
    return res.status(500).send(error.message);
  }
};