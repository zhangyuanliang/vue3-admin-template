export default [
  {
    url: '/dev_api/queryUser',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        "code": 200,
        "msg": null,
        "data": {
          "records": [
            {
              "id": "1460054797452324864",
              "userId": "1460054784705835009",
              "userName": "lilong",
              "realName": "李龙",
              "dataDepId": "1422741132550489274",
              "dataDeptName": "千佛山医院本级",
              "dataOrgId": "1435148255867535398",
              "dataOrgName": "千佛山医院",
              "status": null,
              "roleId": "3",
              "roleName": "内置系统管理员",
              "isActive": 1,
              "credentialType": null,
              "credentialNum": null,
              "realDeptId": null,
              "realDeptName": null,
              "realOrgId": null,
              "realOrgName": null,
              "sort": 1,
              "createTime": "2018-03-16 11:33:00",
              "email": "975321416@163.com",
              "phonenumber": "15888888888",
            },
            {
              "id": "1460054797452325647",
              "userId": "1",
              "userName": "admin",
              "realName": "平台管理员",
              "dataDepId": "1422741132550489274",
              "dataDeptName": "千佛山医院本级",
              "dataOrgId": "1435148255867535398",
              "dataOrgName": "千佛山医院",
              "status": null,
              "roleId": "3",
              "roleName": "内置系统管理员",
              "isActive": 1,
              "credentialType": null,
              "credentialNum": null,
              "realDeptId": null,
              "realDeptName": null,
              "realOrgId": null,
              "realOrgName": null,
              "sort": 1,
              "createTime": "2019-01-26 14:52:09",
              "email": "142321416@163.com",
              "phonenumber": "13999999999",
            },
          ],
          "total": 2,
          "size": "20",
          "current": "1",
          "orders": [],
          "searchCount": true,
          "pages": "68"
        },
        "success": true
      }
    },
  },

]