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
        let span;
        let letter;
        let byline = document.querySelector(".intro-logo #byline");
        let bylineText = byline.innerHTML;									  // Récupère le contenu de H2
        let bylineArr = bylineText.split('');							     // Explose le contenu sous forme de tableau
        
        byline.innerHTML = '';											    // Vide le contenu courant

        for(let i = 0; i < bylineArr.length; i++)
        {								
            span = document.createElement("span");					
            letter = document.createTextNode(bylineArr[i]);	

            if (bylineArr[i] == ' ') 
            {												
                byline.appendChild(letter);					
            } 
            else 
            {
                span.appendChild(letter);					
                byline.appendChild(span); 				
            }
        }
    }
}

export default new Introduction();