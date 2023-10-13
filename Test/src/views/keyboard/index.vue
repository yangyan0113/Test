<template>
  <div class="app-container home">
    <p>{{title}}</p>
    <div class="spanTitle" v-for="(v,k) in pinyin" :key="k">
      <span class="span1">{{pinyin[k]}}</span>
      <div class="span2">{{hanziletter[k]}}</div>
      <div class="span3">
        <el-input type="text" v-model="chineseForm.text" @change="handleInputChange"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { pinyin } from 'pinyin-pro'

export default {
  name: 'third', //中文练习
  data() {
    return {
      inputValues: '',
      chineseForm: {
        text: '',
      },
      title: '中文文章练习',
      hanzi: '',
      hanziletter: [],
      pinyin: [],
      // 版本号
      version: '',
    }
  },
  created() {
    this.changeChinese()
  },
  methods: {
    handleInputChange() {
      console.log('input=' + this.chineseForm.text)
    },
    changeChinese() {
      this.hanzi = `当雷云在天上轰响，六月的阵雨落下的时候，湿润的东风走过荒野，在竹林中吹着口笛。\n于是，一群一群的花从无人知道的地方突然跑出来，
        在绿草上跳舞，狂欢。妈妈，我真的觉得那些花朵是在地下的学校里上学。\n`

      this.hanziletter = this.hanzi.split('')
      this.pinyin = pinyin(this.hanzi, { type: 'array' })
    },
  },
}
</script>

<style scoped lang="scss">
.spanTitle {
  width: 40px;
  height: 20px;
  text-align: center;
  margin-top: 3px;
  margin-left: 3px;
  color: black;
  display: inline-block;
  margin: 0 0 70px 0;
  position: relative;
}

.span2 {
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
  text-align: center;
}

.span3 {
  position: absolute;
  bottom: -59px;
  left: 0;
  width: 72%;
  margin: 0 14%;
  text-align: center;
}
</style>
