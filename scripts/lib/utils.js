/*****************************************
*	Utilitaires
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import Modal from './modal.js';

/* Variables générales */
let previousdiff = {};
let pageactivate = 1;

/* Constantes HTML */
const $countdown = document.querySelector('#countdown');
const $countele = {
    days:       $countdown ? $countdown.querySelector('#days') : '',
    hours:      $countdown ? $countdown.querySelector('#hours') : '',
    minutes:    $countdown ? $countdown.querySelector('#minutes') : '',
    seconds:    $countdown ? $countdown.querySelector('#seconds') : ''
};

/* Constantes générales */
const USERAGENT = navigator.userAgent;
const MINUTES = 60;
const HOURS = 60 * MINUTES;
const DAYS = 24 * HOURS;
const LAUNCHDATE = $countdown ? Date.parse($countdown.dataset.time) / 1000 : '';
const PAGES = document.querySelectorAll(".form-page") ? document.querySelectorAll(".form-page") : '';
const PAGE = document.querySelector(".form-page");
const NUMBER_PAGES = PAGES.length;

class Utils 
{
    /**
    *   Le constructeur
    * 
    *   @return {void}
    **/
    constructor()
    {
        this.hilitedid = false;
    }

    /**
    *   Cette méthode permet d'afficher un message si l'utilisateur est sur Internet Explorer.
    * 
    *   @return {void}
    **/
    AlertIE()
    {

    }

    /**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Internet Explorer.
    *   
    *   @return {boolean}
	**/
	IsIE() 
	{
		return USERAGENT.indexOf("MSIE") > -1 || USERAGENT.indexOf("Trident/") > -1;
	}

    /**
	*	Cette méthode permet de vérifier si l'utilisateur utilise Firefox.
    *   
    *   @return {boolean}
	**/
    IsFirefox()
    {
		return USERAGENT.indexOf("Firefox") > -1;
    }

    /**
    *   Cette méthode permet d'inclure un fichier.
    * 
    *   @param {string} url                                             L'url du fichier
    * 
    *   @return {void}
    **/
    Require(url)
    {
        var ajax = new XMLHttpRequest();
 
        ajax.open('GET', url, false);
        ajax.onreadystatechange = function() 
        {
            var script = ajax.response || ajax.responseText;
 
            if (ajax.readyState === 4) 
            {
                switch(ajax.status) 
                {
                    case 200:
                        eval.apply(window, [script]);
                        console.log(`Le script a été chargé ${url} !`);
                    break;
                    default:
                        console.log(`ERREUR : le script suivant « ${url} » n'a pas été chargé.`);
                        throw new Error(`ERREUR : le script suivant « ${url} » n'a pas été chargé.`);
                }
            }
        };
 
        ajax.send(null);
    }

    /**
    *   Cette méthode permet d'ajouter un tooltip.
    *   Auteur : Forumactif.com (modifié par Dakin Quelia)
    * 
    *   @param {callback} caller                                        Méthode / fonction
    *   @param {string} content                                         Contenu
    * 
    *   @return {void}
    **/
    Tooltip(caller, content)
    {
        var current_tooltip = document.querySelector('#tooltip');
        var content_title = "AIDE";
        
        if (!current_tooltip)
        {
            var current_tooltip = document.createElement('div');
            current_tooltip.setAttribute('id', 'tooltip');
            current_tooltip.classList.add('tooltip');
            document.body.appendChild(current_tooltip);
        }
        
        current_tooltip.style.zIndex = 100;
        current_tooltip.style.position = 'absolute';
        
        if (content_title)
        {
            content = '<p class="header">' + content_title + '</p><p>' + content + '</p>';
        }
        else
        {
            content = '<p>' + content + '</p>'
        }
        
        current_tooltip.innerHTML= content;
        current_tooltip.style.visibility = 'visible';
        caller.onmousemove = this.MoveTooltip;
        caller.onmouseout = function()
        {
            current_tooltip.style.visibility = "hidden";
        };
        
        caller.title = '';
    }

