const userValidation = (password, confirmPassword, email) => {
    if (password !== confirmPassword) {
        return {
            success: false,
            message: "Password mismatch"
        }
    }
    else if (password.length < 6) {
        return {
            success: false,
            message: "Password must be atleast 6 character"
        }
    }
    else if (!/@/.test(email)) {
        return {
            success: false,
            message: "Email format is incorrect"
        }
    }
    else{
        return {
            success: true,
            message: "There is no issue"
        }
    }
}

module.exports = { userValidation }