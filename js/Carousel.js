export default class Carousel{
    static prev;
    static pos = 0;
    static dots=[];
    static time = 300;
    static auto_play = true;
    static isMoving = false;
    static direction;
    static speed = 20;
    static parent;
    static list=[];
    static carousel_wrapper;
    static WIDTH ;
    static HEIGHT;
    static go_left_btn;
    static go_right_btn;
    static img_wrapper;
    static btn_list;
    static screen_width;
    static screen_height;
    static arr;
    
    //接口，导出插件生成的轮播图，用参数parent接受
    static createCarousel(parent,arr){
        Carousel.arr = arr;
        Carousel.screen_width = window.innerWidth;
        Carousel.screen_height = window.innerHeight;
        Carousel.parent = parent;
        if(typeof parent === "string") Carousel.parent=document.querySelector(parent);
        Carousel.parent.innerHTML=""
        Carousel.loadImg(Carousel.arr,Carousel.imgLoadedHandler);
    }
    //图片预加载
    static imgLoadedHandler(list){
        for(let i = 0;i < list.length;i++){
            Carousel.list.push(list[i]);
        }
        Carousel.WIDTH = parseFloat(Carousel.list[0].width);
        Carousel.HEIGHT = parseFloat(Carousel.list[0].height);
        Object.assign(Carousel.parent.style,{
            position:"relative",
            height:`${Carousel.HEIGHT}px`,
            // zIndex:99999,
            overflowX:"hidden"
        });
        Carousel.carousel_wrapper = Carousel.createCarouselWrapper();
        Carousel.createImgWrapper(Carousel.carousel_wrapper);
        Carousel.carousel_wrapper.addEventListener("mouseover",Carousel.mouseHandler);
        Carousel.carousel_wrapper.addEventListener("mouseout",Carousel.mouseHandler);
        Carousel.createBtn(Carousel.carousel_wrapper);
        Carousel.createDots(Carousel.carousel_wrapper);
        Carousel.go_left_btn.addEventListener("click",Carousel.clickHandler);
        Carousel.go_right_btn.addEventListener("click",Carousel.clickHandler);
        Carousel.autoPlay();
        Carousel.img_wrapper.appendChild(Carousel.list[0]);
        Carousel.parent.appendChild(Carousel.carousel_wrapper);
    }
    //创建轮播图外围容器
    static createCarouselWrapper(){
        let carousel_wrapper = Carousel.ce("div",{
            width: `${Carousel.WIDTH}px`,
            height:`${Carousel.HEIGHT}px`,
            position:"absolute",
            left:"50%",
            marginLeft:`${-Carousel.WIDTH*0.5}px`,
            overflowX:"hidden"
        });
        return carousel_wrapper;
    }
    //创建一个可以容纳两张图片的盒子
    static createImgWrapper(parent,arr){
        Carousel.arr = arr;
        Carousel.img_wrapper = Carousel.ce("div",{
            width: `${Carousel.WIDTH*2}px`,
            height:`${Carousel.HEIGHT}px`,
            position:"absolute",
            left:0
        },parent)
    }
    //创建两个按钮
    static createBtn(parent){
        Carousel.go_left_btn = new Image();
        Carousel.go_left_btn.src="https://p2.lefile.cn/product/adminweb/2018/11/11/2a7f8349-14f0-42e1-afe8-7ae8afd54e1e.png";
        Carousel.go_right_btn = new Image();
        Carousel.go_right_btn.src="https://p2.lefile.cn/product/adminweb/2018/11/11/cae7b801-0fe6-4691-ba99-239ba9d11576.png";
        Object.assign(Carousel.go_left_btn.style,{
            position:"absolute",
            left:`${Carousel.WIDTH*0.5-Carousel.screen_width*0.5}px`,
            marginLeft:`100px`,
            top:`${Carousel.HEIGHT*0.5}px`,
            marginTop:`${-Carousel.go_right_btn.height*0.5}px`
        })
        Object.assign(Carousel.go_right_btn.style,{
            position:"absolute",
            left:`${Carousel.WIDTH*0.5-Carousel.screen_width*0.5+Carousel.screen_width}px`,
            marginLeft:`-100px`,
            top:`${Carousel.HEIGHT*0.5}px`,
            marginTop:`${-Carousel.go_right_btn.height*0.5}px`
        })
        parent.appendChild(Carousel.go_left_btn)
        parent.appendChild(Carousel.go_right_btn)
    }
    //创建圆点选项卡
    static createDots(parent){
        Carousel.dots = Carousel.ce("div",{
            zIndex:66,
            background:"red",
            height:"30px",
            width:"100%",
            position:"absolute",
            textAlign:"center",
            bottom:"40px"
        },parent);
        Carousel.list.forEach((item,index)=>{
                let span = Carousel.ce("span",{
                    display:"inline-block",
                    width:"30px",
                    height:"30px",
                    borderRadius:"50%",
                    background:"white",
                    marginRight:"5px"
                },Carousel.dots)
                span.addEventListener("mouseover",Carousel.dotMouseoverHandler);
                span.span_index =index;
        })
        Carousel.prev = Carousel.dots.firstElementChild;
        Carousel.prev.style.background = "blue";
    }
    //两个按钮的点击事件
    static clickHandler(e){
        if(Carousel.isMoving)return;
        if(e.target === Carousel.go_right_btn)
            {
                Carousel.direction = "left";
                Carousel.pos++;
                if(Carousel.pos===Carousel.list.length)Carousel.pos=0;
            }
        else if(e.target === Carousel.go_left_btn){
            Carousel.direction = "right";
            Carousel.pos--;
            if(Carousel.pos===-1)Carousel.pos=Carousel.list.length-1;
        }
        Carousel.createNextImg();
        Carousel.animation();
        Carousel.changeDot();
    }
    //从存储图片元素的数组之中调出轮播需要的一张图片，并将img_wrapper位置初始化
    static createNextImg(){
        if(Carousel.direction === "left"){
            Carousel.img_wrapper.appendChild(Carousel.list[Carousel.pos]);
        }else if(Carousel.direction === "right"){
            Carousel.img_wrapper.insertBefore(Carousel.list[Carousel.pos],Carousel.img_wrapper.firstChild);
            Carousel.img_wrapper.style.left=`${-Carousel.WIDTH}px`;
        }
    }
    //图片移动动画
    static animation(){
        Carousel.isMoving = true;
        if(Carousel.direction === "right"){
            Carousel.img_wrapper.style.left = parseFloat(Carousel.img_wrapper.style.left)+Carousel.speed + "px";
            if(parseFloat(Carousel.img_wrapper.style.left)<=0) 
            {
            window.requestAnimationFrame(Carousel.animation);
            }
            else{
                window.cancelAnimationFrame(Carousel.animation)
                Carousel.img_wrapper.lastChild.remove();
                Carousel.img_wrapper.style.left = 0;
                Carousel.dot_index--;
                Carousel.isMoving = false;
                return;
            }
        }
        else if(Carousel.direction === "left"){
            Carousel.img_wrapper.style.left = parseFloat(Carousel.img_wrapper.style.left)-Carousel.speed + "px";
            if(parseFloat(Carousel.img_wrapper.style.left)>=-(Carousel.WIDTH)) 
            {
            window.requestAnimationFrame(Carousel.animation);
            }
            else{
                window.cancelAnimationFrame(Carousel.animation)
                Carousel.img_wrapper.firstChild.remove();
                Carousel.dot_index++;
                Carousel.img_wrapper.style.left = 0;
                Carousel.isMoving = false;
                return;
            }
        }
    }
    //自动轮播
    static autoPlay(){
        if(Carousel.auto_play){
            Carousel.time--;
        if(Carousel.time<=0){
                Carousel.time=300;
                let evt = new Event("click");
                Carousel.go_right_btn.dispatchEvent(evt);
            }
        }
        window.requestAnimationFrame(Carousel.autoPlay)
    };
    //实现鼠标移入轮播图区域停止自动轮播，移出继续自动轮播
    static mouseHandler(e){
        if(e.type==="mouseover"){
            Carousel.time=300;
            Carousel.auto_play = false;
        }
        else if(e.type==="mouseout"){
            Carousel.auto_play = true;
        }
    }
    //选项卡中圆点的mouseover
    static dotMouseoverHandler(e){
        if(Carousel.isMoving)return;
        if(e.target.constructor !== HTMLSpanElement)return;
        if(Carousel.pos<e.target.span_index){ 
            Carousel.direction = "left";
        }
        else if(Carousel.pos>e.target.span_index)
        {
            Carousel.direction = "right";
        }
        else return;
        Carousel.pos = e.target.span_index;
        Carousel.changeDot();
        Carousel.createNextImg();
        Carousel.animation(); 
    }
    //实现选项卡变化
    static changeDot(){
        if(Carousel.prev)Carousel.prev.style.background = "white";
        Carousel.prev = Carousel.dots.children[Carousel.pos];
        Carousel.prev.style.background = "blue";
    }
    //创建元素
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
    //图片预加载
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

   