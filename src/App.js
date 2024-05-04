import './App.css';
import { useEffect, useState } from 'react'
import Lottie from 'react-lottie'
import { speed, wrongInputAnimation, cloudsAnimation, brokenCloudsAnimation, loadingAnimation, thunderStormAnimation, mistAnimation, snowAnimation, fewCloudsAnimation, clearSkyAnimation, rainAnimation, humid, humidity, clearSky, heavyRain, clouds, fewclouds, mist, scatteredClouds, showerRain, snowFlake, thunderStorm } from './imagePath';



function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherDetails, setWeatherDetails] = useState();
  const [loading, setLoading] = useState(true)
  const [icon, setIcon] = useState()
  const [animation, setAnimation] = useState(cloudsAnimation)
  const [wrongInput, setWrongInput] = useState(false)

  const handleInput = (event) => {
    setSearchTerm((event.target.value));
  };

  useEffect(() => {
    setAnimationAndIcon();
  }, [weatherDetails])

  const setAnimationAndIcon = () => {
    switch (weatherDetails?.weather?.[0].description) {
      case 'clear sky':
        setAnimation(clearSkyAnimation)
        setIcon(clearSky)
        break
      case 'few clouds':
        setAnimation(cloudsAnimation)
        setIcon(fewclouds)
        break
      case 'scattered clouds':
        setAnimation(cloudsAnimation)
        setIcon(scatteredClouds)
        break
      case 'broken clouds':
        setAnimation(brokenCloudsAnimation)
        setIcon(clouds)
        break
      case 'shower rain':
        setAnimation(rainAnimation)
        setIcon(showerRain)
        break
      case 'rain':
        setAnimation(rainAnimation)
        setIcon(heavyRain)
        break
      case 'thunderstorm':
        setAnimation(thunderStormAnimation)
        setIcon(thunderStorm)
        break
      case 'snow':
        setAnimation(snowAnimation)
        setIcon(snowFlake)
        break
      case 'mist':
      case 'haze':
        setAnimation(mistAnimation)
        setIcon(mist)
        break
      default:
        setAnimation('')
        setIcon(mist)
        break
    }
  }

  function getCurrentLocationDetails() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  const error = () => {
    console.log('error')
  }

  const success = async (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const api_data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${'2ce2f18c1d7991720b517e1178b62adc'}`).then(res => res.json())
    if (api_data.cod == '200') {
      setLoading(false)
      setWrongInput(false)
      setSearchTerm(api_data.name)
      setWeatherDetails(api_data)
    } else {
      console.log("wrong input")
    }
  }

  useEffect(() => {
    getCurrentLocationDetails();
  }, [])

  const handleSubmit = async () => {
    let cityName = searchTerm.trim();
    const api_data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'2ce2f18c1d7991720b517e1178b62adc'}`).then(res => res.json())
    if (api_data.cod == '200') {
      setLoading(false)
      setWrongInput(false)
      setWeatherDetails(api_data)
    } else {
      setWeatherDetails({})
      setWrongInput(true)
      console.log("wrong input")
    }
  }

  const renderImage = () => {
    return (
      <img src={icon} alt="weather" class="w-24"></img>
    )
  }

  const renderWrongInput = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: wrongInputAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div className='flex justify-center'>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    )

  }

  const renderLoading = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: loadingAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <div className='flex justify-center'>
        <Lottie
          options={defaultOptions}
          height={400}
          width={400}
        />
      </div>
    )
  }

  return (
    <>
      <div className='relative'>

        <div className='absolute inset-0 z-0'>
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animation,
              rendererSettings: {
                preserveAspectRatio: "xMidYMid slice"
              }
            }}
            height='100%'
            width='100%'
          />
        </div>
        <div className='relative z-10'>

          <div class='container'>
            <div class="flex justify-center m-4">

              <form className='w-80 m-4'>
                <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-black-500 dark:text-black-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    name="search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    onChange={handleInput}
                    value={searchTerm}
                    required
                  />
                  <button
                    type="button"
                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {loading ? renderLoading()
              :
              (wrongInput ? renderWrongInput() :
                <div class="flex justify-center m-4 ">
                  <div class="w-full max-w-md bg-white text-gray-800 rounded-lg shadow-xl p-4">
                    <div class="flex justify-between">
                      <h6 class="flex-grow">{weatherDetails?.name}</h6>
                      <h6>15:07</h6>
                    </div>
                    <div class="flex flex-col items-center mt-5 mb-4">
                      <h6 class="text-4xl font-bold mb-0">{Math.ceil(weatherDetails?.main.temp - 274)}°C</h6>
                      <span class="text-sm text-gray-600">{weatherDetails?.weather[0].description}</span>
                    </div>
                    <div class="flex items-center">
                      <div class="flex-grow text-sm" style={{ gap: 4 }}>
                        <div class="flex items-center p-1">
                          <img class="h-5 w-5 text-gray-600" src={speed} alt='speed'></img>
                          <span class="ml-1">{weatherDetails?.wind?.speed}</span>
                        </div>
                        <div class="flex items-center p-1">
                          <img class="h-5 w-5 text-gray-600" src={humidity} alt='humidity'></img>
                          <span class="ml-1">{weatherDetails?.main.humidity} </span>
                        </div>
                        <div class="flex items-center p-1">
                          <img class="h-5 w-5 text-gray-600" src={humid} alt='humid'></img>
                          <span class="ml-1"> 0.2h </span>
                        </div>
                      </div>
                      <div>
                        {renderImage()}
                      </div>
                    </div>
                  </div>
                </div>)}
          </div>
        </div>
      </div>
    </>


  );
}

export default App;
