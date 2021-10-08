


const getShortcuts = async () => {
    var shortcuts = await fetch('/getShortcuts')
    .then(function (response) {
        return response.json();
    }).then(function (shortcuts) {
        return shortcuts;
    });
    console.log(shortcuts);
    return shortcuts;
}


const pushNewShortcut = async (shortcut, url) => {
    // add error handling here

    var url = "www.google.com";
    var shortcut = "googleshort";
    fetch(`/pushNewShortcut/${shortcut}/${url}`)
      .then(function (response) {
          return response.text();
      }).then(function (text) {
          console.log('was request successfull:');
          console.log(text); 
      });
}


// const redirectDirectly = async (supabase) => {
//     var sBase = await getSupabaseObject(supabase);
//     const queryString = window.location.search;
//     const urlParams = new URLSearchParams(queryString);
//     const keys = urlParams.keys();
//     var shortLink = "";
//     var foundLink = false;
//     for (const key of keys) {
//         console.log(key);
//         shortLink = key;
//         break;
//     }

//     if (keys.length == 0 || shortLink == "") {
//         document.getElementById("startHeader").style.display = "none";
//         document.getElementById("addShortcutHeader").style.display = "flex";
//         terminalLog("no shortcut inserted");
//     } else {
//         terminalLog("shortcut: " + shortLink + " inserted");

//         terminalLog("query database");
//         const { data: shortcutList, error } = await sBase
//         .from('shortcuts') 
//         .select()
//         console.log(shortcutList);
    
//         if (shortcutList !== undefined || shortcutList !== []) {
//             terminalLog("queried database successfully", "success");
//         } else {
//             terminalLog("Error: failed to query database", "error");
//         }

//         for (i=0; i<shortcutList.length; i++) {
//             console.log(shortcutList[i]["shortcut"]);
//             if (shortcutList[i]["shortcut"] == shortLink) {
//                 foundLink = true;
//                 terminalLog("redirecting to: " + shortcutList[i]["destination_link"], "success");
//                 window.location.href = shortcutList[i]["destination_link"];
//             }
//         }
//         if (!foundLink) {
//             terminalLog("Error: shortcut was not found in database", "error");
//             document.getElementById("startHeader").style.display = "none";
//             document.getElementById("notFoundHeader").style.display = "flex";
//         }
//     }
    
// }


// window.userToken = null;

// document.addEventListener('DOMContentLoaded', function (event) {
  
//     var addButton = document.querySelector('#addButton')
//     addButton.onclick = clickedAdd(sBase).bind(addButton);
// });


// const clickedAdd = (sBase) => {
//     terminalLog("clicked add");
//     var inputShortcut = document.getElementById("newShortcut").value;
//     var inputURL = document.getElementById("newURL").value;
//     var inputPassword = document.getElementById("password").value;
//     if (hash(inputPassword) == 690) {
//         if (inputShortcut != "" && inputURL != "") {
//             addNewShortcut(inputShortcut, inputURL, sBase);
//         } else {
//             missingFields();
//         }
        
//     } else {
//         wrongPasswort();
//     }

// };


// const wrongPasswort = () => {
//     terminalLog("Error: wrong password!", "error");
// };

// const missingFields = () => {
//     terminalLog("Error: missing fields!", "error");
// };

// const terminalLog = (message, type="normal") => {
//     var newColor = "white";
//     if (type == "error") {
//         newColor = "red";
//     } else if (type == "success") {
//         newColor = "green";
//     };

//     document.getElementById("terminal5").style.color = document.getElementById("terminal4").style.color;
//     document.getElementById("terminal4").style.color = document.getElementById("terminal3").style.color;
//     document.getElementById("terminal3").style.color = document.getElementById("terminal2").style.color;
//     document.getElementById("terminal2").style.color = document.getElementById("terminal1").style.color;
//     document.getElementById("terminal1").style.color = newColor;


//     document.getElementById("terminal5").innerHTML = document.getElementById("terminal4").innerHTML;
//     document.getElementById("terminal4").innerHTML = document.getElementById("terminal3").innerHTML;
//     document.getElementById("terminal3").innerHTML = document.getElementById("terminal2").innerHTML;
//     document.getElementById("terminal2").innerHTML = document.getElementById("terminal1").innerHTML;
//     document.getElementById("terminal1").innerHTML = "> " + message;
// };


// const hash = (key) => {
//     let hash = 0;
//     for (let i = 0; i < key.length; i++) {
//         hash += key.charCodeAt(i);
//     }
//     return hash;
// };



const addNewShortcut = async (inputShortcut, inputDestinationLink) => {
    terminalLog("addNewShortcut()");

    terminalLog("query database");
    const { data: shortcutsSoFar, error } = await sBase
        .from('shortcuts')
        .select()
    console.log(shortcutsSoFar);

    if (shortcutsSoFar !== undefined || shortcutsSoFar !== []) {
        terminalLog("queried database successfully", "success");
    } else {
        terminalLog("Error: failed to query database", "error");
    }

    var isAllreadyTaken = false;

    for (i=0; i<shortcutsSoFar.length; i++) {
        console.log(shortcutsSoFar[i]["shortcut"]);
        if (shortcutsSoFar[i]["shortcut"] == inputShortcut) {
            isAllreadyTaken = true;
        }
    }


    if (inputDestinationLink[0]!= "h" &&
        inputDestinationLink[1]!= "t" &&
        inputDestinationLink[2]!= "t" &&
        inputDestinationLink[3]!= "p"
    ) {
        inputDestinationLink = "https://" + inputDestinationLink;
    }


    if (isAllreadyTaken) {
        terminalLog("Error: Shortcut is allready taken", true);
    } else {
        const { d, e } = await sBase
        .from('shortcuts')
        .insert([
            { shortcut: inputShortcut, destination_link: inputDestinationLink }
        ]);
        document.getElementById("newShortcut").value = "";
        document.getElementById("newURL").value = "";
        document.getElementById("password").value = "";
        terminalLog("Added Shortcut: " + inputShortcut, "success");
        terminalLog("Destination: " + inputDestinationLink);
        terminalLog("Link: " + "j1b.site/?" + inputShortcut);
        copyTextToClipboard("j1b.site/?" + inputShortcut);
    }

}
// getShortcuts();
redirectDirectly();
