import React, {useEffect, useState} from "react";
import NavStaff from "./NavStaff";
import Navbar from "../shared/Navbar";
import Product from "../../model/Product";
import {getAllProducts} from "../../api/Staff-Api";
import ImageProduct from "./ImageProduct";
import ModalCreateNewProduct from "./ModalCreateNewProduct";
import product from "../../model/Product";

function StaffHome() {
    const [menuStaff, setMenuStaff] = useState<string>('listProduct')
    const handleChangeMenuStaff = (value: string) => {
        setMenuStaff(value);
    };
    const [showModalCreatePopup, setShowModalCreatePopup]= useState(false);
    const [resetModalCreatePopup, setResetPropProduct]= useState(false);
    const [type, setType]= useState('C');
    const [productId, setProductId]= useState(0);

    const handleShowModalCreatePopup = () => {
        setShowModalCreatePopup(true);
        setType('C');
        setProductId(0);
    };

    const handleCloseModalCreatePopup = () => {
        setShowModalCreatePopup(false);
        setResetPropProduct(true);
    }

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [])
    return (
        <div className={'staff-home-area'}>
            <Navbar/>
            <NavStaff handleChangeMenuStaff={handleChangeMenuStaff}/>
            <div className="staff-home-content">
            <div className="staff-home-left"></div>
            <div className="staff-home-middle">
                <div hidden={menuStaff !== 'listProduct'}  className="staff-home-middle-list">
                    <div className="staff-home-middle-header">
                        DANH SÁCH SẢN PHẨM
                        <button onClick={handleShowModalCreatePopup} className={'btn btn-primary'}>Thêm mới sản phẩm</button>
                    </div>

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên Sản Phẩm</th>
                            <th scope="col">Danh Mục Sản Phẩm</th>
                            <th scope="col">Giá (VNĐ)</th>
                            <th scope="col">Điểm Tích Lũy</th>
                            <th scope="col">Ảnh Sản Phẩm</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            products.map((product, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{product.productName}</td>
                                    <td>{product.brand?.brandName}</td>
                                    <td>{product.productPrice} <u>đ</u>  /   {product.productUnit?.productUnitName}</td>
                                    <td>{product.point}</td>
                                    <td><ImageProduct productId={product.productId ? product.productId : 0}/></td>
                                    {/*<td>{formatDate(user.birthday === undefined ? "" : user.birthday)}</td>*/}
                                    {/*<td><img src={product.} alt=""/></td>*/}
                                </tr>
                            ))
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
            />
        </div>
    )
}
export default StaffHome