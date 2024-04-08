function logar(){
    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value

    if(login == 'admin' && senha == '123'){
        alert('Login correto');
        location.href = 'home.html'
    }else{
        alert('Login ou senha incorreta')
    }
}
