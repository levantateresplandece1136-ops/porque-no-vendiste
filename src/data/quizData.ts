export interface QuestionOption {
  text: string;
  scoreMap: {
    [key: string]: number;
  };
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface Achievement {
  triggerAfterQuestion: number;
  title: string;
  subtitle: string;
  badge: string;
  stats: string;
  type: "achievement" | "error" | "status";
}

export interface Result {
  id: string;
  emoji: string;
  title: string;
  excuse: string;
  description: string;
  stats: {
    autoengano: number;
    responsabilidad: number;
    dramatizacion: number;
    probabilidadRepetir: number;
    estadoProspecto: string;
  };
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "¿Qué haces para retrasar conscientemente tu primera llamada del día?",
    options: [
      {
        text: "Entro en una meditación cuántica de 55 minutos para diluir mi pánico existencial al rechazo comercial.",
        scoreMap: { caracol: 3, perezoso: 1 }
      },
      {
        text: "Me preparo un café con espuma simétrica y me quedo catatónico mirando fijamente el botón verde de llamar.",
        scoreMap: { cafe: 3, silla: 1 }
      },
      {
        text: "Fingo que 'audito el pipeline' en WhatsApp Web revisando detenidamente los estados de la tía de mi prospecto.",
        scoreMap: { mercurio: 2, taco: 1 }
      },
      {
        text: "Espero inmóvil a que el horóscopo comercial de TikTok me garantice que el cosmos aprueba mi pitch de ventas hoy.",
        scoreMap: { luna: 3, senal: 2 }
      }
    ]
  },
  {
    id: 2,
    text: "El prospecto te deja en 'visto' durante 4 horas enteras. ¿Cuál es tu conclusión lógica?",
    options: [
      {
        text: "Asumo inmediatamente que fue abducido por extraterrestres y configuro el lead en el CRM como: 'Luto Intergaláctico'.",
        scoreMap: { dino: 3, luna: 1 }
      },
      {
        text: "Le grabo un audio de 9 minutos susurrando los beneficios de nuestra suscripción con técnica de ASMR corporativo.",
        scoreMap: { gusano: 3, boton: 1 }
      },
      {
        text: "Bloqueo preventivamente al cliente para ahorrarle la vergüenza cósmica de ignorarme. Salvaguardo mi dignidad.",
        scoreMap: { boton: 3, sillon: 1 }
      },
      {
        text: "Comprendo que está en un retiro espiritual silencioso en una cueva del Tíbet sin cobertura wifi reflexionando sobre mi cotización.",
        scoreMap: { perezoso: 3, senal: 2 }
      }
    ]
  },
  {
    id: 3,
    text: "Son las 1:40 pm, llevas exactamente cero ventas y tu estómago ruge. ¿Qué te dices a ti mismo?",
    options: [
      {
        text: "El universo me está ordenando dormir una siesta táctica de recuperación. La abundancia llegará por ósmosis cerebral.",
        scoreMap: { senal: 3, luna: 2 }
      },
      {
        text: "Marketing me odia. Los leads venían tan congelados que tuve que prender la calefacción de la oficina para abrir el Excel.",
        scoreMap: { mercurio: 3, dino: 1 }
      },
      {
        text: "Una microfluctuación gravitacional del sol interrumpió el electromagnetismo de mi carisma comercial. Fuerza mayor.",
        scoreMap: { luna: 3, dino: 2 }
      },
      {
        text: "Hoy es un día de duelo macroeconómico no oficial. Sería una falta de respeto a la patria intentar vender en esta recesión.",
        scoreMap: { gusano: 2, sillon: 2 }
      }
    ]
  },
  {
    id: 4,
    text: "El prospecto te dice: 'Oye, está muy caro'. ¿Cómo reacciona tu cerebro herido?",
    options: [
      {
        text: "'Tiene toda la boca llena de razón, estimado. Es un robo sin sentido. Huyamos juntos de esta estafa corporativa.'",
        scoreMap: { gusano: 3, perezoso: 2 }
      },
      {
        text: "Pienso: 'Usted no posee la madurez neuronal ni el refinamiento espiritual para asimilar la opulencia de nuestro plan premium.'",
        scoreMap: { senal: 2, caracol: 1 }
      },
      {
        text: "Sufro un microinfarto y le ofrezco un descuento del 130% donde nosotros le pagamos a él por usar el software.",
        scoreMap: { boton: 3, taco: 1 }
      },
      {
        text: "Me pongo a filosofar: ¿Acaso el dinero no es una ilusión transitoria? Le sugiero un trueque místico de hortalizas o poemas.",
        scoreMap: { dino: 3, sillon: 2 }
      }
    ]
  },
  {
    id: 5,
    text: "Abres el CRM a las 8:00 am con cara de pocos amigos. ¿Cuál es tu primera maniobra?",
    options: [
      {
        text: "Hago F5 unas 27 veces esperando que un hacker de Europa del Este haya cerrado mis tratos por error de código.",
        scoreMap: { senal: 3, mercurio: 1 }
      },
      {
        text: "Arrastro elegantemente la tarea 'Llamar a 40 leads urgentes' a la carpeta 'Para cuando gane la lotería o el fin del mundo'.",
        scoreMap: { caracol: 3, silla: 2 }
      },
      {
        text: "Cierro la pestaña de inmediato. Científicos de Harvard confirman que la interfaz gris del CRM genera dermatitis por estrés.",
        scoreMap: { boton: 3, sillon: 2 }
      },
      {
        text: "Clasifico mis prospectos según su compatibilidad astral con mi carta natal comercial para optimizar la sinergia cuántica.",
        scoreMap: { caracol: 3, cafe: 1 }
      }
    ]
  },
  {
    id: 6,
    text: "¿Cuál es tu estrategia de prospección más depurada y extraña?",
    options: [
      {
        text: "Stalkear al CEO de la cuenta a las 3:17 AM y darle 'Me divierte' a su foto de perfil de graduación de 2011.",
        scoreMap: { senal: 2, luna: 2 }
      },
      {
        text: "Mandar un PDF no solicitado de 180 páginas y encender una vela con aroma a vainilla para canalizar la abundancia.",
        scoreMap: { gusano: 3, boton: 1 }
      },
      {
        text: "Pensar en el cliente con violencia mental e intensidad psíquica mientras mastico un taco frío de dudosa procedencia.",
        scoreMap: { taco: 3, sillon: 1 }
      },
      {
        text: "Garantizar el sagrado derecho humano a la paz mental, dejando en paz al prospecto para no alterar su ecosistema emocional.",
        scoreMap: { perezoso: 3, silla: 1 }
      }
    ]
  },
  {
    id: 7,
    text: "Tu némesis de la oficina suena la campana de ventas ruidosamente. ¿Qué piensas?",
    options: [
      {
        text: "Claramente hizo un pacto satánico o sus tíos son los dueños de la empresa compradora. No tengo pruebas pero tampoco dudas.",
        scoreMap: { mercurio: 3, dino: 1 }
      },
      {
        text: "Utilizó técnicas de hipnosis prohibidas por la Convención de Ginebra. Es un criminal de guerra de las ventas.",
        scoreMap: { luna: 3, senal: 1 }
      },
      {
        text: "El público compra cualquier basura por lástima. Mi impecable superioridad intelectual me impide rogar por dinero.",
        scoreMap: { gusano: 3, caracol: 1 }
      },
      {
        text: "Su silla giratoria tiene una mejor alineación de karma con el router de internet. El favoritismo del mobiliario es obvio.",
        scoreMap: { silla: 3, sillon: 1 }
      }
    ]
  },
  {
    id: 8,
    text: "El prospecto te suelta la mítica frase: 'Déjame pensarlo y yo te aviso'. ¿Qué haces?",
    options: [
      {
        text: "Lo registro en mi reporte semanal como: 'Trato cerrado al 99.9%' y me voy a almorzar unos chilaquiles de 3 horas.",
        scoreMap: { taco: 3, caracol: 2 }
      },
      {
        text: "Me quedo petrificado mirando la pantalla durante 40 minutos esperando que me caiga un rayo de telequinesis telefónica.",
        scoreMap: { senal: 2, silla: 2 }
      },
      {
        text: "Le pregunto si prefiere que lo acose por WhatsApp, SMS, Telegram, LinkedIn, Tinder o señales de humo volcánico.",
        scoreMap: { boton: 3, gusano: 1 }
      },
      {
        text: "Acepto su maravillosa mentira piadosa, borro su contacto para no alterar la fantasía y empiezo a planear mi jubilación.",
        scoreMap: { sillon: 3, dino: 2 }
      }
    ]
  },
  {
    id: 9,
    text: "¿Cuál de estas barreras físicas e insólitas te impidió vender hoy?",
    options: [
      {
        text: "La densidad gravitatoria de mi silla ergonómica subió un 1200%, impidiéndome físicamente levantar los brazos.",
        scoreMap: { silla: 3, sillon: 2 }
      },
      {
        text: "El botón de 'Enviar' emite una luz hostil de radiación beta que deteriora instantáneamente mi carisma psicosomático.",
        scoreMap: { boton: 3, senal: 1 }
      },
      {
        text: "El cliente padece un trastorno obsesivo-compulsivo muy grave consistente en querer conservar sus fondos monetarios.",
        scoreMap: { perezoso: 3, gusano: 2 }
      },
      {
        text: "Tengo las yemas de los dedos demasiado lubricadas por la grasa de las papitas y se resbalan al teclear el número telefónico.",
        scoreMap: { caracol: 3, cafe: 1 }
      }
    ]
  },
  {
    id: 10,
    text: "Aparece tu jefe de la nada y pregunta: '¿Cómo va el pipeline de cierres de hoy?'",
    options: [
      {
        text: "'Jefe, estoy incubando la venta en el éter cuántico. Es un proceso orgánico de maduración mística que no debe ser apurado.'",
        scoreMap: { senal: 3, luna: 2 }
      },
      {
        text: "'El prospecto está alineando sus KPIs anuales con los chakras de su junta directiva. Yo no interrumpiría ese flujo sagrado.'",
        scoreMap: { luna: 3, perezoso: 1 }
      },
      {
        text: "'Aplico psicología inversa de nivel FBI: los ignoro con frialdad ártica para que sientan el vacío existencial y me rueguen.'",
        scoreMap: { caracol: 3, dino: 2 }
      },
      {
        text: "Desvío su atención de inmediato lanzando una bomba de humo verbal sobre el impacto de los microchips de Taiwán.",
        scoreMap: { taco: 2, sillon: 2 }
      }
    ]
  },
  {
    id: 11,
    text: "¿Qué banda sonora sintoniza mejor con tu inactividad comercial?",
    options: [
      {
        text: "Ruido de tormenta monzónica con truenos para que mis suspiros de frustración pasen desapercibidos en la oficina.",
        scoreMap: { cafe: 2, silla: 2 }
      },
      {
        text: "Música de ascensor ruso en bucle infinito para aclimatar mi cerebro al estado de coma vegetativo del pipeline.",
        scoreMap: { sillon: 3, perezoso: 2 }
      },
      {
        text: "Subliminales de 'Atrae millones de dólares durmiendo' mientras juego Candy Crush con el brillo de la pantalla al mínimo.",
        scoreMap: { senal: 3, taco: 1 }
      },
      {
        text: "Silencio sepulcral de tumba egipcia para poder escuchar la desintegración molecular de mis metas trimestrales.",
        scoreMap: { gusano: 3, boton: 1 }
      }
    ]
  },
  {
    id: 12,
    text: "El día acaba con cero ventas. ¿Cuál es tu pretexto definitivo de autoprotección?",
    options: [
      {
        text: "'El CRM colapsó por sobrecarga electromagnética planetaria' (se me cerró la pestaña al intentar abrir un video de gatitos).",
        scoreMap: { mercurio: 3, silla: 1 }
      },
      {
        text: "'Es fin de mes: las empresas están en hibernación financiera extrema y cuidan el flujo como dragones medievales.'",
        scoreMap: { perezoso: 3, caracol: 1 }
      },
      {
        text: "'Es principio de mes: las corporaciones apenas están despertando de su letargo místico, no hay que alterar el ecosistema.'",
        scoreMap: { sillon: 3, dino: 1 }
      },
      {
        text: "Un eclipse solar inesperado dejó estática estelar en mi magnetismo vocal de cerrador de tratos. Fuerza mayor cósmica.",
        scoreMap: { luna: 3, senal: 2 }
      }
    ]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    triggerAfterQuestion: 3,
    title: "🏆 Maestro del 'Mañana'",
    subtitle: "+15 Procrastinación adquirida",
    badge: "⏳",
    stats: "Tu habilidad de aplazar llamadas ha subido a nivel Avanzado.",
    type: "achievement"
  },
  {
    triggerAfterQuestion: 6,
    title: "⚠️ Responsabilidad No Encontrada",
    subtitle: "Sistema detectó exceso de optimismo",
    badge: "🤖",
    stats: "La CPU comercial ha entrado en modo 'Rezar para que compren sin llamar'.",
    type: "error"
  },
  {
    triggerAfterQuestion: 9,
    title: "☕ Café Emocional Obtenido",
    subtitle: "La cafeína ha reemplazado tus ganas de vivir",
    badge: "☕",
    stats: "Disciplina actual: 2%. Ganas de tomar otro espresso: 98%.",
    type: "status"
  }
];

