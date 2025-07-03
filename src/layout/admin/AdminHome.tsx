import Navbar from "../shared/Navbar";
import NavAdmin from "./NavAdmin";
import {useEffect, useState} from "react";
import User from "../../model/User";
import {getAllUsers} from "../../api/Admin-Api";
import {formatDate, formatDateTime} from "../../api/Public-Api";

function AdminHome() {
    const [users, setUsers] = useState<User[]>([])
    useEffect(() => {
        getAllUsers('staff').then((data) => {
            setUsers(data);
        }).catch((error) => {
            console.log(error)
        })
    },[])
    return (
        <div className={'admin-home-area'}>
            <Navbar/>
            <NavAdmin/>
            <div className="admin-home-content">
                <div className="admin-home-left">
                </div>
                <div className="admin-home-middle">
                    <div className="admin-home-middle-header">
                        DANH SÁCH NHÂN VIÊN
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
                                    <td>{user.isBlock === false ? 'Hoạt động' : 'Khóa'}</td>
                                </tr>
                            ))

                        }


                        </tbody>
                    </table>
                </div>
                <div className="admin-home-right">
                </div>
            </div>
        </div>
    )
}

export default AdminHome