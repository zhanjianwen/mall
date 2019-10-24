<template>
  <div class="page category">
    <div class="header-menu">
      <van-nav-bar title="分类" left-arrow>
        <van-icon style="font-size:24px" name="search" slot="right" />
      </van-nav-bar>
    </div>
    <buttom-menu></buttom-menu>
    <div class="page-content">

      <div class="category-types">
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for="(item, index) in goods" class="menu-item" :key="index" :class="{'current':currentIndex === index}" @click="selectMenu(index, $event)">
              <span class="text">
                {{item.category_name}}
                <!-- v-show="item.type>0" -->
                <!-- <span class="icon" :class="classMap[item.type]"></span> -->
              </span>
            </li>
          </ul>
        </div>
        <div class="category-wrapper" ref="categoryWrapper">
          <ul>
            <li v-for="(item,index) in goods" class="category-list category-list-hook" :key="index">
              <!-- <h1 class="title">{{item}}</h1> -->
              <ul>
                <!-- class="category-item" -->
                <li v-for="(categorys,i) in item.category_list" :key="i" @click="selectFood(categorys, $event)">
                  <span>{{categorys.category_name}}</span>
                  <div v-for="(category,z) in categorys.body.items" :key="z">
                    <img v-if="category.w>0" :src="category.img_url" :style="{width:category.w/2+'px',height:category.h/2+'px'}" />
                  </div>
                  <van-divider v-if="categorys.body.category_name!=''" contentPosition="center">{{categorys.body.category_name}}</van-divider>
                  <van-grid v-if="categorys.is_show==''" :column-num="3" icon-size="52" square :border="false">
                    <van-grid-item :icon="category.img_url" v-for="(category,z) in categorys.body.items" :key="z" :text="category.product_name" />
                  </van-grid>
                  <!-- <img v-if="category.w>0" :src="category.img_url" :style="{width:category.w/2+'px',height:category.h/2+'px'}" />
                  <van-grid column-num="3" border="{{ false }}">
                    <van-grid-item use-slot wx:for="{{ 3 }}" wx:for-item="index">
                      <image style="width: 100%; height: 90px;" src="https://img.yzcdn.cn/vant/apple-{{ index + 1 }}.jpg" />
                    </van-grid-item>
                  </van-grid>

                  <div v-for="(category,z) in categorys.body.items" :key="z">
                 
                    <span v-else>
                      <van-grid-item :icon="category.img_url" :text="category.product_name" />
                    </span></div> -->
                  <!-- <div class="content">
                    <div class="name">{{category.body.category_name}}</div>
                  </div> -->
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style  lang="stylus" scoped>
.category {
  background-color: #fff;
  color: black;

  .category-types {
    display: flex;
    position: absolute;
    width: 100%;
    top: 0px;
    bottom: 0px;
    overflow: hidden;
  }

  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    font-size: 12px;
  }

  .menu-item {
    display: table;
    // width: 56px;
    height: 54px;
    line-height: 14px;
    padding: 0 6px;
  }

  .current {
    color: #fb7d34;
    transform: scale(1);
  }

  // .icon {
  // display: inline-block;
  // width: 12px;
  // height: 12px;
  // vertical-align: top;
  // margin-right: 4px;
  // background-size: 12px 12px;
  // background-repeat: no-repeat;
  // }
  .text {
    display: table-cell;
    width: 56px;
    vertical-align: middle;
    font-size: 12px;
    text-align: center;
  }

  .category-wrapper {
    flex: 1;
  }

  .category-list .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    border-left: 2px solid #d9dde1;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
  }

  .category-list .category-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
  }

  .category-item:last-child {
    border-none();
    margin-bottom: 0px;
  }

  .category-item .icon {
    flex: 0 0 57px;
    margin-right: 10px;
  }

  .category-item .content {
    flex: 1;
  }

  .category-item .name {
    margin: 2px 0 8px 0;
    font-size: 14px;
    line-height: 14px;
    height: 14px;
    color: rgb(7, 17, 27);
  }

  .desc, .extra {
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
  }

  .desc {
    margin-bottom: 8px;
    line-height: 12px;
  }

  .extra .count {
    margin-right: 12px;
  }

  .price {
    font-weight: 700px;
    line-height: 24px;
  }

  .now {
    margin-right: 8px;
    font-size: 14px;
    color: rgb(240, 20, 20);
  }

  .old {
    font-size: 10px;
    color: rgb(147, 153, 159);
    text-decoration: line-through;
  }

  .cartControl-wrapper {
    position: absolute;
    right: 0;
    bottom: 12px;
  }
}
</style>
<style lang="stylus">
.category {
  .van-icon-arrow-left {
    font-size: 24px;
  }

  .van-icon-search {
    font-size: 24px;
  }
}
</style>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import BScroll from "better-scroll"
import buttomMenu from "@/components/buttom-menu.vue"
import datas from "./data.json"
@Component({
  name: "category",
  components: {
    buttomMenu
  }
})
export default class extends Vue {
  private goods = []
  private listHeight: any = []
  private scrolly = 0
  private selectedFood = {}
  private classMap = ["decrease", "discount", "special", "invoice", "guarantee"]
  private foodScroll: any = null
  private menuScroll = null
  private mounted() {
    this._initScroll()
  }
  get currentIndex() {
    for (let i = 0; i < this.listHeight.length; i++) {
      let height = this.listHeight[i]
      let height2 = this.listHeight[i + 1]
      if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
        return i
      }
    }
    return 0
  }
  get selectFoods() {
    let foods: any = []
    this.goods.forEach((good: any) => {
      good.foods.forEach((food: any) => {
        if (food.count) {
          foods.push(food)
        }
      })
    })
    return foods
  }
  private created() {
    this.goods = datas
    this.$nextTick(() => {
      this._initScroll()
      this._calculateHeight()
    })
  }
  private _initScroll() {
    this.menuScroll = new BScroll(this.$refs.menuWrapper, {
      click: true
    })
    this.foodScroll = new BScroll(this.$refs.categoryWrapper, {
      probeType: 3,
      click: true
    })
    this.foodScroll.on("scroll", (pos: any) => {
      this.scrolly = Math.abs(Math.round(pos.y))
    })
  }
  private _calculateHeight() {
    const el: any = this.$refs.categoryWrapper
    let foodList = el.getElementsByClassName("category-list-hook")
    let height = 0
    this.listHeight.push(height)
    for (let i = 0; i < foodList.length; i++) {
      let item = foodList[i]
      height += item.clientHeight
      this.listHeight.push(height)
    }
  }
  private selectMenu(index: any, event: any) {
    const refs: any = this.$refs.categoryWrapper
    let foodList = refs.getElementsByClassName("category-list-hook")
    let el = foodList[index]
    if (!event._constructed) {
      // 去掉自带click事件的点击
      return
    }
    this.foodScroll.scrollToElement(el, 300)
  }
  // private selectFood(food, event) {
  //   if (!event._constructed) {
  //     // 去掉自带click事件的点击
  //     return
  //   }
  //   this.selectedFood = food
  //   this.$refs.food.show()
  // }
  // private incrementTotal(target) {
  //   this.$refs.shopCart.drop(target)
  // }
}
</script>