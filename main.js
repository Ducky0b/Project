const url = "https://games-details.p.rapidapi.com/page/1";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "fda47a192cmsh147ed7fb590202ep1cae0fjsnab9753a6463e",
    "x-rapidapi-host": "games-details.p.rapidapi.com",
  },
};
const display = document.querySelector("#display");
const displayTitle = document.querySelector("#displayTitle");
const showDetail = document.querySelector(".show-detail");
const searchInput = document.querySelector("#searchForm");
const searchButton = document.querySelector(".search-btn");
const categoryItems = document.querySelector(".category-items");

let loading = false;
const getData = async () => {
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading Data...</div>`;
  let data = {};
  // let url = `${BASE_URL}/${endpoint}/Counter/${value}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    loading = false;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const renderDisplay = async () => {
  try {
    const data = await getData();
    const showingGames = document.querySelector(".showing-game");
    showingGames.className = "showing-game";
    showingGames.innerHTML = "";
    data.forEach((game) => {
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `<div class="game-wrapper">
                            <div class="cover">
                              <img src="${game.img}" alt="img" class="img-game" onClick="appDetail(${game.id})">
                            </div>
                            <div class="game-info">
                              <p id="gameTitle">${game.name}</p>
                              <p id="price">${game.price}</p>
                            </div>
                          </div>`;
      showingGames.appendChild(newDiv);
    });
  } catch (error) {
    console.log("err", err);
  }
};

const getDetail = async (value) => {
  const urlDetail = `https://games-details.p.rapidapi.com/gameinfo/single_game/${value}`;
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading Data...</div>`;
  let data = {};
  try {
    const response = await fetch(urlDetail, options);
    const data = await response.json();
    console.log(data);
    loading = false;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const getSearch = async (value) => {
  const urlSearch = `https://games-details.p.rapidapi.com/search?sugg=${value}`;
  if (loading) return;
  display.innerHTML = `<div class="loader"> Loading Data...</div>`;
  let data = {};
  try {
    const response = await fetch(urlSearch, options);
    const data = await response.json();
    console.log(data);
    loading = false;
    return data;
  } catch (error) {
    console.error(error);
  }
};
const renderDetailGame = async (data, appID) => {
  showDetail.className = "show-detail";
  showDetail.innerHTML = "";
  displayTitle.innerHTML = `${data.name}`;
  const newDiv = document.createElement("div");
  newDiv.innerHTML = `<div class="show-detail" id="display">
                <div class="title">${data.name}</div>
                <div class="detail-img">
                    <img
                        src="https://cdn.akamai.steamstatic.com/steam/apps/${appID}/header.jpg"
                        alt="Counter-Strike 2">
                    <div class="detail-game">
                        <div class="game-desc">${data.desc}</div>
                        <div class="info-game">
                            <p>Recent Reviews: Very Positive</p>
                            <p>Release Date: ${data.release_date}</p>
                            <p>Developer: ${data.dev_details.developer_name[0]}</p>
                            <p>Pulisher: ${data.dev_details.publisher[0]}</p>
                        </div>
                    </div>
                </div>
                <div class="tags-game">
                    Popular user-defined tags for this product:
                    <div class="tags">
                        <div class="tag">${data.tags[0]}</div>
                        <div class="tag">${data.tags[1]}</div>
                        <div class="tag">${data.tags[2]}</div>
                        <div class="tag">${data.tags[3]}petitive</div>
                        <div class="tag">${data.tags[4]}vival</div>
                        <div class="tag">${data.tags[5]}m-Based</div>
                        <div class="tag">${data.tags[6]}-Down</div>
                    </div>
                    Popular languages for this product:
                    <div class="tags">
                        <div class="tag">${data.lang[0]}</div>
                        <div class="tag">${data.lang[1]}</div>
                        <div class="tag">${data.lang[2]}</div>
                        <div class="tag">${data.lang[3]}</div>
                        <div class="tag">${data.lang[4]}</div>
                        <div class="tag">${data.lang[5]}</div>
                        <div class="tag">${data.lang[6]}</div>
                    </div>
                </div>
                <div class="about-game">
                    <div class="title-about-game">About Game</div>
                    <div class="content-game">
                        ${data.about_game}
                    </div>
                </div>
                <div class="sys-required">
                    <div class="title-sys">System Required</div>
                    <div class="recommend-sys">
                        <p>${data.sys_req.window.recomm[0]}</p>
                        <p>${data.sys_req.window.recomm[1]}</p>
                        <p>${data.sys_req.window.recomm[2]}</p>
                        <p>${data.sys_req.window.recomm[3]}</p>
                        <p>${data.sys_req.window.recomm[4]}</p>
                        <p>${data.sys_req.window.recomm[5]}</p>
                    </div>
                </div>
            </div>`;
  showDetail.appendChild(newDiv);
};
const searchDisplay = (games) => {
  const showingGames = document.querySelector(".showing-game");
  showingGames.className = "showing-game";
  showingGames.innerHTML = "";
  games.forEach((game) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="game-wrapper">
    <div class="cover">
      <img src="${game.small_cap}" alt="img" class="img-game" onClick="appDetail(${game.id})">
    </div>
    <div class="game-info">
      <p id="gameTitle">${game.name}</p>
      <p id="price">${game.price}</p>
    </div>
  </div>`;
    showingGames.appendChild(newDiv);
  });
};
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  e = searchInput.value;
  console.log(e);
  searchGame(e);
});
categoryItems.addEventListener("click", (e) => {
  e.preventDefault();
  const value = e.target.innerText;
  console.log(value);
  searchGame(value);
});
const searchGame = async (value) => {
  const data = await getSearch(value);
  searchDisplay(data);
};

const appDetail = async (appId) => {
  const data = await getDetail(appId);
  renderDetailGame(data, appId);
};

renderDisplay();
