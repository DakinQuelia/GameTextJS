/*****************************************
*	Jeu         : system/command.js
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
class Command
{
    /**
	*	Constructeur
	**/
    constructor(name, hash)
    {
        this.name = name;
        this.hash = hash;
        this.objects = [];
        this.rules = [];
    }

    /** 
    *   Cette méthode permet de créer des commandes pour les PNJ.
    **/
    NPCCommand()
    {

    }

    /** 
    *   Cette méthode permet de créer des commandes de sortie.
    *   Par exemple : sortir de la maison...
    **/
    ExitCommand()
    {

    }
}

export default Command;