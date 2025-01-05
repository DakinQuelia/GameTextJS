/*****************************************
*	Alias des commandes
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/ 
import Command from "./system/command.js";
import Items from "./system/items.js";

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
*   Commandes
******************************************/
export function NPCCommand()
{

}

export function ExitCommand()
{

}