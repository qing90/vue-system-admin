<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>修理询价</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-form ref="filter" label-position="left" :model="listQuery">
        <el-row :gutter="10">
          <el-col :md="6" :lg="5">
            <el-form-item label="公司：" label-width="60px" prop="shipCode">
              <el-select v-model="listQuery.shipType" placeholder="请选择">
                <el-option v-for="(item,index) in shipTypeList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="6" :lg="5">
            <el-form-item label="修理单号：" label-width="90px" prop="repairNo" style="margin-left: 5;">
              <el-input v-model="listQuery.repairNo" placeholder="请输入内容" />
            </el-form-item>
          </el-col>

          <el-col :md="6" :lg="5">
            <el-form-item label="修理类别：" label-width="90px" prop="shipType" style="margin-left: 5;">
              <el-select v-model="listQuery.shipType" placeholder="请选择">
                <el-option v-for="(item,index) in shipTypeList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="24" :lg="6">
            <el-button type="primary" @click="handleSearch">查 询</el-button>
            <el-button type="default" icon="el-icon-refresh-right" @click="resetFn">重 置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-container">
      <div class="opt">
        <el-button plain type="plain" icon="el-icon-plus" class="btn-plain-primary" @click="handleAdd">新 增</el-button>
        <el-button plain type="default" icon="el-icon-download" class="btn-plain-success" @click="handleExport">导 出</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待询价" name="one">
          <table-component
            ref="tableComponent"
            :height="tableHeight"
            :data="tableData"
            :options="options"
            :pagination="listQuery"
            :columns="columns"
            :operates="operates"
            @handleRowClick="handleRowClick"
            @handleSelectionChange="handleSelectionChange"
            @handleIndexChange="handleIndexChange"
            @handleSizeChange="handleSizeChange"
          />
        </el-tab-pane>

        <el-tab-pane label="待询价" name="two">
          <table-component
            ref="tableComponent"
            :height="tableHeight"
            :data="tableData"
            :options="options"
            :pagination="listQuery"
            :columns="columns"
            :operates="operates"
            @handleRowClick="handleRowClick"
            @handleSelectionChange="handleSelectionChange"
            @handleIndexChange="handleIndexChange"
            @handleSizeChange="handleSizeChange"
          />
        </el-tab-pane>

        <el-tab-pane label="审批中" name="third">
          <table-component
            ref="tableComponent"
            :height="tableHeight"
            :data="tableData"
            :options="options"
            :pagination="listQuery"
            :columns="columns"
            :operates="operates"
            @handleRowClick="handleRowClick"
            @handleSelectionChange="handleSelectionChange"
            @handleIndexChange="handleIndexChange"
            @handleSizeChange="handleSizeChange"
          />
        </el-tab-pane>

        <el-tab-pane label="已完成" name="four">
          <table-component
            ref="tableComponent"
            :height="tableHeight"
            :data="tableData"
            :options="options"
            :pagination="listQuery"
            :columns="columns"
            :operates="operates"
            @handleRowClick="handleRowClick"
            @handleSelectionChange="handleSelectionChange"
            @handleIndexChange="handleIndexChange"
            @handleSizeChange="handleSizeChange"
          />
        </el-tab-pane>
      </el-tabs>

    </div>
    <!-- 更新新增 -->
    <el-dialog :visible.sync="dialogFormVisible" width="80%" :show-close="false" class="form-dialog">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        class="dialog-form"
      >
        <div class="form-title">
          <span>修船申请信息</span>
        </div>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="船舶名称：" label-width="120px" prop="shipCode">
              <el-select v-model="temp.shipCode" placeholder="请选择">
                <el-option v-for="(option,sindex) in validFlagList" :key="sindex" :value="option.value" :label="option.label" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="业务类别:" label-width="150px" prop="repairType">
              <el-select v-model="temp.repairType" placeholder="请选择">
                <el-option v-for="(option,sindex) in validFlagList" :key="sindex" :value="option.value" :label="option.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="计划抵厂日期:" label-width="120px" prop=".planRepairDate">
              <el-date-picker v-model="temp.planRepairDate" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上次修理开始日期:" label-width="150px" prop="lastRepairDate">
              <el-date-picker v-model="temp.lastRepairDate" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="航修(电器类):" label-width="100px" prop="countryNameEn">
              <el-radio v-model="radio" label="1">是</el-radio>
              <el-radio v-model="radio" label="2">否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="卸货港:" label-width="120px" prop="countryNameEn">
              <el-input v-model="temp.countryNameEn" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="中间检验最晚日期:" label-width="150px" prop="validFlag">
              <el-date-picker v-model="temp.countryNameE" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="特检最晚日期" label-width="100px" prop="countryNameEn">
              <el-date-picker v-model="temp.countryNameE" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="7">
            <el-form-item label="申请人:" label-width="120px" prop="countryNameEn">
              <el-input v-model="temp.countryNameEn" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请日期:" label-width="150px" prop="validFlag">
              <el-date-picker v-model="temp.countryNameE" type="date" placeholder="选择日期" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="状态" label-width="100px" prop="countryNameEn">
              <el-select v-model="temp.validFlag" placeholder="请选择">
                <el-option v-for="(option,sindex) in validFlagList" :key="sindex" :value="option.value" :label="option.label" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="20">
            <el-form-item label="备注:" label-width="120px" prop="countryNameEn">
              <el-input
                v-model="temp.countryNameEn"
                type="textarea"
                :rows="3"
                style="width: 70%;"
                placeholder="请输入"
              />
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>

      <div class="form-dialog-header">
        <div class="header-opt">
          <el-button plain type="default" class="btn-plain-success" icon="el-icon-check" size="mini" @click="chooseAddMethod">保 存</el-button>
          <el-button plain type="default" icon="el-icon-close" size="mini" @click="closeDialog">取消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import tableComponent from '@/components/TableComponent'
