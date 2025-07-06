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
    const handleShowImage = () => {
      setShowImage(true);
    }
    const handleCloseModalImagePost = () => {
        setShowImage(false);
        setResetPropImage(true);
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
            {
                images.map((image, index) => (
                    <div onClick={handleShowImage} title={'Hiển thị ảnh'} className={'image-product-item'}>Ảnh {index + 1}</div>
                ))
            }
            <ShowImageModal
                show={showImage}
                images={images}
                onHide={handleCloseModalImagePost}
                resetProp={resetPropImage}
                />
        </div>

    )
}
export default ImageProduct