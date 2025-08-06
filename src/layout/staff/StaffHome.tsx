import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import NavStaff from "./NavStaff";
import Product from "../../model/Product";
import {getAllNotificationsOfStaff, getAllProducts, getAllProductsOfBrand} from "../../api/Staff-Api";
import ImageProduct from "./ImageProduct";
import ModalCreateNewProduct from "./ModalCreateNewProduct";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import CartResponse from "../../model/CartResponse";
import ModalUploadProduct from "./ModalUploadProduct";
import * as XLSX from 'xlsx';
import OrderListMgmt from "./OrderListMgmt";
import Notification from "../../model/Notification";
import {Client} from "@stomp/stompjs";
import {getUserToken} from "../../api/Public-Api";
import SockJS from "sockjs-client";
import NotificationDetail from "../user/NotificationDetail";
import ChatComponent from "../user/ChatComponent";
import ChatStaff from "./ChatStaff";



function StaffHome() {
    const [totalNotification, setTotalNotification] = useState(0);
    const [chatId, setChatId] = useState(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [actionModalCreateUpdate, setActionModalCreateUpdate] = useState(false);
    const [showEditImageForm, setShowEditImageForm] = useState(false);
    const [showOrderList, setShowOrderList] = useState(false);
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
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const fileInputRefEdit = useRef<HTMLInputElement | null>(null);
    const [showModalUploadProduct, setShowModalUploadProduct] = useState(false);
    const [dataUpload, setDataUpload] = useState<any[]>([]);
    const [typeUpload, setTypeUpload] = useState<string>('create');
    const [showNotificationArea, setShowNotificationArea] = useState(false);
    const [client, setClient] = useState<Client>();
    const [typeNotification, setTypeNotification] = useState('');
    const [showChat, setShowChat] = useState(false);
    const [reloadChat, setReloadChat] = useState(false);


    const handleUploadExcel = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleEditProductByExcel = () => {
        if (fileInputRefEdit.current) {
            fileInputRefEdit.current.click();
        }
    };

    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 10; // Số sản phẩm hiển thị mỗi trang
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
// Lấy sản phẩm cho trang hiện tại
    const displayedProducts = products.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleShowModalCreatePopup = (productId: number, type: string) => {
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

    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([]);
    const isAllChecked = displayedProducts.length > 0 && selectedProductIds.length === displayedProducts.length;


    const handleCheckboxChange = (productId: number, isChecked: boolean) => {
        if (isChecked) {
            setSelectedProductIds(prev => [...prev, productId]);
        } else {
            setSelectedProductIds(prev => prev.filter(id => id !== productId));
        }
    };

    const handleCheckAllChange = (isChecked: boolean) => {
        if (isChecked) {
            const allProductIds: number[] = displayedProducts.map(product => product.productId ? product.productId : productId);
            setSelectedProductIds(allProductIds);
        } else {
            setSelectedProductIds([]);
        }
    };

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: 'ws://localhost:8083/ws',
            connectHeaders: {
                login: 'guest',
                passcode: 'guest',
            },
            debug: (str) => {
                console.log(str);
            },
            onConnect: () => {

                stompClient.subscribe('/topic/staffNotification', (message) => {
                    const response = JSON.parse(message.body);
                    console.log(response);
                    if (response.toUserId === getUserToken().userId) {
                        const notification : Notification = {
                            notificationId : response.notificationId,
                            toUserId : response.toUserId,
                            orderId : response.orderId,
                            message : response.message,
                            dateCreated : response.dateCreated,
                            isStaff : response.staff
                        }
                        setNotifications(prevNotifications => {
                            const updatedNotifications = [notification, ...prevNotifications];
                            setTotalNotification(updatedNotifications.length);
                            return updatedNotifications;
                        });
                    }
                });
                stompClient.subscribe('/topic/approvalChat', (message) => {
                    const response = JSON.parse(message.body);
                    setChatId(response.processId);
                    setShowChat(true);
                    console.log(response);
                });
            },
            webSocketFactory: () => {
                return new SockJS('http://localhost:8083/ws');
            },
        });

        setClient(stompClient);
        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []);

    const deleteProduct = async (productId: number) => {
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

    const deleteMultipleProduct = async () => {
        try {
            const url: string = `http://localhost:8083/staff-api/deleteMultipleProducts?productIds=${selectedProductIds}`;
            const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.ok) {
                alert('Xóa sản phẩm thành công');
                setActionModalCreateUpdate(true);
                setSelectedProductIds([]);
            } else {
                console.log(response.json());
                alert('Xóa sửa sản phẩm lỗi');
            }
        } catch (error) {
            alert('Xóa sửa sản phẩm lỗi');
        }
    }

    const closeModalUpload = () => {
        setShowModalUploadProduct(false);
    }

    const onExcelFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileType = file.type;
            if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                fileType === 'application/vnd.ms-excel') {
                setTypeUpload(type);
                setShowModalUploadProduct(true);
                const reader = new FileReader();
                reader.onload = (e) => {
                    const arrayBuffer = e.target?.result;
                    const workbook = XLSX.read(arrayBuffer, {type: 'array'});

                    // Lấy dữ liệu từ sheet đầu tiên
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});

                    const dataWithoutHeader = jsonData.slice(1).filter((row: any) => row && row.length > 0);

                    const productUploads = dataWithoutHeader.map((row: any) => {
                        if (row && row.length > 0) {
                            if (type == 'create') {
                                const imageLinks = row[7] ? row[7].split(',') : [];
                                const newImages = imageLinks.map((link: string) => ({
                                    imageLink: link.trim(),
                                }));

                                return {
                                    brandId: row[0].charAt(0),
                                    productName: row[1],
                                    productPrice: row[2],
                                    productUnitId: row[3].charAt(0),
                                    quantity: row[4],
                                    point: row[5],
                                    description: row[6],
                                    imageList: newImages // Mảng các đối tượng Image
                                };
                            } else {
                                return {
                                    productId: row[0],
                                    productName: row[1],
                                    quantity: row[2]
                                }
                            }
                        }

                    });

                    setDataUpload(productUploads); // Lưu dữ liệu vào state
                };

                reader.readAsArrayBuffer(file);
            } else {
                alert("Vui lòng chọn một file Excel (.xls hoặc .xlsx)!");
            }
        }
        event.target.value = '';
    };

    useEffect(() => {
        getAllNotificationsOfStaff().then((data) => {
            setNotifications(data);
            setTotalNotification(data.length);
        }).catch((error) => {
            console.log(error);
        })
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
            <div>
                <NavStaff setReloadChat={setReloadChat} showNotificationArea={showNotificationArea} setType={setTypeNotification} totalNotification={totalNotification} handleChangeMenuStaff={handleChangeMenuStaff}
                          handleChangeBrandIdSelect={handleChangeBrandIdSelect}
                          setShowOrderList={setShowOrderList} setShowNotificationArea={setShowNotificationArea}  />
            </div>
            <div onClick={() => {setShowNotificationArea(false)}} className="staff-home-content">
                <div className="staff-home-left"></div>
                <div className="staff-home-middle">
                    <div hidden={menuStaff !== 'listProduct' || showOrderList} className="staff-home-middle-list">
                        <div className="staff-home-middle-header">
                            <h3>製品リスト</h3>
                            <div className={'staff-home-middle-header-btn'}>
                                <input ref={fileInputRef} hidden required type="file"
                                       className="form-control" id="imageProduct"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => onExcelFileChange(e, 'create')}/>

                                <input ref={fileInputRefEdit} hidden required type="file"
                                       className="form-control" id="imageProductEdit"
                                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => onExcelFileChange(e, 'edit')}/>
                                <button onClick={() => {
                                    deleteMultipleProduct()
                                }} hidden={selectedProductIds.length === 0} style={{marginRight: '10px'}}
                                        className={'btn btn-danger'}>Xóa tất cả
                                </button>

                                <button style={{marginRight: '10px'}} className={'btn btn-success'}
                                        onClick={handleEditProductByExcel}>Excelファイルから製品の数量を更新する
                                </button>
                                <button style={{marginRight: '10px'}} className={'btn btn-success'}
                                        onClick={handleUploadExcel}>Excelから新製品を追加します
                                </button>
                                <button onClick={() => handleShowModalCreatePopup(0, 'C')}
                                        className={'btn btn-primary'}>新製品を追加します
                                </button>
                            </div>
                        </div>

                        {/* Nút phân trang */}
                        <div hidden={products.length === 0} className="pagination">
                            {totalPages > 1 && (
                                <>
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}>
                                        Trang đầu
                                    </button>

                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
                                        disabled={currentPage === 1}>
                                        Previous
                                    </button>

                                    {currentPage > 3 && <span>...</span>}

                                    {Array.from({length: Math.min(10, totalPages)}, (_, index) => {
                                        const pageIndex = currentPage > 5
                                            ? index + currentPage - 5
                                            : index + 1;

                                        if (pageIndex > totalPages) return null;

                                        return (
                                            <button
                                                key={pageIndex}
                                                onClick={() => setCurrentPage(pageIndex)}
                                                disabled={pageIndex === currentPage}>
                                                {pageIndex}
                                            </button>
                                        );
                                    })}

                                    {currentPage < totalPages - 2 && <span>...</span>}

                                    <button
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}>
                                        Next
                                    </button>

                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}>
                                        Trang cuối
                                    </button>
                                    <input
                                        type="text"
                                        min={1}
                                        max={totalPages}
                                        placeholder="Nhập số trang"
                                        onKeyDown={(e) => {
                                            if (!/[0-9]/.test(e.key)) {
                                                e.preventDefault();
                                            }
                                        }}
                                        onChange={(e) => {
                                            const page = Number(e.target.value);
                                            if (page >= 1 && page <= totalPages) {
                                                setCurrentPage(page);
                                            }
                                        }}
                                    />
                                </>
                            )}
                        </div>

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th><input type="checkbox" onChange={(e) => handleCheckAllChange(e.target.checked)}
                                           checked={isAllChecked}/></th>
                                <th scope="col">STT</th>
                                <th scope="col">Tên Sản Phẩm</th>
                                <th scope="col">Danh Mục Sản Phẩm</th>
                                <th scope="col">Giá (VNĐ)</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Điểm Tích Lũy</th>
                                <th scope="col">Mô tả sản phẩm</th>
                                <th scope="col">Ảnh Sản Phẩm</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                displayedProducts.length > 0 ? (displayedProducts.map((product, index) => (
                                    <tr key={product.productId}>
                                        <td><input type="checkbox"
                                                   onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxChange(product.productId ? product.productId : 0, e.target.checked)}
                                                   checked={selectedProductIds.includes(product.productId ? product.productId : 0)}/>
                                        </td>
                                        <td scope="row">{index + 1}</td>
                                        <td onClick={() => product.productId && handleShowModalCreatePopup(product.productId, 'U')}
                                            id={'td-product-name'}
                                            style={{color: 'blue', cursor: 'pointer'}}>{product.productName}</td>
                                        <td>{product.brand?.brandName}</td>
                                        <td>{product.productPrice?.toLocaleString()}
                                            <u>đ</u> / {product.productUnit?.productUnitName}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.point}</td>
                                        <td>{product.description}</td>
                                        <td><ImageProduct productId={product.productId ? product.productId : 0}
                                                          actionModalCreateUpdate={actionModalCreateUpdate}/></td>
                                        <td>{product.isDelete === true ? 'Đã xóa' : 'Đang kinh doanh'}</td>
                                        <td>
                                            <button
                                                onClick={() => deleteProduct(product.productId ? product.productId : 0)}
                                                title={'Xóa sản phẩm'} className={'btn btn-danger'}><FontAwesomeIcon
                                                icon={faTrash}/></button>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td style={{
                                            // width:'100%',
                                            height: '300px',
                                            textAlign: 'center',
                                            verticalAlign: 'middle',
                                            fontSize: '18px',
                                            fontWeight: '500'
                                        }} colSpan={10}>Không có sản phẩm nào
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>

                    </div>
                    <div hidden={!showOrderList}>
                        <OrderListMgmt />
                    </div>

                </div>
                <div className="staff-home-right"></div>
            </div>
            <NotificationDetail setReloadChat={setReloadChat}  client={client ? client : new Client()} setShowChatArea={setShowChat} type={type} notifications={notifications} totalNotification={totalNotification} showNotificationArea={showNotificationArea} setShowNotificationArea={setShowNotificationArea}/>

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
            <ModalUploadProduct
                show={showModalUploadProduct}
                onHide={closeModalUpload}
                dataupload={dataUpload}
                setShowModalUploadProduct={setShowModalUploadProduct}
                type={typeUpload}
                setActionModalCreateUpdate={setActionModalCreateUpdate}
            />
            <ChatStaff reloadChat={reloadChat} showChatStaff={showChat} setShowChatStaff={setShowChat}/>
        </div>
    )
}

export default StaffHome