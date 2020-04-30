<template>
  <div class="app-container">
    <div>
      <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>修船管理</el-breadcrumb-item>
        <el-breadcrumb-item>修船项目库</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="filter-container">
      <el-form ref="filter" label-position="left" :model="listQuery">
        <el-row :gutter="10">
          <el-col :md="6" :lg="5">
            <el-form-item label="项目名称：" label-width="90px" prop="projectName">
              <el-input v-model="listQuery.projectName" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :xs="6" :md="6" :lg="5">
            <el-button type="primary" @click="handleSearch">查 询</el-button>
            <el-button type="default" icon="el-icon-refresh-right" @click="resetFn">重 置</el-button>
          </el-col>
          <el-col :md="6" :lg="5">
            <el-button
              plain
              type="plain"
              icon="el-icon-plus"
              class="btn-plain-primary"
              @click="handleAdd"
            >新 增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="router-body">
      <div class="left-side">
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="deviceData"
          :props="defaultProps"
          node-key="deviceType"
          class="permission-tree"
        />
      </div>
      <div class="right-side">
        <el-table
          :data="projectLibraryData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="projectCode"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column type="index" width="50" />
          <el-table-column prop="projectCode" label="项目编号" width="120" />
          <el-table-column prop="projectName" label="项目名称" width="120" />
          <el-table-column prop="unit" label="单位" width="60" />
          <el-table-column prop="accessory" label="上传附件" width="120" />
          <el-table-column prop="fatherProject" label="父项目" width="120" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
              <el-col :span="12">
                <el-form-item label="父项目：" label-width="120px" prop="fatherProject">
                  <el-input v-model="temp.fatherProject" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="项目编码：" label-width="120px" prop="projectCode">
                  <el-input v-model="temp.projectCode" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item label="项目名称：" label-width="120px" prop="projectName">
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
              <el-col :span="5">
                <el-form-item label="上传附件：" label-width="120px" prop="uploadAccessory">
                  <el-switch
                    v-model="uploadAccessory"
                    active-color="#13ce66"
                    inactive-color="#C0C0C0"
                  />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="20">
                <el-form-item label="备注:" label-width="120px" prop="countryNameEn">
                  <el-input
                    v-model="temp.shipCode"
                    type="textarea"
                    :rows="3"
                    style="width: 70%;"
                    placeholder="请输入"
                  />
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
  </div>
</template>

<script>
import {
  getShipRepairpplyList,
  saveProjectLibrary,
  updateProjectLibrary,
  deleteProjectLibrary
} from '@/api/projectLibrary/projectLibrary';

export default {
  data() {
    return {
      checkStrictly: false,
      uploadAccessory: false,
      checked: false,
      operationType: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      validFlagList: [],
      projectLibraryData: [],
      deviceData: [],
      tableHeight: '', // 高度
      rules: {}, // 校验规则
      // table 的参数
      options: {
        border: true,
        stripe: true, // 是否为斑马纹 table
        loading: false, // 是否添加表格loading加载动画
        highlightCurrentRow: true, // 是否支持当前行高亮显示
        mutiSelect: true, // 是否支持列表项选中功能
        pagination: true
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
      // 需要展示的列
      columns: [
        {
          prop: 'index',
          label: 'No',
          align: 'center',
          width: '30'
        },
        {
          prop: 'projectCode',
          label: '项目编号',
          align: 'center',
          width: '150'
        },
        {
          prop: 'projectName',
          label: '项目名称'
        },
        {
          prop: 'unit',
          label: '单位'
        },
        {
          prop: 'jobDescription',
          label: '上传附件'
        },
        {
          prop: 'unit',
          label: '父项目'
        },
        {
          prop: 'remark',
          label: '备注'
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
          }
        ],
        fixed: false,
        width: 230
      },
      listQuery: {
        page: 1,
        limit: 20,
        total: 0,
        projectName: '',
        checked: false
      },
      dialogFormVisible: false,
      dialogStatus: ''
    };
  },
  created() {
    this.deviceData = [
      {
        label: '散货船',
        deviceType: '1',
        children: [
          {
            label: '主机',
            deviceType: '1-1',
            children: [
              {
                deviceType: '1-1-1',
                label: '三级 1-1-1'
              }
            ]
          },
          {
            label: '船体',
            deviceType: '1-2',
            children: [
              {
                deviceType: '1-2-1',
                label: '三级 1-2-1'
              }
            ]
          }
        ]
      },
      {
        label: '集装箱船',
        deviceType: '2',
        children: [
          {
            label: '主机',
            deviceType: '2-1',
            children: [
              {
                deviceType: '2-1-1',
                label: '三级 2-1-1'
              }
            ]
          },
          {
            label: '船体',
            deviceType: '2-2',
            children: [
              {
                label: '三级 2-2-1',
                deviceType: '2-2-1'
              }
            ]
          }
        ]
      },
      {
        label: '油轮',
        deviceType: '3',
        children: [
          {
            label: '主机',
            deviceType: '3-1',
            children: [
              {
                label: '三级 3-1-1',
                deviceType: '3-1-1'
              }
            ]
          },
          {
            label: '船体',
            deviceType: '3-2',
            children: [
              {
                label: '三级 3-2-1',
                deviceType: '3-2-1'
              }
            ]
          }
        ]
      }
    ];
  },
  mounted() {
    // this.$nextTick(function() {
    //   this.tableHeight = window.innerHeight - this.$refs.tableComponent.$refs.table.$el.offsetTop - 100;
    //   // 监听窗口大小变化
    //   const self = this;
    //   window.onresize = function() {
    //     self.tableHeight = window.innerHeight - self.$refs.tableComponent.$refs.table.$el.offsetTop - 100
    //   }
    // })
  },
  methods: {
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
            this.projectLibraryData = res.data.return_data;
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

    submit() {
      if (this.dialogStatus === 'create') {
        const data = this.temp;
        saveProjectLibrary(data)
          .then(res => {
            if (res.success) {
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success',
                duration: 2000
              });
            } else {
              this.$message({
                message: '保存失败',
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        const data = this.temp;
        updateProjectLibrary(data)
          .then(res => {
            if (res.success) {
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              });
            } else {
              this.$message({
                message: '更新失败',
                type: 'error'
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.closeDialog();
    },

    /* 关闭弹窗 */
    closeDialog() {
      this.dialogFormVisible = false;
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
      deleteProjectLibrary({ id: row.id }).then(() => {
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
};
</script>
<style lang="scss" scoped>
.app-container {
  .breadcrumb {
    margin-bottom: 20px;
  }
}

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

.form-dialog {
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

  .dialog-form {
    //background: #f5faff;
    padding: 20px 20px 0 20px;
    .el-form-item {
      /deep/.el-form-item__label {
        padding-right: 0;
      }
    }
  }
}
</style>
