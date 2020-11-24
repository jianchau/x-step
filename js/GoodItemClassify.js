export default class GoodItemClassify{
    static item_total;
    page_sele=1;
    page_total;
    xhr;
    prev;
    data_total_sever;
    data_render;
    dir_name=location.hash.split("#")[1];
    div_pager=document.querySelector(".pager");
    span_opes;
    span_nums;
    constructor(parent){
        this.parent = typeof parent==="string"?document.querySelector(parent):parent;
        this.ajax(this.page_sele);
    }
    ajax(page_sele){
        this.xhr = new XMLHttpRequest();
        this.xhr.addEventListener("readystatechange",this.readyChangeHandler.bind(this));
        this.xhr.open("GET","http://10.20.159.102:4003/classify_"+this.dir_name+"?page="+page_sele);
        this.xhr.send();
    }
    readyChangeHandler(){
        if(this.xhr.readyState===4&&this.xhr.status===200){
            this.data_total_sever=(JSON.parse(this.xhr.response))[0];
            this.data_render=(JSON.parse(this.xhr.response))[1];
            let str_render = ""; 
            let str_page ="";
            this.page_total=Math.ceil(this.data_total_sever/20);
            for(let i = 0;i < this.page_total;i++){
                str_page = `
                    <span>（共${this.data_total_sever}条）</span>
                    <span class="page_css page_ope">上一页</span>
                    <span class="page_css page_num">1</span>
                    <span class="page_css page_num">2</span> 
                    <span class="page_css page_num">3</span>... 
                    <span class="page_css page_num">${this.page_total-1}</span> 
                    <span class="page_css page_num">${this.page_total}</span> 
                    <span class="page_css page_ope">下一页</span>`
            }
            this.div_pager.innerHTML="";
            this.div_pager.innerHTML=str_page;
            this.span_opes=Array.from(document.querySelectorAll(".page_ope"));
            this.span_nums=Array.from(document.querySelectorAll(".page_num"));
            this.prev = this.span_nums[0];
            this.span_opes.forEach((item)=>{
                item.addEventListener("click",this.spanClickHandler.bind(this));
            });
            this.span_nums.forEach((item)=>{
                item.addEventListener("click",this.spanClickHandler.bind(this))
            });
            for(let i = 0;i < this.data_render.length;i++){
                str_render+=`
                    <li class="itemlist">
                    <div class="prophoto">
                        <a href="http://10.20.159.102:5500/detail.html#id=${this.data_render[i].itemId}" target="_blank">
                            <img src=${this.data_render[i].img[0]} width="210px" height="210px" alt="">
                        </a>
                    </div>
                    <div class="porcontent">
                        <div class="pro_box_cont">
                            <div class="proinfo">
                                <p class="t">
                                    <a href="http://10.20.159.102:5500/detail.html#5" target="_blank">
                                    ${this.data_render[i].title}</a>
                                </p>
                                <p class="m">会员价：￥${this.data_render[i].price_membership}
                                </p>
                                <p>
                                    已售出：${this.data_render[i].quantity_sold}
                                    <img src="http://image.xtep.com.cn/util/images/products/ping.jpg" width="11" height="10" align="absmiddle">
                                    ${this.data_render[i].quantity_comment}条</p>
                            </div>
                        </div>
                    </div>
                </li>`
            }
            this.parent.innerHTML="";
            this.parent.innerHTML=str_render;
            this.prev.style.backgroundColor="red";
            if(this.prev){
                this.prev.style.backgroundColor="white";
                this.prev = this.span_nums[this.page_sele-1];
                this.prev.style.backgroundColor="red";
            }
        }
    }
    spanClickHandler(e){
        if(e.target===this.span_opes[0]){
            this.page_sele--;
            if(this.page_sele<=0)this.page_sele=1;
        }else if(e.target===this.span_opes[1]){
            this.page_sele++;
            if(this.page_sele>=this.page_total+1)this.page_sele=this.page_total;
        }
        else{
            this.page_sele = Number(e.target.innerText);
       }
       this.ajax(this.page_sele);
       return;
    }
}