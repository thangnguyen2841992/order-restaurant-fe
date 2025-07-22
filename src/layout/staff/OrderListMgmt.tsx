import React, {useEffect} from "react";
import OrderResponse from "../../model/OrderResponse";
import {getAllOrder} from "../../api/Order-Api";
import {formatDateTime} from "../../api/Public-Api";
import ModalOrderProductDetail from "./ModalOrderProductDetail";
import ProductOrder from "../../model/ProductOrder";

interface OrderListMgmtInterface {
}

const OrderListMgmt: React.FC<OrderListMgmtInterface> = ({}) => {
    const [orders, setOrders] = React.useState<OrderResponse[]>([]);
    const [productOrders, setProductOrders] = React.useState<ProductOrder[]>([]);
    const [showOrderProduct, setShowOrderProduct] = React.useState(false);

    const processStr = (order: OrderResponse) => {
        if (order.isProcess) {
            return 'Đang xử lý';
        } else if (order.isDone) {
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
    }, []);
    return (
        <div className={'order-list-mgmt'}>
            <div className="staff-home-middle-header">
                <h3>DANH SÁCH ĐƠN HÀNG </h3>
                <div className={'staff-home-middle-header-btn'}>

                </div>
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
                            <td onClick={() => {setShowOrderProduct(true); setProductOrders(order.productOrder ? order.productOrder : [])}} style={{color: "blue", cursor: 'pointer'}}>Ấn để xem</td>
                            <td>{order.description}</td>
                            <td><button className={'btn btn-success'}>Xử lý</button></td>
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
            />
        </div>

    )
}
export default OrderListMgmt