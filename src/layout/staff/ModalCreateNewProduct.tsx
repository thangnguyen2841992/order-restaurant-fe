import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import Brand from "../../model/Brand";
import {getAllBrands} from "../../api/Brand-Api";
import ProductUnit from "../../model/ProductUnit";
import {getAllProductUnits} from "../../api/Product-Unit-Api";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {imageDb} from "../../firebase/ConfigFireBase";
import {getProductByProductId} from "../../api/Staff-Api";
import Waiting from "./Waiting";


function ModalCreateNewProduct(props: any) {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('1000');
    const [productQuantity, setProductQuantity] = useState('1');
    const [imageListData, setImageListData] = useState<string[]>([]);
    const [brandId, setBrandId] = useState('1');
    const [productUnitId, setProductUnitId] = useState('1');
    const [productPoint, setProductPoint] = useState('0');
    const [brands, setBrands] = useState<Brand[]>([]);
    const [productUnits, setProductUnits] = useState<ProductUnit[]>([]);

    const resetProductForm = () => {
      setProductName('');
      setProductDescription('');
      setProductQuantity('0');
      setProductPrice('1000');
      setProductPoint('0');
      setImageListData([]);
      setProductUnitId('1');
      setBrandId('1')
    }

    const handleChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    }
    const handleChangeProductDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductDescription(e.target.value);
    }
    const handleChangeProductQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductQuantity(e.target.value);
    }
    const handleChangeProductPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductPrice(e.target.value);
    }
    const handleChangeProductPoint = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductPoint(e.target.value);
    }

    const handleChangeBrand = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setBrandId(event.target.value);
    };

    const handleChangeProductUnitId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductUnitId(event.target.value);
    };
    const [processImg, setProcessImg] = useState(false);
    const onImagesInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setProcessImg(true);
        const uploadedUrls: string[] = [];
        // @ts-ignore
        const files = event.target.files;
        if (files) {
            for (const image of Array.from(files)) {
                const imageRef = ref(imageDb, `images/${image.name}`);
                try {
                    await uploadBytes(imageRef, image); // Upload file
                    const downloadUrl = await getDownloadURL(imageRef); // Lấy URL
                    uploadedUrls.push(downloadUrl);
                    console.log('File uploaded successfully. URL:', downloadUrl);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
            setImageListData(uploadedUrls);
        }
        setProcessImg(false);
    }

    const handleSaveProduct = async () => {
        try {
            const url: string = `http://localhost:8083/staff-api/createNewProduct`;
            const token = localStorage.getItem('token');
            const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        productName: productName.trim(),
                        productPrice: Number(productPrice),
                        productUnitId: Number(productUnitId),
                        brandId: Number(brandId),
                        point: Number(productPoint),
                        imageLinks: imageListData,
                        description : productDescription.trim(),
                        quantity : productQuantity
                    })
                }
            );

            if (response.ok) {
                alert('Thêm mới sản phẩm thành công');
                resetProductForm();
                props.handleCloseModalCreatePopup();
            } else {
                console.log(response.json());
                alert('Thêm mới sản phẩm lỗi');
            }
        } catch (error) {
            alert('Thêm mới sản phẩm lỗi');
        }
    }

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
        if (Number(props.productId) !== 0) {
            getProductByProductId(Number(props.productId)).then((data) => {
                setProductName(data.productName ? data.productName : '');
                setProductDescription(data.description ? data.description : '');
                setProductQuantity(data.quantity ? data.quantity.toString() : '0');
                setProductPrice(data.productPrice ? data.productPrice.toString() : '1000');
                setProductPoint(data.point ? data.point.toString() : '0');
                setProductUnitId(data.productUnit?.productUnitId ? data.productUnit.productUnitId.toString() : '1');
                setBrandId(data.brand?.brandId ? data.brand.brandId.toString() : '1')
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [props.productId]);
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

                <div style={ processImg ?{pointerEvents : 'none'} : {pointerEvents : 'auto'}}>
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
                                <select name="productUnit" id="productUnit" className={'form-control'}
                                        onChange={handleChangeProductUnitId}>
                                    {
                                        productUnits.map((productUnit) => (
                                            <option key={productUnit.productUnitId}
                                                    value={productUnit.productUnitId}>{productUnit.productUnitName}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group" id={'price-uint-area-quantity'}>
                                <label htmlFor="productQuantity">Số lượng<small>*</small></label>
                                <input value={productQuantity} onChange={handleChangeProductQuantity} required
                                       type="text"
                                       className="form-control" id="productQuantity"
                                       placeholder="Số lượng"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productPoint">Điểm tích lũy</label>
                            <input value={productPoint} onChange={handleChangeProductPoint} required type="text"
                                   className="form-control" id="productPoint"
                                   placeholder="Điểm tích lũy"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="productDescription">Mô tả sản phẩm</label>
                            <input value={productDescription} onChange={handleChangeProductDescription} required
                                   type="text"
                                   className="form-control" id="productDescription"
                                   placeholder="Mô tả sản phẩm"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imageProduct">Ảnh sản phẩm</label>
                            <input required type="file" multiple
                                   className="form-control" id="imageProduct" onChange={onImagesInputChange}/>
                        </div>
                        <Waiting isDone={processImg}/>
                        <button onClick={handleSaveProduct} style={{width: '100%'}} className={'btn btn-primary'}>Lưu
                            sản phẩm
                        </button>
                    </Modal.Body>
                </div>
            </Modal>

        </div>

    )
}

export default ModalCreateNewProduct