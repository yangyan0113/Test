<template>
  <div class="divBody">
    <div class="divTitle">
      <span class="spanTitle leftTitle" @click="again">重打</span>
      <span class="spanTitle centerTitle">{{form.title}}</span>
      <span class="spanTitle rightTitle" @click="prev">返回</span>
      <span class="spanTitle rightTitle" style="color:green" @click="showImage">查看键盘手势位置示意图</span>
    </div>
    <div class="hint">
      {{showHintTitle}}
      <span class="spanContent" v-show="isShowContent">{{showContent}}</span>
    </div>
    <div class="keyLine">
      <line-one :keyboardLine="form.rowNum"/>
      <line-two :keyboardLine="form.rowNum"/>
      <line-three :keyboardLine="form.rowNum"/>
      <line-four :keyboardLine="form.rowNum"/>
      <line-five :keyboardLine="form.rowNum"/>
    </div>
    <div class="keyLine" style=" margin: 15px;">
      <span>{{spendTime}}</span>
    </div>
  </div>
</template>

<script>
import LineOne from './one.vue'
import LineTwo from './two.vue'
import LineThree from './three.vue'
import LineFour from './four.vue'
import LineFive from './five.vue'
import { formatMsTime } from '@/utils/index'
import { getcekeyboard } from '@/api/exercise/ceKeyboard.js'
import { addCeKeyboardLog } from '@/api/exercise/ceKeyboardLog.js'
import { parse } from 'querystring'

export default {
  name: 'study',
  components: {
    LineOne,
    LineTwo,
    LineThree,
    LineFour,
    LineFive,
  },
  data() {
    return {
      form: {},         //文章详情
      logForm: {},      //记录表数据集合
      timer: 0,
      timeValue:0,
      spendTime: '',    //格式化的学习时长
      keyboardId: '',     //文章主键
      count: 0,         //当前输入的字符索引
      asciiCode: null,  //字符对应的ascii值
      showContent: '',  //文章内容（需要键盘输入的内容）
      hintTitle: '',    //提示信息
      showHintTitle: '',   //完整的提示信息
      isShowContent: true, //文章内容，是否显示
    }
  },
  created() {
    this.keyboardId = this.$route.query.keyboardId
    getcekeyboard(this.keyboardId).then((res) => {
      const { code, data } = res
      if (code == 200) {
        console.log(JSON.stringify(data))
        this.form = { ...data }
        this.initData()
      }
    })
  },
  mounted() {
    this.keyDown()
  },
  methods: {
    //初始化数据
    initData() {
      this.count = 0
      this.timer = 0
      this.timeValue = 0
      this.spendTime = ''
      this.isShowContent = true
 
      this.showInitData()
    }, 
    showInitData() {
      this.showContent = this.form.content.split(',')[this.count]
      this.hintTitle = this.form.hint.split(',')[this.count]
      this.asciiCode = this.showContent.charCodeAt() //获取字符对应的ASCII值
      this.showHintTitle = `使用 ${this.hintTitle} 输入按键`
      this.spendTime = formatMsTime(this.timeValue)
    },
    //返回
    prev() {
      this.$router.back()
    },
    //重打
    again() {
      this.initData()
    },
    //查看键盘手势位置示意图
    showImage() {
      console.log('查看键盘手势位置示意图')
    },
    //监听键盘
    keyDown() {
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        if (e1) {
          if (e1 && this.count == 0) {
            this.timer = setInterval(() => { 
              this.timeValue++  
              this.spendTime = formatMsTime(this.timeValue)
            }, 1000)
          }
          if (e1 && e1.keyCode == this.asciiCode) {
            this.count++
            this.showInitData()
          }

          if (this.count == this.form.content.split(',').length - 1) {
            this.spendTime = `学习时长：${formatMsTime(this.timeValue)}`
            this.logForm = {
              keyboardId: this.keyboardId,
              spendTime: this.timeValue,
            }
            //新增学习记录
            addCeKeyboardLog(this.logForm)
              .then((res) => {
                clearInterval(this.timer)
                this.showHintTitle = '恭喜：此节课程学习完毕！'
                this.isShowContent = false 
                this.hintTitle = ''
                this.showContent = ''
                this.asciiCode = null
              })
              .catch((err) => {
                console.log(JSON.stringify(err))
              })
          }
        }
      }
    },
  },
}
</script>

<style scoped lang="scss">
.divBody {
  height: 100%;
  color: white;
  background-color: black;
}

.divTitle {
  height: 40px;
  text-align: center;
}

.spanTitle {
  font-size: 18px;
  margin-top: 10px;
}

.leftTitle {
  color: blue;
  float: left;
  margin-left: 20px;
}

.centerTitle {
  color: green;
}

.rightTitle {
  color: blue;
  float: right;
  margin-right: 20px;
}

.hint {
  height: 50px;
  margin-top: 10px;
  margin-left: 150px;
  margin-bottom: 10px;
  font-size: 18px;
}

.spanContent {
  width: 40px;
  height: 30px;
  text-align: center;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;
  background-color: white;
  border: 1px solid white;
  color: black;
  box-shadow: 0px 5px 10px #888888;
  display: -moz-inline-box;
  display: inline-block;
}

.keyLine {
  text-align: center;
}
</style>