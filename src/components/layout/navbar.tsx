"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { createPortal } from 'react-dom';
import { ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isProgramasOpen, setIsProgramasOpen] = useState(false);
  const [isNosotrosOpen, setIsNosotrosOpen] = useState(false);
  const [isHistoriasOpen, setIsHistoriasOpen] = useState(false);
  const [isParticiparOpen, setIsParticiparOpen] = useState(false);
  const [isTransparenciaOpen, setIsTransparenciaOpen] = useState(false);
  const [isRecursosOpen, setIsRecursosOpen] = useState(false);
  
  const [blogButtonRef, setBlogButtonRef] = useState<HTMLElement | null>(null);
  const [programasButtonRef, setProgramasButtonRef] = useState<HTMLElement | null>(null);
  const [nosotrosButtonRef, setNosotrosButtonRef] = useState<HTMLElement | null>(null);
  const [historiasButtonRef, setHistoriasButtonRef] = useState<HTMLElement | null>(null);
  const [participarButtonRef, setParticiparButtonRef] = useState<HTMLElement | null>(null);
  const [transparenciaButtonRef, setTransparenciaButtonRef] = useState<HTMLElement | null>(null);
  const [recursosButtonRef, setRecursosButtonRef] = useState<HTMLElement | null>(null);

  // Refs para los timeouts de cierre
  const closeTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    // Cerrar todos los dropdowns cuando se cierra el menú móvil
    if (!newState) {
      setIsBlogOpen(false);
      setIsProgramasOpen(false);
      setIsNosotrosOpen(false);
      setIsHistoriasOpen(false);
      setIsParticiparOpen(false);
      setIsTransparenciaOpen(false);
      setIsRecursosOpen(false);
    }
  };

  // Función helper para manejar el hover con delay
  const handleMouseEnter = (setter: (value: boolean) => void, key: string) => {
    // Cancelar cualquier timeout de cierre pendiente
    if (closeTimeouts.current[key]) {
      clearTimeout(closeTimeouts.current[key]);
      delete closeTimeouts.current[key];
    }
    setter(true);
  };

  const handleMouseLeave = (setter: (value: boolean) => void, key: string) => {
    // Agregar un delay más largo antes de cerrar para permitir movimiento del mouse
    closeTimeouts.current[key] = setTimeout(() => {
      setter(false);
      delete closeTimeouts.current[key];
    }, 300);
  };

  // Limpiar timeouts al desmontar
  useEffect(() => {
    const timeouts = closeTimeouts.current;
    return () => {
      Object.values(timeouts).forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <nav className="bg-background-light dark:bg-background-dark relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/static-images/logos/logo_estrella.png"
                alt="Estrella del Sur Logo"
                width={200}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 font-condensed">
            <Link href="/" className="hover:text-primary dark:hover:text-primary font-bold uppercase text-sm">Inicio</Link>
            
            {/* Menú desplegable de Nosotros (hover) */}
            <div className="relative nosotros-dropdown">
              <div
                ref={setNosotrosButtonRef}
                onMouseEnter={() => handleMouseEnter(setIsNosotrosOpen, 'nosotros')}
                onMouseLeave={() => handleMouseLeave(setIsNosotrosOpen, 'nosotros')}
                className="inline-block"
              >
                <Link
                  href="/nosotros"
                  className="hover:text-primary dark:hover:text-primary font-bold uppercase flex items-center text-sm"
                  onClick={(e) => {
                    // Si el dropdown está abierto, prevenir la navegación para permitir acceso a subsecciones
                    if (isNosotrosOpen) {
                      e.preventDefault();
                    }
                  }}
                >
                  Nosotros
                  <span className={`ml-1 transition-transform duration-200 ${isNosotrosOpen ? 'rotate-45' : ''}`}>+</span>
                </Link>
              </div>
              
              {/* Dropdown con portal para evitar cortes */}
              {isNosotrosOpen && nosotrosButtonRef && typeof window !== 'undefined' && createPortal(
                <div 
                  className="hidden md:block fixed bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-lg z-[9999] min-w-[180px]"
                  style={{
                    top: nosotrosButtonRef.getBoundingClientRect().bottom + 4,
                    left: nosotrosButtonRef.getBoundingClientRect().left,
                  }}
                  onMouseEnter={() => handleMouseEnter(setIsNosotrosOpen, 'nosotros')}
                  onMouseLeave={() => handleMouseLeave(setIsNosotrosOpen, 'nosotros')}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="py-1">
                    <Link 
                      href="/nosotros"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsNosotrosOpen(false);
                      }}
                    >
                      Quiénes Somos
                    </Link>
                    <Link 
                      href="/equipo"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsNosotrosOpen(false);
                      }}
                    >
                      Nuestro Equipo
                    </Link>
                    <Link 
                      href="/contacto"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsNosotrosOpen(false);
                      }}
                    >
                      Contactanos
                    </Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
            
            {/* Menú desplegable de Impacto (hover) */}
            <div className="relative impacto-dropdown">
              <div
                ref={setProgramasButtonRef}
                onMouseEnter={() => handleMouseEnter(setIsProgramasOpen, 'programas')}
                onMouseLeave={() => handleMouseLeave(setIsProgramasOpen, 'programas')}
                className="inline-block"
              >
                <Link
                  href="/impacto"
                  className="hover:text-primary dark:hover:text-primary font-bold uppercase flex items-center text-sm"
                  onClick={(e) => {
                    // Si el dropdown está abierto, prevenir la navegación para permitir acceso a subsecciones
                    if (isProgramasOpen) {
                      e.preventDefault();
                    }
                  }}
                >
                  Impacto
                  <span className={`ml-1 transition-transform duration-200 ${isProgramasOpen ? 'rotate-45' : ''}`}>+</span>
                </Link>
              </div>
              
              {/* Dropdown con portal para evitar cortes */}
              {isProgramasOpen && programasButtonRef && typeof window !== 'undefined' && createPortal(
                <div 
                  className="hidden md:block fixed bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-lg z-[9999] min-w-[200px]"
                  style={{
                    top: programasButtonRef.getBoundingClientRect().bottom + 4,
                    left: programasButtonRef.getBoundingClientRect().left,
                  }}
                  onMouseEnter={() => handleMouseEnter(setIsProgramasOpen, 'programas')}
                  onMouseLeave={() => handleMouseLeave(setIsProgramasOpen, 'programas')}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="py-1">
                    <Link 
                      href="/impacto"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsProgramasOpen(false);
                      }}
                    >
                      Nuestro Trabajo
                    </Link>
                    <Link 
                      href="/programas"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsProgramasOpen(false);
                      }}
                    >
                      Programas
                    </Link>
                    <Link 
                      href="/proyectos"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsProgramasOpen(false);
                      }}
                    >
                      Proyectos
                    </Link>
                    <Link 
                      href="/iniciativas"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsProgramasOpen(false);
                      }}
                    >
                      Iniciativas
                    </Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
            
            {/* Menú desplegable de Transparencia (hover) */}
            <div className="relative transparencia-dropdown">
              <div
                ref={setTransparenciaButtonRef}
                onMouseEnter={() => handleMouseEnter(setIsTransparenciaOpen, 'transparencia')}
                onMouseLeave={() => handleMouseLeave(setIsTransparenciaOpen, 'transparencia')}
                className="inline-block"
              >
                <Link
                  href="/transparencia"
                  className="hover:text-primary dark:hover:text-primary font-bold uppercase flex items-center text-sm"
                  onClick={(e) => {
                    // Si el dropdown está abierto, prevenir la navegación para permitir acceso a subsecciones
                    if (isTransparenciaOpen) {
                      e.preventDefault();
                    }
                  }}
                >
                  Transparencia
                  <span className={`ml-1 transition-transform duration-200 ${isTransparenciaOpen ? 'rotate-45' : ''}`}>+</span>
                </Link>
              </div>
              
              {/* Dropdown con portal para evitar cortes */}
              {isTransparenciaOpen && transparenciaButtonRef && typeof window !== 'undefined' && createPortal(
                <div 
                  className="hidden md:block fixed bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-lg z-[9999] min-w-[220px]"
                  style={{
                    top: transparenciaButtonRef.getBoundingClientRect().bottom + 4,
                    left: transparenciaButtonRef.getBoundingClientRect().left,
                  }}
                  onMouseEnter={() => handleMouseEnter(setIsTransparenciaOpen, 'transparencia')}
                  onMouseLeave={() => handleMouseLeave(setIsTransparenciaOpen, 'transparencia')}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="py-1">
                    <Link 
                      href="/transparencia"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsTransparenciaOpen(false);
                      }}
                    >
                      Documentos Institucionales
                    </Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
            
            {/* Menú desplegable de Recursos (hover) */}
            <div className="relative recursos-dropdown">
              <div
                ref={setRecursosButtonRef}
                onMouseEnter={() => handleMouseEnter(setIsRecursosOpen, 'recursos')}
                onMouseLeave={() => handleMouseLeave(setIsRecursosOpen, 'recursos')}
                className="inline-block"
              >
                <Link
                  href="/recursos"
                  className="hover:text-primary dark:hover:text-primary font-bold uppercase flex items-center text-sm"
                  onClick={(e) => {
                    // Si el dropdown está abierto, prevenir la navegación para permitir acceso a subsecciones
                    if (isRecursosOpen) {
                      e.preventDefault();
                    }
                  }}
                >
                  Recursos
                  <span className={`ml-1 transition-transform duration-200 ${isRecursosOpen ? 'rotate-45' : ''}`}>+</span>
                </Link>
              </div>
              
              {/* Dropdown con portal para evitar cortes */}
              {isRecursosOpen && recursosButtonRef && typeof window !== 'undefined' && createPortal(
                <div 
                  className="hidden md:block fixed bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-lg z-[9999] min-w-[200px]"
                  style={{
                    top: recursosButtonRef.getBoundingClientRect().bottom + 4,
                    left: recursosButtonRef.getBoundingClientRect().left,
                  }}
                  onMouseEnter={() => handleMouseEnter(setIsRecursosOpen, 'recursos')}
                  onMouseLeave={() => handleMouseLeave(setIsRecursosOpen, 'recursos')}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="py-1">
                    <Link 
                      href="/recursos"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsRecursosOpen(false);
                      }}
                    >
                      Biblioteca Digital
                    </Link>
                    <Link 
                      href="/videos-testimoniales"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsRecursosOpen(false);
                      }}
                    >
                      Videos Testimoniales
                    </Link>
                    <Link 
                      href="/recursos"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsRecursosOpen(false);
                      }}
                    >
                      Galeria de Fotografias
                    </Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
            
            {/* Menú desplegable de Participar (hover) */}
            <div className="relative participar-dropdown">
              <div
                ref={setParticiparButtonRef}
                onMouseEnter={() => handleMouseEnter(setIsParticiparOpen, 'participar')}
                onMouseLeave={() => handleMouseLeave(setIsParticiparOpen, 'participar')}
                className="inline-block"
              >
                <Link
                  href="/participar"
                  className="hover:text-primary dark:hover:text-primary font-bold uppercase flex items-center text-sm"
                  onClick={(e) => {
                    // Si el dropdown está abierto, prevenir la navegación para permitir acceso a subsecciones
                    if (isParticiparOpen) {
                      e.preventDefault();
                    }
                  }}
                >
                  Participar
                  <span className={`ml-1 transition-transform duration-200 ${isParticiparOpen ? 'rotate-45' : ''}`}>+</span>
                </Link>
              </div>
              
              {/* Dropdown con portal para evitar cortes */}
              {isParticiparOpen && participarButtonRef && typeof window !== 'undefined' && createPortal(
                <div 
                  className="hidden md:block fixed bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-lg z-[9999] min-w-[200px]"
                  style={{
                    top: participarButtonRef.getBoundingClientRect().bottom + 4,
                    left: participarButtonRef.getBoundingClientRect().left,
                  }}
                  onMouseEnter={() => handleMouseEnter(setIsParticiparOpen, 'participar')}
                  onMouseLeave={() => handleMouseLeave(setIsParticiparOpen, 'participar')}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="py-1">
                    <Link 
                      href="/participar"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsParticiparOpen(false);
                      }}
                    >
                      Cómo Participar
                    </Link>
                    <Link 
                      href="/voluntariados"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsParticiparOpen(false);
                      }}
                    >
                      Voluntariados/Pasantías
                    </Link>
                    <Link 
                      href="/convocatorias"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsParticiparOpen(false);
                      }}
                    >
                      Convocatorias
                    </Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
            
            {/* Menú desplegable de Comunidad (hover) */}
            <div className="relative historias-dropdown">
              <div
                ref={setHistoriasButtonRef}
                onMouseEnter={() => handleMouseEnter(setIsHistoriasOpen, 'historias')}
                onMouseLeave={() => handleMouseLeave(setIsHistoriasOpen, 'historias')}
                className="inline-block"
              >
                <Link
                  href="/historias-impacto"
                  className="hover:text-primary dark:hover:text-primary font-bold uppercase flex items-center text-sm"
                  onClick={(e) => {
                    // Si el dropdown está abierto, prevenir la navegación para permitir acceso a subsecciones
                    if (isHistoriasOpen) {
                      e.preventDefault();
                    }
                  }}
                >
                  Comunidad
                  <span className={`ml-1 transition-transform duration-200 ${isHistoriasOpen ? 'rotate-45' : ''}`}>+</span>
                </Link>
              </div>
              
              {/* Dropdown con portal para evitar cortes */}
              {isHistoriasOpen && historiasButtonRef && typeof window !== 'undefined' && createPortal(
                <div 
                  className="hidden md:block fixed bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-lg z-[9999] min-w-[200px]"
                  style={{
                    top: historiasButtonRef.getBoundingClientRect().bottom + 4,
                    left: historiasButtonRef.getBoundingClientRect().left,
                  }}
                  onMouseEnter={() => handleMouseEnter(setIsHistoriasOpen, 'historias')}
                  onMouseLeave={() => handleMouseLeave(setIsHistoriasOpen, 'historias')}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="py-1">
                    <Link 
                      href="/historias-impacto"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsHistoriasOpen(false);
                      }}
                    >
                      Historias de Impacto
                    </Link>
                    <Link 
                      href="/videos-testimoniales"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsHistoriasOpen(false);
                      }}
                    >
                      Videos Testimoniales
                    </Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
            
            {/* Menú desplegable de Blog (hover) */}
            <div className="relative blog-dropdown">
              <div
                ref={setBlogButtonRef}
                onMouseEnter={() => handleMouseEnter(setIsBlogOpen, 'blog')}
                onMouseLeave={() => handleMouseLeave(setIsBlogOpen, 'blog')}
                className="inline-block"
              >
                <Link
                  href="/noticias-eventos"
                  className="hover:text-primary dark:hover:text-primary font-bold uppercase flex items-center text-sm"
                  onClick={(e) => {
                    // Si el dropdown está abierto, prevenir la navegación para permitir acceso a subsecciones
                    if (isBlogOpen) {
                      e.preventDefault();
                    }
                  }}
                >
                  Blog
                  <span className={`ml-1 transition-transform duration-200 ${isBlogOpen ? 'rotate-45' : ''}`}>+</span>
                </Link>
              </div>
              
              {/* Dropdown con portal para evitar cortes */}
              {isBlogOpen && blogButtonRef && typeof window !== 'undefined' && createPortal(
                <div 
                  className="hidden md:block fixed bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-md shadow-lg z-[9999] min-w-[180px]"
                  style={{
                    top: blogButtonRef.getBoundingClientRect().bottom + 4,
                    left: blogButtonRef.getBoundingClientRect().left,
                  }}
                  onMouseEnter={() => handleMouseEnter(setIsBlogOpen, 'blog')}
                  onMouseLeave={() => handleMouseLeave(setIsBlogOpen, 'blog')}
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="py-1">
                    <Link 
                      href="/noticias-eventos"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsBlogOpen(false);
                      }}
                    >
                      Noticias
                    </Link>
                    <Link 
                      href="/noticias-eventos"
                      className="block w-full text-left px-4 py-2 text-xs hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 font-bold uppercase transition-colors cursor-pointer"
                      onClick={() => {
                        setIsBlogOpen(false);
                      }}
                    >
                      Eventos
                    </Link>
                  </div>
                </div>,
                document.body
              )}
            </div>
          </div>
          
          {/* Menú hamburguesa para móviles */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="flex flex-col space-y-1 p-2"
              aria-label="Toggle menu"
            >
              <div className={`w-6 h-0.5 bg-text-light dark:bg-text-dark transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-text-light dark:bg-text-dark transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-text-light dark:bg-text-dark transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
            </button>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="flex items-center text-text-light dark:text-text-dark px-4 py-2 rounded text-sm font-bold font-condensed uppercase">
                Cargando...
              </div>
            ) : session ? (
              <Link 
                href="/dashboard" 
                className="flex items-center text-text-light dark:text-text-dark px-4 py-2 rounded text-sm hover:text-primary dark:hover:text-primary font-bold font-condensed uppercase"
              >
                Dashboard
              </Link>
            ) : (
              <Link 
                href="/sign-in" 
                className="flex items-center text-text-light dark:text-text-dark px-4 py-2 rounded text-sm hover:text-primary dark:hover:text-primary font-bold font-condensed uppercase transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Acceder
              </Link>
            )}
            <Link className="flex items-center bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90 font-bold" href="/donar">
              Donar
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark">
            <div className="px-4 py-4 space-y-4 w-full">
              {/* Enlaces de navegación */}
              <div className="space-y-3 font-condensed w-full">
                <Link href="/" className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                
                {/* Dropdown de Nosotros en móvil */}
                <div className="space-y-2 bg-transparent w-full">
                  <button
                    onClick={() => setIsNosotrosOpen(!isNosotrosOpen)}
                    className="flex items-center justify-between w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2 bg-transparent text-left"
                  >
                    <span className="flex-1">Nosotros</span>
                    <span className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isNosotrosOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isNosotrosOpen && (
                    <div className="ml-4 space-y-2 bg-transparent w-[calc(100%-1rem)]">
                      <Link 
                        href="/nosotros" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsNosotrosOpen(false);
                        }}
                      >
                        Quiénes Somos
                      </Link>
                      <Link 
                        href="/equipo" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsNosotrosOpen(false);
                        }}
                      >
                        Nuestro Equipo
                      </Link>
                      <Link 
                        href="/contacto" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsNosotrosOpen(false);
                        }}
                      >
                        Contactanos
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dropdown de Impacto en móvil */}
                <div className="space-y-2 bg-transparent w-full">
                  <button
                    onClick={() => setIsProgramasOpen(!isProgramasOpen)}
                    className="flex items-center justify-between w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2 bg-transparent text-left"
                  >
                    <span className="flex-1">Impacto</span>
                    <span className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isProgramasOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isProgramasOpen && (
                    <div className="ml-4 space-y-2 bg-transparent w-[calc(100%-1rem)]">
                      <Link 
                        href="/impacto" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProgramasOpen(false);
                        }}
                      >
                        Nuestro Trabajo
                      </Link>
                      <Link 
                        href="/programas" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProgramasOpen(false);
                        }}
                      >
                        Programas
                      </Link>
                      <Link 
                        href="/proyectos" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProgramasOpen(false);
                        }}
                      >
                        Proyectos
                      </Link>
                      <Link 
                        href="/iniciativas" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsProgramasOpen(false);
                        }}
                      >
                        Iniciativas
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dropdown de Participar en móvil */}
                <div className="space-y-2 bg-transparent w-full">
                  <button
                    onClick={() => setIsParticiparOpen(!isParticiparOpen)}
                    className="flex items-center justify-between w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2 bg-transparent text-left"
                  >
                    <span className="flex-1">Participar</span>
                    <span className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isParticiparOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isParticiparOpen && (
                    <div className="ml-4 space-y-2 bg-transparent w-[calc(100%-1rem)]">
                      <Link 
                        href="/participar" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsParticiparOpen(false);
                        }}
                      >
                        Cómo Participar
                      </Link>
                      <Link 
                        href="/voluntariados" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsParticiparOpen(false);
                        }}
                      >
                        Voluntariados/Pasantías
                      </Link>
                      <Link 
                        href="/convocatorias" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsParticiparOpen(false);
                        }}
                      >
                        Convocatorias
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dropdown de Comunidad en móvil */}
                <div className="space-y-2 bg-transparent w-full">
                  <button
                    onClick={() => setIsHistoriasOpen(!isHistoriasOpen)}
                    className="flex items-center justify-between w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2 bg-transparent text-left"
                  >
                    <span className="flex-1">Comunidad</span>
                    <span className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isHistoriasOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isHistoriasOpen && (
                    <div className="ml-4 space-y-2 bg-transparent w-[calc(100%-1rem)]">
                      <Link 
                        href="/historias-impacto" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsHistoriasOpen(false);
                        }}
                      >
                        Historias de Impacto
                      </Link>
                      <Link 
                        href="/videos-testimoniales" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsHistoriasOpen(false);
                        }}
                      >
                        Videos Testimoniales
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dropdown de Transparencia en móvil */}
                <div className="space-y-2 bg-transparent w-full">
                  <button
                    onClick={() => setIsTransparenciaOpen(!isTransparenciaOpen)}
                    className="flex items-center justify-between w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2 bg-transparent text-left"
                  >
                    <span className="flex-1">Transparencia</span>
                    <span className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isTransparenciaOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isTransparenciaOpen && (
                    <div className="ml-4 space-y-2 bg-transparent w-[calc(100%-1rem)]">
                      <Link 
                        href="/transparencia" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsTransparenciaOpen(false);
                        }}
                      >
                        Documentos Institucionales
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dropdown de Recursos en móvil */}
                <div className="space-y-2 bg-transparent w-full">
                  <button
                    onClick={() => setIsRecursosOpen(!isRecursosOpen)}
                    className="flex items-center justify-between w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2 bg-transparent text-left"
                  >
                    <span className="flex-1">Recursos</span>
                    <span className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isRecursosOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isRecursosOpen && (
                    <div className="ml-4 space-y-2 bg-transparent w-[calc(100%-1rem)]">
                      <Link 
                        href="/recursos" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsRecursosOpen(false);
                        }}
                      >
                        Biblioteca Digital
                      </Link>
                      <Link 
                        href="/videos-testimoniales" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsRecursosOpen(false);
                        }}
                      >
                        Videos Testimoniales
                      </Link>
                      <Link 
                        href="/recursos" 
                        className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsRecursosOpen(false);
                        }}
                      >
                        Galeria de Fotografias
                      </Link>
                    </div>
                  )}
                  </div>
                
                {/* Dropdown de Blog en móvil */}
                <div className="space-y-2 bg-transparent w-full">
                  <button
                    onClick={() => setIsBlogOpen(!isBlogOpen)}
                    className="flex items-center justify-between w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-2 bg-transparent text-left"
                  >
                    <span className="flex-1">Blog</span>
                    <span className={`ml-2 transition-transform duration-200 flex-shrink-0 ${isBlogOpen ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {isBlogOpen && (
                  <div className="ml-4 space-y-2 bg-transparent w-[calc(100%-1rem)]">
                    <Link 
                      href="/noticias-eventos" 
                      className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsBlogOpen(false);
                        }}
                    >
                      Noticias
                    </Link>
                    <Link 
                      href="/noticias-eventos" 
                      className="block w-full hover:text-primary dark:hover:text-primary font-bold uppercase py-1 text-sm transition-colors" 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsBlogOpen(false);
                        }}
                    >
                      Eventos
                    </Link>
                  </div>
                  )}
                </div>
              </div>
              
              {/* Separador */}
              <div className="border-t border-border-light dark:border-border-dark pt-4">
                {/* Botones de autenticación */}
                {status === 'loading' ? (
                  <div className="flex items-center text-text-light dark:text-text-dark px-4 py-2 rounded text-sm font-bold font-condensed uppercase">
                    Cargando...
                  </div>
                ) : session ? (
                  <Link 
                    href="/dashboard" 
                    className="flex items-center text-text-light dark:text-text-dark px-4 py-2 rounded text-sm hover:text-primary dark:hover:text-primary font-bold font-condensed uppercase"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link 
                    href="/sign-in" 
                    className="flex items-center text-text-light dark:text-text-dark px-4 py-2 rounded text-sm hover:text-primary dark:hover:text-primary font-bold font-condensed uppercase transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Acceder
                  </Link>
                )}
                
                {/* Botones de acción */}
                <div className="space-y-3 mt-4">
                  <Link 
                    className="flex items-center justify-center bg-primary text-white px-4 py-2 rounded text-sm hover:bg-primary/90 font-bold" 
                    href="/donar"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Donar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
