import { Totem, MomentDetails } from './types';

export const totemsList: Totem[] = [
  {
    id: 'adaggio',
    name: 'Conejo Adaggio',
    role: 'Guía del Pulso Constante',
    description: 'El conejo del ritmo constante. Le encanta guiar a los niños en las pulsaciones tranquilas y seguras. ¡Es el guardián de los latidos de la música!',
    color: 'from-amber-400 to-orange-500 shadow-orange-200',
    avatar: '🐇',
    skill: 'Método Dalcroze: El Pulso Visual & Corporal'
  },
  {
    id: 'allegra',
    name: 'Tortuga Allegra',
    role: 'Guación de la Reacción Rápida',
    description: '¡Le fascina correr súper rápido y cambiar de velocidad de repente! Ayuda a los niños a aprender cuándo detenerse o avanzar con dinamismo.',
    color: 'from-emerald-400 to-teal-500 shadow-emerald-200',
    avatar: '🐢',
    skill: 'Método Dalcroze: Contraste de Acción y Silencio'
  },
  {
    id: 'staccato',
    name: 'Pájaro Staccato',
    role: 'Rey de los Saltitos Ligeros',
    description: 'Da brincos cortos, ligeros y saltarinos en el aire. Con él, cada nota es un saltito alegre que nos impulsa a mover las puntitas de los pies.',
    color: 'from-sky-400 to-blue-500 shadow-sky-200',
    avatar: '🐦',
    skill: 'Método Dalcroze: Movimiento Corto e Intermitente'
  },
  {
    id: 'tenuto',
    name: 'Oso Tenuto',
    role: 'Maestro de Sonidos Largos',
    description: 'Estira las notas de manera suave, prolongada y expresiva. Nos enseña a expandir el cuerpo y realizar movimientos fluidos de lado a lado.',
    color: 'from-rose-400 to-red-500 shadow-rose-200',
    avatar: '🐻',
    skill: 'Método Dalcroze: Movimiento Ligado, Tenido y Amplio'
  }
];

export const tutorialSteps = [
  {
    step: '1',
    title: '¡Dale Play!',
    description: 'Inicia la historia con el botón gigante. El video animado comenzará a reproducirse en el televisor o pantalla de tu aula capturando la atención de los niños.'
  },
  {
    step: '2',
    title: 'Sigue la Trama',
    description: 'Usa el botón "Siguiente" para guiar la historia. Cuando vayas a los desafíos, el reproductor se pausará solo y lanzará una actividad rítmica de Dalcroze en pantalla.'
  },
  {
    step: '3',
    title: '¡A Mover el Cuerpo!',
    description: 'Los niños juegan el reto corporal en el salón (ej. marchar u ocultarse). Al completarlo, pulsa "Reto Completado" para reanudar la aventura.'
  }
];

export const adventureMoments: MomentDetails[] = [
  {
    id: 0,
    title: 'El Despertar del Bosque Rítmico',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-cute-rabbit-in-nature-39757-large.mp4',
    caption: 'El conejo Adaggio bosteza en su madriguera. ¡La aventura musical de hoy está por arrancar junto a los niños!',
    hasPopup: false
  },
  {
    id: 1,
    title: 'Reto Rítmico: ¡Despierta los Árboles!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32115-large.mp4',
    caption: '¡El Bosque está dormido! Los niños deben marchar aplaudiendo en sincronía constante con el metrónomo visual de Adaggio.',
    hasPopup: true,
    popupType: 'pulse'
  },
  {
    id: 2,
    title: 'Descubriendo el Sendero Alegre',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-cute-rabbit-in-nature-39757-large.mp4',
    caption: '¡Pulso regular activado! El bosque se llena de flores multicolores y Adaggio salta emocionado por el camino alegre.',
    hasPopup: false
  },
  {
    id: 3,
    title: 'Reto Físico: ¡El Laberinto de las Estatuas!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-32115-large.mp4',
    caption: '¡Magia en el sendero! Si brilla la señal AZUL todos marchan en el aula, pero si brilla VERDE todos se detienen como estatuas de piedra.',
    hasPopup: true,
    popupType: 'reaction'
  },
  {
    id: 4,
    title: '¡La Fiesta Final de Do Re Mi!',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-animation-of-a-cute-rabbit-in-nature-39757-large.mp4',
    caption: '¡Reto superado con éxito! Adaggio y todos los niños del aula celebran bailando. ¡La música es movimiento!',
    hasPopup: false
  }
];
