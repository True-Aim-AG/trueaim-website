# True Aim website translation glossary

Version 1.0, approved by Kai on 5 November 2026. Every German, French and Italian string in `messages/` follows this file. Changes to it go through a PR like any other copy change.

Target languages: German as written in Germany, French as written in France, Italian as written in Italy. English is the source. Where the English copy changes, the translations change; the old de, fr and it files are a reference for term choices only, never a source.

Sections 1 to 3 are rules. Sections 4 to 9 are term tables. Section 10 lists the defects in the translation files as they stood on 5 November 2026, which this glossary overrides. Section 11 records the decisions taken.

---

## 1. Standing rules

1. **Variants.** German: ß where German spelling uses it (Maßnahme, gemäß, größer), Selbstbeteiligung not Selbstbehalt, Kostenvoranschlag not Offerte. French: franchise, devis, courriel is not needed, e-mail is fine. Italian: standard Italian, no regional terms.
2. **Address.** German Sie, French vous, Italian voi when speaking to the organisation. Italian button labels use the tu imperative that Italian corporate sites use (Richiedi una demo, Scopri di più). See decision 2.
3. **Not translated.** Product names, True Aim (always two words, never "the platform"), Decision Dossier, Trust Center, Otus, Blog, Changelog, standards and law acronyms, partner and client names. Full list in section 4.
4. **English technical terms.** Kept where the industry keeps them (API, Dashboard in German and Italian, Workflow, LLM, Audit Trail in Italian). The table in section 6 decides term by term. When in doubt use the native word.
5. **Headlines, taglines, CTA labels and section labels may be transcreated**: same meaning, same promise, adapted form. Body copy, FAQ answers, trust and security copy, and metadata descriptions are translated sentence by sentence.
6. **Never strengthen a claim.** Tamper-evident is not tamper-proof. Aligned with is not compliant with or certified. Prepared for the adjuster is not an expert appraisal. Durations stay durations (locks for 30 minutes, not within 30 minutes). Numbers, percentages and quantifiers (every, each, all) carry over unchanged.
7. **Anna's "we don't say" list applies in every language.** No revolutionär, révolutionnaire, rivoluzionario. No bahnbrechend, game-changing, rivoluzionare. No optimieren, optimiser, ottimizzare, streamline, leverage. No hype adjectives the English does not have.
8. **No dashes for rhythm**, in any language (repo rule). German uses a comma or a full stop. French uses a colon. Compound hyphens (Kfz-Versicherung, neuro-symbolique) are fine.
9. **Real characters, never substitutes.** ä ö ü ß é è à ç ì ò ù as Unicode. Never ae, ue, oe, never a bare e for é. The current files mix both; the glossary ends that.
10. **Apostrophes.** Use the typographic apostrophe ’ (U+2019) in prose: l’assureur, d’un sinistre, l’IA. The ASCII apostrophe ' is an escape character in ICU messages and breaks the string before a tag or brace (l'<b>). If an ASCII apostrophe is unavoidable before a tag or brace, double it: l''<b>.
11. **French punctuation spacing.** A no-break space (U+00A0) before : ; ? ! and inside « ». The current fr files have 46 colons with a normal space and 46 with none; the rule makes them uniform.
12. **Quotation marks.** German „…“, French « … », Italian «…». Not straight quotes in prose.
13. **Numbers.** German 4.086,33 and 86 % (space before the percent sign). French 4 086,33 (no-break space) and 86 %. Italian 4.086,33 and 86%. Currency after the amount with a space: 4.086,33 CHF. Dates: 15. Oktober 2026, 15 octobre 2026, 15 ottobre 2026. 24-hour clock everywhere. The English scenes use the Swiss form 4'086.33; see decision 3.
14. **Capitalisation.** German capitalises nouns and nothing else. French and Italian use sentence case everywhere, including navigation (Études de cas, not Études de Cas). English Title Case in nav labels does not carry over. Product names keep their English capitals.
15. **Length.** German runs about 30 percent longer. Navigation labels: at most one word longer than the English. Buttons: at most 22 characters. Where this glossary gives a short form, the short form is for nav and buttons, the long form for body copy.
16. **Country and city names** in the target language: Schweiz / Suisse / Svizzera, Zürich / Zurich / Zurigo, Genf / Genève / Ginevra, Deutschland, Frankreich, Italien and so on.
17. **Metadata.** Titles at most 60 characters before the " | True Aim" suffix, descriptions at most 160. A title may be a shorter form of the H1. The German descriptions that ran to 334 characters are rewritten, not trimmed.
18. **Regulatory terms** come from the official translations of the law in question (section 7), not from a dictionary.
19. **Insurance meaning of "regulation".** In insurance German, Regulierung means settling a claim. The English word regulation (law) is Regulatorik or Aufsichtsrecht, never Regulierung. The blog descriptor "Claims, evidence and regulation" is therefore "Schäden, Nachweise und Regulatorik".
20. **Every judgment call is logged** in the translator's notes file for that namespace, with the English, the rendering chosen, the alternative rejected and one line of reasoning.

