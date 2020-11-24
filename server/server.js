var http = require("http");
var querystring = require("querystring");
var sql = require("mysql");
var req, res, data, obj,type,para;
var arr_checkout=[];
var con = sql.createConnection({
    url: "localhost",
    post: 3306,
    user: "root",
    password: "root",
    database: "xstep"
});

con.connect(function (err) {
    if (err) {
        console.log("连接失败");
        return;
    } else {
        console.log("连接成功");
    }
});

var data_home = 
    {
        "goodsItem_classify":{
            "run":[
                    {   "itemId":1,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009240833/2020924833388887D89D0372357B1D6334C48B556F92CA2.jpg","http://image.xtep.com.cn/util/upload/product/202009240833/202092483338547BBBD11E5DC83F27A65055B1E2038AF86.jpg","http://image.xtep.com.cn/util/upload/product/202009240833/20209248333953189325BB9CD89698B98F18D8CDC3387B0.jpg","http://image.xtep.com.cn/util/upload/product/202009240833/20209248333993793D9E2155F4CA5C6337D6EDCC87B3D4F.jpg","http://image.xtep.com.cn/util/upload/product/202009240833/202092483340274573A303CF943F72F834BBE65E89DDE83.jpg"],
                        "title":"【DC超人联名】特步 男子跑步鞋 20年新款秋冬运动鞋减震潮跑鞋880419116573",
                        "price_membership":"399",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {   "itemId":2,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009091733/20209917335251150220058A0976F3520B89B2F281E8A7.jpg","http://image.xtep.com.cn/util/upload/product/202009091733/2020991733523046152C5D1F65041EF268A1BED6E9A6E47.jpg","http://image.xtep.com.cn/util/upload/product/202009091733/202099173352823DD94909F87A42A1B77E94865E771AE9E.jpg","http://image.xtep.com.cn/util/upload/product/202009091733/2020991733537402DC103B7AC52452F97F04C6C311AE346.jpg","http://image.xtep.com.cn/util/upload/product/202009091733/202099173353121DDF644164BCB313597EF65FFC4A8CCC8.jpg"],
                        "title":"特步 专柜款 女子针织长裤 综训跑步运动健身长裤980428630568",
                        "price_membership":"219 ",
                        "quantity_sold":1,
                        "quantity_comment":0
                    },
                    {   "itemId":3,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171454/2020917145426807300B29CECC56A65F69CF7C33D96E059.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/202091714542715752E735006A79A451528982EC619D6D2.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/2020917145427356A964A5E316BC3C2F6CF53B1CEF80C1B0.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/20209171454277094F1CCEEF1344916CF3EFE908D43405BE.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/2020917145427927075A24C9C5CD0981A7CAB367FABB70DC.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 网面轻盈运动跑步鞋980419111000",
                        "price_membership":"369",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":4,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171121/20209171121049274C022D72CA38086048963DC3B1F646A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211117208E9EBDB3A13D6E7C55883CEA2D3634.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211301730E17E9653297C7C45D85C710C8CCD9.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211447018E158C5F27575A3D549FE13359568A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/2020917112116320146F1F6C41B7B745F012636F16A211F.jpg"],
                        "title":"特步 男子跑鞋 20年新款 都市潮流厚底减震运动跑步鞋880419116595",
                        "price_membership":"399 ",
                        "quantity_sold":43,
                        "quantity_comment":0
                    },
                    {   "itemId":5,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/2020917101458346D0A50113D54A90130BE734FBCA8DAFD.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/20209171014613F18469B5320FCA9D4E7401167200BDB9.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146203995DC207A77CD888529654C23CF711A2.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146395C9A10685E034832AB730816CAF109582.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"369",
                        "quantity_sold":41,
                        "quantity_comment":0
                    },
                    {
                        "itemId":6,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"169 ",
                        "quantity_sold":38,
                        "quantity_comment":0
                    },
                    {
                        "itemId":7,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141603/202091416338608014B5B77409D9815C1342DFEB7CA1D88.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/2020914154437131562FE282D6BF95742B37D1A8F9ACF70.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415443994CE5963B3870E4AF2A0C2D5944FB76FEC.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444298E659E8F64D378A3788E997474884DB56.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444530BE464D662371353A3E5781F135678F64.jpg"],
                        "title":"特步 专柜款 女子跑鞋 20年新款 舒适透气百搭跑步鞋980418110990",
                        "price_membership":"299 ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":8,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234744F14C99E0E63C8916660E8334E1442E85.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234990E8A9373CCC3CBA07E7321E8F3462D9EA.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/202091415223513300A6FB21CA2017E1B5E2127874324DBB.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152235672CD79B2FECA4C6354F4060E3EE6065FA5.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/20209141522358314BC81B5CC95D89C1F23F214BD92F5DB4.jpg"],
                        "title":"特步 专柜款 男子梭织长裤 20年新款 都市运动跑步长裤980429980129",
                        "price_membership":"299",
                        "quantity_sold":47,
                        "quantity_comment":0
                    },
                    {
                        "itemId":9,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141529/20209141529213714C918187CB7A4BDAF50ED51F4255049A.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152921681CBC494FD341E27800300CA501A363209.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/20209141529218754C150B5ADAB2F42B255452EA3C3E7443.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/202091415292243AFA2350083FC982296B37D8ED8E9C3D8.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152922188529C2E266A5AD246225040E45AF18D6E.jpg"],
                        "title":" 特步 专柜款 男子卫衣 20年新款 跑步运动篮球套头卫衣980429920400",
                        "price_membership":"259  ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":10,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141407/202091414733129B7EE7A36EB3BE4F472ACFC6CA74D9FA7.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733337DE91ED5577D2D164C369F0E322792F28.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733532B2D974DE4156772AE7A0839EA5E51245.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414734120AD2ECA136D4E4C6E71207AAAED21E54D.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/2020914147344057AAEE176DB39387295969DB327B7FB57.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"369 ",
                        "quantity_sold":29,
                        "quantity_comment":0
                    },
                    {
                        "itemId":11,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":12,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":13,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":14,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":15,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":16,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/202082717195664294A92A35729313ACB18A3744F241E7CA.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/20208271719567823DBA375F99F406DB2EE82D697AD020F9.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171956966693F9E5D0CC1D3EAD8707626B70AFF5F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171957490C4763EB2DC7C2F07E20B52810A9DFB4B.jpg"],
                        "title":"特步 女子跑鞋 20年秋冬 革面轻便百搭运动跑步鞋880418116666",
                        "price_membership":"179 ",
                        "quantity_sold":76,
                        "quantity_comment":0
                    },
                    {
                        "itemId":17,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008261000/202082610054327026F46E97E8405CCD110474CAA7FDE55.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610054854FA8AA9B43EA0A863159AC53C2C589AD9.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100549547B4C0EE0EC824F32198A12637A78DC01.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100551985761424ED33C3F262E002AB238D7C527.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610055298BB1DF053DAEE404E256CB32F3AD81A77.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 轻盈运动时尚都市跑步鞋980419110807",
                        "price_membership":"169 ",
                        "quantity_sold":42,
                        "quantity_comment":0
                    },
                    {
                        "itemId":18,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008260940/202082694018400C34302A392F61E3F2F1061641F004AE.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402413DA3CFEAA7E59585C34E0CC8BA53A3DEA.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/202082694025809E7BC163D27DD51A83920E3D583E0026.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402707A72F96D7D3FCAF785D82C31E7DEB6BD8.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/2020826940282905F5DCDEE097D11E71BC90C134446FAA.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 时尚气垫轻便运动跑步鞋980419110720",
                        "price_membership":"299 ",
                        "quantity_sold":46,
                        "quantity_comment":0
                    },
                    {
                        "itemId":19,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251550/2020825155032728EB931299DBAC85EBBC81254B79073971.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/202082515503338314A3433AEB0506F7ED43361298686D83.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155033941557263610EEA8198D7BD68AC842012AB.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/20208251550341852C8B4097D48764768D638C5F75FA018E.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155034365AD66C3E4A343E00FD7C3C7ABAF056E40.jpg"],
                        "title":"特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"339 ",
                        "quantity_sold":79,
                        "quantity_comment":0
                    },
                    {
                        "itemId":20,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652375A51A862FB9248A4B2CD5167DC0FC0800.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565278845CF22BA2C6BB11FCAC9C3990C99ACE2.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652997AC10E0397DCFFD68AC8E46B8475EC256.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565351649FF5ABC36274DE692E4AC9C3CC243F8.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565366150AC3CB1FDF1E5E66295BC883F8D1311.jpg"],
                        "title":" 特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"299 ",
                        "quantity_sold":40,
                        "quantity_comment":0
                    },
                    {
                        "itemId":21,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":22,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":23,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":24,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":25,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":26,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":27,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":28,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":29,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171121/20209171121049274C022D72CA38086048963DC3B1F646A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211117208E9EBDB3A13D6E7C55883CEA2D3634.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211301730E17E9653297C7C45D85C710C8CCD9.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211447018E158C5F27575A3D549FE13359568A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/2020917112116320146F1F6C41B7B745F012636F16A211F.jpg"],
                        "title":"特步 男子跑鞋 20年新款 都市潮流厚底减震运动跑步鞋880419116595",
                        "price_membership":"399 ",
                        "quantity_sold":43,
                        "quantity_comment":0
                    },
                    {   "itemId":30,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/2020917101458346D0A50113D54A90130BE734FBCA8DAFD.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/20209171014613F18469B5320FCA9D4E7401167200BDB9.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146203995DC207A77CD888529654C23CF711A2.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146395C9A10685E034832AB730816CAF109582.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"369",
                        "quantity_sold":41,
                        "quantity_comment":0
                    },
                    {
                        "itemId":31,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163389230BA6EC759A4EC34A1809D473350930D4.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/20209141633985CFF538CF4137B6CB3DCD3CAD676EECCE.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163393021A021EBAAAFAFE17DC4FABEC4CAE972F.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/202091416339407CB5191485F29110EC7699284EEAB1E61.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"169 ",
                        "quantity_sold":38,
                        "quantity_comment":0
                    },
                    {
                        "itemId":32,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141603/202091416338608014B5B77409D9815C1342DFEB7CA1D88.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/2020914154437131562FE282D6BF95742B37D1A8F9ACF70.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415443994CE5963B3870E4AF2A0C2D5944FB76FEC.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444298E659E8F64D378A3788E997474884DB56.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444530BE464D662371353A3E5781F135678F64.jpg"],
                        "title":"特步 专柜款 女子跑鞋 20年新款 舒适透气百搭跑步鞋980418110990",
                        "price_membership":"299 ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":33,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234744F14C99E0E63C8916660E8334E1442E85.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234990E8A9373CCC3CBA07E7321E8F3462D9EA.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/202091415223513300A6FB21CA2017E1B5E2127874324DBB.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152235672CD79B2FECA4C6354F4060E3EE6065FA5.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/20209141522358314BC81B5CC95D89C1F23F214BD92F5DB4.jpg"],
                        "title":"特步 专柜款 男子梭织长裤 20年新款 都市运动跑步长裤980429980129",
                        "price_membership":"299",
                        "quantity_sold":47,
                        "quantity_comment":0
                    },
                    {
                        "itemId":34,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141529/20209141529213714C918187CB7A4BDAF50ED51F4255049A.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152921681CBC494FD341E27800300CA501A363209.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/20209141529218754C150B5ADAB2F42B255452EA3C3E7443.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/202091415292243AFA2350083FC982296B37D8ED8E9C3D8.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152922188529C2E266A5AD246225040E45AF18D6E.jpg"],
                        "title":" 特步 专柜款 男子卫衣 20年新款 跑步运动篮球套头卫衣980429920400",
                        "price_membership":"259  ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":35,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141407/202091414733129B7EE7A36EB3BE4F472ACFC6CA74D9FA7.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733337DE91ED5577D2D164C369F0E322792F28.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733532B2D974DE4156772AE7A0839EA5E51245.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414734120AD2ECA136D4E4C6E71207AAAED21E54D.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/2020914147344057AAEE176DB39387295969DB327B7FB57.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"369 ",
                        "quantity_sold":29,
                        "quantity_comment":0
                    },
                    {
                        "itemId":36,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":37,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":38,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":39,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":40,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":41,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/202082717195664294A92A35729313ACB18A3744F241E7CA.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/20208271719567823DBA375F99F406DB2EE82D697AD020F9.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171956966693F9E5D0CC1D3EAD8707626B70AFF5F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171957490C4763EB2DC7C2F07E20B52810A9DFB4B.jpg"],
                        "title":"特步 女子跑鞋 20年秋冬 革面轻便百搭运动跑步鞋880418116666",
                        "price_membership":"179 ",
                        "quantity_sold":76,
                        "quantity_comment":0
                    },
                    {   "itemId":42,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171454/2020917145426807300B29CECC56A65F69CF7C33D96E059.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/202091714542715752E735006A79A451528982EC619D6D2.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/2020917145427356A964A5E316BC3C2F6CF53B1CEF80C1B0.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/20209171454277094F1CCEEF1344916CF3EFE908D43405BE.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/2020917145427927075A24C9C5CD0981A7CAB367FABB70DC.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 网面轻盈运动跑步鞋980419111000",
                        "price_membership":"369",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":43,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171121/20209171121049274C022D72CA38086048963DC3B1F646A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211117208E9EBDB3A13D6E7C55883CEA2D3634.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211301730E17E9653297C7C45D85C710C8CCD9.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211447018E158C5F27575A3D549FE13359568A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/2020917112116320146F1F6C41B7B745F012636F16A211F.jpg"],
                        "title":"特步 男子跑鞋 20年新款 都市潮流厚底减震运动跑步鞋880419116595",
                        "price_membership":"399 ",
                        "quantity_sold":43,
                        "quantity_comment":0
                    },
                    {   "itemId":44,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/2020917101458346D0A50113D54A90130BE734FBCA8DAFD.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/20209171014613F18469B5320FCA9D4E7401167200BDB9.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146203995DC207A77CD888529654C23CF711A2.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146395C9A10685E034832AB730816CAF109582.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"369",
                        "quantity_sold":41,
                        "quantity_comment":0
                    },
                    {
                        "itemId":45,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163389230BA6EC759A4EC34A1809D473350930D4.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/20209141633985CFF538CF4137B6CB3DCD3CAD676EECCE.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163393021A021EBAAAFAFE17DC4FABEC4CAE972F.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/202091416339407CB5191485F29110EC7699284EEAB1E61.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"169 ",
                        "quantity_sold":38,
                        "quantity_comment":0
                    },
                    {
                        "itemId":46,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141603/202091416338608014B5B77409D9815C1342DFEB7CA1D88.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/2020914154437131562FE282D6BF95742B37D1A8F9ACF70.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415443994CE5963B3870E4AF2A0C2D5944FB76FEC.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444298E659E8F64D378A3788E997474884DB56.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444530BE464D662371353A3E5781F135678F64.jpg"],
                        "title":"特步 专柜款 女子跑鞋 20年新款 舒适透气百搭跑步鞋980418110990",
                        "price_membership":"299 ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":47,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234744F14C99E0E63C8916660E8334E1442E85.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234990E8A9373CCC3CBA07E7321E8F3462D9EA.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/202091415223513300A6FB21CA2017E1B5E2127874324DBB.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152235672CD79B2FECA4C6354F4060E3EE6065FA5.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/20209141522358314BC81B5CC95D89C1F23F214BD92F5DB4.jpg"],
                        "title":"特步 专柜款 男子梭织长裤 20年新款 都市运动跑步长裤980429980129",
                        "price_membership":"299",
                        "quantity_sold":47,
                        "quantity_comment":0
                    },
                    {
                        "itemId":48,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141529/20209141529213714C918187CB7A4BDAF50ED51F4255049A.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152921681CBC494FD341E27800300CA501A363209.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/20209141529218754C150B5ADAB2F42B255452EA3C3E7443.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/202091415292243AFA2350083FC982296B37D8ED8E9C3D8.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152922188529C2E266A5AD246225040E45AF18D6E.jpg"],
                        "title":" 特步 专柜款 男子卫衣 20年新款 跑步运动篮球套头卫衣980429920400",
                        "price_membership":"259  ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":49,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141407/202091414733129B7EE7A36EB3BE4F472ACFC6CA74D9FA7.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733337DE91ED5577D2D164C369F0E322792F28.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733532B2D974DE4156772AE7A0839EA5E51245.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414734120AD2ECA136D4E4C6E71207AAAED21E54D.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/2020914147344057AAEE176DB39387295969DB327B7FB57.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"369 ",
                        "quantity_sold":29,
                        "quantity_comment":0
                    },
                    {
                        "itemId":50,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"¥259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":51,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":52,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":53,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":54,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":55,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/202082717195664294A92A35729313ACB18A3744F241E7CA.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/20208271719567823DBA375F99F406DB2EE82D697AD020F9.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171956966693F9E5D0CC1D3EAD8707626B70AFF5F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171957490C4763EB2DC7C2F07E20B52810A9DFB4B.jpg"],
                        "title":"特步 女子跑鞋 20年秋冬 革面轻便百搭运动跑步鞋880418116666",
                        "price_membership":"179 ",
                        "quantity_sold":76,
                        "quantity_comment":0
                    },
                    {
                        "itemId":56,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008261000/202082610054327026F46E97E8405CCD110474CAA7FDE55.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610054854FA8AA9B43EA0A863159AC53C2C589AD9.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100549547B4C0EE0EC824F32198A12637A78DC01.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100551985761424ED33C3F262E002AB238D7C527.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610055298BB1DF053DAEE404E256CB32F3AD81A77.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 轻盈运动时尚都市跑步鞋980419110807",
                        "price_membership":"169 ",
                        "quantity_sold":42,
                        "quantity_comment":0
                    },
                    {
                        "itemId":57,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008260940/202082694018400C34302A392F61E3F2F1061641F004AE.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402413DA3CFEAA7E59585C34E0CC8BA53A3DEA.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/202082694025809E7BC163D27DD51A83920E3D583E0026.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402707A72F96D7D3FCAF785D82C31E7DEB6BD8.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/2020826940282905F5DCDEE097D11E71BC90C134446FAA.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 时尚气垫轻便运动跑步鞋980419110720",
                        "price_membership":"299 ",
                        "quantity_sold":46,
                        "quantity_comment":0
                    },
                    {
                        "itemId":58,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251550/2020825155032728EB931299DBAC85EBBC81254B79073971.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/202082515503338314A3433AEB0506F7ED43361298686D83.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155033941557263610EEA8198D7BD68AC842012AB.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/20208251550341852C8B4097D48764768D638C5F75FA018E.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155034365AD66C3E4A343E00FD7C3C7ABAF056E40.jpg"],
                        "title":"特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"339 ",
                        "quantity_sold":79,
                        "quantity_comment":0
                    },
                    {
                        "itemId":59,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652375A51A862FB9248A4B2CD5167DC0FC0800.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565278845CF22BA2C6BB11FCAC9C3990C99ACE2.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652997AC10E0397DCFFD68AC8E46B8475EC256.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565351649FF5ABC36274DE692E4AC9C3CC243F8.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565366150AC3CB1FDF1E5E66295BC883F8D1311.jpg"],
                        "title":" 特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"299 ",
                        "quantity_sold":40,
                        "quantity_comment":0
                    },
                    {
                        "itemId":60,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":61,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":62,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":63,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141603/202091416338608014B5B77409D9815C1342DFEB7CA1D88.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/2020914154437131562FE282D6BF95742B37D1A8F9ACF70.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415443994CE5963B3870E4AF2A0C2D5944FB76FEC.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444298E659E8F64D378A3788E997474884DB56.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444530BE464D662371353A3E5781F135678F64.jpg"],
                        "title":"特步 专柜款 女子跑鞋 20年新款 舒适透气百搭跑步鞋980418110990",
                        "price_membership":"299 ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":64,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234744F14C99E0E63C8916660E8334E1442E85.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234990E8A9373CCC3CBA07E7321E8F3462D9EA.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/202091415223513300A6FB21CA2017E1B5E2127874324DBB.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152235672CD79B2FECA4C6354F4060E3EE6065FA5.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/20209141522358314BC81B5CC95D89C1F23F214BD92F5DB4.jpg"],
                        "title":"特步 专柜款 男子梭织长裤 20年新款 都市运动跑步长裤980429980129",
                        "price_membership":"299",
                        "quantity_sold":65,
                        "quantity_comment":0
                    },
                    {
                        "itemId":65,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141529/20209141529213714C918187CB7A4BDAF50ED51F4255049A.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152921681CBC494FD341E27800300CA501A363209.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/20209141529218754C150B5ADAB2F42B255452EA3C3E7443.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/202091415292243AFA2350083FC982296B37D8ED8E9C3D8.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152922188529C2E266A5AD246225040E45AF18D6E.jpg"],
                        "title":" 特步 专柜款 男子卫衣 20年新款 跑步运动篮球套头卫衣980429920400",
                        "price_membership":"259  ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":66,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141407/202091414733129B7EE7A36EB3BE4F472ACFC6CA74D9FA7.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733337DE91ED5577D2D164C369F0E322792F28.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733532B2D974DE4156772AE7A0839EA5E51245.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414734120AD2ECA136D4E4C6E71207AAAED21E54D.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/2020914147344057AAEE176DB39387295969DB327B7FB57.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"369 ",
                        "quantity_sold":29,
                        "quantity_comment":0
                    },
                    {
                        "itemId":67,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":68,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":69,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":70,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":71,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":72,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/202082717195664294A92A35729313ACB18A3744F241E7CA.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/20208271719567823DBA375F99F406DB2EE82D697AD020F9.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171956966693F9E5D0CC1D3EAD8707626B70AFF5F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171957490C4763EB2DC7C2F07E20B52810A9DFB4B.jpg"],
                        "title":"特步 女子跑鞋 20年秋冬 革面轻便百搭运动跑步鞋880418116666",
                        "price_membership":"179 ",
                        "quantity_sold":76,
                        "quantity_comment":0
                    },
                    {
                        "itemId":73,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008261000/202082610054327026F46E97E8405CCD110474CAA7FDE55.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610054854FA8AA9B43EA0A863159AC53C2C589AD9.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100549547B4C0EE0EC824F32198A12637A78DC01.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100551985761424ED33C3F262E002AB238D7C527.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610055298BB1DF053DAEE404E256CB32F3AD81A77.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 轻盈运动时尚都市跑步鞋980419110807",
                        "price_membership":"169 ",
                        "quantity_sold":42,
                        "quantity_comment":0
                    },
                    {
                        "itemId":74,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008260940/202082694018400C34302A392F61E3F2F1061641F004AE.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402413DA3CFEAA7E59585C34E0CC8BA53A3DEA.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/202082694025809E7BC163D27DD51A83920E3D583E0026.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402707A72F96D7D3FCAF785D82C31E7DEB6BD8.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/2020826940282905F5DCDEE097D11E71BC90C134446FAA.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 时尚气垫轻便运动跑步鞋980419110720",
                        "price_membership":"299 ",
                        "quantity_sold":46,
                        "quantity_comment":0
                    },
                    {
                        "itemId":75,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251550/2020825155032728EB931299DBAC85EBBC81254B79073971.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/202082515503338314A3433AEB0506F7ED43361298686D83.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155033941557263610EEA8198D7BD68AC842012AB.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/20208251550341852C8B4097D48764768D638C5F75FA018E.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155034365AD66C3E4A343E00FD7C3C7ABAF056E40.jpg"],
                        "title":"特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"339 ",
                        "quantity_sold":79,
                        "quantity_comment":0
                    },
                    {
                        "itemId":76,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652375A51A862FB9248A4B2CD5167DC0FC0800.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565278845CF22BA2C6BB11FCAC9C3990C99ACE2.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652997AC10E0397DCFFD68AC8E46B8475EC256.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565351649FF5ABC36274DE692E4AC9C3CC243F8.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565366150AC3CB1FDF1E5E66295BC883F8D1311.jpg"],
                        "title":" 特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"299 ",
                        "quantity_sold":40,
                        "quantity_comment":0
                    },
                    {
                        "itemId":77,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":78,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":79,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":80,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":81,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":82,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":83,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":84,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":85,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171121/20209171121049274C022D72CA38086048963DC3B1F646A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211117208E9EBDB3A13D6E7C55883CEA2D3634.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211301730E17E9653297C7C45D85C710C8CCD9.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211447018E158C5F27575A3D549FE13359568A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/2020917112116320146F1F6C41B7B745F012636F16A211F.jpg"],
                        "title":"特步 男子跑鞋 20年新款 都市潮流厚底减震运动跑步鞋880419116595",
                        "price_membership":"399 ",
                        "quantity_sold":43,
                        "quantity_comment":0
                    },
                    {   "itemId":86,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/2020917101458346D0A50113D54A90130BE734FBCA8DAFD.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/20209171014613F18469B5320FCA9D4E7401167200BDB9.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146203995DC207A77CD888529654C23CF711A2.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146395C9A10685E034832AB730816CAF109582.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"369",
                        "quantity_sold":41,
                        "quantity_comment":0
                    },
                    {
                        "itemId":87,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163389230BA6EC759A4EC34A1809D473350930D4.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/20209141633985CFF538CF4137B6CB3DCD3CAD676EECCE.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163393021A021EBAAAFAFE17DC4FABEC4CAE972F.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/202091416339407CB5191485F29110EC7699284EEAB1E61.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"169 ",
                        "quantity_sold":38,
                        "quantity_comment":0
                    },
                    {
                        "itemId":88,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141603/202091416338608014B5B77409D9815C1342DFEB7CA1D88.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/2020914154437131562FE282D6BF95742B37D1A8F9ACF70.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415443994CE5963B3870E4AF2A0C2D5944FB76FEC.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444298E659E8F64D378A3788E997474884DB56.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444530BE464D662371353A3E5781F135678F64.jpg"],
                        "title":"特步 专柜款 女子跑鞋 20年新款 舒适透气百搭跑步鞋980418110990",
                        "price_membership":"299 ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":89,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234744F14C99E0E63C8916660E8334E1442E85.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234990E8A9373CCC3CBA07E7321E8F3462D9EA.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/202091415223513300A6FB21CA2017E1B5E2127874324DBB.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152235672CD79B2FECA4C6354F4060E3EE6065FA5.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/20209141522358314BC81B5CC95D89C1F23F214BD92F5DB4.jpg"],
                        "title":"特步 专柜款 男子梭织长裤 20年新款 都市运动跑步长裤980429980129",
                        "price_membership":"299",
                        "quantity_sold":47,
                        "quantity_comment":0
                    },
                    {
                        "itemId":90,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141529/20209141529213714C918187CB7A4BDAF50ED51F4255049A.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152921681CBC494FD341E27800300CA501A363209.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/20209141529218754C150B5ADAB2F42B255452EA3C3E7443.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/202091415292243AFA2350083FC982296B37D8ED8E9C3D8.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152922188529C2E266A5AD246225040E45AF18D6E.jpg"],
                        "title":" 特步 专柜款 男子卫衣 20年新款 跑步运动篮球套头卫衣980429920400",
                        "price_membership":"259  ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":91,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141407/202091414733129B7EE7A36EB3BE4F472ACFC6CA74D9FA7.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733337DE91ED5577D2D164C369F0E322792F28.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733532B2D974DE4156772AE7A0839EA5E51245.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414734120AD2ECA136D4E4C6E71207AAAED21E54D.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/2020914147344057AAEE176DB39387295969DB327B7FB57.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"369 ",
                        "quantity_sold":29,
                        "quantity_comment":0
                    },
                    {
                        "itemId":92,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":93,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":94,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":95,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":96,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":97,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/202082717195664294A92A35729313ACB18A3744F241E7CA.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/20208271719567823DBA375F99F406DB2EE82D697AD020F9.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171956966693F9E5D0CC1D3EAD8707626B70AFF5F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171957490C4763EB2DC7C2F07E20B52810A9DFB4B.jpg"],
                        "title":"特步 女子跑鞋 20年秋冬 革面轻便百搭运动跑步鞋880418116666",
                        "price_membership":"179 ",
                        "quantity_sold":76,
                        "quantity_comment":0
                    },
                    {   "itemId":98,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171454/2020917145426807300B29CECC56A65F69CF7C33D96E059.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/202091714542715752E735006A79A451528982EC619D6D2.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/2020917145427356A964A5E316BC3C2F6CF53B1CEF80C1B0.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/20209171454277094F1CCEEF1344916CF3EFE908D43405BE.jpg","http://image.xtep.com.cn/util/upload/product/202009171454/2020917145427927075A24C9C5CD0981A7CAB367FABB70DC.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 网面轻盈运动跑步鞋980419111000",
                        "price_membership":"369",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":99,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171121/20209171121049274C022D72CA38086048963DC3B1F646A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211117208E9EBDB3A13D6E7C55883CEA2D3634.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211301730E17E9653297C7C45D85C710C8CCD9.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/202091711211447018E158C5F27575A3D549FE13359568A.jpg","http://image.xtep.com.cn/util/upload/product/202009171121/2020917112116320146F1F6C41B7B745F012636F16A211F.jpg"],
                        "title":"特步 男子跑鞋 20年新款 都市潮流厚底减震运动跑步鞋880419116595",
                        "price_membership":"399 ",
                        "quantity_sold":43,
                        "quantity_comment":0
                    },
                    {   "itemId":100,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/2020917101458346D0A50113D54A90130BE734FBCA8DAFD.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/20209171014613F18469B5320FCA9D4E7401167200BDB9.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146203995DC207A77CD888529654C23CF711A2.jpg","http://image.xtep.com.cn/util/upload/product/202009171001/202091710146395C9A10685E034832AB730816CAF109582.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"369",
                        "quantity_sold":41,
                        "quantity_comment":0
                    },
                    {
                        "itemId":101,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009171001/202091710145490A0E50F982FDB1C6032907A29DAC04636.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163389230BA6EC759A4EC34A1809D473350930D4.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/20209141633985CFF538CF4137B6CB3DCD3CAD676EECCE.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/2020914163393021A021EBAAAFAFE17DC4FABEC4CAE972F.jpg","http://image.xtep.com.cn/util/upload/product/202009141603/202091416339407CB5191485F29110EC7699284EEAB1E61.jpg"],
                        "title":"特步 女子跑鞋 20年新款 轻便时尚革面运动跑步鞋880418116529",
                        "price_membership":"169 ",
                        "quantity_sold":38,
                        "quantity_comment":0
                    },
                    {
                        "itemId":102,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141603/202091416338608014B5B77409D9815C1342DFEB7CA1D88.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/2020914154437131562FE282D6BF95742B37D1A8F9ACF70.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415443994CE5963B3870E4AF2A0C2D5944FB76FEC.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444298E659E8F64D378A3788E997474884DB56.jpg","http://image.xtep.com.cn/util/upload/product/202009141544/202091415444530BE464D662371353A3E5781F135678F64.jpg"],
                        "title":"特步 专柜款 女子跑鞋 20年新款 舒适透气百搭跑步鞋980418110990",
                        "price_membership":"299 ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":103,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234744F14C99E0E63C8916660E8334E1442E85.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152234990E8A9373CCC3CBA07E7321E8F3462D9EA.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/202091415223513300A6FB21CA2017E1B5E2127874324DBB.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/2020914152235672CD79B2FECA4C6354F4060E3EE6065FA5.jpg","http://image.xtep.com.cn/util/upload/product/202009141522/20209141522358314BC81B5CC95D89C1F23F214BD92F5DB4.jpg"],
                        "title":"特步 专柜款 男子梭织长裤 20年新款 都市运动跑步长裤980429980129",
                        "price_membership":"299",
                        "quantity_sold":47,
                        "quantity_comment":0
                    },
                    {
                        "itemId":104,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141529/20209141529213714C918187CB7A4BDAF50ED51F4255049A.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152921681CBC494FD341E27800300CA501A363209.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/20209141529218754C150B5ADAB2F42B255452EA3C3E7443.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/202091415292243AFA2350083FC982296B37D8ED8E9C3D8.jpg","http://image.xtep.com.cn/util/upload/product/202009141529/2020914152922188529C2E266A5AD246225040E45AF18D6E.jpg"],
                        "title":" 特步 专柜款 男子卫衣 20年新款 跑步运动篮球套头卫衣980429920400",
                        "price_membership":"259  ",
                        "quantity_sold":26,
                        "quantity_comment":0
                    },
                    {
                        "itemId":105,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141407/202091414733129B7EE7A36EB3BE4F472ACFC6CA74D9FA7.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733337DE91ED5577D2D164C369F0E322792F28.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414733532B2D974DE4156772AE7A0839EA5E51245.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/202091414734120AD2ECA136D4E4C6E71207AAAED21E54D.jpg","http://image.xtep.com.cn/util/upload/product/202009141407/2020914147344057AAEE176DB39387295969DB327B7FB57.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"369 ",
                        "quantity_sold":29,
                        "quantity_comment":0
                    },
                    {
                        "itemId":106,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009141356/2020914135643163DDCA933A55475A02286AC2B0B3FAFF60.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/202091413564343359ED18383F82841CD176DDFF41C869FC.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356436521D702ECA391EA3B4C1C93C8532F8E59B.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/20209141356441987645269E20C1941B305DF3265945375.jpg","http://image.xtep.com.cn/util/upload/product/202009141356/2020914135644239466F0A309C5199BE94ECA190BE7BDE18.jpg"],
                        "title":"特步 专柜款 男子针织长裤 20年新款 综合训练跑步休闲长裤980429630298",
                        "price_membership":"259 ",
                        "quantity_sold":24,
                        "quantity_comment":0
                    },
                    {
                        "itemId":107,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009111706/202091117623566D9E5BE816D8B3E2E71CFBCA5CF2B0F3.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111762745135E25A749111E2C72A172D39FFFD4A6.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111763179EB1201C293B6F4F1D0CD07C51A9EEBB0.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764132F8E78B3C092431DA679E166165EEE5AA.jpg","http://image.xtep.com.cn/util/upload/product/202009111706/20209111764399CA1AA8B5B1240ECAB98A285C64CB6063.jpg"],
                        "title":" 特步 专柜款 男子风衣 20年新款 跑步健身连帽拉链保暖风衣980429160126",
                        "price_membership":"279 ",
                        "quantity_sold":22,
                        "quantity_comment":0
                    },
                    {
                        "itemId":108,
                        "img":["http://image.xtep.com.cn/util/upload/product/202009021102/20209211250C0ED804905D1D4857A30DD21B5AE5F79.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211255488E2F1F4246D552764B10DF441415AF37.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211258010DB21B59D0ED5C73A3BFE3E898410E60.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/2020921126213FC486866E7B8BD524FFA1ED684D3896.jpg","http://image.xtep.com.cn/util/upload/product/202009021102/20209211265219AB3C1BEFED6252FEEF4F30903591AAF.jpg"],
                        "title":"【厚底减震旋】特步 专柜款 男子跑鞋 20年新款 街头潮流百搭跑步鞋980419110707",
                        "price_membership":"399 ",
                        "quantity_sold":33,
                        "quantity_comment":0
                    },
                    {
                        "itemId":109,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008311637/202083116373594566C049573E2B0A86B1451725E09BCB7.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163735873F88C1F9B802E2F8CECA356322D34ECE4.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736438DAD6932813BCA17DEFA2F268BB81AF8D.jpg","http://image.xtep.com.cn/util/upload/product/202008311637/2020831163736904A27CD86FFE8F7DA6CEF741235760F200.jpg"],
                        "title":"【驭能科技】特步 男子跑鞋 简约潮流百搭运动跑步鞋880419116612",
                        "price_membership":"399 ",
                        "quantity_sold":50,
                        "quantity_comment":0
                    },
                    {
                        "itemId":110,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/2020828101182557568DD05B7A2AB0C95A5B596578B80DC.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810118461BD207C5DC0C0BA00DB9362EEC31274F2.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/202082810119187518DE091FAC8E0C3C29BF13E7B63B26.jpg","http://image.xtep.com.cn/util/upload/product/202008281011/20208281011937844A9C429513CBEA49D2D0D72DFD0F153.jpg"],
                        "title":"特步 男子跑鞋 20年新款 轻便时尚百搭运动休闲跑步鞋880419116666",
                        "price_membership":"259 ",
                        "quantity_sold":60,
                        "quantity_comment":0
                    },
                    {
                        "itemId":111,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008281011/202082810117570E6B63D6930729327671DB6FC75A1F71F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/202082717195664294A92A35729313ACB18A3744F241E7CA.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/20208271719567823DBA375F99F406DB2EE82D697AD020F9.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171956966693F9E5D0CC1D3EAD8707626B70AFF5F.jpg","http://image.xtep.com.cn/util/upload/product/202008271719/2020827171957490C4763EB2DC7C2F07E20B52810A9DFB4B.jpg"],
                        "title":"特步 女子跑鞋 20年秋冬 革面轻便百搭运动跑步鞋880418116666",
                        "price_membership":"179 ",
                        "quantity_sold":76,
                        "quantity_comment":0
                    },
                    {
                        "itemId":112,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008261000/202082610054327026F46E97E8405CCD110474CAA7FDE55.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610054854FA8AA9B43EA0A863159AC53C2C589AD9.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100549547B4C0EE0EC824F32198A12637A78DC01.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/2020826100551985761424ED33C3F262E002AB238D7C527.jpg","http://image.xtep.com.cn/util/upload/product/202008261000/202082610055298BB1DF053DAEE404E256CB32F3AD81A77.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 轻盈运动时尚都市跑步鞋980419110807",
                        "price_membership":"169 ",
                        "quantity_sold":42,
                        "quantity_comment":0
                    },
                    {
                        "itemId":113,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008260940/202082694018400C34302A392F61E3F2F1061641F004AE.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402413DA3CFEAA7E59585C34E0CC8BA53A3DEA.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/202082694025809E7BC163D27DD51A83920E3D583E0026.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/20208269402707A72F96D7D3FCAF785D82C31E7DEB6BD8.jpg","http://image.xtep.com.cn/util/upload/product/202008260940/2020826940282905F5DCDEE097D11E71BC90C134446FAA.jpg"],
                        "title":"特步 专柜款 男子跑鞋 20年新款 时尚气垫轻便运动跑步鞋980419110720",
                        "price_membership":"299 ",
                        "quantity_sold":46,
                        "quantity_comment":0
                    },
                    {
                        "itemId":114,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251550/2020825155032728EB931299DBAC85EBBC81254B79073971.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/202082515503338314A3433AEB0506F7ED43361298686D83.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155033941557263610EEA8198D7BD68AC842012AB.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/20208251550341852C8B4097D48764768D638C5F75FA018E.jpg","http://image.xtep.com.cn/util/upload/product/202008251550/2020825155034365AD66C3E4A343E00FD7C3C7ABAF056E40.jpg"],
                        "title":"特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"339 ",
                        "quantity_sold":79,
                        "quantity_comment":0
                    },
                    {
                        "itemId":115,
                        "img":["http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652375A51A862FB9248A4B2CD5167DC0FC0800.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565278845CF22BA2C6BB11FCAC9C3990C99ACE2.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/2020825105652997AC10E0397DCFFD68AC8E46B8475EC256.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565351649FF5ABC36274DE692E4AC9C3CC243F8.jpg","http://image.xtep.com.cn/util/upload/product/202008251056/202082510565366150AC3CB1FDF1E5E66295BC883F8D1311.jpg"],
                        "title":" 特步 女子板鞋 20年新款 都市百搭跑步运动休闲鞋老爹鞋980418320715",
                        "price_membership":"299 ",
                        "quantity_sold":40,
                        "quantity_comment":0
                    },
                    
            ]
        }
    }


