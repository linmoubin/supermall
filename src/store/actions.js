export default {
  addCart(context, playload) {
    return new Promise((resolve) => {
      let oldPruduct = context.state.cartList.find(item => item.iid === playload.iid);
    // for(let item of context.state.cartList){
    //   oldPruduct = item;
    // }
    if(oldPruduct)  {
      context.commit('addCounter', oldPruduct)
      resolve()
    }else {
      playload.count = 1
      context.commit('addTocart', playload)
      resolve()
    }

  })

  },


  desCartListCount(context, playload){
    context.commit('desCartListCount', playload)
  },
  addCartListCount(context, playload){
    context.commit('addCartListCount', playload)
    }



}