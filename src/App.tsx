import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Skull, 
  Trophy, 
  AlertTriangle, 
  Coffee, 
  Share2, 
  RefreshCw, 
  FileText, 
  ShieldAlert, 
  Sparkles, 
  User, 
  TrendingDown, 
  Award, 
  Clock, 
  Check, 
  Copy,
  ChevronRight,
  TrendingUp,
  Brain,
  WifiOff
} from "lucide-react";
import { QUESTIONS, ACHIEVEMENTS, RESULTS, Result, Achievement } from "./data/quizData";

// Lista de apodos graciosos de vendedores para el generador aleatorio
const FUNNY_ALIASES = [
  "Lobo de Wall Street (Versión Coppel)",
  "Tiburón de Pecera",
  "Campeón del Mañana Sin Falta",
  "Cerrador Profesional de Pestañas",
  "Soldado Caído del Pipeline",
  "Maestro del Follow-up Fantasma",
  "Rey del CRM en Blanco",
  "Líder de Prospectos Fríos",
  "Buscador de Señales Cósmicas",
  "Evitador de Llamadas Senior"
];

// Mensajes divertidos para la pantalla de carga del diagnóstico
const LOADING_MESSAGES = [
  "Invocando excusas cuánticas...",
  "Calculando coeficiente de fobia al botón de llamar...",
  "Analizando ondas cerebrales de procrastinación...",
  "Buscando al culpable del pipeline vacío (spoiler: eres tú)...",
  "Consultando el horóscopo comercial de Mercurio Retrógrado...",
  "Midiendo la resistencia lumbar al sillón ergonómico...",
  "Evaluando tu relación tóxica con el café de la oficina...",
  "Generando reporte de incompetencia altamente irresponsable..."
];

