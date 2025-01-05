/*****************************************
*	Jeu / Game :: Fichier principal
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Config from './game/config/config.js';
import Game from './game/game.js';
import Utils from './lib/utils.js';
import { CreateItem, GetItems, GetPlayer, DisplayGameInfo } from './game/alias.js';

const button_about = document.querySelector("#gabout");
const button_save = document.querySelector("#gsave");
const button_cmd = document.querySelector("#cmdsubmit");
const form_savegame = document.querySelector("#savegame-form");
const show_date = document.querySelector(".sidebar-time .datetime");
const pages_infos = document.querySelector(".page-infos");
const title_game = document.querySelector("#main > h1");

let game_infos = await DisplayGameInfo();

pages_infos.innerHTML = `<span>Ecrit par : ${game_infos.author}</span>`;
title_game.innerHTML = game_infos.title;

/**
show_date.innerHTML == DisplayDateTime();
*/

button_about.addEventListener("click", (e) => 
{ 
    Utils.OpenWindow(e, { title: "A propos" });
});

button_save.addEventListener("click", (e) => 
{ 
    Utils.OpenWindow(e, { title: "Sauvegarder la partie" });
});

button_cmd.addEventListener("click", (e) => 
{

});

