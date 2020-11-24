import Magnifier from "./Magnifier.js";
export default class DetailRender{
    static img_index=0;
    static xhr;
    static data_render;
    static detail_wrapper = document.querySelector("#detail_wrapper");
    static lis;
    static id_render = location.hash.indexOf("=")>-1?Number(location.hash.split("=")[1]):null;
    static ajax(){
            DetailRender.xhr = new XMLHttpRequest();
            DetailRender.xhr.addEventListener("readystatechange",DetailRender.readyChangeHandler);
            DetailRender.xhr.open("GET","http://10.20.159.102:4003/detail?id="+DetailRender.id_render);
            DetailRender.xhr.send();
    }
    static readyChangeHandler(){
        if(DetailRender.xhr.readyState===4&&DetailRender.xhr.status===200){
            DetailRender.data_render=(JSON.parse(DetailRender.xhr.response)[0]);
            let str_render="";
            str_render = `
                <div class="secondary-nav b">
                <a href="/">首页</a> &gt; <a href="#">产品系列</a> &gt;
                ${DetailRender.data_render.title}
                </div>
                <div class="pro-box-tophalf">
                    <div class="pro-left">
                        <div class="jqzoom">
                            <img id="productlogo" src=${DetailRender.data_render.img[DetailRender.img_index]} alt="" width="400" title="" iqimg="">
                            <div class="jqZoomPup" style="display:none; background-size:400px,400px;position:absolute;width:184px;height:190.9px;top:47px;left:128.5px;">&nbsp;
                            </div>
                        </div>
                        <div class="zoomdiv" style="position:absolute;display:none;top:256px;left:504.5px;width:368px;height:368px;background-image:url(${DetailRender.data_render.img[DetailRender.img_index]});background-position:0,0">
                        </div>
                        <ul class="thumb_list">
                            <li class>
                                <img src=${DetailRender.data_render.img[0]} alt="" title="" >
                            </li>
                            <li class>
                                <img src=${DetailRender.data_render.img[1]} alt="" title="">
                            </li>
                            <li class>
                                <img src=${DetailRender.data_render.img[2]} alt="" title="">
                            </li>
                            <li class>
                                <img src=${DetailRender.data_render.img[3]} alt="" title="">
                            </li>
                            <li class>
                                <img src=${DetailRender.data_render.img[4]} alt="" title="">
                            </li>
                        </ul>
                        <div class="herb_icon">
                            <a href="javascript:;"><img src="http://image.xtep.com.cn/Util/images/product/zy_icon.png" alt="官方直营">官方直营</a>
                            <a href="javascript:;"><img src="http://image.xtep.com.cn/Util/images/product/zp_icon.png" alt="正品保证">正品保证</a>
                            <a href="javascript:;"><img src="http://image.xtep.com.cn/Util/images/product/th_icon.png" alt="七天退换">七天退换</a>
                            <a href="javascript:;"><img src="http://image.xtep.com.cn/Util/images/product/fx_icon.png" alt="分享">分享</a>
                            <a href="javascript:AddFavorite(window.location,document.title);"><img src="http://image.xtep.com.cn/Util/images/product/sc_icon.png" alt="收藏商品">收藏商品</a>
                        </div>
                    </div>
                    <div class="pro-mian">
                        <div class="pro-summary">
                            <h2 class="pro-tit" id="pro-tit" style="margin-bottom: 15px;">
                            ${DetailRender.data_render.title}
                            </h2>
                            <div style="margin-top:0;" class="b h80px re pro-price-member">
                                <div class="getCoupons">
                                    <a href="javascript:;" class="couponBtn">
                                        <img src="https://shop.xtep.com.cn/webcommon/images/yiqigou_w/coupons-btn-pc.png">
                                    </a>

                                </div>
                                <div class="main-price">
                                
                                    <span class="proTitl member">官方折扣价</span> <span class="memberprice">¥<b class="showprice">${DetailRender.data_render.price_membership}.00</b></span>
                                    <div class="code">
                                        <a href="javascript:;"><img src="http://image.xtep.com.cn/util/images/product/code_icon.png" alt="二维码"></a>
                                        <span><img src="https://shop.xtep.com.cn/GetQrCode.aspx?type=url&url=https%3a%2f%2fm.xtep.com.cn%2fproduct%2fdetail.aspx%3fid%3d234707" alt="【DC超人联名】特步 男子跑步鞋 20年新款秋冬运动鞋减震潮跑鞋880419116573-"></span>
                                    </div>
                                </div>
                                <div class="main-price">
                                </div>
                                <div class="main_lj">
                                    <div class="lj">累计评价：<span>${DetailRender.data_render.quantity_comment}</span></div>
                                    <div class="lj">累计售出：<span>${DetailRender.data_render.quantity_sold}</span></div>
                                </div>
                                <div class="sale">
                                    <span class="proTitl">促销信息:</span>
                                    <a href="javascript:;">
                                        <div class="sale_box">
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div class="pro-size">
                            <span class="proTitl">尺 码:</span>
                            <div id="divitemsize_234071" class="itemsize item  selected"><a title="S" href="javascript:changegoods(234071,0,18,369.00);"><i>S</i></a></div><div id="divitemsize_234072" class="itemsize item  "><a title="M" href="javascript:changegoods(234072,0,46,369.00);"><i>M</i></a></div><div id="divitemsize_234073" class="itemsize item  "><a title="L" href="javascript:changegoods(234073,0,54,369.00);"><i>L</i></a></div><div id="divitemsize_234074" class="itemsize item  "><a title="XL" href="javascript:changegoods(234074,0,40,369.00);"><i>XL</i></a></div><div id="divitemsize_234075" class="itemsize item  "><a title="2XL" href="javascript:changegoods(234075,0,21,369.00);"><i>2XL</i></a></div>
                            <p class="measuring"> <a class="size-a" href="#"><i></i>尺码详情</a> </p>
                        </div>
                            <div class="pro-number" style="">
                                <span class="proTitl">我要买:</span><a href="javascript:;" class="number numberminus">-</a><input type="text" value="1" id="scbuycount_234707" name="pronumber" class="pronumber"><a href="javascript:;" class="number numberplus">+</a>件
                                        <span class="num_kc">（库存<span id="kucun">9</span>件）</span>                   
                            </div>
                            <div class="choose-btns">
                                <div class="divcanbuy divcheckstorage" style="display: block;">
                                <a href="http://10.20.159.102:5500/checkout.html#id=${DetailRender.id_render}" target="_blank"  id="href_addshop" data-num="234707" class="addstore"><span>加入购物车</span></a>
                                <a href="http://10.20.159.102:5500/checkout.html#id=${DetailRender.id_render}" target="_blank" class="msbuy" style="border-radius: 4px;"><span>立即购买</span></a>
                                </div>
                                <div class="divcannotbuy1 divcheckstorage" style="display:none;">
                                    <a href="javascript:;" class="msbuy"><span>超出库存</span></a>
                                </div>
                                <div class="divcannotbuy2 divcheckstorage" style="display:none;">
                                    <a href="javascript:;" class="msbuy"><span>暂时缺货</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                DetailRender.detail_wrapper.innerHTML = "";
                DetailRender.detail_wrapper.innerHTML = str_render;
                DetailRender.lis =  Array.from(document.querySelectorAll(".thumb_list>li"));
                DetailRender.lis[DetailRender.img_index].className="current";
                let magnifier = new Magnifier();
        }
       
    }
} 