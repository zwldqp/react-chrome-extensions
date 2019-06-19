import * as React from 'react';
import {
  Button,
  Input,
  Icon,
  Checkbox,
} from 'lamma-ui';
// import { IUser } from './common/user';
import './login.less';
import userDAO from './dao/user';
const defaultImg = require('./img/default-capture.png');

export interface IProps {
  // user: IUser;
  login(captcha: string, username: string, password: string, remember: boolean): Promise<any>;
  activateCaptcha: boolean;
}

export interface IState {
  username: string;
  password: string;
  isKeepLogin: boolean;
  captcha: string;
  usernameErrMsg: string;
  passwordErrMsg: string;
  captchaErrMsg: string;
  usernameOrPasswordErr: boolean;
  captchaSrc: string;
  loadingClassName: string;
}

export interface ISnapshot {
  shouldShowCaptch: boolean;
}

class Login extends React.Component<IProps> {
  state: IState = {
    captcha: '',
    username: '',
    password: '',
    isKeepLogin: false,
    usernameErrMsg: '',
    passwordErrMsg: '',
    captchaErrMsg: '',
    usernameOrPasswordErr: false,
    captchaSrc: defaultImg,
    loadingClassName: 'loading-show',
  };

  validateUserInput = () => {
    const {
      username,
      password,
      captcha,
    } = this.state;
    const { activateCaptcha } = this.props;
    const inputIsValid = (str: string): boolean => {
      return str.trim().length > 0;
    };

    const shouldUpdateState = {
      usernameErrMsg: '',
      passwordErrMsg: '',
      captchaErrMsg: '',
      usernameOrPasswordErr: false,
    };
    let shouldSendLoading = true;
    if (!inputIsValid(username)) {
      shouldSendLoading = false;
      shouldUpdateState.usernameErrMsg = '用户名不能为空';
    } else if (!inputIsValid(password)) {
      shouldSendLoading = false;
      shouldUpdateState.passwordErrMsg = '密码不能为空';
    } else if (activateCaptcha && !inputIsValid(captcha)) {
      shouldSendLoading = false;
      shouldUpdateState.captchaErrMsg = '验证码不能为空';
    }

    this.setState(shouldUpdateState);
    return shouldSendLoading;
  }

  componentDidMount() {
    // document.onkeydown = (e) => {
    //   if (e.keyCode === 13) {
    //     this.handleLogin();
    //   }
    // };
  }

  handleLogin = () => {
    if (!this.validateUserInput()) return;
    const {
      username,
      password,
      isKeepLogin,
      captcha,
    } = this.state;
    this.props.login(captcha, username, password, isKeepLogin)
    .catch((resp: any) => {
      const respMsg = resp.response.data.status;
      const shouldUpdateState = {
        captchaErrMsg: '',
        usernameErrMsg: '',
        passwordErrMsg: '',
        usernameOrPasswordErr: false,
      };
      // if (respMsg === '1500002') {
      //   // 验证码错了
      //   shouldUpdateState.captchaErrMsg = '验证码输入错误, 请重新输入';
      // } else if (respMsg === '1500003') {
      //   // 用户名密码错了
      //   shouldUpdateState.passwordErrMsg = '用户名或密码错误';
      //   shouldUpdateState.usernameOrPasswordErr = true;
      // } else if (respMsg === '1500001') {
      //   // 登录次数过多
      //   shouldUpdateState.passwordErrMsg = '登录次数过多，请稍后再试';
      //   shouldUpdateState.usernameOrPasswordErr = true;
      // }
      // this.setState(shouldUpdateState, () => {
      //   // 只要错误了之后就自动刷新
      //   this.handleChangeCaptcha();
      // });
    });
  }

  onChangeKeepLogin(e: any) {
    this.setState({
      isKeepLogin: e.target.checked,
    });
  }

  getSnapshotBeforeUpdate(prevProps: IProps) {
    const prevActivateCaptcha = prevProps.activateCaptcha;
    const nextActivateCaptcha = this.props.activateCaptcha;
    // 如果本次的属性是true并且上次的是false 说明是setting中刚请求回来
    // 正常情况下 下面的逻辑只会在第一次渲染完了触发一次就不会再触发了
    if (nextActivateCaptcha && nextActivateCaptcha !== prevActivateCaptcha) {
      return {
        shouldShowCaptch: true,
      };
    }
    return null;
  }

  // componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: ISnapshot | null) {
  //   if (snapshot && snapshot.shouldShowCaptch) {
  //     this.changeCaptcha(true);
  //   }
  // }

  // changeCaptcha = (isFirst?: boolean) => {
  //   if (!isFirst) {
  //     const { loadingClassName } = this.state;
  //     this.setState({
  //       loadingClassName: (
  //         loadingClassName.includes('show-refresh') ?
  //           // 当背景是灰色时 loading要深色
  //           'loading-show'
  //         :
  //           // 当背景有验证码时 loading要翔绿色
  //           'loading-show-white'
  //       ),
  //     });
  //   }
  //   const timeOutId = setTimeout(() => {
  //     this.setState({
  //       captchaSrc: defaultImg,
  //       loadingClassName: 'show-refresh',
  //     });
  //   },                           7000);
  //   userDAO.getPictureVerification().then((res) => {
  //     clearTimeout(timeOutId);
  //     if (res && res.data) {
  //       const data = res.data.data;
  //       const imgBase64 = data.base64Image || '';
  //       this.setState({
  //         captchaSrc: `data:image/png;base64,${imgBase64}`,
  //         loadingClassName: 'loading-hide',
  //       });
  //     } else {
  //       this.setState({
  //         captchaSrc: defaultImg,
  //         loadingClassName: 'show-refresh',
  //       });
  //     }
  //   });
  // }

  // handleChangeCaptcha = () => {
  //   this.changeCaptcha();
  // }

  renderLogin() {
    const {
      usernameErrMsg,
      passwordErrMsg,
      captchaErrMsg,
      usernameOrPasswordErr,
      captchaSrc,
      loadingClassName,
    } = this.state;
    const { activateCaptcha } = this.props;
    return (
      <div
        className="login-form-sec"
        style={{ height: activateCaptcha ? '446px' : '390px' }}
      >
        <h1 className="login-form-sec-title">欢迎登录第四范式先知平台</h1>
        <div className={`username-sec custom-sec ${usernameErrMsg ? 'custom-err' : ''}`}>
          <Input
            errorMsg={usernameErrMsg}
            autoFocus
            placeholder="请输入用户名"
            className={usernameOrPasswordErr ? 'username-or-password-err' : ''}
            onChange={
              (e: any) =>
                this.setState(
                  {
                    username: e.target.value,
                  })}
          />
          <Icon type="mine" />
        </div>
        <div
          className={
            `
              password-sec
              custom-sec
              ${(passwordErrMsg || usernameOrPasswordErr) ? 'custom-err' : ''}
            `
          }
        >
          <Input
            errorMsg={passwordErrMsg}
            placeholder="请输入密码"
            type="password"
            onChange={
              (e: any) =>
                this.setState(
                  {
                    password: e.target.value,
                  })}
          />
          <Icon type="password" />
        </div>
        {/* {
          activateCaptcha ?
            <div
              className={`picture-sec custom-sec ${captchaErrMsg ? 'custom-err' : ''}`}
            >
              <Input
                errorMsg={captchaErrMsg}
                autoFocus
                placeholder="请输入验证码"
                onChange={(e: React.SyntheticEvent<{value: string}>) => {
                  const value = e.currentTarget.value;
                  this.setState(
                    {
                      captcha: value,
                    });
                }}
              />
              <Icon type="shape" />
              <div
                className="picture"
                onClick={this.handleChangeCaptcha}
              >
                <span
                  className={loadingClassName}
                >
                  <Icon
                    className="custom-rotate"
                    type="loading"
                  />
                </span>
                <img
                  width="100%"
                  height="100%"
                  src={captchaSrc}
                />
              </div>
            </div> : null
        } */}
        <div className="rememberme-sec">
          <Checkbox
            checked={this.state.isKeepLogin}
            onChange={(e: any) => this.onChangeKeepLogin(e)}
          >记住我的登录信息</Checkbox>
        </div>
        <div className="btn-login-sec">
          <Button type="primary" onClick={this.handleLogin}>立即登录</Button>
        </div>
      </div>
    );
  }

  render() {
    return this.renderLogin();
  }
}

export default Login;
