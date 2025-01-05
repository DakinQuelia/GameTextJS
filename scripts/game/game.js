/*****************************************
*	Jeu / Game
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Config from './config/config.js';
import Modal from '../lib/modal.js';
import Utils from '../lib/utils.js';

const ROOT = location.protocol + '//' + location.host;
const DATA_ROOT = ROOT + '/data';
const SCRIPTS_ROOT = ROOT + '/scripts';

class Game
{
    /**
	*	Constructeur
    *
    *   @return {void}
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
    * 
    *   @return {void}
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
    *   @return {boolean}
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
        let filename = folder ? folder + '/settings.js' : `${DATA_ROOT}/settings.js`;
    }

    /**
    *   Cette méthode permet de sauvegarder la partie.
    * 
    *   @return {void}
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
    * 
    *   @return {void}
    **/
    LoadGame(filename)
    {

    }

    /**
    *   Cette méthode permet de récupérer les informations sur le joueur.
    * 
    *   @return {void}
    **/
    GetPlayer()
    {
        return "Dakin Quelia";
    }

    /**
    *   Cette méthode récupère les textes du fichier de langue.
    * 
    *   @return {array}
    **/
    async LoadText()
    {
        let lang = await fetch(`${SCRIPTS_ROOT}/game/lang/${this.config.language}.json`).catch((err) => { console.log('ERROR :: ' + err); });

        console.log(lang);

        let texts = await lang.json();

        return texts;
    }
}

export default new Game();