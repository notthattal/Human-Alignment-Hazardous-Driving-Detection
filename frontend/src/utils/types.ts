export type RegistrationFormData = {
    email: string,
    password: string,
    country: string,
    state: string | null,
    city: string | null,
    licenseAge: string,
    age: number,
    ethnicity: string,
    gender: string,
    visuallyImpaired: boolean,
    referredByUser: string
}

export type SignInFormData = {
    email: string,
    password: string
}

export type GazeData = {
    x: number,
    y: number,
    time: number
}

export type AuthAction = | { type: 'LOGIN'; payload: any } | { type: 'LOGOUT' };