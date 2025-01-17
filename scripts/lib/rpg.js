/*****************************************
*	Utilitaires
*	Auteur 		: Dakin Quelia
*	Version 	: 1.0.0. 
*****************************************/
import { FILES } from '../game/constants.js';
import Utils from './utils.js';
import Modal from './modal.js';

class RPG 
{
    /**
    *   Le constructeur
    * 
    *   @return {void}
    **/
    constructor()
    {
        this.total_points = 0;                                          // Total des points
    }

    /**
    *   Cette méthode permet de calculer les points de statistiques.
    *   
    *   @param {number} base                                            Base de calul
    *   @param {number} max_points                                      Nombre max de points
    *   @param {array} stats                                            Tableau des données
    * 
    *   @return {number}
    **/
    CalculateStats(base = 0, max_points, stats = [])
    {
       
    }
}

export default new RPG();