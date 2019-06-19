import * as React from 'react';
// import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import userDAO from './dao/user';
// import licenseDAO from './dao/license';
// import { updateUser } from './actions';
import Login from './login';
// import LicenseText from '../component/license-text';
// import ResetPassword from '../component/reset-password';
// import encryptAes from '../../common/utils/aesEncrypt';
// import { getUrlQueryString } from './utils';

import './login.less';
// import { IUser } from './common/user';

const logoIconBigPath = require('./img/logo-icon-big.png');

export interface IProps extends RouteComponentProps<{}> {
//   user: IUser;
//   changeShowTrail(isTrial: boolean, expiredDate: string): void;
//   updateUser(user: IUser): void;
}

export interface IState {
  showLogin: boolean;
  passwordComplexPromptText: string;
//   passwordEncrypt: boolean;
  originPassword: string;
  showLincenseText: boolean;
  licenseText: string;
  activateCaptcha: boolean;
}

export default class LoginWrapper extends React.Component< IState> {

  state: IState = {
    showLogin: true,
    passwordComplexPromptText: '',
    originPassword: '',
    // passwordEncrypt: false,
    showLincenseText: false,
    licenseText: '',
    activateCaptcha: false,
  };

  componentDidMount() {
    this.getPasswordComplex();
  }

  getPasswordComplex() {
    userDAO.getPasswordComplex({})
      .then((res: any) => {
        const { leastLength, needCapitalLetter, needLowercaseLetter, needNumber,
          needSpecialCharacter, enableCaptcha = true } = res.data.data;
        let text = `${leastLength}-64个字符`;
        if (needCapitalLetter) text += '，至少包含1个大写字母';
        if (needLowercaseLetter) text += '，至少包含1个小写字母';
        if (needNumber) text += '，至少包含1个数字';
        if (needSpecialCharacter) text += '，至少包含1个特殊字符';
        this.setState({
        //   passwordEncrypt,
          passwordComplexPromptText: text,
          activateCaptcha: enableCaptcha,
        });
      });
  }

//   redirectUrl() {
//     const params = {
//       page: 1,
//       size: -1,
//     };
//     userDAO.workspaces({ params })
//       .then((res: any) => {
//         const haveWorkspace = res.data.data.total > 0;
//         const { username } = this.state.user;
//         const prevUsername = getUrlQueryString('username');
//         const redirect = getUrlQueryString('redirect');
//         if (username === prevUsername && redirect) {
//           window.location.href = redirect;
//         } else if (haveWorkspace) {
//           this.props.history.push('/');
//         } else {
//           window.location.href = '/console/#/workspace-empty';
//         }
//       });
//   }

//   loginJump() {
//     if (!this.props.user.admin) {
//       this.redirectUrl();
//     }
//     licenseDAO.text({})
//       .then((licenseTextRes: any) => {
//         const { protocol, needGranted } = licenseTextRes.data.data;
//         if (!needGranted) {
//           this.redirectUrl();
//         }
//         this.setState({
//           showLincenseText: needGranted,
//           licenseText: protocol,
//         });
//       });
//   }

  login = (captcha: string, username: string, password: string, remember: boolean) => {
    const data: any = {
      captcha,
      username,
      remember,
    //   password: this.state.passwordEncrypt ? encryptAes(password) : password,
      password:password
    };

    return userDAO.login({ data }).then((resp: any) => {
      const user = resp.data.data;
    //   this.props.updateUser(user);
      // this.getPasswordComplex();
      this.setState({
        originPassword: password,
      });
      return user;
    })
    //   .then((user: IUser) => {
    //     const params = {
    //       product: 'prophet',
    //       decrypt: true,
    //       raw: false,
    //     };
        // licenseDAO.view({ params })
        //   .then(({ data }: any) => {
        //     this.props.changeShowTrail(data.data.isTrial, data.data.expiredDate);
            // if (user && user.username) {
            //   if (!user.needChgPw) {
            //     this.loginJump();

            //   } else {
            //     this.setState({
            //       showLogin: false,
            //     });
            //   }
            // }
        //   });
    //   });
  }

//   resetPassword = (password: string) => {
//     const { user } = this.props;
//     const { passwordEncrypt, originPassword } = this.state;
//     const data = {
//       id: user.id,
//       password: passwordEncrypt ? encryptAes(password) : password,
//       originPassword: passwordEncrypt ? encryptAes(originPassword) : originPassword,
//     };
//     const params = {
//       isAfterLoginScene: true,
//     };
//     return userDAO.updatePasswordWithPw({ data, params })
//       .then(() => {
//         this.loginJump();
//       });
//   }

//   onAgreeLicese = () => {
//     licenseDAO.agree({})
//     .then(() => this.redirectUrl());
//   }

//   onCancelLicese = () => {
//     window.location.reload();
//     userDAO.logout({});
//   }

  render() {
    // debugger
    // const { user } = this.props;
    const {
    //   showLogin,
    //   passwordComplexPromptText,
    //   showLincenseText,
    //   licenseText,
      activateCaptcha,
    } = this.state;
    return (
      <div className="login">
        <div className="login-main">
          {
            // showLincenseText ?
            //   <LicenseText
            //     onOk={this.onAgreeLicese}
            //     onCancel={this.onCancelLicese}
            //     text={licenseText}
            //   />
            //   :
               <div className="login-sec">
                <div className="logo"><img src={logoIconBigPath} alt="第四范式先知" /></div>
                {/* {
                  showLogin ? */}
                    <Login
                    //   user={user}
                      login={this.login}
                      activateCaptcha={activateCaptcha}
                    /> 
                    {/* :
                    <ResetPassword
                      user={user}
                      passwordComplexPromptText={passwordComplexPromptText}
                      resetPassword={this.resetPassword}
                    />
                } */}
              </div>
          }

        </div>
      </div>
    );
  }
}


// const mapStateToProps = (state: any) => {
//   return {
//     user: state.app.user,
//   };
// };


// const mapDispatchToProps = (dispatch: any) => ({
//   changeShowTrail(isTrial: boolean, expiredDate: string) {
//     const action = changeShowTrial({ showTrialDialog: isTrial, licenseExpiredTime: expiredDate });
//     dispatch(action);
//   },
//   updateUser(user: IUser) {
//     const action = updateUser({ user });
//     dispatch(action);
//   },
// });
// export default connect(mapStateToProps, mapDispatchToProps)(LoginWrapper);
