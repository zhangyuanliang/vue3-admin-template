const treeData = [
  {
    id: 100,
    label: '协调推进情况',
    children: [
      {
        id: 101,
        label: '召开协调推进工作会议，就跨部门事项进行协调推进',
        children: [
          {
            id: 102,
            label: '由推进委员会主要负责同志牵头召开推进工作会议',
          },
          {
            id: 103,
            label: '审议上年考核结果',
          },
          {
            id: 104,
            label: '总结上年工作',
          },
          {
            id: 105,
            label: '审议并印发本年度工作要点',
          },
          {
            id: 106,
            label: '推进办召开工作协调会议2次及以上落实有关工作要求',
          },
        ],
      },
    ],
  },
  {
    id: 107,
    label: '监测评估机制',
    children: [
      {
        id: 108,
        label: '开展山东省健康中国行动考核系统监测评估（组织实施监测评估工作，形成省级监测评估报告）',
        children: [
          {
            id: 109,
            label: '监测评估指标数据',
          },
          {
            id: 110,
            label: '各专项行动进展',
          },
          {
            id: 111,
            label: '年度重点任务落实情况',
          },
          {
            id: 112,
            label: '组织实施及支撑保障情况',
          },
          {
            id: 113,
            label: '按照时间节点报送监测评估报告',
          },
        ],
      },
    ],
  },
  {
    id: 114,
    label: '考核评价机制',
    children: [
      {
        id: 115,
        label: '开展对下一级的考核',
        children: [
          {
            id: 116,
            label: '印发考核实施方案',
          },
          {
            id: 117,
            label: '开展对下一级地方党委、政府上一年度山东省健康中国行动考核系统的考核评价',
          },
          {
            id: 118,
            label: '形成考核结果',
          },
          {
            id: 119,
            label: '按本省组织实施和考核方案做好考核结果运用',
          },
        ],
      },
    ],
  },
  {
    id: 120,
    label: '宣传推广机制',
    children: [
      {
        id: 121,
        label: '加强健康中国建设、山东省健康中国行动考核系统的宣传推广',
        children: [
          {
            id: 122,
            label: '建立完善省级健康中国建设或山东省健康中国行动考核系统宣传平台',
          },
          {
            id: 123,
            label: '每年为山东省健康中国行动考核系统专网提供稿件',
          },
          {
            id: 124,
            label: '开展山东省健康中国行动考核系统（含专项行动）主题宣传活动',
          },
          {
            id: 125,
            label: '开展山东省健康中国行动考核系统典型案例宣传推广',
          },
          {
            id: 126,
            label: '组织设立形象大使',
          },
          {
            id: 127,
            label: '开展“健康达人”评选活动',
          },
        ],
      },
    ],
  },
  {
    id: 128,
    label: '支撑保障机制',
    children: [
      {
        id: 129,
        label: '发挥省级专家咨询委员会专家咨询作用',
        children: [
          {
            id: 130,
            label: '组织省级专家咨询委员会专家（人数不少于3人）参与山东省健康中国行动考核系统重大问题、相关规划与方案、政策研究等前期研究和评审论证',
          },
          {
            id: 131,
            label: '参与山东省健康中国行动考核系统调研、督导等相关工作',
          },
          {
            id: 132,
            label: '参与山东省健康中国行动考核系统监测、考核等相关工作',
          },
        ],
      },
    ],
  },
  {
    id: 133,
    label: '把健康融入所有政策情况',
    children: [
      {
        id: 134,
        label: '开展健康影响评估制度试点工作',
        children: [
          {
            id: 135,
            label: '指导试点地区出台健康影响评估工作部署文件',
          },
          {
            id: 136,
            label: '建立工作推进机制',
          },
          {
            id: 137,
            label: '按照试点要求对公共政策和工程项目开展健康影响评估',
          },
          {
            id: 138,
            label: '定期开展效果评估井推动开展省级试点',
          },
        ],
      },
      {
        id: 139,
        label: '开展健康城市建设和健康细胞建设',
        children: [
          {
            id: 140,
            label: '辖区开展健康城市建设',
          },
          {
            id: 141,
            label: '参与年度全国健康城市评价',
          },
          {
            id: 142,
            label: '省级出台开展健康细胞建设工作部署文件',
          },
          {
            id: 143,
            label: '开展健康细胞建设',
          },
        ],
      },
    ],
  },
];
export default [
  {
    url: '/dev_api/hci/task/102',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        "msg": "操作成功",
        "code": 200,
        "data": {
          "id": 102,
          "parentId": 101,
          "ancestors": "0,100,101",
          "taskName": "由推进委员会主要负责同志牵头召开推进工作会议",
          "orderNum": 1,
          "status": "0",
          "xgxxDictId": "1,2,3",
          "score": "5",
          "children": [],
          "xdList": [
            {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "id": 1,
              "name": "牵头同志及职务",
              "type": "text"
            },
            {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "id": 2,
              "name": "会议时间",
              "type": "date"
            },
            {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "id": 3,
              "name": "新闻报道链接",
              "type": "text"
            }
          ],
          "organizeImplementResultVO": {
            "organizeImplement": {
              "id": 16,
              "taskId": 102,
              "selfAssessment": "自评情况",
              "selfScore": "9",
              "areaCode": "123",
              "year": "2021",
              "reportDate": "2022-07-04",
              "remake": null
            },
            "materialResultList": [
              {
                "xgxxInfo": {
                  "id": 38,
                  "implementId": 16,
                  "taskId": 102,
                  "xg1": "牵头同志及职务",
                  "xg2": "2022-07-04",
                  "xg3": "新闻报道链接",
                  "xg4": null
                },
                "fileInfoList": [
                  {
                    "fileId": "d1d2e43e9c864cd3b15f4007fdf6c065",
                    "fileName": "1.jpeg",
                    "filePath": "F://test/d1d2e43e9c864cd3b15f4007fdf6c065_1.jpeg",
                    "taskId": 102,
                    "implementId": 16,
                    "xgxxId": 38
                  }
                ]
              }
            ]
          }
        }
      }
    },
  },
  {
    url: '/dev_api/hci/task/103',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        msg: '操作成功...',
        code: 200,
        data: {
          "id": 103,
          "parentId": 101,
          "ancestors": "0,100,101",
          "taskName": "审议上年考核结果",
          "orderNum": 2,
          "status": "0",
          "xgxxDictId": "4,5,6",
          "score": "3",
          "children": [],
          "xdList": [
            {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "id": 4,
              "name": "发文主体",
              "type": "text"
            },
            {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "id": 5,
              "name": "文号",
              "type": "text"
            },
            {
              "searchValue": null,
              "createBy": null,
              "createTime": null,
              "updateBy": null,
              "updateTime": null,
              "remark": null,
              "params": {},
              "id": 6,
              "name": "发文日期",
              "type": "date"
            }
          ],
          "organizeImplementResultVO": {
            "organizeImplement": {
              "id": 15,
              "taskId": 103,
              "selfAssessment": "自评情况",
              "selfScore": "9",
              "areaCode": "123",
              "year": "2021",
              "reportDate": "2022-07-04",
              "remake": null
            },
            "materialResultList": [
              {
                "xgxxInfo": {
                  "id": 37,
                  "implementId": 15,
                  "taskId": 103,
                  "xg1": "发文主体",
                  "xg2": "文号",
                  "xg3": "2022-07-04",
                  "xg4": null
                },
                "fileInfoList": [
                  {
                    "fileId": "8668eec22ede473babbfad459ee0eeb5",
                    "fileName": "2022年面试官培训考试题.pdf",
                    "filePath": "F://test/8668eec22ede473babbfad459ee0eeb5_2022年面试官培训考试题.pdf",
                    "taskId": 103,
                    "implementId": 15,
                    "xgxxId": 37
                  }
                ]
              }
            ]
          }
        }
      };
    },
  },
  {
    url: '/dev_api/hci/implement/add',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        code: 200,
        message: '操作成功...',
        data: null,
      };
    },
  },
  {
    url: '/dev_api/hci/implement/getInfo',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        code: 200,
        message: '操作成功...',
        data: {},
      };
    },
  },
  {
    url: '/dev_api/hci/implement/saveXgxx',
    method: 'post',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        code: 200,
        message: '操作成功...',
        data: null,
      };
    },
  },
  {
    url: '/dev_api/hci/task/organizeTaskTreeSelect',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body);
      return {
        msg: '操作成功...',
        code: 200,
        organizeTasks: treeData,
      };
    },
  },
];
