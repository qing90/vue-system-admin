// Just a mock data
export const constantRoutes = [

]

export const asyncRoutes = [
  {
    path: '/permission',
    component: 'layout',
    redirect: '/permission/menu',
    alwaysShow: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'menu',
        component: 'views/permission/menu',
        name: 'PagePermission',
        meta: {
          title: 'pagePermission'
        }
      },
      {
        path: 'directive',
        component: 'views/permission/directive',
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
        }
      },
      {
        path: 'role',
        component: 'views/permission/role',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/nested',
    component: 'layout',
    redirect: '/nested/menu1/menu1-1',
    name: 'Nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: 'views/nested/menu1/index',
        name: 'Menu1',
        meta: { title: 'menu1' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'menu1-1',
            component: 'views/nested/menu1/menu1-1',
            name: 'Menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: 'views/nested/menu1/menu1-2',
            name: 'Menu1-2',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: 'views/nested/menu1/menu1-3',
            name: 'Menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        component: 'views/nested/menu2/index',
        meta: { title: 'menu2' }
      }
    ]
  },
  {
    path: '/error-log',
    component: 'layout',
    redirect: '/error-log/log',
    children: [
      {
        path: 'log',
        component: 'views/error-log/index',
        name: 'ErrorLog',
        meta: { title: 'errorLog', icon: 'bug' }
      }
    ]
  },
  {
    path: '/nation',
    component: 'layout',
    redirect: '/nation/index',
    children: [
      {
        path: 'index',
        component: 'views/nation/index',
        name: 'Nation',
        meta: { title: 'country', icon: 'bug' }
      }
    ]
  },

  {
    path: '/managementEfficiency',
    component: 'layout',
    redirect: '/nested/menu1/menu1-1',
    name: 'Efficiency',
    meta: {
      title: 'managementEfficiency',
      icon: 'nested'
    },
    children: [
      {
        path: 'efficiencyHome',
        component: 'views/nested/menu1/menu1-3',
        name: 'EfficiencyHome',
        meta: { title: 'efficiencyHome' }
      },
      {
        path: 'shipRepairingManagement',
        component: 'views/efficiency/shipRepairingManagement/index',// '',
        name: 'Menu1',
        meta: { title: 'shipRepairingManagement' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'repairList',
            component: 'views/efficiency/shipRepairingManagement/repairList/repairList',
            name: 'repairList',
            meta: { title: 'repairList' }
          },
          {
            path: 'dockRepairPlan',
            component: 'views/efficiency/shipRepairingManagement/dockRepairPlan/dockRepairPlan',
            name: 'repairLegacy',
            meta: { title: 'dockRepairPlan' }
          },
          {
            path: 'shipRepairingApplication',
            component: 'views/efficiency/shipRepairingManagement/shipRepairApply/shipRepairApply',
            name: 'ShipRepairingApplication',
            //redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'shipRepairingApplication' },
          },
          {
            path: '/addShipRepairApply',
            component: 'views/efficiency/shipRepairingManagement/shipRepairApply/addShipRepairApply',
            name: 'addShipRepairApply',
            hidden:true,
            //redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'addShipRepairApply' }
          },
          {
            path: '/shipRepairApproval',
            component: 'views/efficiency/shipRepairingManagement/shipRepairApply/shipRepairApproval',
            name: 'shipRepairApproval',
            hidden:true,//修船申请审批页面
            meta: { title: 'shipRepairApproval' }
          },
          // {
          //   path: '/standardProject',
          //   component: 'views/efficiency/shipRepairingManagement/shipRepairApply/standardProject',
          //   name: 'standardProject',
          //   hidden:true,//选择标准项目
          //   meta: { title: 'standardProject' }
          // },
          // {
          //   path: '/repaiLegacyItems',
          //   component: 'views/efficiency/shipRepairingManagement/shipRepairApply/repaiLegacyItems',
          //   name: 'repaiLegacyItems',//选择修理遗留项目
          //   hidden:true,
          //   meta: { title: 'repaiLegacyItems' }
          // },
          // {
          //   path: '/legacyWorkOrder',
          //   component: 'views/efficiency/shipRepairingManagement/shipRepairApply/legacyWorkOrder',
          //   name: 'legacyWorkOrder',
          //   hidden:true,//选择遗留工单
          //   meta: { title: 'legacyWorkOrder' }
          // },
          // {
          //   path: '/equipmentFailure',
          //   component: 'views/efficiency/shipRepairingManagement/shipRepairApply/equipmentFailure',
          //   name: 'equipmentFailure',
          //   hidden:true,//选择设备故障单
          //   meta: { title: 'equipmentFailure' }
          // },
          {
            path: 'shipRepairInginquiry',
            component: 'views/efficiency/shipRepairingManagement/shipRepairInginquiry/shipRepairInginquiry',
            name: 'repairLegacy',
            meta: { title: 'shipRepairInginquiry' }
          },
          {
            path: '/inginquiryDetail',
            component: 'views/efficiency/shipRepairingManagement/shipRepairInginquiry/inginquiryDetail',
            name: 'inginquiryDetail',
            hidden:true,
            //redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'inginquiryDetail' }
          },
          {
            path: '/addInginquiry',
            component: 'views/efficiency/shipRepairingManagement/shipRepairInginquiry/addInginquiry',
            name: 'addInginquiry',
            hidden:true,
            //redirect: '/nested/menu1/menu1-2/menu1-2-1', trackingDetail
            meta: { title: 'addInginquiry' }
          },
          {
            path: 'repairTracking',
            component: 'views/efficiency/shipRepairingManagement/repairTracking/repairTracking',
            name: 'repairLegacy',
            meta: { title: 'repairTracking' }
          },
          {
            path: '/trackingDetail',
            component: 'views/efficiency/shipRepairingManagement/repairTracking/trackingDetail',
            name: 'trackingDetail',
            hidden:true,
            //redirect: '/nested/menu1/menu1-2/menu1-2-1', trackingDetail
            meta: { title: 'trackingDetail' }
          },

          {
            path: 'repairLegacy',
            component: 'views/efficiency/shipRepairingManagement/repairLegacy/repairLegacy',
            name: 'repairLegacy',
            meta: { title: 'repairLegacy' }
          }
        ]
      },
      {
        path: 'equ-management',
        component: 'views/equ-management/index',
        name: 'Equmanger',
        redirect: '/nested/menu1/menu1-1',
        meta: {
          title: 'equmanger',
        },
        children: [
          {
            path: 'inventory',
            name: 'Inventory',
            component: 'views/equ-management/inventory/index',
            meta: {
              title: 'inventory'
            }
          },
          {
            path: 'inspect',
            name: 'Inspect',
            component: 'views/equ-management/inspect/index',
            meta: {
              title: 'inspect'
            }
          },
          {
            path: 'attachment',
            name: 'Attachment',
            component: 'views/equ-management/attachment/index',
            meta: {
              title: 'attachment'
            }
          },
          {
            path: 'materiel',
            name: 'Materiel',
            component: 'views/equ-management/materiel/index',
            meta: {
              title: 'materiel'
            }
          },

        ]
      },
      {
        path: 'equ-maintain',
        component: 'views/efficiency/equ-maintain/index',
        name: 'EquMaintain',
        meta: {
          title: 'equMaintainName',
        },
        children: [
          {
            path: 'shipEquInfo',
            component: 'views/efficiency/equ-maintain/shipEquInfo/index',
            name: 'ShipEquInfo',
            meta: {
              title: 'shipEquInfoName'
            },
          },
          {
            path: 'applyList',
            component: 'views/efficiency/equ-maintain/applyList/applyList',
            name: 'ApplyList',
            hidden:true,
            meta: {
              title: 'applyListName'
            },
          },
        ]
      },
    ],
  }

]
