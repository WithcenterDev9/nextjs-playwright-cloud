type ValidationResult = {
    isValid: boolean,
    status?: {
        type: "failed" | "success",
        statusMsg: string
    }
}

export function validateRegisterForm(
    username: string,
    email: string,
    password: string
): ValidationResult {
    if (!username) {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Username is required" }
        }
    }

    if (/\s/.test(username)) { // Check if username contains spaces
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Username cannot contain spaces" }
        };
    }

    if (username.length < 3) {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Username must be at least 3 characters" }
        }
    }

    if (!email) {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Email is required" }
        }
    }

    if (!password) {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Password is required" }
        };
    }
    if (password.length < 6) {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Password must be at least 6 characters" }
        };
    }

    return {
        isValid: true,
        status: { type: "success", statusMsg: "Registration successful!" }
    }
}


export function validateLoginForm(
    username: string,
    password: string,
): ValidationResult {

    if (!username) {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Username is required" }
        }
    }

    if (!password) {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Password is required" }
        }
    }

    if (username !== "frederick" && password !== "frederickpassword") {
        return {
            isValid: false,
            status: { type: "failed", statusMsg: "Incorrect Credentials" }
        }
    }

    return {
        isValid: true,
        status: { type: "success", statusMsg: "Login Successful!" }
    }
}