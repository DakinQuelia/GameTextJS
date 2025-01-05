/*****************************************
*	Jeu / Game :: Fichier principal
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Game from './game/game.js';

const button_about = document.querySelector("#gabout");

button_about.addEventListener("click", (e) => 
{ 
    Game.OpenWindow(e, { title: "A propos" });
});
