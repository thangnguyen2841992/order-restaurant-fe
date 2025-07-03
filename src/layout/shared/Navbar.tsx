import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faSearch, faShoppingCart, faUser} from "@fortawesome/free-solid-svg-icons";
import {isTokenExpired} from "../../api/Public-Api";
import {useNavigate} from "react-router-dom";

interface NavbarInterface {

}

const Navbar: React.FC<NavbarInterface> = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (isTokenExpired()) {
            localStorage.removeItem('token');
            localStorage.removeItem('expirationTime');
            alert('Phiên đăng nhập đã kết thúc. Hãy đăng nhập lại.')
            navigate('/login');
        }

    },[])
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
                <button>
                    <FontAwesomeIcon icon={faHeart}/>
                    <div>Yêu Thích</div>
                </button>

                <button>
                    <FontAwesomeIcon icon={faUser}/>
                    <div>Tài Khoản</div>
                </button>

                <button>
                    <FontAwesomeIcon icon={faShoppingCart}/>
                    <div>Giỏ Hàng</div>
                </button>
            </div>
        </div>
    )
}
export default Navbar