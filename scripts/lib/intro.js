/*****************************************
*	Gestion de l'introduction
*   -------------------------
*	Auteur 		: Dakin Quelia <dakinquelia@gmail.com>
*	Version 	: 1.0.0. 
*****************************************/
/** 
*   Learn how to create this and much more with this email course: https://cssanimation.rocks/courses/animation-101/
*
*   MANY THANKS TO @tadywankenobi for the following JS to handle the text in the byline:
*   The following JS takes in the byline and splits it into letters, each one wrapped in a span. We need to create the spans as nodes, we can't just add them to the HTML using innerHTML, as to do so would mean the CSS won't affect the span because it doesn't recognise the tag as existing. It's an old problem we run into time and again.
*/
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
        this.byline = document.querySelector(".intro-logo #byline");
        this.bylineText = this.byline.innerHTML;									                // Récupère le contenu de H2
        this.bylineArr = this.bylineText.split('');							                        // Explose le contenu sous forme de tableau
        this.audio = document.querySelector("#themeAudio");                                         // Audio
        this.button_play = document.querySelector("#button_play");                                  // Bouton pour démarrer l'animation
        this.intro_play = document.querySelector(".intro-play");                                    // Container du bouton
        this.intro = document.querySelector(".star-wars-intro");                                    // Container de l'animation

        this.Reset();                                                                               // On réinitialise l'animation

        this.button_play.addEventListener("click", () => { this.Start(); });
    }

    /**
    *   Cette méthode permet de réinitialiser l'animation.
    * 
    *   @return {void} 
    **/
    Reset()
    {
        this.audio.currentTime = 0;
        this.intro_play.style.display = "block";
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
        this.intro.style.display = "block";
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
}

export default new Introduction();