var server = http.createServer(createHandler);
server.listen(4003, "10.20.159.102", console.log("服务开启"));

function createHandler(_req, _res) {
    req = _req;
    res = _res;
    req.on("data", dataHandler);
    req.on("end", endHandler);
}

function dataHandler(_data) {
    data = _data + "";
}

function endHandler() {
    if(req.url.indexOf("?")>-1){
        type = req.url.split("?")[0].slice(1);
        para = Number(req.url.split("?")[1].split("=")[1]);
    }else{
        type=req.url.slice(1);
    }

    if(type.indexOf("classify_")>-1){
        var dir = type.split("_")[1];
        var page_no = Number(req.url.split("?")[1].split("=")[1]);
    }
    res.writeHead(200, {
        "content-type": "text/html;charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
    });
    
    if (req.method.toLowerCase === "get") {
        if (req.url.indexOf("?") > -1) {
            data = querystring.parse(req.url.split("?")[1]);
        }
    }

    else if (req.method.toLowerCase() === "post") {
        try {
            obj = JSON.parse(data);
        } catch{
            obj = querystring.parse(data);
        }
    }

    switch(type){
        case "register":{
            var res_msg="";
            var flag1,flag2;
            select_com("xsteper",(result)=>{
                    flag1 = result.some((item)=>{
                    return item.username === obj.username;
                })
                    flag2 = result.some((item)=>{
                    return item.tel === obj.txtmobile;
                })
            });
            if(flag1){
                res_msg += "提示：该用户名已经被注册"+" ";
                res.write(res_msg);
                res.end();
                return;
            }
            if(flag2){
                res_msg+="提示：该手机号已经被注册"+" ";
                res.write(res_msg);
                res.end();
                return;
            }
            insert_com(function(){
                res_msg+="提示：注册成功，请点击右方立即登录按钮登录";
                res.write(res_msg);
                res.end();
                return;
            });
            return;
        };
        case "login":{
            var flag3=false;
            var res_msg="";
            select_com("xsteper",(result)=>{   
                for(var i = 0;i<result.length;i++){
                    if(i===result.length-1){
                        res_msg = "提示：用户名或密码错误";
                        res.write(res_msg);
                        res.end();
                        return;
                    }
                   if((result[i].username===obj.txtName)&&(result[i].password===obj.txtPassword)){                                     
                        res_msg = "登录成功";
                        res.write(res_msg);
                        res.end();
                        return;
                   }                   
                }
            });
        };
        case "classify_run":{
            var arr_json=[];
            var max_num = (page_no===Math.ceil(data_home.goodsItem_classify[dir].length/20))?data_home.goodsItem_classify[dir].length:page_no*20;
            for(var i = 20*(page_no-1);i<max_num;i++){
                arr_json.push(data_home.goodsItem_classify[dir][i]);
            }
            var total_length = data_home.goodsItem_classify[dir].length;
            var res_all=[];
            res_all.push(total_length,arr_json);
            res.write(JSON.stringify(res_all));
            res.end();
            return;
        };
        case "detail" :{
            res.write(JSON.stringify(data_home.goodsItem_classify.run.filter((item)=>{
                return item.itemId === para;
            }))) ;
            res.end()
            return;
        };
        case "checkout" :{
            let obj = data_home.goodsItem_classify.run.filter((item)=>{
                return item.itemId === para;
            })[0];
            if(!arr_checkout.includes(obj)) arr_checkout.unshift(obj);
            res.write(JSON.stringify(arr_checkout)) ;
            res.end()
            return;
        }
    };
}
   
function select_com(table,callback) {
    let sql = "SELECT * FROM "+" "+table;
    return con.query(sql, function (err, result) {
        if (err) {
        console.error("查询操作失败");
        return  ;
        }
        callback(result);
    })
}

function insert_com(callback){
    let sql="INSERT INTO `xsteper`(`username`, `password`, `tel`) VALUES (?,?,?)";
    con.query(sql,[obj.username,obj.password,obj.txtmobile],function(error,result){
        if(error){
            console.log("插入操作失败");
            return;
        }
    })
    callback();
}
