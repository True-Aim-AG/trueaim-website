export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedIso: string;
  displayDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "architectural-transparency-agentic-claims-operation",
    title:
      "The Problem with Automating Claims in Silos: Architectural Transparency and the Rise of the Agentic Claims Operation",
    excerpt:
      "A claim has never existed within the four walls of a single enterprise. Legacy automation stopped at internal borders, accelerating discrete desks while stranding the wider ecosystem in an administrative standstill.",
    publishedIso: "2026-10-22T00:00:00.000Z",
    displayDate: "October 2026",
    readTime: "8 min read",
    category: "Operating Model",
    tags: ["Claims AI", "Agentic AI", "Auditability", "Price Integrity"],
    featured: true,
  },
  {
    slug: "where-the-language-model-does-not-belong",
    title:
      "Where the Language Model Does Not Belong: Designing Defensible AI in Claims Operations",
    excerpt:
      "Every claim decision is reading, computing and judging. Where a language model belongs, where rules must hold and how the record shows the line.",
    publishedIso: "2026-10-06T00:00:00.000Z",
    displayDate: "October 2026",
    readTime: "7 min read",
    category: "Technical Architecture",
    tags: ["Claims AI", "Decision Trees", "Language Models", "Auditability"],
  },
  {
    slug: "ai-claims-auditability-scorecard",
    title: "The AI Claims Auditability Scorecard",
    excerpt:
      "Twelve questions that show whether an AI claims system can account for every decision it makes, and how True Aim answers each one.",
    publishedIso: "2026-09-10T00:00:00.000Z",
    displayDate: "September 2026",
    readTime: "14 min read",
    category: "Best Practice",
    tags: ["Auditability", "GDPR Article 22", "EU AI Act", "Claims AI"],
  },
  {
    slug: "ai-claims-handling-eu-ai-act-high-risk",
    title:
      "AI Claims Handling Is Not High-Risk Under the EU AI Act. Here Is What Binds It Instead.",
    excerpt:
      "Claims handling is absent from Annex III. GDPR Article 22 binds it anyway. Only 24% of insurers say they could pass a governance review in 90 days.",
    publishedIso: "2026-07-28T00:00:00.000Z",
    displayDate: "July 2026",
    readTime: "12 min read",
    category: "Regulatory & Compliance",
    tags: ["EU AI Act", "GDPR Article 22", "EIOPA", "Claims AI", "Governance"],
  },
  {
    slug: "why-claims-ai-pilots-stall",
    title: "Why Claims AI Pilots Stall Before Production Readiness",
    excerpt:
      "Many claims AI pilots report accuracy in the mid 90s. Yet months later they are still not live in production. The root cause is measurement discipline and production realism.",
    publishedIso: "2026-02-15T00:00:00.000Z",
    displayDate: "February 2026",
    readTime: "10 min read",
    category: "Production Readiness",
    tags: ["Claims AI", "Production Readiness", "Evaluation", "Accuracy"],
  },
  {
    slug: "auditability-evidence-chains",
    title:
      "Auditability in Claims AI: Building Evidence Chains That Auditors Actually Accept",
    excerpt:
      "Everyone says their AI is explainable. Few can prove it to an auditor. Here's the architecture that makes it possible, and the regulatory requirements it satisfies.",
    publishedIso: "2025-02-01T00:00:00.000Z",
    displayDate: "February 2025",
    readTime: "12 min read",
    category: "Compliance & Governance",
    tags: ["Auditability", "FINMA", "EU AI Act", "Claims AI"],
  },
  {
    slug: "build-vs-buy-idp-vendors",
    title: "Build vs Buy: What to Demand from IDP Vendors",
    excerpt:
      "A practical evaluation framework for insurance teams evaluating claims automation solutions. Learn when to build, when to buy, and how to evaluate vendors objectively.",
    publishedIso: "2025-02-01T00:00:00.000Z",
    displayDate: "February 2025",
    readTime: "15 min read",
    category: "Vendor Evaluation",
    tags: ["Vendor Evaluation", "Build vs Buy", "IDP", "Claims AI"],
  },
];

/** The card copy of a post in another language; anything left out falls back to English. */
export type BlogPostCopy = Partial<Pick<BlogPost, "title" | "excerpt" | "displayDate" | "readTime" | "category">>;

