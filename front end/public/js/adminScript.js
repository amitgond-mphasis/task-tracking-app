window.onload = function(){
    loadUserName()
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
    // console.log("userid..........",userId)
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
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
            loadEmp(JSON.parse(this.responseText)); 
            // console.log("data...............",JSON.parse(this.responseText)) //getting the responce of emp data
        }
    }
    xhttp.open("GET","http://localhost:5000/api/v1/users","true");
    xhttp.send();
}

//-----------------------------display all user------------------------------------
function loadEmp(empData){
    // console.log("rsults................",empData.found_user)
    let empHead=`<tr id="tableHeadings">
    <th class="taskName">Task Name</th>
    <th class="taskDisc">Description</th>
    <th class="taskAssigned">Assigned Employee</th>
    <th class="status">Status</th>
    <th class="functions">Admin Action</th>
</tr>`;
// console.log("length......",empData.found_user.length)
    let mainContainer='';
    for(let i=1;i<empData.found_user.length;i++){
        console.log("user$$$$$$$$$$$$$$.............",empData.found_user[i])
        for(let j=0;j<empData.found_user[i].taskList.length;j++){
            // console.log("user.............",empData.found_user[i],i,j)
        let empTable=` <tr class="user" id="${empData.found_user[i].taskList[j]._id}">
    <td class="taskName">${empData.found_user[i].taskList[j].taskName}</td>
    <td class="taskDisc">${empData.found_user[i].taskList[j].discription}</td>
    <td class="taskAssigned">${empData.found_user[i].taskList[j].assignedEmployee}</td>
    <th class="status">${empData.found_user[i].taskList[j].status}</th>
    <td class="functions">
        <button class="edit" onclick="editUser('${empData.found_user[i].email}${j}')" type="button" id="1"><i class="fa-solid fa-pen-clip"></i></button><button class="deleteB" onclick="deleteUser('${empData.found_user[i].email}${j}')" type="button" id="1"><i class="fa-solid fa-trash-can"></i></button>
    </td>
    </tr>`;
        mainContainer+=empTable;
    }

}
    mainContainer=empHead+mainContainer;
    document.getElementById('table').innerHTML=mainContainer;
event.preventDefault();
}
//------------------------updatenotification----------------------//
function updatenotification(x){
    console.log("333333333",x)
    
    var xhttp=new XMLHttpRequest();
    // console.log("333333333",x)
    xhttp.open("POST","http://localhost:5000/api/v1/notification","true");
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify({username:x,notification:'1'}));

    xhttp.onreadystatechange=function(){
        if(this.readyState==4)
            if( this.status==200){
            // fetchUsers();
            // console.log(this.responseText)
        }
    };
}
////adding name in list of employee
// document.getElementById("inputTaskAssigned").innerHTML=showList()
function loadUserName(){
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4&&this.status==200){
             nameL(JSON.parse(this.responseText)); 
            console.log("data....xxxxxxxxx...........",JSON.parse(this.responseText)) //getting the responce of emp data
        }
    }
    xhttp.open("GET","http://localhost:5000/api/v1/users","true");
    xhttp.send();
    
}
function nameL(details){
    let opt=`<option disabled="" selected="">Employee List</option>`
    let mainContainer='';
    for(let i=1;i<details.found_user.length;i++){
        nameValue=`<option>${details.found_user[i].username}</option>`
        mainContainer+=nameValue
    }
    document.getElementById('inputTaskAssigned').innerHTML=opt+mainContainer;
    document.getElementById('inputUpdateEmp').innerHTML=opt+mainContainer;
}

//---------------add user--------------------------------------------

function addTask(){

    

    let taskName=document.getElementById('inputTaskName').value;
    let taskDesc=document.getElementById('inputTaskDesc').value;
    let taskAssigned=document.getElementById('inputTaskAssigned').value;
    if(!taskDesc ||!taskName || !taskAssigned){
        alert("Enter all details!");
    }
    let newTask={"taskName":taskName,
                "taskDesc":taskDesc,
                "taskAssigned":taskAssigned,
                };
                // console.log("data......",newTask)
                // document.getElementById('modaladdTask').style.display='none';
    var xhttp=new XMLHttpRequest();
   
    xhttp.open("POST","http://localhost:5000/api/v1/addTask","true");
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify(newTask));

    xhttp.onreadystatechange=function(){
        if(this.readyState==4)
            if( this.status==200){
            fetchUsers();
            updatenotification(taskAssigned)
            // console.log(this.responseText)
        }
    };
    document.getElementById('modaladdTask').style.display='none';
    document.getElementById('inputTaskName').value='';
    document.getElementById('inputTaskDesc').value='';
    document.getElementById('inputTaskAssigned').selected.index='0';

    
    
}

//-------------------------removing-------------------------------------

function deleteUser(userId){
    let xhttp= new XMLHttpRequest();
   
    xhttp.open('DELETE',`http://localhost:5000/api/v1/tasks/${userId}`,true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send();
    xhttp.onreadystatechange=function(){
        if(this.readyState==4){
            if(this.status==200){
                fetchUsers();
            }
        }

    };
    
}

//-----------------updateUser-------------------------
function updateTask(){
    let taskName=document.getElementById('inputUpdateTaskName').value;
    let taskDesc=document.getElementById('inputtaskDesc').value;
    let taskAssigned=document.getElementById('inputUpdateEmp').value;
    let newEmp={"taskName":taskName,
    "discription":taskDesc,
    "assignedEmployee":taskAssigned};
    // for(let i=0;)
    document.getElementById('modalUpdateUser').style.display='none';
    
    var xhttp=new XMLHttpRequest();
    xhttp.open("PUT",`http://localhost:5000/api/v1/tasks/${updateUserId}`,true)
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(JSON.stringify(newEmp));
    xhttp.onreadystatechange=function(){
        if(this.readyState==4){
            if(this.status==200){
            
               fetchUsers();
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
    window.location.href = "../index.html";
}

// //////////---------------------------
// function LoadUsersList(){
//     var xhttp=new XMLHttpRequest();
//     xhttp.onreadystatechange=function(){
//         if(this.readyState==4&&this.status==200){
//             loadEmp(JSON.parse(this.responseText));  //getting the responce of emp data
//         }
//     }
//     xhttp.open("GET","http://localhost:5000/api/v1/login'","true");
//     xhttp.send();
// }

// //-----------------------------display all user------------------------------------
// function loadEmp(empData){
//     let empList=`<select id="inputTaskAssigned">
// <option disabled="" selected="">Employee List</option>
// <option>Amit</option>`;
//     let mainContainer='';
//     for(let i=0;i<empData.length;i++){
//         let empTable=` <tr class="user" id="${empData[i].id}">
//     <td class="taskName">${empData[i].userName}</td>
//     <td class="taskDisc">${empData[i].age}</td>
//     <td class="taskAssigned">${empData[i].status}</td>
    
//     <td class="functions">
//         <button class="edit" onclick="editUser(${empData[i].id});" type="button" id="1"><i class="fa-solid fa-pen-clip"></i></button>
//     </td>
//     </tr>`;
//         mainContainer+=empTable;
//     }
//     mainContainer=empHead+mainContainer;
//     document.getElementById('table').innerHTML=mainContainer;

// }

//new added filter
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }