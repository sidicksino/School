import img1 from '../assets/1.webp';
import img2 from '../assets/2.webp';
import img3 from '../assets/3.webp';
import img4 from '../assets/4.webp';

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
    levels_hero: {
      badge: 'Admissions Open 2024-2025',
      headline_line1: 'Are You',
      headline_line2: 'Ready For School?',
      description: 'Académie Royale offers a world-class bilingual education to prepare your child for a bright future. Join us today.',
      button: 'Learn More',
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
      title: 'Latest News & Events',
      read_more: 'Read More',
      items: [
        {
          title: 'Back to School 2025-2026',
          date: 'September 2025',
          desc: 'A new adventure begins! This morning, our students returned to school in a spirit of enthusiasm and readiness.',
        },
        {
          title: 'Excellence Awards 2025',
          date: 'June 2025',
          desc: 'A moment of great intensity celebrating the hard work and success of our students and staff.',
        },
        {
          title: 'End of Year 2024-2025',
          date: 'June 2025',
          desc: 'Officially concluding a year rich in learning, challenges, and shared successes.',
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
    about_hero: {
      headline: 'Académie Royale',
      subheadline: 'Awakening • Knowledge • Excellence',
      description: 'Founded in 2015 in Chad, Académie Royale welcomes children from kindergarten through secondary school. Our mission is to offer quality education combining knowledge, discipline, and human values.',
      button: 'Discover Our Cycles',
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
      disclaimer: 'We reply within 24 hours. Visits available Monday-Friday.',
      success: 'Thank you! We have received your request.',
      error: 'Something went wrong. Please try again.',
      loading: 'Sending...',
    },
    visit: {
      hero: {
        title_line1: 'Experience Our',
        title_highlight: 'Campus',
        subtitle: 'We invite you to tour Académie Royale and see firsthand the nurturing environment where future leaders grow.',
        badge: 'Book a Tour',
        cta_schedule: 'Schedule Now',
        cta_virtual: 'Virtual Tour',
        secure: 'Secure',
        support: 'Support',
        location_badge_line1: 'Quartier Klémat',
        location_badge_line2: "N'Djamena, Chad",
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
        success_title: 'Success!',
        success: 'Appointment Request Received!',
        another: 'Schedule Another',
        error: 'Please fill in all required fields.',
        loading: 'Scheduling...',
      },
    },
    seo: {
      home: { title: 'Home', desc: 'Académie Royale - Nurturing the Future Leaders of Chad with Excellence and Values.' },
      programs: { title: 'Academic Levels', desc: 'Discover our comprehensive curriculum from Kindergarten to Primary School.' },
      about: { title: 'About Us', desc: 'Learn about our mission, history, and the dedicated team behind Académie Royale.' },
      contact: { title: 'Contact Us', desc: 'Get in touch with Académie Royale for admissions, inquiries, or to schedule a visit.' },
      visit: { title: 'Visit Our Campus', desc: 'Book a tour to see our modern facilities and meet our educators.' },
    },
    search: {
      placeholder: 'Search pages, topics...',
      no_results: 'No results found for',
      initial: 'Type to search across Académie Royale',
      close: 'Press ESC to close',
      results_count: 'results found',
      items: {
        home: { title: 'Home', desc: 'Main page of Académie Royale' },
        programs: { title: 'Programs', desc: 'Explore our academic cycles' },
        about: { title: 'About Us', desc: 'Our history, mission, and team' },
        contact: { title: 'Contact', desc: 'Get in touch with us' },
        visit: { title: 'Visit School', desc: 'Schedule a campus tour' },
        news: { title: 'News', desc: 'Latest updates and events' },
        admissions: { title: 'Admissions', desc: 'Join Académie Royale' },
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
    levels_hero: {
      badge: 'Inscriptions Ouvertes',
      headline_line1: 'Êtes-vous',
      headline_line2: "Prêts pour l'École ?",
      description: "L'Académie Royale offre une éducation bilingue de classe mondiale pour préparer votre enfant à un avenir brillant. Rejoignez-nous.",
      button: 'En Savoir Plus',
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
          title: 'Rentrée Scolaire 2025-2026',
          date: 'Septembre 2025',
          desc: "Une nouvelle aventure commence ! Ce matin, nos élèves ont repris le chemin de l'école dans un esprit d'enthousiasme.",
        },
        {
          title: 'Prix de l’Excellence 2025',
          date: 'Juin 2025',
          desc: "Une cérémonie grandiose pour célébrer l'excellence académique et l'engagement de nos élèves.",
        },
        {
          title: 'Fin de l’année 2024-2025',
          date: 'Juin 2025',
          desc: "Clap de fin pour une année riche en apprentissages, en défis relevés et en succès partagés.",
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
    about_hero: {
      headline: 'Académie Royale',
      subheadline: 'Éveil • Savoir • Excellence',
      description: "Fondée en 2015 au Tchad, l'Académie Royale est un établissement scolaire qui accueille les enfants de la maternelle, du primaire et du secondaire. Notre mission est d'offrir une éducation de qualité, alliant savoir, discipline et valeurs humaines.",
      button: 'Découvrir nos cycles',
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
      disclaimer: 'Réponse sous 24h. Visites du Lundi au Vendredi.',
      success: 'Merci ! Nous avons bien reçu votre demande.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      loading: 'Envoi en cours...',
    },
    visit: {
      hero: {
        title_line1: 'Découvrez Notre',
        title_highlight: 'Campus',
        subtitle: "Nous vous invitons à visiter l'Académie Royale et à voir de vos propres yeux l'environnement où grandissent les futurs leaders.",
        badge: 'Réserver une visite',
        cta_schedule: 'Réserver',
        cta_virtual: 'Visite Virtuelle',
        secure: 'Sécurisé',
        support: 'Support',
        location_badge_line1: 'Quartier Klémat',
        location_badge_line2: 'N\'Djamena, Tchad',
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
        success_title: 'Succès !',
        success: 'Demande de Rendez-vous Reçue !',
        another: 'Programmer un autre',
        error: 'Veuillez remplir tous les champs.',
        loading: 'Envoi...',
      },
    },
    seo: {
      home: { title: 'Accueil', desc: 'Académie Royale - Cultiver les futurs leaders du Tchad avec excellence et valeurs.' },
      programs: { title: 'Niveaux Académiques', desc: 'Découvrez notre programme complet de la maternelle au primaire.' },
      about: { title: 'À Propos', desc: "Découvrez notre mission, notre histoire et l'équipe dévouée de l'Académie Royale." },
      contact: { title: 'Contact', desc: "Contactez l'Académie Royale pour les admissions, demandes de renseignements ou pour planifier une visite." },
      visit: { title: 'Visiter le Campus', desc: 'Réservez une visite pour découvrir nos installations modernes et rencontrer nos éducateurs.' },
    },
    search: {
      placeholder: 'Rechercher des pages, des sujets...',
      no_results: 'Aucun résultat pour',
      initial: "Tapez pour rechercher dans l'Académie Royale",
      close: 'Appuyez sur ESC pour fermer',
      results_count: 'résultats trouvés',
      items: {
        home: { title: 'Accueil', desc: "Page principale de l'Académie Royale" },
        programs: { title: 'Programmes', desc: 'Explorez nos cycles académiques' },
        about: { title: 'À Propos', desc: 'Notre histoire, mission et équipe' },
        contact: { title: 'Contact', desc: 'Prenez contact avec nous' },
        visit: { title: 'Visiter', desc: 'Planifiez une visite du campus' },
        news: { title: 'Actualités', desc: 'Dernières mises à jour et événements' },
        admissions: { title: 'Admissions', desc: "Rejoignez l'Académie Royale" },
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
