/*****************************************
*	Jeu / Game :: Fichier principal
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Config from '../scripts/game/config/config.js';
import Game from '../scripts/game/game.js';
import Utils from '../scripts/lib/utils.js';
import { OpenWindow, GetPlayer, DisplayGameInfo, GameInit } from '../scripts/game/alias.js';

/* Donnéees de jeu */
await GameInit();

let game_infos = await DisplayGameInfo();
let player_data = await GetPlayer();

/* Eléments HTML */
const button_about = document.querySelector("#gabout");
const button_save = document.querySelector("#gsave");
const button_cmd = document.querySelector("#cmdsubmit");
const form_savegame = document.querySelector("#savegame-form");
const show_date = document.querySelector(".sidebar-time .datetime");
const pages_infos = document.querySelector(".page-infos");
const title_game = document.querySelector("#main > h1"); 
const player_name_tag =  document.querySelector("#playername");
const player_class_tag = document.querySelector("#klass .value");
const player_money_tag = document.querySelector("#money .value");
const player_hp_tag = document.querySelector("#hitpoints .value");
const player_pf_tag = document.querySelector("#forcepoints .value");

pages_infos.innerHTML = `<span>Ecrit par : ${game_infos.author}</span>`;
title_game.innerHTML = game_infos.title;
player_name_tag.textContent = player_data.name; 
player_class_tag.innerHTML = `<span style="color: ${player_data.classes[0].color}; font-weight: bold;">${player_data.classes[0].name}</span>`;
player_money_tag.innerHTML = `${player_data.money} Crédits`;
player_hp_tag.innerHTML = `${player_data.hit_points} / ${player_data.max_hit_points}`;
player_pf_tag.innerHTML = `${player_data.force_points} / ${player_data.max_force_points}`;

/**
show_date.innerHTML == DisplayDateTime();
*/

button_about.addEventListener("click", (e) => 
{ 
    OpenWindow(e, { title: "A propos" });
});

button_save.addEventListener("click", (e) => 
{ 
    OpenWindow(e, { title: "Sauvegarder la partie" });
});

button_cmd.addEventListener("click", (e) => 
{

});

