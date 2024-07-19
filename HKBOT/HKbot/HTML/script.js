const userMessage = [
  ["Hi", "Hello", "Wazzup"],
  ["Can i ask question about HK?"],
  ["How can apply a HK?"],
  ["What are the percentage that did you offer?"],
  ["What is the applicable year to apply HK?"]
];

const botReply = [
  ["Hello!", "Hi!", "Hey!", "Hi there!"],
  ["Okay"],
  ["Yes I am! "],
  ["I'm sorry about that. But I like you dude."],
  [
    "Fine... how are you?",
    "Pretty well, how are you?",
    "Fantastic, how are you?"
  ],
  ["Getting better. There?", "Somewhat okay!", "Yeah fine. Better stay home!"],

  [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
  ["I am always young."],
  ["I am just a bot", "I am a bot. What are you?"],
  ["Sabitha Kuppusamy"],
  ["I am nameless", "I don't have a name"],
  ["I love you too", "Me too"],
  ["Have you ever felt bad?", "Glad to hear it"],
  ["Why?", "Why? You shouldn't!", "Try watching TV", "Chat with me."],
  ["What about?", "Once upon a time..."],
  ["Tell me a story", "Tell me a joke", "Tell me about yourself"],
  ["You're welcome"],
  ["Briyani", "Burger", "Sushi", "Pizza"],
  ["Dude!"],
  ["Yes?"],
  ["Please stay home"],
  ["Glad to hear it"],
  ["Say something interesting"],
  ["Sorry for that. Let's chat!"],
  ["Take some rest, Dude!"]
];

const alternative = [
  "Hi, Good Day",
  "Yes Of Course.",
  "You can see the HK application's link to complete this and fill it out, by searching a PHINMA ARAULLO UNIVERISTY page.",
  "25%, 50% and 75%",
  "Senior High School, and First year college",
  "I don't understand the question",
  "You can find detailed information about HK scholarships by visiting the official PHINMA ARAULLO UNIVERSITY website for more inforamtion visit this page https://www.facebook.com/PHINMAAU.CSDL.",
  "To apply for HK scholarships, you need to follow the application process provided on the PHINMA ARAULLO UNIVERSITY website for more inforamtion visit this page https://www.facebook.com/PHINMAAU.CSDL.",
  "The percentage of scholarships offered varies, including 25%, 50%, and 75%.",
  "HK scholarships are applicable for both Senior High School students and first-year college students.",
  "What about HK?",
  "What is your question",
  "only first year and senior hghschool student",
  "There is no requirement for hk scholarship",
  "HK scholarship applicable for 4 years",
  "HK scholarship give you 25%, 50%, and 75%  discount on tuition fees"
];

const synth = window.speechSynthesis;

function voiceControl(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-aus";
  u.volume = 1;
  u.rate = 1;
  u.pitch = 1;
  synth.speak(u);
}

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  inputField.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});

function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  if (comparedText) {
    product = comparedText;
  } else if (text.includes("hk")) {
    if (text.includes("percentage")) {
      product = alternative[8];
    } else if (text.includes("applicable")) {
      product = alternative[9];
    } else if (text.includes("apply")) {
      if (text.includes("how")) {
        product = alternative[7];
      } else if (text.includes("can") || text.includes("anyone")) {
        product = alternative[12];
      }else if (text.includes("where")) {
        product = alternative[6];
      }
    } else if (text.includes("question")) {
      product = alternative[6];
    } else if (text.includes("about")) {
      product = alternative[6];
    } else if (text.includes("percent")) {
      product = alternative[3];
    } else if (text.includes("benefits")) {
      product = alternative[15];
    } else if (text.includes("last") || text.includes("years")) {
      product = alternative[14];
    } else if (text.includes("does") || text.includes("work")) {
      product = alternative[15];
    } else {
      product = alternative[10];
    }
  } else if (text.includes("apply")) {
    if (text.includes("how")) {
      product = alternative[7];
    }
    else if (text.includes("can") || text.includes("anyone")) {
      product = alternative[12];
    } else if (text.includes("who") || text.includes("can")) {
      product = alternative[4];
    } else if (text.includes("requirement") || text.includes("any")) {
      product = alternative[13];
    }
  } else if (text.includes("applicable") || text.includes("application")) {
    product = alternative[9];
  } else if (text.includes("percent")) {
    product = alternative[3];
  } else if (text.includes("ask") || text.includes("question")) {
    product = alternative[11];
  } else {
    product = alternative[5];
  }

  addChat(input, product);
}


function compare(triggerArray, replyArray, string) {
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < triggerArray[x].length; y++) {
      // Modify the comparison to check if the input string includes any part of the trigger phrase
      if (string.includes(triggerArray[x][y].toLowerCase())) {
        return replyArray[x][Math.floor(Math.random() * replyArray[x].length)];
      }
    }
  }
  return null;
}

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
  voiceControl(product);
}
