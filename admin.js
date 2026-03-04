let songs = [];

// Fetch songs
fetch("songs.json")
  .then(res => res.json())
  .then(data => {
    songs = data;
    displaySongs();
  });

// Login
function checkLogin(){
  const pass = document.getElementById("adminPass").value;
  if(pass==="devbhoomi123"){  // Change your password
    document.getElementById("loginScreen").style.display="none";
    document.getElementById("dashboard").style.display="flex";
  } else alert("Wrong Password!");
}

// Sidebar Section Switch
function showSection(section){
  document.getElementById("addSection").style.display = section==="add"?"block":"none";
  document.getElementById("songsSection").style.display = section==="songs"?"block":"none";
}

// Add Song
function addSong(){
  const newSong = {
    id: Date.now(),
    name: document.getElementById("name").value,
    artist: document.getElementById("artist").value,
    category: document.getElementById("category").value,
    image: document.getElementById("image").value,
    audio: document.getElementById("audio").value,
    featured: document.getElementById("featured").checked,
    date: new Date().toISOString().split("T")[0]
  };
  songs.push(newSong);
  displaySongs();
  alert("Song Added! Download JSON and replace in GitHub");
}

// Display Songs
function displaySongs(){
  const list = document.getElementById("songList");
  list.innerHTML = "";
  songs.forEach(song=>{
    list.innerHTML += `
      <div class="songCard">
        <div>
          <strong>${song.name}</strong>
          <span>${song.artist}</span>
          <span>${song.category}</span>
        </div>
        <div>
          <button onclick="deleteSong(${song.id})">Delete</button>
        </div>
      </div>
    `;
  });
}

// Delete Song
function deleteSong(id){
  songs = songs.filter(s=>s.id!==id);
  displaySongs();
}

// Download JSON
function downloadJSON(){
  const blob = new Blob([JSON.stringify(songs,null,2)],{type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "songs.json";
  a.click();
}