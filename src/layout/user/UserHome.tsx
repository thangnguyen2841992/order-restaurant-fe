import Navbar from "../shared/Navbar";
import NavStaff from "../staff/NavStaff";
import NavUser from "./NavUser";
import React, {useEffect, useState} from "react";
import {getAllProducts, getAllProductsOfBrand} from "../../api/Staff-Api";
import Product from "../../model/Product";
import {getAllProductsUser} from "../../api/User-Api";
import ImgProductUser from "./ImgProductUser";
import PriceOriginComponent from "./PriceOriginComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart} from "@fortawesome/free-solid-svg-icons";
import {Client} from "@stomp/stompjs";
import SockJS from 'sockjs-client';


function UserHome() {
    const [menuStaff, setMenuStaff] = useState<string>('listProduct');
    const [brandId, setBrandId] = useState(0);
    const [brandName, setBrandName] = useState('Thực phẩm tươi sống');
    const [products, setProducts] = useState<Product[]>([]);

    const handleChangeMenuUser = (value: string) => {
        setMenuStaff(value);
    };
    const handleChangeBrandIdSelect = (value: string) => {
        setBrandId(Number(value));
    };
    const [client, setClient] = useState<Client | null>(null);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8083/ws',
            connectHeaders: {
                login: 'guest',
                passcode: 'guest',
            },
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {
                stompClient.subscribe('/topic/cart', (message) => {
                    const cart = JSON.parse(message.body);
                    console.log(cart);
                });
            },
            webSocketFactory: () => {
                return new SockJS('http://localhost:8083/ws');
            },
        });

        setClient(stompClient);
        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []);

    useEffect(() => {
        if (Number(brandId) !== 0) {
            getAllProductsOfBrand(brandId).then((data) => {
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            getAllProductsUser().then((data) => {
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [brandId])
    return (
        <div className={'user-home-area'}>
            <Navbar/>
             <div className="user-home-content">
             <NavUser handleChangeMenuUser={handleChangeMenuUser} handleChangeBrandIdSelect={handleChangeBrandIdSelect}/>
                <div className="user-home-header">
                    <div className="user-home-header-top">
                        <div className={'user-home-header-top-home'}>Trang chủ</div>
                        <div>{'>'}</div>
                        <div className={'user-home-header-top-brand-name'}>{brandName}</div>
                    </div>
                    <div className="user-home-header-bottom">
                        <div className="user-home-header-bottom-left">
                            {brandName}
                        </div>
                        <div className="user-home-header-bottom-right">
                            1210 sản phẩm
                        </div>
                    </div>
                </div>
                 <div className="user-home-middle">
                     {
                         products.map((product) => (
                             <div key={product.productId} className="user-home-middle-item">
                                 <div className="user-home-middle-item-img">
                                     <ImgProductUser productId={product.productId ? product.productId : 0}/>
                                 </div>
                                 <div className="user-home-middle-item-price">
                                     {product.productPrice?.toLocaleString() }
                                     <u>đ</u> / {product.productUnit?.productUnitName}
                                 </div>
                                 <div className="user-home-middle-item-price-origin">
                                     <PriceOriginComponent price={product.productPrice ? product.productPrice : 1000}/>
                                 </div>
                                 <div className="user-home-middle-item-productNm">
                                     {product.productName}
                                 </div>
                                 <div className="user-home-middle-item-button">
                                     <button type={'button'} className={'btn-like-product'}><FontAwesomeIcon icon={faHeart}/></button>
                                     <button type={'button'} className={'btn btn-primary'}>Thêm vào giỏ</button>
                                 </div>
                                 <div hidden={product.point == 0} className="user-home-middle-item-point-area">
                                     <div className="user-home-middle-item-point">
                                         x{product.point}
                                     </div>
                                     <div className="user-home-middle-item-point-des">
                                         Điểm tích lũy
                                     </div>
                                 </div>
                             </div>
                         ))

                     }

                 </div>
            </div>

        </div>
    )
}
export default UserHome