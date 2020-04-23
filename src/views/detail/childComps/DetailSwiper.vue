<!--  -->
<template>
    <Swiper class="detail-swipper">
      <SwiperItem v-for="(item, aaa) in topImages" :key="aaa">
        <img :src="item" alt=""> 
      </SwiperItem>
    </Swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array, 
      default() {
        return []
      }
    }
  },
  mounted() {
  }
}

</script>

<style scoped>
.detail-swipper {
  height: 300px;
  overflow: hidden;
}
</style>