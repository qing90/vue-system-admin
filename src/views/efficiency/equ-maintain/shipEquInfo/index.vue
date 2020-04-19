<template>
  <div class="app-container">
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备保养体系</el-breadcrumb-item>
      <el-breadcrumb-item>船舶设备信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-form label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司">
              <el-select v-model="shipform.fleet" placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in fleetListOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="船舶">
              <el-select v-model="shipform.ship" placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in shipListOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="设备名称">
              <el-input v-model="shipform.equipmentName" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <div style="float:right;">
              <el-button type="primary" icon="el-icon-search">查询</el-button>
              <el-button icon="el-icon-refresh">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="line" />
    <div class="router-body">
      <div class="left-side">
        <el-tree
          ref="tree"
          :check-strictly="checkStrictly"
          :data="shipData"
          :props="defaultProps"
          node-key="deviceType"
          class="permission-tree"
        />
      </div>
      <div class="center-side">
        <div style="padding: 10px 30px 20px 30px;">
          <el-button type="primary" round>申请单列表</el-button>
        </div>
        <div>
          <div class="center-left">
            <el-form label-width="110px">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="设备编码">
                    <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="设备名称">
                    <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="英文名称">
                    <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="center-right">
            <img src="./code.png" class="center-right-code">
          </div>
        </div>
        <div>
          <el-form label-width="110px">
            <el-row>
              <el-col :span="15">
                <el-form-item label="设备型号">
                  <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="序列号">
                  <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="制造商">
                  <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产日期">
                  <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人">
                  <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备大类">
                  <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查编码">
                  <el-input v-model="shipform.equipmentName" placeholder="请输入" />
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="设备运转时间">
                  <el-input v-model="shipform.equipmentName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button type="primary" icon="el-icon-search" circle style="margin-left: 10px;" />
              </el-col>
              <el-col :span="12">
                <el-form-item label="安全设备">
                  <el-switch v-model="shipform.a" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="重要设备">
                  <el-switch v-model="shipform.b" />
                </el-form-item>
              </el-col>
              <el-col :span="24" class="button-flex">
                <el-button type="primary" round plain>工作卡（0）</el-button>
                <el-button type="primary" round plain>备件（0）</el-button>
              </el-col>
              <el-col :span="24" class="button-flex">
                <el-button type="primary" round plain>设备故障（0）</el-button>
                <el-button type="primary" round plain>设备记录簿（0）</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div class="button-save">
          <el-button type="primary">卸下</el-button>
          <el-button type="primary" style="margin-left: 30px;">保存</el-button>
        </div>
        <div class="button-topClass">
          <el-form label-width="150px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="低于安全库存备件">
                  <el-button type="text">点击查看清单</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="申请中备件">
                  <el-button type="text">点击查看清单</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="关键备件/高价值备件">
                  <el-button type="text">点击查看清单</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="right-side">
        <div class="right-side-padding">
          <div class="right-side-flex">
            <span class="right-side-leftText">产品信息</span>
            <span class="right-side-rightText">更多</span>
          </div>
          <div style="padding:20px">
            <div class="right-side-pro">产品名称：</div>
            <div class="right-side-pro">产品型号：</div>
            <div class="right-side-pro">制造商：</div>
            <div class="right-side-pro">设备类别：</div>
          </div>
        </div>
        <div class="right-side-padding padding-top">
          <div class="right-side-flex">
            <span class="right-side-leftText">维修专业参数</span>
            <span class="right-side-rightText">更多</span>
          </div>
          <div style="padding:20px">
            <div class="right-side-pro">排烟温度：</div>
            <div class="right-side-pro">发火顺序：</div>
          </div>
        </div>
        <div class="right-side-padding padding-top">
          <div class="right-side-flex">
            <span class="right-side-leftText">技术档案</span>
            <span class="right-side-rightText">更多</span>
          </div>
          <div style="padding:20px">
            <div class="right-side-rightText breadcrumb">设备说明书.pdf</div>
            <div class="right-side-rightText">设备图纸.jpg</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkStrictly: false,
      shipData: [],
      shipform: {
        fleet: '',
        ship: '',
        equipmentName: '',
        a: true,
        b: true
      },
      fleetListOptions: [],
      shipListOptions: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  created() {
    this.shipData = [
      {
        label: '空气系统',
        deviceType: '1',
        children: [
          {
            label: '启动空气系统',
            deviceType: '1-1',
            children: [
              {
                deviceType: '1-1-1',
                label: '空压机'
              }
            ]
          },
          {
            label: '控制空气系统',
            deviceType: '1-2'
          }
        ]
      },
      {
        label: '主机',
        deviceType: '2'
      },
      {
        label: '副机系统',
        deviceType: '3',
        children: [
          {
            label: '副机',
            deviceType: '1-1'
          }
        ]
      }
    ];
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  .breadcrumb {
    margin-bottom: 20px;
  }
  .line {
    border-top: 1px solid #ccc;
    margin-bottom: 20px;
  }
  .router-body {
    overflow: hidden;
    .left-side {
      width: 20%;
      float: left;
    }
    .center-side {
      width: 50%;
      float: left;
      border-left: 1px solid #ccc;
      padding: 10px;
      .center-left {
        width: 62.5%;
        float: left;
      }
      .center-right {
        width: 37.5%;
        float: left;
        position: relative;
        .center-right-code {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          margin-left: -60px;
          margin-top: 15px;
        }
      }
      .button-flex {
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
      }
      .button-save {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      .button-topClass {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 5px;
      }
    }
    .right-side {
      width: 30%;
      float: left;
      padding: 10px;
      .right-side-padding {
        padding: 10px;
        height: 250px;
        border: 1px solid #ccc;
      }
      .padding-top {
        margin-top: 30px;
      }
      .right-side-flex {
        justify-content: space-between;
        display: flex;
      }
      .right-side-leftText {
        color: #606266;
        font-size: 14px;
      }
      .right-side-rightText {
        color: #1890ff;
        font-size: 14px;
        cursor: pointer;
      }
      .right-side-pro {
        color: #606266;
        font-size: 16px;
        margin-top: 15px;
      }
    }
  }
}
</style>
