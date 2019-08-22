import company from './company';

export default function () {
    return {
        path: '/',
        indexPage: { // 首页，
            path: ''
        },
        children: [
            ...company
        ],
        onLastClose: { // 有些特殊页面，当最后一个关闭，需要跳转到指定页面
            '/basicData/company/edit': '/basicData/company',
            '/bAccountManager/agencyAccount/AgencyAccountDetail': '/bAccountManager/agencyAccount',
            '/bAccountManager/entryAndExit/EntryAndExitApply': '/bAccountManager/entryAndExit'
        }
    };
};