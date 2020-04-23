import {request} from './request.js'

export function getDetail(iid){
   return request({
        url:'/detail',
        params:{
            iid
        }
    });
}

//用商品推荐接口请求
export function getRecommend(){
    return request({
        url:'/recommend'
    });
}

//将服务器返回的杂乱数据整合; 抽离数据
//基本信息数据
export class Goods{
  constructor(itemInfo,columns,services){
      this.title=itemInfo.title
      this.desc=itemInfo.desc
      this.newPrice=itemInfo.price
      this.realPrice=itemInfo.lowNowPrice
      this.oldPrice=itemInfo.oldPrice
     this.discountDesc=itemInfo.discountDesc
      this.shopInfo=services
      this.columns=columns
      this.realPrice = itemInfo.lowNowPrice
  }
}

//店铺信息数据

export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}



// 商品图片详细信息

export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}