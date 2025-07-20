class UserToken {
    username?: string;
    userId?: number;
    fullName?: string;
    isAdmin?: boolean;
    isUser ?: boolean;
    isStaff ?: boolean;
    avatar ?: string;
    email ?: string;
    phoneNumber ?: string;
    address ?: string;


    constructor(username: string, userId: number, fullName: string, isAdmin: boolean, isUser: boolean, isStaff: boolean, avatar: string, email: string, phoneNumber: string, address: string) {
        this.username = username;
        this.userId = userId;
        this.fullName = fullName;
        this.isAdmin = isAdmin;
        this.isUser = isUser;
        this.isStaff = isStaff;
        this.avatar = avatar;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}

export default UserToken