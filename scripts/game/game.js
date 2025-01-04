/*****************************************
*	Jeu / Game
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Config from './config/config.js';
import Modal from '../lib/modal.js';
import Utils from '../lib/utils.js';

const ROOT = location.protocol + '//' + location.host;

class Game
{
    /**
	*	Constructeur
	**/
    constructor()
    {
        this.config = Config;
        this.language = this.config.language;
        this.lang = this.LoadText();

        //console.log(this.lang);
    }

    /**
    *   Cette méthode initialise le jeu.
    **/
    Init()
    {
        const savename = document.querySelector('#savename');
        const gamename = savename ? savename.value : null;

        // Si le navigateur est Internet Explorer, on quitte le script.
		if (this.IsIE())
		{
			console.error(`L'éditeur ne supporte pas Internet Explorer. Veuillez utiliser un navigateur moderne tel que : Chrome / Firefox / Edge / Safari !`);

			return;
		}

        // On exécute les modales
        Modal.Init();

        if (gamename !== null)
        {
            this.SaveGame(gamename);    
        }

        //console.log('Le jeu est lancé !');
    }

    /**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Internet Explorer 
    *
    *   @return {bool}
	**/
	IsIE() 
	{
		let userAgent = navigator.userAgent;
		
		return userAgent.indexOf("MSIE ") > -1 || userAgent.indexOf("Trident/") > -1;
	}

    /**
    *   Cette méthode récupère les paramètres du jeu.
    * 
    *   @return {array}
    **/
    LoadSettings(folder)
    {
        let filename = folder ? folder + '/settings.js' : ROOT + '/js/game/game/settings.js';
    }

    /**
    *   Cette méthode permet de sauvegarder la partie.
    **/
    SaveGame(filename)
    {
        let submit = document.querySelector('#savesubmit');

        if (filename !== null && submit)
        {
            console.log(filename);
        }
    }

    /**
    *   Cette méthode permet de charger la partie sauvegardée.
    **/
    LoadGame(filename)
    {

    }

    /**
    *   Cette méthode récupère les textes du fichier de langue.
    * 
    *   @return {array}
    **/
    async LoadText()
    {
        let lang = await fetch(ROOT + '/js/game/lang/' + this.config.language + '.json').catch((err) => { console.log('ERROR :: ' + err); });
        let texts = await lang.json();

        return texts;
    }

    /**
	* 	Cette méthode permet d'ouvrir une fenêtre modale.
    *
	*	@param {object} event
	*	@param {object} data
	**/
	static OpenWindow(event, data)
	{
		// Si l'évènement n'est pas défini, on retourne.
		if (typeof event === "undefined")
		{
			return false;
		}

		// Si la fenêtre n'existe pas, on la crée.
		if (typeof Modal.modal === "undefined")
		{
			return Modal.CreateModal(data.id, data.title, data.footer, data.content);
		}

		// Si on ne définit pas d'objet data, on lui donne une valeur nulle.
		if (data === null)
		{
			data = null;
		}

		// Si la fenêtre existe, on l'ouvre.
		Modal.OpenModal(event);

		return true;
	}
}

export default Game;