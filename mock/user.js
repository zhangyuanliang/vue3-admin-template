const roles = [
  {
    searchValue: null,
    createBy: null,
    createTime: null,
    updateBy: null,
    updateTime: null,
    remark: null,
    params: {},
    roleId: 1,
    roleName: '系统管理员',
    roleKey: 'admin',
    roleSort: '1',
    dataScope: '1',
    menuCheckStrictly: false,
    deptCheckStrictly: false,
    status: '0',
    delFlag: null,
    flag: false,
    menuIds: null,
    deptIds: null,
    admin: true
  }
]
export default [
  {
    url: '/api/createUser',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 0,
        message: 'ok',
        data: null
      }
    }
  },
  {
    url: '/dev_api/login',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        msg: '操作成功',
        code: 200,
        token:
          'eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImQ5YTc5Yzg2LWQzMjQtNDBjZC05ZDVlLTY3OTM0ZGMwMjlkNyJ9.LeRqxR1S9BK6lHCGWNGeuvM0gDqgDICvemPX8JM9WtE6_c6IUaPlyvBq_GETwwPQAhO7IxuDvAHhhQzM7CVHeg'
      }
    }
  },
  {
    url: '/dev_api/logout',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 200,
        message: 'ok',
        data: {}
      }
    }
  },
  {
    url: '/dev_api/getInfo',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 200,
        message: 'ok',
        permissions: ['*:*:*'],
        roles: ['admin'],
        user: {
          searchValue: null,
          createBy: 'admin',
          createTime: '2018-03-16 11:33:00',
          updateBy: null,
          updateTime: null,
          remark: '管理员',
          params: {},
          userId: 1,
          deptId: null,
          userName: 'admin',
          nickName: '系统管理员',
          email: '975321416@163.com',
          phonenumber: '15888888888',
          sex: '1',
          avatar: '',
          password: '$2a$10$wiogkKfZf2gZxfAldUaY4O6RHL.DJtYldjQIaSgHcnQQBbOrOcjhy',
          salt: null,
          status: '0',
          delFlag: '0',
          loginIp: '10.68.12.165',
          loginDate: '2022-06-16T09:45:38.000+08:00',
          dept: null,
          roles: roles,
          roleIds: null,
          postIds: null,
          roleId: null,
          admin: true
        }
      }
    }
  },
  {
    url: '/dev_api/captchaImage',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 200,
        img: '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',
        msg: '操作成功...',
        uuid: '0e909c59c5db42d78d36d94f128d5f47'
      }
    }
  }
]
