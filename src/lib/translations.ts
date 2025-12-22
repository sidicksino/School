import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';

export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      programs: 'Levels',
      about: 'About',
      contact: 'Contact',
      join: 'Enroll Now',
    },
    hero: {
      badge: 'Admissions Open 2024-2025',
      title_line1: 'Nurturing the',
      title_highlight: 'Leaders of Chad',
      subtitle:
        "Académie Royale offers a world-class bilingual education in N'Djamena, blending academic excellence with Chadian values from Kindergarten to Primary School.",
      cta_primary: 'Enroll Your Child',
      cta_secondary: 'Visit School',
      slides: [
        {
          image: img1,
          title_line1: 'Nurturing the',
          title_highlight: 'Leaders of Chad',
          subtitle: "Académie Royale offers a world-class bilingual education in N'Djamena, blending academic excellence with Chadian values.",
        },
        {
          image: img2,
          title_line1: 'Excellence in',
          title_highlight: 'Bilingual Education',
          subtitle: 'Our curriculum ensures fluency in French and Arabic, preparing students for a global future.',
        },
        {
          image: img3,
          title_line1: 'Building Strong',
          title_highlight: 'Character',
          subtitle: 'Beyond academics, we instill moral values, discipline, and leadership skills in every student.',
        },
        {
          image: img4,
          title_line1: 'Nurturing the',
          title_highlight: 'Leaders of Chad',
          subtitle: "Académie Royale offers a world-class bilingual education in N'Djamena, blending academic excellence with Chadian values.",
        },
      ],
    },
    stats: {
      experience: 'Years of Excellence',
      alumni: 'Happy Students',
      certified: 'Success Rate',
    },
    welcome: {
      title: 'Word from the Founder',
      subtitle: 'A Vision for Excellence',
      text1:
        'Welcome to Académie Royale. Since our inception, our mission has been clear: to provide the children of Chad with an education that rivals the best international standards while remaining deeply rooted in our cultural heritage.',
      text2:
        'We believe that every child is a rough diamond waiting to be polished. Through discipline, love, and rigorous academic training, we prepare our students not just for the CEP, but for life.',
      sign: 'The Directorate',
    },
    why_choose_us: {
      title: 'Why Choose Académie Royale?',
      items: [
        {
          title: 'Bilingual Mastery',
          desc: 'Fluency in French and Arabic is at the core of our curriculum, with early introduction to English.',
        },
        {
          title: 'Safe Transport',
          desc: "A dedicated fleet of school buses ensuring safe pickup and drop-off across N'Djamena.",
        },
        {
          title: 'Holistic Approach',
          desc: 'We balance academics with sports, arts, and moral education to build character.',
        },
        {
          title: 'Security',
          desc: 'A fully enclosed, guarded campus with 24/7 surveillance to ensure peace of mind.',
        },
      ],
    },
    news: {
      title: 'School News & Events',
      read_more: 'Read More',
      items: [
        {
          title: 'End of Year Ceremony',
          date: 'June 25, 2024',
          desc: 'Celebrating our CM2 graduates with a grand ceremony attended by officials.',
        },
        {
          title: 'Science Fair 2024',
          date: 'May 10, 2024',
          desc: 'Our young scientists displayed incredible projects on renewable energy.',
        },
        {
          title: 'Registration Open',
          date: 'April 01, 2024',
          desc: 'Admissions for the 2024-2025 academic year are now officially open.',
        },
      ],
    },
    testimonials: {
      title: "Parents' Voices",
      items: [
        {
          name: 'Fatime Mahamat',
          role: 'Mother of 2',
          text: 'The discipline at Académie Royale is unmatched. My children have improved so much in their behavior and grades.',
        },
        {
          name: 'Moussa Abakar',
          role: 'Parent (CM1)',
          text: 'I am impressed by the bilingual program. My son reads Arabic and French fluently now.',
        },
        {
          name: 'Sarah Nguema',
          role: 'Parent (Maternelle)',
          text: 'The kindergarten teachers are so caring. It feels like a second family for my daughter.',
        },
      ],
    },
    team: {
      title: 'Our Leadership',
      subtitle: 'Dedicated Professionals',
      items: [
        { name: 'Mme. Amina', role: 'School Directress' },
        { name: 'Mr. Brahim', role: 'Head of Pedagogy' },
        { name: 'Mrs. Kaltouma', role: 'Kindergarten Coordinator' },
        { name: 'Mr. Youssouf', role: 'Sports & Culture Lead' },
      ],
    },
    facilities: {
      title: 'Our Campus',
      desc: 'Discover an environment designed for learning.',
      items: [
        { title: 'Library', desc: 'Thousands of books in 3 languages.' },
        { title: 'Computer Lab', desc: 'Modern PCs for digital literacy.' },
        { title: 'Playground', desc: 'Safe equipment for recreation.' },
        { title: 'Canteen', desc: 'Healthy, hygienic meals daily.' },
      ],
    },
    curriculum: {
      title: 'Detailed Curriculum',
      subjects: 'Core Subjects',
      schedule: 'Typical Day',
      items: [
        { subject: 'Mathematics', desc: 'Arithmetic, Geometry, Problem Solving' },
        { subject: 'Languages', desc: 'French (Reading/Writing), Arabic, English' },
        { subject: 'Sciences', desc: 'Observation, Biology, Physics basics' },
        { subject: 'Civics', desc: 'Moral values, Citizenship, History of Chad' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'What are the school hours?',
          a: 'Classes run from 7:30 AM to 1:30 PM, Monday to Friday. Extra classes may occur on Saturdays.',
        },
        {
          q: 'Do you provide school uniforms?',
          a: 'Yes, uniforms are mandatory and can be purchased directly from the school administration.',
        },
        {
          q: 'Is there an entrance exam?',
          a: 'Yes, for Primary levels (CP to CM2), a placement test is required to ensure the student fits the grade level.',
        },
        {
          q: 'What is the student-teacher ratio?',
          a: 'We maintain a ratio of 25:1 to ensure personalized attention for every student.',
        },
      ],
    },
    about: {
      title_line1: 'A Foundation for',
      title_highlight1: 'Success',
      title_line2: 'The Future of',
      title_highlight2: 'Education',
      desc1:
        "Located in the heart of N'Djamena, Académie Royale is a premier institution dedicated to the early development and primary education of Chadian youth.",
      desc2:
        'We follow the official Chadian curriculum enhanced with international standards, focusing on bilingualism (French/Arabic/English), discipline, and creativity.',
      stat_campuses: 'Classrooms',
      stat_laureates: 'Enseignants Qualifiés',
      stat_labs: 'Salles Informatiques',
      stat_legacy: 'Future Leaders',
      feature_precision_title: 'Personalized Care',
      feature_precision_desc:
        'Small class sizes ensure every child receives the attention they need to flourish academically and socially.',
      feature_network_title: 'Holistic Development',
      feature_network_desc:
        "Beyond grades, we cultivate moral values, civic responsibility, and leadership skills essential for Chad's future.",
      feature_quantum_title: 'Modern Facilities',
      feature_quantum_desc:
        'Safe, air-conditioned classrooms equipped with modern learning tools and secure play areas.',
    },
    programs: {
      title_line1: 'Academic',
      title_highlight: 'Levels',
      subtitle:
        'From their first steps in Kindergarten to the CEP exam, we guide your children through every stage of the Chadian school system.',
      explore: 'Learn More',
      items: {
        kindergarten: {
          title: 'Kindergarten (Maternelle)',
          desc: 'Petite, Moyenne, and Grande Section. stimulating activities to develop motor skills, socialization, and early literacy.',
          duration: '3 - 5 Years Old',
        },
        primary: {
          title: 'Primary (Primaire)',
          desc: 'CP to CM2. A rigorous curriculum covering Mathematics, French, Arabic, Science, and Civic Education.',
          duration: '6 - 11 Years Old',
        },
        bilingual: {
          title: 'Bilingual Excellence',
          desc: 'Intensive language programs in French and Arabic, with introduction to English to prepare global citizens.',
          duration: 'All Levels',
        },
        activities: {
          title: 'Arts & Sports',
          desc: 'Extracurricular activities including football, painting, theater, and cultural events to unleash creativity.',
          duration: 'Weekly',
        },
      },
    },
    contact: {
      title_line1: 'Join Our',
      title_highlight: 'Family',
      desc: 'Give your child the best start in life. Contact us to schedule a visit or pick up an enrollment form at our administration office.',
      placeholder: "Parent's Email Address",
      button: 'Request Info Pack',
      disclaimer: 'We reply within 24 hours. Visits available Monday-Friday.',
    },
    visit: {
      hero: {
        title_line1: 'Experience Our',
        title_highlight: 'Campus',
        subtitle: 'We invite you to tour Académie Royale and see firsthand the nurturing environment where future leaders grow.',
        badge: 'Book a Tour',
      },
      info: {
        title: 'Visitor Information',
        hours: {
          title: 'Visiting Hours',
          desc: 'Monday - Friday: 8:00 AM - 12:00 PM',
        },
        location: {
          title: 'Location',
          desc: "Quartier Klémat, N'Djamena, Chad",
        },
        contact: {
          title: 'Contact Admissions',
          desc: '+235 66 00 00 00 | admissions@academieroyale.td',
        },
      },
      form: {
        title: 'Schedule Your Visit',
        name: 'Parent Name',
        email: 'Email Address',
        phone: 'Phone Number',
        date: 'Preferred Date',
        message: 'Additional Notes',
        submit: 'Request Appointment',
      },
    },
    footer: {
      tagline:
        'Educating the next generation of Chadian leaders with passion, discipline, and excellence.',
      headers: {
        programs: 'Education',
        resources: 'Parents',
        connect: 'Contact Us',
      },
      links: {
        quantum: 'Kindergarten',
        neural: 'Primary School',
        ethics: 'School Life',
        space: 'Extracurriculars',
        portal: 'Parent Portal',
        library: 'School Calendar',
        career: 'Uniforms & Supplies',
        alumni: 'Canteen Menu',
      },
      copyright: "Académie Royale N'Djamena. All rights reserved.",
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      programs: 'Niveaux',
      about: 'À Propos',
      contact: 'Contact',
      join: "S'inscrire",
    },
    hero: {
      badge: 'Inscriptions Ouvertes 2024-2025',
      title_line1: 'Cultiver les',
      title_highlight: 'Leaders du Tchad',
      subtitle:
        "L'Académie Royale offre une éducation bilingue de classe mondiale à N'Djamena, alliant excellence académique et valeurs tchadiennes, de la maternelle au primaire.",
      cta_primary: 'Inscrire votre enfant',
      cta_secondary: "Visiter l'école",
      slides: [
        {
          image: img1,
          title_line1: 'Cultiver les',
          title_highlight: 'Leaders du Tchad',
          subtitle: "L'Académie Royale offre une éducation bilingue de classe mondiale à N'Djamena, alliant excellence académique et valeurs tchadiennes.",
        },
        {
          image: img2,
          title_line1: 'Excellence en',
          title_highlight: 'Éducation Bilingue',
          subtitle: "Notre programme assure la maîtrise du français et de l'arabe, préparant les élèves à un avenir mondial.",
        },
        {
          image: img3,
          title_line1: 'Bâtir un',
          title_highlight: 'Caractère Fort',
          subtitle: "Au-delà des études, nous inculquons des valeurs morales, la discipline et le leadership à chaque élève.",
        },
        {
          image: img4,
          title_line1: 'Cultiver les',
          title_highlight: 'Leaders du Tchad',
          subtitle: "L'Académie Royale offre une éducation bilingue de classe mondiale à N'Djamena, alliant excellence académique et valeurs tchadiennes.",
        },
      ],
    },
    stats: {
      experience: "Années d'Excellence",
      alumni: 'Élèves Épanouis',
      certified: 'Taux de Réussite',
    },
    welcome: {
      title: 'Mot de la Fondatrice',
      subtitle: "Une Vision d'Excellence",
      text1:
        "Bienvenue à l'Académie Royale. Depuis notre création, notre mission est claire : offrir aux enfants du Tchad une éducation qui rivalise avec les meilleurs standards internationaux tout en restant profondément ancrée dans notre patrimoine culturel.",
      text2:
        "Nous croyons que chaque enfant est un diamant brut qui ne demande qu'à être poli. Par la discipline, l'amour et une formation académique rigoureuse, nous préparons nos élèves non seulement pour le CEP, mais pour la vie.",
      sign: 'La Direction',
    },
    why_choose_us: {
      title: "Pourquoi Choisir l'Académie Royale ?",
      items: [
        {
          title: 'Maîtrise Bilingue',
          desc: "La maîtrise du français et de l'arabe est au cœur de notre programme, avec une initiation précoce à l'anglais.",
        },
        {
          title: 'Transport Sécurisé',
          desc: "Une flotte de bus scolaires dédiée assurant le ramassage et le dépôt en toute sécurité à travers N'Djamena.",
        },
        {
          title: 'Approche Holistique',
          desc: "Nous équilibrons les études avec le sport, les arts et l'éducation morale pour forger le caractère.",
        },
        {
          title: 'Sécurité',
          desc: "Un campus entièrement clos et gardé avec surveillance 24/7 pour garantir la tranquillité d'esprit.",
        },
      ],
    },
    news: {
      title: 'Actualités & Événements',
      read_more: 'Lire Plus',
      items: [
        {
          title: "Fête de Fin d'Année",
          date: '25 Juin 2024',
          desc: 'Célébration de nos diplômés du CM2 avec une grande cérémonie.',
        },
        {
          title: 'Foire Scientifique 2024',
          date: '10 Mai 2024',
          desc: "Nos jeunes scientifiques ont exposé des projets incroyables sur l'énergie.",
        },
        {
          title: 'Ouverture des Inscriptions',
          date: '01 Avril 2024',
          desc: "Les admissions pour l'année académique 2024-2025 sont officiellement ouvertes.",
        },
      ],
    },
    testimonials: {
      title: 'Paroles de Parents',
      items: [
        {
          name: 'Fatime Mahamat',
          role: 'Mère de 2 élèves',
          text: "La discipline à l'Académie Royale est inégalée. Mes enfants ont tellement progressé dans leur comportement et leurs notes.",
        },
        {
          name: 'Moussa Abakar',
          role: 'Parent (CM1)',
          text: "Je suis impressionné par le programme bilingue. Mon fils lit couramment l'arabe et le français maintenant.",
        },
        {
          name: 'Sarah Nguema',
          role: 'Parent (Maternelle)',
          text: "Les maîtresses de la maternelle sont si attentionnées. C'est comme une deuxième famille pour ma fille.",
        },
      ],
    },
    team: {
      title: 'Notre Direction',
      subtitle: 'Des Professionnels Dévoués',
      items: [
        { name: 'Mme. Amina', role: 'Directrice' },
        { name: 'M. Brahim', role: 'Responsable Pédagogique' },
        { name: 'Mme. Kaltouma', role: 'Coordinatrice Maternelle' },
        { name: 'M. Youssouf', role: 'Resp. Sports & Culture' },
      ],
    },
    facilities: {
      title: 'Notre Campus',
      desc: "Découvrez un environnement conçu pour l'apprentissage.",
      items: [
        { title: 'Bibliothèque', desc: 'Des milliers de livres en 3 langues.' },
        { title: 'Salle Informatique', desc: "PCs modernes pour l'initiation numérique." },
        { title: 'Aire de Jeux', desc: 'Équipements sûrs pour la récréation.' },
        { title: 'Cantine', desc: 'Repas sains et hygiéniques au quotidien.' },
      ],
    },
    curriculum: {
      title: 'Programme Détaillé',
      subjects: 'Matières Principales',
      schedule: 'Journée Type',
      items: [
        { subject: 'Mathématiques', desc: 'Calcul, Géométrie, Résolution de problèmes' },
        { subject: 'Langues', desc: 'Français (Lecture/Écriture), Arabe, Anglais' },
        { subject: 'Sciences', desc: 'Observation, SVT, Bases de la physique' },
        { subject: 'Éducation Civique', desc: 'Valeurs morales, Citoyenneté, Histoire du Tchad' },
      ],
    },
    faq: {
      title: 'Questions Fréquentes',
      items: [
        {
          q: 'Quels sont les horaires ?',
          a: 'Les cours ont lieu de 7h30 à 13h30, du lundi au vendredi. Des cours de soutien peuvent avoir lieu le samedi.',
        },
        {
          q: 'Fournissez-vous des uniformes ?',
          a: "Oui, les uniformes sont obligatoires et disponibles à l'administration de l'école.",
        },
        {
          q: "Y a-t-il un test d'entrée ?",
          a: "Oui, pour le primaire (CP au CM2), un test de niveau est requis pour l'inscription.",
        },
        {
          q: "Quel est l'effectif par classe ?",
          a: 'Nous maintenons un ratio de 25 élèves par classe pour assurer un suivi personnalisé.',
        },
      ],
    },
    about: {
      title_line1: 'Une Fondation pour',
      title_highlight1: 'Le Succès',
      title_line2: "L'Avenir de",
      title_highlight2: "L'Éducation",
      desc1:
        "Située au cœur de N'Djamena, l'Académie Royale est une institution de premier plan dédiée au développement précoce et à l'enseignement primaire de la jeunesse tchadienne.",
      desc2:
        'Nous suivons le programme officiel tchadien enrichi par des standards internationaux, axé sur le bilinguisme (Français/Arabe/Anglais), la discipline et la créativité.',
      stat_campuses: 'Salles de Classe',
      stat_laureates: 'Enseignants Qualifiés',
      stat_labs: 'Salles Informatiques',
      stat_legacy: 'Futurs Leaders',
      feature_precision_title: 'Suivi Personnalisé',
      feature_precision_desc:
        "Des classes à effectifs réduits garantissent que chaque enfant reçoit l'attention nécessaire pour s'épanouir.",
      feature_network_title: 'Développement Global',
      feature_network_desc:
        "Au-delà des notes, nous cultivons les valeurs morales, la responsabilité civique et le leadership essentiels pour l'avenir du Tchad.",
      feature_quantum_title: 'Installations Modernes',
      feature_quantum_desc:
        "Des salles de classe climatisées et sécurisées, équipées d'outils pédagogiques modernes et d'aires de jeux.",
    },
    programs: {
      title_line1: 'Niveaux',
      title_highlight: 'Académiques',
      subtitle:
        "De leurs premiers pas en Maternelle à l'examen du CEP, nous guidons vos enfants à travers chaque étape du système scolaire tchadien.",
      explore: 'En savoir plus',
      items: {
        kindergarten: {
          title: 'Maternelle',
          desc: "Petite, Moyenne et Grande Section. Activités d'éveil pour développer la motricité, la socialisation et la pré-lecture.",
          duration: '3 - 5 Ans',
        },
        primary: {
          title: 'Primaire',
          desc: "Du CP au CM2. Un programme rigoureux couvrant les Mathématiques, le Français, l'Arabe, les Sciences et l'Éducation Civique.",
          duration: '6 - 11 Ans',
        },
        bilingual: {
          title: 'Excellence Bilingue',
          desc: "Programmes linguistiques intensifs en français et arabe, avec initiation à l'anglais pour préparer des citoyens du monde.",
          duration: 'Tous Niveaux',
        },
        activities: {
          title: 'Arts & Sports',
          desc: 'Activités extrascolaires incluant football, peinture, théâtre et événements culturels pour libérer la créativité.',
          duration: 'Hebdomadaire',
        },
      },
    },
    contact: {
      title_line1: 'Rejoignez Notre',
      title_highlight: 'Famille',
      desc: "Offrez à votre enfant le meilleur départ dans la vie. Contactez-nous pour planifier une visite ou retirer un dossier d'inscription.",
      placeholder: 'Email du Parent',
      button: 'Demander le Dossier',
      disclaimer: 'Réponse sous 24h. Visites du Lundi au Vendredi.',
    },
    visit: {
      hero: {
        title_line1: 'Découvrez Notre',
        title_highlight: 'Campus',
        subtitle: "Nous vous invitons à visiter l'Académie Royale et à voir de vos propres yeux l'environnement où grandissent les futurs leaders.",
        badge: 'Réserver une visite',
      },
      info: {
        title: 'Infos Visiteurs',
        hours: {
          title: 'Heures de Visite',
          desc: 'Lundi - Vendredi : 8h00 - 12h00',
        },
        location: {
          title: 'Localisation',
          desc: "Quartier Klémat, N'Djamena, Tchad",
        },
        contact: {
          title: 'Contact Admissions',
          desc: '+235 66 00 00 00 | admissions@academieroyale.td',
        },
      },
      form: {
        title: 'Programmer votre Visite',
        name: 'Nom du Parent',
        email: 'Email',
        phone: 'Numéro de Téléphone',
        date: 'Date Souhaitée',
        message: 'Notes Supplémentaires',
        submit: 'Demander un Rendez-vous',
      },
    },
    footer: {
      tagline:
        'Éduquer la prochaine génération de leaders tchadiens avec passion, discipline et excellence.',
      headers: {
        programs: 'Éducation',
        resources: 'Parents',
        connect: 'Nous Contacter',
      },
      links: {
        quantum: 'Maternelle',
        neural: 'École Primaire',
        ethics: 'Vie Scolaire',
        space: 'Activités',
        portal: 'Espace Parents',
        library: 'Calendrier Scolaire',
        career: 'Uniformes',
        alumni: 'Menu Cantine',
      },
      copyright: "Académie Royale N'Djamena. Tous droits réservés.",
    },
  },
};
