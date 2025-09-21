import React, { useState } from 'react';
import styled from 'styled-components';

//trending
import wednesday from '../assets/trending/wednesday.jpg';
import squidgame from "../assets/trending/squid_game.jpg";
import fallforme from "../assets/trending/fall_for_me.webp";
import dexter from "../assets/trending/dexter.jpg";
import beautyinblack from "../assets/trending/beauty_in_black.jpg";
import thekiller from "../assets/trending/the-killer.jpg";
import breakingbad from "../assets/trending/breaking_bad.webp";
import abandonedman from "../assets/trending/abandoned_man.jpg";
import moneyheist from "../assets/trending/money_heist.jpg";
import thedayofthejackal from "../assets/trending/the_day_of_the_jackal.jpg";

//more
import wednesdayMore from '../assets/more/wednesday_more.jpg';
import squidgameMore from "../assets/more/squid_game.jpg";
import fallformeMore from "../assets/more/fall_for_me.jpg";
import dexterMore from "../assets/more/dexter.jpg";
import beautyinblackMore from "../assets/more/beauty_in_the_black.jpg";
import thekillerMore from "../assets/more/the_killer.jpg";
import breakingbadMore from "../assets/more/breaking_bad.jpg";
import abandonedmanMore from "../assets/more/abandoned_man.jpg";
import moneyheistMore from "../assets/more/money_heist.jpg";
import thedayofthejackalMore from "../assets/more/the_day_of_the_jackal.jpg";

const SeriesModal = ({ series, isOpen, onClose }) => {
  if (!isOpen || !series) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        
        <ModalImage src={series.moreImage} alt={series.title} />
        
        <ModalContent>
          <SeriesTitle>{series.title}</SeriesTitle>
          
          <SeriesInfo>
            <InfoItem>{series.year}</InfoItem>
            <InfoItem>{series.rating}</InfoItem>
            <InfoItem>{series.type}</InfoItem>
            <InfoItem>{series.genre}</InfoItem>
          </SeriesInfo>
          
          <SeriesDescription>{series.description}</SeriesDescription>
          
          <ActionButtons>
            <GetStartedButton>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"></polygon>
              </svg>
              Get Started
            </GetStartedButton>
          </ActionButtons>
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};

const TrendingSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedSeries, setSelectedSeries] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const trendingItems = [
    {
      id: 1,
      title: "Wednesday",
      image: wednesday,
      moreImage: wednesdayMore,
      rank: 1,
      year: "2024",
      rating: "16+",
      type: "Show",
      genre: "Comedies • Fantasy • Mysteries",
      description: "Smart, sarcastic and a little dead inside, Wednesday Addams investigates twisted mysteries while making new friends — and foes — at Nevermore Academy."
    },
    {
      id: 2,
      title: "Squid Game",
      image: squidgame,
      moreImage: squidgameMore,
      rank: 2,
      year: "2021",
      rating: "18+",
      type: "Show",
      genre: "Thriller • Drama • Korean",
      description: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits with deadly high stakes."
    },
    {
      id: 3,
      title: "Fall for Me",
      image: fallforme,
      moreImage : fallformeMore,
      rank: 3,
      year: "2023",
      rating: "13+",
      type: "Show",
      genre: "Romance • Drama",
      description: "A romantic drama that explores the complexities of love, ambition, and sacrifice in modern relationships."
    },
    {
      id: 4,
      title: "Dexter",
      image: dexter,
      moreImage: dexterMore,
      rank: 4,
      year: "2006",
      rating: "18+",
      type: "Show",
      genre: "Crime • Thriller • Drama",
      description: "He's a forensic analyst by day, serial killer by night. Dexter Morgan targets criminals who have escaped justice."
    },
    {
      id: 5,
      title: "Beauty in Black",
      image: beautyinblack,
      moreImage: beautyinblackMore,
      rank: 5,
      year: "2024",
      rating: "16+",
      type: "Show",
      genre: "Drama • Romance",
      description: "A compelling drama that delves into themes of identity, beauty standards, and personal transformation."
    },
    {
      id: 6,
      title: "The Killer",
      image: thekiller,
      moreImage: thekillerMore,
      rank: 6,
      year: "2023",
      rating: "18+",
      type: "Movie",
      genre: "Action • Thriller • Crime",
      description: "A methodical assassin faces unexpected challenges when a job goes wrong, forcing him to question everything."
    },
    {
      id: 7,
      title: "Breaking Bad",
      image: breakingbad,
      moreImage: breakingbadMore,
      rank: 7,
      year: "2008",
      rating: "18+",
      type: "Show",
      genre: "Crime • Drama • Thriller",
      description: "A high school chemistry teacher turned methamphetamine producer partners with a former student to secure his family's future."
    },
    {
      id: 8,
      title: "Abandoned Man",
      image: abandonedman,
      moreImage: abandonedmanMore,
      rank: 8,
      year: "2024",
      rating: "16+",
      type: "Show",
      genre: "Drama • Mystery",
      description: "A gripping tale of survival and redemption following a man's journey through isolation and self-discovery."
    },
    {
      id: 9,
      title: "Money Heist",
      image: moneyheist,
      moreImage: moneyheistMore,
      rank: 9,
      year: "2017",
      rating: "16+",
      type: "Show",
      genre: "Crime • Drama • Thriller • Spanish",
      description: "A criminal mastermind manipulates hostages and police during a heist at the Royal Mint of Spain."
    },
    {
      id: 10,
      title: "The Day of the Jackal",
      image: thedayofthejackal,
      moreImage: thedayofthejackalMore,
      rank: 10,
      year: "2024",
      rating: "16+",
      type: "Show",
      genre: "Thriller • Action • Political",
      description: "An elusive assassin known as the Jackal is pursued across Europe in this thrilling cat-and-mouse game."
    },
  ];

  const reasons = [
    {
      icon: "🖥️",
      title: "Enjoy on your TV",
      description: "Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
      bgColor: "linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)"
    },
    {
      icon: "⬇️",
      title: "Download your shows to watch offline",
      description: "Save your favorites easily and always have something to watch.",
      bgColor: "linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)"
    },
    {
      icon: "🚀",
      title: "Watch everywhere",
      description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
      bgColor: "linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "Create profiles for kids",
      description: "Send kids on adventures with their favorite characters in a space made just for them — free with your membership.",
      bgColor: "linear-gradient(135deg, #EF4444 0%, #8B5CF6 100%)"
    }
  ];

    const faqData = [
    {
      id: 1,
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
    },
    {
      id: 2,
      question: "How much does Netflix cost?",
      answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $6.99 to $22.99 a month. No extra costs, no contracts."
    },
    {
      id: 3,
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles."
    },
    {
      id: 4,
      question: "How do I cancel?",
      answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
    },
    {
      id: 5,
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want."
    },
    {
      id: 6,
      question: "Is Netflix good for kids?",
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and movies in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don't want kids to see."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(trendingItems.length / 5));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(trendingItems.length / 5)) % Math.ceil(trendingItems.length / 5));
  };

  const getVisibleItems = () => {
    const startIndex = currentSlide * 5;
    return trendingItems.slice(startIndex, startIndex + 5);
  };

  const handleSeriesClick = (series) => {
    setSelectedSeries(series);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSeries(null);
  };

  const toggleFaq = (faqId) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  return (
    <>
      <TrendingContainer>
        <div className="trending-section">
          <h2 className="trending-title">Trending Now</h2>
          
          <div className="carousel-container">
            <button onClick={prevSlide} className="nav-arrow nav-arrow-left">
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>
            
            <button onClick={nextSlide} className="nav-arrow nav-arrow-right">
              <svg className="arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>

            <div className="trending-grid">
              {getVisibleItems().map((item, index) => (
                <div 
                  key={item.id} 
                  className="trending-item"
                  onClick={() => handleSeriesClick(item)}
                >
                  <div className="rank-number">
                    {item.rank}
                  </div>

                  <div className="poster-container">
                    <img src={item.image} alt={item.title} className="poster-image" />
                    
                    <div className="netflix-logo">N</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="slide-indicators">
              {Array.from({ length: Math.ceil(trendingItems.length / 5) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`indicator ${currentSlide === index ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="reasons-section">
          <h2 className="reasons-title">More Reasons to Join</h2>
          
          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div key={index} className="reason-card">
                <div className="reason-icon">
                  <div className="icon-circle" style={{ background: reason.bgColor }}>
                    <span className="icon-emoji">{reason.icon}</span>
                  </div>
                </div>
                <h3 className="reason-title">{reason.title}</h3>
                <p className="reason-description">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          
          <div className="faq-container">
            {faqData.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button 
                  className={`faq-question ${openFaq === faq.id ? 'active' : ''}`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {openFaq === faq.id ? '×' : '+'}
                  </span>
                </button>
                <div className={`faq-answer ${openFaq === faq.id ? 'open' : ''}`}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TrendingContainer>

      <SeriesModal 
        series={selectedSeries}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default TrendingSection;

const TrendingContainer = styled.div`
  background-color: black;
  color: white;
  padding: 5rem 0;

  /* Trending Now Section */
  .trending-section {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    margin-bottom: 5rem;
  }

  .trending-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 3rem;
    text-align: center;
  }

  .carousel-container {
    position: relative;
  }

  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    padding: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    color: white;

    &:hover {
      background: rgba(0, 0, 0, 0.75);
      transform: translateY(-50%) scale(1.1);
    }

    .arrow-icon {
      width: 1.5rem;
      height: 1.5rem;
    }

    &.nav-arrow-left {
      left: 0;
    }

    &.nav-arrow-right {
      right: 0;
    }
  }

  .trending-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
    padding: 0 3rem;

    @media (max-width: 1400px) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      padding: 0 1rem;
    }
  }

  .trending-item {
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
  }

  .rank-number {
    position: absolute;
    left: -1rem;
    bottom: 0;
    z-index: 20;
    font-size: 5rem;
    font-weight: 900;
    color: white;
    text-shadow: 3px 3px 0 #000;
    -webkit-text-stroke: 3px #000;

    @media (max-width: 600px) {
      font-size: 3rem;
      -webkit-text-stroke: 2px #000;
    }
  }

  .poster-container {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem;
    aspect-ratio: 2/3;
    background-color: #111;
  }

  .poster-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: all 0.3s ease;
  }

  .netflix-logo {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: #e50914;
    color: white;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 0.25rem;
  }

  .trending-item:hover .poster-image {
    filter: brightness(0.75);
  }

  .play-button {
    background: white;
    color: black;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #f0f0f0;
    }
  }

  .slide-indicators {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    gap: 0.5rem;
  }

  .indicator {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    border: none;
    background: #666;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: #999;
    }

    &.active {
      background: #e50914;
    }
  }

  /* More Reasons to Join Section */
  .reasons-section {
    max-width: 1400px;
    margin: 0 auto 8rem auto;
    padding: 0 2rem;
  }

  .reasons-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 4rem;
    text-align: center;
  }

  .reasons-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;

    @media (max-width: 1200px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .reason-card {
    background: rgba(45, 45, 55, 0.6);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 3rem 2rem;
    border-radius: 1.5rem;
    text-align: left;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
      opacity: 0;
      transition: opacity 0.4s ease;
      border-radius: 1.5rem;
    }

    &:hover {
      transform: translateY(-10px);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.4);
    }

    &:hover::before {
      opacity: 1;
    }
  }

  .reason-icon {
    margin-bottom: 2rem;
    display: flex;
    justify-content: flex-start;
  }

  .icon-circle {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 20px;
      padding: 2px;
      background: linear-gradient(45deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: subtract;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: subtract;
    }
  }

  .icon-emoji {
    font-size: 2.5rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  }

  .reason-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
    line-height: 1.3;
  }

  .reason-description {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    font-size: 1rem;
    margin: 0;
  }

  .reason-divider {
    display: none;
  }

    /* FAQ Section */
  .faq-section {
    max-width: 1000px;
    margin: 0 auto 0.1rem auto;
    padding: 0 2rem;
  }

  .faq-title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 3rem;
    text-align: center;
  }

  .faq-container {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .faq-item {
    border-bottom: 1px solid #333;
  }

  .faq-question {
    width: 100%;
    background: #2d2d2d;
    color: white;
    border: none;
    padding: 1.5rem 2rem;
    font-size: 1.25rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color 0.3s ease;
    margin-bottom: 1px;

    &:hover {
      background: #404040;
    }

    &.active {
      background: #404040;
    }

    span:first-child {
      flex: 1;
      text-align: left;
    }

    .faq-icon {
      font-size: 2rem;
      font-weight: 300;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }

    &.active .faq-icon {
      transform: rotate(45deg);
    }
  }

  .faq-answer {
    max-height: 0;
    overflow: hidden;
    background: #2d2d2d;
    transition: max-height 0.4s ease, padding 0.4s ease;

    &.open {
      max-height: 500px;
      padding: 0 2rem 2rem 2rem;
    }

    p {
      font-size: 1.125rem;
      line-height: 1.6;
      color: white;
      margin: 0;
      padding-top: 1rem;
    }
  }

  @media (max-width: 768px) {
    .faq-title {
      font-size: 2rem;
    }
    
    .faq-question {
      font-size: 1.1rem;
      padding: 1.25rem 1.5rem;
    }
    
    .faq-answer.open {
      padding: 0 1.5rem 1.5rem 1.5rem;
    }
    
    .faq-answer p {
      font-size: 1rem;
    }
  }

`;

// ==================== STYLES MODAL ====================
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  padding: 2rem;
`;

const ModalContainer = styled.div`
  position: relative;
  background: #181818;
  border-radius: 0.75rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin: 1rem;
    max-height: 75vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(42, 42, 42, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10001;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(42, 42, 42, 1);
    transform: scale(1.1);
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 35%;
  object-fit: cover;
  object-position: center;
  border-radius: 0.75rem 0.75rem 0 0;
  flex-shrink: 0;
`;

const ModalContent = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const SeriesTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const SeriesInfo = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const InfoItem = styled.span`
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
`;

const SeriesDescription = styled.p`
  font-size: 0.9rem;
  line-height: 1.4;
  color: #ccc;
  margin-bottom: 1rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const GetStartedButton = styled.button`
  background: #e50914;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #cc0812;
    transform: scale(1.05);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;