# RPG Battle Arena

> Un gioco RPG a turni in JavaScript, progettato per mostrare una battaglia tra un eroe personalizzato e mostri casuali.

## Sommario

- [RPG Battle Arena](#rpg-battle-arena)
  - [Sommario](#sommario)
  - [Descrizione del progetto](#descrizione-del-progetto)
  - [Struttura del repository](#struttura-del-repository)
  - [Tecnologie](#tecnologie)
  - [Funzione del gioco](#funzione-del-gioco)
  - [Caratteristiche](#caratteristiche)
  - [Requisiti](#requisiti)
  - [Installazione](#installazione)
  - [Come giocare](#come-giocare)
  - [Meccaniche di gioco](#meccaniche-di-gioco)
  - [Personaggi](#personaggi)
    - [Eroe](#eroe)
    - [Mostri](#mostri)

## Descrizione del progetto

Questo progetto è una piccola demo di gioco in-browser realizzata in JavaScript vanilla. L'obiettivo è creare una semplice esperienza RPG con un flusso di battaglia a turni e una UI immediata.

## Struttura del repository

```text
/
├── index.html    # Pagina gioco e UI
├── rpg.js        # Logica del gioco a turni
└── README.md     # Documentazione del progetto
```

## Tecnologie

* [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
* [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)


Progetto realizzato come esercizio per migliorare le abilità JavaScript e l'interazione con il DOM.

## Funzione del gioco

Il gioco permette di:
- creare un eroe con nome personalizzato;
- affrontare un mostro casuale (Goblin, Orco o Drago);
- scegliere tra attacco, cura o fuga;
- visualizzare l'esito di ogni turno tramite un log in pagina;
- vedere le statistiche dei personaggi anche nella console del browser.

## Caratteristiche

- Sistema di combattimento a turni
- Statistiche dinamiche per eroe e mostro
- Log di battaglia in HTML
- Elenco dei personaggi nella console
- UI semplice e navigabile

## Requisiti

- Un browser moderno (Chrome, Firefox, Edge, Safari)
- Nessuna installazione richiesta

## Installazione

1. Clona la cartella del progetto o scarica i file.
2. Apri `index.html` in un browser.

> Il progetto non richiede server o build tool: basta un semplice file system browser.

## Come giocare

1. Apri `index.html` nel browser.
2. Inserisci il nome del tuo eroe nel prompt.
3. Scegli una delle azioni disponibili:
   - `Attacca`
   - `Cura`
   - `Fuggi`
4. Segui il registro di battaglia nella schermata per sapere cosa succede.
5. Premi `Nuova Battaglia` per ricominciare con un nuovo mostro.

## Meccaniche di gioco

- `Attacca`: calcola danno come `attacco - difesa`
- `Cura`: ripristina 20 punti vita fino a un massimo di 100
- `Fuggi`: tenta la fuga con una probabilità basata sul mostro
- Il mostro contrattacca dopo ogni azione del giocatore, se ancora in vita
- Il gioco termina quando i punti vita dell'eroe o del mostro raggiungono 0, oppure quando la fuga riesce

## Personaggi

Sono presenti due tipi di personaggi:

### Eroe
- Nome personalizzato dall'utente
- Vita massima: 100
- Attacco e difesa generati casualmente
- 3 cure disponibili

### Mostri
- Goblin
- Orco
- Drago

Ogni mostro ha statistiche diverse e una probabilità di fuga specifica.

> All'inizio di ogni battaglia, le statistiche dell'eroe e dei mostri vengono stampate anche nella console del browser.
