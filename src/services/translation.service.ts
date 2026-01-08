import { Injectable, signal, computed } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  currentLang = signal<'es' | 'en'>('es');

  toggleLanguage() {
    this.currentLang.update(l => l === 'es' ? 'en' : 'es');
  }

  // Computed dictionary based on current language
  text = computed(() => {
    const isEs = this.currentLang() === 'es';
    return {
      general: {
        back: isEs ? 'Volver' : 'Back',
      },
      sidebar: {
        dashboard: isEs ? 'Tablero' : 'Dashboard',
        session: isEs ? 'Sesión Guiada' : 'Guided Session',
        progress: isEs ? 'Progreso' : 'Progress Tracker',
        metabolic: isEs ? 'Metabólico' : 'Metabolic Support',
        subtitle: isEs ? 'Portal de Bienestar' : 'Wellness Portal',
        member_type: isEs ? 'Miembro Pro' : 'Pro Member'
      },
      dashboard: {
        welcome: isEs ? 'Bienvenida, Elara' : 'Welcome back, Elara',
        subtitle: isEs ? 'Tu cuerpo está sanando. ¿Lista para la Fase 2?' : 'Your body is healing. Ready for Phase 2?',
        system_online: isEs ? 'Sistema En Línea' : 'System Online',
        next_up: isEs ? 'SIGUIENTE' : 'NEXT UP',
        card_title: isEs ? 'Esculpido de Piernas y Drenaje' : 'Leg Sculpting & Drainage',
        card_desc: isEs ? 'Prepara tu rodillo de madera y aceite. Enfócate en movimientos ascendentes.' : 'Prepare your wooden roller and oil. Focus on upward strokes to stimulate lymphatic flow.',
        start_btn: isEs ? 'Iniciar Sesión' : 'Start Session',
        phase_label: isEs ? 'Fase Actual' : 'Current Phase',
        week: isEs ? 'Semana 3' : 'Week 3',
        phase_title: isEs ? 'Drenaje Linfático' : 'Lymphatic Drainage',
        phase_desc: isEs ? 'Enfocada en eliminar toxinas y reducir retención.' : 'Focus on flushing toxins and reducing water retention.',
        prog_label: isEs ? 'Progreso del Programa' : 'Program Progress',
        sessions_done: isEs ? 'Sesiones Realizadas' : 'Sessions Done',
        streak: isEs ? 'Racha Semanal' : 'Weekly Streak',
        meta_title: isEs ? 'Salud Metabólica y Estadísticas' : 'Metabolic Health & Stats',
        daily_goal: isEs ? 'META DIARIA' : 'DAILY GOAL',
        hydration: isEs ? 'Hidratación' : 'Hydration',
        today: isEs ? 'HOY' : 'TODAY',
        anti_inflam: isEs ? 'Anti-Inflamatorio' : 'Anti-Inflammatory',
        score: isEs ? '/ 10 Puntos' : '/ 10 Score',
        waist: isEs ? 'Medida de Cintura' : 'Waist Measurement',
        great_progress: isEs ? 'Gran progreso.' : 'Great progress.',
        daily_fact: isEs ? 'DATO DIARIO' : 'DAILY FACT',
        fact_text: isEs ? '"Beber agua con limón antes de tu sesión puede mejorar el drenaje linfático al alcalinizar el cuerpo."' : '"Drinking lemon water before your session can enhance lymphatic drainage by alkalizing the body."',
        read_article: isEs ? 'Leer Artículo' : 'Read Article'
      },
      session: {
        active: isEs ? 'Sesión Activa' : 'Session Active',
        exit: isEs ? 'Salir' : 'Exit',
        step_count: isEs ? 'Paso 3 de 8' : 'Step 3 of 8',
        guided_tag: isEs ? 'Sesión Guiada' : 'Guided Session',
        title: isEs ? 'Copa Sueca: Esculpido Abdomen' : 'Swedish Cup: Abdomen Sculpting',
        desc: isEs ? 'Sigue los pasos para estimular el drenaje y reducir adiposidad usando movimientos horarios.' : 'Follow along to stimulate lymphatic drainage and reduce localized adiposity using the classic clockwise motion.',
        tools: isEs ? 'Herramientas' : 'Tools Required',
        tool_cup: isEs ? 'Copa Sueca' : 'Swedish Cup',
        goals: isEs ? 'Objetivos' : 'Session Goals',
        goal_1: isEs ? 'Drenaje Linfático' : 'Lymphatic Drainage',
        goal_2: isEs ? 'Reducir Adiposidad' : 'Reduce Adiposity',
        steps_title: isEs ? 'Pasos de Rutina' : 'Routine Steps',
        complete: isEs ? 'Completo' : 'Complete',
        s1: isEs ? '1. Preparación e Hidratación' : '1. Preparation & Hydration',
        s2: isEs ? '2. Aplicación de Aceite' : '2. Oil Application',
        s3: isEs ? '3. Círculos Horarios' : '3. Clockwise Circles',
        s3_status: isEs ? 'En Progreso • 2:00 min' : 'In Progress • 2:00 min',
        s4: isEs ? '4. Contorno Lateral' : '4. Side Contouring',
        flow_title: isEs ? 'Dirección del Flujo' : 'Direction of Flow',
        flow_desc: isEs ? 'Guía siempre los movimientos hacia los ganglios inguinales para asegurar un drenaje correcto.' : 'Always guide the movements towards the groin lymph nodes to ensure proper drainage and toxin removal.'
      },
      progress: {
        check_in: isEs ? 'Chequeo Semana 4' : 'Week 4 Check-in',
        title: isEs ? 'Rastreo de Progreso' : 'Advanced Progress Tracking',
        desc: isEs ? 'Compara tu transformación y registra métricas.' : 'Compare your transformation and log precise metrics.',
        save: isEs ? 'Guardar' : 'Save Progress',
        compare_title: isEs ? 'Comparación de Fotos e IA' : 'Photo Comparison & AI Analysis',
        ghost: isEs ? 'Fantasma' : 'Ghost Overlay',
        before: isEs ? 'Antes (24 May)' : 'Before (May 24)',
        current: isEs ? 'Actual (24 Jun)' : 'Current (Jun 24)',
        upload: isEs ? 'Subir Nueva Foto' : 'Upload New Photo',
        analyze: isEs ? 'Analizar con IA' : 'Analyze with AI',
        analyzing: isEs ? 'Analizando...' : 'Analyzing...',
        result: isEs ? 'Resultado del Análisis' : 'Analysis Result',
        metrics: isEs ? 'Métricas Corporales' : 'Body Metrics',
        waist_c: isEs ? 'Circunferencia Cintura' : 'Waist Circumference',
        hip_c: isEs ? 'Circunferencia Cadera (Meta)' : 'Hip Circumference (Target)',
        consistency: isEs ? 'Racha Consistencia' : 'Consistency Streak',
        days: isEs ? 'Días' : 'Days',
        next_m: isEs ? 'Próxima Medida' : 'Next Measurement'
      },
      metabolic: {
        title: isEs ? 'Centro Metabólico' : 'Metabolic Support Hub',
        subtitle: isEs ? 'Bienestar Interno y Rastreo' : 'Internal Wellness & Recovery Tracking',
        back: isEs ? 'Volver al Tablero' : 'Back to Dashboard',
        hydro_title: isEs ? 'Hidratación Diaria' : 'Daily Hydration',
        goal: isEs ? 'Meta' : 'Goal',
        consumed: isEs ? 'oz consumidas' : 'oz consumed',
        add: isEs ? 'Agregar Agua (8oz)' : 'Add Water (8oz)',
        protocol: isEs ? 'Protocolo Anti-Inflamatorio' : 'Anti-Inflammatory Protocol',
        proto_desc: isEs ? 'Optimiza el drenaje con dieta' : 'Optimize lymphatic drainage with diet',
        allies: isEs ? 'Aliados' : 'Allies',
        congestion: isEs ? 'Congestión' : 'Congestion',
        omega: isEs ? 'Omega-3s' : 'Omega-3s',
        omega_desc: isEs ? 'Pescado graso, nueces' : 'Fatty fish, walnuts',
        antiox: isEs ? 'Antioxidantes' : 'Antioxidants',
        antiox_desc: isEs ? 'Bayas, chocolate negro' : 'Berries, dark chocolate',
        sodium: isEs ? 'Alto Sodio' : 'High Sodium',
        sodium_desc: isEs ? 'Snacks procesados' : 'Processed snacks'
      },
      chat: {
        title: isEs ? 'Entrenador Autolift' : 'Autolift Coach',
        online: isEs ? 'En Línea' : 'Online',
        placeholder: isEs ? 'Pregunta sobre tu rutina...' : 'Ask about your routine...',
        initial: isEs ? '¡Hola Elara! Puedo ayudarte con tu rutina de drenaje, revisar estadísticas o responder dudas.' : 'Hello Elara! I can help you with your lymphatic drainage routine, check your metabolic stats, or answer questions about today\'s session.'
      }
    };
  });
}
