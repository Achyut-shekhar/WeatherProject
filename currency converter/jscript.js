
const msg=document.querySelector(".msg h5")

const dropdown = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select " );
const tocurr=document.querySelector
(".to select " );
const apiKey = '1cbae5296f96dca532ca2f28'; // Replace with your API key
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromcurr}`;

for(let select of dropdown) {
  for (let code in countryList) {
    let newoptions = document.createElement("option");
    newoptions.innerText = code;
    newoptions.value = code;
    if(select.name==="from" &&code==="USD")
        newoptions.selected="selected"
    if(select.name==="to" &&code==="INR")
        newoptions.selected="selected"
    select.append(newoptions);
  }

  select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
  })
}
// changing the flag 
const updateflag=(element)=>{
    let currcode=element.value;
    let countryCode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countryCode}/shiny/64.png`;
   let img = element.parentElement.querySelector("img"); //image is in the parent elemnt of select
    img.src=newsrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();//it prevents all the automatic step in the form

    let amount=document.querySelector(".input input");
    let amtvalue=amount.value;
    if(amtvalue===" "||amtvalue<1)
    {
        amtvalue=1;
        amount.value="1";
    }
    const fromCurrency = fromcurr.value;
    const toCurrency = tocurr.value;
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

 
    const response = await fetch(url);
    const data = await response.json();
    const exchangeRate = data.conversion_rates[toCurrency];
    //.conversion_rate is we are using for api tocurrency call and its how we are using the api for to
    console.log(`Exchange rate from ${fromCurrency} to ${toCurrency}: ${exchangeRate}`);
    // You can update your UI with the exchange rate here
  let finalamount=exchangeRate*amtvalue;
  console.log(finalamount);
  msg.innerText=`${amtvalue} ${fromCurrency}=${finalamount} ${toCurrency}`
})
