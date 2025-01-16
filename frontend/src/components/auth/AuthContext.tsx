import { createContext, useReducer, ReactNode, useEffect } from 'react';
import { AuthState, AuthContextType } from '../../utils/interfaces';
import { AuthAction } from '../../utils/types';

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload };
        case 'LOGOUT':
            return { user: null };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const initialUser = JSON.parse(localStorage.getItem('user') || 'null');
    const [state, dispatch] = useReducer(authReducer, { 
        user: initialUser 
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || 'null')
        
        if (user && !state.user) { 
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};