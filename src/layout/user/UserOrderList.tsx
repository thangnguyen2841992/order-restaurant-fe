import {useEffect, useState} from "react";
import {getAllOrderOfUser} from "../../api/Order-Api";
import OrderResponse from "../../model/OrderResponse";
import UserOrderItem from "./UserOrderItem";
import Navbar from "../shared/Navbar";

function UserOrderList() {
    const [orders, setOrders] = useState<OrderResponse[]>([]);

    useEffect(() => {
        getAllOrderOfUser().then((data) => {
            setOrders(data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);
    return (
        <div className={'user-order-list-area'}>
            <h3>Danh sách đơn hàng</h3>

            <div className="user-order-list-area-content">
                {
                    orders.map((order, index) => (
                            <UserOrderItem order={order}  productOrder={order.productOrder ? order.productOrder : []}/>
                    ))
                }
                </div>
        </div>
    )
}

export default UserOrderList