---

## 2. Tone in each language

Anna's brand guidelines: confident, transparent, reassuring. Precise claims with proof, no exaggeration. Not a black box, not a generic AI startup, not futuristic, not playful.

- **German.** Sober, concrete, Sie. German B2B insurance readers distrust superlatives more than English readers do. Prefer the verb to the noun chain where the sentence allows it. Industry compounds without the Fugen-s, as the German insurance industry writes them: Schadenfall, Schadenmeldung, Schadenregulierung, Schadenbearbeitung.
- **French.** Formal, precise, vous. Avoid the anglicisms French insurers avoid: traitement des sinistres, not claims management. Keep the English product names, which read as names, not as anglicisms.
- **Italian.** Professional, direct, voi. Italian B2B copy accepts more English (audit trail, dashboard, workflow, compliance) than French does; use it where the Italian insurance press does.

---

## 3. Brand lines, one rendering each

These are the lines Anna's guidelines fix in English. Each has exactly one rendering, used everywhere it appears: the first form in each cell. The form in brackets is the rejected alternative, kept so nobody proposes it again.

| English | German | French | Italian |
|---|---|---|---|
| Auditable by design. | Prüfbar von Grund auf. (Prüfbar by Design.) | Auditable dès la conception. | Verificabile fin dalla progettazione. (Verificabile by design.) |
| Explainable by default. | Erklärbar, immer. (Standardmäßig erklärbar.) | Explicable par défaut. | Spiegabile di default. |
| Defensible from day one. | Belastbar vom ersten Tag an. | Défendable dès le premier jour. | Difendibile dal primo giorno. |
| Same inputs. Same decision. Every time. | Gleiche Eingaben. Gleiche Entscheidung. Jedes Mal. | Mêmes données. Même décision. À chaque fois. | Stessi dati. Stessa decisione. Ogni volta. |
| Not a black box. A glass box you can audit. | Keine Blackbox. Eine Glasbox, die Sie prüfen können. | Pas une boîte noire. Une boîte de verre que vous pouvez auditer. | Non una scatola nera. Una scatola di vetro che potete verificare. |
| AI with nothing to hide. | KI, die nichts zu verbergen hat. | Une IA qui n’a rien à cacher. | Un’IA che non ha nulla da nascondere. |
| Every claim decided in minutes, defensible for years. | Jeder Schaden in Minuten entschieden, über Jahre belastbar. | Chaque sinistre décidé en minutes, défendable pendant des années. | Ogni sinistro deciso in minuti, difendibile per anni. |
| Swiss Precision. Auditable AI. (footer) | Schweizer Präzision. Prüfbare KI. | Précision suisse. IA auditable. | Precisione svizzera. IA verificabile. |

Worked example of headline transcreation. Home H1 "Faster claims, smarter decisions, lower costs". A literal German "Schnellere Schäden" means faster damage, so the noun has to change: "Schnellere Regulierung, bessere Entscheidungen, geringere Kosten". French: "Des sinistres réglés plus vite, des décisions plus sûres, des coûts plus bas". Italian: "Sinistri più rapidi, decisioni più solide, costi più bassi". Every headline gets this treatment and a note.

