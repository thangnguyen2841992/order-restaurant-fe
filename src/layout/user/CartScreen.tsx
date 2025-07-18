import CartResponse from "../../model/CartResponse";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import CartDetailItem from "./CartDetailItem";
import {Client} from "@stomp/stompjs";

interface CartScreenInterface {
    cartResponse : CartResponse,
    client : Client,
    editQuantity : (productId : number, type : number) => void
    deleteAllProductOfCart : (cartId : number) => void
}
const CartScreen : React.FC<CartScreenInterface> = ({cartResponse, client, editQuantity, deleteAllProductOfCart}) => {
   return (
       <div id={'cart-screen-area'}>
           <div className="cart-screen-header">
               <div className="cart-screen-header-top">
                   <div className={'cart-screen-header-top-home'}>家</div>
                   <div>{'>'}</div>
                   <div className={'cart-screen-header-top-brand-name'}>{'Giỏ hàng của bạn'}</div>
               </div>
               <div className="cart-screen-header-bottom">
                   <div className="cart-screen-header-bottom-left">
                       {'Giỏ hàng của bạn'}
                   </div>
               </div>
           </div>
           <div className="cart-screen-middle">
                <div className="cart-screen-middle-left">
                    <div className="cart-screen-middle-left-header">
                        <div className="cart-screen-middle-left-header-left">
                            <span style={{color : '#2a2f33', fontWeight :'500', fontSize:'24px'}}>Danh sách sản phẩm</span> <span style={{color : '#7a7e80', fontWeight:'500', fontSize :'20px'}}>({cartResponse.productCartList?.length} sản phẩm)</span>
                        </div>
                        <div className="cart-screen-middle-left-header-right">
                            <button className={'btn btn-outline-primary'}><span style={{marginRight : '10px'}}><FontAwesomeIcon icon={faTrash}/></span><span style={{fontSize : '16px'}} onClick={() => deleteAllProductOfCart(cartResponse.cartId ? cartResponse.cartId : 0)}>Xóa hết giỏ hàng</span> </button>
                        </div>
                    </div>
                    <div className="cart-screen-middle-content">
                        {
                            cartResponse.productCartList?.map((product, index) => (
                                <CartDetailItem client={client ? client : new Client()}  productId={product.productId ? product.productId : 0} quantity={product.quantity ? product.quantity : 0} key={product.productId} index={index}  editQuantity={editQuantity} productCartId={Number(product.productCartId)} />
                            ))
                        }
                    </div>
                </div>

               <div className="cart-screen-middle-right">
                   <div className="cart-screen-middle-right-header">
                       <div className="cart-screen-middle-right-header-left">
                           <span style={{color : '#2a2f33', fontWeight :'500', fontSize:'24px'}}>Tổng đơn hàng</span>
                       </div>
                       <div className="cart-screen-middle-right-header-right">
                           <span style={{color : '#7a7e80', fontWeight:'500', fontSize :'20px'}}>{cartResponse.productCartList?.length} sản phẩm</span>
                       </div>
                   </div>
                   <div className="cart-screen-middle-right-content">
                        <div className="cart-screen-middle-right-content-item">
                            <div className="cart-screen-middle-right-content-item-left">
                                Tạm tính
                            </div>
                            <div className="cart-screen-middle-right-content-item-right">
                                {cartResponse.totalPrice?.toLocaleString()} <u>đ</u>
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
                       <div className="cart-screen-middle-right-content-item">
                           <div className="cart-screen-middle-right-content-item-left">
                               Tổng thanh toán
                           </div>
                           <div style={{color : 'red'}} className="cart-screen-middle-right-content-item-right">
                               {cartResponse.totalPrice?.toLocaleString()} <u>đ</u>
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
                       <button style={{width : '100%', margin : '10px 0'}} className={'btn btn-primary'}>Tiến hành thanh toán</button>
                   </div>
               </div>
           </div>
       </div>
   )
}
export default CartScreen