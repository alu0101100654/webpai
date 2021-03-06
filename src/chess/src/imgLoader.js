/**
 * @version 1.0.0
 * @author Florentín Pérez Glez. <alu0101100654@ull.edu.es>
 * @file Módulo que está dirigido a permitir la carga de imágenes
 * de manera independiente a otros ficheros.
 * @copyright Florentín Pérez Glez 2020
 * @since 03.05.2020
 * @exports waitCharge
 * @exports pieceImg
 * @desc
 * Universidad: Universidad de La Laguna.
 *
 * Asignatura: Programación de Aplicaciones Interactivas.
 *
 * Curso: 3º
 *
 * Práctica 11. Ajedrez.
 *
 * Contenido detallado: Este módulo está dirigido a permitir la carga de
 * imágenes de manera independiente al resto de módulos. En esencia, las imágenes
 * se cargan una única vez en este módulo y después pueden ser referenciadas por cualquier
 * otro sin tener que volver a cargarse. Para facilitar también un correcto funcionamiento,
 * el módulo también exporta una función de utilidad, waitCharge, que se encarga de comprobar
 * constantemente si las imágenes han sido cargadas y solo en ese entonces, ejecutar la función
 * que se le pasa como argumento. Usando está función, nos garantizamos que las imágenes
 * se hayan cargado correctamente antes de poder ser utilizadas.
 *
 * Referencias:
 *    - Enunciado de la práctica:
 *      https://github.com/fsande/PAI-P11-Chess/blob/master/2019-2020_p10_Chess.md
 *
 * Historial de revisiones:
 *    - 05.05.2020 - Versión presentada para evaluación.
 */

'use strict';

const pieceImg = Object.create(null);

pieceImg.alfilB = new Image();
pieceImg.alfilN = new Image();
pieceImg.peonB = new Image();
pieceImg.peonN = new Image();
pieceImg.torreN = new Image();
pieceImg.torreB = new Image();
pieceImg.caballoB = new Image();
pieceImg.caballoN = new Image();
pieceImg.reyB = new Image();
pieceImg.reyN = new Image();
pieceImg.reinaB = new Image();
pieceImg.reinaN = new Image();

let imgCounter = 0;

for (const key in pieceImg) {
  pieceImg[key].src = `./img/${key}.png`;
  pieceImg[key].addEventListener('load', function() {
    imgCounter++;
  });
}

/**
 * @desc Función que comprueba constantemente si las imágenes han sido cargadas.
 * Cuando estas se encuentren en dicho estado, ejecuta una función especificable
 * como argumento.
 * @param {*} toDoFunction 
 */
function waitCharge(toDoFunction) {
  if (imgCounter !== 12) {
    setTimeout(function() {waitCharge(toDoFunction)}, 50);
    return;
  }
  toDoFunction();
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  exports.imgLoader = {};
  exports.imgLoader.waitCharge = waitCharge;
  exports.imgLoader.pieceImg = pieceImg;
} else { 
  window.imgLoader = {};
  window.imgLoader.waitCharge = waitCharge;
  window.imgLoader.pieceImg = pieceImg;
}