---

## 4. Names that stay English

| Name | Note |
|---|---|
| True Aim | Two words, in every language. Genitive in German: "von True Aim", never "True Aims". |
| Automated Coverage Check | Product. Descriptive use in a sentence is translated: Deckungsprüfung / vérification de couverture / verifica della copertura. Never the old name Claims Decisioning, which the current de, fr and it files still carry seven times. |
| Invoice Benchmarking | Product. Descriptive: Rechnungsabgleich gegen Referenzpreise / comparaison des factures aux prix de référence / confronto delle fatture con i prezzi di riferimento. |
| Damage Reporting | Product. Descriptive: Schadenberichte / rapports de dommages / rapporti danni. |
| Data Extraction | Product (page merged 4 Nov). Descriptive: Datenextraktion / extraction de données / estrazione dei dati. |
| Otus | Product. "Otus, our AI agent": Otus, unser KI-Agent / Otus, notre agent IA / Otus, il nostro agente IA. |
| Decision Dossier | Feature name. Takes the native article: das Decision Dossier, le Decision Dossier, il Decision Dossier. |
| Trust Center | In all three languages, as the current files already do. The English page says Trust Centre. |
| Blog, Changelog | Unchanged. |
| EU AI Act, GDPR, DORA, FINMA, ISO 27001, SOC 2 Type II, PAIA | See section 7 for the native gloss on first use. |
| Norton Rose Fulbright, ZHAW, Swiss InsurTech Hub, Innosuisse, Yarowa, NSA Services SA, ETH Zurich | Partner and client names. ZHAW's long form is translated: Zürcher Hochschule für Angewandte Wissenschaften / Haute école zurichoise des sciences appliquées / Università di scienze applicate di Zurigo. |

---

## 5. Insurance terms

