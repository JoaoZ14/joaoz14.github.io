/** Conteúdo do currículo — PT, EN e ES */
const contact = {
  phone: "+55 (24) 98868-5043",
  email: "joaopossidonio.dev@gmail.com",
  github: "https://github.com/JoaoZ14",
  githubLabel: "github.com/JoaoZ14",
  linkedin: "https://www.linkedin.com/in/joao-possidonio/",
  linkedinLabel: "linkedin.com/in/joao-possidonio",
  portfolio: "https://joaopossidonio.com/",
  portfolioLabel: "joaopossidonio.com",
};

const skills = {
  frontend: ["React.js", "React Native", "HTML & CSS", "JavaScript", "Styled-components", "TypeScript"],
  backend: ["Spring Boot", "Java", "SQL (PostgreSQL)"],
  other: ["Firebase", "RESTful APIs", "AWS", "Google Cloud", "Stripe", "OAuth 2.0", "Git", "GitHub"],
};

const resumes = {
  pt: {
    fileName: "Curriculo João Guilherme-PORTUGUES.pdf",
    lang: "pt-BR",
    name: "João Guilherme Canuto Possidonio",
    role: "Desenvolvedor | Estudante de sistemas de informação",
    sections: {
      summary: "Resumo Profissional",
      experience: "Experiência Profissional",
      education: "Formação Acadêmica",
      courses: "Cursos e Treinamentos",
      languages: "Idiomas",
      technicalSkills: "Habilidades Técnicas",
      hardSkills: "Hard Skills",
      frontend: "Frontend",
      backend: "Backend",
      otherTech: "Outras tecnologias",
      softSkills: "Soft Skills",
    },
    summary:
      "Estudante de Sistemas de Informação com experiência prática e sólida em desenvolvimento frontend e backend. Apaixonado por tecnologia e programação, busco oportunidades para aplicar e expandir meu conhecimento em ambientes desafiadores. Proativo, com rápida capacidade de aprendizado e focado na entrega de soluções inovadoras.",
    education: "Bacharelado em Sistemas de Informação — Estácio de Sá — 5º semestre",
    courses: [
      "Desenvolvimento Frontend com React.js e React Native — Criação de aplicações dinâmicas.",
      "APIs com Spring Boot (Java) — Desenvolvimento de serviços RESTful robustos.",
      "Excel Avançado — Análise de dados e automação de processos.",
    ],
    experience: {
      company: "Elevate",
      roles: [
        {
          title: "Desenvolvedor Junior Fullstack",
          period: "Julho 2025 – Presente",
        },
        {
          title: "Estagiário em Desenvolvimento de Software",
          period: "Agosto 2024 – Julho 2025",
        },
      ],
      bullets: [
        "Atuei como Tech Lead, liderando prioridades e decisões técnicas para garantir entregas com qualidade.",
        "Desenvolvimento, manutenção e evolução de aplicações frontend e backend, atuando em todo o ciclo de vida do software.",
        "Liderança técnica de projetos, definindo arquitetura, prioridades e boas práticas de desenvolvimento.",
        "Gestão e acompanhamento de estagiários, orientando no desenvolvimento de software, revisando código e apoiando no crescimento técnico.",
        "Identificação, análise e correção de bugs em colaboração com a equipe, garantindo qualidade e estabilidade das entregas.",
        "Criação e manutenção de documentação técnica, facilitando a continuidade dos projetos e o suporte a usuários finais.",
        "Apoio na tomada de decisões técnicas e organização de demandas junto ao time.",
      ],
    },
    languages: [
      { name: "Português", level: "Nativo" },
      {
        name: "Inglês",
        level: "Intermediário",
        note: "Proficiência profissional em leitura, escrita e comunicação.",
      },
    ],
    softSkills: [
      "Atitude proativa",
      "Comunicação eficaz",
      "Solução de problemas",
      "Trabalho em equipe",
      "Adaptabilidade",
      "Liderança",
    ],
    contactLabels: {
      phone: "Telefone",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      portfolio: "Portfólio",
    },
  },

  en: {
    fileName: "Curriculo João Guilherme-ENGLISH.pdf",
    lang: "en",
    name: "João Guilherme Canuto Possidonio",
    role: "Developer | Information Systems Student",
    sections: {
      summary: "Professional Summary",
      experience: "Professional Experience",
      education: "Academic Background",
      courses: "Courses and Training",
      languages: "Languages",
      technicalSkills: "Technical Skills",
      hardSkills: "Hard Skills",
      frontend: "Frontend",
      backend: "Backend",
      otherTech: "Other technologies",
      softSkills: "Soft Skills",
    },
    summary:
      "Information Systems student with solid practical experience in frontend and backend development. Passionate about technology and programming, I seek opportunities to apply and expand my knowledge in challenging environments. Proactive, with a quick learning capacity and focused on delivering innovative solutions.",
    education: "Bachelor's Degree in Information Systems — Estácio de Sá — 5th semester",
    courses: [
      "Frontend development with React.js and React Native — Creating dynamic applications.",
      "APIs with Spring Boot (Java) — Developing robust RESTful services.",
      "Advanced Excel — Data analysis and process automation.",
    ],
    experience: {
      company: "Elevate",
      roles: [
        {
          title: "Junior Fullstack Developer",
          period: "July 2025 – Present",
        },
        {
          title: "Software Development Intern",
          period: "August 2024 – July 2025",
        },
      ],
      bullets: [
        "Acted as Tech Lead, driving priorities and technical decisions to ensure high-quality deliveries.",
        "Development, maintenance, and evolution of frontend and backend applications, working throughout the entire software lifecycle.",
        "Technical leadership of projects, defining architecture, priorities, and best development practices.",
        "Managing and supervising interns, guiding them in software development, reviewing code, and supporting their technical growth.",
        "Identifying, analyzing, and correcting bugs in collaboration with the team, ensuring the quality and stability of deliverables.",
        "Creation and maintenance of technical documentation, facilitating project continuity and end-user support.",
        "Support in making technical decisions and organizing tasks within the team.",
      ],
    },
    languages: [
      { name: "Portuguese", level: "Native" },
      {
        name: "English",
        level: "Intermediate",
        note: "Professional proficiency in reading, writing, and communication.",
      },
    ],
    softSkills: [
      "Proactive attitude",
      "Effective communication",
      "Problem solving",
      "Teamwork",
      "Adaptability",
      "Leadership",
    ],
    contactLabels: {
      phone: "Phone",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      portfolio: "Portfolio",
    },
  },

  es: {
    fileName: "Curriculo João Guilherme-ESPANHOL.pdf",
    lang: "es",
    name: "João Guilherme Canuto Possidonio",
    role: "Desarrollador | Estudiante de sistemas de información",
    sections: {
      summary: "Resumen Profesional",
      experience: "Experiencia Profesional",
      education: "Formación Académica",
      courses: "Cursos y Capacitaciones",
      languages: "Idiomas",
      technicalSkills: "Habilidades Técnicas",
      hardSkills: "Hard Skills",
      frontend: "Frontend",
      backend: "Backend",
      otherTech: "Otras tecnologías",
      softSkills: "Soft Skills",
    },
    summary:
      "Estudiante de Sistemas de Información con experiencia práctica y sólida en desarrollo frontend y backend. Apasionado por la tecnología y la programación, busco oportunidades para aplicar y expandir mis conocimientos en entornos desafiantes. Proactivo, con rápida capacidad de aprendizaje y enfocado en la entrega de soluciones innovadoras.",
    education: "Licenciatura en Sistemas de Información — Estácio de Sá — 5º semestre",
    courses: [
      "Desarrollo Frontend con React.js y React Native — Creación de aplicaciones dinámicas.",
      "APIs con Spring Boot (Java) — Desarrollo de servicios RESTful robustos.",
      "Excel Avanzado — Análisis de datos y automatización de procesos.",
    ],
    experience: {
      company: "Elevate",
      roles: [
        {
          title: "Desarrollador Fullstack Junior",
          period: "Julio 2025 – Presente",
        },
        {
          title: "Practicante en Desarrollo de Software",
          period: "Agosto 2024 – Julio 2025",
        },
      ],
      bullets: [
        "Actué como Tech Lead, liderando prioridades y decisiones técnicas para garantizar entregas con calidad.",
        "Desarrollo, mantenimiento y evolución de aplicaciones frontend y backend, actuando en todo el ciclo de vida del software.",
        "Liderazgo técnico de proyectos, definiendo arquitectura, prioridades y buenas prácticas de desarrollo.",
        "Gestión y acompañamiento de practicantes, orientando en el desarrollo de software, revisando código y apoyando el crecimiento técnico.",
        "Identificación, análisis y corrección de bugs en colaboración con el equipo, garantizando calidad y estabilidad de las entregas.",
        "Creación y mantenimiento de documentación técnica, facilitando la continuidad de los proyectos y el soporte a usuarios finales.",
        "Apoyo en la toma de decisiones técnicas y organización de demandas junto al equipo.",
      ],
    },
    languages: [
      { name: "Portugués", level: "Nativo" },
      {
        name: "Inglés",
        level: "Intermedio",
        note: "Competencia profesional en lectura, escritura y comunicación.",
      },
    ],
    softSkills: [
      "Actitud proactiva",
      "Comunicación eficaz",
      "Resolución de problemas",
      "Trabajo en equipo",
      "Adaptabilidad",
      "Liderazgo",
    ],
    contactLabels: {
      phone: "Teléfono",
      email: "Email",
      github: "GitHub",
      linkedin: "LinkedIn",
      portfolio: "Portafolio",
    },
  },
};

module.exports = { contact, skills, resumes };