    /**
    *   Cette fonction permet de déplacer l'infobulle.
    *   Auteur : Forumactif.com (modifié par Dakin Quelia)
    * 
    *   @param {object} e                                               Evènement
    * 
    *   @return {void}
    **/
    MoveTooltip(e)
    {
        let curX = e.pageX;
        let curY= e.pageY;
        let offsetxpoint = -60;
        let offsetypoint = 20;
        let rightedge = window.innerWidth - e.clientX - offsetxpoint - 20;
        let bottomedge = window.innerHeight - e.clientY - offsetypoint - 20;
        let leftedge= (offsetxpoint < 0) ? offsetxpoint * (-1) : -1000;
        
        let current_tooltip = document.querySelector('#tooltip');
        
        if (rightedge < current_tooltip.offsetWidth)
        {
            current_tooltip.style.left = window.pageXOffset + e.clientX - current_tooltip.offsetWidth + "px";
        }    
        else if(curX < leftedge) 
        {
            current_tooltip.style.left = "5px";
        } 
        else 
        {
            current_tooltip.style.left = curX + offsetxpoint + "px";
        }
        
        if (bottomedge < current_tooltip.offsetHeight) 
        {
            current_tooltip.style.top = window.pageYOffset + e.clientY - current_tooltip.offsetHeight - offsetypoint + "px";
        }
        
        else 
        { 
            current_tooltip.style.top = curY + offsetypoint + "px";
        }
    }

    /**
    * 	Afficher le menu personnalisé
    * 
    *   @return {void}
	**/
	CustomSelect()
	{
		let dropdown = document.querySelectorAll('.dropselect');
		let dropmenu = document.querySelectorAll('.dropmenu');
		let optionslist = document.querySelectorAll('.dropmenu-item');

		for (let i = 0; i < dropdown.length; i++)
		{
			// On ajoute un évènement clic
			window.addEventListener('click', (e) =>
			{
				// Empêche la propagation
				e.stopPropagation();

				if (dropdown[i].contains(e.target))
				{
					dropmenu[i].classList.toggle('active');
				}
				else
				{
					dropmenu[i].classList.remove('active');
				}
			});

			// On boucle les options
			optionslist.forEach(o => 
			{
				o.addEventListener('click', (e) =>
				{
					let drop = o.parentNode.parentNode;
					let label = drop.querySelector('.droplabel');
					let value = o.getAttribute('data-value');
					
					label.setAttribute('data-value', value);
					label.innerHTML = o.textContent;    
				});
			});
		}
    }

    /**
    *   Cette méthode permet de créer un champ de type numérique personnalisé. 
    * 
    *   @return {void}
    **/
    CustomSpinner()
    {
        let switchers = document.querySelectorAll('.spinbox');

        switchers.forEach(switcher => 
        {
            let spinup = switcher.querySelector('.spinbox-up');
            let spindown = switcher.querySelector('.spinbox-down');
            let input = switcher.querySelector('input');

            spinup.addEventListener('click', () => 
            { 
                input.value = parseInt(input.value) + 1; 
            });

            spindown.addEventListener('click', () => 
            { 
                if (input.value <= 0) { return; }

                input.value = parseInt(input.value) - 1; 
            });
        });
    }

    /**
    *   Cette méthode permet de générer un mot de passe. 
    * 
    *   @param {int} pwdlength                                          Longueur du mot de passe généré
    * 
    *   @return {string}
    **/
    PasswordGenerator(pwdlength)
    {
        return Array(pwdlength).fill("1234567890abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ@&!").map((function(t) { return t[Math.floor(Math.random() * t.length)] })).join("");
    }

    /**
    *   Cette méthode permet d'afficher un compte à rebours.
    * 
    *   @return {void}
    **/
    CountDown()
    {
        if ($countdown === null)
        {
            return;
        }

        const $this = this;
        const difference = LAUNCHDATE - Date.now() / 1000;
        const diff = {
            days:       Math.floor(difference / DAYS),
            hours:      Math.floor(difference % DAYS / HOURS),
            minutes:    Math.floor(difference % HOURS / MINUTES),
            seconds:    Math.floor(difference % MINUTES)
        };

        if (difference <= 0)
        {
            return;
        }

        $this.UpdateCountdownDOM(diff);

        window.setTimeout(() => { window.requestAnimationFrame(function() { $this.CountDown(); }) }, 1000);
    }

    /**
    *   Cette méthode permet de mettre à jour la strucutre HTML du compteur.
    *
    *   @param {{days: number, hours: numbers, minutes: number, seconds: number}} diff 
    * 
    *   @return {void}
    **/
    UpdateCountdownDOM(diff)
    {
        Object.keys(diff).forEach((key) => 
        {
            if (previousdiff[key] !== diff[key])
            {
                $countele[key].innerText = diff[key];
            }
        });

        previousdiff = diff;
    }

