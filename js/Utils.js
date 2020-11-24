export default class Utils{
        static ce(type,style,parent){
            let elem=document.createElement(type);
            if(style){
                Object.assign(elem.style,style);
            }
            if(parent){
                if(typeof parent==="string")parent=document.querySelector(parent);
                parent.appendChild(elem);
            }
            return elem;
        }
        static loadImg(arr,callBack){
            let img=new Image();
            img.src=arr.shift();
            img.arr=arr;
            img.list=[];
            img.callBack=callBack;
            img.addEventListener("load",this.loadHandler);
        }
        static loadHandler(e){
            let img=e.currentTarget;
            img.list.push(img.cloneNode(false));
            if(img.arr.length===0){
                img.callBack(img.list);
                return;
            }
            img.src=img.arr.shift();
        }
    }
