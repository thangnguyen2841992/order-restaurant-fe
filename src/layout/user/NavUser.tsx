import React, {useEffect, useState} from "react";
import Brand from "../../model/Brand";
import {getAllBrands} from "../../api/Brand-Api";
import {Dropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList} from "@fortawesome/free-solid-svg-icons";

interface NavUserInterface {
    handleChangeMenuUser: (value: string) => void
    handleChangeBrandIdSelect: (value: string) => void
}

const NavUser: React.FC<NavUserInterface> = ({handleChangeMenuUser, handleChangeBrandIdSelect}) => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>('Danh mục sản phẩm');
    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            handleChangeBrandIdSelect(eventKey);
            // @ts-ignore
            const selectedBrand = brands.find(brand => brand.brandId.toString() === eventKey);
            if (selectedBrand) {
                // @ts-ignore
                setSelectedOption(selectedBrand.brandName);
            }
        }
    };
    useEffect(() => {
        getAllBrands().then((data) => {
            setBrands(data);
        })
    }, []);
    return (
        <div className={'nav-user'}>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-staff-item">
                        <FontAwesomeIcon icon={faList}/>
                        <b style={{marginLeft : '5px'}}>{'製品カタログ'}</b>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        brands.map((brand) => (
                            <Dropdown.Item key={brand.brandId} eventKey={brand.brandId}>{brand.brandName}</Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

}
export default NavUser