<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>坞修计划</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="filter-container">
      <el-form ref="filter" label-position="left" :model="listQuery">
        <el-row :gutter="10">
          <el-col :md="6" :lg="5">
            <el-form-item label="公司：" label-width="90px" prop="company" style="margin-left: 5;">
              <el-select v-model="listQuery.shipType" placeholder="请选择">
                <el-option v-for="(item,index) in shipTypeList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :md="6" :lg="5">
            <el-form-item label="船舶：" label-width="60px" prop="shipCode">
              <el-select v-model="listQuery.shipType" placeholder="请选择">
                <el-option v-for="(item,index) in shipTypeList" :key="index" :label="item.name" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="5">
            <el-form-item label="年份：" label-width="60px" prop="year">
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
      <el-table :data="dockRepairPlan" style="width: 100%">
        <el-table-column type="index" label="No." width="50px;" />
        <el-table-column prop="date" label="船舶" width="150px;" />
        <el-table-column label="2020" header-align="center">
          <el-table-column prop="name" label="1" width="40px;">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper" style="text-align: center">
                <el-tag :type="ASSET_STATUS[scope.row.status].type">
                  {{ ASSET_STATUS[scope.row.status].status }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="2" width="40px;" />
          <el-table-column prop="name" label="3" width="40px;" />
          <el-table-column prop="name" label="4" width="40px;" />
          <el-table-column prop="name" label="5" width="40px;" />
          <el-table-column prop="name" label="6" width="40px;" />
          <el-table-column prop="name" label="7" width="40px;" />
          <el-table-column prop="name" label="8" width="40px;" />
          <el-table-column prop="name" label="9" width="40px;" />
          <el-table-column prop="name" label="10" width="40px;" />
          <el-table-column prop="name" label="11" width="40px;" />
          <el-table-column prop="name" label="12" width="40px;" />
        </el-table-column>
        <el-table-column label="2021" header-align="center">
          <el-table-column prop="name" label="1" width="40px;" />
          <el-table-column prop="name" label="2" width="40px;" />
          <el-table-column prop="name" label="3" width="40px;" />
          <el-table-column prop="name" label="4" width="40px;" />
          <el-table-column prop="name" label="5" width="40px;" />
          <el-table-column prop="name" label="6" width="40px;" />
          <el-table-column prop="name" label="7" width="40px;" />
          <el-table-column prop="name" label="8" width="40px;" />
          <el-table-column prop="name" label="9" width="40px;" />
          <el-table-column prop="name" label="10" width="40px;" />
          <el-table-column prop="name" label="11" width="40px;" />
          <el-table-column prop="name" label="12" width="40px;" />
        </el-table-column>
        <el-table-column label="2022" header-align="center">
          <el-table-column prop="name" label="1" width="40px;" />
          <el-table-column prop="name" label="2" width="40px;" />
          <el-table-column prop="name" label="3" width="40px;" />
          <el-table-column prop="name" label="4" width="40px;" />
          <el-table-column prop="name" label="5" width="40px;" />
          <el-table-column prop="name" label="6" width="40px;" />
          <el-table-column prop="name" label="7" width="40px;" />
          <el-table-column prop="name" label="8" width="40px;" />
          <el-table-column prop="name" label="9" width="40px;" />
          <el-table-column prop="name" label="10" width="40px;" />
          <el-table-column prop="name" label="11" width="40px;" />
          <el-table-column prop="name" label="12" width="40px;" />
        </el-table-column>
      </el-table>
      <el-row>
        <el-col span="12">
          <el-pagination
            :total="listQuery.total"
            :page-sizes="[10, 20, 50]"
            :page-size.sync="listQuery.limit"
            :current-page.sync="listQuery.page"
            layout="total, sizes, prev, pager, next, jumper"
            prev-text="上一页"
            next-text="下一页"
            style="margin-top: 15px;text-align: left"
            @size-change="handleSizeChange"
            @current-change="handleIndexChange"
          />
        </el-col>
        <el-col span="12">
          <span style="text-align: left;display:block;margin-top: 25px;">绿色背景表示此次修理已经完成，黄色表示船检到期日期</span>
        </el-col>
      </el-row>

    </div>
    <!-- 更新新增 -->
    <el-dialog :visible.sync="dialogFormVisible" width="80%" :show-close="false" class="form-dialog">
      <div class="form-title">
        <span>Pacifc Success</span>
      </div>
      <!-- <div>
        <el-table :data="tableData" style="width: 100%" height="250">
          <el-table-column fixed prop="year" label="年份" width="150" />
          <el-table-column fixed prop="date" label="SS/DD" width="150" />
          <el-table-column fixed prop="date" label="船检到期日期" width="150" />
          <el-table-column fixed prop="date" label="计划日期" width="150" />
          <el-table-column fixed prop="date" label="计划修理天数" width="150" />
          <el-table-column fixed prop="date" label="实际修理日期" width="150" />
          <el-table-column fixed prop="date" label="实际修理天数" width="150" />
          <el-table-column fixed prop="date" label="以修理完成" width="150" />
        </el-table>
      </div> -->
      <div>
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="temp"
          label-position="left"
          class="dialog-form"
        >
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="计划日期：" label-width="120px" prop="planDate">
                <el-date-picker v-model="temp.planDate" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="修船类别：" label-width="120px" prop="repairType">
                <el-radio :label="1">SS</el-radio>
                <el-radio :label="2">DD</el-radio>
                <el-radio :label="3">非计划性修船</el-radio>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="船检到期日期：" label-width="120px" prop="dueDateOfInspection">
                <el-date-picker v-model="temp.dueDateOfInspection" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label="计划修理天数：" label-width="120px" prop="planRepairDay">
                <el-input v-model="temp.planRepairDay" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label="实际修理日期：" label-width="120px" prop="trueRepairDate">
                <el-date-picker v-model="temp.trueRepairDate" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label="实际修理天数：" label-width="120px" prop="trueRepairDay">
                <el-input v-model="temp.trueRepairDay" :disabled="true" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="15">
              <el-form-item label="状态:" label-width="120px" prop="status">
                <el-radio :label="1">计划中</el-radio>
                <el-radio :label="2">进行中</el-radio>
                <el-radio :label="3">完成</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="form-dialog-bottom">
        <div class="header-opt">
          <el-button plain type="default" icon="el-icon-check" size="mini" @click="submit">保 存</el-button>
          <el-button plain type="default" icon="el-icon-close" size="mini" @click="closeDialog">取消</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>

import { queryCountry, addCountry, deleteCountry, exportCountry } from '@/api/country'
import { getShipRepairpplyList } from '@/api/shipRepair/repairList'
import { parseDsErrorMessage } from '@/utils/responseUtil'
export default {

  data() {
    return {
      dialogConditionVisible: false,

      conditionList: [{
        name: 'countryCode',
        operator: '',
        value: ''
      }],
      radio: '1',
      shipTypeList: [{ name: '生效', value: 1 }, { name: '失效', value: 0 }],
      tableData: [],
      dockRepairPlan: [],
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
            label: '详情',
            type: 'primary',
            show: true,
            icon: 'el-icon-edit-outline',
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.handleUpdate(row);
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

      temp: {
        planDate: '',
        repairType: '',
        dueDateOfInspection: '',
        planRepairDay: '',
        trueRepairDate: '',
        trueRepairDay: ''
      },
      rules: {
        // countryCode: [{
        //   required: true,
        //   message: '不能为空'
        // }]
      }
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {

    /* 关闭弹窗 */
    closeDialog() {
      this.dialogFormVisible = false
    },

    /* 新增 */
    handleAdd() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
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
    submit() {
      if (this.dialogStatus === 'create') {
        return this.createCountry()
      }
    },

    /* 新增 */
    createCountry() {
      this.$refs['tableData'].validate(valid => {
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
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.temp.timestamp = new Date(this.temp.timestamp);
      this.dialogStatus = 'update';
      this.dialogFormVisible = true;
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

  .form-dialog-bottom {
    //position: absolute;
    //top: 0;
    margin: 10px;
    margin-left: 70%;
    bottom: 10px;
    left: 0;
    width: 20%;
    padding: 20px;
    overflow: hidden;

    .header-opt {
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
