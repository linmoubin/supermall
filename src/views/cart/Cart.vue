<!--  -->
<template>
  <div class="cart">
    <!-- //导航 -->
  <NavBar class="nav-bar">
    <div slot="center">购物车({{this.$store.state.cartList.length}})</div>
  </NavBar>


<!-- 列表 -->
    <CartList />

    <CartBottonBar />
    
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList' 
import CartBottonBar from './childComps/CartBottonBar'

import {mapGetters} from 'vuex'

export default {
  name:"Cart",
  data() {
    return {
      aaa: 5555666789,
    }
  },
  components:{
    NavBar,
    CartList,
    CartBottonBar
  },
  computed: {
    ...mapGetters(['cartLength', 'cartList'])
  }
}

</script> 


<style scoped>
 .cart {
   height: 100vh;
 }

 .nav-bar {
   background-color: var(--color-tint);
   color: #fff;
   font-weight: 700;
 }
</style>