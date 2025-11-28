/*****************************************
*	Jeu :: configuration\config.js
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
let config = { 
    /** @type {string} **/
    language				: 'fr',							    // La langue par défaut du script
    /** @type {boolean} **/
    custom_exits            : false,                            // Définir à "true" pour des sorties personnalisées dans exits.js
    /** @type {Array} **/
    filelist                : [],                               // Les fichiers à charger
    /** @type {Array} **/
    custom_librairies       : [],                               // Noms des librairies à charger
    /** @type {Object} **/
    folders                 : {                                 // Les dossiers
        images              : 'assets/images/',                 // -- Dossier : le dossier des images
        sounds              : 'assets/audio/',                  // -- Dossier : le dossier des fichiers audio
        videos              : 'assets/video/',                  // -- Dossier : le dossier des vidéos
        css                 : 'assets/css/',                    // -- Dossier : le dossier des fichiers CSS
        logs                : 'logs/'                           // -- Dossier : le dossier des logs
    },
    /** @type {string} **/
    theme                   : 'default',                        // Thème de l'application
    /** @type {string} **/
    sounds_file_ext         : '.mp3',                           // Extension des fichiers sons
    /** @type {boolean} **/
    text_input              : true,                             // Ceci permet au joueur de taper une commande
    /** @type {string} **/
    cursor                  : ">",                              // Le curseur
    /** @type {boolean} **/
    command_echo            : true,                             // L'écho de la commande
}; 

export default config;