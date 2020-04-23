<!--  -->
<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <CartListItem 
      v-for="(item, index) in cartList" 
      :key="index" 
      :product="item"/>
    <!-- <li v-for="(item, aaa) in cartList" :key="aaa">{{item}}</li> -->
    </Scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import CartListItem from './CartListItem'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  computed: { 
    ...mapGetters(['cartLength', 'cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}

</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }

  .content {
    height: 100%;
    overflow: hidden;
  }
</style>