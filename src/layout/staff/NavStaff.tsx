import React from "react";

interface NavStaffInterface {
    handleChangeMenuStaff : (value : string) =>  void
}
const NavStaff:React.FC<NavStaffInterface> = ({handleChangeMenuStaff}) => {
    const changeMenu = (newValue: string) => {
        return  handleChangeMenuStaff(newValue);
    }
    return (
        <div className={'nav-staff'}>
            <div onClick={() => changeMenu('listProduct')} className="nav-staff-item">
                Danh sách sản phẩm
            </div>

            <div onClick={() => changeMenu('createProduct')} className="nav-staff-item">
                Thêm sản phẩm
            </div>
            <div onClick={() => changeMenu('user')} className="nav-staff-item">
                Danh sách khách hàng
            </div>

        </div>
    )
}
export default NavStaff