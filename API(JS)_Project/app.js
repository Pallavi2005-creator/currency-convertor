const BASE_URL = "https://api.currencyapi.com/v3/latest";
 
 const dropdowns = document.querySelectorAll(".dropdown select");
 const btn = document.querySelector("form button");
 const fromCurr = document.querySelector(".from select");
 const toCurr = document.querySelector(".to select");
 const msg = document.querySelector(".msg");
 
 for (let select of dropdowns) {
   for (currCode in countryList) {
     let newOption = document.createElement("option");
     newOption.innerText = currCode;
     newOption.value = currCode;
     if (select.name === "from" && currCode === "USD") {
       newOption.selected = "selected";
     } else if (select.name === "to" && currCode === "INR") {
       newOption.selected = "selected";
     }
     select.append(newOption);
   }
 
   select.addEventListener("change", (evt) => {
     updateFlag(evt.target);
   });
 }
 
 const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const API_KEY = 'cur_live_kajVvZ6EQJjeBHm6OqTVlcpnTsV0aV73G1cIwjnS'; // Pallavi moti yahan apni API key dalni hai
  const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurr.value}&currencies=${toCurr.value}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (data.data && data.data[toCurr.value]) {
      let rate = data.data[toCurr.value].value;
      let finalAmount = (amtVal * rate).toFixed(2);
      msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } else {
      throw new Error('Unable to get exchange rate');
    }
  } catch (error) {
    console.error('Error:', error);
    msg.innerText = 'An error occurred. Please try again later.';
  }
};
 
 const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
 };
 
 btn.addEventListener("click", (evt) => {
   evt.preventDefault();
   updateExchangeRate();
 });
 
 window.addEventListener("load", () => {
   updateExchangeRate();
 });
