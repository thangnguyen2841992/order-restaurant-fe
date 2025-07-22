import {Modal} from "react-bootstrap";
import React from "react";
import ProductOrder from "../../model/ProductOrder";
import Product from "../../model/Product";
import {getProductByProductId} from "../../api/Staff-Api";
import ProductOrderItem from "./ProductOrderItem";

function ModalOrderProductDetail(props: any) {

    return (
        <div className={'order-product-detail-container'}>
            <Modal
                {...props}
                size={'md'}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong>Thông tin đơn hàng</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        props.productorders.length > 0 && props.productorders.map((product: ProductOrder, index: number) => (
                          <ProductOrderItem key={product.productOrderId} productOrder={product} index={index} />
                        ))
                    }
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalOrderProductDetail;