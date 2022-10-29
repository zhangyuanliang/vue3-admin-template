export default [
  {
    url: '/dev_api/onlineAssessment/audit/list',
    method: 'get',
    response: ({ query }) => {
      console.log('id>>>>>>>>', query.id)
      let list = []
      for (let i = 1; i <= 12; i++) {
        list.push({
          "searchValue": null,
          "createBy": "",
          "createTime": "2022-06-07",
          "updateBy": "商河县",
          "updateTime": null,
          "remark": 'xxx村',
          "params": {},
          "noticeId": "济南市",
          "noticeTitle": "字典变更",
          "noticeType": '国家卫生县',
          "noticeContent": "xxx镇",
          "status": "已评估",
          "noticeFileUrl": "http://124.133.43.228:9000/open-platform-test/2022-06-07/20220607105655846.xlsx"
        })
      }
      return {
        code: 200,
        msg: '操作成功...',
        data: list
      }
    },
  },
]
