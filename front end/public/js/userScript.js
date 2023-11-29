window.onload = function(){
    setInterval(fetchNotification,5000); 
    const jwtToken = localStorage.getItem("token");
 
    // console.log("token",jwtToken);
 
  if (!jwtToken) {
   window.location.href = "../index.html";
   return;
   
  }

    fetchUsers();
    var userPlus = document.getElementById("addTask");
    var addModal = document.getElementById("modaladdTask");
    
    userPlus.addEventListener("click", () => {
        addModal.classList.add("show");
        addModal.style.display = "block";
    })
    
    window.addEventListener("click", (event)=> {
        if (event.target == addModal) {
          addModal.style.display = "none";
        }
    });
    
};
let updateUserId;
function editUser(userId){
    // var userPlus = document.getElementById("addTask");
    var addModal = document.getElementById("modalUpdateUser");
    addModal.classList.add("show");
    addModal.style.display = "block";
    
    
    updateUserId=userId;
}

function deleteUser(){
    var modal = document.getElementById("deleteModal");
    modal.classList.add("show");
    modal.style.display = "block";
    var cancelDelete=document.querySelectorAll(".deleteCancel");
    cancelDelete.forEach((btn)=>{
        btn.addEventListener("click", ()=>{
            modal.style.display = "none";
        });
    });
    
    var confirmDelete = document.querySelector(".confirmDelete");
    confirmDelete.addEventListener("click", ()=>{
        modal.style.display = "none";
    });
}
//-----------------------fetch user data--------------------------------------
function fetchUsers(){
    let temp={email:localStorage.getItem("email")};
    // console.log("value...",temp)
    var xhttp=new XMLHttpRequest();
    

    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            loadEmp(JSON.parse(this.responseText));  //getting the responce of emp data
        // console.log(JSON.parse(this.responseText))
        
        }
    }
    xhttp.open("POST","http://localhost:5000/api/v1/userTasks","true");
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify(temp))
    // xhttp.send();
}
function openBox(){
    let box=`<label for="fname">comments:</label>
    <input type="text" id="fname" name="fname">`
    document.getElementById('table').innerHTML=box;
}
//-----------------------------display all user------------------------------------
function loadEmp(empData){
    let empHead=` <tr id="tableHeadings">
    <th class="taskName">Task Name</th>
    <th class="taskDisc">Task Description</th>
    <th class="taskAssigned">Assigned User</th>
    <th class="status">Status</th>
    <th class="functions">User Action</th>
</tr>`;
let temp=empData.taskList
    let mainContainer='';
    for(let i=0;i<temp.length;i++){
        let empTable=` <tr class="user" id="${i}">
    <td class="taskName">${temp[i].taskName}</td>
    <td class="taskDisc">${temp[i].discription}</td>
    <td class="taskAssigned">${temp[i].assignedEmployee}</td>
    <th class="status">${temp[i].status}</th>
    <td class="functions">
        <button class="edit" onclick="editUser(${i});" type="button" id="1"><i class="fa-solid fa-pen-clip"></i>Status<button class="primary" onclick="openBox()" type="button" id="1">comment</button>
    </td>
    </tr>`;
        mainContainer+=empTable;
    }
    mainContainer=empHead+mainContainer;
    document.getElementById('table').innerHTML=mainContainer;

}


//---------------add user--------------------------------------------

// function addTask(){
//     let empName=document.getElementById('inputTaskName').value;
//     let empAge=document.getElementById('inputTaskDesc').value;
//     let empState=document.getElementById('inputTaskAssigned').value;
//     if(!empAge ||!empName || !empState){
//         alert("Enter all details!");
//     }
//     let newEmp={"userName":empName,
//                 "age":empAge,
//                 "state":empState};
//     var xhttp=new XMLHttpRequest();
   
//     xhttp.open("POST","https://65043a76c8869921ae24ba04.mockapi.io/api/v1/empData","true");
//     xhttp.setRequestHeader("Content-type","application/json");
//     xhttp.send(JSON.stringify(newEmp));

