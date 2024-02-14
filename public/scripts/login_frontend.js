

function login_execute(){
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
   
    
    const login_info = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body:JSON.stringify({
            "username" : username,
            "password" : password
        })
};
  
    fetch('/api/login', login_info)
    .then((response) => {
        if(response.status == 200){
            document.location.href = '/lobby'
        }
        else{
            document.location.reload();
            alert("Incorrect Username/Password");
        }

    })
    .catch((err) => console.log(err));

    

}