<template>
  <div class="divBody">
    <div class="divTitle">
      <span class="spanTitle leftTitle" @click="again">重打</span>
      <span class="spanTitle centerTitle">{{form.title}}</span>
      <span class="spanTitle rightTitle" @click="prev">返回</span>
    </div>
    <div class="hint">{{showHintTitle}}</div>
    <div class="keyLine" v-show="isShowContent">
      <span v-for="(v,k) in hintTitle" class="hintLetter">{{v}}</span>
    </div>
    <div class="keyLine">
      <div v-for="(c,i) in keycount" :key="i" :class="'line'+c">
        <span v-for="(v,k) in keydata[i].split('#')" :key="k" :class="'key'+c">{{v}}</span>
      </div>
    </div>
    <div class="keyLine" style=" margin: 15px;">
      <span>{{spendTime}}</span>
    </div>
  </div>
</template>
<script>
import { formatMsTime } from '@/utils/index'
import { getcekeyboard } from '@/api/exercise/ceKeyboard.js'
import { addCeKeyboardLog } from '@/api/exercise/ceKeyboardLog.js'

export default {
  name: 'practice',
  data() {
    return {
      form: {}, //文章详情
      logForm: {}, //记录表数据集合
      timer: 0,
      timeValue: 0,
      spendTime: '',
      showHintTitle: '', //提示信息
      isShowContent: true, //文章内容，是否显示
      letters: [],
      letterCount: 0, //文章内容行索引（截取后每行索引）
      hintTitle: [],
      hintTitleCount: 0, //每个字母的索引(用来判断，用户输入的字母是否等于当前页面显示字母)
      hintLetter: '', //显示的字母，即当前用户需要键入的字母
      keyboardId: '', //文章主键
      keycount: 5, //键盘位置显示总行数
      //每个键盘位置上显示的信息
      keydata: [
        '`#1#2#3#4#5#6#7#8#9#0#-#=#Del',
        'Tab#Q#W#E#R#T#Y#U#I#O#P#[#]#\\',
        "Caps#A#S#D#F#G#H#J#K#L#;#'#Enter",
        'Shift#Z#X#C#V#B#N#M#,#.#/#Shift',
        'Ctrl#Alt#Space#Alt#Ctrl',
      ],
      asciiCode: null, //字符对应的ascii值
    }
  },
  created() {
    this.keyboardId = this.$route.query.keyboardId
    if (this.keyboardId) {
      //获取详细信息
      getcekeyboard(this.keyboardId).then((res) => {
        const { code, data } = res
        if (code == 200) {
          //console.log(JSON.stringify(data))
          this.form = { ...data }
          this.initData()
          this.resetData()
        }
      })
    }
  },
  mounted() {
    this.keyDown()
  },
  methods: {
    //初始化数据
    initData() {
      this.timer = 0
      this.timeValue = 0
      this.letterCount = 0
      this.hintTitleCount = 0
      this.asciiCode = null
    },
    //重置数据
    resetData() {
      this.isShowContent = true
      this.letters = this.form.content.split('#')
      this.hintTitle = this.letters[this.letterCount].split(',')
      this.hintLetter = this.hintTitle[this.hintTitleCount].charAt(0)
      this.asciiCode = this.hintLetter.charCodeAt() //获取字符对应的ASCII值
      this.spendTime = formatMsTime(this.timeValue)
      this.showHintTitle = this.form.hint
    },
    //返回
    prev() {
      this.$router.back()
    },
    //重打
    again() {
      this.spendTime = ''
      this.initData()
      this.resetData()
      clearInterval(this.timer)
    },
    // 监听键盘
    keyDown() {
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        if (e1) {
          if (e1 && this.letterCount == 0 && this.hintTitleCount == 0) {
            this.timer = setInterval(() => {
              this.timeValue++
              this.spendTime = formatMsTime(this.timeValue)
            }, 1000)
          }

          if (this.hintTitleCount == this.hintTitle.length - 1) {
            if (this.letterCount == this.letters.length - 1) {
              this.spendTime = `学习时长：${formatMsTime(this.timeValue)}`
              this.logForm = {
                keyboardId: this.keyboardId,
                spendTime: this.timeValue,
              }
              //新增学习记录
              addCeKeyboardLog(this.logForm)
                .then((res) => {
                  clearInterval(this.timer)
                  this.showHintTitle = '恭喜：此节课程练习完毕！'
                  this.initData()
                  this.isShowContent = false
                })
                .catch((err) => {
                  console.log(JSON.stringify(err))
                })
            } else {
              this.letterCount++
              this.hintTitleCount = 0
              this.resetData()
            }
          } 
          else if (e1.keyCode == this.asciiCode) {
            this.hintTitleCount++
            this.hintLetter = this.hintTitle[this.hintTitleCount].charAt(0)
            this.asciiCode = this.hintLetter.charCodeAt() //获取字符对应的ASCII值
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

.hintLetter {
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

.hintLetter {
  width: 40px;
  height: 30px;
  text-align: center;
  margin: 10px;
  border-radius: 2px; /* 4. 设置边框圆角 */
  background-color: white;
  border: 1px solid white; /* 1. 设置边框的宽度、样式和颜色 */
  color: black;
  box-shadow: 0px 5px 10px #888888; //设置阴影
  display: -moz-inline-box; /* css注释：for ff2 */
  display: inline-block;
}

.keyLine {
  text-align: center;
}

.key1 {
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;
  border: 1px solid white;
  display: -moz-inline-box;
  display: inline-block;
}

.key2 {
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;
  border: 1px solid white;
  display: -moz-inline-box;
  display: inline-block;
}

.key3 {
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;
  border: 1px solid white;
  display: -moz-inline-box;
  display: inline-block;
}

.key4 {
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;
  border: 1px solid white;
  display: -moz-inline-box;
  display: inline-block;
}

.key5 {
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;
  border: 1px solid white;
  display: -moz-inline-box;
  display: inline-block;
}

.key6 {
  width: 40px;
  height: 30px;
  margin-top: 3px;
  margin-left: 10px;
  border-radius: 2px;
  border: 1px solid white;
  display: -moz-inline-box;
  display: inline-block;
}
</style>