import React from "react";

interface NavAdminInterface {
    handleChangeMenuAdmin : (value : string) =>  void
}

const NavAdmin : React.FC<NavAdminInterface> = ({handleChangeMenuAdmin}) => {
    const changeMenu = (newValue: string) => {
        return  handleChangeMenuAdmin(newValue);
    };
    return (
        <div className={'nav-admin'}>
                <div onClick={() => changeMenu('staff')} className="nav-admin-item">
                    Danh sách nhân viên
                </div>
            <div onClick={() => changeMenu('user')} className="nav-admin-item">
                Danh sách khách hàng
            </div>
            <div onClick={() => changeMenu('createAccountStaff')} className="nav-admin-item">
                Tạo tài khoản nhân viên
            </div>

        </div>
    )
}
export default NavAdmin