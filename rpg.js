// Creazione del personaggio (nome scelto dall’utente, vita = 100, attacco e difesa)
function creaPersonaggio(nome) {
    return {
      nome: nome,
      vita: 100,
      attacco: Math.floor(Math.random() * 11) + 5, // Random attacco tra 5 e 15
      difesa: Math.floor(Math.random() * 6) + 3, // Random difesa tra 3 e 8
      conteggioCure: 3,
      cura: function() {
        if (this.conteggioCure > 0) {
          this.vita += 20;
          this.conteggioCure--;
          console.log(this.nome + " si cura di 20 punti vita. Rimangono " + this.conteggioCure + " cure.");
        } else {
          console.log(this.nome + " non può più curarsi!");
        }
      }
    };
  }
  // Selezione randomica di mostri
function selezionaMostroCasuale() {
    const mostri = [
      { nome: "Goblin", vita: 50, attacco: 8, difesa: 2, probabilitaFuga: 0.8 },
      { nome: "Orco", vita: 80, attacco: 12, difesa: 5, probabilitaFuga: 0.5 },
      { nome: "Drago", vita: 150, attacco: 20, difesa: 10, probabilitaFuga: 0.1 }
    ];
    return mostri[Math.floor(Math.random() * mostri.length)];
  }
  
  let giocatore = creaPersonaggio(prompt("Inserisci il nome del tuo personaggio:"));
  console.log(`Benvenuto ${giocatore.nome}!\nVita: ${giocatore.vita}\nAttacco: ${giocatore.attacco}\nDifesa: ${giocatore.difesa}`);
  
  let mostro = selezionaMostroCasuale();
  console.log(`\nUn mostro selvatico appare!\nNome mostro: ${mostro.nome}\nVita mostro: ${mostro.vita}\nAttacco mostro: ${mostro.attacco}\nDifesa mostro: ${mostro.difesa}`);
  
  function gestisciAttacco(attaccante, difensore) {
    let danno = Math.max(attaccante.attacco - difensore.difesa, 0);
    difensore.vita -= danno;
    console.log(`${attaccante.nome} attacca ${difensore.nome} e infligge ${danno} danni.`);
  }
  
  while (giocatore.vita > 0 && mostro.vita > 0)  
  