const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button ");
for(let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code) {
        // selecting USD by default as FROM currency and MAD as TO currency
        let selected;
        if(i == 0){
            selected = currency_code == "USD"?"selected":"";
        }
        else if (i == 1) {
            selected = currency_code == "MAD"?"selected":"";
        }
        //creating option tag with passing currency
        let optionTag = `<option value="${currency_code}"${selected}>${currency_code}</option>`;
        // inserting option tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend",optionTag);

    }
    dropList[i].addEventListener("change", e =>{
         loadFlag(e.target);//caling loadFlag with passing target element as an argument
    });
}

function loadFlag(element) {
    for(code in country_code){
        if(code == element.value){//if currency code of country list is equal to option value
           let imgTag = element.parentElement.querySelector('img');//selecting img tag of particular drop list
           //passing country code of a selected currency code in a img url
           imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }

}
window.addEventListener("onload",() =>{
  getExchangeRate();
});


getButton.addEventListener("click",e =>{
      e.preventDefault(); //preventing form from submetting
      getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=>{
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
          exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal =="0") {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
// making a request to the ExchangeRate-API.
let url = `https://v6.exchangerate-api.com/v6/c6d0ad335221bed4a25c111f/latest/${fromCurrency.value}`;
//fetching API response and returning it into js obj and in another then method receiving that obj
fetch(url).then(response => response.json()).then(result => {
    let exchangerate = result.conversion_rates[toCurrency.value];
      let totalExchangeRate = (amountVal * exchangerate).toFixed(2);
      const exchangeRateTxt = document.querySelector(".exchange-rate");
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
}).catch(()=>{//if user is offline or any error while catching data then catch function will run
    exchangeRateTxt.innerText ="Something went wrong";
});
}
