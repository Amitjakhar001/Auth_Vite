import {ReactNode, createContext, useContext, useEffect, useState} from "react";
import { checkAuthStatus, loginUser, logoutUser, deleteUser as apiDeleteUser, editUser as apiEditUser } from "../helpers/api-communicator";
import axios from "axios";

type User = {
    name: string;
    email: string;
    role: string;
};

type UserAuth = {
    isLoggedIn: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    createuser: (name: string, email: string, password: string, role: string) => Promise<void>;
    deleteUser: (email: string) => Promise<void>;
    editUser: (email: string, role: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkStatus() {
            const data = await checkAuthStatus();
            if (data) {
                setUser({email: data.email, name: data.name, role: data.role});
                setIsLoggedIn(true);
            }
        }
        checkStatus();
    }, []);

    const login = async (email: string, password: string) => {
        const data = await loginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name, role: data.role });
            setIsLoggedIn(true);
        }
    };

    const createuser = async (name: string, email: string, password: string, role: string) => {
        try {
            const res = await axios.post('/user/admindashboard/usermanagement/createuser', { name, email, password, role });
            if (res.status !== 201) {
                throw new Error('Failed to create user');
            }
            return res.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    };

    const editUser = async (email: string, role: string) => {
        try {
          await apiEditUser(email, role);
        } catch (error) {
          console.error('Error editing user:', error);
          throw error;
        }
      };
    

    const deleteUser = async (email: string) => {
        try {
            await apiDeleteUser(email); // Use the imported deleteUser from api-communicator
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    };

    const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    };

    const value = {
        user,
        isLoggedIn,
        login,
        createuser,
        deleteUser, 
        editUser,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// export const useAuth = () => useContext(AuthContext);



export const useAuth = (): UserAuth => {
  const context = useContext(AuthContext);
  if (context === null) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
