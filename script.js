let songsData = [];
let currentCategory = "All";
let currentIndex = 0;

// Fetch songs
fetch("songs.json")
  .then(res => res.json())
  .then(data => {
    songsData = data;
    displaySongs(data);
    // Autoplay first featured song if exists
    let featured = data.find(s=>s.featured);
    if(featured) playByIndex(songsData.indexOf(featured));
  });

// Display songs
function displaySongs(data){
  const container = document.getElementById("songsContainer");
  container.innerHTML = "";

  if(data.length === 0){
    document.getElementById("notFound").style.display = "block";
    return;
  } else document.getElementById("notFound").style.display = "none";

  data.forEach(song=>{
    container.innerHTML += `
      <div class="song-box">
        <div class="song-info">
          <img src="${song.image}" alt="${song.name}">
          <div class="song-details">
            <h4>${song.name}</h4>
            <p>${song.artist}</p>
          </div>
        </div>
        <div class="options-menu">
          <button class="options-btn" onclick="toggleMenu(this)">⋮</button>
          <div class="menu-content">
            <a href="${song.audio}" download>📥 Download</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Toggle options menu
function toggleMenu(btn){
  const menu = btn.nextElementSibling;
  menu.style.display = menu.style.display==="flex"?"none":"flex";
}

// Play song (for player)
function playSong(src){
  const player = document.getElementById("audioPlayer");
  player.src = src;
  player.play();
}

// Search & Sort
document.getElementById("search").addEventListener("input",function(){
  let value = this.value.toLowerCase();
  let filtered = songsData.filter(s=> s.name.toLowerCase().includes(value) || s.artist.toLowerCase().includes(value));
  displaySongs(filtered);
});

document.getElementById("sort").addEventListener("change",function(){
  let sorted = [...songsData];
  if(this.value==="az") sorted.sort((a,b)=>a.name.localeCompare(b.name));
  if(this.value==="za") sorted.sort((a,b)=>b.name.localeCompare(a.name));
  if(this.value==="artist") sorted.sort((a,b)=>a.artist.localeCompare(b.artist));
  if(this.value==="new") sorted.sort((a,b)=>new Date(b.date)-new Date(a.date));
  if(this.value==="old") sorted.sort((a,b)=>new Date(a.date)-new Date(b.date));
  displaySongs(sorted);
});

// Filter Category
function filterCategory(cat){ 
  currentCategory=cat; 
  displaySongs(cat==="All"?songsData:songsData.filter(s=>s.category===cat)); 
}

// Next / Prev Player
function playByIndex(index){ currentIndex=index; playSong(songsData[index].audio); }
function nextSong(){ currentIndex=(currentIndex+1)%songsData.length; playByIndex(currentIndex); }
function prevSong(){ currentIndex=(currentIndex-1+songsData.length)%songsData.length; playByIndex(currentIndex); }