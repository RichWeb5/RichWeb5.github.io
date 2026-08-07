export type Language = 'es' | 'en';

export const dictionary = {
    es: {
        'nav.work': 'Experiencia',
        'nav.projects': 'Proyectos',
        'nav.education': 'Educación',
        'nav.contact': 'Contacto',
        'nav.blog': 'Blog',
        'nav.source': 'Código',

        'portal.title': '👋 ¡Bienvenido!',
        'portal.intro.before': 'Soy ',
        'portal.intro.after': '. ¡Explora mi mundo de código en píxeles!',
        'portal.cta': 'VER MI TRABAJO',

        'hero.title': 'Bienvenido a mi portafolio pixelado.',

        'projects.title': 'Proyectos',
        'projects.viewRepo': 'Ver Repo',
        'projects.viewApp': 'Ver App',
        'projects.viewSite': 'Ver Sitio',
        'projects.loadMore': 'Ver más',

        'skills.showMore': 'Ver más',
        'skills.showLess': 'Ver menos',

        'github.title.before': 'Días que ',
        'github.title.code': 'Programo',

        'work.title': 'Experiencia Laboral',
        'work.present': 'Actualidad',
        'work.showDetails': 'Ver detalles',
        'work.hideDetails': 'Ocultar detalles',

        'education.title': '🎓 Educación',

        'contact.title': '💬 CONTÁCTAME',
        'contact.emailMeAt': 'Escríbeme a',
        'contact.basedIn': 'Ubicado en',

        'footer.day': 'De día',
        'footer.night': 'De noche',

        'lang.switchTo': 'EN',
        'lang.label': 'Cambiar a inglés',
    },
    en: {
        'nav.work': 'Experience',
        'nav.projects': 'Projects',
        'nav.education': 'Education',
        'nav.contact': 'Contact',
        'nav.blog': 'Blog',
        'nav.source': 'Source',

        'portal.title': '👋 Welcome!',
        'portal.intro.before': 'I’m ',
        'portal.intro.after': '. Explore my blocky world of code!',
        'portal.cta': 'EXPLORE MY WORK',

        'hero.title': 'Welcome to my pixel-perfect portfolio.',

        'projects.title': 'Projects',
        'projects.viewRepo': 'View Repo',
        'projects.viewApp': 'View App',
        'projects.viewSite': 'View Site',
        'projects.loadMore': 'Load More',

        'skills.showMore': 'Show More',
        'skills.showLess': 'Show Less',

        'github.title.before': 'Days I ',
        'github.title.code': 'Code',

        'work.title': 'Work Experience',
        'work.present': 'Present',
        'work.showDetails': 'Show Details',
        'work.hideDetails': 'Hide Details',

        'education.title': '🎓 Education',

        'contact.title': '💬 CONTACT ME',
        'contact.emailMeAt': 'Email me at',
        'contact.basedIn': 'Based in',

        'footer.day': 'Daytime',
        'footer.night': 'Night Time',

        'lang.switchTo': 'ES',
        'lang.label': 'Switch to Spanish',
    },
} as const;

export type TranslationKey = keyof (typeof dictionary)['es'];
