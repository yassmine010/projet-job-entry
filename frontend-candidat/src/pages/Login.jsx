import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/api";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  const changeHandle = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.login(data);

      if (!res.data?.data) {
        throw new Error("Identifiants incorrects");
      }

      if (
        res.data.data?.isverified === false ||
        res.data.data?.role !== "candidate"
      ) {
        throw new Error("❌ Votre compte candidat n'est pas vérifié");
      }

      setAlert({
        type: "success",
        message: "✅ Vous êtes connecté maintenant",
      });

      localStorage.setItem("user", JSON.stringify(res.data.data));

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error) {
      setAlert({
        type: "error",
        message:
          error.response?.data?.message ||
          error.message ||
          "❌ Erreur lors de la connexion",
      });
    }
  };

  return (
    <div>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3">Login</h1>
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3"></div>

            <div className="col-md-6">
              {alert.message && (
                <div
                  className={`p-3 mb-4 rounded-lg ${
                    alert.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {alert.message}
                </div>
              )}

              <form onSubmit={login}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    onChange={changeHandle}
                    required
                  />
                  <label>Email</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={changeHandle}
                    required
                  />
                  <label>Mot de passe</label>
                </div>

                <button className="btn btn-primary w-100 py-3" type="submit">
                  Login
                </button>
              </form>

              <Link to="/forget" className="d-block mt-3">
                Mot de passe oublié ?
              </Link>

              <Link to="/register" className="d-block mt-1">
                Créer un nouveau compte
              </Link>
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
