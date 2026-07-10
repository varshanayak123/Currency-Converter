const Base_Url ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDown = document.querySelectorAll(".dropdown select")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("button")
const msg = document.querySelector(".msg")

for (let select of dropDown){
    for(currCode in countryList){
        let newOption  = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "Selected"
    } else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "Selected"
    }
        select.append(newOption) 
    }
select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
})
}

const updateMsg = async () => {
    let amt = document.querySelector(".amount input")
    let amtVal = amt.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amt.value = "1"
    }

const URL = `${Base_Url}/${fromCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);
let data = await response.json();

let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
let finalAmt = rate * amtVal
msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value} `
}

const updateFlag = (element) => {
    const currCode = element.value;
    const countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newsrc;
}

btn.addEventListener("click" , (evt) => {
    evt.preventDefault();
    updateMsg();
});

window.addEventListener("load" , () => {
    updateMsg();
})

