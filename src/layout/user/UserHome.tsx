import Navbar from "../shared/Navbar";
import NavStaff from "../staff/NavStaff";
import NavUser from "./NavUser";
import {useEffect, useState} from "react";
import {getAllProducts, getAllProductsOfBrand} from "../../api/Staff-Api";
import Product from "../../model/Product";
import {getAllProductsUser} from "../../api/User-Api";
import ImgProductUser from "./ImgProductUser";

function UserHome() {
    const [menuStaff, setMenuStaff] = useState<string>('listProduct');
    const [brandId, setBrandId] = useState(0);
    const [brandName, setBrandName] = useState('Thực phẩm tươi sống');
    const [products, setProducts] = useState<Product[]>([]);

    const handleChangeMenuUser = (value: string) => {
        setMenuStaff(value);
    };
    const handleChangeBrandIdSelect = (value: string) => {
        setBrandId(Number(value));
    };
    useEffect(() => {
        getAllProductsUser().then((data) => {
            setProducts(data);
        }).catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        if (Number(brandId) !== 0) {
            getAllProductsOfBrand(brandId).then((data) => {
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
        } else {
            getAllProductsUser().then((data) => {
                setProducts(data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [brandId])
    return (
        <div className={'user-home-area'}>
            <Navbar/>
             <div className="user-home-content">
             <NavUser handleChangeMenuUser={handleChangeMenuUser} handleChangeBrandIdSelect={handleChangeBrandIdSelect}/>
                <div className="user-home-header">
                    <div className="user-home-header-top">
                        <div className={'user-home-header-top-home'}>Trang chủ</div>
                        <div>{'>'}</div>
                        <div className={'user-home-header-top-brand-name'}>{brandName}</div>
                    </div>
                    <div className="user-home-header-bottom">
                        <div className="user-home-header-bottom-left">
                            {brandName}
                        </div>
                        <div className="user-home-header-bottom-right">
                            1210 sản phẩm
                        </div>
                    </div>
                </div>
                 <div className="user-home-middle">
                     {
                         products.map((product) => (
                             <div key={product.productId} className="user-home-middle-item">
                                 <div className="user-home-middle-item-img">
                                     <ImgProductUser productId={product.productId ? product.productId : 0}/>
                                 </div>
                             </div>
                         ))

                     }

                 </div>
            </div>

        </div>
    )
}
export default UserHome