<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>修船询价</el-breadcrumb-item>
      <el-breadcrumb-item>询价详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-table
        ref="table"
        :data="projectData"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%"
        @selection-change="selectRow"
      >
        <el-table-column label="序号" type="index" width="60" align="center" />
        <el-table-column label="供应商" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" class="remark" />
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" type="textarea" class="remark" />
          </template>
        </el-table-column>
        <el-table-column label="经办人">
          <template slot-scope="scope">
            <el-input v-model="scope.row.require_des" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作日期" width="180" />
        <el-table-column label="操作">
          <el-button type="text" size="small" @click="handleClick(scope.row)">取消</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">导出</el-button>
          <el-button type="text" size="small" @click="handleClick(scope.row)">邮件</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="third">
          <el-form
            ref="dataForm"
            :model="temp"
            label-position="left"
            class="dialog-form"
          >
            <el-row :gutter="10">
              <el-col :span="7">
                <el-form-item label="船舶名称：" label-width="120px" prop="shipCode">
                  <el-select v-model="temp.shipCode" placeholder="请选择">
                    <el-option
                      v-for="(option,sindex) in validFlagList"
                      :key="sindex"
                      :value="option.value"
                      :label="option.label"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="业务类别:" label-width="150px" prop="repairType">
                  <el-select v-model="temp.repairType" placeholder="请选择">
                    <el-option
                      v-for="(option,sindex) in validFlagList"
                      :key="sindex"
                      :value="option.value"
                      :label="option.label"
                    />
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
                    <el-option
                      v-for="(option,sindex) in validFlagList"
                      :key="sindex"
                      :value="option.value"
                      :label="option.label"
                    />
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
        </el-tab-pane>
        <el-tab-pane label="修理项目" name="one">
          <div class="router-body">
            <div class="left-side">
              <el-table
                ref="table"
                :data="repairWorkList"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%"
              >
                <el-table-column prop="engineering" label="修理工程" />
              </el-table>
            </div>
            <div class="right-side">
              <el-table
                ref="table"
                :data="projectData"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%"
                @selection-change="selectRow"
              >
                <el-table-column type="selection" width="45" align="center" />
                <el-table-column label="序号" type="index" width="60" align="center" />
                <el-table-column label="项目编号" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" class="remark" />
                  </template>
                </el-table-column>
                <el-table-column label="工作描述">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" type="textarea" class="remark" />
                  </template>
                </el-table-column>
                <el-table-column label="修理设备">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="数量单位">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="材料或者备件需求描述">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="...">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>

        <el-tab-pane label="附件" name="two">
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
    <!-- 事件按钮 -->
    <br>
    <!-- <div>
      <el-row>
        <el-col span:24>
          <el-button type="primary" @click="addRow()">增加修理项目</el-button>
          <el-button type="primary" @click="delData()">删除修理项目</el-button>
          <el-button type="primary" @click="handleSearch">追加修理项目</el-button>
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button type="primary" @click="submit()">提交</el-button>
        </el-col>
      </el-row>
    </div> -->
  </div>
