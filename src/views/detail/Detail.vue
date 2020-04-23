<!--  -->
<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick='titleClick' ref="nav"/>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
    <DetailSwiper :topImages="topImages"/>
    <detail-base-info  :goods='goods'  />
    <detail-shop-info  :shop='shop'/>
    <DetailGoodsInfo :detailInfo='detailInfo' @detailImageLoad="imageLoad"/>
    <DetailParamInfo :paramInfo='paramInfo' ref="param" />
    <DetailCommentInfo :commentInfo='commentInfo' ref="comment"/>
    <GoodsList :goods='recommends' ref="recommend"/>
    </Scroll>
    
    <!-- <Toast><div>哈哈哈哈哈</div></Toast> -->
    <DetailBottonBar @addToCart='addToCartl'/>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import DetailNavBar from 'views/detail/childComps/DetailNavBar'
import DetailSwiper from 'views/detail/childComps/DetailSwiper'
import DetailBaseInfo from 'views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from 'views/detail/childComps/DetailShopInfo'
import DetailGoodsInfo from 'views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from 'views/detail/childComps/DetailParamInfo'
import DetailCommentInfo from 'views/detail/childComps/DetailCommentInfo'
import DetailBottonBar from 'views/detail/childComps/DetailBottonBar'



import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {itemListenerMixin, backTopMixin} from 'common/mixin' 
import {debounce} from 'common/utils'


export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottonBar,
    // Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,  
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    //保存iid
    this.iid = this.$route.params.iid
    
    //根据iid 获取相应的数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);   
      this.shop = new Shop(data.shopInfo)
      this.detailInfo = data.detailInfo
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //取出评论信息 因为有些信息是没有评论的 所以要做一层判断
      if(data.rate.cRate !== 0){
      this.commentInfo = data.rate.list[0]
      
      }

    //   this.$nextTick(() => {
    //     this.themeTopYs = []
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
    //   })

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
    this.themeTopYs.push(0)
    this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    })
    })


    //请求推荐数据 要写另外一个
    getRecommend().then(res => {
      this.recommends = res.data.list
      
    })
  },
  methods:{
    imageLoad() {
      this.itemListenerMixin
      //其实可以把 detail的那个 if删掉了 效果是一样的但是这个结构更好
      // this.$refs.scroll.refresh()

    // this.themeTopYs = []
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)

     this.getThemeTopY() 
      

    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      // this.$refs.scroll.scrollTo(0, -1000 , 0)
      // console.log(this.$refs.scroll.scrollTop);
      
      
      // this.$refs.scroll.scrollTo(0, -1000 , 0)
      
  },
  contentScroll(position) {
    const positionY = -position.y
    let length = this.themeTopYs.length
    // for(let i in this.themeTopYs){
      for(let i = 0; i < length; i++){
      i * 1    
      if(this.currentIndex !==i && ((i < length - 1 && positionY >= this.themeTopYs[i]
      && positionY < this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this
      .themeTopYs[i]))){
      this.currentIndex = i;
      this.$refs.nav.currentIndex = this.currentIndex
      }
      this.listenerShowBackTop(position)
    }
  },
    addToCartl() {
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.dex = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid
      product.count = this.count
      // this.$store.commit('addCart', product) 
      this.$store.dispatch('addCart', product).then(() => {
        
        this.$toast.show('添加商品成功', 1500)
        // console.log(this.$toast);
        
        
        
      })

    }
  },
  mounted() {
    // 图片加载完成时的时间监听
    // this.themeTopYs.push(0),
    // this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs)
    // console.log(this.$refs.comment.$el.offsetTop)
    },
    updated() {
      // console.log(this.$refs.comment.$el.offsetTop)
    },
  destroyed() {
    this.$bus.$off('itemImageLoad')
  },
}

</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content { 
    height: calc(100% - 44px - 49px);
  }

</style>