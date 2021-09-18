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


    for (i=0; i<shortcutList.length; i++) {
        console.log(shortcutList[i]["shortcut"]);
        if (shortcutList[i]["shortcut"] == shortLink) {
            foundLink = true;
            window.location.href = shortcutList[i]["destination_link"]
        }
    }
}


window.userToken = null;

document.addEventListener('DOMContentLoaded', function (event) {
  
    var addButton = document.querySelector('#addButton')
    addButton.onclick = clickedAdd.bind(addButton);
});


const clickedAdd = () => {
    console.log("clickedAdd()");
    var inputShortcut = document.getElementById("newShortcut").value;
    var inputURL = document.getElementById("newURL").value;
    var inputPassword = document.getElementById("password").value;
    if (hash(inputPassword) == 690) {
        addNewShortcut(inputShortcut, inputURL);
    } else {
        wrongPasswort();
    }

};

const wrongPasswort = () => {
    console.log("wrongPasswort()");
};

const hash = (key) => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    return hash;
};

const addNewShortcut = async (inputShortcut, inputDestinationLink) => {

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
        // is allready taken
    } else {
        const { d, e } = await supabase
        .from('shortcuts')
        .insert([
            { shortcut: inputShortcut, destination_link: inputDestinationLink }
        ]);
        document.getElementById("newShortcut").value = "";
        document.getElementById("newURL").value = "";
        document.getElementById("password").value = "";
    }

}

redirectDirectly();