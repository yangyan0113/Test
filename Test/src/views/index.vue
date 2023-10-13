<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :lg="16" :sm="24">
        <h2>开始学习之旅！</h2>
        <p>
          <!-- <b>当前版本:</b>
          <span>v{{ version }}</span> -->
          <!-- <el-link
            class="ml10"
            type="primary"
            size="mini"
            icon="el-icon-document"
            plain
            @click="goTarget('http://www.ylgjy.cn/doc/changelog.html#' + version)"
            >更新日志
          </el-link>-->
        </p>
      </el-col>
    </el-row>
    <el-divider/>
    <el-row :gutter="20" class="mt10">
      <el-col :sm="24" :lg="8">
        <el-card>
          <div slot="header" class="clearfix">
            <span>联系信息</span>
          </div>
          <div class="body">
            <p>联系电话：17797506146</p>
          </div>
          <div class="body">
            <p>联系微信：17797506146</p>
          </div>
          <div class="body">
            <p>咨询QQ：179325785</p>
          </div>
          <div class="body">
            <p>电子邮箱：179325785@qq.com</p>
          </div>
          <div class="body">
            <p>网站备案：湘ICP备2023024045号-1</p>
          </div>
          <!-- <div class="body">
            <p>
              <i class="el-icon-user-solid"></i>QQ：<a
                href="https://qm.qq.com/cgi-bin/qm/qr?k=Y__-fTGo_K2UIo3nWz7QnvS8LoRfPWKm&authKey=/ldXxiuolv80PF4yC8VtLk/TvAYbIhm2LKP8YVHCxAk+x2I+iqPAM1H/IsxQ+0gC&noverify=0"
                target="_black"
                >179325785</a
              >
            </p>
          </div>-->
        </el-card>
      </el-col>
      <!-- <el-col :span="10">
        <el-card>
          <div slot="header" class="clearfix">
            <span>版权所有 © 2023-2024 颜乐果</span>
            <span>copyright © ylgjy.cn All Rights Reserved</span>
          </div> 
        </el-card>
      </el-col>-->
    </el-row>
    <el-divider/>
    <el-row :gutter="20">
      <el-col :sm="24" :lg="16">
        <el-row>
          <h3>免责申明：</h3>
          <el-col :span="24">
            <h4>
              本站仅提供学习的平台，所有资料均来自于网络，版权归原创者所有！
              本站不提供任何保证，并不承担任何法律责任，如果对您的版权或者利益造成损害，请提供相应的资质证明，我们将于3个工作日内予以删除。
            </h4>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const defaultSettings = require('@/settings.js')
export default {
  name: 'index',
  data() {
    return {
      // 版本号
      version: defaultSettings.version,
    }
  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    },
  },
}
</script>

<style scoped lang="scss">
.tip {
  color: red;
  display: inline-block;
  height: 30px;
  line-height: 30px;
}
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
