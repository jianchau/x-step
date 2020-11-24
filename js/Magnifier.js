import DetailRender from "./DetailRender.js"
export default class Magnifier{
    jqzoom_offset_width;
    jqzoom_offset_height;
    jqZoomPup_offset_width;
    jqZoomPup_offset_height;
    zoomdiv_offset_width;
    zoomdiv_offset_height;
    jqzoom=document.querySelector(".jqzoom");
    jqZoomPup = document.querySelector(".jqZoomPup");
    zoomdiv = document.querySelector(".zoomdiv");
    ul_thumb_list = document.querySelector(".thumb_list");
    lis = Array.from(document.querySelectorAll(".thumb_list>li"));
    prev = this.lis[0];
    constructor(){
        this.jqzoom.addEventListener("mouseover",this.mouseHandler.bind(this));
        this.jqzoom.addEventListener("mouseout",this.mouseHandler.bind(this));
        this.jqzoom.addEventListener("mousemove",this.mouseHandler.bind(this));
        this.ul_thumb_list.addEventListener("click",this.mouseHandler.bind(this));
    }
    mouseHandler(e){
        if(e.currentTarget===this.jqzoom&&e.type==="mouseover"){
            this.jqZoomPup.style.display="block";
            this.zoomdiv.style.display="block";
            this. jqzoom_offset_width = this.jqzoom.offsetWidth;
            this.jqzoom_offset_height = this.jqzoom.offsetHeight;
            this.jqZoomPup_offset_width = this.jqZoomPup.offsetWidth;
            this.jqZoomPup_offset_height = this.jqZoomPup.offsetHeight;
            this.zoomdiv_offset_width = this.zoomdiv.offsetWidth;
            this.zoomdiv_offset_height = this.zoomdiv.offsetHeight;
        }else if(e.currentTarget===this.jqzoom&&e.type==="mouseout"){
            this.jqZoomPup.style.display="none";
            this.zoomdiv.style.display="none";
            this.jqZoomPup.style.display="none";
        }
        else if(e.currentTarget===this.jqzoom&&e.type==="mousemove"){
            let dis_jqzoom_x = this.jqzoom.getBoundingClientRect().left;
            let dis_jqzoom_y = this.jqzoom.getBoundingClientRect().top;
            let _left = e.clientX - dis_jqzoom_x - 0.5*this.jqZoomPup_offset_width;
            let _top = e.clientY- dis_jqzoom_y - 0.5*this.jqZoomPup_offset_height;
            if(_left<=0)_left=0;
            if(_left>=this.jqzoom_offset_width-this.jqZoomPup_offset_width)_left=this.jqzoom_offset_width-this.jqZoomPup_offset_width;
            if(_top<=0)_top=0
            if(_top>=this.jqzoom_offset_height-this.jqZoomPup_offset_height)_top=this.jqzoom_offset_height-this.jqZoomPup_offset_height;
            this.move_jqZoomPup(_left,_top,this.jqZoomPup);
            this.jqZoomPup.style.backgroundPositionX=-_left+"px";
            this.jqZoomPup.style.backgroundPositionY = -_top+"px";
            this.zoomdiv.style.backgroundPositionX=(800-this.zoomdiv_offset_width)/(400-this.jqZoomPup_offset_width)*-_left+"px";
            this.zoomdiv.style.backgroundPositionY=(800-this.zoomdiv_offset_height)/(400-this.jqZoomPup_offset_height)*-_top+"px";
        }
        else if(e.currentTarget===this.ul_thumb_list&&e.type==="click"){
            if(e.target.constructor!==HTMLImageElement)return;
            DetailRender.img_index = this.lis.indexOf(e.target.parentNode);
            DetailRender.ajax();
        }
        
    }
    move_jqZoomPup(_left,_top,ele){
            ele.style.left = _left + "px";
            ele.style.top = _top + "px";
    }
}