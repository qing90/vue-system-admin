<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>修船管理</el-breadcrumb-item>
      <el-breadcrumb-item>修船申请</el-breadcrumb-item>
      <el-breadcrumb-item>修船详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <div class="actionButtons">
        <el-row>
          <el-col span:24>
            <el-button class="buttons-top" icon="el-icon-delete" type="primary" @click="addRow()">废弃</el-button>
            <el-button class="buttons-top" icon="el-icon-save" type="primary" @click="delData()">保存</el-button>
            <el-button class="buttons-top" icon="el-icon-submit" type="primary" @click="handleSearch">提交</el-button>
          </el-col>
        </el-row>
      </div>
      <div>
        <el-steps :active="active" align-center finish-status="success" style="margin-top:10;">
          <el-step title="申请" />
          <el-step title="询报价" />
          <el-step title="比价" />
          <el-step title="比价审批" />
          <el-step title="下单" />
          <el-step title="修理跟踪" />
          <el-step title="完成工单" />
        </el-steps>
      </div>
      <div width="80%" class="form-dialog">
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
            <el-col :span="6">
              <el-form-item label="船舶：" label-width="120px" prop="shipCode">
                <el-select v-model="temp.shipCode" placeholder="请选择">
                  <el-option
                    v-for="(option,index) in ship"
                    :key="index"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请单号:" label-width="120px" prop="repairType">
                <el-input v-model="temp.countryNameEn" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态:" label-width="120px" prop="planRepairDate">
                <el-select v-model="temp.shipCode" placeholder="请选择">
                  <el-option
                    v-for="(option,index) in ship"
                    :key="index"
                    :value="option.value"
                    :label="option.label"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="申请人:" label-width="120px" prop="planRepairDate">
                <el-input v-model="temp.countryNameEn" placeholder="请输入 ..." />
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="申请日期:" label-width="120px" prop="lastRepairDate">
                <el-date-picker v-model="temp.lastRepairDate" style="width:auto" type="date" placeholder="选择日期" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="修理类别:" label-width="120px" prop="countryNameEn">
                <el-radio v-model="radio" label="1">航修</el-radio>
                <el-radio v-model="radio" label="2">坞修</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电器类:" label-width="120px" prop="electricalFlag">
                <el-switch
                  v-model="electricalFlag"
                  active-color="#13ce66"
                  inactive-color="#C0C0C0"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <el-form-item label="坞修计划:" label-width="120px" prop="countryNameEn">
                <el-date-picker v-model="temp.lastRepairDate" style="width:auto" type="date" placeholder="选择日期" />
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
                  style="width: 80%;"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>

    <!-- <div class="actionButtons">
      <el-row>
        <el-col span:24>
          <el-button type="primary" icon="el-icon-plus" @click="addRow()">增加自定义项目</el-button>
          <el-button type="primary" icon="el-icon-plus"  @click="delData()">选择标准项目</el-button>
          <el-button type="primary" icon="el-icon-plus"  @click="handleSearch">选择修理遗留项目</el-button>
          <el-button type="primary" icon="el-icon-plus"  @click="save()">选择遗留工单</el-button>
          <el-button type="primary" icon="el-icon-plus"  @click="submit()">选择设备故障单</el-button>
        </el-col>
      </el-row>
    </div> -->

    <div class="table-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
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
                <el-table-column label="修理工程">
                  <el-table-column prop="engineering" min-width="80%" />
                  <el-table-column min-width="20%">
                    <template slot-scope="scope">
                      <el-button icon="el-icon-circle-plus-outline" size="small" @click="handleAdd(scope.row)" />
                    </template>
                  </el-table-column>

                </el-table-column>
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
                <el-table-column label="修理项目">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" type="textarea" class="remark" />
                  </template>
                </el-table-column>
                <el-table-column label="修理设备">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="数量">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="关联设备">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="设备型号">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="其他说明">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="费用科目">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="添加人">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.require_des" />
                  </template>
                </el-table-column>
                <el-table-column label="添加日期">
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

        <el-tab-pane label="已审批" name="third">
          <table-component
            ref="审批记录"
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
    <div>
      <!-- 更新新增 -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="70%"
        :show-close="false"
        class="form-dialog"
      >
        <div>
          <el-form
            ref="dataForm"
            :rules="rules"
            :model="temp"
            label-position="left"
            class="dialog-form"
          >
            <el-row :gutter="10">
              <el-col :span="21">
                <el-form-item label="父修理项目：" label-width="120px" prop="fatherProject">
                  <el-input v-model="temp.fatherProject" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="7">
                <el-form-item label="项目编码：" label-width="120px" prop="projectCode">
                  <el-input v-model="temp.projectCode" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="21">
                <el-form-item label="当前项目：" label-width="120px" prop="projectName">
                  <el-input
                    v-model="temp.projectName"
                    type="textarea"
                    :rows="3"
                    style="width: 100%;"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="7">
                <el-form-item label="数量：" label-width="120px" prop="count">
                  <el-input v-model="count" />
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="单位：" label-width="120px" prop="unit">
                  <el-select v-model="temp.unit" placeholder="请选择">
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
                <el-form-item label="费用科目：" label-width="120px" prop="unit">
                  <el-select v-model="temp.unit" placeholder="请选择">
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
              <el-col :span="21">
                <el-form-item label="其他说明:" label-width="120px" prop="countryNameEn">
                  <el-input
                    v-model="temp.shipCode"
                    type="textarea"
                    :rows="3"
                    style="width: 100%;"
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="10">
                <el-form-item label="设备名称：" label-width="120px" prop="count">
                  <el-input v-model="count" />
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="设备型号：" label-width="120px" prop="count">
                  <el-input v-model="count" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button icon="el-icon-check">关联设备</el-button>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="20">
                <el-form-item label="生产厂家：" label-width="120px" prop="count">
                  <el-input v-model="count" />
                </el-form-item>
              </el-col>

              <el-col :span="4">
                <el-button icon="el-icon-check">取消关联</el-button>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="6">
                <el-form-item label="岸基审核状态:" label-width="120px" prop="electricalFlag">
                  <el-switch
                    v-model="electricalFlag"
                    active-color="#13ce66"
                    inactive-color="#C0C0C0"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="增加人：" label-width="80px" prop="addPerson">
                  <el-input v-model="addPerson" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="增加日期:" label-width="120px" prop="countryNameEn">
                  <el-date-picker v-model="temp.lastRepairDate" style="width:auto" type="date" placeholder="选择日期" />
                </el-form-item>
              </el-col>

              <el-col :span="3">
                <el-button icon="save">save</el-button>
              </el-col>
              <el-col :span="3">
                <el-button icon="cancel" @click="closeDialog">cancel</el-button>
              </el-col>
            </el-row>

          </el-form>
        </div>

      </el-dialog>
    </div>

  </div>
