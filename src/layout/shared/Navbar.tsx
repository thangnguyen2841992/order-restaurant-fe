import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {getUserToken, isTokenExpired} from "../../api/Public-Api";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";

interface NavbarInterface {

}

const Navbar: React.FC<NavbarInterface> = () => {
    const navigate = useNavigate();
    const fullName = getUserToken().fullName;

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        navigate('/login');
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (isTokenExpired()) {
                logout();
                alert('Phiên đăng nhập đã kết thúc. Hãy đăng nhập lại.')
            }
        }, 60000); // Gọi mỗi 1000 ms (1 giây)

        // Dọn dẹp khi component unmount
        return () => clearInterval(interval);
    }, []); // Chỉ chạy khi component mount

    return (
        <div className={'navbar-area'}>
            <div className="navbar-area-logo">
                <img src={'/logo3-removebg-preview.png'} alt=""/>
            </div>
            <div className="navbar-area-search">
                <input type="text" placeholder={'Bạn cần tìm sản phẩm gì?'}/>
                <button className={'btn btn-danger'}>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </div>
            <div className={'navbar-area-action'}>
                    <button title={'Yêu Thích'}>
                        <FontAwesomeIcon icon={faHeart}/>
                    </button>

                    <button title={'Giỏ Hàng'}>
                        <FontAwesomeIcon icon={faShoppingCart}/>
                    </button>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                           Xin chào: {fullName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={logout} eventKey="Option 1">Đăng xuất</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
export default Navbar