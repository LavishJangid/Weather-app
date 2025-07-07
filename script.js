const apiKey = "ee84bdb2c4c74ea7831193634250707";

function getWeather() {
  const location = document.getElementById("locationInput").value;
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        resultDiv.innerHTML = `❌ ${data.error.message}`;
      } else {
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        resultDiv.innerHTML = `🌡️ Temperature in <strong>${data.location.name}</strong>: <strong>${temp}°C</strong><br>📝 Condition: ${condition}`;
      }
    })
    .catch(error => {
      resultDiv.innerHTML = "Something went wrong. Please try again.";
      console.error(error);
    });
}
