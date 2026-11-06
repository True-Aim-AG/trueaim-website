import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MotionDiv } from "@/components/ui/MotionDiv";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle,
  FileText,
  Shield,
  Users,
  AlertTriangle,
  Database,
  RefreshCw,
} from "lucide-react";
import { TextureBackdrop } from "@/components/content";
import { ButtonLink } from "@/components/brand/Button";
import { StatusPill } from "@/components/brand/StatusPill";

const ease = [0.4, 0, 0.2, 1] as const;

const fadeIn = {
  initial: { opacity: 0, y: 20 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true } as const,
  transition: { duration: 0.6, ease } as const,
};

// Short labels for the "Sur cette page" panel; the H2s carry the full headings.
const sections: { id: string; heading: string }[] = [
  { id: "what-regulators-actually-want", heading: "Ce que veulent vraiment les autorités de contrôle" },
  { id: "the-evidence-chain-architecture", heading: "L’architecture de la chaîne de preuves" },
  { id: "quality-gates-the-audit-checkpoint", heading: "Points de contrôle qualité : le point de contrôle d’audit" },
  { id: "failure-modes-that-break-audit-trails", heading: "Les modes de défaillance qui brisent les pistes d’audit" },
  { id: "regulatory-mapping-quick-reference", heading: "Correspondance réglementaire en bref" },
  { id: "core-principles-for-auditable-ai", heading: "Principes fondamentaux d’une IA auditable" },
  { id: "next-steps", heading: "Prochaines étapes" },
  { id: "key-takeaways", heading: "Points clés" },
];

