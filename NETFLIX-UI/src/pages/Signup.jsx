import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import TrendingSection from '../components/TrendingSection';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from 'react-router-dom';
import netflix_spinner from '../assets/netflix_spinner.gif';
import LoaderVideo from '../components/LoaderVideo';
import Footer from '../components/Footer';

export default function Signup() {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) navigate('/home');
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSignUp = async () => {
    if (!name || !formValues.email || !formValues.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        formValues.email,
        formValues.password
      );

      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }

    } catch (err) {
      console.error(err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          setError('Cet email est déjà utilisé.');
          break;
        case 'auth/invalid-email':
          setError('Adresse email invalide.');
          break;
        case 'auth/weak-password':
          setError('Mot de passe trop faible.');
          break;
        default:
          setError('Une erreur est survenue. Réessaie.');
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  if (showVideo) {
    return <LoaderVideo onEnd={() => setShowVideo(false)} />;
  }

  return (
    <>
      <Container $showPassword={showPassword}>
        <BackgroundImage />
        <div className="content">
          <Header login />

          {loading && (
            <div className="full-spinner">
              <img src={netflix_spinner} alt="Chargement..." />
            </div>
          )}
          
          {error && !loading && (
            <div className="full-error">
              <p>{error}</p>
              <button onClick={() => setError("")}>OK</button>
            </div>
          )}

          {!loading && (
            <div className="body flex column a-center j-center">
              <div className="text flex column">
                <h1>Unlimited movies, TV shows and more.</h1>
                <h4>Watch anywhere. Cancel anytime.</h4>
                <h6>Ready to watch? Enter your details to create your account.</h6>
              </div>
              <div className="form">
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formValues.email}
                  onChange={(e) =>
                    setFormValues({ ...formValues, [e.target.name]: e.target.value })
                  }
                />
                {showPassword && (
                  <>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formValues.password}
                      onChange={(e) =>
                        setFormValues({ ...formValues, [e.target.name]: e.target.value })
                      }
                    />
                  </>
                )}
                
                {!showPassword ? (
                  <button onClick={() => setShowPassword(true)}>Get Started</button>
                ) : (
                  <button onClick={handleSignUp}>Sign Up</button>
                )}
              </div>
            </div>
          )}
        </div>
      </Container>
      
      <TrendingSection />
      <Footer/>
    </>
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

    .full-error {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0,0,0,0.8);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #e87c03;
      font-size: 2rem;
      z-index: 9999;
      text-align: center;

      button {
        margin-top: 2rem;
        padding: 0.5rem 2rem;
        background-color: #e50914;
        color: white;
        border: none;
        border-radius: 0.3rem;
        cursor: pointer;
        font-size: 1rem;
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .text {
        gap: 1rem;
        text-align: center;
        font-size: 2rem;
        margin-bottom: 2rem;
        h1 {
          padding: 0 25rem;
        }
      }
      
      .form {
        display: flex;
        width: auto;
        align-items: center;
        gap: 10px;

        input {
          color: black;
          border: 1px solid 1rem;
          padding: 0.8rem 1rem;
          font-size: 1.2rem;
          border: 1px solid black;
          &:focus {
            outline: none;
          }
        }

        button {
          padding: 0.9rem 3rem;
          background-color: #e50914;
          border: none;
          cursor: pointer;
          color: white;
          font-weight: bolder;
          font-size: 1.05rem;
        }
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
    }
  }
  
  /* Spinner plein écran */
  .full-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .full-spinner img {
    width: 100px;
  }
`;