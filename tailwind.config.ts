import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			// Tipografía principal: Avant Garde Demi (para títulos, encabezados y botones)
  			// Fallback: Poppins SemiBold
  			sans: ['Century Gothic', 'Helvetica Neue', 'sans-serif'], // Tipografía secundaria para párrafos
  			display: ['Avant Garde Demi', 'Poppins', 'sans-serif'], // Para títulos y encabezados
  			heading: ['Avant Garde Demi', 'Poppins', 'sans-serif'], // Alias para encabezados
  			condensed: ['Special Gothic Condensed', 'sans-serif'],
  		},
  		borderRadius: {
  			DEFAULT: "0.5rem", // 8px - Bordes redondeados suaves
  			lg: 'var(--radius)', // 8px
  			md: 'calc(var(--radius) - 2px)', // 6px
  			sm: 'calc(var(--radius) - 4px)', // 4px
  			xl: 'calc(var(--radius) + 2px)', // 10px
  		},
			colors: {
			// Colores institucionales - Fundación Estrella del Sur
			"institutional": {
				primary: "#006a86", // Azul principal
				secondary: "#6b7280", // Gris azulado
				accent: "#f1d02d", // Amarillo
				dark: "#1f2937", // Gris oscuro
			},
			"background-light": "#f5f9f8", // Fondo principal actualizado
			"background-dark": "#1A1A1A",
			"text-light": "#006a86", // Azul principal como texto
			"text-dark": "#F3F1ED",
				"text-secondary-light": "#6B7280",
				"text-secondary-dark": "#9CA3AF",
				"subtext-light": "#6B7280",
				"subtext-dark": "#9CA3AF",
			"card-light": "#FFFFFF",
			"card-dark": "#2D2D2D",
			"border-light": "#E5E7EB",
			"border-dark": "#4B5563",
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
				primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
				brand: {
					DEFAULT: 'hsl(var(--brand))',
					foreground: 'hsl(var(--brand-foreground))'
				},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			// Colores institucionales como variables CSS
  			'institutional-primary': 'hsl(var(--color-primary))',
  			'institutional-secondary': 'hsl(var(--color-secondary))',
  			'institutional-accent': 'hsl(var(--color-accent))',
  			'institutional-dark': 'hsl(var(--color-dark))'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
