import React from "react";

interface PriceOriginComponentProps {
    price: number;
    percent : number;
}

const PriceOriginComponent: React.FC<PriceOriginComponentProps> = ({price, percent}) => {

    return (
        <div className={'price-origin-component'}>
            <div className="price-origin-component-price">
                {price.toLocaleString()} <u>¥</u>
            </div>
            <div className="price-origin-component-percent">
                -{percent} %
            </div>
        </div>
    )

}

export default PriceOriginComponent