let NavList = {
    ResID: 9999,
    NavUrl: "/",
    Name: '人职初',
    Remark: "测试内容51b5",
    Type: 0,
    SubResources: [
        {
            ResID: 1,
            NavUrl: "/conpany",
            Name: '企业管理',
            Remark: "测试内容51b5",
            Type: 1,
            SubResources: [
                {
                    ResID: 11,
                    Name: '企业审核',
                    isAuth: true,
                    NavUrl: "/conpany/conpanylist",
                    Remark: "测试内容1",
                    SubResources: [],
                    Type: 1
                },
                {
                    ResID: 12,
                    Name: '名企',
                    isAuth: true,
                    NavUrl: "/CompanyStar",
                    Remark: "测试内容1",
                    SubResources: [],
                    Type: 1
                }
            ]
        }
    ]
};
export default NavList;