import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../components/BackgroundImage";
import netflix_spinner from "../assets/netflix_spinner.gif";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogIn = async () => {
    if (!email || !password) {
      setError("Veuillez renseigner l'email et le mot de passe.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Tentative de connexion pour:", email);
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (err) {
      console.error("Firebase auth error:", err);
      switch (err.code) {
        case "auth/invalid-email":
          setError("Adresse email invalide.");
          break;
        case "auth/user-not-found":
          setError("Aucun compte trouvé avec cet email.");
          break;
        case "auth/wrong-password":
          setError("Mot de passe incorrect.");
          break;
        case "auth/missing-password":
          setError("Le mot de passe est requis.");
          break;
        default:
          setError("Une erreur est survenue. Réessaie.");
      }
    } finally {
        setTimeout(()=>{
            setLoading(false);
        }, 2000)
      
    }
  };

  return (
  <Container>
    <BackgroundImage />
    <div className="content">
      <Header />
      {loading && (
        <div className="full-spinner">
          <img src={netflix_spinner} alt="Chargement..." />
        </div>
      )}
      {!loading && (
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <form
              className="container flex column"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogIn();
              }}
            >
              <input
                type="email"
                placeholder="Email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button type="submit">Log In</button>
            </form>

            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      )}
    </div>
  </Container>
);

}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;

    .form-container {
      gap: 2rem;
      height: 70vh;
      display: flex;
      justify-content: center;
      align-items: center;

      .login-spinner {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 200px;
      }
      .login-spinner img {
        width: 80px;
      }

      .form {
        padding: 2rem;
        background-color: #000000b0;
        width: 25vw;
        height: 40vh;
        gap: 2rem;
        color: white;

        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
          }
          button[disabled] {
            opacity: 0.6;
            cursor: not-allowed;
          }
        }
        .error-message {
          color: #e87c03;
          font-size: 0.9rem;
          text-align: center;
          margin-top: 1rem;
        }
      }
    }
  }
    .full-spinner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black; /* ✅ toute la page en noir */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* au-dessus de tout */
}

.full-spinner img {
  width: 100px; /* taille du spinner */
}

`;

export default Login;
