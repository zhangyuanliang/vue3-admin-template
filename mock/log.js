export default [
  {
    url: '/dev_api/queryLog',
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
              realName: '李龙',
              system: 'windows',
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.13.268',
              email: '975321416@163.com',
              phonenumber: '15888888888'
            },
            {
              id: '1460054797452324865',
              realName: '管理员',
              system: 'MacOS',
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.15.116',
              email: '975321416@163.com',
              phonenumber: '15888888888'
            }
          ],
          total: 12,
          size: '20',
          current: '1',
          orders: [],
          searchCount: true,
          pages: '2'
        },
        success: true
      }
    }
  }
]
