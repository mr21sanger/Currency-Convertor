const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
let button = document.querySelector(".submit");
let updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode]
    newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let image = element.parentElement.querySelector("img")
    image.src = newSrc;
}
let msg = document.querySelector(".msg")
let fromCurr = document.querySelector(".from select")
let toCurr = document.querySelector(".to select")
let dropdown = document.querySelectorAll(".dropdown select")
for (let select of dropdown) {
    for (currCode in countryList) {
        option = document.createElement("option")
        option.innerText = currCode;
        option.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            option.selected = "selected"
        }
        else if (select.name === "to" && currCode === "INR") {
            option.selected = "selected"
        }
        select.append(option);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

button.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector("input")
    let amtValue = amount.value;
    if (amtValue === "" || amtValue <= 0) {
        amtValue = 1;
        amount.value = 1;
    }
    let mainURL = `${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(mainURL);
    let data =await response.json();
    let curr = toCurr.value.toLowerCase();
    let rate = data[curr];
    let finalAmt = amtValue * rate;
    msg.innerText =` ${amtValue} ${fromCurr.value} = ${finalAmt.toFixed(3)} ${toCurr.value}`;

})

