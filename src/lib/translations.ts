import img1 from '../assets/1.webp';
import img2 from '../assets/2.webp';
import img3 from '../assets/3.webp';
import img4 from '../assets/4.webp';

export type Language = 'en' | 'fr';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      programs: 'Programs',
      about: 'About',
      contact: 'Contact',
      join: 'Enroll Now',
    },
    hero: {
      badge: 'Admissions Open 2024-2025',
      title_line1: 'Nurturing the',
      title_highlight: 'Leaders of Chad',
      subtitle:
        "Académie Royale offers a world-class bilingual education in N'Djamena, blending academic excellence with Chadian values from Preschool to High School.",
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
          subtitle: 'Our curriculum ensures fluency in French and Arabic, preparing students for the Baccalauréat and beyond.',
        },
        {
          image: img3,
          title_line1: 'Building Strong',
          title_highlight: 'Character',
          subtitle: 'Beyond academics, we instill moral values, discipline, and leadership skills suited for the Chadian society.',
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
      headline_line1: 'From Maternelle',
      headline_line2: 'To Le Baccalauréat',
      description: 'Académie Royale accompanies your child through every stage of the Chadian education system with bilingual excellence.',
      button: 'Explore Programs',
    },
    stats: {
      experience: 'Years of Excellence',
      alumni: 'Graduates',
      certified: 'Bac Success Rate',
    },
    welcome: {
      title: 'Word from the General Director',
      subtitle: 'A Vision for Excellence',
      text1:
        'Welcome to Académie Royale. Since our inception, our mission has been clear: to provide the youth of Chad with an education that meets international standards while respecting our national program.',
      text2:
        'From the CEP to the Baccalauréat, we guide our students with discipline and love. We prepare them to be the future builders of our nation.',
      sign: 'The Directorate',
    },
    why_choose_us: {
      title: 'Why Choose Académie Royale?',
      items: [
        {
          title: 'Bilingual Mastery',
          desc: 'Fluency in French and Arabic is central, with English taught from Primary school.',
        },
        {
          title: 'Safe Transport',
          desc: "A fleet of buses covering major N'Djamena districts ensuring safe daily commute.",
        },
        {
          title: 'Holistic Education',
          desc: 'Balancing rigorous academics with civic education, sports, and Chadian culture.',
        },
        {
          title: 'Secure Campus',
          desc: 'A modern, secure environment in Klémat District monitored 24/7.',
        },
      ],
    },
    news: {
      title: 'School News',
      stories: 'Our Stories',
      view_all: 'View All News',
      badge: 'NEWS',
      read_more: 'Read Article',
      items: [
        {
          title: 'Baccalauréat Results 2024',
          date: 'July 2024',
          desc: 'We are proud to announce a 98% success rate in the Baccalauréat exams this year. Congratulations to our laureates!',
        },
        {
          title: 'Cultural Week',
          date: 'May 2024',
          desc: 'A vibrant celebration of Chadian heritage, featuring traditional dances, poetry, and art from all regions.',
        },
        {
          title: 'Science Fair',
          date: 'April 2024',
          desc: 'Our Lycée students showcased innovative projects in renewable energy and robotics.',
        },
      ],
    },
    testimonials: {
      title: "Parents' Voices",
      items: [
        {
          name: 'Fatime Mahamat',
          role: 'Mother (Lycée)',
          text: 'My daughter in Terminale D is receiving excellent preparation for her medical studies. The science labs are top-notch.',
        },
        {
          name: 'Moussa Abakar',
          role: 'Father (Collège)',
          text: 'The discipline here is what I value most. My son in 3ème is focused and motivated for his BEPC.',
        },
        {
          name: 'Sarah Nguema',
          role: 'Mother (Maternelle)',
          text: 'A nurturing environment for my little one in Grande Section. She loves going to school every day.',
        },
      ],
    },
    team: {
      title: 'Administration',
      subtitle: 'Dedicated Leadership',
      items: [
        { name: 'Mme. Amina', role: 'General Director' },
        { name: 'Mr. Brahim', role: 'Director of Studies (Lycée)' },
        { name: 'Mrs. Kaltouma', role: 'Head of Primary' },
        { name: 'Mr. Youssouf', role: 'Student Affairs' },
      ],
    },
    facilities: {
      title: 'Our Campus',
      desc: 'Modern infrastructure for a complete education.',
      items: [
        { title: 'Libraries', desc: 'Separate libraries for Primary and Secondary.' },
        { title: 'Computer Labs', desc: 'Equipped for IT and coding initiation.' },
        { title: 'Science Labs', desc: 'Fully stocked Biology and Physics labs.' },
        { title: 'Sports Ground', desc: 'Football pitch and basketball court.' },
      ],
    },
    curriculum: {
      title: 'Academic Program',
      subjects: 'Key Subjects',
      schedule: 'School Day',
      items: [
        { subject: 'Scientific Stream', desc: 'Mathematics, Physics-Chemistry, Biology (S Series)' },
        { subject: 'Literary Stream', desc: 'Philosophy, Languages, History-Geo (A Series)' },
        { subject: 'Languages', desc: 'French (Instruction), Arabic, English' },
        { subject: 'Civic Education', desc: 'Values, Citizenship, National History' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'What cycles do you cover?',
          a: 'We cover the full spectrum: Maternelle, Primaire, Collège, and Lycée.',
        },
        {
          q: 'Are uniforms mandatory?',
          a: 'Yes, distinct uniforms for Primary and Secondary students are required.',
        },
        {
          q: 'Is there an entrance exam?',
          a: 'Yes, admission tests are mandatory for all levels from CP to Terminale.',
        },
        {
          q: 'Do you offer transport?',
          a: 'Yes, our bus service covers most neighborhoods in N\'Djamena.',
        },
      ],
    },
    about_hero: {
      headline: 'Académie Royale',
      subheadline: 'Excellence • Discipline • Success',
      description: 'Founded with a vision to transform education in Chad, we provide a seamless pathway from Maternelle to the Baccalauréat, building the leaders of tomorrow.',
      button: 'Discover Our Cycles',
    },
    about: {
      title_line1: 'Educating',
      title_highlight1: 'Chad',
      title_line2: 'For the',
      title_highlight2: 'World',
      desc1:
        "Located in N'Djamena, Académie Royale stands as a beacon of quality education. We rigidly follow the National Curriculum while integrating international best practices.",
      desc2:
        'Our focus extends beyond the classroom to shape well-rounded citizens, fluent in key languages and grounded in moral integrity.',
      stat_campuses: 'Classrooms',
      stat_laureates: 'Certified Teachers',
      stat_labs: 'Laboratories',
      stat_legacy: 'Alumni',
      feature_precision_title: 'Academic Rigor',
      feature_precision_desc:
        'Intensive preparation for national exams (CEP, BEPC, Baccalauréat).',
      feature_network_title: 'Character Building',
      feature_network_desc:
        'Instilling discipline, respect, and civic responsibility in every student.',
      feature_quantum_title: 'Modern Environment',
      feature_quantum_desc:
        'Secure facilities with air-conditioning and digital learning tools.',
    },
    programs: {
      title_line1: 'Our',
      title_highlight: 'Programs',
      subtitle:
        'A comprehensive educational journey tailored to each stage of development, from Maternelle to Terminale.',
      explore: 'View Details',
      items: {
        kindergarten: {
          title: 'Preschool',
          desc: 'Petite, Moyenne, Grande Section. Early childhood development focusing on socialization and basic skills.',
          duration: '3 - 5 Years',
        },
        primary: {
          title: 'Primary School',
          desc: 'CP to CM2. Building strong foundations in literacy and numeracy, leading to the CEP.',
          duration: '6 - 11 Years',
        },
        college: {
          title: 'Middle School',
          desc: '6ème to 3ème. Lower secondary education culminating in the BEPC exam.',
          duration: '12 - 15 Years',
        },
        lycee: {
          title: 'High School',
          desc: '2nde to Terminale. Upper secondary specializing in Series A (Arts) and D (Sciences), leading to the Baccalauréat.',
          duration: '16 - 18 Years',
        },
      },
    },
    contact: {
      title_line1: 'Join Our',
      title_highlight: 'Community',
      desc: 'Invest in your child\'s future today. Visit our administration during working hours.',
      placeholder: "Parent's Email Address",
      disclaimer: 'Office hours: Mon-Fri, 7:30 AM - 1:30 PM',
      success: 'Thank you! We have received your request.',
      error: 'Something went wrong. Please try again.',
      loading: 'Sending...',
      button: 'Send Request',
    },
    visit: {
      hero: {
        title_line1: 'Experience Our',
        title_highlight: 'Campus',
        subtitle: 'We invite prospective parents and students to tour our facilities and meet our academic staff.',
        badge: 'Book a Tour',
        cta_schedule: 'Schedule Now',
        cta_virtual: 'Virtual Tour',
        secure: 'Secure',
        support: 'Support',
        location_badge_line1: 'Klémat District',
        location_badge_line2: "N'Djamena, Chad",
      },
      info: {
        title: 'Visitor Information',
        hours: {
          title: 'Administrative Hours',
          desc: 'Monday - Friday: 7:30 AM - 1:30 PM',
        },
        location: {
          title: 'Location',
          desc: "Klémat District, N'Djamena, Chad",
        },
        contact: {
          title: 'Admissions Office',
          desc: '+235 66 00 00 00 | admissions@academieroyale.td',
        },
      },
      form: {
        title: 'Schedule Your Visit',
        name: 'Parent Name',
        email: 'Email Address',
        phone: 'Phone Number',
        date: 'Preferred Date',
        message: 'Additional Notes (e.g., Grade Level)',
        submit: 'Request Appointment',
        success_title: 'Success!',
        success: 'Appointment Request Received!',
        another: 'Schedule Another',
        error: 'Please fill in all required fields.',
        loading: 'Scheduling...',
      },
    },
    seo: {
      home: { title: 'Home', desc: 'Académie Royale - Excellence in Chadian Education from Maternelle to Lycée.' },
      programs: { title: 'Academic Programs', desc: 'Explore our programs: Maternelle, Primaire, Collège, and Lycée.' },
      about: { title: 'About Us', desc: 'Our mission to educate the future leaders of Chad.' },
      contact: { title: 'Contact Us', desc: 'Admissions and inquiries for Académie Royale.' },
      visit: { title: 'Visit Campus', desc: 'Tour our educational facilities in N\'Djamena.' },
    },
    search: {
      placeholder: 'Search programs, news...',
      no_results: 'No results found for',
      initial: 'Type to search Académie Royale',
      close: 'Press ESC to close',
      results_count: 'results found',
      items: {
        home: { title: 'Home', desc: 'Main page' },
        programs: { title: 'Programs', desc: 'Review our academic levels' },
        about: { title: 'About Us', desc: 'Mission and Vision' },
        contact: { title: 'Contact', desc: 'Get in touch' },
        visit: { title: 'Visit', desc: 'Schedule a tour' },
        news: { title: 'News', desc: 'Updates and events' },
        admissions: { title: 'Admissions', desc: 'Enrollment information' },
      },
    },
    footer: {
      tagline:
        'Educating the next generation of Chadian leaders with passion, discipline, and excellence.',
      headers: {
        programs: 'Programs',
        resources: 'Parents',
        connect: 'Contact',
      },
      links: {
        quantum: 'Preschool',
        neural: 'Primary School',
        ethics: 'Middle School',
        space: 'High School',
        portal: 'Parent Portal',
        library: 'Exam Results',
        career: 'Uniforms',
        alumni: 'Alumni Network',
      },
      copyright: "Académie Royale N'Djamena. All rights reserved.",
      address: "Klémat District, N'Djamena, Chad",
      legal: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Settings',
      },
    },
    auth: {
      login: {
        title: 'Student Login',
        subtitle: 'Access your portal',
        id_label: 'Username',
        id_placeholder: 'Enter your username',
        cta: 'Sign In',
        no_account: "Don't have an account?",
        register_link: 'Register',
        badge: 'Student Portal',
      },
      register: {
        title: 'Student Registration',
        subtitle: 'Join Académie Royale',
        cta: 'Create Account',
        has_account: 'Already have an account?',
        login_link: 'Sign In',
        terms: 'I agree to the Terms using this service.',
      },
      fields: {
        surname: 'Surname',
        fullname: 'Full Name',
        phone: 'Phone Number',
        password: 'Password',
        confirm_password: 'Confirm Password',
        cycle: 'Education Level',
        select_cycle: 'Select Cycle',
        classe: 'Class',
        select_classe: 'Select Class',
      },
      errors: {
        required: 'This field is required',
        password_match: 'Passwords do not match',
        phone_format: 'Invalid phone number format',
        nickname_taken: 'This nickname is already taken',
      },
      cycles: {
        college: 'Middle School (Collège)',
        lycee: 'High School (Lycée)',
      },
    },
  },
  fr: {
    nav: {
      home: 'Accueil',
      programs: 'Cycles',
      about: 'À Propos',
      contact: 'Contact',
      join: "S'inscrire",
    },
    hero: {
      badge: 'Inscriptions Ouvertes 2024-2025',
      title_line1: 'Cultiver les',
      title_highlight: 'Leaders du Tchad',
      subtitle:
        "L'Académie Royale offre une éducation bilingue d'excellence à N'Djamena, de la Maternelle au Lycée, alliant réussite académique et valeurs tchadiennes.",
      cta_primary: 'Inscrire votre enfant',
      cta_secondary: "Visiter l'école",
      slides: [
        {
          image: img1,
          title_line1: 'Cultiver les',
          title_highlight: 'Leaders du Tchad',
          subtitle: "Une éducation complète de la Maternelle à la Terminale, ancrée dans nos valeurs.",
        },
        {
          image: img2,
          title_line1: 'Excellence en',
          title_highlight: 'Éducation Bilingue',
          subtitle: "Maîtrise du français et de l'arabe pour réussir le Baccalauréat et l'avenir.",
        },
        {
          image: img3,
          title_line1: 'Bâtir un',
          title_highlight: 'Caractère Fort',
          subtitle: "Discipline, travail et intégrité sont au cœur de notre projet éducatif.",
        },
        {
          image: img4,
          title_line1: 'Cultiver les',
          title_highlight: 'Leaders du Tchad',
          subtitle: "L'Académie Royale forme l'élite de demain, de N'Djamena pour le monde.",
        },
      ],
    },
    levels_hero: {
      badge: 'Inscriptions Ouvertes',
      headline_line1: 'De la Maternelle',
      headline_line2: 'Au Baccalauréat',
      description: "L'Académie Royale accompagne votre enfant à chaque étape du système éducatif tchadien avec excellence.",
      button: 'Découvrir nos cycles',
    },
    stats: {
      experience: "Années d'Excellence",
      alumni: 'Élèves',
      certified: 'Réussite au Bac',
    },
    welcome: {
      title: 'Mot de la Direction',
      subtitle: "Une Vision d'Excellence",
      text1:
        "Bienvenue à l'Académie Royale. Notre mission est d'offrir à la jeunesse tchadienne une éducation de qualité supérieure, respectant le programme national tout en ouvrant des perspectives internationales.",
      text2:
        "Du CEP au Baccalauréat, nous encadrons nos élèves avec rigueur et bienveillance. Nous formons non seulement des têtes bien pleines, mais des citoyens responsables.",
      sign: 'La Direction Générale',
    },
    why_choose_us: {
      title: "Pourquoi Choisir l'Académie Royale ?",
      items: [
        {
          title: 'Formation Bilingue',
          desc: "Français et Arabe sont les piliers, avec l'anglais renforcé dès le Primaire.",
        },
        {
          title: 'Transport Assuré',
          desc: "Bus scolaires desservant les principaux quartiers de N'Djamena.",
        },
        {
          title: 'Éducation Complète',
          desc: "Un équilibre entre études, sport, culture et éducation civique.",
        },
        {
          title: 'Cadre Sécurisé',
          desc: "Campus moderne au Quartier Klémat, sécurisé 24h/24.",
        },
      ],
    },
    news: {
      title: 'Actualités',
      stories: 'Nos Histoires',
      view_all: 'Toute l\'Actualité',
      badge: 'INFO',
      read_more: 'Lire Plus',
      items: [
        {
          title: 'Résultats Baccalauréat 2024',
          date: 'Juillet 2024',
          desc: "Félicitations à nos bacheliers ! L'Académie enregistre un taux de réussite exceptionnel de 98% cette année.",
        },
        {
          title: 'Semaine Culturelle',
          date: 'Mai 2024',
          desc: "Célébration de la diversité tchadienne à travers danses, chants et expositions artisanales.",
        },
        {
          title: 'Concours Scientifique',
          date: 'Avril 2024',
          desc: "Nos élèves de Lycée ont brillé lors du concours inter-lycées de N'Djamena.",
        },
      ],
    },
    testimonials: {
      title: 'Témoignages',
      items: [
        {
          name: 'Fatime Mahamat',
          role: 'Mère (Lycée)',
          text: "Ma fille en Terminale D est très bien préparée. Le niveau en sciences est excellent.",
        },
        {
          name: 'Moussa Abakar',
          role: 'Père (Collège)',
          text: "J'apprécie la discipline stricte. Mon fils en 3ème est concentré sur son BEPC.",
        },
        {
          name: 'Sarah Nguema',
          role: 'Mère (Maternelle)',
          text: "L'encadrement en Grande Section est formidable. Ma fille s'épanouit chaque jour.",
        },
      ],
    },
    team: {
      title: 'Administration',
      subtitle: 'Une Équipe Dévouée',
      items: [
        { name: 'Mme. Amina', role: 'Directrice Générale' },
        { name: 'M. Brahim', role: 'Censeur (Lycée)' },
        { name: 'Mme. Kaltouma', role: 'Directrice Primaire' },
        { name: 'M. Youssouf', role: 'Surveillant Général' },
      ],
    },
    facilities: {
      title: 'Nos Infrastructures',
      desc: "Un cadre propice à l'apprentissage.",
      items: [
        { title: 'Bibliothèques', desc: 'Espaces dédiés pour le Primaire et le Secondaire.' },
        { title: 'Salles Info', desc: 'Équipements informatiques modernes.' },
        { title: 'Labos Sciences', desc: 'Physique-chimie et SVT pour le Lycée.' },
        { title: 'Terrains de Sport', desc: 'Football, basket et aires de jeux.' },
      ],
    },
    curriculum: {
      title: 'Programme Académique',
      subjects: 'Filières & Matières',
      schedule: 'Rythme Scolaire',
      items: [
        { subject: 'Série Scientifique', desc: 'Maths, PC, SVT (Série D/C) pour le Lycée' },
        { subject: 'Série Littéraire', desc: 'Philo, Langues, Hist-Géo (Série A)' },
        { subject: 'Langues', desc: 'Français (Langues d\'enseignement), Arabe, Anglais' },
        { subject: 'Éducation Civique', desc: 'Morale, Citoyenneté et Histoire du Tchad' },
      ],
    },
    faq: {
      title: 'Questions Fréquentes',
      items: [
        {
          q: 'Quels cycles proposez-vous ?',
          a: 'Nous assurons la scolarité complète : Maternelle, Primaire, Collège et Lycée.',
        },
        {
          q: "L'uniforme est-il obligatoire ?",
          a: "Oui, tous les élèves doivent porter la tenue réglementaire de l'établissement.",
        },
        {
          q: "Y a-t-il un test d'entrée ?",
          a: "Oui, un test de niveau est obligatoire pour toute nouvelle inscription (Primaire et Secondaire).",
        },
        {
          q: 'Proposez-vous le transport ?',
          a: "Oui, notre service de bus dessert la majorité des quartiers de N'Djamena.",
        },
      ],
    },
    about_hero: {
      headline: 'Académie Royale',
      subheadline: 'Excellence • Discipline • Réussite',
      description: "Fondée pour former l'élite tchadienne de demain, nous offrons un parcours complet de la Maternelle à la Terminale, axé sur la réussite aux examens nationaux.",
      button: 'Nos Cycles',
    },
    about: {
      title_line1: 'Éduquer le',
      title_highlight1: 'Tchad',
      title_line2: "S'ouvrir au",
      title_highlight2: 'Monde',
      desc1:
        "L'Académie Royale est une institution de référence à N'Djamena. Nous appliquons rigoureusement le programme national tchadien tout en y intégrant des méthodes pédagogiques modernes.",
      desc2:
        "Notre objectif est la réussite de chaque élève aux examens (CEP, BEPC, BAC) et son épanouissement personnel en tant que citoyen responsable.",
      stat_campuses: 'Salles de Classe',
      stat_laureates: 'Enseignants',
      stat_labs: 'Laboratoires',
      stat_legacy: 'Anciens Élèves',
      feature_precision_title: 'Rigueur Académique',
      feature_precision_desc:
        'Préparation intensive aux examens d\'État avec un excellent taux de réussite.',
      feature_network_title: 'Formation Morale',
      feature_network_desc:
        'Inculquer le respect, la discipline et les valeurs civiques.',
      feature_quantum_title: 'Cadre Moderne',
      feature_quantum_desc:
        'Salles climatisées et équipées pour un confort d\'étude optimal.',
    },
    programs: {
      title_line1: 'Nos',
      title_highlight: 'Cycles',
      subtitle:
        "Un parcours éducatif structuré pour accompagner l'élève de la petite enfance jusqu'aux portes de l'université.",
      explore: 'Détails',
      items: {
        kindergarten: {
          title: 'Maternelle',
          desc: 'Petite, Moyenne et Grande Section. Éveil, socialisation et bases fondamentales.',
          duration: '3 - 5 Ans',
        },
        primary: {
          title: 'Primaire',
          desc: 'Du CP au CM2. Acquisition des savoirs fondamentaux menant au CEP.',
          duration: '6 - 11 Ans',
        },
        college: {
          title: 'Collège',
          desc: 'De la 6ème à la 3ème. Enseignement général sanctionné par le BEPC.',
          duration: '12 - 15 Ans',
        },
        lycee: {
          title: 'Lycée',
          desc: 'Seconde, Première, Terminale. Séries A (Littéraire) et D (Scientifique). Préparation au Baccalauréat.',
          duration: '16 - 18 Ans',
        },
      },
    },
    contact: {
      title_line1: 'Rejoignez',
      title_highlight: 'L\'Excellence',
      desc: "Préparez l'avenir de votre enfant. Passez à l'administration pour plus d'informations.",
      placeholder: 'Email du Parent',
      disclaimer: 'Horaires : Lun-Ven, 7h30 - 13h30',
      success: 'Merci ! Nous avons bien reçu votre demande.',
      error: 'Une erreur est survenue. Veuillez réessayer.',
      loading: 'Envoi...',
      button: 'Envoyer',
    },
    visit: {
      hero: {
        title_line1: 'Visitez Notre',
        title_highlight: 'Campus',
        subtitle: "Venez découvrir nos infrastructures et rencontrer notre équipe pédagogique.",
        badge: 'Prendre Rendez-vous',
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
          title: 'Heures Administratives',
          desc: 'Lundi - Vendredi : 7h30 - 13h30',
        },
        location: {
          title: 'Adresse',
          desc: "Quartier Klémat, N'Djamena, Tchad",
        },
        contact: {
          title: 'Bureau des Admissions',
          desc: '+235 66 00 00 00 | admissions@academieroyale.td',
        },
      },
      form: {
        title: 'Demander une Visite',
        name: 'Nom du Parent',
        email: 'Email',
        phone: 'Téléphone',
        date: 'Date Souhaitée',
        message: 'Info (ex: Classe demandée)',
        submit: 'Envoyer la demande',
        success_title: 'Envoyé !',
        success: 'Votre demande a été enregistrée.',
        another: 'Nouvelle demande',
        error: 'Veuillez remplir les champs obligatoires.',
        loading: 'Envoi...',
      },
    },
    seo: {
      home: { title: 'Accueil', desc: 'Académie Royale - L\'Excellence éducative au Tchad, de la Maternelle au Lycée.' },
      programs: { title: 'Cycles Scolaires', desc: 'Nos programmes : Maternelle, Primaire, Collège et Lycée.' },
      about: { title: 'À Propos', desc: 'Notre mission de former les futurs cadres du Tchad.' },
      contact: { title: 'Contact', desc: 'Admissions et renseignements.' },
      visit: { title: 'Visiter', desc: 'Découvrez notre campus à N\'Djamena.' },
    },
    search: {
      placeholder: 'Rechercher un cycle, une info...',
      no_results: 'Aucun résultat pour',
      initial: "Rechercher dans l'Académie Royale",
      close: 'Fermer (ESC)',
      results_count: 'résultats',
      items: {
        home: { title: 'Accueil', desc: 'Page principale' },
        programs: { title: 'Cycles', desc: 'Nos niveaux d\'enseignement' },
        about: { title: 'À Propos', desc: 'Mission et Vision' },
        contact: { title: 'Contact', desc: 'Nous joindre' },
        visit: { title: 'Visiter', desc: 'Voir le campus' },
        news: { title: 'Actualités', desc: 'Vie scolaire' },
        admissions: { title: 'Admissions', desc: 'Inscriptions' },
      },
    },
    footer: {
      tagline:
        'Former les élites tchadiennes de demain avec rigueur et excellence.',
      headers: {
        programs: 'Cycles',
        resources: 'Parents',
        connect: 'Contact',
      },
      links: {
        quantum: 'Maternelle',
        neural: 'Primaire',
        ethics: 'Collège',
        space: 'Lycée',
        portal: 'Espace Parents',
        library: 'Résultats Examens',
        career: 'Uniformes',
        alumni: 'Anciens Élèves',
      },
      copyright: "Académie Royale N'Djamena. Tous droits réservés.",
      address: "Quartier Klémat, N'Djamena, Tchad",
      legal: {
        privacy: 'Politique de Confidentialité',
        terms: "Conditions d'Utilisation",
        cookies: 'Paramètres des Cookies',
      },
    },
    auth: {
      login: {
        title: 'Connexion Étudiant',
        subtitle: 'Accédez à votre espace',
        id_label: 'Surnom',
        id_placeholder: 'Entrez votre surnom',
        cta: 'Se Connecter',
        no_account: "Pas encore de compte ?",
        register_link: "S'inscrire",
        badge: 'Espace Étudiant',
      },
      register: {
        title: 'Inscription Étudiant',
        subtitle: "Rejoignez l'Académie Royale",
        cta: 'Créer un Compte',
        has_account: 'Déjà inscrit ?',
        login_link: 'Se Connecter',
        terms: "J'accepte les conditions d'utilisation.",
      },
      fields: {
        surname: 'Surnom',
        fullname: 'Nom et Prénom',
        phone: 'Numéro de Téléphone',
        password: 'Mot de Passe',
        confirm_password: 'Confirmer le Mot de Passe',
        cycle: 'Niveau',
        select_cycle: 'Sélectionner un Cycle',
        classe: 'Classe',
        select_classe: 'Sélectionner une Classe',
      },
      errors: {
        required: 'Ce champ est requis',
        password_match: 'Les mots de passe ne correspondent pas',
        phone_format: 'Format de téléphone invalide',
        nickname_taken: 'Ce surnom est déjà pris',
      },
      cycles: {
        college: 'Collège',
        lycee: 'Lycée',
      },
    },
  },
};
