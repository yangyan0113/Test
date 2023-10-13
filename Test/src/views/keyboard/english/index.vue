<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="练习类别" prop="seriesBig">
        <el-select v-model="queryParams.seriesBig" placeholder="请选择练习类别" @change="handleShowSmallCode">
          <el-option
            v-for="item in bigCodeOptions"
            :key="item.bigCode"
            :label="item.bigDesc"
            :value="item.bigCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章类型" prop="seriesSmall">
        <el-select v-model="queryParams.seriesSmall" placeholder="请选择文章类型">
          <el-option
            v-for="item in smallCodeOptions"
            :key="item.smallCode"
            :label="item.smallDesc"
            :value="item.smallCode"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="keyboardList">
      <!-- <el-table-column label="主键编号" align="center" prop="keyboardId"/> -->
      <el-table-column label="序号" align="center" prop="sortId" width="50"/>
      <el-table-column label="标题" align="center" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <el-button type="text" @click="showKeyData(scope.row)">{{ scope.row.title }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="练习类别" align="center" prop="bigDesc"/>
      <el-table-column label="文章类型" align="center" prop="smallDesc"/> 
      <el-table-column label="练习次数" align="center" prop="keyCount">
        <template slot-scope="scope">
          <span>{{scope.row.keyCount | keyCountFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column label="最后练习时间" align="center" prop="keyTime" width="135"/>
      <el-table-column label="最后练习用时" align="center" prop="spendTime">
        <template slot-scope="scope">
          <span>{{scope.row.spendTime | spendTimeFilter}}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </div>
</template>

<script>
import { listcekeyboard } from '@/api/exercise/ceKeyboard.js' 
import { listByCategory } from '@/api/base/ceSeriesBig.js'
import { listByBigCode } from '@/api/base/ceSeriesSmall.js'
import { formatMsTime } from '@/utils/index'

export default {
  name: 'english', //英文打字
  data() {
    return {
      // 键盘弹出层
      keyDataVisible: false,
      // 遮罩层
      loading: false,
      // 显示搜索条件
      showSearch: true,
      // 非单个禁用
      single: false,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 表格数据
      keyboardList: [],
      // 状态数据字典
      //typeOptions: [],
      //大系列
      bigCodeOptions: [],
      //小系列
      smallCodeOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
        seriesBig: undefined,
        seriesSmall: undefined,
      },
    }
  },
  filters: {
    spendTimeFilter(val) {
      return val == 0 ? '' : formatMsTime(val)
    },
    keyCountFilter(val) {
      return val == 0 ? '' : val
    },
  },
  created() {
    this.getList()
    //1：英文练习
    listByCategory('1').then((res) => {
      const { code, data } = res
      if (code == 200) {
        this.bigCodeOptions = data
      }
    })
  },
  methods: {
    /** 查询列表 */
    getList() {
      this.loading = true
      this.queryParams.category = 1
      listcekeyboard(this.queryParams).then((res) => {
        if (res.code == 200) {
          this.keyboardList = res.data.result
          this.total = res.data.totalNum
          this.loading = false
        }
      })
    },

    /** 搜索按钮操作 */
    handleQuery() { 
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    //跳转详情页
    showKeyData(row) {
      const keyboardId = row.keyboardId
      this.$router.push({ path: '/edetail', query: { keyboardId } })
    },
    //根据选择的大系列，显示小系列
    handleShowSmallCode() {
      if (this.queryParams.seriesBig) { 
        listByBigCode(this.queryParams.seriesBig).then((res) => {
          const { code, data } = res
          if (code == 200) {
            this.smallCodeOptions = data
            this.queryParams.seriesSmall = undefined
          }
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">
</style>
