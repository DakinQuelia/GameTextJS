/*****************************************
*	Jeu / Game :: Fichier principal
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Game from './game/game.js';

const button_about = document.querySelector("#gabout");
const button_save = document.querySelector("#gsave");
const form_savegame = document.querySelector("#savegame-form");

button_about.addEventListener("click", (e) => 
{ 
    Game.OpenWindow(e, { title: "A propos" });
});

button_save.addEventListener("click", (e) => 
{ 
    Game.OpenWindow(e, { title: "Sauvegarder la partie" });
});

