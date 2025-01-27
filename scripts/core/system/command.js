/*****************************************
*	Jeu         : system/command.js
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
class Command
{
    /**
	*	Constructeur
    *
    *   @return {void}
	**/
    constructor()
    {
        this.commands = [];
        this.objects = [];
        this.rules = [];
    }

    /** 
    *   Cette méthode permet de vérifier si la commande existe.
    * 
    *   @param {object} command                                         Hash de la commande { name: "commande", type: "npc" }
    * 
    *   @return {void}
    **/
    AddCommand(command)
    {
        
    }

    /** 
    *   Cette méthode permet de vérifier si la commande existe.
    * 
    *   @return {boolean}
    **/
    CheckCommand()
    {

    }

    /** 
    *   Cette méthode permet de créer des commandes pour les PNJ.
    * 
    *   @return {void}
    **/
    NPCCommand()
    {

    }

    /** 
    *   Cette méthode permet de créer des commandes de sortie.
    *   Par exemple : sortir de la maison...
    * 
    *   @return {void}
    **/
    ExitCommand()
    {

    }
}

export default new Command();