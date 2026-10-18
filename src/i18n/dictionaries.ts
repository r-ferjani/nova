import type { ServiceKey } from "./config";

/**
 * Central dictionary. This is the ONLY place user-facing copy lives.
 * Never scatter translation conditionals through components.
 *
 * Both objects must stay structurally identical — the `Dictionary` type is
 * derived from the Danish object so a missing English key is a type error.
 */

const da = {
  meta: {
    titleSuffix: "NOVA PRIME SERVICES ApS",
    home: {
      title: "Professionel rengøring i Danmark | NOVA PRIME SERVICES ApS",
      description:
        "Grundig, pålidelig og fleksibel rengøring til private og virksomheder. Privat rengøring, erhvervsrengøring, flytterengøring og hovedrengøring – få et gratis tilbud.",
    },
    service: {
      title: "{title} | NOVA PRIME SERVICES ApS",
      description: "{description}",
    },
    privacy: {
      title: "Privatlivspolitik | NOVA PRIME SERVICES ApS",
      description:
        "Privatlivspolitik for NOVA PRIME SERVICES ApS – hvordan vi håndterer dine personoplysninger, når du kontakter os eller anmoder om et tilbud.",
    },
    notFound: {
      title: "Siden blev ikke fundet | NOVA PRIME SERVICES ApS",
      description: "Siden, du leder efter, findes ikke længere på dette adresse.",
    },
  },

  nav: {
    home: "Forside",
    services: "Vores ydelser",
    about: "Om os",
    contact: "Kontakt",
    cta: "Få et gratis tilbud",
    skipToContent: "Gå til hovedindhold",
    primaryLabel: "Hovedmenu",
    openMenu: "Åbn menu",
    closeMenu: "Luk menu",
    backToHome: "Tilbage til forsiden",
  },

  languageSwitcher: {
    label: "Vælg sprog",
    current: "Nuværende sprog: Dansk",
    select: "Skift sprog",
    da: "Dansk",
    en: "English",
    daShort: "DA",
    enShort: "EN",
  },

  hero: {
    eyebrow: "NOVA PRIME SERVICES ApS",
    headline: "Professionel rengøring, der giver dig mere tid til det vigtige",
    description:
      "Vi tilbyder grundig, pålidelig og fleksibel rengøring til private og virksomheder. Vi tilpasser vores løsninger til dine behov, så du kan nyde rene og indbydende omgivelser.",
    primaryCta: "Få et gratis tilbud",
    secondaryCta: "Se vores ydelser",
    badgeReliable: "Pålidelig & grundig",
    badgeFlexible: "Fleksible løsninger",
    badgePrivate: "Private & erhverv",
    imageAlt:
      "Billede fra NOVA PRIME SERVICES ApS",
    scrollHint: "Se mere",
  },

  trust: {
    title: "Hvad vores kunder kan forvente",
    items: [
      {
        title: "Grundighed i detaljen",
        description:
          "Vi arbejder systematisk og omhyggeligt, så du får et synligt og tilfredsstillende resultat.",
      },
      {
        title: "Pålidelig aftale",
        description:
          "Tydelige aftaler, god kommunikation og punktlighed er udgangspunktet for vores samarbejde.",
      },
      {
        title: "Fleksibel tilpasning",
        description:
          "Vi tilpasser rengøringen til dine ønsker, dit hjem eller din virksomheds behov.",
      },
      {
        title: "Personlig service",
        description:
          "Vi lytter til dine behov og hjælper dig med at finde den rette løsning til opgaven.",
      },
    ],
  },

  services: {
    heading: "Vores rengøringsydelser",
    intro:
      "Vi tilbyder fleksible rengøringsløsninger til både private hjem og erhverv. Vælg den service, der passer bedst til dine behov.",
    getQuote: "Få et tilbud",
    learnMore: "Læs mere",
    included: "Inkluderet",
    items: {
      "home-cleaning": {
        title: "Privat rengøring",
        description:
          "Vi hjælper med at holde dit hjem rent, friskt og behageligt med rengøring tilpasset dine ønsker.",
        points: [
          "Regelmæssig rengøring af lejligheder og huse.",
          "Støvsugning og gulvvask.",
          "Aftørring af møbler og overflader.",
          "Rengøring af køkken og badeværelse.",
          "Aftørring af døre, paneler og andre overflader efter aftale.",
        ],
      },
      "commercial-cleaning": {
        title: "Erhvervsrengøring",
        description:
          "Et rent arbejdsmiljø skaber bedre rammer for medarbejdere, kunder og besøgende.",
        points: [
          "Rengøring af kontorer og arbejdspladser.",
          "Rengøring af butikker og klinikker.",
          "Rengøring af fællesarealer.",
          "Tømning af skraldespande.",
          "Vedligeholdelse af rene og indbydende lokaler.",
        ],
      },
      "move-out-cleaning": {
        title: "Flytterengøring",
        description:
          "Vi hjælper med at gøre boligen ren og præsentabel ved fraflytning eller inden nye beboere flytter ind.",
        points: [
          "Grundig rengøring ved fraflytning.",
          "Rengøring af køkken og badeværelse.",
          "Rengøring af skabe og skuffer efter aftale.",
          "Rengøring af gulve, døre og overflader.",
          "Klargøring af boligen til nye beboere.",
        ],
      },
      "deep-cleaning": {
        title: "Hovedrengøring",
        description:
          "Når der er brug for ekstra grundighed, tilbyder vi en omfattende rengøring med fokus på detaljerne.",
        points: [
          "Grundig rengøring af hele boligen.",
          "Rengøring af svært tilgængelige områder.",
          "Fjernelse af støv og snavs.",
          "Ekstra grundig rengøring af køkken og badeværelse.",
        ],
      },
    } satisfies Record<ServiceKey, { title: string; description: string; points: string[] }>,
  },

  benefits: {
    heading: "Derfor skal du vælge NOVA PRIME SERVICES",
    intro:
      "Vi ønsker at gøre rengøring enkelt og trygt gennem god kommunikation, fleksible løsninger og fokus på kvalitet.",
    items: [
      {
        title: "Kvalitet",
        description:
          "Vi lægger vægt på detaljerne og arbejder målrettet på at levere et flot og tilfredsstillende resultat.",
      },
      {
        title: "Pålidelighed",
        description:
          "Vi prioriterer tydelige aftaler, god kommunikation og punktlighed.",
      },
      {
        title: "Fleksibilitet",
        description:
          "Vi tilpasser rengøringen til dine ønsker, lokaler og behov.",
      },
      {
        title: "Personlig service",
        description:
          "Vi lytter til dine ønsker og hjælper dig med at finde en løsning, der passer til opgaven.",
      },
    ],
    pricingTitle: "Fair priser og skræddersyede tilbud",
    pricingDescription:
      "Du får et tilbud baseret på opgavens omfang og dine konkrete behov.",
  },

  about: {
    heading: "Om NOVA PRIME SERVICES ApS",
    eyebrow: "Om os",
    paragraphs: [
      "Hos NOVA PRIME SERVICES ApS ønsker vi at skabe rene, friske og behagelige omgivelser for både private og virksomheder. Vi tilbyder rengøringsløsninger med fokus på kvalitet, pålidelighed og god service.",
      "Uanset om du har brug for regelmæssig rengøring, flytterengøring eller en grundig hovedrengøring, tager vi udgangspunkt i dine ønsker og opgavens behov.",
      "Vores mål er at gøre det nemmere for dig at nyde et rent og indbydende hjem eller arbejdsmiljø.",
    ],
    imageAlt:
      "Billede fra NOVA PRIME SERVICES ApS",
    highlightTrust: "Kvalitet, pålidelighed og god service",
  },

  process: {
    heading: "Sådan fungerer det",
    eyebrow: "Processen",
    steps: [
      {
        title: "Fortæl os om dine behov",
        description: "Beskriv dine lokaler og den rengøring, du har brug for.",
      },
      {
        title: "Modtag et tilbud",
        description:
          "Vi gennemgår oplysningerne og følger op, hvis vi har brug for flere oplysninger.",
      },
      {
        title: "Find den rette løsning",
        description:
          "Vi aftaler detaljerne og planlægger rengøringen efter aftale.",
      },
    ],
    stepLabel: "Trin",
  },

  cta: {
    heading: "Skal vi hjælpe med rengøringen?",
    description:
      "Kontakt NOVA PRIME SERVICES ApS for en uforpligtende dialog om dine behov. Vi hjælper dig med at finde den rette løsning til dit hjem eller din virksomhed.",
    primary: "Få et gratis tilbud",
    secondary: "Kontakt os",
  },

  contact: {
    heading: "Kontakt os",
    eyebrow: "Kontakt",
    intro:
      "Har du spørgsmål eller ønsker du et tilbud? Send os en besked, så vender vi tilbage, når vi har modtaget din henvendelse.",
    form: {
      name: "Navn",
      email: "E-mail",
      phone: "Telefonnummer",
      service: "Hvilken service har du brug for?",
      customerType: "Privat eller erhverv",
      postalCode: "Postnummer",
      message: "Besked",
      submit: "Send besked",
      submitting: "Sender…",
      optional: "valgfrit",
      required: "obligatorisk",
      customerTypePrivate: "Privat",
      customerTypeBusiness: "Erhverv",
      serviceOptions: {
        "home-cleaning": "Privat rengøring",
        "commercial-cleaning": "Erhvervsrengøring",
        "move-out-cleaning": "Flytterengøring",
        "deep-cleaning": "Hovedrengøring",
        other: "Andet",
      },
      servicePlaceholder: "Vælg en service",
      validation: {
        nameRequired: "Indtast dit navn.",
        nameMin: "Navn skal være på mindst 2 tegn.",
        emailRequired: "Indtast din e-mailadresse.",
        emailInvalid: "Indtast en gyldig e-mailadresse.",
        serviceRequired: "Vælg den ønskede service.",
        messageRequired: "Skriv en kort besked.",
        messageMin: "Beskeden skal være på mindst 10 tegn.",
      },
      privacyNote:
        "Vi bruger kun dine oplysninger til at besvare din henvendelse. Læs mere i vores privatlivspolitik.",
      successTitle: "Tak for din besked",
      successText:
        "Vi har modtaget din henvendelse og vender tilbage, så snart vi kan. Du hører fra os inden for to hverdage.",
      successButton: "Send en ny besked",
      errorTitle: "Din besked kunne ikke sendes",
      errorText:
        "Der opstod et problem ved afsendelsen. Prøv igen om et øjeblik, eller kontakt os direkte, hvis problemet fortsætter.",
      errorNotConfigured:
        "E-maillevering er endnu ikke konfigureret på serveren. Se README for de nødvendige trin.",
      retryButton: "Prøv igen",
      honeypotLabel: "Udfyld ikke dette felt",
    },
  },

  servicePage: {
    overview: "Overblik",
    included: "Hvad inkluderer servicen?",
    getQuote: "Få et tilbud",
    contactUs: "Kontakt os",
    otherServices: "Vores andre ydelser",
    backToServices: "Tilbage til alle ydelser",
    intro: "Hvad dækker denne service?",
  },

  privacy: {
    heading: "Privatlivspolitik",
    eyebrow: "Privatliv",
    intro:
      "Denne privatlivspolitik beskriver, hvordan NOVA PRIME SERVICES ApS håndterer personoplysninger, når du besøger vores hjemmeside eller kontakter os.",
    reviewNote:
      "Denne tekst er en skabelon, der skal gennemgås og godkendes af virksomheden før offentliggørelse.",
    sections: [
      {
        title: "Ansvarlig for data",
        body: "NOVA PRIME SERVICES ApS er dataansvarlig for de personoplysninger, der behandles via denne hjemmeside. Virksomheden har adresse på Ringparken 22, 1. tv, 7500 Holstebro og har CVR-nummer DK46797485. Kontakt: info@novaprimes.dk, +45 42 22 33 62 eller +45 91 94 09 34.",
      },
      {
        title: "Hvilke oplysninger indsamler vi",
        body: "Når du udfylder kontaktformularen, indsamler vi de oplysninger, du selv opgiver: navn, e-mailadresse, telefonnummer, postnummer, ønsket service, kundetype og din besked. Vi indsamler kun de oplysninger, der er nødvendige for at besvare din henvendelse.",
      },
      {
        title: "Formål med behandlingen",
        body: "Dine oplysninger bruges udelukkende til at besvare din henvendelse og til at udarbejde et tilbud på rengøring. Vi videregiver ikke dine oplysninger til tredjeparter til markedsføringsformål.",
      },
      {
        title: "Retssgrundlag",
        body: "Behandlingen sker på baggrund af din anmodning om et tilbud og de nødvendige skridt til at indgå en aftale (art. 6, stk. 1, litra b i GDPR), samt vores legitime interesse i at besvare henvendelser (art. 6, stk. 1, litra f).",
      },
      {
        title: "Opbevaring af oplysninger",
        body: "Dine oplysninger opbevares, så længe det er nødvendigt for at besvare din henvendelse og opfylde eventuelle aftaler. Efterfølgende slettes oplysningerne i overensstemmelse med gældende lovgivning. Den præcise opbevaringsperiode fastlægges af virksomheden.",
      },
      {
        title: "Dine rettigheder",
        body: "Du har ret til at få indsigt i de oplysninger, vi har om dig, samt ret til at bede om berigtigelse eller sletning. Du kan også gøre indsigelse mod behandlingen og trække et samtykke tilbage. Henvendelser om dine rettigheder sendes til virksomheden via kontaktformularen eller e-mail.",
      },
      {
        title: "Cookies",
        body: "Hjemmesiden bruger kun teknisk nødvendige cookies til at gemme dit sprogvalg. Der indsamles ikke brugerstatistikker eller markedsføringsdata, medmindre du aktivt giver samtykke til det.",
      },
      {
        title: "Sikkerhed",
        body: "Vi beskytter dine oplysninger med tekniske og organisatoriske foranstaltninger, herunder krypteret overførsel over HTTPS. Adgang til personoplysninger er begrænset til de personer, der har brug for dem.",
      },
      {
        title: "Klage over behandling",
        body: "Hvis du mener, at vi ikke behandler dine oplysninger korrekt, kan du indgive klage til Datatilsynet.",
      },
    ],
  },

  footer: {
    tagline:
      "Professionel og pålidelig rengøring til private hjem og virksomheder. Vi skaber rene og indbydende omgivelser.",
    navigationTitle: "Navigation",
    servicesTitle: "Vores ydelser",
    legalTitle: "Juridisk",
    privacyLink: "Privatlivspolitik",
    cookieLink: "Cookieindstillinger",
    cookieButton: "Cookieindstillinger",
    contactTitle: "Kontakt",
    rights: "© {year} NOVA PRIME SERVICES ApS. Alle rettigheder forbeholdes.",
    languageLabel: "Sprog",
  },

  cookieConsent: {
    title: "Cookies og privatliv",
    description:
      "Vi bruger kun teknisk nødvendige cookies til at huske dit sprogvalg. Der anvendes ingen analyse- eller markedsføringscookies.",
    accept: "Det er i orden",
    preferences: "Indstillinger",
    save: "Gem valg",
    necessaryLabel: "Teknisk nødvendige",
    necessaryDescription:
      "Nødvendige cookies gemmer dit valgte sprog og kan ikke slås fra.",
    analyticsLabel: "Statistik",
    analyticsDescription:
      "Analysecookies indsamler anonyme data om brug af hjemmesiden. Anvendes i øjeblikket ikke.",
  },

  notFound: {
    heading: "Siden blev ikke fundet",
    description:
      "Siden, du leder efter, findes ikke længere, eller adressen er ændret. Gå tilbage til forsiden for at finde det, du søger.",
    backHome: "Tilbage til forsiden",
  },

  common: {
    scrollProgressLabel: "Læsefremgang",
    backToTop: "Tilbage til toppen",
    freeQuoteNote: "Gratis og uforpligtende tilbud",
  },
};

