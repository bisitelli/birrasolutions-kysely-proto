import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './App.css';

const questions1 = [
  {
    question: "Minkä ikäinen olet?",
    options: ["Alle 30 vuotias", "30-50 vuotias", "51-65 vuotias", "Yli 65 vuotias"]
  },
  {
    question: "Onko sinulla tällä hetkellä voimassa olevia henkilövakuutuksia?",
    options: ["Kyllä", "Ei", "Ei, mutta olen harkinnut sellaisen hankkimista"]
  },
  {
    question: "Kuinka monta henkilöä taloudessa on riippuvaisia tuloistasi?",
    options: ["Ei ketään", "1-2 henkilöä", "3-4 henkilöä", "Yli 4 henkilöä"]
  },
  {
    question: "Kuinka tärkeänä pidät taloudellista turvaa vakavan sairauden tai onnettomuuden varalta?",
    options: ["Erittäin tärkeänä", "Melko tärkeänä", "Ei kovin tärkeänä", "En pidä tärkeänä"]
  },
  {
    question: "Miten arvioisit nykyistä taloudellista tilannettasi?",
    options: ["Erinomainen, pystyn säästämään ja investoimaan", "Hyvä, mutta haluan parantaa taloudellista turvaani", "Kohtalainen, tasapainottelen menojen ja tulojen välillä", "Haasteellinen, taloudellinen tilanne on tiukka"]
  },
  {
    question: "Oletko valmis maksamaan enemmän vakuutusmaksua kattavammasta vakuutuksesta?",
    options: ["Kyllä, ehdottomasti", "Kyllä, jos se on kohtuullista", "En ole varma", "Tärkein olisi löytää minulle sopiva ratkaisu mikä on myös taloudellisesti viisas"]
  },
  {
    question: "Mikä on tärkein syy, miksi harkitset henkilövakuutusta?",
    options: ["Taloudellinen turva perheelle", "Henkilökohtainen turvallisuus", "Verotukselliset hyödyt", "Muu syy"]
  },
  {
    question: "Oletko ammattiliiton jäsen?",
    options: ["Kyllä", "En"]
  },
  // Lisää muita kysymyksiä...
];

const questions2 = [
  {
    question: "Minkä ikäinen olet?",
    options: ["Alle 18 vuotias", "18-29 vuotias", "30-44 vuotias", "Yli 45 vuotias"]
  },
  {
    question: "Kuinka kauan olet omistanut ajokortin?",
    options: ["Alle 1 vuosi", "1-5 vuotta", "Yli 5 vuotta"]
  },
  {
    question: "Kuinka usein ajat viikossa?",
    options: ["Harvemmin kuin kerran", "1-2 kertaa", "3-5 kertaa", "Päivittäin"]
  },
  {
    question: "Millainen auto sinulla on?",
    options: ["Bensa", "Diesel", "Sähkö", "Hybridi"]
  },
  {
    question: "Millainen on tyypillinen ajomatkasi?",
    options: ["Lyhyet matkat", "Työmatkat", "Pitkät matkat"]
  },
  {
    question: "Kuinka tärkeänä pidät autosi vakuutusta?",
    options: ["Erittäin tärkeänä", "Melko tärkeänä", "En kovin tärkeänä", "En pidä tärkeänä"]
  },
  {
    question: "Tuntuuko nykyinen vakuutus kalliilta?",
    options: ["Kyllä", "Ei", "En osaa sanoa", "En ole vielä hankkinut vakuutusta"]
  },

  // Lisää muita kysymyksiä kysely 2:lle...
];

const questions3 = [
  {
    question: "Kuinka kauan olet harrastanut moottoripyöräilyä?",
    options: ["Alle vuoden", "1-5 vuotta", "yli 5 vuotta"]
  },
  {
    question: "Kuinka monta kuukautta vuodesta ajat moottoripyörällä?",
    options: ["Alle 2 kuukautta", "2-5 kuukautta", "yli 5 kuukautta"]
  },
  {
    question: "Minkä tyyppistä moottoripyörää ajat?",
    options: ["Cruiser", "Sporttinen", "Adventure/Off-road", "Muu"]
  },
  {
    question: "Kuinka usein osallistut moottoripyöräily tapahtumiin tai -kisoihin?",
    options: ["Usein", "Satunnaisesti", "Harvoin", "En koskaan"]
  },
  {
    question: "Onko moottoripyörä ensisijainen kulkuneuvosi?",
    options: ["Kyllä", "Kyllä, mutta vain kesäisin", "Ei, käytän myös muita kulkuneuvoja", "Ei, se on enemmän harrastus"]
  },
  {
    question: "Miten tärkeänä pidät moottoripyöräsi vakuutusta?",
    options: ["Erittäin tärkeänä", "Melko tärkeänä", "En kovin tärkeänä", "En pidä tärkeänä"]
  },
  {
    question: "Tuntuuko nykyinen vakuutus kalliilta?",
    options: ["Kyllä, liian kallis", "Kohtuullinen hinta", "En ole varma", "Ei, hinta on ok"]
  },
  
];

