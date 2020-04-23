<!--  -->
<template>
  <div id='home'>
  <nav-bar class="home-nav">
    <div slot="center">购物街</div>
  </nav-bar> 

  <tab-control 
               :titles="['流行', '新款', '精选']"
               @tabClick= "tabClick"
               ref="tabControl1"
               class="tab-control"
               v-show="isTabFixed"
               />
  
  <Scroll class="content" 
  ref="scroll" 
  :probe-type="3" 
  @scroll="contentScroll"
  :pull-up-load="true"
  @pullingUp="loadMore"
  >
  <HomeSwipers :banners="banners" @swiperImageLoad='swiperImageLoad'/>
  <RecommendView :recommends="recommends" />
  <feature-view />
  <tab-control 
               :titles="['流行', '新款', '精选']"
               @tabClick= "tabClick"
               ref="tabControl2"
               class="tab-control"
               />
               
  <GoodsList :goods="showGoods"></GoodsList>
  </Scroll>
  <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
import HomeSwipers from './ChildComps/HomeSwipers'
import RecommendView from './ChildComps/RecommendView'
import FeatureView from './ChildComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
// import BackTop from 'components/content/backTop/BackTop'


import {getHomeMultidata, getHomeGoods} from 'network/home.js'
import {itemListenerMixin, backTopMixin} from 'common/mixin' 


export default {
  name: "Home",
  components: {
    HomeSwipers,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    // BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page:0, list:[]},
        'new': {page:0, list:[]},
        'sell': {page:0, list:[]},
      },
      currentType: 'pop',
      // isShowBackTop: false,
      topOffsetTop: 0,
      isTabFixed: false,
      savaY: 0,
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")

    
  },
  
  // 分类跳首页
  activated() {
    this.$refs.scroll.scrollTo(0,this.savaY , 0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.savaY = this.$refs.scroll.getScrollY()

    this.$bus.$off('itemImageLoad')
  },
  // destroy() {
  //   console.log(123);
    
  // },


  mounted() {
    // 图片加载完成时的时间监听
 
    
  },
  methods: {
    // 时间监听相关的方法
    tabClick(index) {
      switch (index) {
        case 0 : this.currentType = 'pop'
        break;
        case 1 : this.currentType = 'new'
        break;
        case 2 : this.currentType = 'sell'
        break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0)
    // },
    contentScroll(position){
      //判断 backtop是否显示
      this.isShowBackTop = (-position.y) > 1000

      //决定tabcontrol是否吸顶
      // this.isTabFixed = (-position.y) > this.topOffsetTop
      this.listenerShowBackTop(position)
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 获得topcontrol的offsettop        
    this.topOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    // console.log(this.$refs.topControl.$el)
    },

    // 下面是网络请求相关的代码
    getHomeMultidata(){
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
       getHomeGoods(type , page).then(res => {
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
      this.$refs.scroll.scroll.finishPullUp();
    })
    }
  }
}

</script>

<style scoped>
  #home {
    padding-top: 0px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
  
  /* .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 30px;
  } */
</style>