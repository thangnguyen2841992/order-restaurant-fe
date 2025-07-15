import React, {useEffect, useState} from "react";
import NavStaff from "./NavStaff";
import Navbar from "../shared/Navbar";
import Product from "../../model/Product";
import {getAllProducts, getAllProductsOfBrand} from "../../api/Staff-Api";
import ImageProduct from "./ImageProduct";
import ModalCreateNewProduct from "./ModalCreateNewProduct";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import CartResponse from "../../model/CartResponse";

function StaffHome() {
    const [actionModalCreateUpdate, setActionModalCreateUpdate] = useState(false);
    const [showEditImageForm, setShowEditImageForm] = useState(false);
    const [menuStaff, setMenuStaff] = useState<string>('listProduct');
    const [products, setProducts] = useState<Product[]>([]);
    const [brandId, setBrandId] = useState(0);
    const [showModalCreatePopup, setShowModalCreatePopup] = useState(false);
    const [resetModalCreatePopup, setResetPropProduct] = useState(false);
    const [type, setType] = useState('C');
    const [productId, setProductId] = useState(0);
    const token = localStorage.getItem('token');
    const [cartResponse, setCartResponse] = useState<CartResponse>({});
    const [test, setTest] = useState(false);


    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 10; // Số sản phẩm hiển thị mỗi trang
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
// Lấy sản phẩm cho trang hiện tại
    const displayedProducts = products.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleShowModalCreatePopup = (productId: number, type :string) => {
        setShowModalCreatePopup(true);
        setType(type);
        setProductId(productId);
    };

    const handleCloseModalCreatePopup = () => {
        setShowModalCreatePopup(false);
        setResetPropProduct(true);
        setShowEditImageForm(false);
    }

    const handleChangeMenuStaff = (value: string) => {
        setMenuStaff(value);
    };
    const handleChangeBrandIdSelect = (value: string) => {
        setBrandId(Number(value));
    };

    const deleteProduct = async (productId : number) => {
        try {
            const url: string = `http://localhost:8083/staff-api/deleteProduct?productId=${productId}`;
            const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );

            if (response.ok) {
                alert('Xóa sản phẩm thành công');
                setActionModalCreateUpdate(true);
            } else {
                console.log(response.json());
                alert('Xóa sửa sản phẩm lỗi');
            }
        } catch (error) {
            alert('Xóa sửa sản phẩm lỗi');
        }
    }

    useEffect(() => {
        getAllProducts().then((data) => {
            setProducts(data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        if (Number(brandId) !== 0) {
            getAllProductsOfBrand(brandId).then((data) => {
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
        setActionModalCreateUpdate(false);
    }, [brandId, actionModalCreateUpdate])
    return (
        <div className={'staff-home-area'}>
            <Navbar cartResponse={cartResponse} handleShowHideCartArea={setTest} />
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
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                displayedProducts.length > 0 ? (displayedProducts.map((product, index) => (
                                    <tr key={product.productId}>
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
                                        <td><ImageProduct productId={product.productId ? product.productId : 0} actionModalCreateUpdate={actionModalCreateUpdate}/></td>
                                        <td>{product.isDelete === true ? 'Đã xóa' : 'Đang kinh doanh'}</td>
                                        <td>
                                            <button onClick={() => deleteProduct(product.productId ? product.productId : 0)} title={'Xóa sản phẩm'} className={'btn btn-danger'}><FontAwesomeIcon icon={faTrash}/></button></td>
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
                        {/* Nút phân trang */}
                        <div hidden={products.length === 0} className="pagination">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    disabled={index + 1 === currentPage}>
                                    {index + 1}
                                </button>
                            ))}
                        </div>
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
                setActionModalCreateUpdate={setActionModalCreateUpdate}
            />
        </div>
    )
}

export default StaffHome