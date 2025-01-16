/*****************************************
*	Alias des commandes
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/ 
import Utils from "../lib/utils.js";
import Dices from "../lib/dices.js";
import Command from "./system/command.js";
import Items from "./system/items.js";
import Rooms from "./system/rooms.js";
import Player from "./player.js";
import Game from "./game.js";

/******************************************
*   Utilitaires
******************************************/
export function OpenWindow(event, data)
{
    return Utils.OpenWindow(event, data);
}

export function DisplayDateTime()
{
    return Utils.DisplayDateTime();
}

export function Sum(items)
{
    return Utils.Sum(items);
}

export async function Require(url)
{
    return await Utils.Require(url);
}

/******************************************
*   Jeu (Game)
******************************************/
export function SaveGame(filename)
{
    return Game.SaveGame(filename);
}

export async function DisplayGameInfo() 
{
    return Game.DisplayGameInfo();
}

export async function GameInit()
{
    return await Game.Init();
}

export async function GetPlayer()
{
    return await Game.GetPlayer();
}

export async function PlayerInit()
{
    return await Player.Init();
}

/******************************************
*   Jet de dés
******************************************/
export function DicesRolls(dices, data = {})
{
    return Dices.Rolls(dices, data);
}

export function DicesDisplayResults()
{
    return Dices.DisplayResults();
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
*   Pièces (rooms)
******************************************/
export function CreateRoom(name, hash)
{
    return Rooms.CreateRoom(name, hash);
}

/******************************************
*   Personnage Non-Joueurs (NPC) 
******************************************/
