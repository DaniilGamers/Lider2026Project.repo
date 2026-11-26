import React, { useState } from 'react';
import css from './RegisterComponent.module.css'
import { Link, useNavigate } from 'react-router-dom';

const RegisterComponent = () => {



    const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          password: password,
          email: email
        })
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        navigate("/login")
      } else {
        setError(data.message || "Błąd rejestracji!");
      }
    } catch (err) {
      setError("Brak połączenia z serwerem (port 8000).");
    }
  };

    return (
        <div id={css.mainBox}>
            
            <div id={css.registerBox}>
                <div id={css.formBox}>
                    <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                       <label>Imie: <br/> <input value={firstName} type="text" onChange={(e) => setFirstName(e.target.value)} required/></label>
                       

                       <label>Nazwisko: <br/> <input value={lastName} type="text" onChange={(e) => setLastName(e.target.value)} required/></label>

                       <label>Hasło: <br/> <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required/></label>

                       <label>Email: <br/> <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} required/></label>

                       <label><button>Registruj</button></label>

                       <Link to={'/login'}><h6 style={{textAlign: "center", marginTop: -50, fontSize: "20px", color: "darkBlue"}}>- Masz już konto? Zaloguj się -</h6></Link>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default RegisterComponent;