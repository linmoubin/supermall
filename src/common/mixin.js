import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'


export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      refresh: null
    }
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImageListener = () => { 
      this.refresh()
    }
    this.$bus.$on('itemImageLoad', () => this.itemImageListener)
  },
  
}


export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,   
    } 
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    listenerShowBackTop(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  },
  
}

