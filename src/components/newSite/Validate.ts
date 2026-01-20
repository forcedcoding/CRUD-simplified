export const validateUserName = (userName:string):boolean => {
    const nameRegex =  /^[A-Za-z ]{2,}$/;
    return nameRegex.test(userName);
}

export const validatePassword = (userPassword:string):boolean => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(userPassword);
}