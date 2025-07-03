import Navbar from "../shared/Navbar";
import React, {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [birthDay, setBirthDay] = useState(new Date().toISOString().split('T')[0]);
    const [gender, setGender] = useState(0);
    const [isCheckedPolicy, setIsCheckedPolicy] = useState<boolean>(false);
    const navigate = useNavigate();

    const redirectLogin = () => {
        navigate('/login');
    }


    const handleChangeFirstName = (e: ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    }
    const handleChangeLastName = (e: ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    }
    const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }
    const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }
    const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }
    const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }
    const handleChangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    }
    const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    }
    const handleChangeBirthDay = (e: ChangeEvent<HTMLInputElement>) => {
        setBirthDay(e.target.value);
    }

    const handleGenderChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGender(Number.parseInt(e.target.value));
    }
    const handleCheckboxPolicyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsCheckedPolicy(event.target.checked);
    };
    const resetRegisterForm = () => {
        setFirstName('');
        setLastName('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
        setPhone('');
        setAddress('');
        setBirthDay('');
        setGender(0);
        setIsCheckedPolicy(false);
    }

    const handleRegister = async () => {
        if (firstName !== '' && lastName !== '' && username !== ''
            && password !== '' && confirmPassword !== '' && birthDay !== ''
            && address !== '' && isCheckedPolicy && email !== '' && phone !== '') {
            const registerForm = {
                firstName : firstName,
                lastName  : lastName,
                username : username,
                email  : email,
                phoneNumber : phone,
                password : password,
                confirmPassword : confirmPassword,
                birthDate : birthDay,
                gender : gender,
                address : address
            }
            try {
                const url: string = `http://localhost:8080/auth-api/register`;
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify(registerForm)
                    }
                );
                if (response.ok) {
                    alert("Đăng ký thành công");
                    resetRegisterForm();
                    // navigate('/login')
                } else {
                    console.log(response.json());
                    alert("Đăng ký không thành công");
                }
            } catch (e) {
                alert("Đăng ký không thành công");
            }
        } else {
            alert("Đăng ký không thành công");
        }
    }

    return (
        <div className={'register-screen-area'}>
            <Navbar/>
            <div className="register-area">
                <div className="register-area-content">
                    <div className="register-area-content-title">
                        Đăng Ký
                    </div>
                    <div className="register-area-content-form">
                        <div className={'form-name-area'}>
                            <div className="form-group">
                                <label htmlFor="firstName">Họ Và Tên Đệm <small style={{color: 'red'}}>*</small></label>
                                <input value={firstName} onChange={handleChangeFirstName} required type="text"
                                       className="form-control" id="firstName"
                                       placeholder="Họ Và Tên Đệm"/>
                            </div>
                            <div className="form-group" style={{marginLeft: '30px'}}>
                                <label htmlFor="lastName">Tên <small style={{color: 'red'}}>*</small></label>
                                <input value={lastName} onChange={handleChangeLastName} required type="text"
                                       className="form-control" id="lastName"
                                       placeholder="Tên"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email <small style={{color: 'red'}}>*</small></label>
                            <input value={email} onChange={handleChangeEmail} required type="email"
                                   className="form-control" id="email"
                                   aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className={'form-phone-username'}>
                            <div className="form-group">
                                <label htmlFor="phoneNumber">Số Điện Thoại <small
                                    style={{color: 'red'}}>*</small></label>
                                <input value={phone} onChange={handleChangePhone} required type="text"
                                       className="form-control" id="phoneNumber"
                                       placeholder="Số điện thoại"/>
                            </div>

                            <div className="form-group" style={{marginLeft: '30px'}}>
                                <label htmlFor="username">Tên Tài Khoản <small style={{color: 'red'}}>*</small></label>
                                <input value={username} onChange={handleChangeUsername} required type="text"
                                       className="form-control" id="username"
                                       placeholder="Tên tài khoản"/>
                            </div>
                        </div>

                        <div className={'form-password-area'}>
                            <div className="form-group">
                                <label htmlFor="password">Mật Khẩu <small style={{color: 'red'}}>*</small></label>
                                <input value={password} onChange={handleChangePassword} required type="password"
                                       className="form-control" id="password"
                                       placeholder="Password"/>
                            </div>
                            <div className="form-group" style={{marginLeft: '30px'}}>
                                <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu <small
                                    style={{color: 'red'}}>*</small></label>
                                <input value={confirmPassword} onChange={handleChangeConfirmPassword} required
                                       type="password" className="form-control" id="confirmPassword"
                                       placeholder="Password"/>
                            </div>
                        </div>
                        <div className={'form-birthday-gender'}>
                            <div className="form-group">
                                <label htmlFor="birthDay">Sinh Nhật <small style={{color: 'red'}}>*</small></label>
                                <input value={birthDay} onChange={handleChangeBirthDay} required type="date"
                                       className="form-control" id="birthDay" style={{width: '205px'}}
                                       placeholder="Sinh Nhật"/>
                            </div>
                            <div className="form-group" style={{marginLeft: '30px'}}>
                                <label>Giới Tính <small style={{color: 'red'}}>*</small></label><br/>
                                <div className="form-check form-check-inline">
                                    <input onChange={handleGenderChange} className="form-check-input" type="radio"
                                           name="gender"
                                           id="male" value="0" checked={gender === 0}/>
                                    <label className="form-check-label" htmlFor="male">Nam</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input onChange={handleGenderChange} className="form-check-input" type="radio"
                                           name="gender"
                                           id="female" value="1" checked={gender === 1}/>
                                    <label className="form-check-label" htmlFor="inlineRadio2">Nữ</label>
                                </div>
                            </div>

                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa Chỉ <small style={{color: 'red'}}>*</small></label>
                            <input value={address} onChange={handleChangeAddress} type="text" className="form-control"
                                   id="address"
                                   aria-describedby="emailHelp" placeholder="Địa Chỉ"/>
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input checked={isCheckedPolicy} onChange={handleCheckboxPolicyChange}
                                       className="form-check-input" type="checkbox" value="" id="policy"
                                       required/>
                                <label className="form-check-label" htmlFor="policy">
                                    Đồng ý với <small className={'policy-content'} style={{color: '#0272ba'}}>Điều khoản
                                    sử dụng</small> và <small className={'policy-content'} style={{color: '#0272ba'}}>Chính
                                    sách bảo mật</small>
                                </label>
                            </div>
                        </div>
                        <button onClick={handleRegister} style={{width: '100%'}} className={'btn btn-primary'}>Đăng Ký</button>
                        <label className="form-check-label" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            Bạn đã có tài khoản? <small onClick={redirectLogin} className={'policy-content'}
                                                      style={{color: '#0272ba', marginLeft: '5px', fontWeight:'500'}}> Đăng nhập
                            ngay</small>
                        </label>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register