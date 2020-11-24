export default class SecondaryMenu{
    static first_menus;
    static t=null;
    static seccondary_menus;
    static showSecondaryMenu(){
        SecondaryMenu.first_menus = document.querySelectorAll(".navigation ul li");
        SecondaryMenu.secondary_menus = document.querySelectorAll(".secondary_menu");
        for(let i = 0;i < SecondaryMenu.first_menus.length;i++){
                    SecondaryMenu.first_menus[i].addEventListener(`mouseenter`,SecondaryMenu.mouseHandle);
                    SecondaryMenu.first_menus[i].addEventListener(`mouseleave`,SecondaryMenu.mouseHandle);
        }
    };
    static mouseHandle(e){
        if(Number(e.target.getAttribute("data-index"))===0||Number(e.target.getAttribute("data-index"))===SecondaryMenu.first_menus.length-1){
            if(e.type==="mouseenter"){
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].style.background=`rgb(243,243,243)`;
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].firstElementChild.style.color =`red`;
                
            }else if(e.type==="mouseleave"){
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].style.background=`black`;
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].firstElementChild.style.color = `white`;
            }
        }else{
            if(e.type==="mouseenter"){
                SecondaryMenu.secondary_menus[Number(e.target.getAttribute("data-index")-1)].style.display = "block";
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].style.background=`rgb(243,243,243)`;
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].firstElementChild.style.color =`red`;
                SecondaryMenu.secondary_menus[Number(e.target.getAttribute("data-index")-1)].addEventListener(`mouseenter`,SecondaryMenu.mouseEnterHandle);
                SecondaryMenu.secondary_menus[Number(e.target.getAttribute("data-index")-1)].addEventListener(`mouseleave`,SecondaryMenu.mouseLeaveHandle);
            }else{
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].style.background=`black`;
                SecondaryMenu.first_menus[Number(e.target.getAttribute("data-index"))].firstElementChild.style.color =`white`;
                clearTimeout(SecondaryMenu.t);
                SecondaryMenu.t = setTimeout(()=>{
                    SecondaryMenu.secondary_menus[Number(e.target.getAttribute("data-index")-1)].style.display = "none";               
                },10) 
            }
        }
    };

    static mouseEnterHandle(e){
        clearTimeout(SecondaryMenu.t)
        e.currentTarget.style.display = "block";
    }
    static mouseLeaveHandle(e){
        e.currentTarget.style.display = "none";
    }
}