</template>
<script>
import tableComponent from '@/components/TableComponent';
import { queryCountry, addCountry, updateCountry, deleteCountry } from '@/api/country';
import { getShipRepairpplyList } from '@/api/shipRepair/repairList';
import { listCompany, listRepairType, listShip, listRepairProject } from '@/api/common/generalParam';
import { parseDsErrorMessage } from '@/utils/responseUtil';
export default {
  components: { tableComponent },
  data() {
    return {
      dialogConditionVisible: false,
      activeName: 'one',
      active: 3,
      electricalFlag: false, // 是否是电器类
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
          engineering: 'General service'
        },
        {
          engineering: 'Docking works'
        },
        {
          engineering: 'Hull department'
        },
        {
          engineering: 'Machinery department'
        },
        {
          engineering: 'Electrical department'
        }
      ],
      companies: [],
      ship: [],
      repairTypeList: [],
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
        // }]
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
    // 切换标签
    handleClick(tab, event) {
      // console.log(tab, event);
      console.log(tab.name);
    },

    conditionSearch() {
      const data = {};
      for (const item of this.conditionList) {
        if (item.value) {
          data[item.name] = item.value;
        }
      }
      data.page = 1;
      data.limit = this.listQuery.limit;
      this.dialogConditionVisible = false;
      queryCountry(data)
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

    chooseAddMethod() {
      if (this.dialogStatus === 'create') {
        return this.createCountry();
      } else {
        return this.updateCountry();
      }
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
    /* 更新 */
    updateCountry() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.temp.creator = 'admin';
          const tempData = Object.assign({}, this.temp);
          console.log(this.temp);
          updateCountry(tempData).then(response =>
            this.handleUpdateResponse(response)
          );
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
    },
    getCompany() {
      listCompany().then(res => {
        if (res.success) {
          this.companies = res.data.return_data;
        } else {
          this.$message({
            message: '获取公司集合失败',
            type: 'error'
          });
        }
      })
        .catch(err => {
          console.log(err);
        });
    },

    getRepairType() {
      listRepairType().then(res => {
        if (res.success) {
          this.repairTypeList = res.data.return_data;
        } else {
          this.$message({
            message: '获取公司集合失败',
            type: 'error'
          });
        }
      })
        .catch(err => {
          console.log(err);
        });
    },

    getShip() {
      listShip().then(res => {
        if (res.success) {
          this.ship = res.data.return_data;
        } else {
          this.$message({
            message: '获取公司集合失败',
            type: 'error'
          });
        }
      })
        .catch(err => {
          console.log(err);
        });
    },

    getRepairProject() {
      listRepairProject().then(res => {
        if (res.success) {
          this.repairProject = res.data.return_data;
        } else {
          this.$message({
            message: '获取公司集合失败',
            type: 'error'
          });
        }
      })
        .catch(err => {
          console.log(err);
        });
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
