class User {
      userId ?: number;

      email ?: string;

      phoneNumber ?: string;

      password ?: string;

      firstName ?: string;

      lastName ?: string;

      username ?: string;

      birthday ?: string;

      dateCreated ?: string;

      gender ?: number;

      lastLogin ?:string;

      avatar ?: string;

      active ?: boolean;

      address ?: string;

      codeActive ?: string;

      isBlock ?: boolean;


    constructor(userId: number, email: string, phoneNumber: string, password: string, firstName: string, lastName: string, username: string, birthday: string, dateCreated: string, gender: number, lastLogin: string, avatar: string, active: boolean, address: string, codeActive: string, isBlock: boolean) {
        this.userId = userId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.birthday = birthday;
        this.dateCreated = dateCreated;
        this.gender = gender;
        this.lastLogin = lastLogin;
        this.avatar = avatar;
        this.active = active;
        this.address = address;
        this.codeActive = codeActive;
        this.isBlock = isBlock;
    }
}
export default User