//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4)
//             if( this.status==201){
//             fetchUsers();
//         }
//     };
//     document.getElementById('modaladdTask').style.display='none';
//     document.getElementById('inputTaskName').value='';
//     document.getElementById('inputTaskDesc').value='';
//     document.getElementById('inputTaskAssigned').selected.index='0';
    
// }

//-------------------------removing-------------------------------------

// function deleteUser(userId){
//     let xhttp= new XMLHttpRequest();
   
//     xhttp.open('DELETE',`https://65043a76c8869921ae24ba04.mockapi.io/api/v1/empData/${userId}`,true);
//     xhttp.setRequestHeader("Content-type","application/json");
//     xhttp.send();
//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4){
//             if(this.status==200){
//                 fetchUsers();
//             }
//         }

//     };
    
// }

//-----------------updateUser-------------------------
function updateTask(){
    // let empName=document.getElementById('inputTaskName').value;
    // let empAge=document.getElementById('inputtaskDesc').value;
    let taskStatus=document.getElementById('inputUpdateStatus').value;
    let newStatus={
    "status":taskStatus,
"email":localStorage.getItem("email")};
    // for(let i=0;)
    document.getElementById('modalUpdateUser').style.display='none';
    var xhttp=new XMLHttpRequest();
    xhttp.open("POST",`http://localhost:5000/api/v1/userStatus/${updateUserId}`,true)
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify(newStatus));
    xhttp.onreadystatechange=function(){
        if(this.readyState==4){
            if(this.status==200){
            
               fetchUsers();
            // console.log("dfdf.............",this.responseText)
            }
        }
    };
}

//-----------------

// window.onload =function(){

//     const jwtToken = localStorage.getItem("token");
 
//     // console.log("token",jwtToken);
 
//   if (!jwtToken) {
//    window.location.href = "../index.html";
//    return;
   
//   }

// }

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.href = "../index.html";
}





//updating the notification value
function updatenotification(x){
    console.log("333333333",x)
    
    var xhttp=new XMLHttpRequest();
    // console.log("333333333",x)
    xhttp.open("POST","http://localhost:5000/api/v1/notificationUpdate","true");
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify({email:x,notification:'0'}));

    xhttp.onreadystatechange=function(){
        if(this.readyState==4)
            if( this.status==200){
            // fetchUsers();
            // console.log(this.responseText)
        }
    };
}

///================fetch notification status==================///

function fetchNotification(){
    let temp=localStorage.getItem("email");
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            let details=JSON.parse(this.responseText); 
            console.log("data...............",details) //getting the responce of emp data
            console.log("data...............",details.found_user[0].notification)
            if(details.found_user[0].notification=='1'){
                alert('you have assinged new task')
                updatenotification(temp)
                
            }else{

            }
        }
    }
    xhttp.open("GET",`http://localhost:5000/api/v1/notificationStatus/${temp}`,"true");
    xhttp.send();
}



///////////////////////////show users on user dashboard//////////////////////

function showOtherUsers(){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            loadOtherUsers(JSON.parse(this.responseText)); 
            // console.log("data...............",JSON.parse(this.responseText)) //getting the responce of emp data
        }
    }
    xhttp.open("GET","http://localhost:5000/api/v1/users","true");
    xhttp.send();
}

