import React, {useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faHeart, faSearch, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {getUserToken, isTokenExpired} from "../../api/Public-Api";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import CartResponse from "../../model/CartResponse";
import Notification from "../../model/Notification";

interface NavbarInterface {
    cartResponse: CartResponse;
    notifications: Notification[];
    totalNotification: number;
    handleShowHideCartArea: (value: boolean) => void;
    setShowCartScreen: (value: boolean) => void;
    setType: (value: string) => void;
    setShowOrderScreen: (value: boolean) => void;
    setShowNotificationArea: (value: boolean) => void;
    setReloadPage: (value: boolean) => void;

}

const Navbar: React.FC<NavbarInterface> = ({
                                               setType,
                                               cartResponse,
                                               handleShowHideCartArea,
                                               setShowCartScreen,
                                               setReloadPage,
                                               setShowOrderScreen,
                                               totalNotification,
                                               notifications,
                                               setShowNotificationArea
                                           }) => {
    const fullName = getUserToken().fullName;
    const userToken = getUserToken();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        navigate('/login');
    }

    const backHomePage = () => {
        if (userToken.isUser) {
            setShowCartScreen(false);
            setShowOrderScreen(false);
            setReloadPage(true);
            navigate('/user/home');
        } else if (userToken.isStaff) {
            navigate('/staff/home');
        } else {
            navigate('/admin/home');
        }
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
            <div title={'Trang chủ'} onClick={() => backHomePage()} className="navbar-area-logo">
                <img onClick={backHomePage} src={'/logo3-removebg-preview.png'} alt=""/>
            </div>
            <div hidden={!getUserToken().isUser} className="navbar-area-search">
                <input type="text" placeholder={'どの製品を見つける必要がありますか？'}/>
                <button className={'btn btn-danger'}>
                    <FontAwesomeIcon icon={faSearch}/>
                </button>
            </div>
            <div className={'navbar-area-action'}>
                <button hidden={!getUserToken().isUser} id={'btnLikeProduct'} title={'お気に入り'}>
                    <FontAwesomeIcon icon={faHeart}/>
                </button>
                <div className={'notification-area'}>
                    <button onClick={() => {
                        setShowNotificationArea(true);
                        handleShowHideCartArea(false);
                        setType('user');
                    }} id={'btnNotification'} title={'Notification'}>
                        <FontAwesomeIcon icon={faBell}/>
                    </button>
                    <span style={{
                        fontWeight: '500',
                        fontSize: '14px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: '5px',
                        right: '16px',
                        width: '20px',
                        height: '20px',
                        background: 'red',
                        borderRadius: '50%',
                        color: '#fff'
                    }}>{totalNotification}</span>
                </div>

                <div hidden={!getUserToken().isUser} className={'cart-area'}
                     onClick={() => {
                         handleShowHideCartArea(true);
                         setShowNotificationArea(false)
                     }}>
                    <button id={'btnCartProduct'} title={'ショッピングカート'}>
                        <FontAwesomeIcon icon={faShoppingCart}/>
                    </button>
                    <div hidden={cartResponse.productCartList?.length === 0} className={'totalProductCart'}>
                        {cartResponse.totalProduct}
                    </div>
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        おはよう: {fullName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={logout} eventKey="Option 1">ログアウト</Dropdown.Item>
                        <Dropdown.Item hidden={!getUserToken().isUser} onClick={logout} eventKey="Option 2">Quản lý đơn
                            hàng</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}
export default Navbar