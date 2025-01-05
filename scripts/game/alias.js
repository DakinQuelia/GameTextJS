/*****************************************
*	Alias des commandes
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/ 
import Game from "./game.js";
import Command from "./system/command.js";
import Items from "./system/items.js";

/******************************************
*   Jeu (Game)
******************************************/
export function GetPlayer()
{
    return Game.GetPlayer();
}

/******************************************
*   Commandes
******************************************/
export function NPCCommand()
{
    return Command.NPCCommand();
}

export function ExitCommand()
{
    return Command.ExitCommand();
}

/******************************************
*   Objets 
******************************************/
export function CreateItem(item)
{
    return Items.CreateItem(item);
}

export function GetItems()
{
    return Items.GetItems();
}

export function GetItem(item)
{
    return Items.GetItem(item);
}

export function AddItem(item)
{
    return Items.AddItem(item, amount);
}

/******************************************
*   Personnage Non-Joueurs (NPC) 
******************************************/
