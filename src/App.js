
import axios from "axios";
import { useEffect, useState } from "react";
import "./Styles/App.css"



function App() {


  const [isInput, setIsInput] = useState(false)
  const [query, setQuery] = useState(false)
  const [data, setData] = useState(false)
  const [unit, setUnit] = useState("C")
  const [speed, setSpeed] = useState("kph")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition)
    getInfo()
  }, [])


  function showPosition(position) {
    setQuery(`${position.coords.latitude},${position.coords.longitude}`)
  }

  async function getInfo() {
    const res = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${query}`)
    setQuery("")
    // console.log(res.data)
    setData(res.data)
  }




  return (


    <div className="container">

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <button onClick={() => { setIsInput(false) }} className={isInput ? "show" : "hide"}>❮</button>

        <input value={query}
          placeholder="Enter City Name"
          onChange={(e) => { setQuery(e.target.value) }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && query != "") {
              getInfo()
              setQuery("")
              setIsInput(!isInput)
            }
          }}

          className={isInput ? "show" : "hide"} type="text" />

      </div>



      <div className={isInput ? "top shrink" : "grow top"}>

        <div onClick={() => { setIsInput(!isInput) }}>
          {`${data?.location?.name}, ${data?.location?.country}`}
        </div>
        <div>
          {data?.location?.localtime.split(" ")[1]} &nbsp;
          {data?.current?.is_day === 1 ? "Day" : "Night"}
        </div>
      </div>


      <div className={isInput ? "image shrink" : "grow image"}>

        {data?.current?.is_day === 1 ?

          <img
            src={data?.current?.condition?.text == "Clear" ?
              "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/clear-day.svg" :
              data?.current?.condition?.text == "Overcast" ?
                "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/overcast-day.svg" :
                data?.current?.condition?.text == "Mist" ?
                  "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/mist.svg" :
                  data?.current?.condition?.text == "Thunder" ?
                    "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/thunderstorms.svg" :
                    data?.current?.condition?.text == "Sunny" ?
                      "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/sun-hot.svg" :
                      data?.current?.condition?.text.split(" ")[1] == "snow" ?
                        "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-snow.svg" :
                        data?.current?.condition?.text.split(" ")[1] == "cloudy" ?
                          "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme.svg" :
                          data?.current?.condition?.text.split(" ")[1] == "fog" ?
                            "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/overcast-day-fog.svg" : ""
            }
          />

          :

          <img src={data?.current?.condition?.text == "Clear" ?
            "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/clear-night.svg" :
            data?.current?.condition?.text == "Overcast" ?
              "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/overcast-night.svg" :
              data?.current?.condition?.text == "Mist" ?
                "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/mist.svg" :
                data?.current?.condition?.text == "Thunder" ?
                  "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/thunderstorms.svg" :
                  data?.current?.condition?.text == "Sunny" ?
                    "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/sun-hot.svg" :
                    data?.current?.condition?.text.split(" ")[1] == "snow" ?
                      "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme-snow.svg" :
                      data?.current?.condition?.text.split(" ")[1] == "cloudy" ?
                        "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/extreme.svg" :
                        data?.current?.condition?.text.split(" ")[1] == "fog" ?
                          "https://bmcdn.nl/assets/weather-icons/v3.0/line/svg/overcast-night-fog.svg" : ""
          } />

        }
        <span>{data?.current?.condition?.text}</span> <br />
      </div>


      <div className={isInput ? "stats shrink" : "grow stats"}>
        <div>
          <div onClick={() => {
            if (speed === "kph") {
              setSpeed("mph")
            } else setSpeed("kph")
          }}>Wind : {speed === "kph" ? data?.current?.wind_kph + " KPH" : data?.current?.wind_mph + " MPH"}</div>
          <div>Humidity : {data?.current?.humidity} %</div>
          <div>Precip : {data?.current?.precip_mm}</div>
        </div>
        <div onClick={() => {
          if (unit == "C") {
            setUnit("F")
          } else setUnit("C")
        }

        } className={isInput ? "temperature shrink" : "grow temperature"}>
          {unit === "C" ? data?.current?.feelslike_c + "°C" : data?.current?.feelslike_f + "°F"}
        </div>
      </div>

    </div>

  );
}

export default App;
