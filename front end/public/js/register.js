

function register(){
    const username=document.getElementById('name').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    // console.log("email ............",email,password,username)
    
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
    // if(response.ok){
    //     localStorage.setItem('token',data.token);
    //     alert('login successful');
    // }else{
    //     alert('Login failed. Please check your credentials.');
    // }

    fetch('http://localhost:5000/api/v1/register',
    {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username,email,password})
    }).then((res)=>{return res.json()}).then((data)=>{ 
        // localStorage.setItem('token',data.token);
        alert('successfully registered');
        window.location.href='../index.html';
    })

}