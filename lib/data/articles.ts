import {
  homepageArticles,
  type HomepageArticle,
} from "@/lib/data/homepage";

export type ArticleDetails = {
  analysisSummary: readonly string[];
  body: readonly string[];
  byline: string;
  disclaimer: string;
  framingNotes: string;
  heroCaption: string;
  loadedTerms: readonly string[];
  publishedDate: string;
  sourceBreakdown: readonly SourceBreakdownEntry[];
};

export type NewsArticle = HomepageArticle & ArticleDetails;

export type SourceBiasLabel = "Center" | "Left" | "Right";

export type SourceBreakdownEntry = {
  id: string;
  label: SourceBiasLabel;
  name: string;
};

type ArticleDetailFixture = Omit<
  ArticleDetails,
  "disclaimer" | "sourceBreakdown"
>;

const DEMO_DISCLAIMER =
  "This demonstration analysis may miss context or nuance. Political bias is AI-estimated from the article text and should not be treated as an objective rating.";

const civicPolicySources = [
  { id: "civic-wire", name: "Civic Wire", label: "Left" },
  { id: "public-square-daily", name: "Public Square Daily", label: "Left" },
  { id: "north-coast-ledger", name: "North Coast Ledger", label: "Center" },
  { id: "meridian-review", name: "Meridian Review", label: "Center" },
  { id: "common-ground-journal", name: "Common Ground Journal", label: "Center" },
  { id: "atlas-bulletin", name: "Atlas Bulletin", label: "Center" },
  { id: "provincial-dispatch", name: "Provincial Dispatch", label: "Right" },
  { id: "harbor-record", name: "Harbor Record", label: "Right" },
] as const satisfies readonly SourceBreakdownEntry[];

const researchSources = [
  { id: "open-lab-review", name: "Open Lab Review", label: "Left" },
  { id: "field-note-journal", name: "Field Note Journal", label: "Center" },
  { id: "meridian-science", name: "Meridian Science", label: "Center" },
  { id: "practical-research", name: "Practical Research", label: "Center" },
  { id: "evidence-desk", name: "Evidence Desk", label: "Center" },
  { id: "observatory-weekly", name: "Observatory Weekly", label: "Center" },
  { id: "circuit-and-matter", name: "Circuit & Matter", label: "Center" },
  { id: "northstar-technical", name: "Northstar Technical", label: "Right" },
] as const satisfies readonly SourceBreakdownEntry[];

const economySources = [
  { id: "household-ledger", name: "Household Ledger", label: "Left" },
  { id: "workday-journal", name: "Workday Journal", label: "Left" },
  { id: "market-and-main", name: "Market & Main", label: "Center" },
  { id: "regional-exchange", name: "Regional Exchange", label: "Center" },
  { id: "fiscal-notebook", name: "Fiscal Notebook", label: "Center" },
  { id: "local-trade-bulletin", name: "Local Trade Bulletin", label: "Center" },
  { id: "enterprise-review", name: "Enterprise Review", label: "Right" },
  {
    id: "independent-commerce",
    name: "Independent Commerce",
    label: "Right",
  },
] as const satisfies readonly SourceBreakdownEntry[];

const environmentSources = [
  { id: "climate-commons", name: "Climate Commons", label: "Left" },
  { id: "field-and-city", name: "Field & City", label: "Left" },
  { id: "basin-observer", name: "Basin Observer", label: "Center" },
  {
    id: "practical-environment",
    name: "Practical Environment",
    label: "Center",
  },
  { id: "regional-steward", name: "Regional Steward", label: "Center" },
  { id: "waterline-journal", name: "Waterline Journal", label: "Center" },
  { id: "land-use-review", name: "Land Use Review", label: "Right" },
  { id: "public-works-ledger", name: "Public Works Ledger", label: "Right" },
] as const satisfies readonly SourceBreakdownEntry[];

const sourceBreakdownByArticleId: Record<
  string,
  readonly SourceBreakdownEntry[]
> = {
  "coastal-planning": environmentSources,
  "material-research": researchSources,
  "rail-renewal": civicPolicySources,
  "public-ai-tools": civicPolicySources,
  "energy-storage": environmentSources,
  "local-economies": economySources,
  "heat-planning": environmentSources,
  "civic-data": civicPolicySources,
  "night-sky": researchSources,
  "food-networks": economySources,
  "creative-archives": civicPolicySources,
  "water-monitoring": environmentSources,
};

