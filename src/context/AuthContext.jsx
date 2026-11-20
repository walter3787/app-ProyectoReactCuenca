import { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (email, password) => {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  const logout = async () => {
    setRol(null);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async (currentUser) => {
          setUser(currentUser);

          if (currentUser) {
            try {
              const usuarioRef = doc(
                db,
                "usuarios",
                currentUser.uid
              );

              const usuarioSnap =
                await getDoc(usuarioRef);

              if (usuarioSnap.exists()) {
                setRol(
                  usuarioSnap.data().rol
                );
              } else {
                setRol("usuario");
              }
            } catch (error) {
              console.error(
                "Error obteniendo rol:",
                error
              );
              setRol("usuario");
            }
          } else {
            setRol(null);
          }

          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  const value = {
    user,
    rol,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}