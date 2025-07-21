import CartResponse from "../../model/CartResponse";
import React, {ChangeEvent} from "react";
import {getUserToken} from "../../api/Public-Api";
import CartDetailItem from "./CartDetailItem";
import {Client} from "@stomp/stompjs";

interface OrderInterface {
    cartResult: CartResponse;
    showOrderScreen: boolean;
    setShowCartScreen : (value : boolean) => void;
    setShowOrderScreen : (value : boolean) => void;
}

const Order: React.FC<OrderInterface> = ({cartResult, showOrderScreen, setShowOrderScreen, setShowCartScreen}) => {
    const [time, setTime] = React.useState<number>(0);
    const [payment, setPayment] = React.useState<number>(0);
    const [orderDescription, setOrderDescription] = React.useState<string>('');

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(Number(e.target.value));
    }
    const handlePaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPayment(Number(e.target.value));
    }

    const handleOrderDesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setOrderDescription(e.target.value);
    }

    const editQuantity = () => {

    }

    return (
        <div hidden={!showOrderScreen} className="order-area">
            <div className="order-area-left">
                <div className="order-area-left-header">
                    Thông tin tài khoản
                </div>
                <div className="order-area-left-user-info">
                    <div  className={'order-area-left-user-info-title'}>THÔNG TIN KHÁCH HÀNG</div>
                    <div className="order-area-left-user-info-item">
                        <span style={{color:'#7a7e80'}}>Tên khách hàng: </span> <span style={{fontWeight : '400'}}>{getUserToken().fullName}</span>
                    </div>
                    <div className="order-area-left-user-info-item">
                        <span style={{color:'#7a7e80'}}>Số điện thoại: </span> <span>{getUserToken().phoneNumber}</span>
                    </div>
                    <div className="order-area-left-user-info-item">
                        <span style={{color:'#7a7e80'}}>Email: </span> <span>{getUserToken().email}</span>
                    </div>
                </div>
                <div className="order-area-left-address">
                    <div  className={'order-area-left-user-info-title'}>THÔNG TIN NHẬN HÀNG</div>
                      <div className="order-area-left-address-top">
                          {getUserToken().fullName} - {getUserToken().phoneNumber}
                      </div>
                    <div className="order-area-left-address-bottom">
                        {getUserToken().address}
                    </div>
                </div>
                <div className="order-area-left-user-info">
                    <div  className={'order-area-left-user-info-title'}>THỜI GIAN NHẬN HÀNG</div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input onChange={handleTimeChange} className="form-check-input" type="radio"
                                   name="time"
                                   id="time24" value="0" checked={time === 0}/>
                            <label className="form-check-label" htmlFor="time24">Giao nhanh 24h</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input onChange={handleTimeChange} className="form-check-input" type="radio"
                                   name="time"
                                   id="timeFree" value="1" checked={time === 1}/>
                            <label className="form-check-label" htmlFor="timeFree">Giao hàng bình thường</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea value={orderDescription} onChange={handleOrderDesChange} name="order-description" placeholder={'Ghi chú'} />
                    </div>
                    <p id={'note-order'}>* Không bắt buộc</p>
                </div>

            </div>

            <div className="order-area-right">
                <div className="order-area-left-header">
                    Giỏ hàng <span onClick={() => {setShowOrderScreen(false); setShowCartScreen(true)}} style={{fontSize : '15px', fontWeight : '500', color : '#0272ba', lineHeight : 'normal', cursor : 'pointer'}}>Chỉnh sửa</span>


                </div>
                <div className="order-area-right-total">
                    {cartResult.productCartList?.length} sản phẩm
                </div>
                <div style={{margin : '10px 0'}} className="order-area-left-header">
                    Danh sách sản phẩm
                </div>
                <div className="order-area-left-content">

                    {
                        cartResult.productCartList?.map((product, index) =>
                            <CartDetailItem key={product.productCartId} type={'order'} index={index} productId={product.productId ? product.productId : 0} productCartId={product.productCartId ? product.productCartId : 0} quantity={product.quantity ? product.quantity : 0} editQuantity={editQuantity} client={new Client()}/>
                        )
                    }
                </div>
                <div style={{marginBottom : '10px'}}  className="order-area-left-header">
                    Thanh toán
                </div>
                <div className="cart-screen-middle-right-content">
                    <div  className="cart-screen-middle-right-content-item">
                        <div className="cart-screen-middle-right-content-item-left">
                            Tạm tính
                        </div>
                        <div className="cart-screen-middle-right-content-item-right">
                            {cartResult.totalPrice?.toLocaleString()} <u>đ</u>
                        </div>
                    </div>
                    <div className="cart-screen-middle-right-content-item">
                        <div className="cart-screen-middle-right-content-item-left">
                            Khuyến mãi
                        </div>
                        <div className="cart-screen-middle-right-content-item-right">
                            0 <u>đ</u>
                        </div>
                    </div>
                   <hr style={{margin : '0 10px'}}/>
                    <div className="cart-screen-middle-right-content-item">
                        <div className="cart-screen-middle-right-content-item-left">
                            Tổng thanh toán
                        </div>
                        <div style={{color : 'red'}} className="cart-screen-middle-right-content-item-right">
                            {cartResult.totalPrice?.toLocaleString()} <u>đ</u>
                        </div>
                    </div>
                    <div className="cart-screen-middle-right-content-item">
                        <div className="cart-screen-middle-right-content-item-left">
                            Phí giao hàng
                        </div>
                        <div className="cart-screen-middle-right-content-item-right">
                            Chưa tính
                        </div>
                    </div>
                    <p style={{marginLeft : '10px', fontSize : '14px'}}><span style={{color : 'red'}}>*</span><span style={{color : '#7a7e80'}}> Phí giao hàng thanh toán khi nhận hàng</span></p>


                    <div  className="order-area-left-user-info">
                        <div style={{marginBottom : '10px', marginTop : '-20px'}}  className={'order-area-left-header'}>Phương thức thanh toán</div>
                        <div className="form-group">
                            <div className="form-check form-check-inline">
                                <input onChange={handlePaymentChange} className="form-check-input" type="radio"
                                       name="payment"
                                       id="paymentCod" value="0" checked={payment === 0}/>
                                <label style={{fontSize : '16px', color : '#2a2f33', lineHeight: 'normal', fontWeight : '400'}} className="form-check-label" htmlFor="paymentCod">Thanh toán khi nhận hàng(COD)</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input onChange={handlePaymentChange} className="form-check-input" type="radio"
                                       name="payment"
                                       id="paymentCard" value="1" checked={payment === 1}/>
                                <label style={{fontSize : '16px', color : '#2a2f33', lineHeight: 'normal', fontWeight : '400'}} className="form-check-label" htmlFor="paymentCard">Thanh toán qua tài khoản ngân hàng</label>
                            </div>
                        </div>
                    </div>

                    <button style={{width : '100%', margin : '10px 0'}} className={'btn btn-primary'}>Tiến hành thanh toán</button>
                </div>
            </div>
        </div>
    )
}
export default Order;