| English | German | French | Italian | Note |
|---|---|---|---|---|
| claim (the case) | Schaden, Schadenfall; plural Schäden | sinistre | sinistro | Never Anspruch, Forderung, réclamation, reclamo: those mean a legal demand or a complaint. |
| claims (the function) | Schadenbearbeitung; the department: Schadenabteilung | gestion des sinistres; service sinistres | gestione sinistri; ufficio sinistri | |
| claims handling | Schadenbearbeitung | traitement des sinistres | gestione dei sinistri | |
| claims team | Schadenteam, Schadenabteilung | équipe sinistres | team sinistri | |
| adjuster, claims adjuster | Schadensachbearbeiter; short form Sachbearbeiter | gestionnaire sinistres | liquidatore | The site means the in-house person who decides. Not Gutachter, expert or perito, which are external assessors. |
| claimant | Anspruchsteller; when the insured: der Versicherte | demandeur; l’assuré | richiedente; l’assicurato | |
| policyholder, insured | Versicherungsnehmer; Versicherter | assuré; preneur d’assurance | assicurato; contraente | |
| insurer | Versicherer | assureur | assicuratore | Company: Versicherungsunternehmen / compagnie d’assurance / compagnia assicurativa. |
| broker | Versicherungsmakler; short Makler | courtier | broker assicurativo; short broker | |
| third-party administrator (TPA) | Schadendienstleister (TPA) | gestionnaire délégué (TPA) | TPA, gestore sinistri in outsourcing | Acronym TPA after first use in all three. |
| warranty provider | Garantieanbieter | prestataire de garantie | fornitore di garanzie | extended warranty: Garantieverlängerung / extension de garantie / estensione di garanzia |
| claims technology provider | Anbieter von Schadensoftware | éditeur de solutions sinistres | fornitore di tecnologie per i sinistri | |
| property and casualty, P&C | Schaden- und Unfallversicherung; industry short form Komposit | assurance IARD; assurance dommages | rami danni | P&C claims: Sach-, Kfz- und Haftpflichtschäden / sinistres IARD / sinistri rami danni |
| motor | Kfz; Kfz-Schaden | auto; sinistre auto | auto; sinistro auto | |
| property (line) | Sach; Gebäude- und Hausratschaden | habitation; dommages aux biens | property; danni ai beni | Italian industry uses the English "property" for the line. |
| liability | Haftpflicht (the line); Haftung (legal) | responsabilité civile; responsabilité | responsabilità civile; responsabilità | |
| policy | Police, Versicherungspolice; the contract: Vertrag | police (d’assurance); contrat | polizza | |
| policy wording | Versicherungsbedingungen; Policenwortlaut | conditions générales; libellé de la police | condizioni di polizza; testo di polizza | What the adjuster checks against. |
| clause, article | Klausel, Art. | clause, art. | clausola, art. | |
| coverage | Deckung; Versicherungsschutz | couverture; garantie | copertura | |
| covered / not covered | gedeckt / nicht gedeckt | couvert / non couvert | coperto / non coperto | |
| coverage check | Deckungsprüfung | vérification de couverture | verifica della copertura | |
| exclusion | Ausschluss | exclusion | esclusione | |
| deductible | Selbstbeteiligung | franchise | franchigia | Not Selbstbehalt (Swiss, Austrian). The current de files use Selbstbehalt four times. |
| limit, sum insured | Deckungssumme; Versicherungssumme | plafond de garantie; somme assurée | massimale; somma assicurata | |
| first notification of loss (FNOL) | Schadenmeldung (FNOL) | déclaration de sinistre | denuncia di sinistro | |
| settle a claim; settled | einen Schaden regulieren; reguliert | régler un sinistre; réglé | liquidare un sinistro; liquidato | |
| settlement | Schadenregulierung; Regulierung | règlement du sinistre | liquidazione | |
| payout | Auszahlung; Schadenzahlung | indemnisation; montant versé | indennizzo; importo liquidato | |
| reserve; reserve estimate | Schadenreserve; Reserveschätzung | provision pour sinistre; estimation de la provision | riserva sinistri; stima della riserva | |
| leakage | Leakage (vermeidbare Mehrzahlungen) on first use, then Leakage; in plain sentences: Überzahlungen | fuites de règlement (leakage); surpaiements | leakage; sovrapagamenti | |
| overpay | zu viel zahlen; Überzahlung | surpayer; payer trop | pagare troppo; sovrapagare | |
| invoice; repair invoice | Rechnung; Reparaturrechnung | facture; facture de réparation | fattura; fattura di riparazione | |
| line item, line | Rechnungsposition; Position | ligne de facture; poste | voce di fattura; riga | |
| labour | Arbeitskosten | main-d’œuvre | manodopera | |
| parts | Ersatzteile | pièces | ricambi | |
| paint, respray | Lackierung; Komplettlackierung | peinture; remise en peinture complète | verniciatura; verniciatura completa | |
| benchmark (verb) | mit Referenzpreisen abgleichen | comparer aux prix de référence | confrontare con i prezzi di riferimento | |
| benchmark (noun), reference price | Referenzpreis; Vergleichswert | prix de référence | prezzo di riferimento | |
| expected (price) | erwartet; Referenzpreis | attendu; prix de référence | atteso; prezzo di riferimento | |
| damage report | Schadenbericht | rapport de dommages | rapporto danni | Never Gutachten, rapport d’expertise, perizia: those are signed expert appraisals, a stronger claim. The current it files use perizie. |
| repair estimate, estimate (document) | Kostenvoranschlag | devis de réparation | preventivo di riparazione | |
| estimate (the Impact Estimator sense) | Schätzung | estimation | stima | |
| scope of work | Reparaturumfang; Leistungsumfang | étendue des travaux | ambito dei lavori | |
| photographs and documents | Fotos und Dokumente | photos et documents | foto e documenti | |
| water damage | Wasserschaden | dégât des eaux | danno da acqua | |
| reinsurer | Rückversicherer | réassureur | riassicuratore | |
| case study | Fallstudie | étude de cas | caso studio | |
| customer, client | Kunde | client | cliente | |

---

## 6. Decision, evidence and AI terms

