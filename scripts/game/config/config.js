/*****************************************
*	Jeu :: configuration\config.js
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
var config = { 
    language				: 'fr',							    // La langue par défaut du script
    custom_exits            : false,                            // Définir à "true" pour des sorties personnalisées dans exits.js
    filelist                : [],                               // Les fichiers à charger
    custom_librairies       : [],                               // Noms des librairies à charger
    folders                 : {                                 // Les dossiers
        images              : 'assets/images/',                 // -- Dossier : le dossier des images
        sounds              : 'assets/audio/',                  // -- Dossier : le dossier des fichiers audio
        videos              : 'assets/video/',                  // -- Dossier : le dossier des vidéos
        css                 : 'assets/css/',                    // -- Dossier : le dossier des fichiers CSS
        logs                : 'logs/'                           // -- Dossier : le dossier des logs
    },
    theme                   : ['default'],
    sounds_file_ext         : '.mp3',

    text_input              : true,                             // Ceci permet au joueur de taper une commande
    cursor                  : ">",                              // Le curseur
    command_echo            : true,                             // L'écho de la commande
}; 

export default config;