import React, {useEffect, useState} from "react";
import OrderResponse from "../../model/OrderResponse";
import {getAllOrder} from "../../api/Order-Api";
import {formatDateTime} from "../../api/Public-Api";
import ModalOrderProductDetail from "./ModalOrderProductDetail";
import ProductOrder from "../../model/ProductOrder";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faArrowUp, faSearch} from "@fortawesome/free-solid-svg-icons";
import NotificationDetail from "../user/NotificationDetail";

interface OrderListMgmtInterface {
}

const OrderListMgmt: React.FC<OrderListMgmtInterface> = ({}) => {
    const [orderId, setOrderId] = useState<number>(0);
    const [orders, setOrders] = React.useState<OrderResponse[]>([]);
    const [productOrders, setProductOrders] = React.useState<ProductOrder[]>([]);
    const [showOrderProduct, setShowOrderProduct] = React.useState(false);
    const [reloadOrder, setReloadOrder] = React.useState(false);
    const [openHeight, setOpenHeight] = React.useState(false);
    const token = localStorage.getItem('token');

    const [orderIdSearch, setOrderIdSearch] = useState('');
    const orderIdSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(e.target.value)) {
            setOrderIdSearch(e.target.value);
        }
    }

    const [userSearch, setUserSearch] = useState('');
    const userSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setUserSearch(e.target.value);
    }
    const [userPhoneSearch, setUserPhoneSearch] = useState('');
    const userPhoneSearchChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (/^\d*$/.test(e.target.value)) {
            setUserPhoneSearch(e.target.value);
        }
    }

    const processOrder = async (orderId : number, type : string) => {
        try {
            const url: string = type === 'process' ? `http://localhost:8083/staff-api/process-order?orderId=${orderId}` :  `http://localhost:8083/staff-api/done-order?orderId=${orderId}`;
            const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                setReloadOrder(true);
                alert('Cập nhât process thành công');
            } else {
                console.log(response.json());
                alert('Đã xảy ra lỗi trong quá trình cập nhật process');
            }
        } catch (error) {
            alert('Đã xảy ra lỗi trong quá trình cập nhật process');
        }
    }

    const processStr = (order: OrderResponse) => {
        if (order.isProcess && !order.isDone) {
            return 'Đang xử lý';
        }
        if (order.isDone) {
            return 'Hoàn thành';
        }
        return 'Đang chờ';
    }

    useEffect(() => {
        getAllOrder().then((data) => {
            setOrders(data);
        }).catch((error) => {
            console.log(error);
        })
        setReloadOrder(false);
    }, [reloadOrder]);
    return (
        <div className={'order-list-mgmt'}>
            <div className="staff-home-middle-header">
                <div style={openHeight ? {height : '130px'} : {height : '70px'}} className={'staff-home-middle-header-filter'}>
                    <div className="staff-home-middle-header-filter-top">
                        <div className="staff-home-middle-header-filter-user">
                            <label >Mã đơn hàng</label>
                            <input value={orderIdSearch} onChange={orderIdSearchChange} type="text" placeholder={'Mã đơn hàng'}/>
                        </div>
                        <div className="staff-home-middle-header-filter-user">
                            <label >Người đặt hàng</label>
                            <input value={userSearch} onChange={userSearchChange} type="text" placeholder={'Người đặt hàng'}/>
                        </div>
                        <div className="staff-home-middle-header-filter-user">
                            <label >Số điện thoại </label>
                            <input value={userPhoneSearch} onChange={userPhoneSearchChange} type="text" placeholder={'Số điện thoại'}/>
                        </div>


                        <div className="staff-home-middle-header-filter-user">
                            <label >Giá trị</label>
                            <select name="price">
                                <option  value="0">Tất cả</option>
                                <option value="1">Từ cao đến thấp</option>
                                <option value="2">Từ thấp đến cao</option>
                            </select>
                        </div>
                        <div className="staff-home-middle-header-filter-user">
                            <label >Tiến độ</label>
                            <select name="process">
                                <option  value="0">Tất cả</option>
                                <option value="1">Đang chờ</option>
                                <option value="2">Đang xử lý</option>
                                <option value="3">Hoàn thành</option>
                            </select>
                        </div>
                        <button type={"button"} title={'Tìm kiếm'} style={{marginRight : '10px'}} className={'btn btn-primary'}><FontAwesomeIcon icon={faSearch}/></button>
                        <button type={"button"} title={'Mở rộng'} hidden={openHeight} onClick={() => {setOpenHeight(true)}}  className={'btn btn-success'}><FontAwesomeIcon icon={faArrowDown}/></button>
                        <button type={"button"} title={'Thu gọn'} hidden={!openHeight} onClick={() => {setOpenHeight(false)}}  className={'btn btn-success'}><FontAwesomeIcon icon={faArrowUp}/></button>
                    </div>
                    <div hidden={!openHeight} className="staff-home-middle-header-filter-bottom">
                        <div className="staff-home-middle-header-filter-user">
                            <label >Vận chuyển</label>
                            <select name="delivery">
                                <option  value="0">Tất cả</option>
                                <option value="1">Giao nhanh 24h</option>
                                <option value="2">Giao hàng bình thường</option>
                            </select>
                        </div>
                        <div className="staff-home-middle-header-filter-user">
                            <label >Phương thức thanh toán</label>
                            <select name="payment">
                                <option  value="0">Tất cả</option>
                                <option value="1">Thanh toán khi nhận hàng(COD)</option>
                                <option value="2">Thanh toán qua ngân hàng</option>
                            </select>
                        </div>
                        <div className="staff-home-middle-header-filter-user">
                            <label>Thanh toán</label>
                            <select name="paymented">
                                <option  value="0">Tất cả</option>
                                <option value="1">Đã thanh toán</option>
                                <option value="2">Chưa thanh toán</option>
                            </select>
                        </div>

                    </div>


                </div>
                {/*<div className={'staff-home-middle-header-btn'}>*/}
                {/*    <button onClick={() => {setReloadOrder(true)}} className={'btn btn-primary'}>Làm mới trang web</button>*/}
                {/*</div>*/}
            </div>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th><input type="checkbox"
                    /></th>
                    <th scope="col">Mã số</th>
                    <th scope="col">Thời gian đặt hàng</th>
                    <th scope="col">Người đặt hàng</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Vận chuyển</th>
                    <th scope="col">Phương thức thanh toán</th>
                    <th scope="col">Giá trị</th>
                    <th scope="col">Đã thanh toán</th>
                    <th scope="col">Tiến độ đơn hàng</th>
                    <th scope="col">Chi tiết đơn hàng</th>
                    <th scope="col">Note</th>
                    <th scope="col">Action</th>

                </tr>
                </thead>
                <tbody>
                {
                    orders.length > 0 ? (orders.map((order, index) => (
                        <tr key={order.orderId}>
                            <td><input type="checkbox"/></td>
                            <td>#{order.orderId}</td>
                            <td>{formatDateTime(order.dateCreated === undefined ? "" : order.dateCreated)}</td>
                            <td>{order.userId?.firstName} {order.userId?.lastName}</td>
                            <td>{order.userId?.phoneNumber}</td>
                            <td>{order.deliveryId?.name}</td>
                            <td>{order.paymentId?.name}</td>
                            <td>{order.totalPrice?.toLocaleString()} <u>đ</u></td>
                            <td>{order.isPaymented ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
                            <td>{processStr(order)}
                                </td>
                            <td onClick={() => {setShowOrderProduct(true); setProductOrders(order.productOrder ? order.productOrder : []); setOrderId(order.orderId ? order.orderId : 0)}} style={{color: "blue", cursor: 'pointer'}}>Ấn để xem</td>
                            <td>{order.description}</td>
                            <td>
                                <button hidden={order.isProcess} onClick={() => {processOrder(order.orderId ? order.orderId : 0, 'process')}} className={'btn btn-success'}>Xử lý</button>
                                <button hidden={!order.isProcess || (order.isProcess && order.isDone)} onClick={() => {processOrder(order.orderId ? order.orderId : 0, 'done')}} className={'btn btn-primary'}>Done</button>

                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td style={{
                                // width:'100%',
                                height: '300px',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                fontSize: '18px',
                                fontWeight: '500'
                            }} colSpan={10}>Không có sản phẩm nào
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>

            <ModalOrderProductDetail
                show={showOrderProduct}
                onHide={() => setShowOrderProduct(false)}
                productorders={productOrders}
                orderId={orderId}
            />
        </div>

    )
}
export default OrderListMgmt