export type Dictionary = typeof da;

const en: Dictionary = {
  meta: {
    titleSuffix: "NOVA PRIME SERVICES ApS",
    home: {
      title: "Professional Cleaning in Denmark | NOVA PRIME SERVICES ApS",
      description:
        "Thorough, reliable, and flexible cleaning for homes and businesses. Home cleaning, commercial cleaning, move-out cleaning and deep cleaning — get a free quote.",
    },
    service: {
      title: "{title} | NOVA PRIME SERVICES ApS",
      description: "{description}",
    },
    privacy: {
      title: "Privacy Policy | NOVA PRIME SERVICES ApS",
      description:
        "Privacy policy for NOVA PRIME SERVICES ApS — how we handle your personal information when you contact us or request a quote.",
    },
    notFound: {
      title: "Page Not Found | NOVA PRIME SERVICES ApS",
      description: "The page you are looking for is no longer available at this address.",
    },
  },

  nav: {
    home: "Home",
    services: "Our Services",
    about: "About Us",
    contact: "Contact",
    cta: "Get a Free Quote",
    skipToContent: "Skip to main content",
    primaryLabel: "Main menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToHome: "Back to home",
  },

  languageSwitcher: {
    label: "Select language",
    current: "Current language: English",
    select: "Change language",
    da: "Dansk",
    en: "English",
    daShort: "DA",
    enShort: "EN",
  },

  hero: {
    eyebrow: "NOVA PRIME SERVICES ApS",
    headline:
      "Professional cleaning that gives you more time for what matters",
    description:
      "We provide thorough, reliable, and flexible cleaning services for homes and businesses. Our solutions are tailored to your needs, helping you enjoy clean, fresh, and welcoming surroundings.",
    primaryCta: "Get a Free Quote",
    secondaryCta: "Explore Our Services",
    badgeReliable: "Reliable & thorough",
    badgeFlexible: "Flexible solutions",
    badgePrivate: "Home & business",
    imageAlt: "Image from NOVA PRIME SERVICES ApS",
    scrollHint: "See more",
  },

  trust: {
    title: "What our customers can expect",
    items: [
      {
        title: "Attention to detail",
        description:
          "We work systematically and carefully so you receive a visible, satisfying result.",
      },
      {
        title: "Dependable agreement",
        description:
          "Clear agreements, good communication, and punctuality are the starting point of our service.",
      },
      {
        title: "Flexible adaptation",
        description:
          "We adapt the cleaning to your preferences, your home, or the needs of your business.",
      },
      {
        title: "Personal service",
        description:
          "We listen to your needs and help you find the right solution for the task.",
      },
    ],
  },

  services: {
    heading: "Our Cleaning Services",
    intro:
      "We provide flexible cleaning solutions for homes and businesses. Choose the service that best suits your needs.",
    getQuote: "Get a Quote",
    learnMore: "Learn more",
    included: "Included",
    items: {
      "home-cleaning": {
        title: "Home Cleaning",
        description:
          "We help keep your home clean, fresh, and comfortable with cleaning services tailored to your preferences.",
        points: [
          "Regular cleaning of apartments and houses.",
          "Vacuuming and floor washing.",
          "Dusting furniture and surfaces.",
          "Kitchen and bathroom cleaning.",
          "Cleaning doors, skirting boards, and other surfaces by agreement.",
        ],
      },
      "commercial-cleaning": {
        title: "Commercial Cleaning",
        description:
          "A clean working environment creates a more welcoming space for employees, customers, and visitors.",
        points: [
          "Office and workplace cleaning.",
          "Shop and clinic cleaning.",
          "Common-area cleaning.",
          "Emptying waste bins.",
          "Maintaining clean and welcoming premises.",
        ],
      },
      "move-out-cleaning": {
        title: "Move-Out Cleaning",
        description:
          "We help prepare your property for handover or for its next occupants with a thorough cleaning service.",
        points: [
          "Thorough move-out cleaning.",
          "Kitchen and bathroom cleaning.",
          "Cleaning cupboards and drawers by agreement.",
          "Cleaning floors, doors, and surfaces.",
          "Preparing the property for new occupants.",
        ],
      },
      "deep-cleaning": {
        title: "Deep Cleaning",
        description:
          "When your space needs extra attention, our deep-cleaning service focuses on the details throughout your home.",
        points: [
          "Thorough cleaning throughout the property.",
          "Cleaning hard-to-reach areas.",
          "Removing dust and dirt.",
          "Extra attention to kitchens and bathrooms.",
        ],
      },
    },
  },

  benefits: {
    heading: "Why Choose NOVA PRIME SERVICES",
    intro:
      "We aim to make cleaning straightforward and dependable through clear communication, flexible solutions, and a focus on quality.",
    items: [
      {
        title: "Quality",
        description:
          "We pay attention to the details and work to deliver a thorough, satisfying result.",
      },
      {
        title: "Reliability",
        description:
          "We value clear agreements, good communication, and punctuality.",
      },
      {
        title: "Flexibility",
        description:
          "We tailor our cleaning services to your preferences, premises, and requirements.",
      },
      {
        title: "Personal Service",
        description:
          "We listen to your preferences and help you find a solution that suits the task.",
      },
    ],
    pricingTitle: "Fair Pricing and Tailored Quotes",
    pricingDescription:
      "Your quote will be based on the scope of the work and your specific requirements.",
  },

  about: {
    heading: "About NOVA PRIME SERVICES ApS",
    eyebrow: "About Us",
    paragraphs: [
      "At NOVA PRIME SERVICES ApS, we aim to create clean, fresh, and comfortable environments for homes and businesses. Our cleaning services focus on quality, reliability, and good customer service.",
      "Whether you need regular cleaning, move-out cleaning, or a thorough deep clean, we take your preferences and the requirements of each task into account.",
      "Our goal is to make it easier for you to enjoy a clean and welcoming home or workplace.",
    ],
    imageAlt: "Image from NOVA PRIME SERVICES ApS",
    highlightTrust: "Quality, reliability, and good service",
  },

  process: {
    heading: "How It Works",
    eyebrow: "The Process",
    steps: [
      {
        title: "Tell Us What You Need",
        description:
          "Describe your premises and the cleaning service you require.",
      },
      {
        title: "Receive a Quote",
        description:
          "We review your request and follow up if additional information is needed.",
      },
      {
        title: "Find the Right Solution",
        description:
          "We agree on the details and arrange the cleaning service.",
      },
    ],
    stepLabel: "Step",
  },

  cta: {
    heading: "Ready for a Cleaner Space?",
    description:
      "Contact NOVA PRIME SERVICES ApS to discuss your cleaning needs. We will help you find a suitable solution for your home or business.",
    primary: "Get a Free Quote",
    secondary: "Contact Us",
  },

  contact: {
    heading: "Contact Us",
    eyebrow: "Contact",
    intro:
      "Have a question or need a quote? Send us a message and we will follow up after receiving your request.",
    form: {
      name: "Name",
      email: "Email",
      phone: "Phone Number",
      service: "Which Service Do You Need?",
      customerType: "Private or Business",
      postalCode: "Postal Code",
      message: "Message",
      submit: "Send Message",
      submitting: "Sending…",
      optional: "optional",
      required: "required",
      customerTypePrivate: "Private",
      customerTypeBusiness: "Business",
      serviceOptions: {
        "home-cleaning": "Home Cleaning",
        "commercial-cleaning": "Commercial Cleaning",
        "move-out-cleaning": "Move-Out Cleaning",
        "deep-cleaning": "Deep Cleaning",
        other: "Other",
      },
      servicePlaceholder: "Select a service",
      validation: {
        nameRequired: "Please enter your name.",
        nameMin: "Name must be at least 2 characters.",
        emailRequired: "Please enter your email address.",
        emailInvalid: "Please enter a valid email address.",
        serviceRequired: "Please select the service you need.",
        messageRequired: "Please write a short message.",
        messageMin: "The message must be at least 10 characters.",
      },
      privacyNote:
        "We only use your information to respond to your request. Read more in our privacy policy.",
      successTitle: "Thank You for Your Message",
      successText:
        "We have received your request and will get back to you as soon as we can. You will hear from us within two business days.",
      successButton: "Send Another Message",
      errorTitle: "Your Message Could Not Be Sent",
      errorText:
        "Something went wrong while sending. Please try again in a moment, or contact us directly if the problem persists.",
      errorNotConfigured:
        "Email delivery is not yet configured on the server. See the README for the required steps.",
      retryButton: "Try Again",
      honeypotLabel: "Do not fill in this field",
    },
  },

  servicePage: {
    overview: "Overview",
    included: "What Is Included?",
    getQuote: "Get a Quote",
    contactUs: "Contact Us",
    otherServices: "Our Other Services",
    backToServices: "Back to all services",
    intro: "What does this service cover?",
  },

  privacy: {
    heading: "Privacy Policy",
    eyebrow: "Privacy",
    intro:
      "This privacy policy describes how NOVA PRIME SERVICES ApS handles personal information when you visit our website or contact us.",
    reviewNote:
      "This text is a template that must be reviewed and approved by the company before publication.",
    sections: [
      {
        title: "Data Controller",
        body: "NOVA PRIME SERVICES ApS is the data controller for the personal information processed through this website. The company is registered at Ringparken 22, 1. tv, 7500 Holstebro, Denmark (CVR DK46797485). Contact: info@novaprimes.dk, +45 42 22 33 62 or +45 91 94 09 34.",
      },
      {
        title: "Information We Collect",
        body: "When you complete the contact form, we collect the information you provide yourself: name, email address, phone number, postal code, requested service, customer type, and your message. We only collect the information necessary to respond to your request.",
      },
      {
        title: "Purpose of Processing",
        body: "Your information is used solely to respond to your request and to prepare a quote for cleaning services. We do not pass your information on to third parties for marketing purposes.",
      },
      {
        title: "Legal Basis",
        body: "Processing is based on your request for a quote and the steps necessary to enter into an agreement (Art. 6(1)(b) GDPR), as well as our legitimate interest in responding to enquiries (Art. 6(1)(f)).",
      },
      {
        title: "Retention of Information",
        body: "Your information is kept for as long as is necessary to respond to your request and to fulfil any agreements. The information is subsequently deleted in accordance with applicable legislation. The exact retention period is determined by the company.",
      },
      {
        title: "Your Rights",
        body: "You have the right to access the information we hold about you, and to request correction or deletion. You may also object to processing and withdraw consent. Requests regarding your rights can be sent to the company via the contact form or by email.",
      },
      {
        title: "Cookies",
        body: "The website uses only technically necessary cookies to remember your language choice. No user statistics or marketing data are collected unless you actively consent to it.",
      },
      {
        title: "Security",
        body: "We protect your information with technical and organisational measures, including encrypted transmission over HTTPS. Access to personal information is limited to the people who need it.",
      },
      {
        title: "Complaints",
        body: "If you believe we do not process your information correctly, you may lodge a complaint with the Danish Data Protection Agency (Datatilsynet).",
      },
    ],
  },

  footer: {
    tagline:
      "Professional and reliable cleaning for homes and businesses. We create clean and welcoming surroundings.",
    navigationTitle: "Navigation",
    servicesTitle: "Our Services",
    legalTitle: "Legal",
    privacyLink: "Privacy Policy",
    cookieLink: "Cookie Preferences",
    cookieButton: "Cookie Preferences",
    contactTitle: "Contact",
    rights: "© {year} NOVA PRIME SERVICES ApS. All rights reserved.",
    languageLabel: "Language",
  },

  cookieConsent: {
    title: "Cookies and Privacy",
    description:
      "We only use technically necessary cookies to remember your language choice. No analytics or marketing cookies are used.",
    accept: "That's fine",
    preferences: "Preferences",
    save: "Save Selection",
    necessaryLabel: "Technically necessary",
    necessaryDescription:
      "Necessary cookies store your selected language and cannot be disabled.",
    analyticsLabel: "Statistics",
    analyticsDescription:
      "Analytics cookies collect anonymous data about website usage. Currently not in use.",
  },

  notFound: {
    heading: "Page Not Found",
    description:
      "The page you are looking for is no longer available, or the address has changed. Return to the home page to find what you are looking for.",
    backHome: "Back to home",
  },

  common: {
    scrollProgressLabel: "Reading progress",
    backToTop: "Back to top",
    freeQuoteNote: "Free and non-binding quote",
  },
};

export const dictionaries = { da, en } as const;
