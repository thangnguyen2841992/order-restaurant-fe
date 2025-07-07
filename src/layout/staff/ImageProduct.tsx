import React, {useEffect, useState} from "react";
import {getAllImagesOfProductId} from "../../api/Image-Api";
import Image from "../../model/Image";
import ShowImageModal from "./ShowImageModal";

interface ImageProductInterface {
    productId: number;
}

const ImageProduct: React.FC<ImageProductInterface> = ({productId}) => {
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
    }, [productId]);
    return (
        <div className={'image-product-area'}>
            <div onClick={handleShowImage} title={'Hiển thị ảnh'} className={'image-product-item'}>Hiển thị ảnh</div>
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