export const RESULTS: Result[] = [
  {
    id: "dino",
    emoji: "🦕",
    title: "Dinosaurio Comercial",
    excuse: "Los dinosaurios extinguieron mi motivación.",
    description: "Sientes que tu fuerza comercial pertenece a otra era geológica. El mercado moderno te parece hostil, ruidoso y lleno de meteoritos (juntas de Zoom). Decidiste que la mejor forma de proteger tu especie es no hacer absolutamente nada y esperar a que el clima corporativo sea más amigable.",
    stats: {
      autoengano: 92,
      responsabilidad: 4,
      dramatizacion: 96,
      probabilidadRepetir: 99.1,
      estadoProspecto: "Sigue esperando tu llamada, o tal vez ya se fosilizó de tanto esperar."
    }
  },
  {
    id: "gusano",
    emoji: "🐛",
    title: "Filósofo de Jardín",
    excuse: "Un gusano cuestionó mi ética laboral.",
    description: "Para ti, vender no es un tema de números, es un dilema moral. ¿Quién eres tú para interrumpir la paz del cliente con un pitch de ventas? Te pasaste el día contemplando la vacuidad de las transacciones monetarias y cuestionando si el capitalismo realmente necesita que agendes esa demo.",
    stats: {
      autoengano: 85,
      responsabilidad: 8,
      dramatizacion: 91,
      probabilidadRepetir: 94.5,
      estadoProspecto: "Disfruta de un silencio pacífico libre de spam comercial. Gracias a ti."
    }
  },
  {
    id: "cafe",
    emoji: "☕",
    title: "Adicto al Café de Pasillo",
    excuse: "El café tenía muy poca autoestima y me contagió.",
    description: "Tu día comercial consistió en 10% mirar el CRM, 10% suspirar y 80% preparar, recalentar, comentar o buscar café. Convenciste a tu cerebro de que no podías marcar sin la taza perfecta, pero cuando la tuviste, la temperatura no era la adecuada. Un ciclo infinito de cafeína ineficiente.",
    stats: {
      autoengano: 94,
      responsabilidad: 12,
      dramatizacion: 78,
      probabilidadRepetir: 98.2,
      estadoProspecto: "Se enteró de que te tomaste 4 cafés antes de siquiera abrir su correo."
    }
  },
  {
    id: "senal",
    emoji: "🛰️",
    title: "Señal Cósmica Perdida",
    excuse: "Mi señal de disciplina estaba fuera de cobertura.",
    description: "Vives en el plano mental de las intenciones perfectas. En tu cabeza hoy cerraste 4 cuentas corporativas gigantescas y diste un discurso de motivación. Desafortunadamente, cuando quisiste bajar ese potencial al plano de la realidad tridimensional, el módem del entusiasmo no conectó con el servidor de la acción.",
    stats: {
      autoengano: 97,
      responsabilidad: 5,
      dramatizacion: 89,
      probabilidadRepetir: 99.6,
      estadoProspecto: "Te tiene guardado en WhatsApp como 'Vendedor Fantasma'."
    }
  },
  {
    id: "sillon",
    emoji: "🥔",
    title: "Papa de Sillón",
    excuse: "El sillón me aplicó una llave de lucha libre.",
    description: "Fuiste víctima de la gravedad ergonómica. La comodidad de tu silla o sillón generó un campo gravitatorio del cual ningún ser humano podría escapar. Cada intento de estirar el brazo para tomar el teléfono fue repelido por el acolchado de alta densidad. Una derrota física incuestionable.",
    stats: {
      autoengano: 96,
      responsabilidad: 3,
      dramatizacion: 95,
      probabilidadRepetir: 98.9,
      estadoProspecto: "Compró con la competencia mientras tú acomodabas el cojín lumbar."
    }
  },
  {
    id: "taco",
    emoji: "🌮",
    title: "Gourmet Emocional",
    excuse: "El taco de canasta necesitaba mi acompañamiento espiritual.",
    description: "La hora del almuerzo comenzó a las 11:30 am y terminó de procesarse a las 5:30 pm. Decidiste que la digestión es un proceso sagrado que no debe ser profanado por llamadas en frío. Tu estómago estuvo muy activo, pero tu embudo de ventas se quedó con hambre.",
    stats: {
      autoengano: 88,
      responsabilidad: 10,
      dramatizacion: 82,
      probabilidadRepetir: 97.4,
      estadoProspecto: "Sigue esperando tu llamada mientras tú buscas salsa verde que no pique."
    }
  },
  {
    id: "boton",
    emoji: "📞",
    title: "Fóbico de la Tecla Verde",
    excuse: "El botón de llamar se veía sospechosamente agresivo hoy.",
    description: "Desarrollaste una fobia instantánea e irracional al botón de llamada. Sentiste que si hacías clic, el teléfono explotaría o el cliente te gritaría cosas horribles. Pasaste el día redactando un correo de 4 párrafos que al final borraste porque contenía demasiada presión tipográfica.",
    stats: {
      autoengano: 91,
      responsabilidad: 15,
      dramatizacion: 94,
      probabilidadRepetir: 95.0,
      estadoProspecto: "Se pregunta por qué le mandaste una solicitud de conexión vacía en LinkedIn."
    }
  },
  {
    id: "perezoso",
    emoji: "🦥",
    title: "Defensor del Espacio Personal",
    excuse: "Estaba respetando el derecho constitucional de los prospectos a ser felices sin mí.",
    description: "Tu exceso de empatía es tu peor enemigo comercial. Decidiste que llamar a un cliente a las 10 am es muy temprano, a la 1 pm están comiendo, a las 4 pm están cansados y a las 6 pm ya salieron. Básicamente autodecretaste que no existe ningún milisegundo apto para vender en la historia humana.",
    stats: {
      autoengano: 93,
      responsabilidad: 6,
      dramatizacion: 87,
      probabilidadRepetir: 96.8,
      estadoProspecto: "Le compró a un vendedor pesado que lo llamó un domingo a las 8 am."
    }
  },
  {
    id: "mercurio",
    emoji: "👽",
    title: "Culpador del Sistema",
    excuse: "El CRM estaba en Mercurio y mi cerebro en modo ecológico.",
    description: "La culpa nunca es tuya, es del software. Si tan solo el CRM no tuviera ese botón tan confuso, o si los leads que te pasan no fueran recolectados del fondo de un océano congelado, serías millonario. Dedicaste el día a protestar internamente contra el departamento de marketing.",
    stats: {
      autoengano: 98,
      responsabilidad: 1,
      dramatizacion: 97,
      probabilidadRepetir: 99.9,
      estadoProspecto: "Su contacto está duplicado 4 veces en tu base de datos y nadie le ha marcado."
    }
  },
  {
    id: "silla",
    emoji: "🪑",
    title: "Agujero Negro Ergonómico",
    excuse: "La silla de oficina absorbió mis neutrones de proactividad.",
    description: "Tu silla no es un mueble, es un parásito energético. Apenas te sentaste, sentiste cómo succionaba tu fuerza de voluntad a través de tu columna vertebral. Lograste mantenerte con vida respirando lentamente, pero no te quedó energía residual para presionar el teclado.",
    stats: {
      autoengano: 95,
      responsabilidad: 7,
      dramatizacion: 92,
      probabilidadRepetir: 98.5,
      estadoProspecto: "No sabe que tu silla de oficina es la culpable directa de su falta de software."
    }
  },
  {
    id: "caracol",
    emoji: "🐌",
    title: "Perfeccionista de Alta Velocidad",
    excuse: "Iba demasiado rápido... decidí descansar para no fatigar el motor.",
    description: "Hiciste una lista de tareas impecable, limpiaste el escritorio, ordenaste tus cables, leíste las noticias del sector y actualizaste tu perfil de LinkedIn. Sentiste que ibas a una velocidad tan vertiginosa de preparación que necesitaste descansar 3 horas para evitar un burnout. Al final, no quedó tiempo para marcar.",
    stats: {
      autoengano: 90,
      responsabilidad: 11,
      dramatizacion: 85,
      probabilidadRepetir: 96.2,
      estadoProspecto: "Ya contrató un servicio alternativo mientras tú ordenabas tus lápices."
    }
  },
  {
    id: "luna",
    emoji: "🌙",
    title: "Vendedor Astrológico",
    excuse: "La luna estaba en la fase 'Luego marco'.",
    description: "Sientes que el éxito comercial está regido por fuerzas cósmicas incontrolables. Como hoy la luna no estaba en la constelación de los cierres agresivos, sabías que cualquier esfuerzo iba a ser en vano. Decidiste no desafiar el orden natural del universo y te dedicaste a leer tu horóscopo comercial.",
    stats: {
      autoengano: 99,
      responsabilidad: 2,
      dramatizacion: 99,
      probabilidadRepetir: 99.8,
      estadoProspecto: "Sigue esperando su cotización mientras tú culpas a la marea."
    }
  }
];
