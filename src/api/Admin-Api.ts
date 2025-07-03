import User from "../model/User";
import {myRequest, myRequestToken} from "./Public-Api";

export async function getAllUsers(): Promise<User[]> {
    const url = `http://localhost:8082/admin-api/getAllUser`;
    const token = localStorage.getItem("token");


    const responseData = await myRequestToken(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    let users: User[] = [];

    for (const key in responseData) {
        users.push(
            {
                userId: responseData[key].userId,

                email: responseData[key].email,

                phoneNumber: responseData[key].phoneNumber,

                password: responseData[key].password,

                firstName: responseData[key].firstName,

                lastName: responseData[key].lastName,

                username: responseData[key].username,

                birthday: responseData[key].birthday,

                dateCreated: responseData[key].dateCreated,

                gender: responseData[key].gender,

                lastLogin: responseData[key].lastLogin,

                avatar: responseData[key].avatar,
                active: responseData[key].active,

                address: responseData[key].address,

                codeActive: responseData[key].codeActive,

                isBlock: responseData[key].block,
            }
        );
    }

    return users;
}