| English | German | French | Italian | Note |
|---|---|---|---|---|
| decision; claim decision | Entscheidung; Schadenentscheidung, Deckungsentscheidung | décision; décision sur le sinistre | decisione; decisione sul sinistro | |
| decisioning | Entscheidungsfindung; automatisierte Entscheidung | prise de décision | processo decisionale | Not a product name any more. |
| outcome | Ergebnis | résultat | esito | |
| the adjuster makes the final decision | der Sachbearbeiter trifft die endgültige Entscheidung | le gestionnaire prend la décision finale | il liquidatore prende la decisione finale | Keep the human as subject; never "the AI decides". |
| Approved / Referred / Denied (design-system vocabulary) | Genehmigt / Zur Prüfung / Abgelehnt | Approuvé / À examiner / Refusé | Approvato / Da esaminare / Respinto | Decision 7. |
| In progress / Disabled / Help | In Bearbeitung / Deaktiviert / Hilfe | En cours / Désactivé / Aide | In corso / Disattivato / Aiuto | |
| evidence | Nachweise; Belege | preuves; pièces justificatives | prove; evidenze | |
| evidence chain | Nachweiskette | chaîne de preuves | catena delle prove | |
| audit trail | Prüfpfad | piste d’audit | audit trail (masculine: l’audit trail) | |
| record; claim record | Akte; Schadenakte | dossier; dossier sinistre | fascicolo; fascicolo sinistro | "One record for every party": Eine Akte für alle Beteiligten / Un seul dossier pour toutes les parties / Un unico fascicolo per tutte le parti |
| decision record | Entscheidungsprotokoll | relevé de décision | registro della decisione | |
| explainable; explainability | erklärbar; Erklärbarkeit | explicable; explicabilité | spiegabile; spiegabilità | |
| auditable | prüfbar | auditable | verificabile | |
| traceable; traceability | nachvollziehbar; Nachvollziehbarkeit | traçable; traçabilité | tracciabile; tracciabilità | |
| defensible | belastbar | défendable | difendibile | German "verteidigungsfähig" is literal and odd; belastbar is what a German compliance officer says. |
| deterministic | deterministisch | déterministe | deterministico | |
| reproducible | reproduzierbar | reproductible | riproducibile | |
| consistent | konsistent; einheitlich | cohérent | coerente | |
| rules; rule-based | Regeln; regelbasiert | règles; fondé sur des règles | regole; basato su regole | |
| decision tree | Entscheidungsbaum | arbre de décision | albero decisionale | |
| decision logic | Entscheidungslogik | logique de décision | logica decisionale | |
| neuro-symbolic AI | neurosymbolische KI | IA neuro-symbolique | IA neuro-simbolica | |
| symbolic AI | symbolische KI | IA symbolique | IA simbolica | |
| large language model (LLM) | großes Sprachmodell (LLM); then Sprachmodell or LLM | grand modèle de langage (LLM) | modello linguistico di grandi dimensioni (LLM); then LLM | |
| AI | KI | IA | IA | "AI" only inside names such as EU AI Act. |
| AI agent | KI-Agent | agent IA | agente IA | |
| black box | Blackbox | boîte noire | scatola nera | Only in direct contrast, per Messaging Foundations. |
| glass box | Glasbox | boîte de verre | scatola di vetro | |
| human oversight | menschliche Aufsicht | contrôle humain | sorveglianza umana | Official EU AI Act terms. |
| the person in the loop | der Mensch entscheidet | l’humain reste dans la boucle | la persona resta nel processo | Avoid the literal "Mensch in der Schleife". |
| platform | Plattform | plateforme | piattaforma | |
| product | Produkt | produit | prodotto | |
| workflow | Workflow | flux de travail | workflow | |
| integration | Integration | intégration | integrazione | |
| dashboard | Dashboard | tableau de bord | dashboard | |
| demo | Demo | démo | demo | |
| document | Dokument | document | documento | |
| data extraction (descriptive) | Datenextraktion | extraction de données | estrazione dei dati | |

---

## 7. Regulatory terms and standards

