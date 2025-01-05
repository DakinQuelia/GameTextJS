/*****************************************
*	Alias des commandes
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/ 
import Command from "./system/command.js";
import Items from "./system/items.js";

export function CreateItem(item)
{
    Items.CreateItem(item);
}

export function GetItems()
{
    Items.GetItems();
}

export function GetItem(item)
{
    Items.GetItem(item);
}