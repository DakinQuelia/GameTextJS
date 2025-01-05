/*****************************************
*	Jeu / Game
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Config from './config/config.js';
import Modal from '../lib/modal.js';
import Utils from '../lib/utils.js';
import settings from "../../data/settings.js";

const ROOT = location.protocol + '//' + location.host;
const DATA_ROOT = ROOT + '/data';
const SCRIPTS_ROOT = ROOT + '/scripts';
const RESOURCES_ROOT = ROOT + '/resources';

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
        this.lang = null;
        this.files = {
            'player'    : RESOURCES_ROOT + '/player.json',  
            'rules'     : RESOURCES_ROOT + '/rules.json',
        };
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
        let filename = folder ? folder + '/settings.js' : this.files['settings'];
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
            //console.log(filename);
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
    *   Cette méthode initialise le jeu.
    * 
    *   @return {void}
    **/
    async Init()
    {
        const savename = document.querySelector('#savename');
        const gamename = savename ? savename.value : null;
        this.lang = await this.LoadText();

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
    }

    /**
    *   Cette méthode charge les paramètres du jeu.
    * 
    *   @return {Promise}
    **/
    async DisplayGameInfo()
    {
        if (typeof settings === typeof undefined)
        {
            return;
        }

        const game_infos = settings;

        let page_infos = document.querySelector('#about');
        let game_title = page_infos.querySelector('#title');
        let game_written = page_infos.querySelector('#written');
        let game_version = page_infos.querySelector('#version');

        game_title.innerText = game_infos['title'] ? game_infos['title'] : 'Aucun titre';
        game_written.innerText = game_infos['author'] ? game_infos['author'] : `Information indisponible`;
        game_version.innerText = game_infos['version'] ? game_infos['version'] : `Information indisponible`;

        return {
            title: game_infos['title'],
            author: game_infos['author'],
            version: game_infos['version']
        }
    }

    /**
    *   Cette méthode permet de récupérer les informations sur le joueur.
    * 
    *   @return {Promise}
    **/
    async GetPlayer()
    {
        return await fetch(`${RESOURCES_ROOT}/player.json`)
            .then(response => response.json())
            .then(data =>
            { 
                return data ? data : "Joueur"; 
            })
            .catch((err) => { console.log('ERROR :: ' + err); });
    }

    /**
    *   Cette méthode récupère les textes du fichier de langue.
    * 
    *   @return {array}
    **/
    async LoadText()
    {
        let lang = await fetch(`${SCRIPTS_ROOT}/game/lang/${this.config.language}.json`).catch((err) => { console.log('ERROR :: ' + err); });

        if (!lang.ok) 
        {
            throw new Error("Statut de la réponse :: " + response.status);
        }

        let texts = await lang.json();

        return texts;
    }
}

export default new Game();