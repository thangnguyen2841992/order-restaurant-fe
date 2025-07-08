import React, {useEffect, useState} from "react";
import {getAllImagesOfProductId} from "../../api/Image-Api";
import Image from "../../model/Image";
import ShowImageModal from "./ShowImageModal";

interface ImageProductInterface {
    productId: number;
    actionModalCreateUpdate : boolean
}

const ImageProduct: React.FC<ImageProductInterface> = ({productId, actionModalCreateUpdate}) => {
    const [images, setImages] = useState<Image[]>([]);
    const [showImage, setShowImage] = useState<boolean>(false);
    const [resetPropImage, setResetPropImage] = useState(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const handleShowImage = () => {
        setShowImage(true);
    }
    const handleCloseModalImagePost = () => {
        setShowImage(false);
        setResetPropImage(true);
        setCurrentIndex(0);
    }
    useEffect(() => {
        getAllImagesOfProductId(productId).then((data) => {
            setImages(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [productId, actionModalCreateUpdate]);
    return (
        <div className={'image-product-area'}>
            <div onClick={handleShowImage} title={'Hiển thị ảnh'} className={'image-product-item'}>{images.length > 0 ? 'Hiển thị ảnh' : 'Chưa có ảnh'}</div>
            <ShowImageModal
                show={showImage}
                images={images}
                onHide={handleCloseModalImagePost}
                resetProp={resetPropImage}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
            />
        </div>

    )
}
export default ImageProduct