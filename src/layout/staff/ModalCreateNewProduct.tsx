import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import Brand from "../../model/Brand";
import {getAllBrands} from "../../api/Brand-Api";
import ProductUnit from "../../model/ProductUnit";
import {getAllProductUnits} from "../../api/Product-Unit-Api";


function ModalCreateNewProduct(props: any) {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [brandId, setBrandId] = useState('1');
    const [productUnitId, setProductUnitId] = useState('1');
    const [brands, setBrands] = useState<Brand[]>([]);
    const [productUnits, setProductUnits] = useState<ProductUnit[]>([]);
    const handleChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    }
    const handleChangeProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(e.target.value);
    }

    const handleChangeBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBrandId(event.target.value);
    };

    const handleChangeProductUnitId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductUnitId(event.target.value);
    };
    useEffect(() => {
        getAllBrands().then((data) => {
            setBrands(data);
        }).catch((error) => {
            console.log(error);
        });
        getAllProductUnits().then((data) => {
            setProductUnits(data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);
    return (
        <div className={'product-create-detail-area'}>
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong className={'text-center'}>Thêm Mới Sản Phẩm</strong>

                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        <div className="form-group">
                            <label htmlFor="brand">Danh mục sản phẩm<small>*</small></label>
                            <select name="brand" id="brand" className={'form-control'} onChange={handleChangeBrand}>
                                {
                                    brands.map((brand) => (
                                        <option key={brand.brandId} value={brand.brandId}>{brand.brandName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productName">Tên sản phẩm<small>*</small></label>
                            <input value={productName} onChange={handleChangeProductName} required type="text"
                                   className="form-control" id="productName"
                                   placeholder="Tên sản phẩm"/>
                        </div>
                        <div className="price-uint-area">
                            <div className="form-group" id={'price-uint-area-price'}>
                                <label htmlFor="productPrice">Giá sản phẩm(VNĐ)<small>*</small></label>
                                <input value={productPrice} onChange={handleChangeProductPrice} required type="text"
                                       className="form-control" id="productPrice"
                                       placeholder="Giá sản phẩm"/>
                            </div>
                            <div className="form-group" id={'price-uint-area-productUnit'}>
                                <label htmlFor="productUnit">Đơn vị tính<small>*</small></label>
                                <select name="productUnit" id="productUnit" className={'form-control'} onChange={handleChangeProductUnitId}>
                                    {
                                        productUnits.map((productUnit) => (
                                            <option key={productUnit.productUnitId} value={productUnit.productUnitId}>{productUnit.productUnitName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>

                    </Modal.Body>
                </div>
            </Modal>

        </div>

    )
}

export default ModalCreateNewProduct