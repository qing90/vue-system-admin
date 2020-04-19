import Mock from 'mockjs'
import { deepClone } from '../../src/utils/index.js'
import { asyncRoutes, constantRoutes } from './routes.js'

const routes = deepClone([...constantRoutes, ...asyncRoutes])

const roles = [
  {
    key: 'admin',
    name: 'admin',
    description: 'Super Administrator. Have access to view all pages.',
    routes: routes
  },
  {
    key: 'editor',
    name: 'editor',
    description: 'Normal Editor. Can see all pages except permission page',
    routes: routes.filter(i => i.path !== '/permission')// just a mock
  },
  {
    key: 'visitor',
    name: 'visitor',
    description: 'Just a visitor. Can only see the home page and the document page',
    routes: [{
      path: '',
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          meta: { title: 'dashboard', icon: 'dashboard' }
        }
      ]
    }]
  }
]

const country = {
    records:[{
      shipCode:'MH_001',
      applyNo:'202004170001',
      repairType:'1',
      planRepairDate:'2020-04-17',
      lastRepairDate:'2020-01-17',
      proposer:'SYSTEM',
      applyDate:'2020-04-17'
    },
    {
      shipCode:'MH_002',
      applyNo:'202004170002',
      repairType:'2',
      planRepairDate:'2020-04-17',
      lastRepairDate:'2020-01-17',
      proposer:'SYSTEM',
      applyDate:'2020-04-17'
    },
    {
      shipCode:'MH_003',
      applyNo:'202004170003',
      repairType:'3',
      planRepairDate:'2020-04-17',
      lastRepairDate:'2020-01-17',
      proposer:'SYSTEM',
      applyDate:'2020-04-17'
    }],
    totalRecord:"3"
  } 

export default [
  // mock get all routes form server
  {
    url: '/vue-element-admin/routes',
    type: 'get',
    response: _ => {
      return {
        msg: '请求成功',
        success: true,
        data: routes
      }
    }
  },

  // mock get all roles form server
  {
    url: '/vue-element-admin/roles',
    type: 'get',
    response: _ => {
      return {
        msg: '请求成功',
        success: true,
        data: roles
      }
    }
  },
  {
    url: '/vue-element-admin/role/routes',
    type: 'get',
    response: config => {
      return {
        msg: '请求成功',
        success: true,
        data: roles[0].routes
      }
      // for (const role of roles) {
      //   if (role.key === config.role) {
      //     return {
      //       msg: '请求成功',
      //       success: true,
      //       data: role.routes
      //     }
      //   }
      // }
    }
  },
  // add role
  {
    url: '/vue-element-admin/role',
    type: 'post',
    response: {
      msg: '操作成功',
      success: true,
      data: {
        key: Mock.mock('@integer(300, 5000)')
      }
    }
  },

  // update role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'put',
    response: {
      msg: '请求成功',
      success: true,
      data: {
        status: 'success'
      }
    }
  },

  // delete role
  {
    url: '/vue-element-admin/role/[A-Za-z0-9]',
    type: 'delete',
    response: {
      msg: '操作成功',
      success: true,
      data: {
        status: 'success'
      }
    }
  },

    // mock get country form server
    {
      url: '/vue-element-admin/getShipRepairpplyList',
      type: 'get',
      response: _ => {
        return {
          msg: '请求成功',
          success: true,
          data: country
        }
      }
    }

]
