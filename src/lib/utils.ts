import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Valida si una URL es válida
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Valida si una URL es una imagen válida
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false
  }

  // Verificar que sea una URL válida
  if (!isValidUrl(url)) {
    return false
  }

  // Verificar extensiones de imagen comunes
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico']
  const urlLower = url.toLowerCase()
  
  // Verificar si la URL termina con una extensión de imagen
  const hasImageExtension = imageExtensions.some(ext => urlLower.includes(ext))
  
  // Verificar si es una URL de imagen común (como de servicios de imágenes)
  const isImageService = urlLower.includes('images.') || 
                        urlLower.includes('img.') || 
                        urlLower.includes('cdn.') ||
                        urlLower.includes('cloudinary') ||
                        urlLower.includes('unsplash') ||
                        urlLower.includes('pexels') ||
                        urlLower.includes('pixabay')

  return hasImageExtension || isImageService
}

/**
 * Obtiene una URL de imagen por defecto si la URL proporcionada no es válida
 */
export function getSafeImageUrl(url: string | null | undefined, fallback?: string): string {
  if (!url || !isValidImageUrl(url)) {
    return fallback || '/placeholder-image.svg'
  }
  return url
}

/**
 * Formatea una fecha sin conversión de zona horaria
 * Evita el problema donde fechas como "2016-04-01" se muestran como "2016-03-31"
 * debido a la conversión UTC a zona horaria local
 */
export function formatDateLocal(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  if (!dateString) return '';
  
  // Parsear la fecha manualmente para evitar conversión de zona horaria
  // Si la fecha viene como "2016-04-01" o "2016-04-01T00:00:00.000Z"
  const dateMatch = dateString.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (!dateMatch) {
    // Si no coincide el formato esperado, usar Date normal como fallback
    return new Date(dateString).toLocaleDateString('es-ES', options);
  }
  
  const [, year, month, day] = dateMatch;
  // Crear fecha en zona horaria local directamente
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options
  };
  
  return date.toLocaleDateString('es-ES', defaultOptions);
}
