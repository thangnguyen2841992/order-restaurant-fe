import React, {useEffect, useState} from "react";
import Product from "../../model/Product";
import {getAllImagesOfProductId} from "../../api/Image-Api";
import {getProductByProductIdUser} from "../../api/User-Api";

interface CartDetailItemInterface {
    index: number;
    productId: number;
    quantity : number;
    editQuantity : (productId : number, type : number) => void;
}
const CartDetailItem:React.FC<CartDetailItemInterface> = ({productId, quantity, index, editQuantity}) => {
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



   return (
       <div>
           <div className="cart-detail-area-content-item">
               <div className="cart-detail-area-content-item-index">
                   {index + 1}
               </div>
               <div className="cart-detail-area-content-item-image">
                   <img src={image} alt="Anh san pham"/>
               </div>
               <div className="cart-detail-area-content-item-name-price">
                   <div className="cart-detail-area-content-item-name">
                       {product.productName}
                   </div>
                   <div className="cart-detail-area-content-item-price">
                       { product.productPrice?.toLocaleString()} <u>¥</u>
                   </div>
               </div>

               <div className="cart-detail-area-content-item-quantity">
                   <button  onClick={() => editQuantity(product.productId ? product.productId : 0 , 0)}>
                       -
                   </button>
                   <div className={'product-quantity-cart'}>
                       {quantity}
                   </div>
                   <button onClick={() => editQuantity(product.productId ? product.productId : 0 , 1)}>
                       +
                   </button>
               </div>
               <div className="cart-detail-area-content-item-total">

               </div>

           </div>
       </div>
   )
}
export default CartDetailItem