const questions4 = [
  {
    question: "Onko sinulla tällä hetkellä harkinnassa vakuutuksen ottaminen syntymättömälle lapselle?",
    options: ["Kyllä, olen jo ottanut", "Kyllä, harkitsen vielä", "Ei, en näe tarvetta", "En osaa sanoa"]
  },
  {
    question: "Kuinka tärkeänä pidät, että lapsesi on vakuutettu jo ennen syntymää?",
    options: ["Erittäin tärkeänä", "Melko tärkeänä", "En kovin tärkeänä", "En pidä sitä tarpeellisena"]
  },
  {
    question: "Tiesitkö, että meillä If:ltä voit hankkia vauvavakuutuksen jo 11. raskausviikon jälkeen, eli ennen rakenneultraa?",
    options: ["Kyllä", "En ollut tietoinen tästä"]
  },
  {
    question: "Oletko tietoinen siitä, että vakuutus voi kattaa lapsesi hoitokustannuksia, jos hän tarvitsee erityishoitoa syntymän jälkeen?",
    options: ["Kyllä, tiedän tämän", "Ei, tämä oli uutta tietoa", "Olen kuullut siitä, mutta en ole varma yksityiskohdista"]
  },
  {
    question: "Mitkä asiat vaikuttavat eniten päätökseesi ottaa vakuutus syntymättömälle lapsellesi?",
    options: ["Taloudellinen turvallisuus", "Vauvan terveyden turvaaminen", "Vanhemman mielenrauha", "Vakuutuksen hinta"]
  },
  {
    question: "Haluatko saada lisätietoa vakuutuksen eduista asiantuntialta?",
    options: ["Kyllä", "Ehkä", "Ei tällä hetkellä"]
  },
  
];


function Survey({ questions,completionText }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowContactForm(true);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="App">
      <div className="question-container">
        {showContactForm ? (
          <div className="contact-form">
            <h2>Kiitos kyselyyn osallistumisesta!</h2>
            <h4>
              {completionText}
            </h4>
            <p>
            Jätä yhteystietosi, niin Julius ottaa sinuun yhteyttä ja auttaa sinua löytämään parhaan ratkaisun!
            </p>
            <form>
              <label>
                <input type="text" name="name" placeholder='Nimi' required />
              </label>
              <br />
              <label>
                <input type="tel" name="phone" placeholder='Puhelinnumero' required />
              </label>
              <br />
              <div className='button-div'>
                <button type="submit">Lähetä</button>
              </div>
            </form>
            <div className='powered-by-birrasolutions'>
              <p>Powered by Birra Solutions</p>
            </div>
          </div>
        ) : (
          <SwitchTransition>
            <CSSTransition
              key={currentQuestion}
              timeout={300}
              classNames="fade"
            >
              <div>
                <h2>{questions[currentQuestion].question}</h2>
                <div className="options">
                  {questions[currentQuestion].options.map((option, index) => (
                    <button key={index} onClick={() => handleAnswer(option)}>
                      {option}
                    </button>
                  ))}
                </div>
                <div className="navigation">
                  {currentQuestion > 0 && (
                    <button onClick={goBack} className="back-button">← Takaisin</button>
                  )}
                </div>
                <div className='powered-by-birrasolutions'>
                  <p>Powered by Birra Solutions</p>
                </div>
              </div>
            </CSSTransition>
          </SwitchTransition>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul className='navbar'>
            <li><Link to="/survey1">Henkilövakuutus</Link></li>
            <li><Link to="/survey2">Autovakuutus</Link></li>
            <li><Link to="/survey3">MP vakuutus</Link></li>
            <li><Link to="/survey4">Odottavat äidit</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/survey1" element={<Survey questions={questions1}
           completionText="Vastauksesi osoittavat, että voit hyötyä If:n henkilövakuutuksista." />} />
          <Route path="/survey2" element={<Survey questions={questions2}
           completionText="Tiesitkö, että If tarjoaa täyskaskoon suoraan 80 % bonuksen ilman lähtötason rajoituksia. Tämä tarkoittaa edullista kaskoa vaikka olisit nuori aloitteleva kuski tai vanha konkari ratin takana." />} />
          <Route path="/survey3" element={<Survey questions={questions3}
           completionText=" If tarjoaa ainoana vakuutusyhtiönä seisonta-ajallisen moottoripyörän vakuutuksen. Jos ajat moottoripyörää alle 5 kuukautta vuodessa, seisonta-ajallinen vakuutuksemme on huomattavasti edullisempi ratkaisu sinulle!" />} />
          <Route path="/survey4" element={<Survey questions={questions4}
           completionText="Syntymättömän lapsen vakuutus voi tarjota sinulle ja vauvallesi arvokasta turvaa sekä mielenrauhaa. Älä jää epätietoisuuteen – ota askel kohti turvallisempaa tulevaisuutta!" />} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
