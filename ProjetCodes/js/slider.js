'use strict';   // Mode strict du JavaScript


function installEventHandler(selector,type,eventHandler)
{
  var domObject;

  // Récupération du premier objet DOM correspondant au sélecteur.
  domObject = document.querySelector(selector);

  // Installation d'un gestionnaire d'évènement sur cet objet DOM.
  domObject.addEventListener(type, eventHandler);

}


/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/

// Déclaration de constantes
const AUTOPLAY_DELAY = 3000;

// Codes des touches du clavier
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const SPACE = 'Space';

/**
 *   Déclaration des variables globales dont on aura besoin dans tout le script
 *		-> Données concernant les slides (liste des éléments DOM <figure>)
 *		-> Objet contenant l'état du slider (indice de la slide courante, chronomètre)
 */
let slides;
let state;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

/**
 * Met à jour le slider en fonction de la slide que l'on souhaite afficher
 * -> on enlève la classe 'active' à la slide qui la possède pour la donner à la nouvelle slide
 * -> la slide à afficher est la slide dont l'indice dans le tableau de slides vaut state.index
 */
function refreshSlider()
{
	// Supprimer la classe 'active' de la figure actuellement visible
	const activeSlide = document.querySelector('.active');
	activeSlide.classList.remove('active');

	// Faire apparaître la figure demandée en lui ajoutant la classe 'active'
	slides[ state.index ].classList.add('active');

	// Bonus 1 - Puces
	refreshDots();
}


/**
 * Passer à la slide suivante
 */
function onSliderGoToNext()
{
  // Passage à la slide suivante : on incrémente l'indice de la slide courante
  state.index++;

  // Est-ce qu'on est arrivé à la fin de la liste des slides ?
  if(state.index == slides.length) {

      // Oui, on revient au début, à la première slide, d'indice 0
      state.index = 0;
  }

  // Mise à jour de l'affichage.
  refreshSlider();
}

/**
 * Passer à la slide précédente
 */
function onSliderGoToPrevious()
{
  // Passage à la slide précédente : on décrémente l'indice de la slide courante
  state.index--;

  // Est-ce qu'on est revenu au début de la liste des slides ?
  if(state.index < 0) {

      // Oui, on revient à la fin (le carrousel est circulaire).
      state.index = slides.length - 1;
  }

  // Mise à jour de l'affichage.
  refreshSlider();
}

/**
 * Affiche une slide aléatoire différente de la slide courante
 */

/**
 * Lance ou stopper le défilement automatique du slider
 */

/**
 * Gestionnaire d'événement responsable du clavier
 * @param event - Objet événement grâce auquel on va savoir quelle touche du clavier a été enfoncée
 */
function onSliderKeyDown(event)
{
  /**
   * On teste la propriété code de l'objet event, c'est un code qui représente la touche du clavier enfoncée
   * https://developer.mozilla.org/fr/docs/Web/API/KeyboardEvent/code
   */
  switch(event.code) {

    case ARROW_RIGHT :
        onSliderGoToNext();
        break;

    case ARROW_LEFT :
        onSliderGoToPrevious();
      	break;

	case SPACE :

		/**
		 * Annulation du comportement par défaut du navigateur qui va faire défiler
		 * la page lorsqu'on appuie sur la barre d'espace
 		 */
		event.preventDefault();
		onSliderPlayPause();
		break;
  }
}



/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/


document.addEventListener('DOMContentLoaded', function() {

	// Liste des slides constituant le slider (liste des éléments <figure>)
	slides = document.querySelectorAll('.slider-figure');

	state = new Object();
	state.index = 0; // Indice de la slide courante (actuellement affichée), au départ, c'est la première
	state.timer = null; // Chronomètre correspondant au défilement automatique, au départ il n'y en a pas

	// Installation des gestionnaires d'événements
	installEventHandler('#prev','click', onSliderGoToPrevious );
	installEventHandler('#next','click', onSliderGoToNext );
	
	/**
	 * L'évènement d'appui sur une touche doit être installé sur l'ensemble du
	 * document, on ne recherche pas une balise en particulier dans l'arbre DOM.
	 *
	 * L'ensemble de la page c'est la balise <html> et donc la variable document.
	 */
	document.addEventListener('keydown', onSliderKeyDown);

});
