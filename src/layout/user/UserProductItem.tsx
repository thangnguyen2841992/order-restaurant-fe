import ProductOrder from "../../model/ProductOrder";
import React, {useEffect, useState} from "react";
import Product from "../../model/Product";
import {getProductByProductId} from "../../api/Staff-Api";
import {getProductByProductIdUser} from "../../api/User-Api";
import {getAllImagesOfProductId} from "../../api/Image-Api";
import Image from "../../model/Image";
import OrderResponse from "../../model/OrderResponse";

interface UserProductItemInterface {
    index :  number;
    productOrder : ProductOrder;
    order : OrderResponse
}
const UserProductItem : React.FC<UserProductItemInterface> = ({productOrder, index, order}) => {

    const [product, setProduct] = useState<Product>({});
    const [image, setImage] = useState<Image>({});

    const processStr = (order: OrderResponse) => {
        if (order.isProcess && !order.isDone) {
            return 'Đơn hàng của bạn đang được gửi đi.';
        }
        if (order.isDone) {
            return 'Đơn hàng đã hoàn tất';
        }
        return 'Đang chuẩn bị đơn hàng';
    }

    useEffect(() => {
        getProductByProductIdUser(productOrder.productId ? productOrder.productId : 0).then((data) => {
            setProduct(data);
        })
        getAllImagesOfProductId(productOrder.productId ? productOrder.productId : 0).then((data) => {
            setImage(data[0]);
        })
    }, [productOrder]);

    return (
        <div className={'user-product-item'}>
            <div className="user-product-item-index">
                {index}
            </div>
            <div className="cart-detail-area-content-item-image">
                <img src={`data:image/jpeg;base64,${image.imageLink}`} alt="Anh san pham"/>
            </div>
            <div className="cart-detail-area-content-item-name-price">
                <div className="cart-detail-area-content-item-name">
                    {product.productName}
                </div>
                <div className="cart-detail-area-content-item-price">
                    {product.productPrice?.toLocaleString()} <u>¥</u>
                </div>

            </div>
            <div className={'user-product-item-quantity'}>
              x  {productOrder.quantity}
            </div>
            <div className={'user-product-item-total'}>
               =    {(Number(product.productPrice) * Number(productOrder.quantity))?.toLocaleString()} <u>¥</u>
            </div>
            <div className="user-product-item-process">
                {processStr(order)}
            </div>
        </div>
    )
}
export default UserProductItem