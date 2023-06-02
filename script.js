const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWRiZjliNTEyZjhkOTI5NDE5ZDVmNTM1ODVmZmZhOCIsInN1YiI6IjY0NzVkZmYwOTI0Y2U2MDBkY2IzMTgwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.e2tJvwUpNIS710E1DxiMPWOYdFxUoBSugEm4lfDVQxw",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    let rows = response["results"];
    rows.forEach((a) => {
      let title = a["title"];
      let overview = a["overview"];
      let poster = a["poster_path"];
      let point = a["vote_average"];
      let id = a["id"];
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
      img.classList.add("card-img-top");
      img.alt = "...";
      //이미지 클릭시 id 알림창-호출이 아닌 선언을 해야함
      img.onclick = function () {
        clickId(id);
      };

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const titleElement = document.createElement("h5");
      titleElement.classList.add("card-title");
      titleElement.textContent = `${title}`;

      const overviewElement = document.createElement("p");
      overviewElement.classList.add("card-overview");
      overviewElement.textContent = `${overview}`;

      const pointElement = document.createElement("p");
      pointElement.classList.add("card_point");
      pointElement.textContent = `vote_average(평점): ${point}`;

      const idElement = document.createElement("p");
      idElement.classList.add("card-id");
      const cardID = (idElement.setAttribute = `${id}`);

      cardBody.appendChild(titleElement);
      cardBody.appendChild(overviewElement);
      cardBody.appendChild(pointElement);
      cardBody.appendChild(idElement);
      cardContainer.appendChild(img);
      cardContainer.appendChild(cardBody);

      const parentElement = document.querySelector(".parent-element");
      parentElement.appendChild(cardContainer);
    });
    function clickId(id) {
      alert(`${id}`);
    }
  });

// 검색기능
function filter() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {});
  for (let i = 0; i < cards.length; i++) {
    let cardValue = cards[i].textContent.toLowerCase();
    if (cards[i].innerHTML.toLowerCase().indexOf(searchInput) != -1) {
      cards[i].style.display = "flex";
    } else {
      cards[i].style.display = "none";
    }
  }
}

//버튼 클릭시 새로고침X
const myButton = document.getElementById("searchBtn");

myButton.addEventListener("click", function (event) {
  event.preventDefault();
});

// 엔터로 검색하기
const info = document.querySelector("#searchInput");
info.addEventListener("keypress", sendMyInfoByEnter);
