var mForm = document.querySelector("form");
var section = document.querySelector("section");
mForm.addEventListener("submit", submitForm);
async function submitForm(e) {
e.preventDefault();
var data = await new FormData(this);
  await fetch(this["domain"].value, {
    body: data,
    method: "POST"
  })
  .then(async res => {
  var json = await res.json();
    if (res.ok) {
    await createSuccessDiv(this["url"].value, json.url, json.logurl);
    this.reset();
    } else {
    alert("Failure? " + json.error);
    }
  })
  .catch(console.error);
return false; 
}
var createSuccessDiv = async (longURL, shortURL, analyticalURL) => {
var div = document.createElement("div");
var closeDiv = div.cloneNode();
var close = document.createElement("span");
var img = document.createElement("img");
var longURLh3 = document.createElement("h3");
var longURLinput = document.createElement("input");
var shortURLh3 = longURLh3.cloneNode();
var shortURLdiv = div.cloneNode();
var shortURLinput = longURLinput.cloneNode();
var shortURLa = document.createElement("a");
var analyticalURLh3 = longURLh3.cloneNode();
var analyticalURLdiv = div.cloneNode();
var analyticalURLinput = longURLinput.cloneNode();
var analyticalURLa = shortURLa.cloneNode();
div.classList.add("successResult");
closeDiv.classList.add("closeDiv");
  close.addEventListener("click", removeSuccessResult);
close.innerHTML = "&#x274c";
closeDiv.append(close);
img.addEventListener("load", imgLoaded);
img.src = "https://quickchart.io/qr?dark=800080&text=" + encodeURIComponent(shortURL);
img.alt = "QRcode of " + shortURL;
longURLh3.append("Long URL:");
longURLinput.setAttribute("readonly", "true");
longURLinput.value = longURL;
shortURLh3.append("Shortened URL:");
shortURLinput.setAttribute("readonly", "true");
shortURLinput.value = shortURL;
shortURLdiv.append(shortURLinput);
shortURLa.href = `javascript:clickToCopy("` + shortURL + `")`;
shortURLa.innerHTML = "&#x1f4cb;";
shortURLdiv.append(shortURLa);
analyticalURLh3.append("Analytical URL:");
analyticalURLinput.setAttribute("readonly", "true");
analyticalURLinput.value = analyticalURL;
analyticalURLdiv.append(analyticalURLinput);
analyticalURLa.href = `javascript:window.open("` + analyticalURL + `")`;
analyticalURLa.innerHTML = "&#x1f517;";
analyticalURLdiv.append(analyticalURLa);
div.append(closeDiv, img, longURLh3, longURLinput, shortURLh3, shortURLdiv, analyticalURLh3, analyticalURLdiv);
section.prepend(div);
}
var clickToCopy = async (shortURL) => {
  try {
  await navigator.clipboard.writeText(shortURL);
  } catch (e) {
    try {
    var ta = document.createElement("textarea");
    ta.append(shortURL);
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    } catch (e) {
    alert(e);
    }
  alert(e);
  }
}
var removeSuccessResult = async (e) => {
var div = e.target.parentElement.parentElement;
var divs = document.querySelectorAll(".successResult");
  if (!section.classList.contains("blur")) {
  section.classList.add("blur");
  }
  setTimeout(() => {
    if (div === divs[divs.length - 1]) {
    var newDiv = document.createElement("div");
    newDiv.style.height = div.clientHeight + "px";
    div.replaceWith(newDiv);
    } else {
    div.remove();
    }
  }, 1000);
  setTimeout(() => {
  section.classList.remove("blur");
  }, 2000);
}
var imgLoaded = async (e) => {
e.target.style.opacity = 1;
}
/*a = [
  "https://www.google.com",
  "https://yt.be",
  "https://www.w3schools.com/ksks/aiiaja/wi.asp?skks=ksksksk"
];
b = [
  "g",
  "yt",
  "w3courtier"
];
a.forEach((x, i) => createSuccessDiv(x, "https://yosl.cf/"+b[i], "https://log.yosl.cf/"+b[i]));*/