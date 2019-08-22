import React from "react";
import { Layout, Spin } from 'antd';
import '../assets/less/pages/main.less';
import TabView from "../components/TabView";
import NavView from "../components/NavView";
import HeadView from "../components/HeadView";
import { observer, inject } from "mobx-react";


const { Header, Content } = Layout;
@inject('authStore')
@observer
class Home extends React.Component {

    handleNavViewChange = (obj) => {
        let path = obj && obj.item && obj.item.props && obj.item.props.path;
        if (path) this.props.homeStore.handleTabPageChange(path, 'nav');
    };

    render() {
        const { hideTabView, homeStore, authStore, onLoadResources } = this.props;
        const { handleLogout, authInfo } = authStore;
        const { navCollapsed, handleNavToggle, MenuList, navOpenKeys, navSelectedKeys, handleNavOpenChange } = homeStore;
        return (
            <Layout className='main-layout-container'>
                <NavView
                    menuList={MenuList}
                    collapsed={navCollapsed}
                    openKeys={navOpenKeys.slice()}
                    selectedKeys={navSelectedKeys}
                    handleMenuOpenChange={handleNavOpenChange}
                    handleMenuItemClick={this.handleNavViewChange} />
                <Layout>
                    <Header>
                        <HeadView onTriggerClick={handleNavToggle} collapsed={navCollapsed}
                            handleLogout={handleLogout}
                            accountInfo={{
                                Name: authInfo.username,
                                RoleName: authInfo.RoleName,
                                SPName: authInfo.SPName
                            }}
                        />
                    </Header>
                    <TabContent
                        onLoadResources={onLoadResources}
                        homeStore={homeStore}
                        hideTabView={hideTabView}>
                        {this.props.children}
                    </TabContent>
                </Layout>
            </Layout>
        );
    }
}
export default Home;
@observer
class TabContent extends React.Component {

    componentDidMount() {
        this.props.homeStore.loadResources(this.props.onLoadResources);
    }

    handleTabViewChange = (key) => {
        this.props.homeStore.handleTabPageChange(key, 'tab');
    };

    render() {
        const { isLoadResource, tabList, tabActiveKey, handleTabEdit, handleTabOperate } = this.props.homeStore;
        return (
            <Content className='main-layout-content-container'>
                {!this.props.hideTabView && <TabView
                    tabList={tabList}
                    handleTabEdit={handleTabEdit}
                    handleTabOperate={handleTabOperate}
                    handleTabClick={this.handleTabViewChange}
                    activeKey={tabActiveKey} />}
                {
                    isLoadResource ? <div className='main-layout-content'>
                        <div className='main-layout-content-page'>
                            {this.props.children}
                        </div>
                    </div> : <Spin />
                }
            </Content>
        );
    }
}
