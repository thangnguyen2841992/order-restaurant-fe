import ProductOrder from "../../model/ProductOrder";
import React, {useEffect, useState} from "react";
import Product from "../../model/Product";
import {getProductByProductIdUser} from "../../api/User-Api";
import {getAllImagesOfProductId} from "../../api/Image-Api";

interface ProductOrderItemInterface {
    productOrder : ProductOrder;
    index : number;
}
const ProductOrderItem : React.FC<ProductOrderItemInterface> = ({productOrder, index}) => {

    const [product, setProduct] = useState<Product>({});
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        getProductByProductIdUser(productOrder.productId ? productOrder.productId : 0).then((data) => {
            setProduct(data);
        }).catch((error) => {
            console.log(error);
        })
        getAllImagesOfProductId(productOrder.productId ? productOrder.productId : 0).then((data) => {
            setImage(data[0].imageLink ? data[0].imageLink : '')
        }).catch((error) => {
            console.log(error);
        })
    }, [productOrder.productId]);

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
              <div className="cart-detail-area-content-item-quantity-order">
                  x {productOrder.quantity}
              </div>
          </div>
      </div>
  )
}
export default ProductOrderItem