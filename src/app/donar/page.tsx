'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Target, Users, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

interface DonationProject {
  id: string;
  title: string;
  description: string;
  context: string;
  objectives: string;
  executionStart: string;
  executionEnd: string;
  accountNumber: string;
  recipientName: string;
  qrImageUrl?: string;
  qrImageAlt?: string;
  referenceImageUrl?: string;
  referenceImageAlt?: string;
  targetAmount?: number;
  currentAmount: number;
  progressPercentage: number;
  isCompleted: boolean;
  isFeatured: boolean;
  donationCount: number;
}

interface AnnualGoal {
  id: string;
  year: number;
  targetAmount: number;
  currentAmount: number;
  description?: string;
  isActive: boolean;
  isFeatured: boolean;
}

export default function DonarPage() {
  const [donationProjects, setDonationProjects] = useState<DonationProject[]>([]);
  const [annualGoal, setAnnualGoal] = useState<AnnualGoal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar proyectos de donación
        const projectsResponse = await fetch('/api/public/donation-projects?limit=10');
        if (projectsResponse.ok) {
          const projectsData = await projectsResponse.json();
          setDonationProjects(projectsData);
        }

        // Cargar meta anual
        const goalResponse = await fetch('/api/annual-goals?currentYearOnly=true');
        if (goalResponse.ok) {
          const goalData = await goalResponse.json();
          setAnnualGoal(goalData);
        }
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <SiteHeader />
      
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-start"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40 dark:opacity-60"></div>
        <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 flex justify-center md:justify-start">
          <div className="max-w-4xl text-white text-center md:text-left">
            <div className="mb-6">
              <span className="inline-block text-white text-xs font-bold uppercase px-3 py-1.5 tracking-wider rounded" style={{ backgroundColor: '#99b944' }}>
                Donaciones
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-extrabold leading-tight text-white mb-6">
              TRANSFORMA VIDAS<br/>
              CON TU APOYO
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8">
              Tu donación hace posible que continuemos con nuestros proyectos de impacto social, educativos y comunitarios. 
              Cada contribución marca la diferencia en las vidas de cientos de personas.
            </p>
            <div className="mt-8">
              <a className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg text-base font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl font-condensed" href="#proyectos">
                DONAR AHORA
                <svg className="h-5 w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" fillRule="evenodd"></path>
                </svg>
              </a>
            </div>
          </div>
        </main>
      </div>

      <main className="container mx-auto px-4 py-8">

        {/* Meta de Recaudación Section */}
        <section className="py-6 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center mb-6 md:mb-8">
              <div>
                <span className="inline-block text-white text-xs font-semibold px-3 py-1 rounded mb-4" style={{ backgroundColor: '#99b944' }}>
                  META DE RECAUDACIÓN
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight break-words">
                  META ANUAL {annualGoal?.year || new Date().getFullYear()}
                </h1>
              </div>
              <div>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                  Ayúdanos a alcanzar nuestra meta anual para continuar transformando vidas y generando impacto positivo en las comunidades.
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4">
                <span className="text-base sm:text-lg md:text-xl font-semibold text-text-light dark:text-text-dark break-words">
                  Recaudado: Bs. {annualGoal ? annualGoal.currentAmount.toLocaleString('es-BO', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) : '0,00'}
                </span>
                <span className="text-base sm:text-lg md:text-xl font-semibold text-text-light dark:text-text-dark break-words">
                  Meta: Bs. {annualGoal ? annualGoal.targetAmount.toLocaleString('es-BO', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) : '0,00'}
                </span>
              </div>
              
              {/* Barra de progreso */}
              <div className="relative w-full h-6 mb-3">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 absolute">
                  <div 
                    className="h-6 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${annualGoal ? Math.min((annualGoal.currentAmount / annualGoal.targetAmount) * 100, 100) : 0}%`,
                      backgroundColor: '#99b944'
                    }}
                  />
                </div>
                <div 
                  className="absolute top-0 h-6 flex items-center"
                  style={{ left: `${annualGoal ? Math.min((annualGoal.currentAmount / annualGoal.targetAmount) * 100, 100) : 0}%` }}
                >
                  <span className="ml-2 text-sm font-bold text-text-light dark:text-text-dark whitespace-nowrap">
                    {annualGoal ? Math.round((annualGoal.currentAmount / annualGoal.targetAmount) * 100) : 0}%
                  </span>
                </div>
              </div>
              
              <div className="text-center text-sm sm:text-base text-text-secondary-light dark:text-text-secondary-dark break-words px-2">
                {annualGoal ? (
                  annualGoal.currentAmount >= annualGoal.targetAmount ? (
                    '¡Meta alcanzada! Gracias por tu apoyo'
                  ) : (
                    `Faltan Bs. ${(annualGoal.targetAmount - annualGoal.currentAmount).toLocaleString('es-BO', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })} para alcanzar la meta`
                  )
                ) : (
                  'Cargando meta...'
                )}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(153, 185, 68, 0.2)' }}>
                    <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" strokeWidth={2.5} style={{ color: '#99b944' }} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">+500 beneficiarios</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(153, 185, 68, 0.2)' }}>
                    <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" strokeWidth={2.5} style={{ color: '#99b944' }} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">3 proyectos activos</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ backgroundColor: 'rgba(153, 185, 68, 0.2)' }}>
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" strokeWidth={2.5} style={{ color: '#99b944' }} />
                  </div>
                  <span className="text-xs sm:text-sm md:text-base font-medium text-text-secondary-light dark:text-text-secondary-dark whitespace-nowrap">8 años de experiencia</span>
                </div>
              </div>
            </div>
        </section>

        {/* Proyectos que necesitan apoyo */}
        <section id="proyectos" className="py-6 bg-background-light dark:bg-background-dark">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center mb-6 md:mb-8">
              <div>
                <span className="inline-block text-white text-xs font-semibold px-3 py-1 rounded mb-4" style={{ backgroundColor: '#99b944' }}>
                  PROYECTOS DE DONACIÓN
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-light dark:text-text-dark leading-tight break-words">
                  PROYECTOS QUE NECESITAN TU APOYO
                </h1>
              </div>
              <div>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                  Conoce todos nuestros proyectos de donación y elige cuál deseas apoyar directamente para generar un impacto específico en las comunidades.
                </p>
              </div>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {donationProjects.map((donationProject) => (
                <Card key={donationProject.id} className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                  donationProject.isCompleted ? 'ring-1 ring-blue-300/50 dark:ring-blue-600/50' : ''
                }`}>
                  {donationProject.referenceImageUrl && donationProject.referenceImageUrl.trim() !== '' ? (
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={donationProject.referenceImageUrl}
                        alt={donationProject.referenceImageAlt || donationProject.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      {donationProject.isCompleted ? (
                        <Badge className="absolute top-4 right-4 bg-blue-500/90 text-white text-xs">
                          Meta Alcanzada
                        </Badge>
                      ) : donationProject.isFeatured ? (
                      <Badge className="absolute top-4 right-4 text-white" style={{ backgroundColor: '#99b944' }}>
                        Destacado
                      </Badge>
                      ) : null}
                    </div>
                  ) : (
                    <div className="relative h-48 overflow-hidden flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, rgba(153, 185, 68, 0.2), rgba(153, 185, 68, 0.4))' }}>
                      <Heart className="h-16 w-16" style={{ color: 'rgba(153, 185, 68, 0.5)' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      {donationProject.isCompleted ? (
                        <Badge className="absolute top-4 right-4 bg-blue-500/90 text-white text-xs">
                          Meta Alcanzada
                        </Badge>
                      ) : donationProject.isFeatured ? (
                      <Badge className="absolute top-4 right-4 text-white" style={{ backgroundColor: '#99b944' }}>
                        Destacado
                      </Badge>
                      ) : null}
                    </div>
                  )}
                  
                  <CardContent className="p-4 sm:p-6">
                    <CardTitle className="text-lg sm:text-xl font-bold text-text-light dark:text-text-dark mb-3 line-clamp-2 break-words">
                      {donationProject.title}
                    </CardTitle>
                    
                    <p className="text-sm sm:text-base text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
                      {donationProject.context.substring(0, 150)}...
                    </p>
                    
                    <div className="flex items-start gap-2 text-xs sm:text-sm text-text-secondary-light dark:text-text-secondary-dark mb-4">
                      <Calendar className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{formatDate(donationProject.executionStart)} - {formatDate(donationProject.executionEnd)}</span>
                    </div>

                    {/* Progreso individual del proyecto */}
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 sm:p-4 mb-4">
                       <div className="text-center mb-3">
                         <h4 className="text-xs sm:text-sm font-semibold text-text-light dark:text-text-dark mb-1">
                           Meta de Recaudación
                         </h4>
                       </div>
                      
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 mb-3">
                        <span className="text-xs sm:text-sm font-bold text-text-light dark:text-text-dark break-words">
                          Recaudado: Bs. {donationProject.currentAmount.toLocaleString('es-BO', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          })}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-text-light dark:text-text-dark break-words">
                          Meta: Bs. {donationProject.targetAmount ? donationProject.targetAmount.toLocaleString('es-BO', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                          }) : 'Sin meta'}
                        </span>
                      </div>
                      
                      {/* Barra de progreso del proyecto */}
                      <div className="relative mb-2 w-full h-3">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 absolute">
                          <div 
                            className="h-3 rounded-full transition-all duration-1000 ease-out"
                            style={{
                              background: donationProject.isCompleted 
                                ? 'linear-gradient(to right, #0d6f3c, #99b944)' 
                                : 'linear-gradient(to right, #0d6f3c, #99b944)',
                              width: `${donationProject.progressPercentage}%`
                            }}
                          />
                        </div>
                        <div 
                          className="absolute top-0 h-3 flex items-center"
                          style={{ left: `${donationProject.progressPercentage}%` }}
                        >
                          <span className="ml-1 text-xs font-bold text-text-light dark:text-text-dark whitespace-nowrap">
                            {Math.round(donationProject.progressPercentage)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark break-words px-1">
                        {donationProject.isCompleted 
                          ? 'Meta alcanzada - Gracias por tu apoyo'
                          : donationProject.targetAmount 
                            ? `Faltan Bs. ${(donationProject.targetAmount - donationProject.currentAmount).toLocaleString('es-BO', {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2
                            })} para completar la meta`
                            : `${donationProject.donationCount} donaciones recibidas`
                        }
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button className="w-full bg-black text-white hover:bg-gray-800" asChild>
                        <Link href={`/donar/${donationProject.id}`}>
                          <Heart className="mr-2 h-4 w-4 text-red-500" />
                          {donationProject.isCompleted ? 'Ver Proyecto' : 'Donar a este Proyecto'}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}
