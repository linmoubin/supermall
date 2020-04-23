
<template>
   <div class="tab-bar-item" @click="itemClick">
     <div v-if="!isActive"><slot name="item-icon"></slot></div>
     <div v-else><slot name="item-icon-active"></slot></div>
     <div :style="activeStyle"><slot name="item-text"></slot></div>
     <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
          <div>首页</div> -->
   </div>
   <!-- <div class="tab-bar-item">
        <img src="../../assets/img/tabbar/home.svg" alt="">
        分类
   </div>
   <div class="tab-bar-item">
        <img src="../../assets/img/tabbar/home.svg" alt="">
        购物车
   </div>
   <div class="tab-bar-item">
        <img src="../../assets/img/tabbar/home.svg" alt="">
        我的
    </div> -->
</template>

<script>
export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor:  {
        type: String, //决定传进去的是什么类型
        default: 'red' //没有传的时候默认是虹色
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive(){
        return this.$route.path.indexOf(this.path) !==-1
        // this.$router.path 拿到当前活跃的path 
        // 然后和 this。path对比 一样就是1 
        // 不一样就是-1然后就是false 那么就可以确定哪一个应该变红了哪一个不红
        // 就是indexof 查找某一个字符或者字符串的位置有就
        // 是字符串的位置没有就是-1  输入字符串就查找字符串中第一个在该字符串的位置
     },
     activeStyle() {
       return this.isActive ? {color:this.activeColor} : {}
     }
    },
    methods:{
      itemClick() {
        this.$router.replace(this.path) 
      }
    },
}

</script>

<style scoped>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>