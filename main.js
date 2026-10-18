const positions = [
  { id: 1, label: "P1", name: "Arrière droit" },
  { id: 2, label: "P2", name: "Avant droit" },
  { id: 3, label: "P3", name: "Avant centre" },
  { id: 4, label: "P4", name: "Avant gauche" },
  { id: 5, label: "P5", name: "Arrière gauche" },
  { id: 6, label: "P6", name: "Arrière centre" },
];

let players = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" };

// Build form
const formGrid = document.getElementById("formGrid");
positions.forEach((p) => {
  const div = document.createElement("div");
  div.className = "position-input";
  div.innerHTML = `
                <label>${p.label} <span>${p.name}</span></label>
                <input type="text" data-pos="${p.id}" placeholder="Nom du·de la joueur·se" />
            `;
  formGrid.appendChild(div);
});

// Court layout: top row = front (near net), bottom row = back (near baseline)
// Columns left→right: left, center, right
const courtOrder = [4, 3, 2, 5, 6, 1];

function buildCourt() {
  const court = document.getElementById("court");
  court.innerHTML = "";

  courtOrder.forEach((posId) => {
    const cell = document.createElement("div");
    cell.className = "player-cell" + (players[posId] ? " active" : "");
    cell.innerHTML = `<span class="pos-number">P${posId}</span>${players[posId] || "—"}`;
    court.appendChild(cell);
  });
}

// Input handling
document.querySelectorAll("[data-pos]").forEach((input) => {
  input.addEventListener("input", (e) => {
    players[e.target.dataset.pos] = e.target.value.trim();
    buildCourt();
  });
});

// Rotation (clockwise: 1→6→5→4→3→2→1)
function rotate() {
  const temp = players[1];
  players[1] = players[2];
  players[2] = players[3];
  players[3] = players[4];
  players[4] = players[5];
  players[5] = players[6];
  players[6] = temp;
  updateInputs();
  buildCourt();
}

function updateInputs() {
  document.querySelectorAll("[data-pos]").forEach((input) => {
    input.value = players[input.dataset.pos];
  });
}

function resetAll() {
  players = { 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" };
  updateInputs();
  buildCourt();
}

buildCourt();
