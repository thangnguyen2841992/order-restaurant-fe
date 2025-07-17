import {Modal} from "react-bootstrap";
import React, {useState} from "react";
import Waiting from "./Waiting";


function ModalUploadProduct(props: any) {
    const token = localStorage.getItem("token");
    const [processUpload, setProcessUpload] = useState(false);
    const messageSuccess : string = props.type === 'create' ? 'Thêm mới sản phẩm thành công' : 'Chỉnh sửa thành công';
    const messageError = props.type === 'create' ? 'Thêm mới sản phẩm lỗi' : 'Chỉnh sửa lỗi';
    const uploadProducts = async () => {
        setProcessUpload(true);
        try {
            const url: string = props.type === 'create' ? `http://localhost:8083/staff-api/uploadProducts` : `http://localhost:8083/staff-api/uploadEditProducts`;
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
                setProcessUpload(false);
                alert(messageSuccess);
                props.setShowModalUploadProduct(false);
            } else {
                setProcessUpload(false);
                console.log(response.json());
                alert(messageError);
            }
        } catch (error) {
            setProcessUpload(false);
            alert(messageError);
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
                        <strong hidden={props.type === 'create'}
                                className={'text-center'}>{'Danh Sách Thêm Mới Sản Phẩm'} ({props.dataupload.length} sản
                            phẩm)</strong>
                        <strong hidden={props.type === 'edit'}
                                className={'text-center'}>{'Chỉnh Sửa Số Lượng Sản Phẩm'}</strong>
                    </Modal.Title>
                </Modal.Header>

                <div>
                    <Modal.Body>
                        <button onClick={() => uploadProducts()} style={{marginBottom: '10px'}}
                                className={'btn btn-primary'}>Xác nhận
                        </button>
                        <Waiting isDone={processUpload} message={'Đang upload sản phẩm'}/>
                        {
                            props.type === 'create' ? (
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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            props.dataupload.map((data: any, index: any) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.productName}</td>
                                                    <td>{data.brandId}</td>
                                                    <td>{data.productPrice?.toLocaleString()}
                                                        <u>đ</u> / {data.productUnitId}</td>
                                                    <td>{data.quantity}</td>
                                                    <td>{data.point}</td>
                                                    <td>{data.description}</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>

                                ) :
                                (
                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Mã Sản Phẩm</th>
                                            <th scope="col">Tên Sản Phẩm</th>
                                            <th scope="col">Số lượng</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            props.dataupload.map((data: any, index: any) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.productId}</td>
                                                    <td>{data.productName}</td>
                                                    <td>{data.quantity}</td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                )
                        }

                    </Modal.Body>
                </div>
            </Modal>
        </div>
    )
}

export default ModalUploadProduct