const articleDetailsById: Record<string, ArticleDetailFixture> = {
  "coastal-planning": {
    byline: "Mara Vela",
    publishedDate: "July 25, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration exploring how coastal services can adapt to a changing shoreline.",
    body: [
      "Coastal planners are beginning to treat sea-level preparation as an everyday public-service question rather than a single construction project. The shift brings transport, housing, drainage, health care, and emergency response into the same conversation.",
      "That broader view changes which investments appear most urgent. A raised road can protect one route, but it may do little for residents who depend on clinics, schools, or utilities located elsewhere. Planning teams are therefore mapping how disruptions move through a neighborhood instead of assessing each asset in isolation.",
      "The approach also makes tradeoffs more visible. Protective infrastructure can reduce risk while raising housing costs or shifting water toward another district. Local officials are testing smaller interventions alongside major works so they can learn which combinations remain useful under different conditions.",
      "Residents have asked for clearer timelines and plain-language explanations of uncertainty. In response, several planning groups are publishing thresholds that would trigger maintenance, relocation, or a new round of investment rather than presenting one distant forecast as a fixed outcome.",
      "The emerging lesson is less about predicting a single future than preserving choices. Services that can move, share capacity, or recover quickly may give communities more room to adjust as evidence changes.",
    ],
    analysisSummary: [
      "The article frames coastal adaptation as a connected public-service challenge rather than a single engineering project.",
      "It gives comparable attention to resilience benefits, neighborhood costs, and uncertainty.",
      "The conclusion favors flexible planning and transparent decision thresholds without endorsing one policy package.",
    ],
    framingNotes:
      "The language emphasizes public capacity, distributional effects, and community participation while repeatedly acknowledging cost and implementation tradeoffs. That produces a mostly centrist estimate with a modest leftward emphasis.",
    loadedTerms: ["resilience", "distributional effects", "preserving choices"],
  },
  "material-research": {
    byline: "Noah Ibarra",
    publishedDate: "July 25, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of passive-cooling material research.",
    body: [
      "A new materials study is drawing attention to cooling techniques that move heat without relying on additional electrical equipment. The work focuses on surfaces engineered to reflect selected wavelengths while releasing stored heat.",
      "Researchers describe the results as an early systems test rather than a finished building product. Performance varied with humidity, installation angle, and the material beneath the test layer, making local conditions central to any future use.",
      "The potential benefit is straightforward: passive cooling could reduce peak demand when grids are already under pressure. The remaining questions involve durability, manufacturing cost, repair, and whether performance holds outside controlled trials.",
      "The next phase will compare the material with shade, ventilation, and conventional insulation. The team argues that the most useful outcome may be a combination of modest techniques rather than one dramatic replacement for air conditioning.",
    ],
    analysisSummary: [
      "The report explains a passive-cooling material and the conditions that shape its performance.",
      "Potential energy benefits are balanced against durability, cost, and real-world validation needs.",
      "The story is cautiously optimistic and avoids presenting the research as market-ready.",
    ],
    framingNotes:
      "The article uses solution-oriented language but includes repeated caveats about evidence, manufacturing, and deployment. Political cues are weak, producing a high-confidence center estimate.",
    loadedTerms: ["passive cooling", "peak demand", "real-world validation"],
  },
  "rail-renewal": {
    byline: "Elena Sanz",
    publishedDate: "July 25, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of a regional rail network under renewal.",
    body: [
      "A regional rail renewal plan is putting reliability, station access, and routine maintenance ahead of a headline increase in top speed. The proposal directs early work toward signals, switches, power systems, and platforms that cause the most frequent delays.",
      "Supporters say predictable journeys would benefit more passengers than a faster timetable that works only when the network is operating perfectly. They also argue that step-free stations and clearer transfers expand the practical reach of existing service.",
      "The plan carries less visible political appeal than a new line, and its benefits would arrive gradually. Budget reviewers have asked agencies to publish maintenance milestones so spending can be compared with changes in cancellations, crowding, and repair backlogs.",
      "The central test will be whether operators can keep trains running while large sections of aging infrastructure are replaced. Phased construction reduces disruption, but it can extend the period before riders experience the full improvement.",
    ],
    analysisSummary: [
      "The plan prioritizes reliability, access, and maintenance over maximum speed.",
      "Benefits are described in terms of everyday passenger experience and network resilience.",
      "The article also highlights construction disruption, gradual delivery, and the need for measurable milestones.",
    ],
    framingNotes:
      "The story treats public investment favorably but gives substantial space to budgets, delivery risk, and measurable outcomes. Its language is pragmatic rather than ideological.",
    loadedTerms: ["headline speed", "everyday passenger experience", "repair backlog"],
  },
  "public-ai-tools": {
    byline: "Priya Menon",
    publishedDate: "July 25, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of a transparent public-interest AI interface.",
    body: [
      "Teams building public-interest AI tools are shifting their attention from demonstrations to the less glamorous work of usefulness. Projects are increasingly judged by whether people can understand a recommendation, challenge it, and recover when the system is wrong.",
      "That standard has changed product priorities. Documentation, appeal paths, staff training, and careful handoffs now sit beside model accuracy in project reviews. A technically stronger model may be rejected if its output cannot support a responsible decision.",
      "Public agencies are also narrowing the tasks assigned to automated systems. Instead of replacing a full workflow, many pilots sort documents, identify missing information, or prepare a draft that remains subject to human review.",
      "The approach does not remove risk. Automation can still reproduce gaps in the records used to build it, and a nominal human review offers little protection when staff lack time or authority. Teams are beginning to measure these operating conditions as part of system quality.",
      "The result is a quieter definition of progress: fewer sweeping claims, more observable outcomes, and interfaces designed to make disagreement possible.",
    ],
    analysisSummary: [
      "The article says public-interest AI is moving from novelty toward measurable service outcomes.",
      "It emphasizes explanation, appeal paths, human authority, and recovery from errors.",
      "Narrowly scoped automation is presented as more credible than replacing an entire public workflow.",
    ],
    framingNotes:
      "The framing favors oversight, procedural fairness, and public accountability, while acknowledging operational limits and the value of constrained deployment. This creates a center estimate with a modest leftward lean.",
    loadedTerms: ["public-interest", "responsible decision", "procedural fairness"],
  },
  "energy-storage": {
    byline: "Theo Marin",
    publishedDate: "July 25, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of storage balancing a regional power grid.",
    body: [
      "Regional grid operators are testing storage projects designed to move electricity across the day rather than simply add more generation. The systems charge when supply is plentiful and return power when demand rises or another resource drops away.",
      "Developers point to faster balancing and fewer periods of wasted generation. Communities hosting the projects are asking a different set of questions about land use, emergency planning, noise, and who receives the financial benefit.",
      "The economics depend on how often a battery is used and which services it provides. A project built for rare emergencies may have clear reliability value while producing less predictable revenue than one trading power every day.",
      "Regulators are considering contracts that reward multiple services without paying twice for the same capacity. The trials will be judged not only by technical performance but also by how clearly costs and local obligations are assigned.",
    ],
    analysisSummary: [
      "Storage is presented as a flexibility tool for balancing supply and demand.",
      "The article weighs grid benefits against land, safety, community, and financing concerns.",
      "Policy attention centers on transparent contracts and avoiding duplicate compensation.",
    ],
    framingNotes:
      "Competing reliability, market, and community frames receive similar weight. The article avoids a clear ideological preference, which supports its mixed label and moderate confidence.",
    loadedTerms: ["grid flexibility", "local obligations", "reliability value"],
  },
  "local-economies": {
    byline: "Ines Calder",
    publishedDate: "July 25, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of the measures behind local economic resilience.",
    body: [
      "Local economic teams are widening their scorecards beyond total growth. Hiring stability, household costs, business formation, commercial vacancies, and access to essential services are being tracked together to show how economic change reaches daily life.",
      "The broader picture can challenge a strong headline number. Output may rise while workers face shorter contracts or longer travel, and new firms may open while established neighborhood businesses struggle with rent.",
      "Supporters of the approach say the additional measures help officials identify where a general expansion is failing to build resilience. Critics warn that a large dashboard can blur accountability if leaders select whichever indicator supports a preferred message.",
      "Several regions are responding by publishing a small core set of measures, the reasons for choosing them, and revision histories. The aim is not to replace growth statistics, but to make their limits visible.",
    ],
    analysisSummary: [
      "The article explores a broader way to assess local economies alongside headline growth.",
      "It connects business and labor indicators with household costs and service access.",
      "Benefits of richer measurement are balanced against complexity and selective interpretation.",
    ],
    framingNotes:
      "The story is attentive to household distribution and labor conditions, but it also stresses measurement discipline and accountability. The overall estimate remains center.",
    loadedTerms: ["everyday resilience", "headline number", "accountability"],
  },
  "heat-planning": {
    byline: "Luca Ferrer",
    publishedDate: "July 25, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of neighborhood-scale heat planning.",
    body: [
      "Cities facing longer hot periods are moving heat planning into the design of streets, homes, schools, and public spaces. Shade, drinking water, building materials, and access to cooler rooms are increasingly considered before an emergency alert is issued.",
      "Neighborhood conditions matter because temperature alone does not describe exposure. A short walk can feel very different depending on tree cover, traffic, pavement, working hours, and whether a person can safely cool their home.",
      "Planners are combining citywide standards with local surveys to identify missing shade and services. The method can direct resources more precisely, though it also raises questions about maintenance and whether temporary pilots will receive long-term funding.",
      "Building rules remain the most contested part of the discussion. Stronger requirements may improve comfort and reduce future energy demand, but they can add immediate costs if financing and tenant protections are not designed alongside them.",
      "The emerging strategy treats heat as a routine design constraint. Its success will depend on whether visible improvements reach the streets and residents facing the highest exposure.",
    ],
    analysisSummary: [
      "Heat preparation is framed as a neighborhood design issue, not only an emergency response.",
      "The article emphasizes unequal exposure, access to cooling, and long-term maintenance.",
      "Building standards are discussed alongside cost, financing, and tenant-protection tradeoffs.",
    ],
    framingNotes:
      "Equity, public investment, and tenant protection receive prominent attention, producing the strongest left percentage. Cost and implementation constraints keep the estimate mixed rather than clearly left.",
    loadedTerms: ["unequal exposure", "tenant protections", "routine design constraint"],
  },
  "civic-data": {
    byline: "Samira Holt",
    publishedDate: "July 24, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of public records made easier to follow.",
    body: [
      "Public-data teams are redesigning decision records so residents can follow an issue before a final vote. The new formats connect agendas, amendments, evidence, public comments, and implementation dates instead of publishing each item in isolation.",
      "The change is partly technical and partly editorial. A searchable file is useful, but readers also need plain-language descriptions of what changed, who is responsible, and when the next decision point will occur.",
      "Officials caution that summaries can introduce their own framing. To reduce that risk, several systems preserve the original record beside each explanation and show a history of revisions rather than silently replacing earlier text.",
      "Advocates say the real measure of success is whether people can intervene while choices are still open. That requires timely publication, consistent identifiers, and accessibility practices that work beyond specialist policy audiences.",
    ],
    analysisSummary: [
      "The story describes civic records that connect decisions across time instead of publishing isolated files.",
      "Plain-language context is paired with original documents and visible revision histories.",
      "Usefulness is measured by whether residents can understand and respond before decisions close.",
    ],
    framingNotes:
      "Transparency and public participation are positively framed, while the risk of institutional framing is acknowledged. The balance supports a center estimate with a mild leftward emphasis.",
    loadedTerms: ["public oversight", "choices are still open", "visible revision history"],
  },
  "night-sky": {
    byline: "Jon Bell",
    publishedDate: "July 24, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of small observatories contributing to a shared sky map.",
    body: [
      "Small observatories are contributing observations to a shared night-sky map built around common formats and calibration notes. The network lets independent teams compare changes across a wider area than any one instrument can cover.",
      "Consistency is the main challenge. Equipment, weather, and local light conditions vary, so each observation carries information about how it was collected and what uncertainty remains.",
      "The shared system does not erase those differences. Instead, it makes them visible enough for researchers to decide which readings can be combined and which should remain separate.",
      "Participants hope the network will help flag unusual patterns quickly while preserving a role for careful follow-up. Its value lies as much in coordination and documentation as in the volume of data collected.",
    ],
    analysisSummary: [
      "Common data formats allow small observatories to contribute to a wider sky map.",
      "Calibration and uncertainty remain attached to each observation.",
      "The network is intended to flag patterns for follow-up rather than replace expert review.",
    ],
    framingNotes:
      "The article is technical and collaborative with almost no political language. Its framing is strongly center and confidence is high.",
    loadedTerms: [],
  },
  "food-networks": {
    byline: "Ayla Moreno",
    publishedDate: "July 23, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of a regional food network with multiple routes.",
    body: [
      "Regional food networks are reconsidering whether the shortest supply chain is always the most reliable. Highly optimized routes can lower routine costs while leaving stores and producers exposed when one warehouse, road, or supplier fails.",
      "The alternative is not unlimited duplication. Planners are identifying a small number of backup facilities, transport links, and local suppliers that can take on work during a disruption.",
      "Smaller producers may add flexibility, but they need predictable purchasing and shared logistics to participate. Without those arrangements, redundancy can remain an aspiration that disappears under normal price pressure.",
      "The emerging model treats resilience as a service with an explicit cost. Making that cost visible allows buyers and communities to decide how much backup capacity they are prepared to maintain.",
    ],
    analysisSummary: [
      "The article compares efficient food supply chains with the value of limited redundancy.",
      "Backup capacity is framed as a deliberate service rather than waste.",
      "Smaller suppliers can improve flexibility when purchasing and logistics are dependable.",
    ],
    framingNotes:
      "Market efficiency and community resilience are treated as complementary constraints. The political signal is limited and the center share remains strongest.",
    loadedTerms: ["single points of failure", "backup capacity", "community resilience"],
  },
  "creative-archives": {
    byline: "Mina Cho",
    publishedDate: "July 23, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of a community archive reaching new audiences.",
    body: [
      "Community archives are finding larger audiences through digitization while trying to preserve the local context that gave each collection meaning. The work includes recording authorship, permissions, relationships, and gaps rather than treating scanning as the final step.",
      "Online access can reconnect dispersed communities and make fragile material easier to study. It can also separate an image or recording from the people who understand why it was created.",
      "Archivists are responding with layered descriptions, community review, and clear limits on reuse. Some records remain available only in lower resolution or through a request process when broad publication would conflict with consent.",
      "The projects show that access and stewardship are not simple opposites. Thoughtful systems can widen discovery while keeping responsibility and correction close to the source community.",
    ],
    analysisSummary: [
      "Digitization is presented as both an access opportunity and a stewardship responsibility.",
      "Metadata, permissions, and community review preserve context around archived material.",
      "Different access levels are used when unrestricted publication would conflict with consent.",
    ],
    framingNotes:
      "The story favors community authority and consent while presenting practical access benefits. The result is a center estimate with a noticeable leftward component.",
    loadedTerms: ["source community", "stewardship", "responsibility"],
  },
  "water-monitoring": {
    byline: "Ravi Costa",
    publishedDate: "July 22, 2026",
    heroCaption:
      "A CANTABRIA editorial illustration of low-cost monitors across a river basin.",
    body: [
      "Low-cost water monitors are helping river groups combine scattered readings into earlier warnings. The devices measure a limited set of conditions frequently, creating a pattern that can guide where more precise testing is needed.",
      "Affordability makes broader coverage possible, but it does not remove the need for calibration and maintenance. A neglected sensor can produce a confident-looking signal that reflects fouling, heat, or a failing battery rather than a real change in the river.",
      "Projects are pairing automated alerts with field checks and publishing the quality status of each station. That lets users distinguish a verified event from an observation that still needs confirmation.",
      "The final challenge is communication. An alert has little value if downstream communities, utilities, and local responders receive it too late or cannot understand what action the reading supports.",
    ],
    analysisSummary: [
      "Frequent low-cost readings can identify where more precise water testing is needed.",
      "Calibration, maintenance, and visible quality status are essential to trustworthy alerts.",
      "The system's value depends on timely communication and clear action guidance.",
    ],
    framingNotes:
      "The article combines environmental monitoring with operational caution and local communication. It has a modest leftward emphasis but remains predominantly center.",
    loadedTerms: ["earlier warnings", "trustworthy alerts", "downstream communities"],
  },
};

export function getArticleById(id: string): NewsArticle | undefined {
  const article = homepageArticles.find((item) => item.id === id);
  const details = articleDetailsById[id];
  const sourceBreakdown = sourceBreakdownByArticleId[id];

  if (!article || !details || !sourceBreakdown) {
    return undefined;
  }

  return {
    ...article,
    ...details,
    disclaimer: DEMO_DISCLAIMER,
    sourceBreakdown,
  };
}

export function getRelatedArticles(
  articleId: string,
  limit = 4,
): HomepageArticle[] {
  const currentArticle = homepageArticles.find(
    (article) => article.id === articleId,
  );

  if (!currentArticle || limit <= 0) {
    return [];
  }

  const candidates = homepageArticles.filter(
    (article) => article.id !== articleId,
  );
  const sameTopic = candidates.filter(
    (article) => article.topic === currentArticle.topic,
  );
  const otherTopics = candidates.filter(
    (article) => article.topic !== currentArticle.topic,
  );

  return [...sameTopic, ...otherTopics].slice(0, limit);
}
