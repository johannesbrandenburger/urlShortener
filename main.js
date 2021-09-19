var supabase = supabase.createClient("https://kgshezreyobypiidaeii.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMTk1MTgzNywiZXhwIjoxOTQ3NTI3ODM3fQ.OVMR_WiGUsuCVylx7Ih6Kuy40LYK-eipFKu7t6qydUE");

const redirectDirectly = async () => {
    
    const { data: shortcutList, error } = await supabase
    .from('shortcuts')
    .select()
    console.log(shortcutList);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const keys = urlParams.keys();
    var shortLink = "";
    var foundLink = false;
    for (const key of keys) {
        console.log(key);
        shortLink = key;
        break;
    }

    if (keys.length == 0 || shortLink == "") {
        document.getElementById("startHeader").style.display = "none";
        document.getElementById("addShortcutHeader").style.display = "flex";
        terminalLog("no shortcut inserted!");
    } else {
        terminalLog("shortcut: " + shortLink + " inserted");
        for (i=0; i<shortcutList.length; i++) {
            console.log(shortcutList[i]["shortcut"]);
            if (shortcutList[i]["shortcut"] == shortLink) {
                foundLink = true;
                terminalLog("redirecting to: " + shortcutList[i]["destination_link"]);
                window.location.href = shortcutList[i]["destination_link"];
            }
        }
        if (!foundLink) {
            terminalLog("shortcut was not found in database");
            document.getElementById("startHeader").style.display = "none";
            document.getElementById("notFoundHeader").style.display = "flex";
        }
    }





}


window.userToken = null;

document.addEventListener('DOMContentLoaded', function (event) {
  
    var addButton = document.querySelector('#addButton')
    addButton.onclick = clickedAdd.bind(addButton);
});


const clickedAdd = () => {
    terminalLog("clicked add");
    var inputShortcut = document.getElementById("newShortcut").value;
    var inputURL = document.getElementById("newURL").value;
    var inputPassword = document.getElementById("password").value;
    if (hash(inputPassword) == 690) {
        if (inputShortcut != "" && inputURL != "") {
            addNewShortcut(inputShortcut, inputURL);
        } else {
            missingFields();
        }
        
    } else {
        wrongPasswort();
    }

};



const wrongPasswort = () => {
    terminalLog("Error: wrong passwort!");
};

const missingFields = () => {
    terminalLog("Error: missing fields!");
};

const terminalLog = (message) => {
    document.getElementById("terminal5").innerHTML = document.getElementById("terminal4").innerHTML;
    document.getElementById("terminal4").innerHTML = document.getElementById("terminal3").innerHTML;
    document.getElementById("terminal3").innerHTML = document.getElementById("terminal2").innerHTML;
    document.getElementById("terminal2").innerHTML = document.getElementById("terminal1").innerHTML;
    document.getElementById("terminal1").innerHTML = "> " + message;
};

const missingFields = () => {
    console.log("missingFields()");
};

const hash = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash;
};



const addNewShortcut = async (inputShortcut, inputDestinationLink) => {
    terminalLog("addNewShortcut()");

    const { data: shortcutsSoFar, error } = await supabase
        .from('shortcuts')
        .select()
    console.log(shortcutsSoFar);

    var isAllreadyTaken = false;

    for (i=0; i<shortcutsSoFar.length; i++) {
        console.log(shortcutsSoFar[i]["shortcut"]);
        if (shortcutsSoFar[i]["shortcut"] == inputShortcut) {
            isAllreadyTaken = true;
        }
    }

    if (isAllreadyTaken) {
        terminalLog("Error: Shortcut is allready taken");
    } else {
        const { d, e } = await supabase
        .from('shortcuts')
        .insert([
            { shortcut: inputShortcut, destination_link: inputDestinationLink }
        ]);
        document.getElementById("newShortcut").value = "";
        document.getElementById("newURL").value = "";
        document.getElementById("password").value = "";
        terminalLog("Added Shortcut:" + inputShortcut);
    }

}

redirectDirectly();