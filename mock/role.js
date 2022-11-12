export default [
  {
    url: '/api/getRoleById',
    method: 'get',
    response: ({ query }) => {
      console.log('id>>>>>>>>', query.id)
      return {
        code: 0,
        message: 'ok',
        data: {
          roleName: 'admin',
          roleValue: 'admin'
        }
      }
    }
  },
  {
    url: '/dev_api/queryRole',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 200,
        msg: null,
        data: {
          records: [
            {
              id: '1460054797452324864',
              roleName: '系统管理员',
              realName: '李倩倩',
              organization: '山东省卫生健康委员会',
              status: 1,
              roleType: 'sys_title_level',
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.13.268',
              email: '171221416@163.com',
              phonenumber: '15888888888'
            },
            {
              id: '1460054797452324865',
              roleName: '普通用户',
              realName: '李连成',
              organization: '济南市卫生健康委员会',
              status: 2,
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.15.116',
              email: '171221416@163.com',
              phonenumber: '15888888888'
            }
          ],
          total: 2,
          size: '20',
          current: '1',
          orders: [],
          searchCount: true,
          pages: '2'
        },
        success: true
      }
    }
  },
  {
    url: '/dev_api/queryRoleLink',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 200,
        msg: null,
        data: {
          records: [
            {
              id: '1460054797452324864',
              roleName: 'mikkicy',
              realName: '李倩倩',
              organization: '山东省卫生健康委员会',
              status: 1,
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.13.268',
              email: '171221416@163.com',
              phonenumber: '15888888888'
            },
            {
              id: '1460054797452324865',
              roleName: 'li.cheng',
              realName: '李倩倩',
              organization: '山东省卫生健康委员会',
              status: 1,
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.15.116',
              email: '171221416@163.com',
              phonenumber: '15888888888'
            }
          ],
          total: 2,
          size: '20',
          current: '1',
          orders: [],
          searchCount: true,
          pages: '2'
        },
        success: true
      }
    }
  },
]
