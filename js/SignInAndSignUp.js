import RegInput from "./RegInput.js"
export default class SignInAndSignUp{
    static xhr;
    static registerForm = document.querySelector("#registerform");
    static reg_input;
    static data={};
    static type;
    static btnRegister = document.querySelector("#btnRegister");
    static userlogin = document.querySelector("#userlogin");
    static registerform = document.querySelector("#registerform");
    static username = document.querySelector("#username");
    static password = document.querySelector("#password");
    static password2 = document.querySelector("#password2");
    static txtmobile = document.querySelector("#txtmobile");
    static agreement = document.querySelector("#agreement");
    static txtName = document.querySelector("#txtName");
    static txtPassword =document.querySelector("#pass");
    static registMsg_div=document.querySelector(".registMsg");
    static loginMsg = document.querySelector(".loginMsg");
    static registerVerify(){
        SignInAndSignUp.reg_input = new RegInput(SignInAndSignUp.registerForm);
        SignInAndSignUp.btnRegister.addEventListener("click",SignInAndSignUp.clickHandler)
        ;
        SignInAndSignUp.userlogin.addEventListener("click",SignInAndSignUp.clickHandler);
    };
    static clickHandler(e){
        e.preventDefault();
        //注册按钮点击
        if(e.target === SignInAndSignUp.btnRegister){
            if(SignInAndSignUp.reg_input.list.size<4)return;
            if(!SignInAndSignUp.agreement.checked) { 
                SignInAndSignUp.registMsg_div.innerText = "提示：请勾选同意协议"
                return;
            }
            else{
                SignInAndSignUp.data={};
                SignInAndSignUp.type = "register"
                SignInAndSignUp.data.username = SignInAndSignUp.username.value;
                SignInAndSignUp.data.password = SignInAndSignUp.password.value;
                SignInAndSignUp.data.password2 = SignInAndSignUp.password2.value;
                SignInAndSignUp.data.txtmobile = SignInAndSignUp.txtmobile.value;
                SignInAndSignUp.ajax(JSON.stringify(SignInAndSignUp.data),SignInAndSignUp.type);
            }
        }
        //登录按钮点击
        else if(e.target === SignInAndSignUp.userlogin){
            SignInAndSignUp.data={};
            SignInAndSignUp.type = "login"
            SignInAndSignUp.data.txtName = SignInAndSignUp.txtName.value;
            SignInAndSignUp.data.txtPassword=SignInAndSignUp.txtPassword.value;
            SignInAndSignUp.ajax(JSON.stringify(SignInAndSignUp.data),SignInAndSignUp.type);
        }
    }
    static ajax(data,type){
        SignInAndSignUp.xhr = new XMLHttpRequest();
        SignInAndSignUp.xhr.addEventListener("readystatechange",SignInAndSignUp.stateChangHandler);
        SignInAndSignUp.xhr.open("POST","http://10.20.159.102:4003/"+type);
        SignInAndSignUp.xhr.send(data);
    }
    static stateChangHandler(){
        let res_msg = SignInAndSignUp.xhr.response;
        if(SignInAndSignUp.xhr.readyState===4&&SignInAndSignUp.xhr.status===200){
            switch(SignInAndSignUp.type){
                case "register":{
                    SignInAndSignUp.registMsg_div.innerText = res_msg;
                    return;
                }
                case "login":{
                    if(res_msg==="登录成功")
                        location.href="http://10.20.159.102:5500/index.html";
                    else SignInAndSignUp.loginMsg.innerText = res_msg;                 
                }
            } 
        }
    }
}