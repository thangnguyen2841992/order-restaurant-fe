import Navbar from "../shared/Navbar";
import NavAdmin from "./NavAdmin";
import React, {ChangeEvent, useEffect, useState} from "react";
import User from "../../model/User";
import {getAllUsers} from "../../api/Admin-Api";
import {formatDate, formatDateTime} from "../../api/Public-Api";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCheck} from "@fortawesome/free-solid-svg-icons";
import ProductCart from "../../model/ProductCart";
import CartResponse from "../../model/CartResponse";

function AdminHome() {
    const [users, setUsers] = useState<User[]>([])
    const [menuAdmin, setMenuAdmin] = useState<string>('staff')
    const handleChangeMenuAdmin = (value: string) => {
        setMenuAdmin(value);
    };

    const [cartResults, setCartResults] = useState<CartResponse>({});

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
    const [test, setTest] = useState(false);
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
    }
    const token  = localStorage.getItem("token");


    const handleRegisterStaff = async () => {
        if (firstName !== '' && lastName !== '' && username !== ''
            && password !== '' && confirmPassword !== '' && birthDay !== ''
            && address !== ''  && email !== '' && phone !== '') {
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
                const url: string = `http://localhost:8080/admin-api/registerStaff`;
                const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
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

    const handleBlockUser = async (userId : number) => {
        try {
            const url: string = `http://localhost:8082/admin-api/blockUser`;
            const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        userId : userId
                    })
                }
            );

            if (response.ok) {
                if (menuAdmin === 'staff' || menuAdmin === 'user') {
                    getAllUsers(menuAdmin).then((data) => {
                        setUsers(data);
                    }).catch((error) => {
                        console.log(error)
                    })
                }
            } else {
                console.log(response.json());
            }
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        if (menuAdmin === 'staff' || menuAdmin === 'user') {
            getAllUsers(menuAdmin).then((data) => {
                setUsers(data);
            }).catch((error) => {
                console.log(error)
            })
        }
    },[menuAdmin])
    return (
        <div className={'admin-home-area'}>
            <Navbar setShowOrderScreen={() => {}} setReloadPage={() => {}} cartResponse={cartResults} handleShowHideCartArea={setTest} setShowCartScreen={setTest}/>
            <NavAdmin handleChangeMenuAdmin={handleChangeMenuAdmin} />
            <div className="admin-home-content">
                <div className="admin-home-left">
                </div>
                <div className="admin-home-middle">
                    <div hidden={menuAdmin === 'createAccountStaff'} className="admin-home-middle-list">
                        <div className="admin-home-middle-header">
                            {menuAdmin === 'staff' ? 'DANH SÁCH NHÂN VIÊN' : 'DANH SÁCH KHÁCH HAÀNG'}
                        </div>
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên Tài Khoản</th>
                                <th scope="col">Họ Và Tên</th>
                                <th scope="col">Giới Tính</th>
                                <th scope="col">Email</th>
                                <th scope="col">Số Điện Thoại</th>
                                <th scope="col">Sinh Nhật</th>
                                <th scope="col">Địa Chỉ</th>
                                <th scope="col">Lần Cuối Truy Cập</th>
                                <th scope="col">Tình Trạng</th>
                                <th scope="col">Hành Động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                users.map((user, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{user.username}</td>
                                        <td>{user.firstName + " "}{user.lastName}</td>
                                        <td>{user.gender === 0 ? 'Nam' : 'Nữ'}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phoneNumber}</td>
                                        <td>{formatDate(user.birthday === undefined ? "" : user.birthday)}</td>
                                        <td>{user.address}</td>
                                        <td>{formatDateTime(user.lastLogin === undefined ? "" : user.lastLogin)}</td>
                                        <td style={{display:'flex', alignItems:'center'}}>{user.isBlock === false ? 'Hoạt động' : 'Khóa'}
                                        </td>
                                        <td>
                                            <button onClick={() => handleBlockUser(user.userId === undefined ? 0 : user.userId)} title={'Khóa tài khoản'} className={'btn btn-danger'} hidden={user.isBlock} id={'btn-block-acc'}><FontAwesomeIcon icon={faBan}/></button>
                                            <button className={'btn btn-success'} title={'Mở khóa tài khoản'} hidden={!user.isBlock} id={'btn-unblock-acc'}><FontAwesomeIcon icon={faCheck}/></button>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                    </div>
                    <div hidden={menuAdmin !== 'createAccountStaff'} className={'admin-home-middle-form'}>
                        <h3>TẠO MỚI TÀI KHOẢN NHÂN VIÊN</h3>
                        <div className="register-staff-area-content-form">
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
                            <button onClick={handleRegisterStaff} style={{width: '100%'}} className={'btn btn-primary'}>Đăng Ký</button>
                        </div>
                    </div>

                </div>
                <div className="admin-home-right">
                </div>
            </div>
        </div>
    )
}

export default AdminHome