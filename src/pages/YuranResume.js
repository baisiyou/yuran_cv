import "./YuranResume.css";

import * as datefns from 'date-fns';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
const YuranResume = () => {
  const [quoteData, setQuoteData] = useState({});
  const [tempInCelsius, setTempInCelsius] = useState(null);
  const [formattedAddress, setFormattedAddress] = useState('');
  const [geoData, setGeoData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState(null);
  /* const[quoteData,setQuoteData]=useState({});
  const[tempInCelius,setTemInCelius]=useState(null); */
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quotes from the API
        const quotesResponse = await axios.get('https://dummyjson.com/quotes');
        // Assuming the first quote in the response
        const fetchedQuoteData = quotesResponse.data.quotes[0];
        setQuoteData(fetchedQuoteData);

        // Fetch temperature from OpenWeatherMap API
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Brossard&appid=1691c37009f5ba8b8a957b31b9655570`
        );

        const tempInKelvin = weatherResponse.data.main.temp;
        const calculatedTempInCelsius = Math.round(tempInKelvin - 273.15);
        setTempInCelsius(calculatedTempInCelsius);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchFormattedAddress = async () => {
      const options = {
        method: 'GET',
        url: 'https://google-maps-geocoding.p.rapidapi.com/geocode/json',
        params: {
          latlng: '40.714224,-73.96145',
          language: 'en',
        },
        headers: {
          'X-RapidAPI-Key': '372e4bf1dfmshb6594fcde380071p16d4f8jsn1c51b5429090',
          'X-RapidAPI-Host': 'google-maps-geocoding.p.rapidapi.com',
        },
      };

      let fetchedFormattedAddress = '';

      try {
        const response = await axios.request(options);

        if (response.data.results && response.data.results.length > 0) {
          fetchedFormattedAddress = response.data.results[0].formatted_address;
          setFormattedAddress(fetchedFormattedAddress);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWeatherAndAddress = async () => {
      let address = null;
      const apiKey = '4c5de634bf34e3';
      if (process.env.REACT_APP_X_REAL_IP === undefined) {
        address = `https://ipinfo.io/json?token=${apiKey}`;
      } else {
        address = `https://ipinfo.io/${process.env.REACT_APP_X_REAL_IP}/json?token=${apiKey}`;
      }

      try {
        const geoResponse = await fetch(address);
        const geoData = await geoResponse.json();
        setGeoData(geoData);
        const weatherApiKey = '1691c37009f5ba8b8a957b31b9655570';
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${geoData.city},${geoData.country}&appid=${weatherApiKey}`
        );
        const weatherData = await weatherResponse.json();
        setWeatherData(weatherData);

        const timezone = weatherData.timezone * 1000;
        const offset = new Date().getTimezoneOffset() * 60 * 1000;
        const localTime = new Date().getTime();
        const utc = localTime + offset;
        const targetDate = new Date(utc + timezone);
        setDateTime(datefns.format(targetDate, 'd MMM   HH:mm aaa'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchFormattedAddress();
    fetchWeatherAndAddress();
  }, []);
  
    if (!dateTime || !geoData || !weatherData) {
      // Loading state or error handling
      return <div>Loading...</div>;
    }
  
    const weatherDataToSend = {
      title: 'Weather',
      dateTime: dateTime,
      city: geoData.city,
      country: geoData.country,
      icon: weatherData.weather[0].icon,
      description: weatherData.weather[0].description,
      main: weatherData.weather[0].main,
      temp: Math.round(weatherData.main.temp - 273.15),
      feels_like: Math.round(weatherData.main.feels_like - 273.15),
      humidity: `${weatherData.main.humidity}%`,
      wind: weatherData.wind.speed,
      visibility: weatherData.visibility,
      pressure: weatherData.main.pressure,
    };
  return (
    <div className="yuran-resume">
      <div className="rectangle" />
      <div className="rectangle1" />
      <div className="rectangle2" />
      <div className="rectangle3" />
      <div className="rectangle4" />
      <div className="rectangle5" />
      <div className="rectangle6" />
      <div className="rectangle7" />
      <div className="rectangle8" />
      <div className="rectangle9" />
      <div className="image" />
      <div className="rectangle10" />
      <div className="rectangle11" />
      <img className="frame-icon" alt="" src="/frame.svg" />
      <div className="rectangle12" />
      <div className="rectangle13" />
      <div className="image1" />
      <div className="rectangle14" />
      <div className="rectangle15" />
      <img className="frame-icon1" alt="" src="/frame.svg" />
      <div className="rectangle16" />
      <div className="rectangle17" />
      <div className="image2" />
      <div className="rectangle18" />
      <div className="rectangle19" />
      <img className="frame-icon2" alt="" src="/frame.svg" />
      <div className="rectangle20" />
      <div className="rectangle21" />
      <div className="image3" />
      <div className="rectangle22" />
      <div className="rectangle23" />
      <img className="frame-icon3" alt="" src="/frame.svg" />
      <div className="rectangle24" />
      <div className="rectangle25" />
      <div className="image4" />
      <div className="rectangle26" />
      <div className="rectangle27" />
      <img className="frame-icon4" alt="" src="/frame.svg" />
      <div className="rectangle28" />
      <div className="rectangle29" />
      <div className="image5" />
      <div className="rectangle30" />
      <div className="rectangle31" />
      <img className="frame-icon5" alt="" src="/frame.svg" />
      <div className="rectangle32" />
      <div className="rectangle33" />
      <img className="frame-icon6" alt="" src="/frame1.svg" />
      <div className="rectangle34" />
      <div className="rectangle35" />
      <div className="rectangle36" />
      <div className="rectangle37" />
      <div className="rectangle38" />
      <div className="full-stack">Full Stack</div>
      <div className="say-hello">Say Hello</div>
      <div className="computer-scientist">{`Computer Scientist & Software Developer `}</div>
      <div className="i-design-and">
        I design and code beautiful websites in the shortest time.
      </div>
      <div className="heya-welcome-to">Heya! Welcome to my webpage!</div>
      <div className="full-stack-developer">Full-Stack Developer</div>
      <div className="i-spans-front-end">
        I spans front-end and back-end development, and often work with
        databases, APIs, and deployment processes.
      </div>
      <div className="experiences-i-draw">Experiences I draw from:</div>
      <div className="java-python-c">Java, Python, C#, C++</div>
      <div className="design-tools">Design Tools:</div>
      <div className="htmlcss-javasript">HTML/CSS Javasript</div>
      <div className="figma">Figma</div>
      <div className="reactjs">React.js</div>
      <div className="est-javascript-junit">
        est (JavaScript), JUnit (Java), pytest (Python)
      </div>
      <div className="mysql-postgresql-mongodb">MySQL, PostgreSQL, MongoDB</div>
      <div className="aws-azure-google">AWS, Azure, Google Cloud</div>
      <div className="frontend-developer">Frontend Developer</div>
      <div className="designing-and-implementing">
        designing and implementing the user interface (UI) and user experience
        (UX)
      </div>
      <div className="backend-developer">Backend Developer</div>
      <div className="server-side-programming-langua">
        server-side programming languages such as Python, Java, Ruby, PHP, or
        Node.js to implement the business logic of an application
      </div>
      <div className="experiences-i-draw1">Experiences I draw from:</div>
      <div className="java-python-nodejs">Java, Python, Node.js, PHP, C#</div>
      <div className="django-python">Django (Python)</div>
      <div className="express-nodejs">Express (Node.js))</div>
      <div className="mysql-postgresqlmongodb">MySQL, PostgreSQL,MongoDB,</div>
      <div className="restful-api">RESTful API</div>
      <div className="junit-java-pytest">JUnit (Java), pytest (Python)</div>
      <div className="my-recent-work">My Recent Work</div>
      <div className="here-are-a">
        Here are a few past design projects I've worked on. Want to see more?
      </div>
      <div className="email-me">Email me</div>
      <div className="div">.</div>
      <div className="implement-a-dynamic">
      <p><h3>{quoteData.quote}</h3>
        <h3>Author: {quoteData.author}</h3></p>
      </div>
      <div className="visit-website"></div>
      <div className="build-a-scalable">
      <p>Temperature in Celsius: {tempInCelsius}</p>
      <p>City: Brossard</p>
      </div>
      <div className="visit-website1">Weather</div>
      <div className="enhance-the-user">
      <p>Formatted Address: {formattedAddress}</p>
      </div>
      <div className="visit-website2">Address</div>
      <div className="establish-a-seamless">
      <h1>{weatherDataToSend.city}</h1>
      <p>{weatherDataToSend.description}</p>
      </div>
      <div className="visit-website3">City</div>
      <div className="implement-a-responsive">
        {" "}
        Implement a responsive design for the user interface of a new e-commerce
        website.
      </div>
      <div className="visit-website4">Visit Website</div>
      <div className="develop-a-robust">
        Develop a robust authentication system for a social media platform.
      </div>
      <div className="view-website">View Website</div>
      <div className="see-more">{`See more `}</div>
      <div className="this-is-where">
        This is where I’ll implement my chatbot
      </div>
      <div className="start-a-conversation">Start a conversation</div>
      <div className="coding-and-coding">
        Coding and coding again, I am passionate about programming.
      </div>
      <div className="handcrafted-by-me">Handcrafted by me</div>
      <div className="yuran-zhang">Yuran Zhang</div>
      <img className="image-1-icon" alt="" src="/image-1@2x.png" />
      <div className="currently-in-my">
        Currently in my third year of a Computer Science degree, I have
        developed a strong foundation in AI and Machine Learning, and I am
        deeply passionate about new technologies in this field. I have hands-on
        experience in web development and have proficiency in over five
        programming languages. My enthusiasm for algorithms is demonstrated
        through my involvement in competitive programming, where I have honed my
        problem-solving skills. I am an objective-driven individual who learns
        quickly, communicates effectively within a team, and is always eager to
        explore and master new technologies in AI.
      </div>
      <div className="html-css-javascript">{`HTML, CSS, javascript, CSS, `}</div>
      <div className="experiences-i-draw2">Experiences I draw from:</div>
      <div className="dev-tools">Dev Tools:</div>
      <div className="react">React</div>
      <div className="vue">Vue</div>
      <div className="webpack">Webpack</div>
      <div className="vite">Vite</div>
      <div className="dev-tools1">Dev Tools:</div>
      <img className="image-3-icon" alt="" src="/image-3@2x.png" />
      <img className="image-4-icon" alt="" src="/image-4@2x.png" />
      <img className="image-6-icon" alt="" src="/image-6@2x.png" />
      <img className="image-6-icon1" alt="" src="/image-61@2x.png" />
      <img className="image-7-icon" alt="" src="/image-7@2x.png" />
      <img className="image-8-icon" alt="" src="/image-8@2x.png" />
    </div>
  );
};

export default YuranResume;
