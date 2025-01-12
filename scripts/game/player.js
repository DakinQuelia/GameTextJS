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
        this.character_name = document.querySelector("#character_name");
        this.stats_number = document.querySelectorAll('#stats input[type="number"]');
        this.skills_number = document.querySelectorAll('#skills input[type="number"]');
        this.button_play = document.querySelector("#play");
        this.button_cancel = document.querySelector("#cancel");
        this.header_stats_points = document.querySelector("#points_stats .points");
        this.header_skills_points = document.querySelector("#points_skills .points");
        this.stats_input = document.querySelectorAll("#stats .category-name");
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
        const errorsTag = document.querySelector("#errors");
        const errorsContainer = errorsTag.querySelector(".errors");

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
            errorsTag.style.display = "block";
            
            this.errors.forEach((error, index) =>
            {
                const errorLi = document.createElement("li");
            
                errorLi.id = `error-${index}`;
                errorLi.textContent = error;
                errorsContainer.appendChild(errorLi);
            });
        }
        else
        {
            errorsTag.style.display = "none";
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