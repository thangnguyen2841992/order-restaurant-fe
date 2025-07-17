import React, {useEffect, useState} from "react";
import Image from "../../model/Image";
import {getAllImagesOfProductId} from "../../api/Image-Api";

interface ImgProductUserInterface {
    productId: number;
}

const ImgProductUser: React.FC<ImgProductUserInterface> = ({productId}) => {

    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        getAllImagesOfProductId(productId).then((data) => {
            setImages(data);
        }).catch((error) => {
            console.log(error);
        })
    }, [productId]);

    if (images.length > 0) {
        return (
            <div className={'imgProductUser'}>
                <img  src={`data:image/jpeg;base64,${images[0].imageLink}`}  alt="Ảnh sản phẩm"/>
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }

}
export default ImgProductUser