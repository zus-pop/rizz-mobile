'use client';
import { vars } from 'nativewind';

export const config = {
    light: vars({
        /* Background */
        '--color-background': '247 247 247', // oklch(0.9702 0 0)
        '--color-foreground': '77 77 77',     // oklch(0.3012 0 0)
        '--color-card': '251 251 251',        // oklch(0.9851 0 0)
        '--color-card-foreground': '77 77 77',
        '--color-popover': '251 251 251',
        '--color-popover-foreground': '77 77 77',

        /* Primary */
        '--color-primary': '229 62 166',      // oklch(0.7419 0.2588 326.5237)
        '--color-primary-foreground': '0 0 0',

        /* Secondary */
        '--color-secondary': '229 62 166',
        '--color-secondary-foreground': '0 0 0',

        /* Muted */
        '--color-muted': '242 242 242',       // oklch(0.9491 0 0)
        '--color-muted-foreground': '142 142 142', // oklch(0.5555 0 0)

        /* Accent */
        '--color-accent': '229 62 166',
        '--color-accent-foreground': '0 0 0',

        /* Destructive/Error */
        '--color-destructive': '239 68 68',   // oklch(0.6539 0.1926 25.1437)
        '--color-destructive-foreground': '255 255 255',

        /* Border & Input */
        '--color-border': '222 222 222',      // oklch(0.8699 0 0)
        '--color-input': '235 235 235',       // oklch(0.9219 0 0)
        '--color-ring': '229 62 166',

        /* Charts */
        '--color-chart-1': '229 62 166',      // oklch(0.7419 0.2588 326.5237)
        '--color-chart-2': '251 157 75',      // oklch(0.7342 0.1382 43.9311)
        '--color-chart-3': '97 97 116',       // oklch(0.3805 0.0462 279.0543)
        '--color-chart-4': '183 184 190',     // oklch(0.7218 0.0628 163.1015)
        '--color-chart-5': '220 220 138',     // oklch(0.8640 0.0889 78.9805)

        /* Sidebar */
        '--color-sidebar': '247 247 247',
        '--color-sidebar-foreground': '77 77 77',
        '--color-sidebar-primary': '229 62 166',
        '--color-sidebar-primary-foreground': '0 0 0',
        '--color-sidebar-accent': '229 62 166',
        '--color-sidebar-accent-foreground': '0 0 0',
        '--color-sidebar-border': '222 222 222',
        '--color-sidebar-ring': '229 62 166',

        /* Legacy color system for backward compatibility */
        '--color-primary-0': '179 179 179',
        '--color-primary-50': '153 153 153',
        '--color-primary-100': '128 128 128',
        '--color-primary-200': '115 115 115',
        '--color-primary-300': '102 102 102',
        '--color-primary-400': '82 82 82',
        '--color-primary-500': '51 51 51',
        '--color-primary-600': '41 41 41',
        '--color-primary-700': '31 31 31',
        '--color-primary-800': '13 13 13',
        '--color-primary-900': '10 10 10',
        '--color-primary-950': '8 8 8',

        /* Success */
        '--color-success-0': '228 255 244',
        '--color-success-50': '202 255 232',
        '--color-success-100': '162 241 192',
        '--color-success-200': '132 211 162',
        '--color-success-300': '102 181 132',
        '--color-success-400': '72 151 102',
        '--color-success-500': '52 131 82',
        '--color-success-600': '42 121 72',
        '--color-success-700': '32 111 62',
        '--color-success-800': '22 101 52',
        '--color-success-900': '20 83 45',
        '--color-success-950': '27 50 36',

        /* Warning */
        '--color-warning-0': '255 249 245',
        '--color-warning-50': '255 244 236',
        '--color-warning-100': '255 231 213',
        '--color-warning-200': '254 205 170',
        '--color-warning-300': '253 173 116',
        '--color-warning-400': '251 149 75',
        '--color-warning-500': '231 120 40',
        '--color-warning-600': '215 108 31',
        '--color-warning-700': '180 90 26',
        '--color-warning-800': '130 68 23',
        '--color-warning-900': '108 56 19',
        '--color-warning-950': '84 45 18',

        /* Info */
        '--color-info-0': '236 248 254',
        '--color-info-50': '199 235 252',
        '--color-info-100': '162 221 250',
        '--color-info-200': '124 207 248',
        '--color-info-300': '87 194 246',
        '--color-info-400': '50 180 244',
        '--color-info-500': '13 166 242',
        '--color-info-600': '11 141 205',
        '--color-info-700': '9 115 168',
        '--color-info-800': '7 90 131',
        '--color-info-900': '5 64 93',
        '--color-info-950': '3 38 56',

        /* Typography */
        '--color-typography-0': '254 254 255',
        '--color-typography-50': '245 245 245',
        '--color-typography-100': '229 229 229',
        '--color-typography-200': '219 219 220',
        '--color-typography-300': '212 212 212',
        '--color-typography-400': '163 163 163',
        '--color-typography-500': '140 140 140',
        '--color-typography-600': '115 115 115',
        '--color-typography-700': '82 82 82',
        '--color-typography-800': '64 64 64',
        '--color-typography-900': '38 38 39',
        '--color-typography-950': '23 23 23',

        /* Outline */
        '--color-outline-0': '253 254 254',
        '--color-outline-50': '243 243 243',
        '--color-outline-100': '230 230 230',
        '--color-outline-200': '221 220 219',
        '--color-outline-300': '211 211 211',
        '--color-outline-400': '165 163 163',
        '--color-outline-500': '140 141 141',
        '--color-outline-600': '115 116 116',
        '--color-outline-700': '83 82 82',
        '--color-outline-800': '65 65 65',
        '--color-outline-900': '39 38 36',
        '--color-outline-950': '26 23 23',

        /* Background Special */
        '--color-background-error': '254 241 241',
        '--color-background-warning': '255 243 234',
        '--color-background-success': '237 252 242',
        '--color-background-muted': '247 248 247',
        '--color-background-info': '235 248 254',

        /* Focus Ring Indicator */
        '--color-indicator-primary': '55 55 55',
        '--color-indicator-info': '83 153 236',
        '--color-indicator-error': '185 28 28',
    }),
    dark: vars({
        /* Background */
        '--color-background': '56 56 56',     // oklch(0.2178 0 0)
        '--color-foreground': '255 255 255', // oklch(1.0000 0 0)
        '--color-card': '63 63 63',           // oklch(0.2478 0 0)
        '--color-card-foreground': '231 231 231', // oklch(0.9067 0 0)
        '--color-popover': '63 63 63',
        '--color-popover-foreground': '255 255 255',

        /* Primary */
        '--color-primary': '229 62 166',
        '--color-primary-foreground': '0 0 0',

        /* Secondary */
        '--color-secondary': '229 62 166',
        '--color-secondary-foreground': '0 0 0',

        /* Muted */
        '--color-muted': '71 71 71',          // oklch(0.2768 0 0)
        '--color-muted-foreground': '182 182 182', // oklch(0.7155 0 0)

        /* Accent */
        '--color-accent': '229 62 166',
        '--color-accent-foreground': '0 0 0',

        /* Destructive/Error */
        '--color-destructive': '239 68 68',
        '--color-destructive-foreground': '255 255 255',

        /* Border & Input */
        '--color-border': '82 82 82',         // oklch(0.3211 0 0)
        '--color-input': '82 82 82',
        '--color-ring': '229 62 166',

        /* Charts */
        '--color-chart-1': '229 62 166',
        '--color-chart-2': '251 157 75',
        '--color-chart-3': '97 97 116',
        '--color-chart-4': '183 184 190',
        '--color-chart-5': '220 220 138',

        /* Sidebar */
        '--color-sidebar': '56 56 56',
        '--color-sidebar-foreground': '255 255 255',
        '--color-sidebar-primary': '229 62 166',
        '--color-sidebar-primary-foreground': '0 0 0',
        '--color-sidebar-accent': '229 62 166',
        '--color-sidebar-accent-foreground': '0 0 0',
        '--color-sidebar-border': '82 82 82',
        '--color-sidebar-ring': '229 62 166',

        /* Legacy color system for backward compatibility */
        '--color-primary-0': '166 166 166',
        '--color-primary-50': '175 175 175',
        '--color-primary-100': '186 186 186',
        '--color-primary-200': '197 197 197',
        '--color-primary-300': '212 212 212',
        '--color-primary-400': '221 221 221',
        '--color-primary-500': '230 230 230',
        '--color-primary-600': '240 240 240',
        '--color-primary-700': '250 250 250',
        '--color-primary-800': '253 253 253',
        '--color-primary-900': '254 249 249',
        '--color-primary-950': '253 252 252',

        /* Success */
        '--color-success-0': '27 50 36',
        '--color-success-50': '20 83 45',
        '--color-success-100': '22 101 52',
        '--color-success-200': '32 111 62',
        '--color-success-300': '42 121 72',
        '--color-success-400': '52 131 82',
        '--color-success-500': '72 151 102',
        '--color-success-600': '102 181 132',
        '--color-success-700': '132 211 162',
        '--color-success-800': '162 241 192',
        '--color-success-900': '202 255 232',
        '--color-success-950': '228 255 244',

        /* Warning */
        '--color-warning-0': '84 45 18',
        '--color-warning-50': '108 56 19',
        '--color-warning-100': '130 68 23',
        '--color-warning-200': '180 90 26',
        '--color-warning-300': '215 108 31',
        '--color-warning-400': '231 120 40',
        '--color-warning-500': '251 149 75',
        '--color-warning-600': '253 173 116',
        '--color-warning-700': '254 205 170',
        '--color-warning-800': '255 231 213',
        '--color-warning-900': '255 244 237',
        '--color-warning-950': '255 249 245',

        /* Info */
        '--color-info-0': '3 38 56',
        '--color-info-50': '5 64 93',
        '--color-info-100': '7 90 131',
        '--color-info-200': '9 115 168',
        '--color-info-300': '11 141 205',
        '--color-info-400': '13 166 242',
        '--color-info-500': '50 180 244',
        '--color-info-600': '87 194 246',
        '--color-info-700': '124 207 248',
        '--color-info-800': '162 221 250',
        '--color-info-900': '199 235 252',
        '--color-info-950': '236 248 254',

        /* Typography */
        '--color-typography-0': '23 23 23',
        '--color-typography-50': '38 38 39',
        '--color-typography-100': '64 64 64',
        '--color-typography-200': '82 82 82',
        '--color-typography-300': '115 115 115',
        '--color-typography-400': '140 140 140',
        '--color-typography-500': '163 163 163',
        '--color-typography-600': '212 212 212',
        '--color-typography-700': '219 219 220',
        '--color-typography-800': '229 229 229',
        '--color-typography-900': '245 245 245',
        '--color-typography-950': '254 254 255',

        /* Outline */
        '--color-outline-0': '26 23 23',
        '--color-outline-50': '39 38 36',
        '--color-outline-100': '65 65 65',
        '--color-outline-200': '83 82 82',
        '--color-outline-300': '115 116 116',
        '--color-outline-400': '140 141 141',
        '--color-outline-500': '165 163 163',
        '--color-outline-600': '211 211 211',
        '--color-outline-700': '221 220 219',
        '--color-outline-800': '230 230 230',
        '--color-outline-900': '243 243 243',
        '--color-outline-950': '253 254 254',

        /* Background Special */
        '--color-background-error': '66 43 43',
        '--color-background-warning': '65 47 35',
        '--color-background-success': '28 43 33',
        '--color-background-muted': '51 51 51',
        '--color-background-info': '26 40 46',

        /* Focus Ring Indicator */
        '--color-indicator-primary': '247 247 247',
        '--color-indicator-info': '161 199 245',
        '--color-indicator-error': '232 70 69',
    }),
};
