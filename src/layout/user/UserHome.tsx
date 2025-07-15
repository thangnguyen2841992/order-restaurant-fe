import Navbar from "../shared/Navbar";
import NavUser from "./NavUser";
import React, {useEffect, useState} from "react";
import {getAllProductsOfBrand} from "../../api/Staff-Api";
import Product from "../../model/Product";
import {getAllProductsUser} from "../../api/User-Api";
import ImgProductUser from "./ImgProductUser";
import PriceOriginComponent from "./PriceOriginComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart, faShoppingCart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Client} from "@stomp/stompjs";
import SockJS from 'sockjs-client';
import {getUserToken} from "../../api/Public-Api";
import CartResponse from "../../model/CartResponse";
import {getCartResponseOfUserId} from "../../api/Cart-Api";


function UserHome() {
    const [menuStaff, setMenuStaff] = useState<string>('listProduct');
    const [brandId, setBrandId] = useState(0);
    const [brandName, setBrandName] = useState('新鮮な食べ物');
    const [products, setProducts] = useState<Product[]>([]);
    const [cartResults, setCartResults] = useState<CartResponse>({});
    const userTokenId = getUserToken().userId;
    const [showCartArea, setShowCartArea] = useState(false);

    const handleChangeMenuUser = (value: string) => {
        setMenuStaff(value);
    };
    const handleChangeBrandIdSelect = (value: string) => {
        setBrandId(Number(value));
    };
    const [client, setClient] = useState<Client | null>(null);

    const checkProductCartExist = (productId : number)  => {
        if (cartResults.productCartList === undefined) return 0;
        if (cartResults.productCartList.length > 0) {
            for (const productCart of cartResults.productCartList) {
                if (productCart.productId === productId) return productCart.quantity;
            }
        }
        return 0;
    }

    useEffect(() => {
        getCartResponseOfUserId().then((data) => {
            setCartResults(data);
        })
    }, []);

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
                    const cartResponse : CartResponse = {
                        cartId : cart.cartId,
                        dateCreated : cart.dateCreated,
                        productCartList : cart.productCartList,
                        userId : cart.userId
                    }
                    setCartResults(cartResponse);
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

    const addCart = (productId : number) => {
        if (client) {
            let messageCartSend =  JSON.stringify({
                userId : userTokenId,
                product : {
                    productId : productId,
                    quantity : 1
                }
            })
            client.publish({
                destination: '/app/add-cart',
                body: messageCartSend
            });
        }
    }

    const editQuantity = (productId : number, type : number) => {
        if (client) {
            let messageEditQuantitySend =  JSON.stringify({
                userId : userTokenId,
                productId : productId,
                quantity: type

            })
            client.publish({
                destination: '/app/edit-quantity',
                body: messageEditQuantitySend
            });
        }
    }

    return (
        <div className={'user-home-area'}>
            <Navbar cartResponse={cartResults} handleShowHideCartArea={setShowCartArea}/>
             <div className="user-home-content">
             <NavUser handleChangeMenuUser={handleChangeMenuUser} handleChangeBrandIdSelect={handleChangeBrandIdSelect}/>
                <div className="user-home-header">
                    <div className="user-home-header-top">
                        <div className={'user-home-header-top-home'}>家</div>
                        <div>{'>'}</div>
                        <div className={'user-home-header-top-brand-name'}>{brandName}</div>
                    </div>
                    <div className="user-home-header-bottom">
                        <div className="user-home-header-bottom-left">
                            {brandName}
                        </div>
                        <div className="user-home-header-bottom-right">
                            1210 製品
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
                                     <u>¥</u> / {product.productUnit?.productUnitName}
                                 </div>
                                 <div className="user-home-middle-item-price-origin">
                                     <PriceOriginComponent price={product.productOriginalPrice ? product.productOriginalPrice : 1000} percent={product.productPercent ? product.productPercent : 0}/>
                                 </div>
                                 <div className="user-home-middle-item-productNm">
                                     {product.productName}
                                 </div>
                                 <div className="user-home-middle-item-button">
                                     <button style={checkProductCartExist(product.productId ? product.productId : 0) == 0 ?  {marginRight : '55%'} : {marginRight : '12%'}} title={'お気に入りのリストを追加します'} type={'button'} className={'btn-like-product'}><FontAwesomeIcon icon={faHeart}/></button>
                                      <div hidden={checkProductCartExist(product.productId ? product.productId : 0) == 0}  className={'edit-quantity-product'}>
                                          <button  onClick={() => editQuantity(product.productId ? product.productId : 0 , 0)}>
                                              -
                                          </button>
                                          <div className={'productQuantity'}>
                                              {checkProductCartExist(product.productId ? product.productId : 0)}
                                          </div>
                                          <button onClick={() => editQuantity(product.productId ? product.productId : 0 , 1)}>
                                              +
                                          </button>
                                      </div>
                                     <button hidden={checkProductCartExist(product.productId ? product.productId : 0) != 0}  title={'カートに追加します'} onClick={() => addCart(product.productId ?  product.productId : 0)} type={'button'} className={'btn btn-danger'}><FontAwesomeIcon icon={faShoppingCart}/></button>
                                 </div>
                                 <div hidden={product.point == 0} className="user-home-middle-item-point-area">
                                     <div className="user-home-middle-item-point">
                                         x{product.point}
                                     </div>
                                     <div className="user-home-middle-item-point-des">
                                         ポイント
                                     </div>
                                 </div>
                             </div>
                         ))
                     }
                 </div>
            </div>
            <div className="cart-detail-area" hidden={!showCartArea}>
                <div className="cart-detail-area-header">
                    <div className="cart-detail-area-header-left">
                        <div className="cart-detail-area-header-left-title">
                            Giỏ Hàng
                        </div>
                        <div className="cart-detail-area-header-left-des">
                            ({cartResults.productCartList?.length} sản phẩm)
                        </div>
                    </div>
                    <div className="cart-detail-area-header-right" onClick={() => setShowCartArea(false)}>
                        <div className={'cart-detail-area-header-right-text'}>
                            Đóng
                        </div>
                        <div className={'cart-detail-area-header-right-icon'}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </div>
                    </div>
                </div>
                <div className="cart-detail-area-content">
                    {
                        cartResults.productCartList?.map((product, index) => (
                            <div className="cart-detail-area-content-item">
                                <div className="cart-detail-area-content-item-index">
                                    {index + 1}
                                </div>
                                <div className="cart-detail-area-content-item-image">

                                </div>
                                <div className="cart-detail-area-content-item-name-price">

                                </div>
                                <div className="cart-detail-area-content-item-name">

                                </div>
                                <div className="cart-detail-area-content-item-price">

                                </div>
                                <div className="cart-detail-area-content-item-quantity">

                                </div>
                                <div className="cart-detail-area-content-item-total">

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