import React, {useEffect, useState} from "react";
import Product from "../../model/Product";
import {getAllImagesOfProductId} from "../../api/Image-Api";
import {getProductByProductIdUser} from "../../api/User-Api";
import {Client} from "@stomp/stompjs";

interface CartDetailItemInterface {
    index: number;
    productId: number;
    productCartId: number;
    quantity: number;
    editQuantity: (productId: number, type: number) => void;
    client : Client;
}

const CartDetailItem: React.FC<CartDetailItemInterface> = ({productCartId,productId, quantity, index, editQuantity, client}) => {
    const [product, setProduct] = useState<Product>({});
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        getProductByProductIdUser(productId).then((data) => {
            setProduct(data);
        }).catch((error) => {
            console.log(error);
        })
        getAllImagesOfProductId(productId).then((data) => {
            setImage(data[0].imageLink ? data[0].imageLink : '')
        }).catch((error) => {
            console.log(error);
        })
    }, [productId]);

    const removeProductCart = (productCartId : number) => {
        if (client) {
            let messageDeleteProductCartSend =  JSON.stringify({
                productCartId : productCartId,
            })
            client.publish({
                destination: '/app/delete-product-cart',
                body: messageDeleteProductCartSend
            });
        }
    }

    return (
        <div>
            <div className="cart-detail-area-content-item">
                <div className="cart-detail-area-content-item-index">
                    {index + 1}
                </div>
                <div className="cart-detail-area-content-item-image">
                    <img src={`data:image/jpeg;base64,${image}`} alt="Anh san pham"/>
                </div>
                <div className="cart-detail-area-content-item-name-price">
                    <div className="cart-detail-area-content-item-name">
                        {product.productName}
                    </div>
                    <div className="cart-detail-area-content-item-price">
                        {product.productPrice?.toLocaleString()} <u>¥</u>
                    </div>
                </div>

                <div className="cart-detail-area-content-item-quantity">
                    <button onClick={() => editQuantity(product.productId ? product.productId : 0, 0)}>
                        -
                    </button>
                    <div className={'product-quantity-cart'}>
                        {quantity}
                    </div>
                    <button onClick={() => editQuantity(product.productId ? product.productId : 0, 1)}>
                        +
                    </button>
                </div>
                <div className="cart-detail-area-content-item-total">
                    <div className="cart-detail-area-content-item-total-top">
                            Thành tiền
                    </div>
                    <div className="cart-detail-area-content-item-total-bottom">
                        {(Number(product.productPrice) * Number(quantity)).toLocaleString()} <u>¥</u>
                    </div>
                </div>
                <div className="cart-detail-area-content-item-delete" onClick={() => removeProductCart(productCartId)}>
                    Xóa
                </div>

            </div>

        </div>
    )
}
export default CartDetailItem