/*****************************************
*	Jeu / Game :: Fichier principal
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Config from './game/config/config.js';
import Game from './game/game.js';
import { CreateItem, GetItems } from './game/alias.js';

const button_about = document.querySelector("#gabout");
const button_save = document.querySelector("#gsave");
const form_savegame = document.querySelector("#savegame-form");
const show_date = document.querySelector(".sidebar-time .datetime");

//console.log(Game.prototype.GetPlayer());
CreateItem({ name: "Test", description: "Ceci est un test", amount: 1 });
CreateItem({ name: "Objet", description: "Ceci est un second test", amount: 1 });
CreateItem({ name: "ABDev", description: "C'est un super poto !!", amount: 1 });

console.log(GetItems());

/**
show_date.innerHTML == DisplayDateTime();
*/

button_about.addEventListener("click", (e) => 
{ 
    Game.OpenWindow(e, { title: "A propos" });
});

button_save.addEventListener("click", (e) => 
{ 
    Game.OpenWindow(e, { title: "Sauvegarder la partie" });
});

