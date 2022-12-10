import React from 'react';
import { Breadcrumb, Layout, Menu, ConfigProvider } from 'antd';
import { Routes, Route, Navigate, BrowserRouter, Link } from 'react-router-dom';
import { RouteNames, routes } from './router';

import 'antd/dist/antd.css';
import './App.scss';

import { useStores } from './hooks/useStores';
import Home from './pages/Home/Home';
import { observer } from 'mobx-react-lite';

const { Header, Content, Footer } = Layout;

const App: React.FC = observer(() => {
    const [collapsed, setCollapsed] = React.useState(false);

    const { operatorStore } = useStores();

    return (
        <ConfigProvider
            /*
            // @ts-ignore */
            theme={{
                token: {
                    colorPrimary: '#00b96b',
                },
            }}
        >
            <Layout className='layout tender__layout'>
                <Header>
                    {/* <div className='logo' />
                <Menu
                    theme='dark'
                    mode='horizontal'
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                        const key = index + 1;
                        return {
                            key,
                            label: `nav ${key}`,
                        };
                    })}
                /> */}
                    <div className='home-header'></div>
                </Header>
                <Content style={{ padding: '20px 0px 0 0px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                    <Home />
                </Content>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
        </ConfigProvider>
    );
});

export default App;
