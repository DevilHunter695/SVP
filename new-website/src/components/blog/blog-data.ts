export interface BlogPost {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  author?: string;
  role?: string;
  excerpt: string;
  accent: string;
  /** Full article body as paragraphs. Undefined ⇒ "coming soon" state. */
  body?: string[];
}

export const BLOGS: BlogPost[] = [
  {
    slug: "defining-stress",
    title: "Defining Stress",
    subtitle: "Stress Teaches You What Spreadsheets Never Will",
    category: "General",
    author: "Rakesh Naik",
    role: "General Partner",
    excerpt:
      "Stress is the invisible cost of carrying outcomes before the world sees results — and the filtering mechanism that reveals reality faster than success ever could.",
    accent: "#f0504f",
    body: [
      "There is a version of entrepreneurship people like to celebrate publicly. The polished version. Funding announcements, media headlines, conferences, valuation milestones, growth charts and curated narratives of success. But very little gets written about what actually shapes founders, operators and investors over long periods of time.",
      "Stress — not motivational stress, but existential stress.",
      "The kind where payroll becomes uncertain, lenders stop cooperating, legal notices arrive unexpectedly, operational fragility surfaces, liquidity disappears faster than anticipated and reputations are questioned before outcomes are visible. The kind where one difficult quarter can threaten years of work. The kind where even supporters quietly begin distancing themselves because uncertainty makes people uncomfortable.",
      "Most people experience business through reports, presentations and narratives. A successful General Partner of a special situations fund has to experience it through direct exposure. Direct exposure to uncertainty, operational fragility, liquidity pressure, legal complexity, emotional strain, psychological exhaustion and human behaviour under stress.",
      "Over time, you realize something important. Stress is not merely a side effect of building. Stress is a filtering mechanism. It reveals reality much faster than success does. In stable environments, almost everyone appears competent. Liquidity hides inefficiency. Momentum hides weak governance. Bull markets hide poor judgment. External optimism hides internal fragility. But difficult periods expose structure quickly. You discover which businesses are operationally real, which promoters can absorb pressure, which relationships are transactional and which people disappear when uncertainty arrives. In one stressful quarter, you may learn more about a business than during several years of normal operations.",
      "One reason I became deeply interested in special situations is because I experienced and lived through it. India remains a country where enormous value is often trapped beneath complexity. Many institutions avoid situations involving litigation, debt stress, governance breakdowns, operational instability, regulatory friction, fragmented ownership structures and turnaround uncertainty. Understandably so. These situations are uncomfortable. But discomfort and absence of value are not the same thing.",
      "Some of India's most valuable opportunities exist precisely where conventional investing becomes hesitant. Not every stressed asset deserves revival, but many deserve better institutional capability around them. Sometimes the underlying business remains viable while the structure failed. Sometimes governance collapsed while demand remained strong. Sometimes capital disappeared before execution stabilized. Sometimes founders lacked systems rather than intent. Stress creates distortions. Distortions create pricing gaps. Pricing gaps create opportunity.",
      "There is also a major difference between observing stress and carrying it. Financial models can estimate downside, but only direct operational exposure teaches uncertainty management, liquidity discipline, emotional resilience, negotiation maturity, stakeholder alignment and institutional patience. People often underestimate how much emotional stability matters in investing, especially in complex environments like India. Difficult situations are rarely solved by capital alone. They require trust, governance, persistence, operational credibility, legal understanding and strategic flexibility. In many cases, you are not merely restructuring assets. You are restructuring confidence.",
      "What is rarely discussed openly is the emotional and psychological cost of this journey. Stress does not remain inside boardrooms or balance sheets. Long periods of uncertainty can lead to anxiety, insomnia, isolation, health degradation, strained marriages, broken families, divorces, social humiliation and emotional exhaustion. There are periods where even close friends stop believing in your vision because outcomes are not yet visible. Society celebrates success after survival becomes obvious, but very few understand the internal pressure carried during the process.",
      "A founder may simultaneously carry investor expectations, lender pressure, employee responsibility, family obligations, regulatory uncertainty, legal exposure and reputational scrutiny while continuing to appear composed externally. There are moments where confidence fluctuates, fatigue accumulates and self doubt quietly enters despite years of competence and effort. Social media documents outcomes. It rarely documents sleepless nights, silent panic, emotionally difficult conversations, insults, mistrust, or the loneliness of carrying institutional responsibility when very few people around truly understand the pressure.",
      "Yet difficult environments also create depth, resilience and pattern recognition that cannot be learned theoretically. Exposure to stress sharpens judgment. It teaches people how to identify early governance failures, hidden liquidity risks, weak incentive systems, unsustainable expansion and operational fragility. It also teaches how to recognize resilience. Disciplined execution, transparent communication, governance consistency, calm decision making and adaptive leadership become much easier to identify once you have experienced real uncertainty yourself.",
      "Over time, your perspective changes permanently. You stop overvaluing appearances and temporary momentum. You become more patient with real builders and more cautious about performative success. You begin understanding that volatility and value are often connected. Some of the strongest founders and most capable institutions are shaped through adversity, not comfort. Some of the best businesses emerge only after periods of extreme pressure because stress forces clarity, removes inefficiency, sharpens priorities and exposes what is genuinely durable.",
      "India's next phase of growth will require far more than startup funding and financial engineering. It will require institutional revival capability. Across manufacturing, infrastructure, industrial services, technology and traditional sectors, there are thousands of businesses requiring restructuring, governance rebuilding, strategic capital, operational stabilization and institutionalization. This is where special situations investing becomes important, not merely as opportunism, but as economic rebuilding. Capital should not only chase momentum. It should also revive trapped productive capacity.",
      "One surprising outcome of difficult journeys is that they also deepen appreciation. You begin valuing loyalty over visibility, substance over branding, resilience over theatrics and execution over narratives. You become deeply grateful for the few people who remain beside you during uncertain periods because pressure removes performance very quickly. What remains is character.",
      "If there is one lesson years of navigating difficult environments teaches, it is this: stress is not always destructive. Sometimes stress is developmental. Not every difficult situation creates opportunity. Not every stressed asset deserves capital. Not every founder survives pressure well. But meaningful institution building rarely happens without periods of discomfort.",
      "The objective is not to avoid stress entirely. The objective is to develop the capability to navigate it intelligently without losing judgment, ethics or emotional stability in the process. Because eventually, that capability itself becomes an asset. And in a country as complex and dynamic as India, the ability to operate through uncertainty may become one of the most valuable long term institutional competencies of all.",
    ],
  },
  {
    slug: "stress-an-asset-class",
    title: "Stress, an Asset Class",
    subtitle: "Why the Greatest Investment Opportunities Often Exist Inside Discomfort",
    category: "Finance",
    author: "Usha Nirmala",
    role: "General Partner",
    excerpt:
      "Markets price comfort efficiently and complexity poorly. The moment stress enters a business, perception and intrinsic value diverge — and that gap is where outsized returns are born.",
    accent: "#1d4496",
    body: [
      "Modern investing is largely designed around comfort, visibility and predictability. Investors naturally gravitate toward businesses already validated by markets, institutions and public narratives because certainty creates psychological safety. Stability feels investable. Momentum feels intelligent. Consensus feels secure. As a result, large amounts of capital continuously flow toward the same visible opportunities where information symmetry already exists and pricing efficiency becomes extremely high. By the time a business becomes universally accepted as valuable, however, much of the asymmetrical upside has already disappeared.",
      "Some of the largest investment opportunities therefore emerge not from comfort, but from stress. Not stress merely as emotion, but stress as an economic condition. Stress created by liquidity pressure, governance failures, operational instability, regulatory friction, promoter fatigue, legal complexity, institutional uncertainty and market overreaction. Over time, I began realizing that stress itself behaves almost like an independent asset class because markets frequently misprice complexity during periods of uncertainty. The moment stress enters a business or sector, confidence weakens, liquidity contracts, lenders become defensive, valuations compress, narratives deteriorate and stakeholders begin reacting emotionally rather than rationally. This creates distortions between perception and intrinsic value. And distortions create pricing gaps. Pricing gaps create asymmetrical opportunity.",
      "The market prices comfort efficiently. Businesses with stable governance, institutional visibility and predictable earnings are continuously tracked by analysts, lenders, funds and media narratives. Everyone understands them, which means extraordinary upside becomes harder to generate because competition for those assets remains intense. Stress changes this dynamic completely. A company experiencing temporary liquidity stress may get valued like a structurally broken enterprise. Governance issues may overshadow valuable underlying assets. Operational instability may compress enterprise value below replacement cost. Litigation or restructuring complexity may discourage participation even when the long term economics remain compelling. Markets are often not rational under pressure because fear overwhelms nuance.",
      "India remains one of the richest environments globally for stress driven investing because the economy itself contains enormous structural complexity. The country is filled with fragmented industries, family owned businesses, succession uncertainty, debt stressed manufacturing assets, under institutionalized governance systems, distressed infrastructure, litigation entangled enterprises and operationally viable but financially broken companies. Conventional investors often avoid these environments because they require far more than financial capital. They require operational capability, restructuring expertise, legal understanding, stakeholder management, governance rebuilding, emotional endurance and institutional patience.",
      "This is why special situations investing remains one of the least crowded but intellectually demanding forms of investing. Most investors avoid stress because stress destroys predictability. Traditional investing frameworks prefer clean reporting, historical stability, linear forecasting and institutional comfort. But stressed situations are rarely clean. They are messy, emotionally draining, incomplete and operationally unpredictable. They require investors to make decisions without perfect information while simultaneously managing uncertainty across multiple dimensions. This discomfort is precisely why opportunities continue existing there. Complexity acts as a natural barrier to participation.",
      "India's future growth story will not emerge only from startup funding and momentum investing. A major portion will come from revival. Revival of manufacturing capacity, distressed infrastructure, fragmented sectors, underperforming industrial assets and institutionally weak but economically viable enterprises. This requires sophisticated special situations capital capable not merely of deploying money, but of rebuilding governance, restoring operational stability, structuring strategic capital and institutionalizing businesses over time.",
      "Viewing stress as an asset class fundamentally changes how investors think. Instead of asking how to avoid stress entirely, the question becomes how to intelligently price, manage and navigate stress. Because stress itself is not inherently destructive. Mismanaged stress destroys value. Properly understood stress can create extraordinary asymmetry. Some of the greatest investment opportunities emerge precisely when confidence collapses, liquidity disappears, narratives deteriorate and institutions hesitate. That is when markets become least efficient. And inefficiency is where outsized returns are born.",
      "Modern markets increasingly reward visibility, speed and narrative momentum. But long term institutional investing often rewards something else entirely: the ability to remain rational inside uncertainty. Stress tests more than businesses. It tests investors themselves. It tests judgment, emotional stability, conviction, ethics and patience. Not every stressed situation deserves capital. Not every turnaround succeeds. Not every distressed asset becomes valuable. But investors capable of navigating complexity intelligently eventually realize something profound — stress itself may become one of the last remaining sources of true asymmetrical opportunity and long term institutional advantage.",
    ],
  },
  {
    slug: "dry-powder",
    title: "Dry Powder",
    category: "Investments",
    excerpt: "The strongest dry powder is often engineered, not merely accumulated.",
    accent: "#c94fa0",
  },
  {
    slug: "torque",
    title: "Torque",
    category: "Investments",
    excerpt:
      "Torque by SVP accelerates founders, platforms, and opportunities from potential to scalable enterprise.",
    accent: "#6b4fbb",
  },
  {
    slug: "foie-gras",
    title: "Foie Gras",
    category: "Private Equity",
    excerpt: "Valuation chasing creates bloated companies rich in narrative but poor in resilience.",
    accent: "#2872fa",
  },
  {
    slug: "ease-of-doing-business",
    title: "Ease of Doing Business",
    category: "General",
    excerpt: "An economy grows faster when compliance supports enterprise instead of exhausting it.",
    accent: "#0d6b5e",
  },
];

export const getPost = (slug: string) => BLOGS.find((b) => b.slug === slug);
