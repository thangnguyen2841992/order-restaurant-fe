import CartResponse from "../../model/CartResponse";
import React, {ChangeEvent} from "react";
import {getUserToken} from "../../api/Public-Api";

interface OrderInterface {
    cartResult: CartResponse;
    showOrderScreen: boolean;
}

const Order: React.FC<OrderInterface> = ({cartResult, showOrderScreen}) => {
    const [time, setTime] = React.useState<number>(0);
    const [orderDescription, setOrderDescription] = React.useState<string>('');

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTime(Number(e.target.value));
    }

    const handleOrderDesChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setOrderDescription(e.target.value);
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

            </div>
        </div>
    )
}
export default Order;
