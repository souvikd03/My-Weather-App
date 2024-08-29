const api_key = "c42c7363772c7b09fc4d395b6671a5f2";

async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('City not found');
    }
}

function updateWeather(city) {
    const existingCities = document.querySelectorAll('#city');
    for (let i = 0; i < existingCities.length; i++) {
        if (existingCities[i].textContent.toLowerCase() === city.toLowerCase()) {
            alert("City already exists!");
            return;
        }
    }

    fetchWeather(city)
        .then(data => {
            const cardHtml = buildCard(data);
            const cardsContainer = document.getElementById("cards");
            const directionMessage = document.getElementById("show");
            if (directionMessage) {
                directionMessage.style.display = "none";
            }
            cardsContainer.insertAdjacentHTML("beforeend", cardHtml);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("City not found. Please enter a valid city name.");
        });
}

function buildCard(data) {
    return `
        <section id="card" class="bubble-animation">
            <svg xmlns="http://www.w3.org/2000/svg" id="mySvg" width="343" height="175" viewBox="0 0 343 175" fill="none">
                <path d="M0.42749 66.4396C0.42749 31.6455 0.42749 14.2484 11.7535 5.24044C23.0794 -3.76754 40.0301 0.147978 73.9315 7.97901L308.33 62.1238C324.686 65.9018 332.864 67.7909 337.646 73.8031C342.427 79.8154 342.427 88.2086 342.427 104.995V131C342.427 151.742 342.427 162.113 335.984 168.556C329.54 175 319.169 175 298.427 175H44.4275C23.6857 175 13.3148 175 6.87114 168.556C0.42749 162.113 0.42749 151.742 0.42749 131V66.4396Z" fill="url(#paint0_linear_1439_26)"/>
                <defs>
                    <linearGradient id="paint0_linear_1439_26" x1="0.42749" y1="128" x2="354.57" y2="128" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#5936B4"/>
                        <stop offset="1" stop-color="#362A84"/>
                    </linearGradient>
                </defs>
            </svg>
            <div id="card-details">
                <div id="temp">
                    <h1>${data.main.temp}°C</h1>
                    <div id="misc">
                        <h6 id="highLow">H:${data.main.temp_max}°C L:${data.main.temp_min}°C</h6>
                        <h4 id="city">${data.name}</h4>
                    </div>
                </div>
                <div id="myimg">
                    <img src="./assets/${data.weather[0].main}.png" alt="${data.weather[0].description}" />
                    <h4 id="type">${data.weather[0].main}</h4>
                </div>
            </div>
        </section>
        <style>
            @keyframes bubble {
                0% {
                    transform: scale(0);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
            .bubble-animation {
                animation: bubble 0.5s ease forwards;
            }
        </style>
    `;
}

document.getElementById("search-box").addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.getElementById("location").value;
    if (city.trim() !== "") {
        updateWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});
