import ProductOrder from "../../model/ProductOrder";
import React from "react";
import UserProductItem from "./UserProductItem";
import OrderResponse from "../../model/OrderResponse";
import order from "./Order";

interface UserOrderItemInterface {
    productOrder: ProductOrder[];
    order : OrderResponse;
}

const UserOrderItem: React.FC<UserOrderItemInterface> = ({productOrder, order}) => {
    return (
        <div className={'user-product-order-content'}>
            {
                productOrder.map((productOrder, index) => (
                    <div className={'user-product-order-list'}>
                        <UserProductItem order={order} productOrder={productOrder} index={index}/>
                    </div>
                ))
            }
        </div>

    )
}
export default UserOrderItem