    /**
    *   Cette méthode permet de calculer le montant TVAC / TTC.
    * 
    *   @param {int} vat                                                Taux de TVA
    *   @param {int} price                                              Prix de l'article
    * 
    *   @return {void}
    **/
    CalculateVAT(vat, price)
    {
        
    }

    /**
    *   Cette méthode sert à nettoyer les espaces blancs au début du code.
    * 
    *   @param {string} string                                          Texte / Message
    * 
    *   @return {string}
    **/
    TrimCode(string) 
    {
        let	str = string.replace(/^\s\s*/, '');
		let ws = /\s/;
        let i = str.length;
        
        while (ws.test(str.charAt(--i)));
        
	    return str.slice(0, i + 1);
    }

    /**
    *   Cette méthode permet de créer la balise Code avec le code.
    * 
    *   @param {string} string                                          Texte / Message
    * 
    *   @return {void}              
    **/
    Code(string)
    {
        document.querySelector('.postbody code').innerHTML = `
            <div class="header">Code</div>
            <pre>${this.TrimCode(string)}</pre>
        `;
    }

    /**
    *   Cette méthode supprime toutes les balises afin de s'assurer que la chaîne de caractère
    *   retournée ne contient pas de balises interdites (exemple : '<<bait/>switch/>')
    * 
    *   @param {ElementHTML} input                                      Elément HTML
    *   @param {string} allowed                                         Balises autorisées
    * 
    *   @return {void}
    **/
    StripTags(input, allowed) 
    {
        let tagallowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        let tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        let commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        let before = input;
        let after = input;

        while(true) 
        {
            before = after;
            after = before.replace(commentsAndPhpTags, '').replace(tags, ($0, $1) =>
            {
                return tagallowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
            });
            
            if (before === after) 
            {
                return after;
            }
        }
    }

    /**
    *   Cette méthode permet d'afficher les erreurs en console.
    * 
    *   @param {object} error                                           L'objet de l'erreur
    *   @param {string} explicit                                        Explict ou Inexplicit
    * 
    *   @return {void}
    **/
    PrintError (error, explicit) 
    {
        console.error(`[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name} : ${error.message}`);
    }

    /**
    *   Cette méthode permet de retourner une chaîne formatée.
    *
    *   @author redexp (de Stackoverflow)
    * 
    *   @param {string} str                                             Chaîne de caractère
    * 
    *   @return {string}
    **/
    Sprintf(str) 
    {
        let args = arguments, i = 1;
        
        return str.replace(/%(s|d|0\d+d)/g, function (x, type) 
        {
            let value = args[i++];
    
            switch (type) 
            {
                case 's': 
                    return value;
                break;
                case 'd': 
                    return parseInt(value, 10);
                break;
                default:
                    value = String(parseInt(value, 10));
                    let n = Number(type.slice(1, -1));
    
                    return '0' . repeat(n).slice(value.length) + value;
            }
        });
    }

    /**
    *   Cette méthode permet d'afficher la date et heure du jour.
    * 
    *   @param {Intl.LocalesArgument} locale                            La date/heure locale
    * 
    *   @return {void}
    **/
    DisplayDateTime(locale)
    {
        let time = new Date();

        return time.toLocaleString(locale, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false });
    }

    /**
	* 	Cette méthode permet d'ouvrir une fenêtre modale.
    *
	*	@param {object} event                                           Evènement
	*	@param {object} data                                            Données de la fenêtre
    *
    *   @return {boolean}
	**/
	OpenWindow(event, data)
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

    /**
    *   Cette méthode permet d'afficher/masque le contenu des différents blocs composant le menu.
    *   
    *   @return {void}
    **/
    Toggle()
    {
        const toggles = document.querySelectorAll('#toggle i');

        toggles.forEach(toggle => 
        {
            toggle.addEventListener('click', (e) => 
            {
                const target = e.target.parentNode.parentNode.nextElementSibling;
                const head = e.target.parentNode.parentNode;
                const icon = e.target;

                if (target.style.display === "block")
                {
                    head.classList.add('noborder');
                    icon.classList.add('fa-plus');
                    icon.classList.remove('fa-minus');
                    target.style.display = "none";
                }
                else
                {
                    head.classList.remove('noborder');
                    icon.classList.add('fa-minus');
                    icon.classList.remove('fa-plus');
                    target.style.display = "block";
                }
            });
        });
    }
}

export default new Utils();