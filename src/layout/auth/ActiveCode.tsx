import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function ActiveCode() {
    const userId = useParams().userId;
    const activeCode = useParams().activeCode;
    const [isActive, setIsActive] = useState<boolean>(false);

    let activeUser: () => Promise<void>;
    activeUser = async () => {
        try {
            const url = `http://localhost:8082/user-api/activeUser?userId=${userId}&activeCode=${activeCode}`;
            const response = await fetch(url,  {method: 'POST',
                headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(
                {
                userId : userId!== undefined ?  Number.parseInt(userId) : 0,
                activeCode : activeCode+""
            })
            });
            if (response.ok) {
                setIsActive(true);
            }
        } catch (e) {
            console.log('Lỗi khi kích hoat', e);
        }
    };

    useEffect(() => {
        if (userId && activeCode) {
            activeUser().then((r) => {

            }).catch((error) => {
                console.log(error);
            })
        }
    }, [userId, activeCode, activeUser])

    return (
        <div className={'text-align-center '}><h1 className={'text-center'}>Kích hoạt tài khoản</h1>

            <div>
                {
                    isActive ?
                        <p className={'text-center fs-5'}>Tài khoản đã kích hoạt thành công, bạn có thể đăng nhập để mua
                            hàng</p>

                        : <p className={'text-center fs-5'}>Kích hoạt tài khoản không thành công</p>
                }
            </div>
        </div>
    )
}

export default ActiveCode