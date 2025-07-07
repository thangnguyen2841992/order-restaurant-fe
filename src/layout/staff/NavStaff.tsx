import React, {useEffect, useState} from "react";
import Brand from "../../model/Brand";
import {getAllBrands} from "../../api/Brand-Api";
import {Dropdown} from "react-bootstrap";

interface NavStaffInterface {
    handleChangeMenuStaff: (value: string) => void
    handleChangeBrandIdSelect: (value: string) => void
}

const NavStaff: React.FC<NavStaffInterface> = ({handleChangeMenuStaff, handleChangeBrandIdSelect}) => {
    const [brands, setBrands] = useState<Brand[]>([]);
    useEffect(() => {
        getAllBrands().then((data) => {
            const updatedBrands = [{ brandId: 0, brandName: 'Tất cả' }, ...data]
            setBrands(updatedBrands);
        })
    }, []);
    const changeMenu = (newValue: string) => {
        return handleChangeMenuStaff(newValue);
    }
    const [selectedOption, setSelectedOption] = useState<string>('Tất cả');

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
    return (
        <div className={'nav-staff'}>
            <div onClick={() => changeMenu('listProduct')} className="nav-staff-item">
                Danh sách sản phẩm
            </div>

            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="light" id="dropdown-basic" className="nav-staff-item">
                    {selectedOption}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {
                        brands.map((brand) => (
                            <Dropdown.Item eventKey={brand.brandId}>{brand.brandName}</Dropdown.Item>

                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>

            <div onClick={() => changeMenu('user')} className="nav-staff-item">
                Danh sách khách hàng
            </div>

        </div>
    )
}
export default NavStaff