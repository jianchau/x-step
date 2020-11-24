export default class CheckoutRender{
    static xhr;
    static num_goods;
    static price_total=0;
    static str_checkout="";
    static data_checkout;
    static id_needed = Number(location.hash.split("=")[1]);
    static tbody = document.querySelector(".tab_shopper tbody");
    static btnDowns;
    static btnUps;
    static shopdelthiss;
    static num_span_goods;
    static spTotalPrice;
    static checkoutRender(){
        CheckoutRender.ajax();
    }

    static ajax(){
        CheckoutRender.xhr = new XMLHttpRequest();
        CheckoutRender.xhr.addEventListener("readystatechange",CheckoutRender.readyHandler);
        CheckoutRender.xhr.open("GET","http://10.20.159.102:4003/checkout?id="+CheckoutRender.id_needed);
        CheckoutRender.xhr.send();
    }

    static readyHandler(){
        if(CheckoutRender.xhr.readyState===4&&CheckoutRender.xhr.status===200){
            CheckoutRender.data_checkout=JSON.parse(CheckoutRender.xhr.response);
            CheckoutRender.renderCheckout(CheckoutRender.data_checkout);
        }
    }

    static renderCheckout(data){
        for(let i = 0;i < data.length;i++){
            CheckoutRender.str_checkout += `
                <tr>
                    <td><input type="checkbox" name="pkid" value="234225" checked="checked" class="mr5px"> 
                        <input type="hidden" value="0" id="proprom_234225">
                        <input type="hidden" value="0" id="sclimitcount_234225">
                    </td>
                    <td class="maintd">
                        <img src="${data[i].img[0]}" class="img"> 
                        <a href="http://10.20.159.102:5500/detail.html#${data[i].itemId}">${data[i].title} </a>
                        <br>
                        颜色：黑色
                        尺码：L
                    </td>
                    <td>￥${data[i].price_membership}.00 </td>
                    <td>￥${data[i].price_membership}.00 </td>
                    <td class="td-spec">
                        <a href="javascript:;" class="btnDown number" data-price="299.00" data-preprice="0.00" data-point="0" data-id="234225" data-type="goods" data-costpoint="0">-</a>
                        <input type="text" value="1" class="pronumber" id="count_item${i}">
                        <a href="javascript:;" class="btnUp number" data-price="299.00" data-preprice="0.00" data-point="0" data-id="234225" data-type="goods" data-costpoint="0" data-sc="20">+</a>
                    </td>
                    <td id="TDPrice_234225">${data[i].price_membership}</td>
                    <td><a class="shopdelthis" href="javascript:;" data-id="234225">删除</a></td>
                </tr>
            `;  
        }   
        CheckoutRender.str_checkout=CheckoutRender.str_checkout+
            `<tr>
                <td colspan="10" class="btnone"><label class="l"><input type="checkbox" name="checkbox" id="selectAll1">全选</label><a href="javascript:;" class="alldel" id="btnDel">批量删除</a>
                <div class="tj"><div><span class="numbercount" id="allshopcount">  </span>件商品</div>
                <p> 支付积分：<span class="totalpaypoint" id="spTotalCostPoints">0</span></p>
                <p>缴纳税费：<span class="totaltaxfee" id="totaltaxfee">0</span></p>
                </div>
                </td>
            </tr>
            <tr>
                <td colspan="10" class="btnoneb"><div id="divGetFurtureProm" style="display:inline;"></div>总计（不含运费）<span style="color: #c01a20;font-size: 28px;">¥</span><span class="totalpriceBig" id="spTotalPrice">1097.00</span>
                <div>
                    已节省：<span style="color: #666;font-size: 14px;">-¥0.00</span>
                </div>
                </td>
            </tr>
            `
        CheckoutRender.tbody.innerHTML = CheckoutRender.str_checkout;
        CheckoutRender.num_span_goods = document.querySelector("#allshopcount");
        CheckoutRender.btnDowns = Array.from(document.querySelectorAll(".btnDown"));
        CheckoutRender.btnUps = Array.from(document.querySelectorAll(".btnUp"));
        CheckoutRender.shopdelthiss = Array.from(document.querySelectorAll(".shopdelthis"));
        for(let i = 0;i < CheckoutRender.btnDowns.length;i++){
            CheckoutRender.btnDowns[i].addEventListener("click",CheckoutRender.btnClickHandler);
            CheckoutRender.btnUps[i].addEventListener("click",CheckoutRender.btnClickHandler);
            CheckoutRender.shopdelthiss[i].addEventListener("click",CheckoutRender.btnDelClickHandler);
        }
        CheckoutRender.spTotalPrice = document.querySelector("#spTotalPrice");
        CheckoutRender.num_goods=CheckoutRender.tbody.children.length-2;
        CheckoutRender.num_span_goods.textContent = CheckoutRender.num_goods;
        for(let i = 0;i < CheckoutRender.tbody.children.length-2;i++){
            let selector= `#count_item${i}`;
            let count_item_input =document.querySelector(selector);
            CheckoutRender.price_total+=Number(data[i].price_membership)*Number(count_item_input.value);
        }
        CheckoutRender.spTotalPrice.textContent = CheckoutRender.price_total;
    }
    static btnDelClickHandler(e){
        CheckoutRender.num_span_goods.textContent=--CheckoutRender.num_goods;
        CheckoutRender.price_total-=Number(e.target.parentNode.previousElementSibling.innerText)*Number(e.target.parentNode.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.value);
        e.target.parentNode.parentNode.remove();
        CheckoutRender.spTotalPrice.textContent = CheckoutRender.price_total;
    }
    static btnClickHandler(e){
        if(CheckoutRender.btnDowns.includes(e.target) ){
            if(Number(e.target.nextElementSibling.value)===1)return;
            let num =Number(e.target.nextElementSibling.value);
            num--;
            e.target.nextElementSibling.value=String(num);
        }
        else if(CheckoutRender.btnUps.includes(e.target)){
            let num =Number(e.target.previousElementSibling.value);
            num++;
            e.target.previousElementSibling.value=String(num);
        }
        CheckoutRender.price_total = 0;
        for(let i = 0;i < CheckoutRender.tbody.children.length-2;i++){
            let selector= `#count_item${i}`;
            let count_item_input =document.querySelector(selector);
            CheckoutRender.price_total+=Number(CheckoutRender.data_checkout[i].price_membership)*Number(count_item_input.value);
        }
        CheckoutRender.spTotalPrice.innerHTML = CheckoutRender.price_total;
    }
}