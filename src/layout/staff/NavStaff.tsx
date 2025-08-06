import React, {useEffect, useState} from "react";
import Brand from "../../model/Brand";
import {getAllBrands} from "../../api/Brand-Api";
import {Dropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell} from "@fortawesome/free-solid-svg-icons";
import {getUserToken} from "../../api/Public-Api";
import {useNavigate} from "react-router-dom";


interface NavStaffInterface {
    handleChangeMenuStaff: (value: string) => void
    handleChangeBrandIdSelect: (value: string) => void
    setShowOrderList: (value: boolean) => void
    setType: (value: string) => void
    setShowNotificationArea: (value: boolean) => void;
    showNotificationArea: boolean;
    totalNotification: number;
    setReloadChat: (value: boolean) => void;
}

const NavStaff: React.FC<NavStaffInterface> = ({
                                                   setType,
                                                   totalNotification,
                                                   handleChangeMenuStaff,
                                                   handleChangeBrandIdSelect,
                                                   setShowOrderList,
                                                   setShowNotificationArea,
                                                   showNotificationArea,
                                                   setReloadChat
                                               }) => {
    const navigate = useNavigate();
    const [brands, setBrands] = useState<Brand[]>([]);
    useEffect(() => {
        getAllBrands().then((data) => {
            const updatedBrands = [{brandId: 0, brandName: 'Tất cả'}, ...data]
            setBrands(updatedBrands);
        })
    }, []);
    const changeMenu = (newValue: string) => {
        return handleChangeMenuStaff(newValue);
    }
    const [selectedOption, setSelectedOption] = useState<string>('Tất cả');

    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            handleChangeBrandIdSelect(eventKey);
            // @ts-ignore
            const selectedBrand = brands.find(brand => brand.brandId.toString() === eventKey);
            if (selectedBrand) {
                // @ts-ignore
                setSelectedOption(selectedBrand.brandName);
            }
        }
    };
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        navigate('/login');
    }
    return (
        <div className={'nav-staff'}>
            <div className="nav-staff-left">
                <div onClick={() => {
                    changeMenu('listProduct');
                    setShowOrderList(false)
                }} className="nav-staff-item">
                    製品リスト
                </div>

                <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-staff-item">
                        {selectedOption}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {
                            brands.map((brand) => (
                                <Dropdown.Item eventKey={brand.brandId}>{brand.brandName}</Dropdown.Item>

                            ))
                        }
                    </Dropdown.Menu>
                </Dropdown>

                <div onClick={() => changeMenu('user')} className="nav-staff-item">
                    顧客リスト
                </div>
                <div onClick={() => setShowOrderList(true)} className="nav-staff-item">
                    Quản lý đơn hàng
                </div>
            </div>
            <div className="nav-staff-right">
                <div className={'notification-area'}>
                    <button onClick={() => {
                        setShowNotificationArea(!showNotificationArea);
                        setType('staff')
                    }
                    } id={'btnNotification'} title={'Notification'}>
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

                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        おはよう: {getUserToken().fullName}
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
export default NavStaff