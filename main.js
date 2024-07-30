
let inp = document.querySelector('input');
let search = document.querySelector(".btn");
let main = document.querySelector(".main");
let result;

search.addEventListener("click", () => {
    myFunction();
});

inp.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        e.preventDefault(); 
        myFunction();
    }
});

function myFunction() {
    let inpValue = inp.value.trim();
    if (!inpValue) return; 

    let apiUrl = `https://api.github.com/users/${inpValue}`;

    async function getData() {
        try {
            let api = await fetch(apiUrl);
            result = await api.json();
            displayData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function displayData() {
        main.innerHTML = `
            <h1 id="userName" style="text-align: center;">${result.name || 'No name available'}</h1>
            <div class="top">
                <div class="left">
                    <img src="${result.avatar_url}" alt="User Avatar">
                </div>
                <div class="right">
                    <h2>Followers</h2>
                    <h2>${result.followers}</h2>
                </div>
                <div>
                    <h2>Following</h2>
                    <h2>${result.following}</h2>
                </div>
            </div>
            <div class="bottom">
                <div class="btmleft">
                    <h3>${result.bio || 'No bio available'}</h3>
                </div>
                <div class="btmright">
                    <button class="button-36" role="button" onclick="window.open('${result.html_url}', '_blank')">VISIT PROFILE</button>
                </div>
            </div>
        `;
    }

    getData();
}
