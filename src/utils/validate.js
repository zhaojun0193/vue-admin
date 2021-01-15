/**
 * 验证邮箱格式
 * @param {string} value 
 */
export function validateEmailStr(value){
    let reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    return reg.test(value);
}

/**
 * 验证密码格式
 * @param {string} value 
 */
export function validatePasswordStr(value){
    let reg = /^.*(?=.{6,20})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    return reg.test(value);
}

/**
 * 验证密码格式
 * @param {string} value 
 */
export function validateVCode(value){
    let reg = /^[a-z\d]{6}$/;
    return reg.test(value);
}