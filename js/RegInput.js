export default class RegInput{
    msg;
    btn;
    inputs;
    form;
    i=0;
    list = new Set();
    registMsg_div;
    constructor(form,no_selector_list=[]){
        this.form = form;
        this.inputs = Array.from(document.querySelectorAll(".textbox-f"));
        this.inputs = this.inputs.filter(item=>{
            return !no_selector_list.includes(item.name);
        })
        this.registMsg_div=document.querySelector(".registMsg");
        this.form.addEventListener("input",this.regTestHandler.bind(this));
        this.btn = document.querySelector("#btnRegister");
    }
    regJudge(input_ele){
        switch (input_ele.name){
            case "username":{
                this.msg = "提示：请输入正确的用户名"
                return /^\D\w{7,19}$/.test(input_ele.value);
            }   
            case "password": {
                this.msg = "提示：请输入正确的密码"
                return /^(?=\D+\d)(?=.*[a-z])(?=.*[A-Z])\w{8,16}$/.test(input_ele.value);
            }
            case "password2":{
                this.msg = "提示:两次密码不一致"
                return (input_ele.value === this.inputs[1].value);
            }        
            case "txtmobile": {
                this.msg = "提示：电话号码不正确"
                return /^\d{11}$/.test(input_ele.value);
            }
            default:return true;
        }
    }
    regTestHandler(e){
        if(this.regJudge(e.target)) {
            this.registMsg_div.innerText = "";
            this.list.add(e.target);
            if(e.target.name === "password"){
                this.i++;
                if(this.i<=1)return
                if(this.inputs[2].value !== this.inputs[1].value){
                    this.registMsg_div.innerText = "两次密码不一致";
                }
                this.i++
            }
        }
        else{
            this.registMsg_div.innerText = this.msg;
            this.list.delete(e.target);   
        }
    }   
}