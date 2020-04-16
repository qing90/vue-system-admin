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
            path: 'shipRepairingApplication',
            component: 'views/efficiency/shipRepairingManagement/shipRepairApply/shipRepairApply',
            name: 'ShipRepairingApplication',
            //redirect: '/nested/menu1/menu1-2/menu1-2-1',
            meta: { title: 'shipRepairingApplication' },

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
        path: 'efficiencyHome',
        component: 'views/nested/menu1/menu1-3',
        name: 'EfficiencyHome',
        meta: { title: 'efficiencyHome' }
      },
      {
        path: '/equ-management',
        component: 'views/equ-management/index',
        name: 'Equmanger',
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
    ],
  }

]