export default function App() {
  // Estados de la app
  const [step, setStep] = useState<"intro" | "quiz" | "achievement" | "loading" | "result">("intro");
  const [userName, setUserName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({});
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [finalResult, setFinalResult] = useState<Result | null>(null);
  const [copied, setCopied] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ qId: number; text: string }[]>([]);

  // Inicializar puntajes al iniciar
  const startQuiz = () => {
    const initialScores: { [key: string]: number } = {};
    RESULTS.forEach(r => {
      initialScores[r.id] = 0;
    });
    setScores(initialScores);
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setStep("quiz");
  };

  // Generar apodo aleatorio
  const randomizeName = () => {
    const randomIndex = Math.floor(Math.random() * FUNNY_ALIASES.length);
    setUserName(FUNNY_ALIASES[randomIndex]);
  };

  // Efecto para la simulación de carga
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === "loading") {
      setLoadingMsgIndex(0);
      interval = setInterval(() => {
        setLoadingMsgIndex(prev => {
          if (prev < LOADING_MESSAGES.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            calculateResultAndShow();
            return prev;
          }
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [step]);

  // Manejar respuesta de una pregunta
  const handleAnswerSelect = (scoreMap: { [key: string]: number }, optionText: string) => {
    // Guardar respuesta para detalles si los quisiéramos mostrar
    setSelectedAnswers(prev => [...prev, { qId: QUESTIONS[currentQuestionIndex].id, text: optionText }]);

    // Actualizar puntajes
    const updatedScores = { ...scores };
    Object.keys(scoreMap).forEach(key => {
      if (updatedScores[key] !== undefined) {
        updatedScores[key] += scoreMap[key];
      }
    });
    setScores(updatedScores);

    // Avanzar directamente al siguiente paso sin interrupciones de logros de nivel
    advanceQuiz();
  };

  // Avanzar en el quiz o finalizar
  const advanceQuiz = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setStep("quiz");
    } else {
      setStep("loading");
    }
  };

  // Calcular el resultado final
  const calculateResultAndShow = () => {
    // Encontrar el ID con el puntaje más alto
    let highestId = "sillon"; // default fallback
    let highestScore = -1;

    Object.keys(scores).forEach(id => {
      if (scores[id] > highestScore) {
        highestScore = scores[id];
        highestId = id;
      }
    });

    const result = RESULTS.find(r => r.id === highestId) || RESULTS[0];
    setFinalResult(result);
    setStep("result");
  };

  // Copiar diagnóstico al portapapeles
  const handleCopyToClipboard = () => {
    if (!finalResult) return;
    const nameToUse = userName.trim() || "Soldado Caído";
    const text = `💀 ¿POR QUÉ NO VENDISTE HOY? 💀\n\n` +
      `👤 Vendedor: ${nameToUse}\n` +
      `🏆 Diagnóstico: ${finalResult.emoji} ${finalResult.title}\n` +
      `👉 Excusa oficial: "${finalResult.excuse}"\n\n` +
      `📊 REPORTE CIENTÍFICO:\n` +
      `• Nivel de Autoengaño: ${finalResult.stats.autoengano}%\n` +
      `• Nivel de Responsabilidad: ${finalResult.stats.responsabilidad}%\n` +
      `• Nivel de Dramatización: ${finalResult.stats.dramatizacion}%\n` +
      `• Probabilidad de repetir mañana: ${finalResult.stats.probabilidadRepetir}%\n` +
      `• Estado del prospecto: ${finalResult.stats.estadoProspecto}\n\n` +
      `Realiza tu propio diagnóstico irresponsable en: ${window.location.href}`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Reiniciar todo
  const restartAll = () => {
    setUserName("");
    setScores({});
    setCurrentQuestionIndex(0);
    setActiveAchievement(null);
    setFinalResult(null);
    setSelectedAnswers([]);
    setStep("intro");
  };

  // Obtener porcentaje de progreso actual del quiz
  const progressPercent = Math.round(((currentQuestionIndex) / QUESTIONS.length) * 100);

  return (
    <div id="app-root" className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans antialiased selection:bg-yellow-500 selection:text-slate-900">
      {/* HEADER DECORATIVO */}
      <header id="main-header" className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xl">💀</span>
            <div>
              <h1 className="font-mono text-xs font-bold tracking-widest text-yellow-400 uppercase">
                Diagnóstico Comercial Irresponsable v4.2
              </h1>
              <p className="text-[10px] text-slate-500 font-mono">
                Sarcasmo automatizado • No apto para jefes de ventas
              </p>
            </div>
          </div>
          {step === "quiz" && (
            <div className="text-right font-mono text-xs text-slate-400">
              Progreso: <span className="text-yellow-400 font-bold">{progressPercent}%</span>
            </div>
          )}
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          
          {/* 1. INTRO STEP */}
          {step === "intro" && (
            <motion.div
              key="intro-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-lg bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-sm"
              id="intro-card"
            >
              {/* Luces decorativas */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="text-center space-y-6">
                <div className="inline-block bg-slate-950 p-4 rounded-full border border-yellow-500/20 shadow-inner">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, repeatDelay: 1 }}
                  >
                    <Skull className="w-12 h-12 text-yellow-400" />
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    ¿POR QUÉ NO <span className="text-yellow-400">VENDISTE</span> HOY?
                  </h2>
                  <p className="text-sm font-semibold tracking-wide text-red-400 font-mono">
                    "Un diagnóstico completamente irresponsable de tu desempeño comercial."
                  </p>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 text-sm space-y-2 leading-relaxed">
                  <p>Responde con total honestidad.</p>
                  <p className="text-xs text-slate-500 italic">
                    La mística de la procrastinación y la IA desenmascararán el verdadero y absurdo pretexto por el que hoy cerraste en cero.
                  </p>
                </div>

                {/* Formulario de Nombre */}
                <div className="space-y-3 text-left">
                  <label className="block text-xs font-mono tracking-wider text-slate-400 uppercase">
                    Introduce tu nombre (o tu alias comercial):
                  </label>
                  <div className="flex space-x-2">
                    <div className="relative flex-grow">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Ej. Soldado Caído del Pipeline"
                        maxLength={40}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                        id="user-name-input"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={randomizeName}
                      className="px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl transition-colors flex items-center justify-center text-xs font-mono"
                      title="Generar apodo gracioso aleatorio"
                      id="randomize-name-btn"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-400 mr-1.5" />
                      Apodo
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono">
                    *Si lo dejas en blanco, te asignaremos un alias por default según tu nivel de cobardía comercial.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={startQuiz}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-bold py-4 px-6 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
                    id="start-quiz-btn"
                  >
                    <span>COMENZAR EXAMEN DE CONCIENCIA</span>
                    <ChevronRight className="w-5 h-5 stroke-[3px]" />
                  </button>
                </div>

                <div className="flex items-center justify-center space-x-4 pt-2 text-[11px] text-slate-500 font-mono">
                  <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 2 min máx</span>
                  <span>•</span>
                  <span className="flex items-center"><TrendingDown className="w-3.5 h-3.5 mr-1" /> 0% coaching</span>
                  <span>•</span>
                  <span className="flex items-center text-red-500"><Skull className="w-3.5 h-3.5 mr-1" /> 100% Roast</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. QUIZ STEP */}
          {step === "quiz" && (
            <motion.div
              key="quiz-step"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm"
              id="quiz-card"
            >
              {/* Barra de progreso Kahoot/Duolingo style */}
              <div className="w-full bg-slate-950 h-2.5 relative">
                <motion.div
                  className="bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 h-full rounded-r-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              <div className="p-6 md:p-8 space-y-6">
                {/* Cabecera de pregunta */}
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
                  <span className="px-3 py-1 bg-slate-950 text-[11px] font-mono font-bold tracking-wider rounded-full border border-slate-800 text-yellow-400 uppercase">
                    Pregunta {currentQuestionIndex + 1} de {QUESTIONS.length}
                  </span>
                  <div className="flex items-center space-x-1 text-slate-500 text-xs font-mono">
                    <Brain className="w-3.5 h-3.5" />
                    <span>Calculando cinismo...</span>
                  </div>
                </div>

                {/* Pregunta */}
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
                    {QUESTIONS[currentQuestionIndex].text}
                  </h3>
                </div>

                {/* Opciones */}
                <div className="grid grid-cols-1 gap-3 pt-2">
                  {QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                    // Let's color index prefixes beautifully like Kahoot!
                    const prefixColors = [
                      "border-red-500 text-red-400 bg-red-500/5",
                      "border-blue-500 text-blue-400 bg-blue-500/5",
                      "border-yellow-500 text-yellow-400 bg-yellow-500/5",
                      "border-green-500 text-green-400 bg-green-500/5"
                    ];
                    const labels = ["▲", "⬢", "■", "●"];

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option.scoreMap, option.text)}
                        className="w-full text-left bg-slate-950/40 hover:bg-slate-900/80 border border-slate-800 hover:border-slate-700 p-4 rounded-xl transition-all duration-150 flex items-start space-x-4 cursor-pointer group hover:shadow-lg hover:-translate-y-[1px]"
                        id={`option-${index}`}
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold shrink-0 border ${prefixColors[index % 4]}`}>
                          {labels[index % 4]}
                        </span>
                        <span className="text-slate-300 text-sm md:text-base font-medium group-hover:text-white transition-colors pt-0.5 leading-relaxed">
                          {option.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Pie de pregunta */}
              <div className="bg-slate-950/60 p-4 border-t border-slate-800/40 text-center">
                <p className="text-[10px] text-slate-500 font-mono">
                  Recuerda: Tus respuestas serán examinadas por un tribunal virtual de alta intolerancia.
                </p>
              </div>
            </motion.div>
          )}

          {/* 3. ACHIEVEMENT INTERLUDE */}
          {step === "achievement" && activeAchievement && (
            <motion.div
              key="achievement-step"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-full max-w-md bg-slate-900 border border-yellow-500/30 rounded-2xl p-6 md:p-8 text-center shadow-2xl relative overflow-hidden"
              id="achievement-card"
            >
              {/* Flashing overlay effects */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500 animate-pulse" />
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-yellow-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div className="inline-block bg-slate-950 p-6 rounded-full border border-yellow-500/30 shadow-inner text-5xl relative">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    {activeAchievement.badge}
                  </motion.div>
                  <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-slate-950 text-[9px] font-mono font-black px-1.5 py-0.5 rounded-md uppercase tracking-tight">
                    NUEVO
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-yellow-400 font-mono text-xs font-bold tracking-widest uppercase">
                    ¡LOGRO DESBLOQUEADO!
                  </h4>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {activeAchievement.title}
                  </h3>
                  <p className="text-sm text-slate-300 font-medium italic">
                    "{activeAchievement.subtitle}"
                  </p>
                </div>

                {/* Sarcastic achievement state table */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left font-mono text-xs space-y-2.5">
                  <div className="flex justify-between items-center text-slate-500 pb-1 border-b border-slate-800/60">
                    <span>REGISTRO DEL SISTEMA</span>
                    <span className="text-red-400 font-bold">● EXCESO_DE_CÓDIGO_POSTAL</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    {activeAchievement.stats}
                  </p>
                  <div className="text-[10px] text-slate-500 flex justify-between items-center bg-slate-900/50 p-1.5 rounded">
                    <span>Estado disciplina:</span>
                    <span className="text-yellow-400 font-bold">MODO_AHORRO_EMOCIONAL</span>
                  </div>
                </div>

                <button
                  onClick={advanceQuiz}
                  className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  id="achievement-continue-btn"
                >
                  <span>ENTENDIDO, VOLVER AL ROAST</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* 4. LOADING DIAGNOSTIC */}
          {step === "loading" && (
            <motion.div
              key="loading-step"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center shadow-2xl relative backdrop-blur-sm"
              id="loading-card"
            >
              <div className="space-y-8 py-6">
                {/* Animación del radar/scanner */}
                <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-yellow-500/10 rounded-full" />
                  <motion.div
                    className="absolute inset-0 border-4 border-t-yellow-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <Skull className="w-10 h-10 text-yellow-400 animate-pulse" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-mono text-yellow-400 font-bold uppercase tracking-widest">
                    Procesando Tu Destino
                  </h3>
                  <div className="h-6 overflow-hidden relative">
                    <AnimatePresence mode="popLayout">
                      <motion.p
                        key={loadingMsgIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xs md:text-sm font-mono text-slate-300 italic"
                      >
                        {LOADING_MESSAGES[loadingMsgIndex]}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Registro técnico simulado */}
                <div className="bg-slate-950 p-4 rounded-xl text-left font-mono text-[10px] text-slate-500 space-y-1 overflow-hidden h-28 border border-slate-800/40">
                  <p className="text-yellow-500/60">SYSTEM INITIALIZED...</p>
                  <p>CONNECTING_TO_CRM_DATABASE... OK</p>
                  <p>EXTRACTING_CALLS_LOGS... Found [0] calls today.</p>
                  <p className="text-red-400">WARNING: Lazy_Threshold exceeded 98.4%.</p>
                  {loadingMsgIndex >= 2 && <p>ANALYZING_COFFEE_TEMPERATURE... Optimal for procrastination.</p>}
                  {loadingMsgIndex >= 4 && <p className="text-yellow-500/60">INTERCEPTING_ASTROLOGICAL_FAILEDS... Luna in 'Later_Call' active.</p>}
                  {loadingMsgIndex >= 6 && <p className="text-red-500">ERROR_FATAL: Responsabilidad_Comercial not found.</p>}
                </div>
              </div>
            </motion.div>
          )}

          {/* 5. RESULT STEP */}
          {step === "result" && finalResult && (
            <motion.div
              key="result-step"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl space-y-6"
              id="result-container"
            >
              {/* Tarjeta de Diagnóstico Absurdo */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative" id="result-main-card">
                {/* Luces decorativas */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

                {/* Banner de "Eres" */}
                <div className="bg-slate-950 px-6 py-8 text-center border-b border-slate-800 relative">
                  <span className="text-6xl md:text-7xl block mb-4 filter drop-shadow-md">
                    {finalResult.emoji}
                  </span>
                  <h4 className="text-yellow-400 font-mono text-xs font-black tracking-widest uppercase mb-1">
                    EL VEREDICTO DE LA IA ES:
                  </h4>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {finalResult.title}
                  </h2>
                </div>

                <div className="p-6 md:p-8 space-y-6">
                  {/* Bloque de excusa oficial */}
                  <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl relative overflow-hidden">
                    <div className="absolute top-2 right-2 text-red-500/10">
                      <AlertTriangle className="w-12 h-12 stroke-[3px]" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-red-400 tracking-wider block uppercase mb-1">
                      Excusa Oficial Detectada:
                    </span>
                    <p className="text-lg md:text-xl font-bold text-slate-100 italic">
                      "{finalResult.excuse}"
                    </p>
                  </div>

                  {/* Descripción de Roast */}
                  <div className="space-y-2 leading-relaxed">
                    <h5 className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      REPORTE DE COMPORTAMIENTO:
                    </h5>
                    <p className="text-slate-300 text-sm md:text-base">
                      {finalResult.description}
                    </p>
                  </div>

                  {/* Diagnóstico Científico Falso */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 md:p-6 space-y-4">
                    <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
                      <ShieldAlert className="w-5 h-5 text-yellow-400" />
                      <h4 className="font-mono text-xs font-bold text-white tracking-wider uppercase">
                        DIAGNÓSTICO OFICIAL • PACIENTE: {userName.trim() || "Soldado Caído"}
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs text-slate-300">
                      {/* Stat 1 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">AUTOENGAÑO:</span>
                          <span className="text-yellow-400 font-bold">{finalResult.stats.autoengano}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-yellow-400 h-full rounded-full" 
                            style={{ width: `${finalResult.stats.autoengano}%` }} 
                          />
                        </div>
                      </div>

                      {/* Stat 2 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">RESPONSABILIDAD:</span>
                          <span className="text-green-400 font-bold">{finalResult.stats.responsabilidad}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-green-400 h-full rounded-full" 
                            style={{ width: `${finalResult.stats.responsabilidad}%` }} 
                          />
                        </div>
                      </div>

                      {/* Stat 3 */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-slate-400">DRAMATIZACIÓN:</span>
                          <span className="text-red-400 font-bold">{finalResult.stats.dramatizacion}%</span>
                        </div>
                        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="bg-red-400 h-full rounded-full" 
                            style={{ width: `${finalResult.stats.dramatizacion}%` }} 
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/60 font-mono text-xs text-slate-400">
                      <div>
                        <span className="text-slate-500 block">Probabilidad de repetir esta excusa mañana:</span>
                        <span className="text-red-400 font-bold text-sm">{finalResult.stats.probabilidadRepetir}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Estado actual del prospecto:</span>
                        <span className="text-slate-200 font-medium text-xs block mt-0.5">{finalResult.stats.estadoProspecto}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer de la tarjeta con botones */}
                <div className="bg-slate-950/80 px-6 py-5 border-t border-slate-800 flex flex-col md:flex-row gap-3">
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm font-semibold cursor-pointer"
                    id="copy-result-btn"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">¡COPIADO A SLACK/WHATSAPP!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-yellow-400" />
                        <span>COPIAR ROAST AL PORTAPAPELES</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setShowCertificate(true)}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 py-3 px-4 rounded-xl transition-all flex items-center justify-center space-x-2 text-sm font-extrabold cursor-pointer shadow-lg shadow-yellow-500/10 active:scale-[0.98]"
                    id="open-certificate-btn"
                  >
                    <Award className="w-4 h-4" />
                    <span>DESBLOQUEAR CERTIFICADO OFICIAL</span>
                  </button>
                </div>
              </div>

              {/* Botón de repetir */}
              <div className="text-center">
                <button
                  onClick={restartAll}
                  className="inline-flex items-center space-x-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white px-5 py-3 rounded-xl transition-all text-xs font-mono tracking-wider cursor-pointer"
                  id="restart-quiz-btn"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>INTENTAR CON OTRA EXCUSA (REPETIR TEST)</span>
                </button>
              </div>

              {/* MODAL CERTIFICATE OF INCOMPETENCE */}
              {showCertificate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
                  onClick={() => setShowCertificate(false)}
                  id="certificate-modal"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="w-full max-w-2xl bg-amber-50 text-slate-950 rounded-2xl p-6 md:p-8 shadow-2xl relative border-8 border-double border-amber-800"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Botón de cerrar */}
                    <button
                      onClick={() => setShowCertificate(false)}
                      className="absolute top-4 right-4 bg-slate-200 hover:bg-slate-300 p-2 rounded-full text-slate-800 transition-colors cursor-pointer"
                      title="Cerrar"
                    >
                      ✕
                    </button>

                    {/* Contenido del Certificado */}
                    <div className="text-center space-y-6 border border-amber-800/40 p-6 md:p-8 rounded-lg relative overflow-hidden bg-[radial-gradient(#d9770610_1px,transparent_1px)] [background-size:16px_16px]">
                      {/* Sello de agua/Escudo */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                        <Skull className="w-80 h-80 text-amber-900" />
                      </div>

                      <div className="space-y-2">
                        <span className="text-3xl md:text-4xl block">📜</span>
                        <h3 className="font-serif text-xs md:text-sm font-bold tracking-widest text-amber-800 uppercase">
                          ASOCIACIÓN INTERNACIONAL DE VENDEDORES PROCRASTINADORES
                        </h3>
                        <div className="h-[2px] bg-amber-800 w-32 mx-auto" />
                      </div>

                      <div className="space-y-4">
                        <h2 className="font-serif text-2xl md:text-3xl font-extrabold tracking-tight text-amber-950">
                          CERTIFICADO DE INCOMPETENCIA
                        </h2>
                        <h4 className="font-serif text-sm font-bold text-amber-800 tracking-wider uppercase">
                          COMERCIAL TEMPORAL
                        </h4>
                      </div>

                      <p className="font-serif text-sm italic text-amber-900 max-w-md mx-auto leading-relaxed">
                        Este documento oficial certifica solemnemente que el profesional de ventas con mentalidad de fin de semana:
                      </p>

                      {/* Nombre del vendedor */}
                      <div className="border-b-2 border-amber-900 inline-block px-8 py-2 font-serif text-xl md:text-2xl font-black text-amber-950 tracking-wide max-w-full truncate">
                        {userName.trim() || "Soldado Caído del Pipeline"}
                      </div>

                      <p className="font-serif text-xs md:text-sm text-amber-900 max-w-lg mx-auto leading-relaxed">
                        Ha demostrado habilidades excepcionales y altamente desarrolladas de evasión comercial el día de hoy, logrando adjudicar exitosamente su falta de ventas a la mítica excusa de:
                      </p>

                      <div className="bg-amber-100/60 py-3.5 px-4 rounded-lg font-mono text-xs md:text-sm text-amber-950 font-bold border border-amber-800/20 max-w-md mx-auto">
                        "{finalResult.excuse}"
                      </div>

                      <p className="font-serif text-[11px] text-amber-800/70 max-w-sm mx-auto leading-relaxed">
                        Por tanto, se le concede el derecho legítimo de tomar café sin culpa por el resto del día y de mover todas sus llamadas restantes de la semana para el lunes.
                      </p>

                      {/* Firmas y Fecha */}
                      <div className="grid grid-cols-2 gap-8 pt-8 border-t border-amber-800/20 font-serif text-xs">
                        <div className="space-y-1">
                          <p className="text-[10px] text-amber-800/60">FECHA DE EMISIÓN</p>
                          <p className="font-bold text-amber-950">2026-07-03</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-amber-800/60">FIRMA DEL TRIBUNAL</p>
                          <p className="font-bold text-amber-950 italic font-mono text-[10px] text-amber-700">La IA Irresponsable 🤖</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-3 justify-center text-xs">
                      <button
                        onClick={() => window.print()}
                        className="bg-amber-800 hover:bg-amber-900 text-amber-50 font-bold py-3 px-5 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <FileText className="w-4 h-4" />
                        <span>IMPRIMIR / GUARDAR EN PDF</span>
                      </button>
                      <button
                        onClick={() => setShowCertificate(false)}
                        className="bg-transparent hover:bg-amber-100 text-amber-900 border border-amber-800 py-3 px-5 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer font-medium"
                      >
                        <span>CERRAR VISTA CERTIFICADO</span>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER DECORATIVO */}
      <footer id="main-footer" className="py-6 px-6 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500 font-mono space-y-1">
        <p>© 2026 ¿POR QUÉ NO VENDISTE HOY? - Todos los derechos de autoengaño reservados.</p>
        <p className="text-[10px] text-slate-600">
          Ningún lead o vendedor de verdad fue herido durante el diagnóstico. Consulta a tu médico si experimentas síntomas de pánico al CRM.
        </p>
      </footer>
    </div>
  );
}
