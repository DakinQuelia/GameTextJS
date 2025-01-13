/*****************************************
*	GameText :: Joueur
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
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

        /* Eléments HTML */
        this.character_name = document.querySelector("#character_name") ? document.querySelector("#character_name") : "";
        this.stats_number = document.querySelectorAll('#stats input[type="number"]') ? document.querySelectorAll('#stats input[type="number"]') : "";
        this.skills_number = document.querySelectorAll('#skills input[type="number"]') ? document.querySelectorAll('#skills input[type="number"]') : "";
        this.button_play = document.querySelector("#play") ? document.querySelector("#play") : "";
        this.button_cancel = document.querySelector("#cancel") ? document.querySelector("#cancel") : "";
        this.header_stats_points = document.querySelector("#points_stats .points") ? document.querySelector("#points_stats .points") : "";
        this.header_skills_points = document.querySelector("#points_skills .points") ? document.querySelector("#points_skills .points") : "";
        this.stats_input_name = document.querySelectorAll("#stats .category-name") ? document.querySelectorAll("#stats .category-name") : "";
    }

    /**
    *   Cette méthode permet de vérifier que le joueur ne dépasse pas le quota des points.
    * 
    *   @return {void}
    **/
    CheckPoints()
    {

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
    *   Cettte méthode permet de récupérer la/les classes du personnage.
    * 
    *   @return {array} 
    **/
    GetClassCharacter()
    {
        return [];
    }

    /**
    *   Cettte méthode permet de récupérer les statistiques.
    * 
    *   @return {array} 
    **/
    GetStats()
    {

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
            return false;
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
        });

        /* Bouton "Jouer" */
        this.button_play.addEventListener("click", () =>
        {
            console.log("Jouer !!");  
        });

        /* Erreurs */
        this.DisplayErrors();
    }
}

export default new Player();