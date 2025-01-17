/*****************************************
*	Jeu / Game :: Fichier principal
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import { FILES } from "../scripts/game/constants.js";
import { OpenWindow, Require, DisplayDateTime, GetPlayer, DisplayGameInfo, GameInit, SaveGame } from '../scripts/game/alias.js';
import { DicesRolls, DicesDisplayResults } from '../scripts/game/alias.js';
import Config from '../scripts/game/config/config.js';

/* Donnéees de jeu */
await GameInit();

let game_infos = await DisplayGameInfo();
let player_data = await GetPlayer();
let player_level = 0;

/* Eléments HTML */
const button_about = document.querySelector("#gabout");
const button_save = document.querySelector("#gsave");
const button_cmd = document.querySelector("#cmdsubmit");
const button_rules = document.querySelector("#grules");
const button_credits = document.querySelector("#gcredits");
const button_dices = document.querySelector("#gdices");
const button_save_form = document.querySelector("#savegame #savesubmit");
const modal_savegame = document.querySelector("#savegame");
const form_savegame = document.querySelector("#savegameform");
const error_save = document.querySelector("#error-save");
const show_date = document.querySelector(".sidebar-block.sidebar-time .datetime");
const pages_infos = document.querySelector(".page-infos");
const title_game = document.querySelector(".page-infos h1"); 
const page_content = document.querySelector(".page-content");
const player_name_tag =  document.querySelector("#playername");
const player_class_tag = document.querySelector("#klass .value");
const player_money_tag = document.querySelector("#money .value");
const player_hp_tag = document.querySelector("#hitpoints .value");
const player_pf_tag = document.querySelector("#forcepoints .value");
const player_level_tag = document.querySelector("#level .value");

pages_infos.innerHTML = `
    <h1>${game_infos.title}</h1>
    <span>Ecrit par : ${game_infos.author}</span>
`;
title_game.innerHTML = game_infos.title;
player_name_tag.textContent = player_data.name; 
player_class_tag.innerHTML = `<span style="color: ${player_data.classes[0].color}; font-weight: bold;">${player_data.classes[0].name}</span>`;
player_money_tag.innerHTML = `${player_data.money} Crédits`;
player_hp_tag.innerHTML = `${player_data.hit_points} / ${player_data.max_hit_points}`;
player_pf_tag.innerHTML = `${player_data.force_points} / ${player_data.max_force_points}`;

Object.values(player_data.classes).forEach((key, index) =>
{
    player_level += player_data.classes[index].level

    player_level_tag.innerHTML = player_level;
});

button_about.addEventListener("click", (e) => 
{ 
    OpenWindow(e, { title: "A propos" });
});

button_save.addEventListener("click", (e) => 
{ 
    OpenWindow(e, { title: "Sauvegarder la partie" });
});

button_rules.addEventListener("click", (e) => 
{ 
    OpenWindow(e, { title: "Règles du jeu" });
});

button_credits.addEventListener("click", (e) => 
{ 
    OpenWindow(e, { title: "Crédits du jeu" });
});

button_cmd.addEventListener("click", (e) => 
{

});

button_dices.addEventListener("click", (e) => 
{
    e.preventDefault();

    /* Jet de dés du jeu */
    //DicesRolls("1d20", { modifier: "+1" });
    DicesRolls("1d20", {});

    /* Afficher le résultat */
    DicesDisplayResults();
});

/* Sauvegarder la partie */
let filename = form_savegame.querySelector("#savename").value;

button_save_form.addEventListener("click", (e) => 
{
    e.preventDefault();

    SaveGame();
});

/* Afficher la date/heure */
setInterval(() => { show_date.textContent = DisplayDateTime('fr-FR'); }, 1000);