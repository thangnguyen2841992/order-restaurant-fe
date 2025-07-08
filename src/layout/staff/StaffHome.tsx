import React, {useEffect, useState} from "react";
import NavStaff from "./NavStaff";
import Navbar from "../shared/Navbar";
import Product from "../../model/Product";
import {getAllProducts, getAllProductsOfBrand} from "../../api/Staff-Api";
import ImageProduct from "./ImageProduct";
import ModalCreateNewProduct from "./ModalCreateNewProduct";

function StaffHome() {
    const [showEditImageForm, setShowEditImageForm] = useState(false);
    const [menuStaff, setMenuStaff] = useState<string>('listProduct')
    const handleChangeMenuStaff = (value: string) => {
        setMenuStaff(value);
    };
    const handleChangeBrandIdSelect = (value: string) => {
        if (Number(value) !== 0) {
            getAllProductsOfBrand(Number(value)).then((data) => {
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            getAllProducts().then((data) => {
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
        }
    };
    const [showModalCreatePopup, setShowModalCreatePopup] = useState(false);
    const [resetModalCreatePopup, setResetPropProduct] = useState(false);
    const [type, setType] = useState('C');
    const [productId, setProductId] = useState(0);

    const handleShowModalCreatePopup = (productId: number, type :string) => {
        setShowModalCreatePopup(true);
        setType(type);
        setProductId(productId);
    };
    const getAllProduct = () => {
        getAllProducts().then((data) => {
            setProducts(data);
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleCloseModalCreatePopup = () => {
        setShowModalCreatePopup(false);
        setResetPropProduct(true);
        setShowEditImageForm(false);
        getAllProduct();
    }

    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        getAllProduct();
    }, [])
    return (
        <div className={'staff-home-area'}>
            <Navbar/>
            <NavStaff handleChangeMenuStaff={handleChangeMenuStaff}
                      handleChangeBrandIdSelect={handleChangeBrandIdSelect}/>
            <div className="staff-home-content">
                <div className="staff-home-left"></div>
                <div className="staff-home-middle">
                    <div hidden={menuStaff !== 'listProduct'} className="staff-home-middle-list">
                        <div className="staff-home-middle-header">
                            DANH SÁCH SẢN PHẨM
                            <button onClick={() => handleShowModalCreatePopup(0, 'C')} className={'btn btn-primary'}>Thêm mới
                                sản phẩm</button>
                        </div>

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Tên Sản Phẩm</th>
                                <th scope="col">Danh Mục Sản Phẩm</th>
                                <th scope="col">Giá (VNĐ)</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Điểm Tích Lũy</th>
                                <th scope="col">Mô tả sản phẩm</th>
                                <th scope="col">Ảnh Sản Phẩm</th>

                            </tr>
                            </thead>
                            <tbody>
                            {
                                products.length > 0 ? (products.map((product, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td onClick={() => product.productId && handleShowModalCreatePopup(product.productId, 'U')}
                                            id={'td-product-name'}
                                            style={{color: 'blue', cursor: 'pointer'}}>{product.productName}</td>
                                        <td>{product.brand?.brandName}</td>
                                        <td>{product.productPrice?.toLocaleString()}
                                            <u>đ</u> / {product.productUnit?.productUnitName}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.point}</td>
                                        <td>{product.description}</td>
                                        <td><ImageProduct productId={product.productId ? product.productId : 0}/></td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td style={{
                                            height: '300px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            fontSize: '18px',
                                            fontWeight: '500'
                                        }} colSpan={8}>Không có sản phẩm nào
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="staff-home-right"></div>
            </div>
            <ModalCreateNewProduct
                show={showModalCreatePopup}
                type={type}
                productId={productId}
                onHide={handleCloseModalCreatePopup}
                resetPropModalCreatePopup={resetModalCreatePopup}
                handleCloseModalCreatePopup={handleCloseModalCreatePopup}
                showEditImageForm={showEditImageForm}
                setShowEditImageForm={setShowEditImageForm}
            />
        </div>
    )
}

export default StaffHome