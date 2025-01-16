/*****************************************
*	Gestion de l'introduction
*   -------------------------
*	Auteur 		: Dakin Quelia <dakinquelia@gmail.com>
*	Version 	: 1.0.0. 
*****************************************/
class Introduction
{   
    /**
    *   Le constructeur
    * 
    *   @return {void}
    **/
    constructor()
    {
        this.span;
        this.letter;
        this.data = {};
        this.byline = document.querySelector(".intro-logo #byline");
        this.bylineText = this.byline.innerHTML;									                // Récupère le contenu de H2
        this.bylineArr = this.bylineText.split('');							                        // Explose le contenu sous forme de tableau
        this.audio = document.querySelector("#themeAudio");                                         // Audio
        this.button_play = document.querySelector("#button_play");                                  // Bouton pour démarrer l'animation
        this.intro_play = document.querySelector(".intro-play");                                    // Container du bouton
        this.intro = document.querySelector(".star-wars-intro");                                    // Container de l'animation
        this.intro_logo = document.querySelector(".intro-logo .byline");                            // Titre du logo
        this.intro_episode = document.querySelector(".star-wars-title");                            // Titre de l'épisode
        this.intro_subtitle = document.querySelector(".star-wars-subtitle");                        // Sous-titre de l'épisode
        this.intro_paragraphs = document.querySelector(".intro-content");                           // Contenu des paragraphes

        this.Reset();                                                                               // On réinitialise l'animation

        this.button_play.addEventListener("click", () => { this.Start(); });                        // Bouton pour jouer l'animation
    }

    /**
    *   Cette méthode permet de réinitialiser l'animation.
    * 
    *   @return {void} 
    **/
    Reset()
    {
        this.audio.currentTime = 0;
        this.intro_play.style.display = "flex";
        this.intro.style.display = "none";
    }

    /**
    *   Cette méthode permet de lancer l'animation.
    * 
    *   @return {void} 
    **/
    Start()
    {
        this.intro_play.style.display = "none";
        this.intro.style.display = "flex";
        this.byline.innerHTML = '';											                    // Vide le contenu courant

        this.audio.currentTime = 9;
        this.audio.play();


        for(let i = 0; i < this.bylineArr.length; i++)
        {								
            this.span = document.createElement("span");					
            this.letter = document.createTextNode(this.bylineArr[i]);	
    
            if (this.bylineArr[i] == ' ') 
            {												
                this.byline.appendChild(this.letter);					
            } 
            else 
            {
                this.span.appendChild(this.letter);					
                this.byline.appendChild(this.span); 				
            }
        }
    }

    /**
    *   Cette méthode permet d'afficher les données. 
    **/
    async Init()
    {
        this.data = await this.LoadData();

        this.intro_episode.innerText = this.data.episode;
        this.intro_subtitle.innerText = this.data.subtitle;
        this.intro_logo.innerHTML = this.data.logo_title;
        this.intro_paragraphs.innerHTML = this.data.paragraphs.map((para) => `<p>${para}</p>`).join("");
    }   

    /** 
    *   Cette méthode permet de charger les données du fichier "introduction.json".
    * 
    *   @return {object}
    **/
    async LoadData()
    {
        return await fetch(`../assets/resources/introduction.json`)
            .then(response => response.json())
            .then(data => { return data ? data : []; })
            .catch((err) => { console.log('ERREUR :: ' + err); });
    }
}

export default new Introduction();