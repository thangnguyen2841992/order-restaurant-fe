import Navbar from "../shared/Navbar";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getUserToken} from "../../api/Public-Api";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const navigate = useNavigate();

    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const resetLoginForm = () => {
        setUsername('');
        setPassword('');
    }

    const redirectRegister = () => {
        navigate('/register');
    }
    
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
          handleLogin().then().catch((error) => {
              console.log(error);
          });
      }
    }

    const handleLogin = async () => {
        if (username !== '' && password !== '') {
            const registerForm = {

                username: username,
                password: password,
            }
            try {
                const url: string = `http://localhost:8080/auth-api/login`;
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(registerForm)
                    }
                );
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.token);
                    if (getUserToken().isAdmin){
                        setRole("admin");
                        navigate('/admin/home')
                    } else if (getUserToken().isStaff) {
                        setRole("staff");
                    }
                    alert("Đăng nhập thành công");
                    console.log(role);
                    resetLoginForm();
                } else {
                    const errorMessage = await response.text()
                    if (errorMessage === 'Account is blocked') {
                        alert("Tài khoản đã bị khóa. Hãy liên hệ Admin để mở.")
                    } else if (errorMessage === "Account is not active") {
                        alert("Tài khoản chưa được kích hoạt. Hãy check mail để kích hoạt tài khoản.")
                    } else if(errorMessage === 'Username or password is incorrect') {
                        alert('Tên tài khoản hoặc mật khẩu chưa đúng.')
                    }
                    console.log(errorMessage);
                    // alert("Đăng nhập không thành công");
                }
            } catch (e) {
                alert("Đăng nhập không thành công");
            }
        } else {
            alert("Đăng nhập không thành công");
        }
    }
    return (
        <div className={'login-screen-area'}>
            <Navbar/>
            <div className="login-area">
                <div className="login-area-content">
                    <div className="login-area-content-title">
                        Đăng Nhập
                    </div>
                    <div className="login-area-content-form">
                        <div className="form-group">
                            <label htmlFor="username">Tên Tài Khoản <small style={{color: 'red'}}>*</small></label>
                            <input value={username} onChange={handleChangeUsername} required type="text"
                                   className="form-control" id="email"
                                   aria-describedby="emailHelp" placeholder="Tên Tài Khoản"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mật Khẩu <small style={{color: 'red'}}>*</small></label>
                            <input onKeyDown={handleOnKeyDown} value={password} onChange={handleChangePassword} required type="password"
                                   className="form-control" id="password"
                                   aria-describedby="emailHelp" placeholder="Mật Khẩu"/>
                        </div>
                        <label className="form-check-label" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '10px'
                        }}>
                            <small className={'policy-content'}
                                   style={{color: '#0272ba', marginLeft: '5px', fontWeight: '500'}}> Quên mật
                                khẩu?</small>
                        </label>
                        <button onClick={handleLogin} style={{width: '100%', marginTop: '10px'}} className={'btn btn-primary'}>Đăng Nhập
                        </button>
                        <label className="form-check-label" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '10px'
                        }}>
                            Chưa có tài khoản? <small onClick={redirectRegister} className={'policy-content'}
                                                      style={{color: '#0272ba', marginLeft: '5px', fontWeight:'500'}}> Đăng ký
                            ngay</small>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login