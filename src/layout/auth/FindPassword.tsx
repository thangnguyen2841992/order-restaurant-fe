import React, {ChangeEvent, useState} from "react";

function FindPassword() {
    const [emailFind, setEmailFind] = useState('');

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailFind(e.target.value);
    }
    const findPassword = async () => {
        try {
            const url: string = `http://localhost:8082/user-api/findPassword?email=${emailFind}`;
            const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                    }
                }
            );
            if (response.ok) {
                alert("Tìm lại mật khẩu thành công. Bạn hãy kiểm tra mail.")
            }
        } catch (e) {
            alert("Đã có lỗi xảy ra trong quá trình tìm kiếm mật khẩu.");
        }
    }
        return (
            <div className={'find-password-area'}>
                <div className={'find-password-content'}>
                    <div className="find-password-content-area">
                        <div className="find-password-content-header">
                            Quên mật khẩu
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email <small style={{color: 'red'}}>*</small></label>
                            <input value={emailFind} onChange={changeEmail} required type="text"
                                   className="form-control" id="email"
                                   aria-describedby="emailHelp" placeholder="Nhập email của bạn"/>
                        </div>
                        <button onClick={() => {
                            findPassword()
                        }} style={{width: '100%'}} className={'btn btn-primary'}>Tiếp tục
                        </button>
                    </div>

                </div>

            </div>
        )
    }
    export default FindPassword