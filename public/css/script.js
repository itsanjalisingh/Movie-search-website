document.getElementById("myButton").onclick = function() {
    window.location.href = "http://localhost:3000/";
  };
  const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7098f6b35990f9109bffe0d1fc61c8ed&page=1';
  const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7098f6b35990f9109bffe0d1fc61c8ed&query=";
  //https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
 // 7098f6b35990f9109bffe0d1fc61c8ed


  const main = document.getElementById("section");
  const form = document.getElementById("form");
  const search = document.getElementById("query");

returnMovies(APILINK)
  function returnMovies(url)
  {
    fetch(url).then(res => res.json())
    .then(function(data)
    {
    console.log(data.results);
    data.results.forEach(element => 
        {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
        
        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');
        
        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');
        
        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');
        
        const title = document.createElement('h3');
        title.setAttribute('id', 'title');
        
        const center = document.createElement('center');
  
        title.innerHTML = `${element.title}`;
        image.src = IMG_PATH + element.backdrop_path;
  
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
  
        main.appendChild(div_row);
    });
  });
  }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  main.innerHTML = "";

  const searchItem = search.value;

  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
      search.value = "";
  }
  document.addEventListener("DOMContentLoaded", function() {
    // Your JavaScript code here
});

});
document.getElementById('refreshButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    location.reload(); // Reload the page
});