import { queryCountry, addCountry, updateCountry, deleteCountry, exportCountry } from '@/api/country'
import { getShipRepairpplyList } from '@/api/shipRepair/repairList'
import { parseDsErrorMessage } from '@/utils/responseUtil'
export default {
  components: { tableComponent },
  data() {
    return {
      dialogConditionVisible: false,
      activeName: 'one',
      conditionList: [{
        name: 'countryCode',
        operator: '',
        value: ''
      }],
      radio: '1',
      nameList: [{
        label: '国家/地区代码',
        value: 'countryCode'
      }, {
        label: '国家/地区中文名',
        value: 'countryNameZh'
      }, {
        label: '国家/地区英文名',
        value: 'countryNameEn'
      }, {
        label: '是否有效',
        value: 'validFlag'
      }, {
        label: '创建人',
        value: 'creator'
      }],
      shipTypeList: [{ name: '生效', value: 1 }, { name: '失效', value: 0 }],
      operatorsList: ['=', '!=', '>', '>=', '<', '<=', '包含', '介于', '不包含', '从属于'],
      validList: [{ name: '生效', value: 1 }, { name: '失效', value: 0 }],
      validFlagList: [{ label: '生效', value: true }, { label: '失效', value: false }],
      tableData: [],
      tableHeight: '', // 高度
      // table 的参数
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        pagination: true
      },
      // 需要展示的列
      columns: [
        {
          prop: 'index',
          label: 'No',
          align: 'center',
          width: '30'
        },
        {
          prop: 'shipCode',
          label: '船舶',
          align: 'center'
        },
        {
          prop: 'applyNo',
          label: '申请单号'
        },
        {
          prop: 'repairType',
          label: '修理类别'
        },
        {
          prop: 'planRepairDate',
          label: '计划开始日期',
          align: 'center'
        },
        {
          prop: 'lastRepairDate',
          label: '上次修理日期',
          align: 'center'
        },
        {
          prop: 'proposer',
          label: '申请人'
        },
        {
          prop: 'applyDate',
          label: '申请日期'
        }
      ],
      // 列操作按钮
      operates: {
        list: [
          {
            id: '1',
            label: '详细',
            type: 'primary',
            show: true,
            icon: 'el-icon-edit-outline',
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.inquiryDetails(row);
            }
          },
          {
            id: '2',
            label: '删除',
            type: 'danger',
            icon: 'el-icon-delete',
            show: true,
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.handleDelete(row)
            }
          }
        ],
        fixed: false,
        width: 230
      },
      listQuery: {
        page: 1,
        limit: 20,
        total: 0,
        countryCode: '',
        countryNameZh: '',
        countryNameEn: '',
        validFlag: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '添加'
      },
      temp: {
        shipCode: '',
        applyNo: '',
        repairType: '',
        planRepairDate: '',
        lastRepairDate: '',
        proposer: '',
        applyDate: ''
      },
      rules: {
        // countryCode: [{
        //   required: true,
        //   message: '不能为空'
        // }],
        // countryNameZh: [{
        //   required: true,
        //   message: '不能为空'
        // }],
        // countryNameEn: [{
        //   required: true,
        //   message: '不能为空'
        // }],
        // validFlag: [{
        //   required: true,
        //   message: '请选择状态'
        // }]
      }
    }
  },
  created() {

  },
  mounted() {
    this.$nextTick(function() {
      this.tableHeight = window.innerHeight - this.$refs.tableComponent.$refs.table.$el.offsetTop - 100;
      // 监听窗口大小变化
      const self = this;
      window.onresize = function() {
        self.tableHeight = window.innerHeight - self.$refs.tableComponent.$refs.table.$el.offsetTop - 100
      }
    })
  },
  methods: {
    /* 重置 */
    resetConditionForm() {
      this.conditionList = [{
        name: '',
        operator: '',
        value: ''
      }]
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.dialogFormVisible = false
    },

    // 切换标签
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.name);
    },

    /* 新增 */
    handleAdd() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    resetTemp() {
      this.temp = {
        id: undefined,
        countryCode: '',
        countryNameZh: '',
        countryNameEn: '',
        timestamp: new Date(),
        validFlag: true
      };
    },
    chooseAddMethod() {
      if (this.dialogStatus === 'create') {
        return this.createCountry()
      } else {
        return this.updateCountry()
      }
    },
    newMethod() {
      if (this.dialogStatus === 'create') {
        return
      }
      this.resetTemp()
      this.dialogStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /* 新增 */
    createCountry() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          console.log(this.temp);
          this.temp.creator = 'admin';
          this.temp.createTime = new Date();
          addCountry(this.temp).then(response => this.handleAddResponse(response));
        }
      })
    },
    handleAddResponse(response) {
      if (response.success) {
        if (response.success) {
          this.searchFn()
          this.dialogFormVisible = false
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
        }
      } else {
        parseDsErrorMessage(response)
      }
    },
    /* 更新 */
    updateCountry() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.creator = 'admin';
          const tempData = Object.assign({}, this.temp);
          console.log(this.temp);
          updateCountry(tempData).then(response => this.handleUpdateResponse(response));
        }
      });
    },
    handleUpdateResponse(response) {
      if (response.success) {
        this.searchFn();
        this.dialogFormVisible = false;
        this.$notify({
          title: '成功',
          message: '更新成功',
          type: 'success',
          duration: 2000
        });
      } else {
        console.log('error');
        parseDsErrorMessage(response);
      }
    },
    // 查询方法
    handleSearch() {
      this.listQuery.page = 1
      this.searchFn();
    },
    // 查询事件
    searchFn() {
      const data = {}
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key]
        }
      }
      getShipRepairpplyList(data).then(res => {
        if (res.success) {
          this.tableData = res.data.records;
          this.listQuery.total = parseInt(res.data.totalRecord)
        } else {
          this.$message({
            message: '搜索失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* 更多条件 */
    moreFn() {
      this.dialogConditionVisible = true
    },
    /* 重置 */
    resetFn() {
      this.$refs.filter.resetFields()
    },
    /* 导出 */
    handleExport() {
      const data = {}
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key]
        }
      }
      exportCountry(data)
    },
    handleRowClick() {

    },
    handleSelectionChange() {

    },
    handleSizeChange(size) {
      this.listQuery.limit = size
      this.searchFn()
    },
    handleIndexChange(page) {
      this.listQuery.page = page
      this.searchFn()
    },
    inquiryDetails(row) {
      this.temp = Object.assign({}, row);
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },

    handleDelete(row) {
      deleteCountry({ id: row.id }).then(() => {
        this.searchFn();
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container{
  .breadcrumb{
    margin-bottom: 20px;
  }
}
.filter-container{

  .el-form-item{
    margin-bottom: 0px;
    /deep/.el-form-item__label{
      padding-right:0px
    }
  }
}
.table-container{
  .opt{
    text-align: right;
    margin-bottom: 10px;
  }
}
.opt-panel{
  i{
    font-size:36px;
    color: #bbb;
    cursor: pointer;
    margin-right: 4px;
    &:hover{
      color: #999 ;
    }
  }
}
.form-dialog{

  .form-dialog-header{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    .header-title{
      font-size: 16px;
      color: #666;
      float: left;
    }
    .header-opt{
       float: right;
    }
  }
  .dialog-form{
    background: #f5faff;
    padding: 20px 20px 0 20px;
    .el-form-item{
      /deep/.el-form-item__label{
        padding-right: 0;
      }
    }
    .form-title{

      position: relative;
      padding: 0 20px 10px;
      margin-bottom: 20px;
      &::before{
        content: '';
        width: 100%;
        height: 2px;
        background: #ddd;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      span{
        font-size: 14px;
        color:#999;
        position: relative;
        &::before{
          content: '';
          width: 50%;
          position: absolute;
          height: 2px;
          bottom: -10px;
          background: #61b0ff;
          transform: translateX(50%);
        }
      }
    }
  }
}

</style>
