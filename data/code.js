/*****************************************
*	Jeu / Game :: Fichier principal
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Config from '../scripts/game/config/config.js';
import { OpenWindow, DisplayDateTime, GetPlayer, DisplayGameInfo, GameInit } from '../scripts/game/alias.js';

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
const form_savegame = document.querySelector("#savegameform");
const button_save_form = document.querySelector("#savesubmit");
const show_date = document.querySelector(".sidebar-block.sidebar-time .datetime");
const pages_infos = document.querySelector(".page-infos");
const title_game = document.querySelector("#main > h1"); 
const page_content = document.querySelector(".page-content");
const player_name_tag =  document.querySelector("#playername");
const player_class_tag = document.querySelector("#klass .value");
const player_money_tag = document.querySelector("#money .value");
const player_hp_tag = document.querySelector("#hitpoints .value");
const player_pf_tag = document.querySelector("#forcepoints .value");
const player_level_tag = document.querySelector("#level .value");

pages_infos.innerHTML = `<span>Ecrit par : ${game_infos.author}</span>`;
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

button_cmd.addEventListener("click", (e) => 
{

});

/* Sauvegarder la partie */
button_save_form.addEventListener("click", (e) => 
{
    let filename = form_savegame.querySelector("#savename").value;
    
    if (filename === null || filename === "")
    {
        form_savegame.classList.add('form-invalid');

        let error_span = document.createElement('div');

        error_span.textContent = "Vous n'avez pas rempli le champ « Nom du fichier » !";
        error_span.style.marginLeft = "127px";
    
        form_savegame.appendChild(error_span);
    }
    else
    {
        form_savegame.classList.remove('form-invalid');
    }

    //
});

/* Afficher la date/heure */
setInterval(() => { show_date.textContent = DisplayDateTime('fr-FR'); }, 1000);

