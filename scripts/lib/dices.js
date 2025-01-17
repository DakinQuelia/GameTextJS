/*****************************************
*	Gestion des lancers de dés
*   ----------------------------
*	Auteur 		: Dakin Quelia <dakinquelia@gmail.com>
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
        this.dicef = null;
        this.modifier = null;
        this.text = "";
        this.classCSS = "dices-modifier";
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
        let rolls = [];
        let dicesMatch = this.format.exec(dices);

        this.dicef = dices;
        this.dices = parseInt(dicesMatch[1]);
        this.sides = parseInt(dicesMatch[2]);
        this.modifier = data.modifier ? data.modifier : null;
        this.text = data.text ? data.text : "";

        do 
        {
            rolls.push(this.GetDicesRoll());
        }
        while(rolls.length < this.dices);

        this.result = {
            sides: this.sides,
            dices:  this.dices,
            text: this.text,
            modifier: this.modifier,
            rolls: rolls
        };

        this.results.push(this.result);
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
        return Math.floor(Math.random() * (this.GetSides() - this.GetDices() + 1)) + this.GetDices();
    }

    /**
    *   Cette méthode permet d'obtenir le résultat total.
    * 
    *   @return {number} 
    **/
    GetResults()
    {
        let rolls = this.result.rolls;
        let roll = rolls.map(r => r).join(" + ");
        let total = this.GetModifier().total;
        let color = this.GetModifier().color;
        let style = `--dices-modifier-color: ${color};`;
        let modifier = this.modifier ? `(<span style="${style}" class="${this.classCSS}">${this.modifier}</span>) = ${total}` : "";

        return `(${roll}) = ${this.GetTotal()} ${modifier}`;
    }

    /**
    *   Cette méthode permet de récupérer le total du modificateur.
    * 
    *   @return {object}
    **/
    GetModifier()
    {
        let total;
        let color;

        if (this.modifier === null || this.modifier === typeof undefined)
        {
            return false;
        }

        let modifier_n = parseInt(this.modifier.slice(1));
        let modifier_c = this.modifier.slice(0).charAt(0);

        if (modifier_c === "+")
        {
            color = "#008000";
            total = this.GetTotal() + modifier_n;
        }
        else
        {
            color = "#FF0000";
            total = this.GetTotal() - modifier_n;
        }

        return {
            color,
            total
        };
    }

    /**
    *   Cette méthode permet d'obtenir le total final.  
    * 
    *   @return {number}
    **/
    GetTotal()
    {
        return Utils.Sum(this.result.rolls);
    }

    /**
    *   Cette méthode permet d'afficher le résultat.
    * 
    *   @return {void}
    **/
    DisplayResults()
    {
        const dices_content = document.querySelector("#dicesresult");
        const dice_result = document.createElement('div');
        const dice_text = this.text;

        if (dices_content === typeof undefined || dices_content === null)
        {
            return false;
        }

        dice_result.classList.add("dices-content");

        dice_result.innerHTML = `
            <div class="title">Lancer(s) de dés ${this.text ? ":: " + dice_text : ""} </div>
            <div id="rolldice">
                <strong>Jet de dés</strong>  : ${this.dicef} 
            </div>
            <div id="result">
                <strong>Résultat</strong>    : ${this.GetResults()}
            </div>
        `;

        dices_content.appendChild(dice_result);
    }
}

export default new Dices();