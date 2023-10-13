<template>
  <div class="app-container home">
    <h4>{{title}}</h4>
    <div>
      <!-- <p>{{content}}</p> -->
      <el-button
        type="primary"
        plain
        icon="el-icon-plus"
        size="mini"
        @click="handleAdd"
        v-hasPermi="['exercise:cekeyboardlog:add']"
      >新增</el-button>
    </div>
    <div class="spanTitle" v-for="(v,k) in pinyin" :key="k">
      <span class="span1">{{pinyin[k]}}</span>
      <div class="span2">{{chinese[k]}}</div>
      <div class="span3">
        <el-input type="text" v-model="chineseForm.text" @change="handleInputChange"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { pinyin } from 'pinyin-pro'
import { getcekeyboard } from '@/api/exercise/ceKeyboard.js'
import { addCeKeyboardLog } from '@/api/exercise/ceKeyboardLog.js'

export default {
  name: 'chinese-detail',
  data() {
    return {
      title: '',
      content: '',
      chineseForm: {
        text: '',
      },
      chinese: [],
      pinyin: [],
    }
  },
  created() {
    this.keyboardId = this.$route.query.keyboardId
    getcekeyboard(this.keyboardId).then((res) => {
      const { code, data } = res
      if (code == 200) {
        //console.log(JSON.stringify(data));
        this.title = data.title
        this.content = data.content

        //    this.chinese=`当雷云在天上轰响，六月的阵雨落下的时候，湿润的东风走过荒野，在竹林中吹着口笛。\n于是，一群一群的花从无人知道的地方突然跑出来，
        // 在绿草上跳舞，狂欢。妈妈，我真的觉得那些花朵是在地下的学校里上学。\n`;

        this.chinese = this.content
        this.pinyin = pinyin(this.chinese, { type: 'array' })
      }
    })
  },
  methods: {
    handleAdd() {
      this.logForm = {
        keyboardId: this.keyboardId,
        spendTime: 4,
      }
      //新增学习记录
      addCeKeyboardLog(this.logForm)
        .then((res) => {
          console.log('恭喜：此节课程学习完毕！')
        })
        .catch((err) => {
          console.log(JSON.stringify(err))
        })
    },
    handleInputChange() {
      console.log('input=' + this.chineseForm.text)
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