//-----------------------------display all user------------------------------------
function loadOtherUsers(empData){
    // console.log("rsults................",empData.found_user)
    let empHead=`<tr id="tableHeadings">
    <th class="taskName">Task Name</th>
    <th class="taskDisc">Description</th>
    <th class="taskAssigned">Assigned Employee</th>
    <th class="status">Status</th>
    
</tr>`;
// console.log("length......",empData.found_user.length)
    let mainContainer='';
    for(let i=1;i<empData.found_user.length;i++){
        // console.log("user$$$$$$$$$$$$$$.............",empData.found_user[i])
        for(let j=0;j<empData.found_user[i].taskList.length;j++){
            // console.log("user.............",empData.found_user[i],i,j)
        let empTable=` <tr class="user" id="${empData.found_user[i].taskList[j]._id}">
    <td class="taskName">${empData.found_user[i].taskList[j].taskName}</td>
    <td class="taskDisc">${empData.found_user[i].taskList[j].discription}</td>
    <td class="taskAssigned">${empData.found_user[i].taskList[j].assignedEmployee}</td>
    <th class="status">${empData.found_user[i].taskList[j].status}</th>
    
    </tr>`;
        mainContainer+=empTable;
    }

}
    mainContainer=empHead+mainContainer;
    document.getElementById('table').innerHTML=mainContainer;
event.preventDefault();
}


//////////show mytask//////////////////////


// function showMyTask(){
//     let updateUserId;
// function editUser(userId){
//     // var userPlus = document.getElementById("addTask");
//     var addModal = document.getElementById("modalUpdateUser");
//     addModal.classList.add("show");
//     addModal.style.display = "block";
    
    
//     updateUserId=userId;
// }

// function deleteUser(){
//     var modal = document.getElementById("deleteModal");
//     modal.classList.add("show");
//     modal.style.display = "block";
//     var cancelDelete=document.querySelectorAll(".deleteCancel");
//     cancelDelete.forEach((btn)=>{
//         btn.addEventListener("click", ()=>{
//             modal.style.display = "none";
//         });
//     });
    
//     var confirmDelete = document.querySelector(".confirmDelete");
//     confirmDelete.addEventListener("click", ()=>{
//         modal.style.display = "none";
//     });
// }
// //-----------------------fetch user data--------------------------------------
// function fetchUsers(){
//     let temp={email:localStorage.getItem("email")};
//     // console.log("value...",temp)
//     var xhttp=new XMLHttpRequest();
    

//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4&&this.status==200){
//             loadEmp(JSON.parse(this.responseText));  //getting the responce of emp data
//         // console.log(JSON.parse(this.responseText))
        
//         }
//     }
//     xhttp.open("POST","http://localhost:5000/api/v1/userTasks","true");
//     xhttp.setRequestHeader("Content-type","application/json");
//     xhttp.send(JSON.stringify(temp))
//     // xhttp.send();
// }
// function openBox(){
//     let box=`<label for="fname">comments:</label>
//     <input type="text" id="fname" name="fname">`
//     document.getElementById('table').innerHTML=box;
// }
// //-----------------------------display all user------------------------------------
// function loadEmp(empData){
//     let empHead=` <tr id="tableHeadings">
//     <th class="taskName">Task Name</th>
//     <th class="taskDisc">Task Description</th>
//     <th class="taskAssigned">Assigned User</th>
//     <th class="status">Status</th>
//     <th class="functions">User Action</th>
// </tr>`;
// let temp=empData.taskList
//     let mainContainer='';
//     for(let i=0;i<temp.length;i++){
//         let empTable=` <tr class="user" id="${i}">
//     <td class="taskName">${temp[i].taskName}</td>
//     <td class="taskDisc">${temp[i].discription}</td>
//     <td class="taskAssigned">${temp[i].assignedEmployee}</td>
//     <th class="status">${temp[i].status}</th>
//     <td class="functions">
//         <button class="edit" onclick="editUser(${i});" type="button" id="1"><i class="fa-solid fa-pen-clip"></i>Status<button class="primary" onclick="openBox()" type="button" id="1">comment</button>
//     </td>
//     </tr>`;
//         mainContainer+=empTable;
//     }
//     mainContainer=empHead+mainContainer;
//     document.getElementById('table').innerHTML=mainContainer;

// }


// //---------------add user--------------------------------------------

