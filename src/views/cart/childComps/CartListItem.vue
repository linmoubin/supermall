<!--  -->
<template>
   <div id="shop-item">
    <div class="item-selector">
      <CheckButton :isChecked="product.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">商品描述: {{product.dex}}</div>
      <div class="info-bottom">
        <div class="item-price left">¥{{product.price}}</div>
        <div class="item-count right">
          <!-- <span class="btn-l" @click="desCartList">-</span> -->
          {{product.count}}
          <!-- <span class="btn-r" @click="addCartList">+</span> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    }
  },
  methods: {
    checkedChange() {
      this.cartList.checked = !this.cartList.checked;
    },
    addCartList() {
      this.$store.dispatch('addCartListCount', this.product);
    },
    desCartList() {
      this.$store.dispatch('desCartListCount', this.product);
      // {
      //   type: "desCartListCount",
      //   cartList: this.cartList
      // }
    },
    checkClick() {
      this.product.checked = !this.product.checked
      
    }
  }
}

</script>

<style scoped>
  #shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding:  5px;
  border-bottom: 1px solid #ccc;
  }

  .item-selector {
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img img {
      width: 80px;
      height: 100px;
      display: block;
      border-radius: 5px;
    }

  
  .item-info {
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }

  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }

    .info-bottom {
      margin-top: 10px;
      position: relative;
      bottom: 10px;
      left: 10px;
      right: 10px;
    }
    
    .info-bottom .item-price{
      color: orangered;
    }
    

      .item-price {
        position: absolute;
        left: 0;
        top: 15px;
      }

      .item-count {
        position: absolute;
        right: 5%;
        top: 18px;
      }
    
    .item-title,
    .item-desc {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    span {
      width: 20px;
      height: 20px;
      padding: 3px 6px 3px;
      margin: 0 5px;
      text-align: center;
      border: 1px solid #e5e5e5;
      box-shadow: 1px 4px 4px #fff;
    }

    .btn-l {
      padding: 3px 8px 3px;
    }



</style>