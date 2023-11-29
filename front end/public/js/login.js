

 function login(){
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    // console.log("email ............",email,password)
    //send a request to the backend for authentication

    // const response =await fetch('http://localhost:5000/api/v1/login',
    // {
    //     method:'POST',
    //     headers:{'Content-Type':'application/json'},
    //     body:JSON.stringify({email,password})
    // })
    // const data =await response.json();
    // console.log("hello ",data)
    event.preventDefault()
    
   

    fetch('http://localhost:5000/api/v1/login',
    {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
    }).then((res)=>{return res.json()}).then((data)=>{ 
        console.log("detasil...................",data)
        localStorage.setItem('token',data.token);
        // console.log("lg...",data)
        // alert('login successful');
        
        
        if(data.role=='admin'){
            // console.log("admin all data.......",data)
            window.location.href='../adminPage.html';
        }else{
            // window.loggedUser=data.email;
            localStorage.setItem('email',data.email);
           

        window.location.href='../dashboard.html';
       
        // window.location.herf='../adminPage.html';
        }
    })

}