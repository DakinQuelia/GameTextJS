/*****************************************
*	Gestion de l'introduction
*   -------------------------
*	Auteur 		: Dakin Quelia <dakinquelia@gmail.com>
*	Version 	: 1.0.0. 
*****************************************/
export const ROOT = location.protocol + '//' + location.host;       // Dossier racine du jeu
export const SCRIPTS_ROOT = ROOT + '/scripts';                      // Dossier :: /scripts
export const ASSETS_ROOT = ROOT + '/assets';                        // Dossier :: /assets
export const DATA_ROOT = ROOT + '/data';                            // Dossier :: /data
export const RESOURCES_ROOT = DATA_ROOT + '/resources';             // Dossier :: /data/resources
export const DATABASE_ROOT = DATA_ROOT + '/database';               // Dossier :: /data/tabase

export const FILES = {
    'player'        : RESOURCES_ROOT + '/player.json',              // Informations sur le joueur
    'rules'         : RESOURCES_ROOT + '/rules.json',               // Les règles du jeu
    'help'          : RESOURCES_ROOT + '/help.json',                // Aides du jeu
    'classes'       : DATABASE_ROOT + '/classes.json',              // BDD :: Classes des personnages
    'rooms'         : DATABASE_ROOT + '/rooms.json',                // BDD :: Lieux du jeu
    'items'         : DATABASE_ROOT + '/items.json',                // BDD :: Objets du jeu
    'code'          : DATA_ROOT + '/code.js',                       // Le code du jeu
    'data'          : DATA_ROOT + '/data.js',                       // Données du jeu
    'settings'      : DATA_ROOT + '/settings.js'                    // Paramètres du jeu
};

export const REGEX_FORMAT = [
   /^(me|myself|player)$/                                           // Nom du joueur
];