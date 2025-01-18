import { useAuth } from "./useAuth";

const useSignOut = () => {
    const { dispatch } = useAuth();

    const signOut = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT'})
    }

    return { signOut }
}

export default useSignOut;