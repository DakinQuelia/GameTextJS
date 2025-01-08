/*****************************************
*	Gestion des lancers de dés
*   ----------------------------
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Utils from "./utils.js";

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
        this.total = 0;
        this.result = {};
        this.results = [];
        this.rolls = [];
        this.dicef = null;
        this.modifier = null;
        this.text = "";
        this.format = new RegExp(/(\d+)d(\d+)$/i);
    }

    /**
    *   Cette méthode permet d'exécuter le lancer de dés.
    * 
    *   @param {string} dices                                           Jet de dés (exemple : 1d10)
    *   @param {object} data                                            Données : { modifier: "+1", text: "..." }
    * 
    *   @return {number}
    **/
    Rolls(dices, data = {})
    {
        let dicesMatch = this.format.exec(dices);

        this.dicef = dices;
        this.dices = parseInt(dicesMatch[1]);
        this.sides = parseInt(dicesMatch[2]);
        this.modifier = data.modifier ? data.modifier : null;

        do 
        {
            this.rolls.push(this.GetDicesRoll());
        }
        while(this.rolls.length < this.dices);

        return this.rolls;
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
    *   Cette méthode permet d'obtenir le lancer de dés.
    * 
    *   @return {number} 
    **/
    GetDicesRoll()
    {
        return Math.floor(Math.random() * (this.sides - this.dices + 1)) + this.dices;
    }

    /**
    *   Cette méthode permet d'obtenir le résultat total.
    * 
    *   @return {number} 
    **/
    GetResults()
    {
        let roll = this.rolls.map((roll) => roll).join(" + ");
        let total = this.GetModifier();
        let modifier = this.modifier ? `(${this.modifier}) = ${total}` : "";

        return `(${roll}) = ${this.GetTotal()} ${modifier}`;
    }

    /**
    *   Cette méthode permet de récupérer le total du modificateur.
    * 
    *   @return {number}
    **/
    GetModifier()
    {
        let total;
        let modifier_n = parseInt(this.modifier.slice(1));
        let modifier_c = this.modifier.slice(0).charAt(0);

        if (modifier_c === "+")
        {
            total = this.GetTotal() + modifier_n;
        }
        else
        {
            total = this.GetTotal() - modifier_n;
        }

        return total;
    }

    /**
    *   Cette méthode permet d'obtenir le total final.
    * 
    *   @return {number}
    **/
    GetTotal()
    {
        return Utils.Sum(this.rolls);
    }

    /**
    *   Cette méthode permet d'obtenir le total final.
    * 
    *   @param {array} items                                            Eléments à calculer  
    * 
    *   @return {number}
    **/
    SetTotal(items)
    {
        return Utils.Sum(items);
    }

    /**
    *   Cette méthode permet d'afficher le résultat.
    * 
    *   @return {void}
    **/
    DisplayResults()
    {
        const dices_content = document.querySelector(".dices-content");

        if (dices_content === typeof undefined || dices_content === null)
        {
            return false;
        }

        dices_content.innerHTML = `
            <div>
                <strong>Jet de dés</strong>  : ${this.dicef} 
            </div>
            <div>
                <strong>Résultat</strong>    : ${this.GetResults()}
            </div>
        `;
    }
}

export default new Dices();