// // function addTask(){
// //     let empName=document.getElementById('inputTaskName').value;
// //     let empAge=document.getElementById('inputTaskDesc').value;
// //     let empState=document.getElementById('inputTaskAssigned').value;
// //     if(!empAge ||!empName || !empState){
// //         alert("Enter all details!");
// //     }
// //     let newEmp={"userName":empName,
// //                 "age":empAge,
// //                 "state":empState};
// //     var xhttp=new XMLHttpRequest();
   
// //     xhttp.open("POST","https://65043a76c8869921ae24ba04.mockapi.io/api/v1/empData","true");
// //     xhttp.setRequestHeader("Content-type","application/json");
// //     xhttp.send(JSON.stringify(newEmp));

// //     xhttp.onreadystatechange=function(){
// //         if(this.readyState==4)
// //             if( this.status==201){
// //             fetchUsers();
// //         }
// //     };
// //     document.getElementById('modaladdTask').style.display='none';
// //     document.getElementById('inputTaskName').value='';
// //     document.getElementById('inputTaskDesc').value='';
// //     document.getElementById('inputTaskAssigned').selected.index='0';
    
// // }

// //-------------------------removing-------------------------------------

// // function deleteUser(userId){
// //     let xhttp= new XMLHttpRequest();
   
// //     xhttp.open('DELETE',`https://65043a76c8869921ae24ba04.mockapi.io/api/v1/empData/${userId}`,true);
// //     xhttp.setRequestHeader("Content-type","application/json");
// //     xhttp.send();
// //     xhttp.onreadystatechange=function(){
// //         if(this.readyState==4){
// //             if(this.status==200){
// //                 fetchUsers();
// //             }
// //         }

// //     };
    
// // }

// //-----------------updateUser-------------------------
// function updateTask(){
//     // let empName=document.getElementById('inputTaskName').value;
//     // let empAge=document.getElementById('inputtaskDesc').value;
//     let taskStatus=document.getElementById('inputUpdateStatus').value;
//     let newStatus={
//     "status":taskStatus,
// "email":localStorage.getItem("email")};
//     // for(let i=0;)
//     document.getElementById('modalUpdateUser').style.display='none';
//     var xhttp=new XMLHttpRequest();
//     xhttp.open("POST",`http://localhost:5000/api/v1/userStatus/${updateUserId}`,true)
//     xhttp.setRequestHeader("Content-type","application/json");
//     xhttp.send(JSON.stringify(newStatus));
//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4){
//             if(this.status==200){
            
//                fetchUsers();
//             // console.log("dfdf.............",this.responseText)
//             }
//         }
//     };
// }

// //-----------------

// // window.onload =function(){

// //     const jwtToken = localStorage.getItem("token");
 
// //     // console.log("token",jwtToken);
 
// //   if (!jwtToken) {
// //    window.location.href = "../index.html";
// //    return;
   
// //   }

// // }

// function logout(){
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     window.location.href = "../index.html";
// }





// //updating the notification value
// function updatenotification(x){
//     console.log("333333333",x)
    
//     var xhttp=new XMLHttpRequest();
//     // console.log("333333333",x)
//     xhttp.open("POST","http://localhost:5000/api/v1/notificationUpdate","true");
//     xhttp.setRequestHeader("Content-type","application/json");
//     xhttp.send(JSON.stringify({email:x,notification:'0'}));

//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4)
//             if( this.status==200){
//             // fetchUsers();
//             // console.log(this.responseText)
//         }
//     };
// }

// ///================fetch notification status==================///

// function fetchNotification(){
//     let temp=localStorage.getItem("email");
//     var xhttp=new XMLHttpRequest();
//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4&&this.status==200){
//             let details=JSON.parse(this.responseText); 
//             console.log("data...............",details) //getting the responce of emp data
//             console.log("data...............",details.found_user[0].notification)
//             if(details.found_user[0].notification=='1'){
//                 alert('you have assinged new task')
//                 updatenotification(temp)
                
//             }else{

//             }
//         }
//     }
//     xhttp.open("GET",`http://localhost:5000/api/v1/notificationStatus/${temp}`,"true");
//     xhttp.send();
// }

// }