/*****************************************
*	GameText :: Joueur
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Utils from "../lib/utils.js";

const ROOT = location.protocol + '//' + location.host;
const ASSETS_ROOT = ROOT + '/assets';
const DATA_ROOT = ROOT + '/data';
const SCRIPTS_ROOT = ROOT + '/scripts';
const DATABASE_ROOT = DATA_ROOT + '/database';

class Player
{
    /**
	*	Constructeur
    *
    *   @return {void}
	**/
    constructor()
    {
        /* Global */
        this.points_stats_max = 30;
        this.points_skills_max = 20;
        this.value = 0;
        this.name = "";
        this.classes = [];
        this.stats = [];
        this.skills = [];
        this.feats = [];
        this.modifiers = [];
        this.inventory = [];
        this.errors = [];
        this.total = { stats: 0, skills: 0 };
        this.points = { stats: 0, skills: 0 };
        this.stats_modifier = "";

        /* Eléments HTML */
        this.character_name = document.querySelector("#character_name") ? document.querySelector("#character_name") : null;
        this.character_class = document.querySelector("#character_class") ? document.querySelector("#character_class") : null;
        this.stats_number = document.querySelectorAll('#stats input[type="number"]') ? document.querySelectorAll('#stats input[type="number"]') : null;
        this.skills_number = document.querySelectorAll('#skills input[type="number"]') ? document.querySelectorAll('#skills input[type="number"]') : null;
        this.button_copy = document.querySelector("#gcopy") ? document.querySelector("#gcopy") : null;
        this.button_play = document.querySelector("#play") ? document.querySelector("#play") : null;
        this.button_cancel = document.querySelector("#cancel") ? document.querySelector("#cancel") : null;
        this.header_stats_points = document.querySelector("#points_stats .points") ? document.querySelector("#points_stats .points") : null;
        this.header_skills_points = document.querySelector("#points_skills .points") ? document.querySelector("#points_skills .points") : null;
        this.stats_input_name = document.querySelectorAll("#stats .category-name") ? document.querySelectorAll("#stats .category-name") : null;
        this.stats_container = document.querySelector("#stats") ? document.querySelector("#stats") : null;
        this.stat_category = document.querySelectorAll("#stats .sub-category") ? document.querySelectorAll("#stats .sub-category") : null;
        this.stat_category_name = document.querySelectorAll("#stats .category-name") ? document.querySelectorAll("#stats .category-name") : null;
    }

    /**
    *   Cette méthode permet de vérifier que le joueur ne dépasse pas le quota des points.
    * 
    *   @return {void}
    **/
    CheckPoints()
    {
        /* On récupère les valeurs des caractéristiques */
        this.stats_number.forEach((input, index, parent) => 
        {
            let stat = parent[index].name;
        
            this.value = input.value;
        
            /*
            input.addEventListener("change", () =>
            { 
            
            });
            */
        
            if (!isNaN(this.value) && this.value.length !== 0) 
            {
                this.total.stats += parseInt(this.value);
                this.points.stats = this.points_stats_max - parseInt(this.total.stats);
            }
            else
            {
                this.total.stats -= parseInt(this.value);
                this.points.stats = this.points_stats_max + parseInt(this.total.stats);
            }
        
            if (this.points.stats > 0)
            {
                this.header_stats_points.innerHTML = `${this.points.stats} points`;
                input.style.disabled = "true";
            }
            else
            {
                this.header_stats_points.innerHTML = `0 points`;
            }

            if (this.value === null)
            {
                this.stats_modifier = "-";
            }

            if (this.value < 8)
            {
                this.stats_modifier = "-1";
            }
        
            if (this.value >= 10)
            {
                this.stats_modifier = "0";
            }
        
            if (this.value >= 12)
            {
                this.stats_modifier = "+1";
            }
            
            if (this.value >= 14)
            {
                this.stats_modifier = "+2";
            }
        
            if (this.value >= 16)
            {
                this.stats_modifier = "+3";
            }
        
            if (this.value >= 18)
            {
                this.stats_modifier = "+4";
            }
        
            this.modifiers.push({ stat: stat, value: (this.stats_modifier !== "0" || this.stats_modifier !== null || this.stats_modifier !== "") ? this.stats_modifier : "--", color: this.GetModifier(this.stats_modifier).color });
        });

        /* On injecte les modificateurs dans la liste */
        this.stat_category_name.forEach((cat, key) => 
        {   
            let modifierHTML = document.createElement("div");
        
            /* On récupère les modificateurs */
            this.GetModifiers().forEach(() =>
            {
                modifierHTML.id = `modifier[${key+1}]`;
                modifierHTML.classList.add("modifier");
                modifierHTML.style.setProperty("--modifier-color", this.modifiers[key].color);
                modifierHTML.innerText = `(${this.modifiers[key].value})`;
            });
        
            cat.parentNode.appendChild(modifierHTML);
        });

        /* On récupère les valeurs des compétences */
        this.skills_number.forEach((input, index) => 
        {
            this.value = input.value;
        
            if (!isNaN(this.value) && this.value.length !== 0) 
            {
                this.total.skills += parseInt(this.value);
                this.points.skills = this.points_skills_max - parseInt(this.total.skills);
            }
            else
            {
                this.points.skills = this.points_skills_max + parseInt(this.total.skills);
            }
        
            if (this.points.skills > 0)
            {
                this.header_skills_points.innerHTML = `${this.points.skills} points`;
            }
            else
            {
                this.header_skills_points.innerHTML = `0 points`;
            }
        });
    }

    /**
    *   Cette méthode permet de retourner le nom du joueur.
    * 
    *   @return {string}
    **/
    GetName()
    {
        return this.name ? this.name : "Inconnu";
    }

    /**
    *   Cette méthode permet de récupérer le modificateur.
    *
    *   @param {object} modifier                                            Modificateur
    * 
    *   @return {object}
    **/
    GetModifier(modifier)
    {
        let color;

        if (modifier === null || modifier === typeof undefined)
        {
            return {
                color: "#000000"
            };
        }

        let modifier_c = modifier.slice(0).charAt(0);

        if (modifier_c === "+")
        {
            color = "#008000";
        }
        else if(modifier_c === "-")
        {
            color = "#FF0000";
        }
        else
        {
            color = "#000000";
        }

        return {
            color,
        };
    }

    /**
    *   Cette méthode permet de récupérer les modificateurs.
    * 
    *   @return {array}
    **/
    GetModifiers()
    {
        return this.modifiers;
    }

    /**
    *   Cette méthode permet de créer le joueur avec les statistiques et compétences. 
    * 
    *   @return {void}
    **/
    CreatePlayer()
    {

    }

    /**
    *   Cette méthode permet de récupérer les données des aides
    * 
    *   @return {void} 
    **/
    GetHelpData()
    {

    }

    /**
    *   Cette méthode permet d'inclure les popovers d'aide.
    * 
    *   @param {object} data                                            Données de l'aide
    * 
    *   @return {void} 
    **/
    CreateHelp(data)
    {
        let title = data.name;
        let desc = data.desc.split("\n\n");

        let help = `
        <div class="popover" role="tooltip" data-placement="bottom">
            <span tabindex="0" data-toggle="popover" data-popover="text-test">
                <i class="fas fa-info-circle help"></i>
            </span>
            <div class="popover-content" style="width: 400px;">
                <h3 class="popover-header">${title}</h3>
                <div class="popover-body">
                    <p>Caractéristique associée : Intelligence</p>
                    <p>Informatique permet au personnage de s'infiltrer dans les systèmes informatiques à l'aide de programmes spécialement prévus dans ce but. Il est possible de s'en servir pour mettre une tourelle automatique hors service ou inonder un secteur patrouillé, par exemple, mais aussi d'accomplir des tâches bien plus complexes, à condition d'utiliser davantage de programmes d'intrusion. Lorsque cette caractéristique atteint un niveau élevé, le nombre de programmes d'intrusion nécessaires est réduit de 1 (avec une limite inférieure de 1) tous les 4 points en Réparation, modificateurs de caractéristiques inclus.</p>
                </div>
            </div>
        </div>`;

        //this.stat_category.querySelector("span input").parentNode;
    }

    /**
    *   Cette méthode permet d'afficher les erreurs.   
    *   
    *   @return {void}
    **/
    DisplayErrors()
    {
        const errors_tag = document.querySelector("#errors");

        if (errors_tag === typeof undefined)
        {
            return false;
        }

        const errors_container = errors_tag.querySelector(".errors");

        if (this.total.stats > this.points_stats_max)
        {
            this.errors.push("Vous ne pouvez pas dépasser le montant maximum des points de caractéristiques."); 
        }
            
        if (this.total.skills > this.points_skills_max)
        {
            this.errors.push("Vous ne pouvez pas dépasser le montant maximum des points de compétences.");
        }
            
        if (this.errors.length > 0)
        {
            errors_tag.style.display = "block";
            
            this.errors.forEach((error, index) =>
            {
                const error_li = document.createElement("li");
            
                error_li.id = `error-${index}`;
                error_li.textContent = error;
                errors_container.appendChild(error_li);
            });
        }
        else
        {
            errors_tag.style.display = "none";
            this.errors = [];
        }
    }

    /**
    *   Cettte méthode permet de récupérer les classes du jeu.
    * 
    *   @return {array} 
    **/
    async GetClasses()
    {
        return await fetch(`${DATABASE_ROOT}/classes.json`)
            .then(response => response.json())
            .then(data =>
            { 
                return data ? data : []; 
            })
            .catch((err) => { console.log('ERROR :: ' + err); });;
    }

    /**
    *   Cette méthode initialise la classe "joueur".
    * 
    *   @return {void}
    **/
    async Init()
    {
        /* On vide les champs */
        this.button_cancel.addEventListener("click", () =>
        {
            this.stats_number.forEach((input, index) => 
            {
                this.stats_number[index].value = 0;
            });
        
            this.skills_number.forEach((input, index) => 
            {
                this.skills_number[index].value = 0;
            });

            this.character_name.value = "";
            this.character_class.selectedIndex = 0;
        });

        /* Bouton :: "Jouer" */
        this.button_play.addEventListener("click", () =>
        {
            console.log("Jouer !!");  
        });

        /* Bouton :: Copier */
        this.button_copy.addEventListener("click", (e) =>
        {
            Utils.OpenWindow(e, { title: "Générateur" });  
        });

        /* Variables */
        this.classes = await this.GetClasses();
        
        /* Sélecteur de classe du personnage */
        this.classes.map(c => 
        {
            let select_class = document.createElement("option");
            
            select_class.text = c.name;
            select_class.id = c.id;

            this.character_class.add(select_class);
        });

        /* On vérifier que le joueur a placé ses points */
        this.CheckPoints();

        /* Erreurs */
        this.DisplayErrors();
    }
}

export default new Player();