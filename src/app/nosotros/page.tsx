'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Map,
  ArrowRight,
  MapPin
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import InteractiveMap, { getMapStatistics } from '@/components/maps/interactive-map';

export default function AboutUsPage() {
  const [selectedTeam, setSelectedTeam] = useState<1 | 2 | 3 | 4>(1);
  const [isMissionVisible, setIsMissionVisible] = useState(false);
  
  // Effect para activar animaciones cuando la sección sea visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMissionVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const missionSection = document.getElementById('mision');
    if (missionSection) {
      observer.observe(missionSection);
    }

    return () => {
      if (missionSection) {
        observer.unobserve(missionSection);
      }
    };
  }, []);
  
  // Importar las ubicaciones para calcular estadísticas dinámicas
  const allLocations = [
    // Oficinas activas en Oruro
    { id: '1', name: 'Oficina de Quirquincho', coordinates: [-17.9760202, -67.0897769], status: 'active', department: 'Oruro' },
    { id: '2', name: 'Oficina de CEPROK', coordinates: [-17.9481736, -67.1016477], status: 'active', department: 'Oruro' },
    { id: '3', name: 'Oficina de Villa Challacollo', coordinates: [-17.9986445, -67.1385181], status: 'active', department: 'Oruro' },
    { id: '4', name: 'Oficina de San Benito - Pumas', coordinates: [-17.99495, -67.06797], status: 'active', department: 'Oruro' },
    { id: '5', name: 'Oficina de Vinto', coordinates: [-17.977845021337828, -67.05317770715818], status: 'active', department: 'Oruro' },
    { id: '6', name: 'Oficina de Villa Dorina', coordinates: [-17.935245212211523, -67.09675865414872], status: 'active', department: 'Oruro' },
    
    // Oficinas futuras
    { id: '7', name: 'Oficina de Cobija', coordinates: [-11.0267, -68.7692], status: 'future', department: 'Pando' },
    { id: '8', name: 'Oficina de Guayaramerín', coordinates: [-10.8369, -65.3614], status: 'future', department: 'Pando' },
    { id: '9', name: 'Oficina de El Alto', coordinates: [-16.5000, -68.1500], status: 'future', department: 'La Paz' }
  ];
  
  // Solo usar oficinas activas para las estadísticas de cobertura
  const activeLocations = allLocations.filter(loc => loc.status === 'active').map(loc => ({
    ...loc,
    description: `Oficina en ${loc.department}`,
    type: 'office' as const,
    programs: [],
    beneficiaries: 0,
    icon: null,
    color: '#3B82F6',
    address: loc.name,
    department: loc.department,
    status: loc.status as 'active' | 'future',
    contact: '',
    schedule: '',
    number: 0,
    image: '',
    coordinates: loc.coordinates as [number, number]
  }));
  const stats = getMapStatistics(activeLocations);

  // Efecto para cambiar automáticamente las imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedTeam((prev) => {
        if (prev === 4) return 1;
        return (prev + 1) as 1 | 2 | 3 | 4;
      });
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const teamImages: Record<1 | 2 | 3 | 4, string> = {
    1: "/static-images/sections/nuestro_equipo1.jpg",
    2: "/static-images/sections/nuestro_equipo2.jpg",
    3: "/static-images/sections/nuestro_equipo3.jpg",
    4: "/static-images/sections/nuestro_equipo1.jpg"
  };

  const teamDescriptions: Record<1 | 2 | 3 | 4, string> = {
    1: "Individuos talentosos de diversos orígenes, unidos por un objetivo común: crear un impacto duradero.",
    2: "Somos un equipo apasionado que trabaja incansablemente para transformar las vidas de niños y jóvenes en comunidades vulnerables.",
    3: "Con años de experiencia en el campo social, nuestro equipo experimentado desarrolla programas integrales de largo plazo.",
    4: "Como parte de una red global, trabajamos con organizaciones internacionales para amplificar nuestro impacto mundial."
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark overflow-x-hidden">
      <SiteHeader />
      
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-start"
        style={{
          backgroundImage: "url('/static-images/heroes/nosotros_hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 dark:opacity-60"></div>
        <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 flex justify-center md:justify-start">
          <div className="max-w-4xl text-white text-center md:text-left">
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
            >
              <span className="inline-block text-white text-xs font-bold uppercase px-3 py-1.5 tracking-wider rounded" style={{ backgroundColor: '#99b944' }}>
                TRANSFORMANDO VIDAS
              </span>
            </motion.div>
            <motion.h1 
              className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.6 }}
            >
              CAMBIAMOS LA<br/>
              HISTORIA DE<br/>
              FAMILIAS Y COMUNIDADES
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.9 }}
            >
              Cada niña, niño, adolescente, joven merece un hogar protegido y amoroso, con nuestro apoyo buscamos transformar sus vidas, la de sus familias y comunidades a partir de Programas de Desarrollo Integral.
            </motion.p>
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
            >
              <a className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl font-condensed" href="#mision">
                CONOCE CÓMO LO HACEMOS
                <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd"></path>
                </svg>
              </a>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Misión y Propósito Section */}
      <section id="mision" className="py-6 bg-background-light dark:bg-background-dark overflow-hidden" style={{ contain: 'layout style paint' }}>
        <div className="container mx-auto px-4 py-4 overflow-hidden">
          <div className="text-center mb-12">
            <span
              className="inline-block text-white text-xs font-semibold px-3 py-1 rounded mb-4"
              style={{ backgroundColor: '#99b944' }}
            >
              MISIÓN Y PROPÓSITO
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight">
              MISIÓN Y PROPÓSITO
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">
            <div className={`bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 h-full flex flex-col ${isMissionVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s', contain: 'layout style paint' }}>
              <div
                className={`flex items-center justify-center h-16 w-16 rounded-full mb-6 ${isMissionVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.3s', backgroundColor: 'rgba(153, 185, 68, 0.18)' }}
              >
                <span
                  className={`material-symbols-outlined text-3xl ${isMissionVisible ? 'animate-pulse-slow' : ''}`}
                  style={{ color: '#99b944' }}
                >
                  flag
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-3 text-text-light dark:text-text-dark ${isMissionVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>NUESTRA MISIÓN</h3>
              <p className={`text-gray-600 dark:text-gray-400 flex-grow ${isMissionVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
                Buscamos que la niñez, la juventud, sus familias y comunidades logren su desarrollo integral y protección.
              </p>
            </div>
            
            <div className={`bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 h-full flex flex-col ${isMissionVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.2s', contain: 'layout style paint' }}>
              <div
                className={`flex items-center justify-center h-16 w-16 rounded-full mb-6 ${isMissionVisible ? 'animate-scale-in' : 'opacity-0'}`}
                style={{ animationDelay: '0.4s', backgroundColor: 'rgba(0, 106, 134, 0.18)' }}
              >
                <span
                  className={`material-symbols-outlined text-3xl ${isMissionVisible ? 'animate-pulse-slow' : ''}`}
                  style={{ color: '#006a86' }}
                >
                  visibility
                </span>
              </div>
              <h3 className={`text-xl font-bold mb-3 text-text-light dark:text-text-dark ${isMissionVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>NUESTRA VISIÓN</h3>
              <p className={`text-gray-600 dark:text-gray-400 flex-grow ${isMissionVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
                Comunidades y familias donde la niñez goza de protección y bienestar integral.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-16 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark leading-tight">
              NUESTROS VALORES
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-hidden">
            {/* Primera fila - 4 tarjetas */}
            <motion.div 
              className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, margin: "0px" }}
              style={{ willChange: 'opacity', contain: 'layout style paint' }}
            >
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(0, 106, 134, 0.18)' }}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ color: '#006a86' }}
                >
                  balance
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">IGUALDAD</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow">
                Una premisa que plantea desarrollar esfuerzos en todos los ámbitos de la organización, buscando que todas las acciones deben ser encaradas en busca de la igualdad, a fin de garantizar una vida digna para todas.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, margin: "0px" }}
              style={{ willChange: 'opacity', contain: 'layout style paint' }}
            >
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(153, 185, 68, 0.18)' }}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ color: '#99b944' }}
                >
                  verified
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">INTEGRIDAD</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow">
                Manifestamos nuestra búsqueda de la integridad como una cualidad que implica entereza moral, rectitud y honradez en la conducta y en el comportamiento.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, margin: "0px" }}
              style={{ willChange: 'opacity', contain: 'layout style paint' }}
            >
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(13, 111, 60, 0.18)' }}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ color: '#0d6f3c' }}
                >
                  psychology
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">EMPATÍA</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow">
                Cultivamos la capacidad de comprender la vida emocional de otra persona, casi en toda su complejidad, a partir de la escucha activa, la comprensión y el apoyo emocional.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, margin: "0px" }}
              style={{ willChange: 'opacity', contain: 'layout style paint' }}
            >
              <div
                className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
                style={{ backgroundColor: 'rgba(241, 208, 45, 0.18)' }}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ color: '#f1d02d' }}
                >
                  handshake
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">RESPETO</h3>
              <p className="text-gray-600 dark:text-gray-400 flex-grow">
                Nuestra organización se fundamenta en la consideración y valoración especial que se le tiene a alguien o a algo, al que se le reconoce valor social o especial diferencia.
              </p>
            </motion.div>

          </div>
          
          {/* Segunda fila - 3 tarjetas centradas */}
          <motion.div 
            className="flex justify-center mt-8 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl overflow-hidden">
              <motion.div 
                className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                viewport={{ once: true }}
                style={{ contain: 'layout style paint' }}
              >
                <div
                  className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
                  style={{ backgroundColor: 'rgba(13, 111, 60, 0.18)' }}
                >
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ color: '#0d6f3c' }}
                  >
                    star
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">COMPROMISO</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  Promovemos el desarrollo del compromiso como una capacidad de entender la importancia que tenemos con el trabajo, las responsabilidades y obligaciones dentro de los tiempos o acuerdos establecidos en diferentes ámbitos.
                </p>
              </motion.div>

              <motion.div 
                className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.6 }}
                viewport={{ once: true }}
                style={{ contain: 'layout style paint' }}
              >
                <div
                  className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
                  style={{ backgroundColor: 'rgba(0, 106, 134, 0.18)' }}
                >
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ color: '#006a86' }}
                  >
                    lightbulb
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">INNOVACIÓN</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  Buscamos trabajar en formas diversas, creativas y nuevas para satisfacer las necesidades y expectativas de las poblaciones objetivo.
                </p>
              </motion.div>

              <motion.div 
                className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.7 }}
                viewport={{ once: true }}
                style={{ contain: 'layout style paint' }}
              >
                <div
                  className="flex items-center justify-center h-16 w-16 rounded-full mb-6"
                  style={{ backgroundColor: 'rgba(153, 185, 68, 0.18)' }}
                >
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ color: '#99b944' }}
                  >
                    assignment
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-text-light dark:text-text-dark">RESPONSABILIDAD</h3>
                <p className="text-gray-600 dark:text-gray-400 flex-grow">
                  Trabajamos en base a la responsabilidad como valor, que significa el cumplimiento de las obligaciones y el cuidado al hacer o decidir algo, porque ello incide en los resultados de la organización.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="bg-background-light dark:bg-background-dark">
        <div className="relative min-h-0 lg:min-h-screen">
          <div className="absolute inset-0 bg-cover bg-center" style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBC6gS_zQf7gG8r_5_UhrY7uXWjY7A6yqO1J0J9PjYvXb3mH3C1tV0b_0rQ6Z2nN1vR8gL2mX2gY7wS_9B8kF1kZ3zO2c3o4m5p6j7l8')"}}>
            <div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm"></div>
          </div>
          <div className="relative container mx-auto px-4 py-2 sm:py-4 md:py-6 lg:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12 lg:gap-16 items-start lg:items-center">
              <motion.div 
                className="space-y-4 sm:space-y-6 md:space-y-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.5 }}
                viewport={{ once: true }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <span
                    className="inline-block text-white text-xs font-semibold px-3 py-1 rounded"
                    style={{ backgroundColor: '#99b944' }}
                  >
                    NUESTRO EQUIPO
                  </span>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 dark:text-white break-words" style={{ color: '#006a86' }}>
                    CONOCE A LAS PERSONAS DETRÁS DE NUESTRA MISIÓN
                  </h1>
                </motion.div>
                <motion.div 
                  className="space-y-4 sm:space-y-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="flex items-center space-x-2 sm:space-x-4 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105" 
                    onClick={() => setSelectedTeam(1)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-xl sm:text-2xl font-bold transition-all duration-500 ${selectedTeam === 1 ? 'scale-110' : 'text-zinc-400 dark:text-zinc-600'}`} style={selectedTeam === 1 ? { color: '#99b944' } : {}}>01.</span>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-500 break-words ${selectedTeam === 1 ? 'dark:text-white scale-105' : 'text-zinc-400 dark:text-zinc-500'}`} style={selectedTeam === 1 ? { color: '#006a86' } : {}}>COMPROMETIDOS</h2>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 sm:space-x-4 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105" 
                    onClick={() => setSelectedTeam(2)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-xl sm:text-2xl font-bold transition-all duration-500 ${selectedTeam === 2 ? 'scale-110' : 'text-zinc-400 dark:text-zinc-600'}`} style={selectedTeam === 2 ? { color: '#99b944' } : {}}>02.</span>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-500 break-words ${selectedTeam === 2 ? 'dark:text-white scale-105' : 'text-zinc-400 dark:text-zinc-500'}`} style={selectedTeam === 2 ? { color: '#006a86' } : {}}>APASIONADOS</h2>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 sm:space-x-4 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105" 
                    onClick={() => setSelectedTeam(3)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-xl sm:text-2xl font-bold transition-all duration-500 ${selectedTeam === 3 ? 'scale-110' : 'text-zinc-400 dark:text-zinc-600'}`} style={selectedTeam === 3 ? { color: '#99b944' } : {}}>03.</span>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-500 break-words ${selectedTeam === 3 ? 'dark:text-white scale-105' : 'text-zinc-400 dark:text-zinc-500'}`} style={selectedTeam === 3 ? { color: '#006a86' } : {}}>EXPERIMENTADOS</h2>
                  </motion.div>
                  <motion.div 
                    className="flex items-center space-x-2 sm:space-x-4 cursor-pointer hover:opacity-80 transition-all duration-300 hover:scale-105" 
                    onClick={() => setSelectedTeam(4)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-xl sm:text-2xl font-bold transition-all duration-500 ${selectedTeam === 4 ? 'scale-110' : 'text-zinc-400 dark:text-zinc-600'}`} style={selectedTeam === 4 ? { color: '#99b944' } : {}}>04.</span>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-all duration-500 break-words ${selectedTeam === 4 ? 'dark:text-white scale-105' : 'text-zinc-400 dark:text-zinc-500'}`} style={selectedTeam === 4 ? { color: '#006a86' } : {}}>ESTRATÉGICOS</h2>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              <div className="flex flex-col justify-center pt-4 sm:pt-8 md:pt-16 lg:pt-32">
                <div className="bg-white dark:bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105">
                  <Image 
                    alt="Equipo trabajando juntos" 
                    className="w-full h-80 object-cover object-center transition-all duration-700 ease-in-out transform hover:scale-105" 
                    src={teamImages[selectedTeam]}
                    width={800}
                    height={320}
                  />
                  <div className="p-6">
                  <p className="text-lg dark:text-zinc-300 text-center mb-6 transition-all duration-500 ease-in-out" style={{ color: '#006a86' }}>
                    {teamDescriptions[selectedTeam]}
                  </p>
                  <div className="text-center">
                    <Button size="lg" className="text-white font-semibold px-6 py-3 rounded-md flex items-center space-x-2 mx-auto hover:opacity-90" style={{ backgroundColor: '#99b944' }} asChild>
                  <Link href="/equipo">
                    <span>CONOCER MÁS</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ChildFund Alliance Section */}
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="inline-block text-white text-xs font-semibold px-3 py-1 rounded mb-4"
                style={{ backgroundColor: '#99b944' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                CHILDFUND BOLIVIA
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                PARTE DE UNA RED NACIONAL DE IMPACTO
              </motion.h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Somos parte de ChildFund Bolivia, una red Nacional de Organizaciones independientes trabajando juntas para ayudar a las niñas, niños, sus familias y comunidades más vulnerables de Bolivia.
            </p>
            </motion.div>
          </div>

          <motion.div 
            className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3 
                className="text-2xl font-bold text-text-light dark:text-text-dark mb-6 font-condensed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                UNA RED NACIONAL DE TRANSFORMACIÓN
              </motion.h3>
              <motion.div 
                className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                viewport={{ once: true }}
              >
                <p className="mb-4">
                  <strong>ChildFund Bolivia</strong> trabaja en acción con organizaciones locales que planifican y realizan acciones con las comunidades donde se aplican los proyectos, programas, patrocinio, incidencia, entre otras. Las organizaciones socias coordinan con la población e instituciones locales, y como socios del ChildFund internacional en Bolivia tienen objetivos, misión y visión similares a nuestra organización.
                </p>
                <p className="mb-4">
                  <strong>Actualmente, colaboran con 4 socios locales, en 5 departamentos y 20 municipios del país:</strong>
                </p>
                <div className="text-base">
                  <strong>• CEMSE:</strong> Santa Cruz, La Paz, El Alto, Pailas, Tiquipaya, Colcapirhua y Cochabamba.
                  <br/>
                  <strong>• Moqol Sawaya Anzaldo:</strong> Arbieto, Cliza, Punata, Sacabamba, San Benito, Santiváñez, Tarata, Tolata, Villa Gualberto Villarroel.
                  <br/>
                  <strong>• Organización Estrella del Sur:</strong> Oruro.
                  <br/>
                  <strong>• Organización Esperanza Bolivia:</strong> Tarija (Cercado) y San Lorenzo.
                </div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-blue-500 text-2xl mr-2">groups</span>
                    <h4 className="font-bold text-text-light dark:text-text-dark mb-1">4 Organizaciones Socios Locales</h4>
                  </div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Datos Clave</p>
                </motion.div>
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-blue-500 text-2xl mr-2">location_on</span>
                    <h4 className="font-bold text-text-light dark:text-text-dark mb-1">20 Municipios de Intervención</h4>
                  </div>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Cobertura Nacional</p>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.img 
                src="/static-images/sections/child_fund_section.jpg"
                alt="ChildFund Alliance - Red Global de Impacto"
                className="w-full h-auto object-cover rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Áreas de Acción - Mapa Interactivo Section */}
      <section id="mapa-interactivo" className="py-12 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.span 
                className="inline-block text-white text-xs font-semibold px-3 py-1 rounded mb-4"
                style={{ backgroundColor: '#99b944' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                ÁREAS DE ACCIÓN
              </motion.span>
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                MAPA INTERACTIVO DE NUESTRO IMPACTO
              </motion.h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Explora nuestras oficinas ubicadas en el departamento de Oruro, Bolivia. Cada ubicación ofrece servicios especializados y horarios de atención específicos para brindar el mejor apoyo a nuestras comunidades.
              </p>
            </motion.div>
          </div>

          {/* Mapa Interactivo */}
          <div className="relative mt-8 mb-8">
            <InteractiveMap />
          </div>

          {/* Leyenda del Mapa */}
          <div className="mt-8 bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold text-text-light dark:text-text-dark mb-6">
              LEYENDA DEL MAPA
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#006a86' }}>1</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">Quirquincho</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Barrio San Miguel</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#99b944' }}>2</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">CEPROK</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Sector Kantuta</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#0d6f3c' }}>3</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">Villa Challacollo</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Villa Challacollo</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#f1d02d' }}>4</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">San Benito - Pumas</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Mercado Pumas Andinos</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#006a86' }}>5</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">Vinto</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">A. Arce entre C. 6 de Agosto</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#99b944' }}>6</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">Villa Dorina</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Carretera Oruro-Cochabamba</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#0d6f3c' }}>7</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">Cobija</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Pando (Próximamente)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#f1d02d' }}>8</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">Guayaramerín</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">Pando (Próximamente)</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#006a86' }}>9</div>
                <div>
                  <h4 className="font-semibold text-text-light dark:text-text-dark text-sm">El Alto</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">La Paz (Próximamente)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Estadísticas del Impacto */}
          <motion.div 
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full mb-6" style={{ backgroundColor: 'rgba(0, 106, 134, 0.2)' }}>
                <MapPin className="h-8 w-8" stroke="#006a86" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#006a86' }}>UBICACIONES</h3>
              <div className="text-3xl font-bold mb-2" style={{ color: '#006a86' }}>{stats.activeOffices}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Oficinas activas estratégicamente ubicadas para brindar atención integral a nuestras comunidades.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full mb-6" style={{ backgroundColor: 'rgba(153, 185, 68, 0.2)' }}>
                <Map className="h-8 w-8" stroke="#99b944" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#99b944' }}>COBERTURA</h3>
              <div className="text-3xl font-bold mb-2" style={{ color: '#99b944' }}>{stats.departments}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Departamentos donde concentramos nuestros esfuerzos para maximizar el impacto en las comunidades locales.
              </p>
            </motion.div>

            <motion.div 
              className="bg-card-light dark:bg-card-dark p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center h-16 w-16 rounded-full mb-6" style={{ backgroundColor: 'rgba(241, 208, 45, 0.2)' }}>
                <MapPin className="h-8 w-8" stroke="#f1d02d" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#f1d02d' }}>EXPANSIÓN FUTURA</h3>
              <div className="text-3xl font-bold mb-2" style={{ color: '#f1d02d' }}>3</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Pronto tendremos sedes en Cobija, Guayaramerín y El Alto con población afiliada también.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 text-white dark:text-white relative overflow-hidden" style={{ backgroundColor: '#0d6f3c' }}>
        {/* Fondo decorativo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-200 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-orange-200 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 font-condensed">
              ÚNETE A NUESTRA MISIÓN
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white dark:text-white leading-tight font-condensed">
              ¿QUIERES SER PARTE DEL CAMBIO?
            </h2>
            <p className="text-xl text-white dark:text-white max-w-3xl mx-auto mt-4">
              Únete a nosotros en nuestra misión de transformar comunidades y crear un futuro mejor 
              para todos los niños. Juntos podemos hacer la diferencia.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white hover:bg-gray-100 font-bold font-condensed" style={{ color: '#0d6f3c' }} asChild>
              <Link href="/programas">
                CONOCE NUESTROS PROGRAMAS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" className="text-white hover:opacity-90 font-bold font-condensed border-2 border-white" style={{ backgroundColor: '#0d6f3c' }} asChild>
              <Link href="/proyectos">
                VER NUESTROS PROYECTOS
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <SiteFooter />
    </div>
  );
}
