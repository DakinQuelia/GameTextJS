/*****************************************
*	Gestion des lancers de dés
*   ----------------------------
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
class Dices
{
    /**
    *   Le constructeur
    * 
    *   @return {void}
    **/
    constructor()
    {
        this.dices = 0;
        this.sides = 0;
        this.rolls = [];
        this.results = "";
        this.format = new RegExp(/(\d+)d(\d+)$/i);
    }

    /**
    *   Cette méthode permet d'exécuter le lancer de dés.
    * 
    *   @param {string} dices                                           Jet de dés (exemple : 1d10)
    *   @param {object} data                                            Données : { modifier: 1, text: "..." }
    * 
    *   @return {number}
    **/
    Rolls(dices, data = {})
    {
        let dicesMatch = this.format.exec(dices);

        this.dices = parseInt(dicesMatch[1]);
        this.sides = parseInt(dicesMatch[2]);

        return this.GetResults();
    }

    /**
    *   Cette méthode permet de récupérer le nombre de dés jetés.
    * 
    *   @return {number}
    **/
    GetDices()
    {
        return this.dices;
    }

    /**
    *   Cette méthode permet de récupérer le nombre de faces des dès.
    * 
    *   @return {number}
    **/
    GetSides()
    {
        return this.sides;
    }

    /**
    *   Cette méthode permet d'obtenir le résultat final.
    * 
    *   @return {number} 
    **/
    GetResults()
    {
        return Math.floor(Math.random() * (this.sides - this.dices + 1)) + this.dices;
    }
}

export default new Dices();