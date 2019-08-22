import React from 'react';
import { Input, Button, Form, Icon, message } from 'antd';
import { authStore } from '../../store';
import { observer, inject } from "mobx-react";
import { Redirect } from 'react-router-dom';
import '../../assets/less/pages/login.less';
import createFormField from '../../utils/createFormField';
import Copyright from './copyright';
import logo from '../../assets/images/logo.png';
@Form.create({
    mapPropsToFields: (props, fields) => createFormField(props.formInfo, true),
    onFieldsChange: (props, changedFields) => props.onFieldsChange(changedFields)
    // onValuesChange: (props, changedValues, allValues) => props.onValuesChange(changedValues, allValues)
})
class LoginForm extends React.Component {
    state = { codeTimeDown: -1 };

    componentWillUnmount() {
        if (this.interval) clearInterval(this.interval);
    }

    handleSendCode = () => {
        if (this.interval) clearInterval(this.interval);
        this.props.getVCode().then(res => {
            this.codeTimeDown = 59;
            this.setState({ codeTimeDown: this.codeTimeDown });
            this.interval = setInterval(() => {
                if (this.codeTimeDown > 0) {
                    --this.codeTimeDown;
                    this.setState({ codeTimeDown: this.codeTimeDown });
                } else {
                    clearInterval(this.interval);
                }
            }, 1000);
        }).catch(err => {
            message.error(err.message);
            console.log(err);
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) return;
            this.props.handleLogin(fieldsValue);
        });
    };

    render() {
        const { form, loginEnable, sendCodeEnable, loginLoading, getVCodeLoading } = this.props;
        const { codeTimeDown } = this.state;
        const getFieldDecorator = form.getFieldDecorator;
        console.log(sendCodeEnable, sendCodeEnable, '111')
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: '手机号必填' },
                        ]
                    })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="手机" autoComplete="off" />
                    )}
                </Form.Item>
                <div className='login-form-item'>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '请输入正确的验证码' },
                                { min: 4, message: '请输入正确的验证码' }
                            ]
                        })(<Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="验证码"
                            autoComplete="off" />
                        )}
                    </Form.Item>
                </div>
                <div className='login-wrap'>
                    <Button type="primary" htmlType="submit"
                        className='w-100 login'
                        loading={loginLoading}
                        disabled={!loginEnable}>登录</Button>
                </div>

            </Form>
        );
    }
}

@inject('authStore')
@observer
class PagesHome extends React.Component {

    render() {
        const { isLogin, loginFormInfo, handleLogin, getVCode, handleFormFieldsChange, loginEnable, sendCodeEnable, loginLoading, getVCodeLoading } = this.props.authStore;
        const location = this.props.location;
        if (isLogin) {
            let pathname = location.state && location.state.from && location.state.from.pathname;
            if (!pathname || pathname.match('.aspx')) pathname = '/';
            return <Redirect to={{ pathname, state: { from: location } }} />;

        } else {
            return <div className='login-container'>
                <div className='login-title'>

                    <img className='logo' src={logo} />

                    <h1>人职初</h1>
                </div>
                <LoginForm onFieldsChange={handleFormFieldsChange} loginEnable={loginEnable}
                    sendCodeEnable={sendCodeEnable}
                    getVCode={getVCode} getVCodeLoading={getVCodeLoading}
                    loginLoading={loginLoading} handleLogin={handleLogin} formInfo={loginFormInfo} />
                <Copyright />
            </div>;
        }
    }
}
export default PagesHome
