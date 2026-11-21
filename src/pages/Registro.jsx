import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet-async";

import { useAuth } from "../context/AuthContext";

import styles from "./Registro.module.css";

export default function Registro() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const { signup } = useAuth();

  const navigate =
    useNavigate();

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      setError("");

      try {
        await signup(
          email,
          password
        );

        navigate("/");
      } catch (err) {
        setError(err.message);

        console.error(err);
      }
    };

  return (
    <>
      <Helmet>
        <title>
          SMDStore | Registro
        </title>
      </Helmet>

      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>
            Crear cuenta
          </h2>

          <form
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button
              type="submit"
            >
              Registrarse
            </button>
          </form>

          {error && (
            <p
              className={
                styles.error
              }
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
}