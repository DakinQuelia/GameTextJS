/*****************************************
*	GameText :: Joueur
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import { FILES } from "./constants.js";
import Utils from "../lib/utils.js";
import RPG from "../lib/rpg.js";
import Config from "../../data/settings.js"

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
        this.points_stats_max = Config.points.stats_max ? Config.points.stats_max : 30;                           // Maximum de points de stats
        this.points_skills_max = Config.points.skills_max ? Config.points.skills_max : 20;                        // Maximum de points pour compétences
        this.stats_default_value = Config.base_points ? Config.base_points : 0;                                   // Défaut : 0 | Kotor = 8 par défaut
        this.point_diff = 0;
        this.value = 0;
        this.cost = 0;
        this.diff = 0;
        this.name = "";
        this.helps = [];
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
        this.form = document.querySelector("#create_character") ? document.querySelector("#create_character") : null;
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
        this.skill_category = document.querySelectorAll("#skills .sub-category") ? document.querySelectorAll("#skills .sub-category") : null;
        this.skill_category_name = document.querySelectorAll("#skills .category-name") ? document.querySelectorAll("#skills .category-name") : null;
    }

    /**
    *   Cette méthode permet de valider le formulaire et créer le personnage.
    *  
    *   @return {void}
    **/
    ValidateForm()
    {
        this.stats_base = [ "stats_vigor", "stats_reflex", "stats_willingness" ];

        this.stats_base.forEach(st => 
        {
            let input = document.querySelector(`${st}`);


        });

        //
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
            let min = (input.hasAttribute('min') && input.getAttribute('min') === Config.base_points) ? input.getAttribute('min') : 0;

            this.value = parseInt(input.value);
            this.diff = parseInt(this.value) - parseInt(min);
            this.stats.push({ name: input.name, value: input.value, diff: this.diff });
            this.total.stats = 0;
            this.points.stats = 0;

            /*
            input.addEventListener("input", (e) =>
            { 
                e.stopPropagation();
            });            
            */

            /* Calcul des points */
            if (this.cost <= this.points_stats_max)
            {
                this.cost += Math.abs(this.diff);
                this.total.stats += this.cost;
                this.points.stats = this.points_stats_max - this.total.stats;
            }
            else if (this.value > Config.base_points)
            {
                this.cost -= Math.abs(this.diff);
                this.total.stats -= this.cost;
                this.points.stats = this.points_stats_max + this.total.stats;
            }
            else
            {
                this.points.stats = 30;
            }

            /* En-tête dynamique */
            if (this.points.stats > 0)
            {
                this.header_stats_points.innerHTML = `${this.points.stats} points`;
            }
            else if (this.points.stats <= 0)
            {
                this.header_stats_points.innerHTML = `0 points`;
            }
            else
            {
                this.header_stats_points.innerHTML = `30 points`;
            }

            /* Vérification de la valeur */
            if (this.value === null)
            {
                this.stats_modifier = "-";
            }

            if (this.value < 10)
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

            if (this.value >= 20)
            {
                this.stats_modifier = "+5";
            }
        
            this.modifiers.push({ stat: stat, value: (this.stats_modifier !== "0" || this.stats_modifier !== null || this.stats_modifier !== "") ? this.stats_modifier : "--", color: this.GetModifier(this.stats_modifier).color });
        });

        /* On injecte les modificateurs dans la liste */
        this.stat_category_name.forEach((cat, key) => 
        {   
            let modifierHTML = document.createElement("div");

            if (typeof this.modifiers[key] === "undefined")
            {
                return false;
            }
        
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
    *   Cette méthode permet de récupérer le niveau du personnage.
    * 
    *   @param {object} data                                            Données du joueur
    * 
    *   @return {number} 
    **/
    GetLevel(data)
    {
        let player_level = 0;
        let player_classes = data;

        if (typeof player_classes === "undefined" || player_classes === null)
        {
            return player_level;
        }
        
        Object.values(player_classes).forEach((key, index) =>
        {
            player_level += player_classes[index].level;

            return player_level;
        });

        return player_level;
    }

    /**
    *   Cette méthode permet de récupérer le coût de l'attribut.
    * 
    *   @param {number} index                                           Index de la stat
    * 
    *   @return {number}
    **/
    GetAttributeCost(index = 0)
    {
        let mod = 0;
        let input = this.stats;
    
        switch(index)
        {
            case 0:
                mod = Math.floor((input[0].value - 10)/2);
            break;
            case 1:
                mod = Math.floor((input[1].value - 10)/2);
            break;
            case 2:
                mod = Math.floor((input[2].value - 10)/2);
            break;
            case 3:
                mod = Math.floor((input[3].value - 10)/2);
            break;
            case 4:
                mod = Math.floor((input[4].value - 10)/2);
            break;
            case 5:
                mod = Math.floor((input[5].value - 10)/2);
            break;
        }
            
        return Math.max(1, mod);
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
    *   Cette méthode permet d'inclure les popovers d'aide.
    * 
    *   @param {object} data                                            Données de l'aide
    * 
    *   @return {string} 
    **/
    CreateHelp(data)
    {
        let title = data.name;
        let desc = data.desc;
        let description = "";

        if (typeof data === "undefined")
        {
            return false;
        }

        if (desc.length > 0)
        {
            let paragraphs = desc.split("\n\n");

            paragraphs.forEach(d => 
            {
                description += `<p>${d}</p>`;
            });
        }
        else
        {
            description = desc;
        }

        return `
            <span tabindex="0" data-toggle="popover" data-popover="text-test">
                <i class="fas fa-info-circle help"></i>
            </span>
            <div class="popover-content" style="width: 400px;">
                <h3 class="popover-header">${title}</h3>
                <div class="popover-body">
                    ${description}
                </div>
            </div>
        `;
    }

    /**
    *   Cette méthode permet d'afficher les aides.
    * 
    *   @return {void} 
    **/
    DisplayHelp()
    {
        if (this.helps.length <= 0)
        {
            return false;
        }

        /* Aides sur les caractéristiques */
        this.stat_category.forEach((cat, index) => 
        {
            let help = document.createElement("div");

            let help_data = this.helps.map((h) => 
            {
                if (typeof h.stats[index] === "undefined")
                {
                    return false;
                }

                return this.CreateHelp({ name: h.stats[index].name, desc: h.stats[index].desc });
            });

            const span = cat.querySelector("#inputstat input") ? cat.querySelector("#inputstat input") : cat.querySelector("#inputstat span.input-stat");

            if (typeof span === "undefined" || span === null)
            {
                return false;
            }

            help.className = "popover";
            help.setAttribute("role", "tooltip");
            help.dataset.placement = "left";
            help.innerHTML = help_data;
            
            span.before(help);
        });

        /* Aides sur les compétences */
        this.skill_category.forEach((cat, index) => 
        {
            let help = document.createElement("div");
            let help_data = this.helps.map((h) => 
            {
                if (typeof h.skills[index] === "undefined")
                {
                    return false;
                }

                return this.CreateHelp({ name: h.skills[index].name, desc: h.skills[index].desc });
            });

            const span = cat.querySelector("#inputskill input");

            if (typeof span === "undefined" || span === null)
            {
                return false;
            }

            help.className = "popover";
            help.setAttribute("role", "tooltip");
            help.dataset.placement = "left";
            help.innerHTML = help_data;
                
            span.before(help);
        });
    }

    /**
    *   Cette méthode permet d'afficher le sélecteur des classes de personnage.
    * 
    *   @return {void} 
    **/
    DisplayClassSelector()
    {
        /* Sélecteur de classe du personnage */
        this.classes.map(c => 
        {
            let select_class = document.createElement("option");
                
            select_class.text = c.name;
            select_class.id = c.id;
    
            this.character_class.add(select_class);
        });
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
    *   Cette méthode permet de récupérer les données des aides
    * 
    *   @return {void} 
    **/
    async GetHelpData()
    {
        let data = await fetch(FILES['help'])
            .then(response => response.json())
            .then(data =>
            { 
                return data ? data : []; 
            })
            .catch((err) => { 
                console.log('ERREUR :: ' + err); 
                throw new Error(`ERREUR :: ${err}`);
            });
          
        this.helps.push(data);
    }

    /** 
    *   Cette méthode permet de récupérer une classe spécifique.
    * 
    *   @param {number} id                                              ID de la classe
    * 
    *   @return {object}
    **/
    GetClass(id)
    {
        let character_class = this.classes.filter(c => c.id === parseInt(id))[0];

        return character_class;
    }

    /**
    *   Cettte méthode permet de récupérer les classes du jeu.
    * 
    *   @return {array} 
    **/
    async GetClasses()
    {
        return await fetch(FILES['classes'])
            .then(response => response.json())
            .then(data =>
            { 
                return data ? data : []; 
            })
            .catch((err) => { console.log('ERREUR :: ' + err); });
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
                this.stats_number[index].value = this.stats_default_value;
            });
        
            this.skills_number.forEach((input, index) => 
            {
                this.skills_number[index].value = 0;
            });

            this.character_name.value = "";
            this.character_class.selectedIndex = 0;
            this.header_stats_points.innerHTML = `${this.points_stats_max} points`;
            this.header_skills_points.innerHTML = `${this.points_skills_max} points`;
        });

        /* Bouton :: "Jouer" */
        this.button_play.addEventListener("click", (e) =>
        {
            Utils.OpenWindow(e, { title: "Jeu" });
        });

        /* Bouton :: Copier */
        this.button_copy.addEventListener("click", (e) =>
        {
            let character_class_id = this.character_class.options[this.character_class.selectedIndex].id;
            let character_class_data = this.GetClass(character_class_id);
            let character_class_attributes = character_class_data.attributes;

            Object.entries(character_class_attributes).map((key, value) => 
            {
                this.stats_number.forEach((input) => 
                {
                    this.stats_number[value].value = key[1].base;
                });
            });
        });

        /* Aides */
        await this.GetHelpData();

        /* Variables */
        this.classes = await this.GetClasses();

        /* Le sélecteur de classe de personnage */
        this.DisplayClassSelector();

        /* On affiche l'aide */
        this.DisplayHelp();

        /* On vérifier que le joueur a placé ses points */
        this.CheckPoints();
       
        /* Erreurs */
        this.DisplayErrors();
    }
}

export default new Player();