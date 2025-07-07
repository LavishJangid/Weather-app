function getWeather() {
  let location = document.getElementById("locationInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!location) {
    resultDiv.innerHTML = "Please enter a city name.";
    return;
  }

  // Convert to Proper Case (e.g., "new york" → "New York")
  location = location
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

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
