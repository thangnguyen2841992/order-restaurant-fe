import React, {ChangeEvent, useEffect, useState} from "react";
import {findListTotalProductOfMonth} from "../../api/Staff-Api";
import TotalQuantityProductResponse from "../../model/TotalQuantityProductResponse";
import ImageProduct from "./ImageProduct";

const Statistic = () => {
        const [totalProductOrders, setTotalProductOrders] = useState<TotalQuantityProductResponse[]>([]);
        const [bestProducts, setBestProducts] = useState(true);
        const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
        const [reload, setReload] = useState(false);
        const [showTotalPriceMonth, setShowTotalPriceMonth] = useState(false);

        const handleChangeMonth = (e : ChangeEvent<HTMLSelectElement>) => {
            setSelectedMonth(Number(e.target.value));
            setReload(true);
        }

    const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại (0-11 nên cộng thêm 1)
    const year = 2025;

    const getMonths = (maxMonth: number): { value: number, label: string }[] => {
        const monthNames = [
            'Tháng 1 / 2025', 'Tháng 2 / 2025', 'Tháng 3 / 2025', 'Tháng 4 / 2025', 'Tháng 5 / 2025', 'Tháng 6 / 2025',
            'Tháng 7 / 2025', 'Tháng 8 / 2025', 'Tháng 9 / 2025', 'Tháng 10 / 2025', 'Tháng 11 / 2025', 'Tháng 12 / 2025'
        ];

        return monthNames.slice(0, maxMonth).map((month, index) => ({
            value: index + 1, // Giá trị tháng (1-12)
            label: month,      // Tên tháng
        }));
    };

    const months = getMonths(currentMonth);

    useEffect(() => {
        findListTotalProductOfMonth(selectedMonth).then((data) => {
            setTotalProductOrders(data);
            setReload(false);
        }).catch((error) => {
            console.log(error)
        })
        setReload(false);
    }, [reload]);

    return (
        <div className={'statistic-area'}>
            <div className="statistic-area-header">
                <div onClick={() => {setBestProducts(true); setReload(true);}} className="statistic-area-item">
                    Sản phẩm bán chạy trong tháng
                </div>
                <div onClick={() => {(true)}} className="statistic-area-item">
                    Doanh số bán hàng trong tháng
                </div>
            </div>
            <div className="statistic-area-content">
                <div hidden={!bestProducts} className="best-products">
                    <div style={{background : 'white', padding : '10px', display : 'flex', alignItems : 'center'}}>
                        <h3  style={{marginRight : '30px'}}>Sản phẩm bán chạy trong tháng</h3>
                        <div className="form-group" style={{display : 'flex', width : '200px'}}>
                            <select onChange={handleChangeMonth} value={selectedMonth} id="month-select" className="form-control">
                                <optgroup label="Tháng trong năm 2025" >
                                    {months.map((month) => (
                                        <option key={month.value} value={month.value}>
                                            {month.label}
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>
                    </div>

                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Tên Sản Phẩm</th>
                            <th scope="col">Danh Mục Sản Phẩm</th>
                            <th scope="col">Giá (VNĐ)</th>
                            <th scope="col">Số lượng đã bán</th>
                            <th scope="col">Ảnh Sản Phẩm</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            totalProductOrders.length > 0 ? (totalProductOrders.map((product, index) => (
                                <tr key={product.productId}>
                                    <td scope="row">{index + 1}</td>
                                    <td

                                        style={{color: 'blue', cursor: 'pointer'}}>{product.productName}</td>
                                    <td>{product.brandName}</td>
                                    <td>{product.productPrice?.toLocaleString()}
                                        <u>đ</u> / {product.productUnitName}</td>
                                    <td>{product.totalQuantity} ({product.productUnitName})</td>
                                    <td><ImageProduct productId={product.productId ? product.productId : 0}
                                                      actionModalCreateUpdate={false}/></td>

                                </tr>
                            ))) : (
                                <tr>
                                    <td style={{
                                        // width:'100%',
                                        height: '300px',
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                        fontSize: '18px',
                                        fontWeight: '500'
                                    }} colSpan={10}>Không có sản phẩm nào
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}
export default Statistic