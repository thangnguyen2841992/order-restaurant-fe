import {Modal} from "react-bootstrap";
import React from "react";
import {getUserToken} from "../../api/Public-Api";


function ModalUploadProduct(props: any) {
    const token = localStorage.getItem("token");
    const uploadProducts = async () => {
        try {
            const url: string = `http://localhost:8083/staff-api/uploadProducts`;
            const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(props.dataupload)
                }
            );

            if (response.ok) {
                alert('Thêm mới sản phẩm thành công');
            } else {
                console.log(response.json());
                alert('Thêm mới sản phẩm lỗi');
            }
        } catch (error) {
            alert('Thêm mới sản phẩm lỗi');
        }
    }

    return (
        <div className={'upload-product-area'}>
            <Modal
                {...props}
                size={'xl'}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <strong hidden={props.showEditImageForm}
                                className={'text-center'}>{'Danh Sách Thêm Mới Sản Phẩm'} ({props.dataupload.length} sản phẩm)</strong>
                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        <button onClick={() => uploadProducts()} style={{marginBottom : '10px'}} className={'btn btn-primary'}>Xác nhận</button>
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
                                props.dataupload.map((data: any, index: any) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{data.productName}</td>
                                        <td>{data.brandId}</td>
                                        <td>{data.productPrice?.toLocaleString()} <u>đ</u> / {data.productUnitId}</td>
                                        <td>{data.quantity}</td>
                                        <td>{data.point}</td>
                                        <td>{data.description}</td>
                                        <td></td>
                                        {/*<td>{data[7]}</td>*/}
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>

                    </Modal.Body>
                </div>
            </Modal>

        </div>
    )
}

export default ModalUploadProduct

