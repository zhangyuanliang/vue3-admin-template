export default [
  {
    url: '/dev_api/queryDictionary',
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
              dicName: '职称级别',
              dicType: 'sys_title_level',
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
              dicName: '民族',
              dicType: 'sys_nation',
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.15.116',
              email: '975321416@163.com',
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
    url: '/dev_api/queryDictionaryValue',
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
              dicName: '正高',
              dicValue: '1',
              sort: '1',
              status: '正常',
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
              dicName: '副高',
              dicValue: '2',
              sort: '2',
              status: '正常',
              browser: 'Chrome',
              browserVersion: '106.0.5249.119（正式版本）',
              createTime: '2018-03-16 11:33:00',
              operation: '修改用户',
              ip: '192.168.15.116',
              email: '975321416@163.com',
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
