import React from "react";

interface PriceOriginComponentProps {
    price: number;
}

const PriceOriginComponent: React.FC<PriceOriginComponentProps> = ({price}) => {
    const {discountedPrice, discountPercentage} = calculateDiscountedPrice(price);


    return (
        <div className={'price-origin-component'}>
            <div className="price-origin-component-price">
                {discountedPrice.toLocaleString()} <u>đ</u>
            </div>
            <div className="price-origin-component-percent">
                -{discountPercentage.toFixed(0)} %
            </div>
        </div>
    )

}
const calculateDiscountedPrice = (price: number): { discountedPrice: number; discountPercentage: number } => {
    const discountPercentage = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
    const discountAmount = (price * discountPercentage) / 100;
    const discountedPrice = price + discountAmount;
    return {discountedPrice, discountPercentage};
};
export default PriceOriginComponent