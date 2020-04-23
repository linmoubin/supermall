<template>
  <div id="tab-bar">
    <slot></slot>
      <!-- <div class="tab-bar-item">
        <img src="../../assets/img/tabbar/home.svg" alt="">
        首页
      </div>
      <div class="tab-bar-item">
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
      </div>
    </div> -->
    <!-- 然后现在 tabbar里面的内容的东西 交给插槽就不会特别乱 -->
  </div> 
</template>


<script>
export default {
  name: 'TabBar'
}

</script>
<style>
#tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgb(100, 100, 100, .1);
  }
   
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }

  .tab-bar-item img{
    width: 24px;
    height: 24px;
  } 
  /* 把这个再抽一个组件 */
</style>