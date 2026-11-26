import React, { useState } from 'react';
import css from './loginComponent.module.css'
import { Link, useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        navigate("/list_rezerwacja");
      } else {
        setError(data.message || "Błąd logowania!");
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Brak połączenia z serwerem (port 8000).");
    }
  };
    
    return (
        <div id={css.mainBox}>
            
            <div id={css.loginBox}>
                <div id={css.formBox}>
                    <form onSubmit={handleSubmit}>
                        {error && <p style={{ color: "red" }}>{error}</p>}
                       <label>Email: <br/> <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} required/></label>

                       <label>Hasło: <br/> <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required/></label>
                       <Link to={'/password-reset'}><h6 style={{textAlign: "left", marginTop: -50, fontSize: "20px", color: "darkBlue"}}>Resetuj hasło?</h6></Link>

                       <label><button>Zaloguj się</button></label>

                       <Link to={'/register'}><h6 style={{textAlign: "center", marginTop: -50, fontSize: "20px", color: "darkBlue"}}>- Stworzyć użytkownik -</h6></Link>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default LoginComponent;