| English | German | French | Italian | Note |
|---|---|---|---|---|
| EU AI Act | EU AI Act (KI-Verordnung) on first use per page, then EU AI Act | AI Act (règlement européen sur l’IA), then AI Act | AI Act (regolamento europeo sull’IA), then AI Act | Decision 8. |
| high-risk AI system | Hochrisiko-KI-System | système d’IA à haut risque | sistema di IA ad alto rischio | Official text. |
| Annex III | Anhang III | annexe III | allegato III | |
| GDPR; Article 22 | DSGVO; Art. 22 | RGPD; article 22 | GDPR; art. 22 | Italy uses GDPR in practice, not RGPD. |
| FADP (Swiss Federal Act on Data Protection) | Schweizer Datenschutzgesetz (DSG) | loi fédérale suisse sur la protection des données (LPD) | legge federale svizzera sulla protezione dei dati (LPD) | Always "Swiss" on first use: the reader is outside Switzerland. |
| DORA | DORA (Verordnung über die digitale operationale Resilienz) | DORA (règlement sur la résilience opérationnelle numérique) | DORA (regolamento sulla resilienza operativa digitale) | |
| FINMA | die FINMA (Eidgenössische Finanzmarktaufsicht) | la FINMA (Autorité fédérale de surveillance des marchés financiers) | la FINMA (Autorità federale di vigilanza sui mercati finanziari) | |
| ISO 27001, SOC 2 Type II | unchanged | unchanged | unchanged | |
| certified | zertifiziert | certifié | certificato | Only where a certificate is held. |
| aligned with | ausgerichtet an | aligné sur | allineato a | Never konform, conforme, conforme for "aligned". |
| compliance; regulatory compliance | Compliance; regulatorische Anforderungen | conformité; conformité réglementaire | conformità; conformità normativa | |
| Security & compliance | Sicherheit & Compliance | Sécurité et conformité | Sicurezza e conformità | |
| personal data | personenbezogene Daten | données personnelles | dati personali | |
| data residency | Datenresidenz; Speicherort der Daten | localisation des données | residenza dei dati | |
| sub-processor | Unterauftragsverarbeiter | sous-traitant ultérieur | sub-responsabile del trattamento | Official GDPR terms. |
| data processing agreement (DPA) | Auftragsverarbeitungsvertrag (AVV) | accord de traitement des données (DPA) | accordo sul trattamento dei dati (DPA) | |
| audit; auditor | Audit, Prüfung; Prüfer | audit; auditeur | audit; revisore | |
| regulator | Aufsichtsbehörde | autorité de contrôle | autorità di vigilanza | Rare on the site by design: the reader is the hero. |
| Privacy Policy | Datenschutzerklärung | Politique de confidentialité | Informativa sulla privacy | |
| Terms of use | Nutzungsbedingungen | Conditions d’utilisation | Termini di utilizzo | |
| Cookie Policy; Cookie settings | Cookie-Richtlinie; Cookie-Einstellungen | Politique relative aux cookies; Paramètres des cookies | Informativa sui cookie; Impostazioni dei cookie | |
| Ethics & Reporting | Ethik & Meldungen | Éthique et signalement | Etica e segnalazioni | |
| AI transparency | KI-Transparenz | Transparence de l’IA | Trasparenza dell’IA | |
| Sub-processors (page) | Unterauftragsverarbeiter | Sous-traitants ultérieurs | Sub-responsabili del trattamento | |
| Security (page) | Sicherheit | Sécurité | Sicurezza | |
| Support | Support | Assistance | Supporto | |
| Legal (footer heading) | Rechtliches | Mentions légales | Note legali | |

---

## 8. Navigation and interface labels, fixed renderings

