/*****************************************
*	Jeu         : system/items.js
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
class Items
{
    /**
    *   Initialisation de la classe.
    *   
    *   @return {void} 
    **/
    constructor()
    {
        this.items = [];
    }

    /**
    *   Cette méthode permet de récupérer tous les objets.
    * 
    *   @return {array}
    **/
    GetItems()
    {
        return this.items;
    }

    /**
    *   Cette méthode permet de récupérer un objet en particulier.
    * 
    *   @return {object}
    **/
    GetItem()
    {
        return {

        };
    }

    /**
    *   Cette méthode permet de créer un objet.
    * 
    *   @param {object} item                                            Hash de l'objet { id: 0, name: "Objet", description: "...", icon: "..." }
    *
    *   @return {void}
    **/
    CreateItem(item)
    {
        this.items.push(item);
    }

    /**
    *   Cette méthode permet d'ajouter un objet à l'inventaire du joueur.
    * 
    *   @param {object} item                                            Objet à ajouter
    *   @param {number} amount                                          Nombre d'objet
    * 
    *   @return {void}
    **/
    AddItem(item, amount)
    {

    }
}

export default new Items();