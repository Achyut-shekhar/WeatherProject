let valueSearch=document.querySelector("#valueSearch");
let city=document.getElementsByClassName("name");
let result=document.querySelector(".result")
let temperature=document.querySelector(".temprature");
console.log(temperature)
let discription=document.querySelector(".temp")
console.log(discription)
let clouds=document.querySelector("#clouds")
let humidity=document.querySelector("#humidity")
let pressure=document.querySelector("#pressure")
let form=document.querySelector("form");
let main=document.querySelector("main")
form.addEventListener("submit",(evt)=>{
    evt.preventDefault();//to prevent refresh every time i submit the form
    if(valueSearch.value!=" "){
        searchWeather();
    }
})
let id = '4ac7f7d0d27638b77a137c5553a7053c';
let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;

const searchWeather=()=>{
    fetch(url + '&q=' +valueSearch.value) //using q as api needs it to get the city
    .then(response=>response.json())
    .then(data=>{
        console.log(data);
        if(data.cod==200){
        
        
        city[0].innerText=`${data.name}`;
        result.querySelector("img").src=`https://flagsapi.com/${data.sys.country}/shiny/64.png`;
        console.log(temperature)
        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        discription.querySelector('span').innerText = data.main.temp;
        discription.querySelector("p").innerText = data.weather[0].description;
       humidity.innerText=data.main.humidity;
       clouds.innerText=data.clouds.all;
       pressure.innerText=data.main.pressure;
        }else{
              main.classList.add("error");
              setTimeout(()=>{
                main.classList.remove("error");
              },1000);
        }
        valueSearch.value=" ";
    })
}
const app=()=>{
    valueSearch.value="london"
    searchWeather();
}
app();