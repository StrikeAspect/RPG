const HEAL_AMOUNT = 20;
const MAX_HEALS = 3;
const MONSTERS = [
    { nome: "Goblin", vita: 50, attacco: 8, difesa: 2, probabilitaFuga: 0.8 },
    { nome: "Orco", vita: 80, attacco: 12, difesa: 5, probabilitaFuga: 0.5 },
    { nome: "Drago", vita: 150, attacco: 20, difesa: 10, probabilitaFuga: 0.1 }
];

const elements = {
    playerName: document.getElementById("player-name"),
    playerHealth: document.getElementById("player-health"),
    playerAttack: document.getElementById("player-attack"),
    playerDefense: document.getElementById("player-defense"),
    playerHeals: document.getElementById("player-heals"),
    monsterName: document.getElementById("monster-name"),
    monsterHealth: document.getElementById("monster-health"),
    monsterAttack: document.getElementById("monster-attack"),
    monsterDefense: document.getElementById("monster-defense"),
    monsterEscape: document.getElementById("monster-escape"),
    log: document.getElementById("log"),
    attackButton: document.getElementById("attack-btn"),
    healButton: document.getElementById("heal-btn"),
    fleeButton: document.getElementById("flee-btn"),
    newGameButton: document.getElementById("new-game-btn")
};

let player = null;
let monster = null;
let battleActive = false;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPlayer(name) {
    return {
        nome: name,
        vita: 100,
        attacco: randomInt(5, 15),
        difesa: randomInt(3, 8),
        cureRimaste: MAX_HEALS
    };
}

function createMonster() {
    const baseMonster = MONSTERS[randomInt(0, MONSTERS.length - 1)];
    return {
        ...baseMonster
    };
}

function calculateDamage(attacker, defender) {
    return Math.max(attacker.attacco - defender.difesa, 0);
}

function describeCharacter(character) {
    return `${character.nome} — Vita: ${character.vita}, Attacco: ${character.attacco}, Difesa: ${character.difesa}`;
}

function logCharactersToConsole() {
    console.group("Personaggi del gioco");
    console.log(`Eroe: ${describeCharacter(player)}`);
    console.group("Mostri disponibili");
    MONSTERS.forEach((monsterData) => {
        console.log(describeCharacter(monsterData) + `, Probabilità fuga: ${Math.round(monsterData.probabilitaFuga * 100)}%`);
    });
    console.groupEnd();
    console.groupEnd();
}

function logLine(message) {
    const line = document.createElement("p");
    line.className = "log-line";
    line.textContent = message;
    elements.log.appendChild(line);
    elements.log.scrollTop = elements.log.scrollHeight;
}

function updatePanels() {
    if (!player || !monster) {
        return;
    }

    elements.playerName.textContent = `Nome: ${player.nome}`;
    elements.playerHealth.textContent = `Vita: ${Math.max(player.vita, 0)} / 100`;
    elements.playerAttack.textContent = `Attacco: ${player.attacco}`;
    elements.playerDefense.textContent = `Difesa: ${player.difesa}`;
    elements.playerHeals.textContent = `Cure rimaste: ${player.cureRimaste}`;

    elements.monsterName.textContent = `Nome: ${monster.nome}`;
    elements.monsterHealth.textContent = `Vita: ${Math.max(monster.vita, 0)}`;
    elements.monsterAttack.textContent = `Attacco: ${monster.attacco}`;
    elements.monsterDefense.textContent = `Difesa: ${monster.difesa}`;
    elements.monsterEscape.textContent = `Probabilità fuga: ${Math.round(monster.probabilitaFuga * 100)}%`;
}

function setActionsEnabled(enabled) {
    elements.attackButton.disabled = !enabled;
    elements.healButton.disabled = !enabled;
    elements.fleeButton.disabled = !enabled;
}

function endBattle(message) {
    logLine(message);
    battleActive = false;
    setActionsEnabled(false);
}

function performMonsterTurn() {
    if (monster.vita <= 0 || player.vita <= 0) {
        return;
    }

    logLine(`Il ${monster.nome} attacca ${player.nome}!`);
    const damage = calculateDamage(monster, player);
    if (damage === 0) {
        logLine(`${player.nome} blocca l'attacco!`);
    } else {
        player.vita -= damage;
        logLine(`${player.nome} subisce ${damage} danni.`);
    }

    updatePanels();

    if (player.vita <= 0) {
        endBattle(`${player.nome} è stato sconfitto da ${monster.nome}!`);
    }
}

function playerAttack() {
    if (!battleActive) {
        return;
    }

    logLine(`${player.nome} attacca ${monster.nome}!`);
    const damage = calculateDamage(player, monster);
    if (damage === 0) {
        logLine(`${monster.nome} ha bloccato l'attacco!`);
    } else {
        monster.vita -= damage;
        logLine(`${monster.nome} subisce ${damage} danni.`);
    }

    updatePanels();

    if (monster.vita <= 0) {
        endBattle(`${player.nome} ha sconfitto ${monster.nome}!`);
        return;
    }

    performMonsterTurn();
}

function playerHeal() {
    if (!battleActive) {
        return;
    }

    if (player.cureRimaste <= 0) {
        logLine(`${player.nome} non ha più cure disponibili.`);
        performMonsterTurn();
        return;
    }

    player.vita = Math.min(player.vita + HEAL_AMOUNT, 100);
    player.cureRimaste -= 1;
    logLine(`${player.nome} recupera ${HEAL_AMOUNT} vita.`);
    updatePanels();
    performMonsterTurn();
}

function playerFlee() {
    if (!battleActive) {
        return;
    }

    const chance = Math.random();
    if (chance < monster.probabilitaFuga) {
        endBattle(`${player.nome} è fuggito con successo da ${monster.nome}!`);
        return;
    }

    logLine(`${player.nome} tenta di fuggire ma fallisce!`);
    performMonsterTurn();
}

function startNewBattle() {
    const name = prompt("Inserisci il nome del tuo personaggio:", "Eroe");
    const heroName = name && name.trim() ? name.trim() : "Eroe Coraggioso";

    player = createPlayer(heroName);
    monster = createMonster();
    battleActive = true;
    elements.log.textContent = "";

    logCharactersToConsole();
    logLine(`Benvenuto ${player.nome}!`);
    logLine(`Un ${monster.nome} selvatico appare!`);
    updatePanels();
    setActionsEnabled(true);
}

function bindEvents() {
    elements.attackButton.addEventListener("click", playerAttack);
    elements.healButton.addEventListener("click", playerHeal);
    elements.fleeButton.addEventListener("click", playerFlee);
    elements.newGameButton.addEventListener("click", startNewBattle);
}

function initializeGame() {
    bindEvents();
    startNewBattle();
}

initializeGame();
