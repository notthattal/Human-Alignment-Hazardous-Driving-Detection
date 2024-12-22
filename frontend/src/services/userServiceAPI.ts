import { RegistrationFormData, SignInFormData } from "../utils/types";
import axios from "axios";

class UserServiceAPI {
    private static instance: UserServiceAPI;

    private constructor() { }

    public static getInstance(): UserServiceAPI {

        if (!UserServiceAPI.instance) {
            UserServiceAPI.instance = new UserServiceAPI();
        }

        return UserServiceAPI.instance;
    }

    public async registerUser(registrationFormData: RegistrationFormData) {
        axios.post('http://localhost:3001/auth/register', (registrationFormData))
            .then((res) => {
                console.log('User has successfully registered!', res)
            })
            .catch((err) => {
                console.log(`An error has occured while registering the user, ${err}`)
            })

            // Handle JWT and Store in Cookie.
    }

    public async signIn(signInFormData: SignInFormData) {
        axios.post('http://localhost:3001/auth/signIn', (signInFormData))
            .then((res) => {
                console.log('User has successfully signed in!', res)
            })
            .catch((err) => {
                console.log(`An error has occurred while signing in, ${err}`)
            })

    }
}

export default UserServiceAPI;