</template>
<script>
import tableComponent from '@/components/TableComponent';
import { addCountry, deleteCountry } from '@/api/country';
import { getShipRepairpplyList } from '@/api/shipRepair/repairList';
import { parseDsErrorMessage } from '@/utils/responseUtil';
export default {
  components: { tableComponent },
  data() {
    return {
      dialogConditionVisible: false,
      activeName: 'one',
      conditionList: [
        {
          name: 'countryCode',
          operator: '',
          value: ''
        }
      ],
      radio: '1',
      repairWorkList: [
        {
          engineering: '修理工程1'
        },
        {
          engineering: '修理工程2'
        },
        {
          engineering: '修理工程3'
        },
        {
          engineering: '修理工程4'
        },
        {
          engineering: '修理工程5'
        }
      ],
      validFlagList: [
        { label: '生效', value: true },
        { label: '失效', value: false }
      ],
      projectData: [], // 修理项目数据
      rowNum: 1,
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
            label: '编辑',
            type: 'primary',
            show: true,
            icon: 'el-icon-edit-outline',
            plain: false,
            disabled: false,
            btnType: 'icon',
            method: (index, row) => {
              this.handleUpdate(row);
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
              this.handleDelete(row);
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
      }
    };
  },
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.tableHeight =
        window.innerHeight -
        this.$refs.tableComponent.$refs.table.$el.offsetTop -
        100;
      // 监听窗口大小变化
      const self = this;
      window.onresize = function() {
        self.tableHeight =
          window.innerHeight -
          self.$refs.tableComponent.$refs.table.$el.offsetTop -
          100;
      };
    });
  },
  methods: {
    /* 重置 */
    resetConditionForm() {
      this.conditionList = [
        {
          name: '',
          operator: '',
          value: ''
        }
      ];
    },
    /* 关闭弹窗 */
    closeDialog() {
      this.dialogFormVisible = false;
    },

    // 切换标签
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.name);
    },

    /* 新增 */
    handleAdd() {
      this.resetTemp();
      this.dialogStatus = 'create';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
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
    newMethod() {
      if (this.dialogStatus === 'create') {
        return;
      }
      this.resetTemp();
      this.dialogStatus = 'create';
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate();
      });
    },
    /* 新增 */
    createCountry() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          console.log(this.temp);
          this.temp.creator = 'admin';
          this.temp.createTime = new Date();
          addCountry(this.temp).then(response =>
            this.handleAddResponse(response)
          );
        }
      });
    },
    handleAddResponse(response) {
      if (response.success) {
        if (response.success) {
          this.searchFn();
          this.dialogFormVisible = false;
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: 'success',
            duration: 2000
          });
        }
      } else {
        parseDsErrorMessage(response);
      }
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
      this.listQuery.page = 1;
      this.searchFn();
    },
    // 查询事件
    searchFn() {
      const data = {};
      for (const key in this.listQuery) {
        if (this.listQuery[key] !== '' && key !== 'total') {
          data[key] = this.listQuery[key];
        }
      }
      getShipRepairpplyList(data)
        .then(res => {
          if (res.success) {
            this.tableData = res.data.records;
            this.listQuery.total = parseInt(res.data.totalRecord);
          } else {
            this.$message({
              message: '搜索失败',
              type: 'error'
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    /* 重置 */
    resetFn() {
      this.$refs.filter.resetFields();
    },

    handleRowClick() {},
    handleSelectionChange() {},
    handleSizeChange(size) {
      this.listQuery.limit = size;
      this.searchFn();
    },
    handleIndexChange(page) {
      this.listQuery.page = page;
      this.searchFn();
    },
    handleUpdate(row) {
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
    },

    // 获取表格选中时的数据
    selectRow(val) {
      this.selectlistRow = val;
    },
    // 增加行
    addRow() {
      var list = {
        rowNum: this.rowNum,
        post_id: [],
        require_des: '',
        remark: ''
      };
      this.projectData.unshift(list);
      this.rowNum += 1;
    },
    // 删除方法
    // 删除选中行
    delData() {
      for (let i = 0; i < this.selectlistRow.length; i++) {
        const val = this.selectlistRow;
        // 获取选中行的索引的方法
        // 遍历表格中projectData数据和选中的val数据，比较它们的rowNum,相等则输出选中行的索引
        // rowNum的作用主要是为了让每一行有一个唯一的数据，方便比较，可以根据个人的开发需求从后台传入特定的数据
        val.forEach((val, index) => {
          this.projectData.forEach((v, i) => {
            if (val.rowNum === v.rowNum) {
              // i 为选中的索引
              this.projectData.splice(i, 1);
            }
          });
        });
      }
      // 删除完数据之后清除勾选框
      this.$refs.table.clearSelection();
    }
  }
};
</script>
<style lang="scss" scoped>
.router-body {
  overflow: hidden;
  .left-side {
    width: 20%;
    float: left;
  }
  .right-side {
    width: 75%;
    float: left;
  }
}

.app-container {
  .breadcrumb {
    margin-bottom: 20px;
  }
}
.filter-container {
  .el-form-item {
    margin-bottom: 0px;
    /deep/.el-form-item__label {
      padding-right: 0px;
    }
  }
}
.table-container {
  .opt {
    text-align: right;
    margin-bottom: 10px;
  }
}
.opt-panel {
  i {
    font-size: 36px;
    color: #bbb;
    cursor: pointer;
    margin-right: 4px;
    &:hover {
      color: #999;
    }
  }
}
.form-dialog {
  .form-dialog-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 20px;
    overflow: hidden;
    .header-title {
      font-size: 16px;
      color: #666;
      float: left;
    }
    .header-opt {
      float: right;
    }
  }
  .dialog-form {
    background: #f5faff;
    padding: 20px 20px 0 20px;
    .el-form-item {
      /deep/.el-form-item__label {
        padding-right: 0;
      }
    }
    .form-title {
      position: relative;
      padding: 0 20px 10px;
      margin-bottom: 20px;
      &::before {
        content: "";
        width: 100%;
        height: 2px;
        background: #ddd;
        position: absolute;
        bottom: 0;
        left: 0;
      }
      span {
        font-size: 14px;
        color: #999;
        position: relative;
        &::before {
          content: "";
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
