import React from 'react';
import styled from 'styled-components';
import youtube_icon from '../assets/youtube_icon.png';
import twitter_icon from '../assets/x_icon.jpg';
import instagram_icon from '../assets/instagram_icon.png';
import facebook_icon from '../assets/facebook_icon.png';

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-icons">
        <a href="https://www.facebook.com/Netflix" target="_blank" rel="noopener noreferrer">
          <img src={facebook_icon} alt="Facebook" />
        </a>
        <a href="https://www.instagram.com/netflix" target="_blank" rel="noopener noreferrer">
          <img src={instagram_icon} alt="Instagram" />
        </a>
        <a href="https://twitter.com/netflix" target="_blank" rel="noopener noreferrer">
          <img src={twitter_icon} alt="X" />
        </a>
        <a href="https://www.youtube.com/user/NewOnNetflix" target="_blank" rel="noopener noreferrer">
          <img src={youtube_icon} alt="YouTube" />
        </a>
      </div>

      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center</li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>@ 1997-2025 Netflix, Inc.</p>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  padding: 30px 4%;
  max-width: 1000px;
  margin: 0 auto;
  

  .footer-icons {
    display: flex;
    gap: 20px;
    margin: 40px 0;
  }

  .footer-icons img {
    width: 30px;
    cursor: pointer;
  }

  ul {
    display: grid;
    grid-template-columns: auto auto auto auto;
    gap: 15px;
    margin-bottom: 30px;
    list-style: none;
  }

  .copyright-text {
    color: gray;
    font-size: 14px;
  }

  @media(max-width: 800px) {
    .footer-icons img {
      width: 25px;
    }
    
    ul {
      grid-template-columns: auto;
      gap: 8px;
      font-size: 14px;
    }
  }
`;