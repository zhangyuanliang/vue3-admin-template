export default [
  {
    url: '/dev_api/queryParameter',
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
              userId: '1460054784705835009',
              userName: 'lilong',
              realName: '评审步骤',
              dataDepId: '1422741132550489274',
              dataDeptName: '千佛山医院本级',
              dataOrgId: '1435148255867535398',
              dataOrgName: '千佛山医院',
              status: null,
              roleId: '3',
              roleName: 'psbz',
              isActive: 1,
              credentialType: null,
              credentialNum: null,
              realDeptId: null,
              realDeptName: null,
              realOrgId: null,
              realOrgName: null,
              sort: 1,
              createTime: '2018-03-16 11:33:00',
              email: '是',
              phonenumber: '1,2,3'
            },
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
