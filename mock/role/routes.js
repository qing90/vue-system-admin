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
      },
      {
        path: 'managementEfficiency',
        name: 'Menu2',
        component: 'views/nested/menu2/index',
        meta: { title: 'managementEfficiency' }
      },
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
        path: 'shipRepairingManagement',
        component: 'views/efficiency/shipRepairingManagement/index',
        name: 'Menu1',
        meta: { title: 'shipRepairingManagement' },
        redirect: '/nested/menu1/menu1-1',
        children: [
          {
            path: 'repairList',
            component: 'views/efficiency/shipRepairingManagement/repairList',
            name: 'repairList',
            meta: { title: 'repairList' }
          },
          {
            path: 'dockRepairPlan',
            component: 'views/efficiency/shipRepairingManagement/dockRepairPlan',
            name: 'DockRepairPlan',
            meta: { title: 'dockRepairPlan' }
          },
          {
            path: 'shipRepairingApplication',
            component: 'views/nested/menu1/menu1-2',
            name: 'Ship Repairing Application',
            redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'shipRepairingApplication' },
            children: [
              {
                path: 'menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'applyForDetail' }
              },
              {
                path: 'menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'applyForDetail2' }
              }
            ]
          },
          {
            path: 'shipRepairInginquiry',
            name: 'ShipRepairInginquiry',
            component: 'views/nested/menu2/index',
            meta: { title: 'shipRepairInginquiry' }
          },
          {
            path: 'repairOrder',
            component: 'views/nested/menu1/menu1-1',
            name: 'repairList',
            meta: { title: 'repairOrder' }
          },
          {
            path: 'repairTracking',
            component: 'views/nested/menu1/menu1-1',
            name: 'repairTracking',
            meta: { title: 'repairTracking' }
          },
          {
            path: 'repairLegacy',
            component: 'views/nested/menu1/menu1-1',
            name: 'repairLegacy',
            meta: { title: 'repairLegacy' }
          }
        ]
      },
      {
        path: 'efficiencyHome',
        component: 'views/nested/menu1/menu1-3',
        name: 'EfficiencyHome',
        meta: { title: 'efficiencyHome' }
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
  }
]