| English | German | French | Italian |
|---|---|---|---|
| Platform | Plattform | Plateforme | Piattaforma |
| Platform overview | Plattformübersicht | Vue d’ensemble de la plateforme | Panoramica della piattaforma |
| Solutions | Lösungen | Solutions | Soluzioni |
| Insurers | Versicherer | Assureurs | Assicuratori |
| Property and casualty claims (descriptor) | Sach-, Kfz- und Haftpflichtschäden | Sinistres IARD | Sinistri rami danni |
| Brokers | Makler | Courtiers | Broker |
| Third-party administrators | Schadendienstleister (TPA) | Gestionnaires délégués (TPA) | TPA |
| Warranty providers | Garantieanbieter | Prestataires de garantie | Fornitori di garanzie |
| Claims technology providers | Anbieter von Schadensoftware | Éditeurs de solutions sinistres | Fornitori di tecnologie sinistri |
| Decisions inside your platform (descriptor) | Entscheidungen in Ihrer Plattform | Des décisions dans votre plateforme | Decisioni nella vostra piattaforma |
| Technology | Technologie | Technologie | Tecnologia |
| Resources | Ressourcen | Ressources | Risorse |
| Case studies | Fallstudien | Études de cas | Casi studio |
| Results from claims teams (descriptor) | Ergebnisse aus Schadenteams | Résultats d’équipes sinistres | Risultati dei team sinistri |
| Claims, evidence and regulation (descriptor) | Schäden, Nachweise und Regulatorik | Sinistres, preuves et réglementation | Sinistri, prove e regolamentazione |
| Impact Estimator | Potenzialrechner | Estimateur d’impact | Stima dell’impatto |
| Calculate unlocked value (descriptor) | Einsparpotenzial berechnen | Calculez la valeur libérée | Calcolate il valore sbloccato |
| Trust Centre | Trust Center | Trust Center | Trust Center |
| Security, certification and data (descriptor) | Sicherheit, Zertifizierung und Daten | Sécurité, certification et données | Sicurezza, certificazioni e dati |
| Company | Unternehmen | Entreprise | Azienda |
| About | Über uns | À propos | Chi siamo |
| Partners | Partner | Partenaires | Partner |
| Clients, partners and research (descriptor) | Kunden, Partner und Forschung | Clients, partenaires et recherche | Clienti, partner e ricerca |
| Contact | Kontakt | Contact | Contatti |
| Request a demo | Demo anfragen | Demander une démo | Richiedi una demo |
| Book a demo | Demo buchen | Réserver une démo | Prenota una demo |
| How it works | So funktioniert es | Comment ça marche | Come funziona |
| Learn more | Mehr erfahren | En savoir plus | Scopri di più |
| Read the case study | Fallstudie lesen | Lire l’étude de cas | Leggi il caso studio |
| True Aim’s claims specialist (Otus descriptor) | Der Schadenspezialist von True Aim | Le spécialiste sinistres de True Aim | Lo specialista sinistri di True Aim |
| Language | Sprache | Langue | Lingua |
| Toggle menu | Menü öffnen oder schließen | Ouvrir ou fermer le menu | Apri o chiudi il menu |
| Home (breadcrumb) | Startseite | Accueil | Home |
| Breadcrumb (landmark name) | Navigationspfad | Fil d’Ariane | Percorso di navigazione |
| Explore potential value | Potenzial entdecken | Explorez la valeur potentielle | Esplorate il valore potenziale |
| Insights and updates | Einblicke und Neuigkeiten | Analyses et actualités | Approfondimenti e novità |
| Case study not found | Fallstudie nicht gefunden | Étude de cas introuvable | Caso studio non trovato |

---

## 9. Scene and table vocabulary

The product and home pages carry illustrative claim and invoice scenes inside the JSON. Their labels get one rendering each.

