/*****************************************
*	Jeu / Game
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import { FILES, ROOT, DATA_ROOT, RESOURCES_ROOT, DATABASE_ROOT, SCRIPTS_ROOT } from "./constants.js";
import Config from '../config/config.js';
import Modal from '../lib/modal.js';
import Utils from '../lib/utils.js';
import settings from "../../data/settings.js";

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
        let filename = folder ? folder + '/settings.js' : FILES['settings'];
    }

    /**
    *   Cette méthode permet de sauvegarder la partie.
    * 
    *   @return {void}
    **/
    SaveGame()
    {
        const modal = document.querySelector("#savegame");
        const form = modal.querySelector("#savegameform");
        const content = form.querySelector(".modal-content");
        const input = form.querySelector("#savename");
        const icon_close = modal.querySelector("#close");
        const button_submit = modal.querySelector("#savesubmit");
        const button_close = modal.querySelector("#btnclose");

        let filename = input.value;
        let error_span = document.querySelector("#error-save") ? document.querySelector("#error-save") : document.createElement('div');

        form.addEventListener("submit", (e) => 
        {
            e.preventDefault();

            if (form.classList.contains('form-invalid')) 
            {
                e.stopPropagation();

                return false;	
            };
        
            if (filename === "" || filename === null) 
            {
                form.classList.add('form-invalid');
                                        
                error_span.id = "error-save";
                error_span.textContent = "Vous n'avez pas rempli le champ « Nom du fichier » !";
                error_span.style.marginLeft = "185px";
      
                content.appendChild(error_span);
            }
            else
            {
                form.classList.remove("form-invalid");
                error_span.remove();
            }

            console.log(filename);

            /* Vider le champ */
            //filename = "";
        });

        icon_close.addEventListener("click", () => 
        {   
            form.classList.remove("form-invalid");
            error_span.remove();
            filename = "";
        });

        button_close.addEventListener("click", () => 
        {
            form.classList.remove("form-invalid");
            error_span.remove();
            filename = "";
        });

        modal.addEventListener('keydown', () =>
        {
            form.classList.remove("form-invalid");
            error_span.remove();
            filename = "";
        });
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
    *   Cette méthode récupère les règles du jeu.
    * 
    *   @return {void}
    **/
    LoadRules()
    {
        const page = document.querySelector('#rules .modal-content');
        const footer = document.querySelector('#rules .modal-footer .left');

        return fetch(FILES['rules'])
            .then(response => response.json())
            .then(data => 
            { 
                let spanhtml = document.createElement('span');
                    spanhtml.textContent = "Dernière mise à jour le : " + data.last_update; /*+ " © " + data.author*/

                for (const rule of data.paragraphs) 
                {
                    let phtml = document.createElement('p');
                        phtml.setAttribute('id', rule.id);
                        phtml.textContent = rule.content;
                        
                    page.appendChild(phtml);
                }

                footer.appendChild(spanhtml);
            })
            .catch(error => { console.log('[ERREUR] ' + error.name + " :: " + error.message); });
    }

    /**
    *   Cette méthode permet d'ouvrir l'inventaire.
    *   
    *   @param {Event} event                                            Evènement
    * 
    *   @return {void}
    **/
    OpenInventory(event)
    {
        Utils.OpenWindow(event, { title: "Inventaire" });
    }

    /**
    *   Cette méthode permet d'afficher les crédits du jeu.
    * 
    *   @return {void} 
    **/
    async DisplayCredits()
    {
        const credits_wrapper = document.querySelector(".credits-wrapper");

        if (typeof credits_wrapper === "undefined" || credits_wrapper === null)
        {
            return false;
        }

        let credits = "";
        let data = await this.DisplayGameInfo();

        const credits_game = document.querySelector("#credits-game");
        const movie_text = document.querySelector(".movie-text");
        const HTML = document.createElement("div");

        data.credits.forEach((c, index) =>
        {
            let job_name = data.credits[index].role;
            let job_members = data.credits[index].members;
            let job_member = "";

            job_members.forEach((d => 
            { 
                job_member += `<li>${d}</li>`;
            }));

            credits += `
            <div class="movie-job">${job_name}</div>
            <div class="movie-name">
                <ul>
                    ${job_member} 
                </ul>
            </div>`

            credits_game.innerHTML = credits;
        });
        
        HTML.id = "credits-app";
        HTML.innerHTML = `
            <div class="movie blue">GameText JS</div>
            <div class="movie-subtitle">Une application d'aventure textuelle.</div>
            <div class="movie-job">Chef du projet</div>
            <div class="movie-name">Dakin Quelia</div>
            <div class="movie-job">Programmeur(s)</div>
            <div class="movie-name">Dakin Quelia</div>
            <div class="movie-job">Remerciements spéciaux</div>
            <div class="movie-name">Kir Kanos (Star Wars Holonet)</div>
        `;

        movie_text.before(HTML);
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

        // On charge les règles de jeu
        this.LoadRules();

        // On ajoute l'option "Afficher / Masquer"
        Utils.Toggle();

        // Boîtes modales
        this.RenderAbout();

        // Afficher les crédits du jeu
        this.DisplayCredits();
    }

    /**
    *   Cette méthode permet d'afficher le rendu HTML de la boîte modale "à propos".
    * 
    *   @return {void}
    **/
    async RenderAbout()
    {
        let page_infos = document.querySelector('#about');

        if (typeof page_infos === "undefined" || page_infos === null)
        {
            return false;
        }

        let game_title = page_infos.querySelector('#title');
        let game_written = page_infos.querySelector('#written');
        let game_version = page_infos.querySelector('#version');
        let game_version_footer = page_infos.querySelector('#versionfooter');

        let game_infos = await this.DisplayGameInfo();

        if (typeof game_infos === "undefined" || game_infos  === null)
        {
            return false;
        }

        game_title.innerText = game_infos['title'] ? game_infos['title'] : 'Aucun titre';
        game_written.innerText = game_infos['author'] ? game_infos['author'] : `Information indisponible`;
        game_version.innerText = game_infos['version'] ? game_infos['version'] : `Information indisponible`;
        game_version_footer.innerText = game_infos['version'] ? game_infos['version'] : `Information indisponible`;
    }

    /**
    *   Cette méthode charge les paramètres du jeu.
    * 
    *   @return {object}
    **/
    async DisplayGameInfo()
    {
        if (typeof settings === "undefined")
        {
            return;
        }

        const game_infos = settings;

        /* Titre de la page */
        document.title = `Jeu :: ${game_infos.title}`;

        return {
            title: game_infos['title'],
            author: game_infos['author'],
            version: game_infos['version'],
            credits: game_infos['credits']
        }
    }

    /**
    *   Cette méthode permet de récupérer les informations sur le joueur.
    * 
    *   @return {Promise}
    **/
    async GetPlayer()
    {
        return await fetch(`${FILES['player']}`)
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
        let lang = await fetch(`${SCRIPTS_ROOT}/lang/${this.config.language}.json`).catch((err) => { console.log('ERROR :: ' + err); });

        if (!lang.ok) 
        {
            throw new Error("Statut de la réponse :: " + response.status);
        }

        let texts = await lang.json();

        return texts;
    }
}

export default new Game();