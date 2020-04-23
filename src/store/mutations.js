export default  {
  addCounter(state, playload){
    playload.count++
  },
  addTocart(state, playload){
    playload.checked = true
    state.cartList.push(playload)
  },
  addCartListCount(state, playload){
    playload.count++
    console.log(playload.count);
  },
  desCartListCount(state, playload){
    if(playload.count > 1){
    playload.count--
  }
    console.log(playload.count);
  },
}