export default async function AuditabilityBlogPost({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden lg:flex lg:min-h-[560px] lg:items-center border-b border-hairline bg-page-tint">
        <TextureBackdrop texture={{ name: "circ", position: "50% 50%" }} />

        <div className="relative w-full max-w-5xl mx-auto px-6 pt-20 md:pt-28 pb-16">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Breadcrumb */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
              Tous les articles
            </Link>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-strong mb-6 leading-tight">
              Auditabilité de l’IA sinistres : construire des chaînes de preuves que les auditeurs acceptent vraiment
            </h1>

            {/* Subtitle */}
            <p className="text-lede text-body mb-8">
              Tout le monde dit que son IA est explicable. Peu peuvent le prouver à un auditeur. Voici l’architecture qui le rend possible.
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                12 min de lecture
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" strokeWidth={1.5} />
                Analyse technique approfondie
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-12">
            {/* Main Content */}
            <article className="min-w-0 max-w-3xl space-y-12">
              {/* Introduction */}
              <MotionDiv {...fadeIn}>
                <div className="border-l-2 border-ta-blue pl-6 mb-8">
                  <p className="text-body-lg text-strong">
                    Quand les autorités de contrôle demandent « pourquoi votre système a-t-il approuvé ce sinistre ? », ils ne veulent pas entendre parler de poids d’attention ou de valeurs SHAP. Ils veulent cliquer sur un champ et voir exactement d’où il vient. Ils veulent réexécuter une décision d’il y a six mois et obtenir la même réponse. Ils veulent savoir quand un humain est intervenu et pourquoi.
                  </p>
                </div>

                <p className="text-body leading-[1.6] mb-5">
                  Cela reflète notre propre expérience de déploiement. Dans notre travail avec NSA Services SA, chaque décision enregistre le document source, la page et la clause de police sur lesquels elle repose. Les sections ci-dessous décrivent l’architecture qui le permet et les exigences réglementaires qu’elle satisfait.
                </p>
              </MotionDiv>

              {/* What Regulators Actually Want */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="what-regulators-actually-want"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Ce que veulent vraiment les autorités de contrôle
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Traduisons le langage réglementaire en spécifications techniques.
                </p>

                {/* FINMA */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    Communication FINMA 08/2024 (Suisse)
                  </h3>
                  <p className="text-body leading-[1.6] mb-4">
                    La Suisse n’a pas de loi spécifique à l’IA. La FINMA applique plutôt des exigences de gouvernance technologiquement neutres aux systèmes d’IA, en cadrant les risques de l’IA comme des{" "}
                    <span className="font-semibold text-strong">
                      risques opérationnels
                    </span>
                    :
                  </p>
                  <ul className="space-y-2 text-sm text-body">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Risques de modèle :
                        </strong>{" "}
                        robustesse, exactitude, biais, explicabilité
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Risques IT/cyber :
                        </strong>{" "}
                        sécurité, disponibilité, intégrité
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>
                        <strong className="text-strong">
                          Risques de dépendance à des tiers :
                        </strong>{" "}
                        verrouillage fournisseur, concentration
                      </span>
                    </li>
                  </ul>
                  <p className="text-sm text-muted mt-4 italic">
                    La FINMA note explicitement que les « résultats de l’IA ne peuvent souvent pas être compris, expliqués ou reproduits ». C’est le problème que vous devez résoudre.
                  </p>
                </div>

                {/* EU AI Act */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <h3 className="font-display font-semibold text-strong mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    AI Act européen
                  </h3>
                  <p className="text-body leading-[1.6]">
                    L’AI Act européen (le règlement sur l’IA) classe l’évaluation des risques et la tarification en assurance vie et santé comme{" "}
                    <span className="font-semibold text-strong">
                      à haut risque
                    </span>
                    . L’automatisation des sinistres n’est pas explicitement listée comme à haut risque, mais des obligations de transparence s’appliquent. L’EIOPA insiste sur une gouvernance et une gestion des risques alignées sur la réglementation existante de l’assurance.
                  </p>
                </div>

                {/* What This Means */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Ce que cela signifie en pratique
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Chaque décision doit avoir une chaîne de preuves traçable",
                      "Les interventions humaines doivent être consignées avec leur justification",
                      "Vous devez pouvoir reproduire une décision d’il y a 6 mois",
                      '« Le modèle l’a dit » n’est pas une explication acceptable',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Point clé : les autorités de contrôle ne s’intéressent pas à l’architecture de votre modèle. Ils s’intéressent à votre chaîne de preuves.
                  </p>
                </div>
              </MotionDiv>

              {/* The Evidence Chain Architecture */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="the-evidence-chain-architecture"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  L’architecture de la chaîne de preuves
                </h2>

                <p className="text-body leading-[1.6] mb-8">
                  Nous utilisons trois couches de traçabilité. Chaque couche répond à une question d’audit différente.
                </p>

                {/* Layer 1 */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <FileText className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Couche 1 : provenance du champ à la source
                      </h3>
                      <p className="text-sm text-muted">
                        « D’où vient ce chiffre ? »
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Chaque champ extrait doit être lié à : document source, numéro de page, emplacement (coordonnées) et confiance d’extraction.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Field: [extracted_field_name]
Value: [extracted_value]
Source: [document.pdf], Page X
Location: [bounding box coordinates]
Confidence: [high/medium/low]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Quand un auditeur demande « d’où vient cette valeur ? », vous cliquez et lui montrez l’emplacement exact dans le document source. Pas de supposition, pas de recherche.
                  </p>
                </div>

                {/* Layer 2 */}
                <div className="bg-card shadow-card rounded-pill p-8 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <Database className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Couche 2 : piste d’audit des décisions
                      </h3>
                      <p className="text-sm text-muted">
                        « Pourquoi ce sinistre a-t-il été approuvé ? »
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Chaque décision doit enregistrer : hash des entrées, version du modèle, score de confiance, horodatage et niveau de décision.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Decision: [APPROVED/DENIED/REVIEW]
Input hash: [reproducibility hash]
Model version: [version identifier]
Confidence: [score]
Decision method: [deterministic/AI/hybrid]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Notre système utilise une cascade de décision à plusieurs niveaux, qui commence par des règles déterministes et ne recourt à l’IA qu’en cas de besoin. Chaque niveau est journalisé, de sorte que vous savez exactement quelle méthode a pris la décision.
                  </p>
                </div>

                {/* Layer 3 */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-pill bg-lilac grid place-items-center text-accent">
                      <Users className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-strong">
                        Couche 3 : capture des interventions humaines
                      </h3>
                      <p className="text-sm text-muted">
                        « Pourquoi un humain a-t-il changé cette décision ? »
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Chaque intervention humaine doit consigner : décision initiale de l’IA, décision humaine, motif de l’intervention (champ obligatoire), identité du réviseur et horodatage.
                  </p>
                  <div className="bg-surface-muted rounded-pill p-4 text-xs text-body overflow-x-auto">
                    <pre>{`Original decision: [AI decision with confidence]
Override decision: [human decision]
Reason: [required justification text]
Reviewer: [authenticated user ID]
Timestamp: [ISO timestamp]`}</pre>
                  </div>
                  <p className="text-xs text-muted mt-3">
                    Cela crée une boucle de rétroaction : les schémas d’intervention révèlent les lacunes du système. Si les gestionnaires annulent régulièrement des refus pour la même raison, c’est un signal pour améliorer le système.
                  </p>
                </div>
              </MotionDiv>

              {/* Quality Gates */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="quality-gates-the-audit-checkpoint"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Points de contrôle qualité : le point de contrôle d’audit
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Nous utilisons un point de contrôle qualité à trois états qui détermine quand l’automatisation se poursuit et quand des humains doivent intervenir.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      state: "PASS",
                      tone: "approved" as const,
                      desc: "Tous les champs requis présents, confiance au-dessus du seuil.",
                      action:
                        "Poursuivre automatiquement. Journaliser la décision avec la chaîne de preuves complète. Aucune revue humaine requise.",
                    },
                    {
                      state: "WARN",
                      tone: "referred" as const,
                      desc: "Confiance sous le seuil OU champ non critique manquant.",
                      action:
                        "Poursuivre avec un marqueur. Orienter vers la file d’échantillonnage. Un humain peut examiner ou passer.",
                    },
                    {
                      state: "FAIL",
                      tone: "denied" as const,
                      desc: "Champ critique manquant OU confiance très faible OU violation de règle.",
                      action:
                        "Bloquer l’automatisation. Orienter vers un gestionnaire. Exiger une décision humaine explicite.",
                    },
                  ].map((gate) => (
                    <div
                      key={gate.state}
                      className="bg-card shadow-card rounded-pill p-8"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <StatusPill tone={gate.tone} emphasis="light" size="sm">
                          {gate.state}
                        </StatusPill>
                        <span className="text-sm text-body">
                          {gate.desc}
                        </span>
                      </div>
                      <p className="text-xs text-muted">
                        {gate.action}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Confidence Asymmetry */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Asymétrie de confiance
                  </h3>
                  <p className="text-sm text-body leading-[1.6] mb-4">
                    Nous utilisons des seuils asymétriques :
                  </p>
                  <ul className="space-y-2 text-sm text-body mb-4">
                    <li>
                      <strong className="text-approved-dark">
                        Pour les approbations :
                      </strong>{" "}
                      seuil de confiance plus élevé requis
                    </li>
                    <li>
                      <strong className="text-referred-dark">
                        Pour les refus :
                      </strong>{" "}
                      seuil de confiance plus bas acceptable
                    </li>
                    <li>
                      <strong className="text-muted">
                        Sous les seuils :
                      </strong>{" "}
                      orientation vers une revue humaine
                    </li>
                  </ul>
                  <p className="text-sm text-body">
                    Pourquoi asymétrique ? Les fausses approbations coûtent plus cher : perte financière plus risque réglementaire. Les faux refus peuvent faire l’objet d’un recours du client. Ce n’est pas un biais, c’est de la gestion des risques.
                  </p>
                  <div className="mt-4 p-3 bg-lilac rounded-pill">
                    <p className="text-sm font-medium text-accent">
                      Résultat : nous avons ramené notre taux de REFER_TO_HUMAN de 60 % à moins de 5 %.
                    </p>
                  </div>
                </div>
              </MotionDiv>

              {/* Failure Modes */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="failure-modes-that-break-audit-trails"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Les modes de défaillance qui brisent les pistes d’audit
                </h2>

                <p className="text-body leading-[1.6] mb-5">
                  Les défaillances suivantes, identifiées lors de nos propres tests, sont celles que les autorités de contrôle sont les plus susceptibles de détecter :
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      title: "Erreurs d’extraction sans provenance",
                      symptom:
                        "Une valeur a été mal extraite, mais rien ne renvoie à la source",
                      impact:
                        "Sans provenance, vous ne pouvez pas expliquer l’erreur",
                      fix: "Chaque valeur extraite est liée à son emplacement source",
                    },
                    {
                      title: "Décisions fondées sur des données indisponibles",
                      symptom:
                        "Le système a pris une décision, mais une information clé ne figurait pas dans le jeu de documents",
                      impact:
                        "Le système avait raison au vu des données disponibles, mais l’auditeur ne le sait pas",
                      fix: "Documenter quelles informations étaient disponibles au moment de la décision",
                    },
                    {
                      title: "Logique d’approbation par défaut",
                      symptom: "Précision globale élevée, mais fausse pour de mauvaises raisons",
                      impact:
                        'Impossible d’expliquer l’approbation, juste « aucune défaillance trouvée »',
                      fix: "Exiger une confirmation explicite de couverture, pas l’absence de rejet",
                    },
                  ].map((fm, idx) => (
                    <div key={idx} className="bg-card shadow-card rounded-pill p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <AlertTriangle className="w-5 h-5 text-referred-dark" strokeWidth={1.5} />
                        <span className="font-display font-semibold text-strong">
                          {fm.title}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted block mb-1">
                            Symptôme
                          </span>
                          <span className="text-body">
                            {fm.symptom}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Impact en audit
                          </span>
                          <span className="text-body">
                            {fm.impact}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted block mb-1">
                            Correctif
                          </span>
                          <span className="text-approved-dark">{fm.fix}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* What Doesn't Work */}
                <div className="bg-card shadow-card rounded-pill p-8">
                  <h3 className="font-display font-semibold text-strong mb-4">
                    Ce qui ne fonctionne pas pour l’explicabilité
                  </h3>
                  <ul className="space-y-3 text-sm text-body">
                    <li>
                      <strong className="text-denied-dark">Valeurs SHAP/LIME :</strong>{" "}
                      Techniquement intéressantes, sans signification pour les gestionnaires. « La variable X a contribué pour 0,3 à la décision » n’est pas une explication.
                    </li>
                    <li>
                      <strong className="text-denied-dark">Poids d’attention :</strong>{" "}
                      « Le modèle s’est concentré sur ces mots » n’explique pas POURQUOI la décision a été prise.
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Scores de confiance seuls :
                      </strong>{" "}
                      « Confiance de 87 % » n’est pas une explication. Il vous faut : « confiance de 87 % PARCE QUE [preuve] ».
                    </li>
                    <li>
                      <strong className="text-denied-dark">
                        Justifications a posteriori :
                      </strong>{" "}
                      Générer des explications après la décision risque de créer un décalage entre l’explication et la logique réelle. Les auditeurs le testeront.
                    </li>
                  </ul>
                </div>

                <div className="mt-6 bg-lilac rounded-pill px-8 py-6">
                  <p className="text-sm font-medium text-accent">
                    Point clé : l’explicabilité, c’est montrer son travail, pas décrire ce que l’on ressent à propos de la réponse.
                  </p>
                </div>
              </MotionDiv>

              {/* Regulatory Mapping */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="regulatory-mapping-quick-reference"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Correspondance réglementaire en bref
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-hairline">
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          Exigence
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          FINMA 08/2024
                        </th>
                        <th className="text-left py-3 pr-4 font-display text-strong font-medium">
                          AI Act européen
                        </th>
                        <th className="text-left py-3 font-display text-strong font-medium">
                          Comment y répondre
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-body">
                      {[
                        [
                          "Documentation",
                          "Applications significatives",
                          "Obligations de transparence",
                          "Fiches de modèle, journaux de décision, contrôle de version",
                        ],
                        [
                          "Traçabilité",
                          "Les résultats doivent être explicables",
                          "Tenue de registres pour fort impact",
                          "Provenance du champ à la source",
                        ],
                        [
                          "Reproductibilité",
                          '« Souvent impossible à reproduire » (le problème)',
                          "Implicite",
                          "Hachage des entrées, versionnage des modèles",
                        ],
                        [
                          "Contrôle humain",
                          "Requis pour les décisions significatives",
                          "Requis pour le haut risque",
                          "Points de contrôle qualité, capture des interventions",
                        ],
                        [
                          "Mécanismes de repli",
                          "Explicitement requis",
                          "Attendu",
                          "Cascade de niveaux, file humaine",
                        ],
                        [
                          "Classification des risques",
                          "Inventaire centralisé attendu",
                          "Haut risque pour la tarification vie/santé",
                          "Registre des cas d’usage avec étiquettes de risque",
                        ],
                      ].map((row, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-hairline"
                        >
                          <td className="py-3 pr-4 font-display text-strong font-medium">
                            {row[0]}
                          </td>
                          <td className="py-3 pr-4">{row[1]}</td>
                          <td className="py-3 pr-4">{row[2]}</td>
                          <td className="py-3">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MotionDiv>

              {/* Core Principles */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="core-principles-for-auditable-ai"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Principes fondamentaux d’une IA auditable
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <p className="text-sm text-body leading-[1.6] mb-6">
                    Construire des systèmes d’IA prêts pour l’audit exige de s’engager sur quatre principes fondamentaux. La mise en œuvre varie selon l’organisation, mais ces principes restent constants.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Provenance complète
                        </h3>
                        <p className="text-sm text-body">
                          Chaque valeur extraite doit être traçable jusqu’à son document source et son emplacement.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Database className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Reproductibilité des décisions
                        </h3>
                        <p className="text-sm text-body">
                          Avec les mêmes entrées et la même version du modèle, vous devez pouvoir reproduire toute décision historique.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Responsabilité humaine
                        </h3>
                        <p className="text-sm text-body">
                          Chaque intervention humaine doit être capturée avec une justification obligatoire et l’identité du réviseur.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <RefreshCw className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        <h3 className="font-display font-semibold text-strong mb-1">
                          Validation continue
                        </h3>
                        <p className="text-sm text-body">
                          Tester régulièrement des décisions historiques pour vérifier que votre piste d’audit reste intacte.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Next Steps */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="next-steps"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Prochaines étapes
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      num: "1",
                      title: "Auditez votre chaîne de preuves actuelle",
                      desc: "Pouvez-vous retracer n’importe quel champ jusqu’à sa source ?",
                    },
                    {
                      num: "2",
                      title: "Testez la reproductibilité",
                      desc: "Réexécutez une décision vieille de 3 mois. Même sortie ?",
                    },
                    {
                      num: "3",
                      title: "Documentez vos critères de point de contrôle qualité",
                      desc: "Qu’est-ce qui déclenche une revue humaine ?",
                    },
                    {
                      num: "4",
                      title: "Faites correspondre votre architecture à la FINMA et à l’AI Act",
                      desc: "Utilisez le tableau ci-dessus comme point de départ.",
                    },
                  ].map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-accent-soft grid place-items-center flex-shrink-0">
                        <span className="text-sm font-display font-semibold text-accent">
                          {step.num}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-strong">
                          {step.title}
                        </h3>
                        <p className="text-sm text-body">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-l-2 border-ta-blue pl-6">
                  <p className="text-body-lg text-strong">
                    L’objectif n’est pas une IA parfaite. C’est une IA défendable : des systèmes où chaque décision peut être expliquée, chaque champ retracé et chaque intervention humaine documentée. C’est ce que veulent les autorités de contrôle. C’est ce que les auditeurs acceptent.
                  </p>
                </div>

                <p className="mt-6 text-sm text-subtle italic">
                  D’après l’expérience de déploiement de True Aim dans les sinistres de garantie automobile et l’analyse réglementaire de la communication FINMA 08/2024, de l’AI Act européen et des cadres de gouvernance de l’EIOPA.
                </p>
              </MotionDiv>

              {/* Key takeaways */}
              <MotionDiv {...fadeIn}>
                <h2
                  id="key-takeaways"
                  className="font-display text-[28px] md:text-[32px] font-bold text-strong mt-14 mb-4 scroll-mt-24"
                >
                  Points clés
                </h2>

                <div className="bg-card shadow-card rounded-pill p-8">
                  <ul className="space-y-4">
                    {[
                      "Architecture de chaîne de preuves à trois couches",
                      "Suivi de la provenance du champ à la source",
                      "Piste d’audit des décisions avec hachage des entrées",
                      "Capture des interventions humaines avec justification obligatoire",
                      "Des points de contrôle qualité qui satisfont les auditeurs",
                      "Correspondance de conformité FINMA et AI Act",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle aria-hidden="true" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <span className="text-sm text-body leading-[1.6]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MotionDiv>
            </article>

            {/* Sidebar */}
            <aside aria-label="Navigation dans l’article">
              <MotionDiv
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="bg-card shadow-card rounded-pill p-8"
              >
                <h2 className="font-display font-semibold text-strong mb-4">
                  Sur cette page
                </h2>
                <nav aria-label="Sur cette page">
                  <ol role="list" className="space-y-2.5 list-none p-0">
                    {sections.map((section) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="block text-sm leading-snug text-body hover:text-accent transition-colors"
                        >
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="mt-8 pt-6 border-t border-hairline">
                  <ButtonLink href="/trust" variant="primary" size="sm" className="w-full">
                    Voir le Trust Center
                    <ArrowRight aria-hidden="true" className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
                  </ButtonLink>
                </div>
              </MotionDiv>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section data-theme="dark" className="py-20 px-6 bg-page-tint">
        <div className="max-w-4xl mx-auto text-center">
          <MotionDiv {...fadeIn}>
            <Shield className="w-12 h-12 text-muted mx-auto mb-6" strokeWidth={1.5} />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-strong mb-6">
              Vous construisez une IA auditable ?
            </h2>
            <p className="text-lg text-body mb-10">
              Nous pouvons vous aider à concevoir des architectures de chaîne de preuves qui satisfont autorités de contrôle et auditeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ButtonLink href="/contact" variant="primary" size="lg">
                Nous contacter
              </ButtonLink>
              <ButtonLink href="/case-studies/vehicle-warranty-claims" variant="on-dark" size="lg">
                Découvrir en action
              </ButtonLink>
            </div>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
}
