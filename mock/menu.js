export default [
  {
    url: '/dev_api/queryMenu',
    method: 'get',
    response: ({ body }) => {
      console.log('body>>>>>>>>', body)
      return {
        code: 200,
        msg: null,
        data: {
          records: [
            {
              id: 1,
              date: '2016-05-02',
              name: '工作台',
              type: '目录',
              sort: 1,
              authCharacter: 'workbench'
            },
            {
              id: 2,
              name: '系统管理',
              type: '目录',
              sort: 2,
              authCharacter: 'menu',
              children: [
                {
                  id: 21,
                  name: '用户管理',
                  type: '菜单',
                  sort: 1,
                  authCharacter: 'user',
                  children: [
                    {
                      id: 211,
                      name: '用户新增',
                      type: '按钮',
                      sort: 1,
                      authCharacter: 'orgination_create',
                    },
                    {
                      id: 211,
                      name: '用户修改',
                      type: '按钮',
                      sort: 2,
                      authCharacter: 'orgination_update',
                    },
                    {
                      id: 211,
                      name: '用户删除',
                      type: '按钮',
                      sort: 3,
                      authCharacter: 'orgination_delete',
                    }
                  ]
                },
                {
                  id: 22,
                  name: '组织管理',
                  type: '菜单',
                  sort: 2,
                  authCharacter: 'organization',
                  children: [
                    {
                      id: 211,
                      name: '组织新增',
                      type: '按钮',
                      sort: 1,
                      authCharacter: 'user_create',
                    },
                    {
                      id: 211,
                      name: '组织修改',
                      type: '按钮',
                      sort: 2,
                      authCharacter: 'user_update',
                    },
                    {
                      id: 211,
                      name: '组织删除',
                      type: '按钮',
                      sort: 3,
                      authCharacter: 'user_delete',
                    }
                  ]
                },
                {
                  id: 23,
                  name: '字典管理',
                  type: '菜单',
                  sort: 3,
                  authCharacter: 'dictionary'
                }
              ]
            }
          ]
        },
        success: true
      }
    }
  }
]
