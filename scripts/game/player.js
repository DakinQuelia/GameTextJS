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
        this.points_stats = 30;
        this.points_skills = 20;
        this.name = "";
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
        return '';
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
}

export default new Player();