| English | German | French | Italian |
|---|---|---|---|
| Covered / Not covered | Gedeckt / Nicht gedeckt | Couvert / Non couvert | Coperto / Non coperto |
| Claimed (column) | Gefordert | Réclamé | Richiesto |
| Qty | Menge | Qté | Q.tà |
| Description | Beschreibung | Désignation | Descrizione |
| Total | Gesamt | Total | Totale |
| Payout | Auszahlung | Indemnisation | Indennizzo |
| Expected | Erwartet | Attendu | Atteso |
| Estimate (repair) | Kostenvoranschlag | Devis | Preventivo |
| Agent / Reviewer / Adjuster (record actors) | Agent / Prüfer / Sachbearbeiter | Agent / Réviseur / Gestionnaire | Agente / Revisore / Liquidatore |
| Verified | Verifiziert | Vérifié | Verificato |
| Decision: Covered | Entscheidung: Gedeckt | Décision : Couvert | Decisione: Coperto |
| Policy: Art. 5.2.1 | Police: Art. 5.2.1 | Police : art. 5.2.1 | Polizza: art. 5.2.1 |
| Evidence: 4 documents linked | Nachweise: 4 Dokumente verknüpft | Preuves : 4 documents liés | Prove: 4 documenti collegati |
| Water damage claim | Wasserschaden | Sinistre dégât des eaux | Sinistro danno da acqua |
| Labour, 6.5 h | Arbeitskosten, 6,5 h | Main-d’œuvre, 6,5 h | Manodopera, 6,5 h |
| Paint, full respray | Komplettlackierung | Remise en peinture complète | Verniciatura completa |
| Flooring, laminate, 14 m² | Bodenbelag, Laminat, 14 m² | Revêtement de sol, stratifié, 14 m² | Pavimento, laminato, 14 m² |
| Claim #2024-TR-4521 | Schaden Nr. 2024-TR-4521 | Sinistre n° 2024-TR-4521 | Sinistro n. 2024-TR-4521 |

---

## 10. Defects in the current de, fr and it files that this glossary overrides

Found while building the glossary. None of the old files is used as a source; these are listed so nobody copies them forward.

1. Selbstbehalt (Swiss) four times in German; the glossary says Selbstbeteiligung.
2. "Request a demo" rendered as "Aehnliche Ergebnisse erzielen", "Obtenir des resultats similaires", "Ottenere risultati simili" (achieve similar results): the English was rewritten and the key kept.
3. "Automated Coverage Check" rendered as "Claims Decisioning" seven times in each language: the retired product name.
4. "Decision logic and mathematics" rendered as "ZHAW researcher" in all three: stale key reuse.
5. "Results from claims teams" rendered as "Erfolgsgeschichten unserer Kunden" and equivalents: old copy.
6. Accents stripped to ASCII in some strings ("Aehnliche", "ueber", "Reserver une demo") and real in others.
7. Italian address mixed: "Prenota una demo" (tu) and "Prenotate una demo" (voi) both present.
8. French spacing before the colon inconsistent: 46 with a space, 46 without, none with a no-break space.
9. "Completed damage reports" rendered as "Perizie" in Italian: an expert appraisal, a stronger claim than the English.
10. "Auditable by Design." rendered as "Prüfbar durch Design.": literal and unidiomatic.
11. Three German titles with en dashes ("Unternehmen – Über True Aim"), against the no-dash rule.
12. German contact H1 "Lassen Sie uns sprechen Schadenautomatisierung": broken sentence (recorded in STATUS chunk 3).
13. Only technology.json has a complete, current translation set. metadata.json has 2 of 336 keys in each language; platform.json, products.json and solutions.json have none.

---

## 11. Decisions taken

Kai approved the recommended option on every point on 5 November 2026.

1. **Brand lines** (section 3): the first rendering in each cell.
2. **Italian address**: voi in body copy, tu imperatives on buttons.
3. **Scene numbers**: localised. 4'086.33 becomes 4.086,33 in German and Italian and 4 086,33 in French.
4. **Impact Estimator**: Potenzialrechner / Estimateur d’impact / Stima dell’impatto.
5. **Blog descriptor**: Regulatorik for "regulation" in German.
6. **P&C**: Sach-, Kfz- und Haftpflichtschäden in the navigation.
7. **Decision chips**: Genehmigt / Zur Prüfung / Abgelehnt and the French and Italian equivalents in section 6.
8. **EU AI Act**: the English name with a native gloss on first use per page.
9. **Legal pages**: footer labels translate now; the legal page bodies stay English until Fred has decided.
10. **Postal address**: the footer address keeps "6300 Zug" as the postal form in every language; only the country name is translated.