export const blogPostCopy: Record<string, Record<string, BlogPostCopy>> = {
  de: {
    "architectural-transparency-agentic-claims-operation": { title: "Das Problem mit der Schadenautomatisierung in Silos: Architektonische Transparenz und der Aufstieg der agentischen Schadenorganisation", excerpt: "Ein Schadenfall existierte nie innerhalb der vier Wände eines einzelnen Unternehmens. Die bisherige Automatisierung endete an internen Grenzen, beschleunigte einzelne Arbeitsplätze und ließ das weitere Ökosystem im administrativen Stillstand zurück.", displayDate: "Oktober 2026", readTime: "8 Min. Lesezeit" },
    "where-the-language-model-does-not-belong": { title: "Wo das Sprachmodell nicht hingehört: Verteidigungsfähige KI für die Schadenbearbeitung gestalten", excerpt: "Jede Schadenentscheidung besteht aus Lesen, Rechnen und Urteilen. Wo ein Sprachmodell hingehört, wo Regeln gelten müssen und wie die Akte die Grenze zeigt.", displayDate: "Oktober 2026", readTime: "7 Min. Lesezeit" },
    "ai-claims-auditability-scorecard": { title: "Die Prüfbarkeits-Scorecard für KI in der Schadenbearbeitung", excerpt: "Zwölf Fragen, die zeigen, ob ein KI-System für Schadenfälle jede seiner Entscheidungen belegen kann, und wie True Aim jede davon beantwortet.", displayDate: "September 2026", readTime: "14 Min. Lesezeit" },
    "ai-claims-handling-eu-ai-act-high-risk": { title: "KI in der Schadenbearbeitung ist nach dem EU AI Act nicht hochriskant. Das bindet sie stattdessen.", excerpt: "Die Schadenbearbeitung fehlt in Anhang III. DSGVO Artikel 22 bindet sie trotzdem. Nur 24 % der Versicherer geben an, in 90 Tagen eine Governance-Prüfung bestehen zu können.", displayDate: "Juli 2026", readTime: "12 Min. Lesezeit" },
    "why-claims-ai-pilots-stall": { title: "Warum KI-Piloten in der Schadenbearbeitung vor der Produktionsreife stecken bleiben", excerpt: "Viele KI-Piloten in der Schadenbearbeitung melden eine Genauigkeit im mittleren 90-Prozent-Bereich. Monate später laufen sie trotzdem noch nicht produktiv. Die Ursache liegt in der Messdisziplin und im Produktionsrealismus.", displayDate: "Februar 2026", readTime: "10 Min. Lesezeit" },
    "auditability-evidence-chains": { title: "Prüfbarkeit von Schaden-KI: Nachweisketten, die Prüfer tatsächlich akzeptieren", excerpt: "Alle sagen, ihre KI sei erklärbar. Wenige können es einem Prüfer beweisen. Hier ist die Architektur, die es möglich macht, und die regulatorischen Anforderungen, die sie erfüllt.", displayDate: "Februar 2025", readTime: "12 Min. Lesezeit" },
    "build-vs-buy-idp-vendors": { title: "Build vs. Buy: Was Sie von IDP-Anbietern verlangen sollten", excerpt: "Ein praxisnahes Bewertungsraster für Versicherungsteams, die Lösungen zur Schadenautomatisierung prüfen. Wann entwickeln, wann kaufen und wie Sie Anbieter objektiv bewerten.", displayDate: "Februar 2025", readTime: "15 Min. Lesezeit" },
  },
  fr: {
    "architectural-transparency-agentic-claims-operation": { title: "Le problème de l’automatisation des sinistres en silos : transparence architecturale et essor de l’organisation sinistres agentique", excerpt: "Un sinistre n’a jamais existé dans les quatre murs d’une seule entreprise. L’automatisation historique s’arrêtait aux frontières internes, accélérant des postes isolés tout en laissant l’écosystème élargi dans l’immobilisme administratif.", displayDate: "Octobre 2026", readTime: "8 min de lecture" },
    "where-the-language-model-does-not-belong": { title: "Là où le modèle de langage n’a pas sa place : concevoir une IA défendable pour la gestion des sinistres", excerpt: "Décider un sinistre, c’est lire, calculer et juger. Où un modèle de langage a sa place, où les règles doivent tenir et comment le dossier montre la frontière.", displayDate: "Octobre 2026", readTime: "7 min de lecture" },
    "ai-claims-auditability-scorecard": { title: "La grille d’évaluation de l’auditabilité de l’IA sinistres", excerpt: "Douze questions qui montrent si un système d’IA sinistres peut rendre compte de chacune de ses décisions, et comment True Aim répond à chacune.", displayDate: "Septembre 2026", readTime: "14 min de lecture" },
    "ai-claims-handling-eu-ai-act-high-risk": { title: "La gestion des sinistres par IA n’est pas à haut risque au sens de l’AI Act européen. Voici ce qui l’encadre.", excerpt: "La gestion des sinistres est absente de l’annexe III. L’article 22 du RGPD l’encadre quand même. Seuls 24 % des assureurs disent pouvoir passer une revue de gouvernance en 90 jours.", displayDate: "Juillet 2026", readTime: "12 min de lecture" },
    "why-claims-ai-pilots-stall": { title: "Pourquoi les pilotes d’IA sinistres s’enlisent avant d’être prêts pour la production", excerpt: "De nombreux pilotes d’IA sinistres annoncent une précision autour de 95 %. Des mois plus tard, ils ne sont toujours pas en production. La cause profonde tient à la discipline de mesure et au réalisme des conditions de production.", displayDate: "Février 2026", readTime: "10 min de lecture" },
    "auditability-evidence-chains": { title: "Auditabilité de l’IA sinistres : construire des chaînes de preuves que les auditeurs acceptent vraiment", excerpt: "Tout le monde dit que son IA est explicable. Peu peuvent le prouver à un auditeur. Voici l’architecture qui le rend possible, et les exigences réglementaires qu’elle satisfait.", displayDate: "Février 2025", readTime: "12 min de lecture" },
    "build-vs-buy-idp-vendors": { title: "Développer ou acheter : ce qu’il faut exiger des fournisseurs d’IDP", excerpt: "Un cadre d’évaluation pratique pour les équipes d’assurance qui évaluent des solutions d’automatisation des sinistres. Quand développer, quand acheter et comment évaluer les fournisseurs objectivement.", displayDate: "Février 2025", readTime: "15 min de lecture" },
  },
  it: {
    "architectural-transparency-agentic-claims-operation": { title: "Il problema dell’automazione dei sinistri a compartimenti stagni: trasparenza architetturale e ascesa della gestione sinistri agentica", excerpt: "Un sinistro non è mai esistito entro le quattro mura di una sola impresa. L’automazione tradizionale si fermava ai confini interni, accelerando singole postazioni e lasciando l’ecosistema più ampio in una paralisi amministrativa.", displayDate: "Ottobre 2026", readTime: "8 min di lettura" },
    "where-the-language-model-does-not-belong": { title: "Dove il modello linguistico non ha posto: progettare un’IA difendibile per la gestione dei sinistri", excerpt: "Decidere un sinistro è leggere, calcolare e giudicare. Dove un modello linguistico ha posto, dove devono valere le regole e come il fascicolo mostra il confine.", displayDate: "Ottobre 2026", readTime: "7 min di lettura" },
    "ai-claims-auditability-scorecard": { title: "La scorecard di verificabilità dell’IA per i sinistri", excerpt: "Dodici domande che mostrano se un sistema di IA per i sinistri può rendere conto di ogni decisione che prende, e come True Aim risponde a ciascuna.", displayDate: "Settembre 2026", readTime: "14 min di lettura" },
    "ai-claims-handling-eu-ai-act-high-risk": { title: "La gestione dei sinistri con IA non è ad alto rischio secondo l’AI Act europeo. Ecco cosa la vincola invece.", excerpt: "La gestione dei sinistri è assente dall’allegato III. L’articolo 22 del GDPR la vincola comunque. Solo il 24% degli assicuratori dice di poter superare una revisione di governance in 90 giorni.", displayDate: "Luglio 2026", readTime: "12 min di lettura" },
    "why-claims-ai-pilots-stall": { title: "Perché i piloti di IA per i sinistri si bloccano prima di essere pronti per la produzione", excerpt: "Molti piloti di IA per i sinistri riportano un’accuratezza intorno al 95%. Mesi dopo, non sono ancora in produzione. La causa di fondo sta nella disciplina di misurazione e nel realismo rispetto alla produzione.", displayDate: "Febbraio 2026", readTime: "10 min di lettura" },
    "auditability-evidence-chains": { title: "Verificabilità dell’IA per i sinistri: costruire catene delle prove che i revisori accettano davvero", excerpt: "Tutti dicono che la loro IA è spiegabile. Pochi sanno dimostrarlo a un revisore. Ecco l’architettura che lo rende possibile, e i requisiti normativi che soddisfa.", displayDate: "Febbraio 2025", readTime: "12 min di lettura" },
    "build-vs-buy-idp-vendors": { title: "Sviluppare o acquistare: cosa esigere dai fornitori di IDP", excerpt: "Un quadro di valutazione pratico per i team assicurativi che valutano soluzioni di automazione dei sinistri. Quando sviluppare, quando acquistare e come valutare i fornitori oggettivamente.", displayDate: "Febbraio 2025", readTime: "15 min di lettura" },
  },
};

/** The posts with their card copy in the given language, English where no translation exists. */
export function localizedBlogPosts(locale: string): BlogPost[] {
  const copy = blogPostCopy[locale] ?? {};
  return blogPosts.map((post) => ({ ...post, ...copy[post.slug] }));
}
