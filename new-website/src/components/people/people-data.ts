export type PeopleGroup =
  | "Leadership"
  | "Investment Team"
  | "Operating Partners"
  | "Advisory Board";

export interface Person {
  id: string;
  name: string;
  role: string;
  group: PeopleGroup;
  photo: string;
  location: string;
  focus: string[];
  bio: string;
  highlights: string[];
  linkedin?: string;
  email?: string;
}

export const PEOPLE: Person[] = [
  {
    id: "rakesh-naik",
    name: "Rakesh Naik",
    role: "Founding General Partner",
    group: "Leadership",
    photo: "/Assets/People/rakesh.jpg",
    location: "",
    focus: [],
    bio:
      "An unconventional private equity general partner, investor, and executive with over 30 years of experience across technology, general management, and applied engineering. As a Founding General Partner, he brings a results driven approach and specializes in steering the full lifecycle of value creation from ideation to monetization by aligning stakeholders and driving outcomes across startups, scaleups, mature enterprises, and complex special situations. Core areas of expertise include special situations, value unlocking, private equity, incubation & acceleration, innovations, and applied engineering.\n\nHis focus on stressed and complex situations is rooted in lived experience, not theory. Having personally navigated financial and operational pressure, he understands how situations deteriorate, how decision making gets distorted, and what it takes to regain control and create outcomes where others lose direction. He also founded the Torque Acceleration Program, an experiential platform designed to prepare and scale founders through tailored strategic and execution frameworks.",
    highlights: [],
    linkedin: "https://www.linkedin.com/in/rakeshnaik",
    email: "rakesh@svp.fund",
  },
  {
    id: "usha-nirmala",
    name: "Usha Nirmala",
    role: "Founding General Partner",
    group: "Leadership",
    photo: "/Assets/People/usha.jpg",
    location: "",
    focus: [],
    bio:
      "Usha Nirmala is a distinguished leader from Hyd, India, with over 25 years of experience across finance, banking, software, and engineering. A gold medalist MBA graduate from Andhra University, she specializes in scaling, restructuring, and repositioning mid market distressed enterprises, with deep expertise in private equity, non performing assets, special situations, and litigation exposed ventures. As a Founding General Partner, she leads executive operations and strategic initiatives with a strong focus on distressed opportunities, complex transactions, and value creation through unlocking trapped economic assets.\n\nShe is widely recognized for her strengths in people management, operational leadership, and financial engineering. She also brings a unique perspective to an otherwise male dominated bench of private equity operators, a rarity in the sector and a strength that adds balance, insight, and differentiated leadership to the platform.",
    highlights: [],
    linkedin: "https://www.linkedin.com/in/ushanirmala/",
    email: "usha@svp.fund",
  },
  {
    id: "sanjay-kumar-palleboina",
    name: "Sanjay Kumar Palleboina",
    role: "General Partner",
    group: "Leadership",
    photo: "/Assets/People/Sanjay.jpg",
    location: "",
    focus: [],
    bio:
      "Sanjay Kumar Palleboina is a seasoned technologist, investor, and entrepreneur from Hyd, India, with over 25 years of global experience across technology, finance, and venture building. An alumnus of Sri Sathya Sai Institute of Higher Learning and University of Mumbai, he brings deep expertise in capital markets, angel investing, strategic turnarounds, and enterprise scale execution.\n\nHaving held senior leadership positions across multinational corporations and entrepreneurial ventures, he has advised high net worth individuals on investments spanning technology, real estate, and emerging asset classes, with a strong reputation for combining strategic insight with execution discipline. As one of the early General Partners, he has played a pivotal role in shaping the platform into an institutional grade investment firm, often stepping into complex operational and strategic situations to stabilize, rebuild, and drive execution where it matters most.",
    highlights: [],
    linkedin: "https://www.linkedin.com/in/sanjaykumarpalleboina/",
    email: "sanjay@svp.fund",
  },
  {
    id: "confidential",
    name: "Confidential",
    role: "General Partner",
    group: "Leadership",
    photo: "",
    location: "",
    focus: [],
    bio:
      "Technology entrepreneur, investor, and ecosystem builder with deep experience across enterprise technology, digital transformation, and venture investing. A serial entrepreneur, he has built and scaled global technology businesses while actively backing innovation led startups and founders across multiple sectors and geographies. He is also an established venture capitalist and General Partner across multiple investment platforms, with extensive experience in global investing, founder mentoring, strategic scaling, and ecosystem development.\n\nHis strengths lie in building high performance teams, fostering cultures of innovation and execution excellence, and driving outcomes that create long term enterprise value. Passionate about leveraging technology to solve complex problems, he focuses on enabling scalable innovation, empowering entrepreneurs, and building businesses that deliver both commercial impact and meaningful societal value.",
    highlights: [],
  },
  {
    id: "confidential-2",
    name: "Confidential-2",
    role: "General Partner",
    group: "Leadership",
    photo: "",
    location: "",
    focus: [],
    bio:
      "He is an experienced technology and business transformation leader with deep expertise across enterprise systems, digital infrastructure, and strategic operations. Having worked within large scale organizations & technology driven environments, he has led complex transformation initiatives focused on operational efficiency, governance, scalability, and digital innovation. His wide experience spans technology leadership, enterprise architecture, program management, and building resilient systems that support long term organizational growth and institutional scale.\n\nCurrently serving as Group CIO of a major infrastructure enterprise, he has been associated with several leading Indian brands and national scale development initiatives, bringing a strong blend of execution capability, governance discipline, and strategic technology vision. He is also an avid angel investor with a strong interest in emerging technologies, innovation led ventures, and founder backed ecosystems.",
    highlights: [],
  },
  {
    id: "madhuri-ayyella",
    name: "Madhuri Ayyella",
    role: "General Partner",
    group: "Leadership",
    photo: "",
    location: "",
    focus: [],
    bio:
      "Madhuri is an educationist & institutional leader with experience in academic administration, organizational development, & scalable education ecosystems. She is associated with Narayana Educational Institutions, and has contributed to building high performance academic environments focused on operational excellence and student outcomes. Through her longstanding engagement across educational and social ecosystems, she has developed strong relationships across a wide spectrum of society, including HNIs and UHNIs, with access to influential networks spanning business, academia, and community leadership.\n\nWith a multidisciplinary academic background and a leadership driven approach, she brings strong organizational capability, people management expertise, and ecosystem connectivity to strategic initiatives. As part of the firm’s diverse General Partner workbench, she contributes a differentiated perspective that strengthens the platform across leadership, relationships, and institutional thinking.",
    highlights: [],
  },
  {
    id: "prof-r-vaidyanathan",
    name: "Prof. R Vaidyanathan",
    role: "Mentor & Advisor",
    group: "Advisory Board",
    photo: "",
    location: "",
    focus: [],
    bio:
      "Prof. R. Vaidyanathan is a distinguished academician, financial expert, strategist, and policy advisor with decades of experience across banking, finance, governance, and economic policy. An alumnus of Loyola College, Indian Statistical Institute, and Indian Institute of Management Bangalore, he is widely regarded as one of India’s most respected voices on capital markets, financial systems, risk management, and the Indian economy. A two time Fulbright Scholar, Salzburg Seminar Fellow, global visiting scholar, and faculty member across leading business schools of the world, he has also served in several important institutional and policy roles, including with PFRDA and the National Security Advisory Board.\n\nHe has been associated as a professor at both IIMB and Rashtriya Raksha University, while also advising leading regulatory and financial institutions including RBI, SEBI, and IRDAI, contributing significantly to policy thinking, institutional governance, and financial sector development. Known for his sharp economic insights, unique humor, independent thinking, and deep understanding of Indian business structures, Prof. Vaidyanathan represents a rare blend of intellectual depth, academic scholarship, strategic thinking, and financial expertise with international recognition. As a mentor to one of the founding General Partners and a valued member of the platform’s advisory board, he brings significant strategic, academic, and institutional perspective to investment platforms, governance frameworks, and long term value creation initiatives.",
    highlights: [],
    email: "advisors@svp.fund",
  },
  {
    id: "srinivas-rao-mahankali",
    name: "Srinivas Rao Mahankali (MSR)",
    role: "Strategic Advisor",
    group: "Advisory Board",
    photo: "/Assets/People/Srinivas-Rao-Mahankali.jpg",
    location: "",
    focus: [],
    bio:
      "Srinivas Rao Mahankali (MSR) is a seasoned entrepreneur with multiple successful exits and nearly four decades of experience spanning entrepreneurship, industry, innovation ecosystem building, and institutional leadership. Widely recognized for his transformational tenure as former CEO of T-Hub, he was instrumental in shaping one of India’s most influential startup ecosystems by bringing together founders, startups, corporates, investors, academia, and government into a powerful innovation network. A natural ecosystem architect and networker par excellence, MSR is known for his ability to create meaningful relationships that unlock opportunities, capital, partnerships, and long term strategic value.\n\nHis influence extends across founders, institutional investors, policymakers, and industry leaders, making him one of the most respected connectors within the entrepreneurial landscape. An LP in multiple funds and a trusted associate of SVP, he brings strategic depth and ecosystem intelligence to the platform, supporting the General Partners and portfolio companies through growth, transformation, and critical strategic inflection points. His institution building mindset, deep market relationships, and long horizon approach to innovation and value creation make him a formidable force within India’s startup and investment ecosystem.",
    highlights: [],
  },
  {
    id: "dr-uday-saxena",
    name: "Dr. Uday Saxena",
    role: "Advisor",
    group: "Advisory Board",
    photo: "/Assets/People/Uday.png",
    location: "",
    focus: [],
    bio:
      "Dr. Uday Saxena is a globally recognized pharmaceutical executive, translational scientist, and biotech entrepreneur with over three decades of leadership in drug discovery, development, and commercialization. Widely respected for translating breakthrough science into scalable therapeutic platforms, his expertise spans metabolic diseases, oncology, inflammation, CNS disorders, biologics, vaccines, and regenerative medicine. He currently serves as Co-Founder and Chair of the Advisory Board at Utopia Therapeutics (India & USA), where he leads scientific strategy, intellectual property development, and global partnerships for pioneering metabolic disease vaccines and regenerative health technologies. He is also Co-Founder of Whale Tank BioCatalyst Fund LLC, a venture platform focused on transforming deep-science innovation into globally impactful healthcare solutions.\n\nEarlier in his career, Dr. Saxena was part of the pioneering Parke-Davis team behind atorvastatin (Lipitor), the world’s highest-selling pharmaceutical drug. He later served as Chief Scientific Officer at Dr. Reddy’s Laboratories, leading more than 200 scientists and building a robust innovation pipeline across multiple therapeutic areas. At AtheroGenics Inc., he established a discovery organization from the ground up and advanced a Phase III clinical candidate through a landmark licensing transaction valued at nearly USD 1 billion. His contributions to science and innovation are reflected in over 65 peer-reviewed publications, more than 25 U.S. patents, and recognition as a Fellow of the American Heart Association.\n\nToday, Dr. Saxena continues to build science-driven ventures at the intersection of innovation, healthcare, and real-world impact while mentoring emerging scientists and contributing to the advancement of India’s translational research and biotech ecosystem.",
    highlights: [],
  },
  {
    id: "natarajan-ranganathan",
    name: "Natarajan Ranganathan",
    role: "Advisor",
    group: "Advisory Board",
    photo: "/Assets/People/Natarajan.jpeg",
    location: "",
    focus: [],
    bio:
      "Natarajan Ranganathan is a seasoned finance and venture capital leader with over three decades of experience across investment management, institutional governance, operational scaling, and strategic finance. He previously served in senior finance leadership roles, including as CFO across the Wipro group ecosystem for many years, bringing deep exposure to large scale corporate governance, financial systems, and institutional management. He later served as Managing Director and CFO at Helion Ventures, where he was part of the core leadership team managing over USD 1 billion in assets while supporting several high growth technology ventures through their scale and institutionalization journeys. He also served as CFO and COO of the UC RNT Fund, an investment platform backed by Ratan Tata and the University of California.\n\nHe currently serves on the boards of several leading industries and companies in India, bringing strategic oversight, governance expertise, and institutional perspective to complex businesses and growth platforms. Beyond institutional leadership, he is also an active angel investor with a strong interest in backing innovation led ventures and emerging entrepreneurs. With deep expertise spanning venture investing, governance, compliance, fund management, and institutional strategy, Natarajan brings a rare blend of financial discipline, operational maturity, and long term institution building perspective. His experience across some of India’s most respected corporate and venture platforms gives him a strong understanding of scaling businesses, managing investment ecosystems, and building sustainable, high credibility investment institutions.",
    highlights: [],
  },
  {
    id: "dr-suresh-poosala",
    name: "Dr. Suresh Poosala",
    role: "Advisor",
    group: "Advisory Board",
    photo: "",
    location: "",
    focus: [],
    bio:
      "Dr. Suresh Poosala is a highly accomplished biomedical scientist, entrepreneur, and translational research leader working at the intersection of biotechnology, oncology, longevity science, and health innovation. Having worked in leadership positions with leading global pharmaceutical and research organizations, he brings deep expertise across scientific research, translational medicine, and frontier healthcare technologies. Driven by a larger vision to contribute to India’s scientific and innovation ecosystem, he returned to India to pursue his passion for building globally relevant science and healthcare ventures from within the country. Over the years, he has founded and led multiple ventures focused on biological aging, precision oncology, regenerative health, and science driven healthcare platforms aimed at solving complex real world medical challenges.\n\nBeyond science and entrepreneurship, he is also an active angel investor, mentor, ecosystem enabler, and well connected networker with strong relationships across academia, healthcare, startups, investors, and industry leaders. Combining scientific depth with entrepreneurial execution, Dr. Poosala actively contributes to advancing biotech innovation, commercializing breakthrough health technologies, and mentoring emerging scientific and deep tech enterprises with the ambition of positioning India as a globally respected hub for scientific innovation and translational research.",
    highlights: [],
  },
  {
    id: "dr-umesh-sharraf",
    name: "Dr. Umesh Sharraf",
    role: "Advisor",
    group: "Advisory Board",
    photo: "/Assets/People/umesh.jpeg",
    location: "",
    focus: [],
    bio:
      "Dr. Umesh Sharraf is a distinguished bureaucrat with extensive experience across intelligence, law enforcement, governance, and institutional reform. Until recently, he served as ex-DGP of Telangana Police, overseeing several high visibility and strategically significant operations during his tenure. Over the course of his career, he has led major initiatives spanning anti extremism, economic crime investigations, national security, and anti corruption enforcement. He has also played a pivotal role in uncovering complex financial frauds, strengthening accountability frameworks, and driving large scale administrative and policing reforms.\n\nWith deep exposure to governance systems, regulatory environments, and institutional risk management, he brings a rare combination of operational leadership, strategic insight, and public sector discipline. His contributions extend beyond enforcement into policy engagement, institutional system building, and governance advisory, making him a highly respected voice on matters involving compliance, risk, integrity, and organizational discipline. Within the platform, he adds a strong grounding influence and a disciplined institutional perspective.",
    highlights: [],
  },
  {
    id: "roopa-naik",
    name: "Roopa Naik",
    role: "Compliance Officer and Managing Partner",
    group: "Leadership",
    photo: "/Assets/People/roopa.jpg",
    location: "",
    focus: [],
    bio:
      "Roopa Naik is a seasoned finance professional from Hyd, India, with over 30 years of experience across corporate credit, banking, compliance, and structured finance. She has held key leadership roles at institutions such as Global Trust Bank, Axis Bank, and L&T Infrastructure Finance. Her expertise spans legal structuring, transactional finance, financial engineering, risk management, regulatory compliance, and complex project funding solutions. Having worked on large scale national projects involving regulators, financial institutions, and leading industrial groups, she brings deep institutional and execution experience to the platform.\n\nRoopa adds a rare balance between entrepreneurial investment thinking and disciplined banking rigor, creating a strong counterweight within the investment platform. She is responsible for strengthening processes, governance, and procedural discipline, with a proven ability to temper ambition with structured risk assessment & institutional accountability.",
    highlights: [],
  },
  {
    id: "swaminathan-gopal",
    name: "Swaminathan Gopal",
    role: "Managing Partner",
    group: "Leadership",
    photo: "/Assets/People/Swaminathan.jpg",
    location: "",
    focus: [],
    bio:
      "Swaminathan Gopal is an accomplished entrepreneur, angel investor, & technology leader with over 30 years of experience across software engineering, operations, consulting, business development, P&L management, and customer engagement. Known for building & scaling large programs from the ground up, he has led transformative initiatives for global technology enterprises as well as high growth startups.\n\nA serial entrepreneur with deep ecosystem relationships, he combines strategic vision with strong technical expertise across enterprise software, eCommerce platforms, and mobile applications. As part of the inner circle of the Founding General Partners, he played an instrumental role during the platform’s formative stages by opening up his network, enabling strategic introductions, and facilitating early HNI and Friends, Family, and Founders ecosystem support.",
    highlights: [],
  },
  {
    id: "santosh-arasamangalam",
    name: "Santosh Arasamangalam",
    role: "Managing Partner",
    group: "Leadership",
    photo: "/Assets/People/Santosh.jpg",
    location: "",
    focus: [],
    bio:
      "Santosh Arasamangalam is an accomplished entrepreneur with extensive experience in building and scaling startups across the USA and India, several of which have evolved into successful growth ventures. With over 30 years of global experience spanning the US, India, and Europe, he brings deep expertise in incubation, acceleration, business enablement, client management, and growth strategy.\n\nAs one of the early risk taking entrepreneurs within the team and a long standing associate of the founding General Partners, Santosh has played an important role in supporting the platform’s evolution & growth journey. He is closely involved in operations, with a strong focus on portfolio monitoring, stakeholder relationships, and managing complex operational dynamics across investments and strategic initiatives.",
    highlights: [],
  },
  {
    id: "yogesh-sakunia",
    name: "Yogesh Sakunia",
    role: "Principal",
    group: "Investment Team",
    photo: "/Assets/People/yogesh.jpg",
    location: "",
    focus: [],
    bio:
      "Yogesh Sakunia is an experienced finance professional with over 17 years of expertise across equity research, financial advisory, entrepreneurship, and education management. A Chartered Accountant with CFA Level I and Strategic CIMA credentials, he combines strong financial rigor with practical business and investment insight.\n\nAn entrepreneur in the skilling and mentoring space, he has helped shape the careers of numerous successful finance professionals while building deep expertise in consulting, valuation, and investor oriented decision making. He is an alumnus of Indian Institute of Management Calcutta. Yogesh brings a rare balance between the discipline and risk awareness of a Chartered Accountant and the upside seeking mindset of an investor, making him a strong operational and strategic anchor for the team.",
    highlights: [],
  },
  {
    id: "nikhil-avinash-chitra",
    name: "Nikhil Avinash Chitra",
    role: "Junior Partner",
    group: "Investment Team",
    photo: "",
    location: "",
    focus: [],
    bio:
      "Avinash has been associated with the firm since its greenfield stage and works closely with the Founding General Partners. Over the years, he has played multiple roles across the platform’s evolution from setup and strategic pivots to institutionalization gaining deep exposure to fund structuring, investment thesis development, deal flow management, and investment operations. As one of the youngest members of the team, he has operated in high pressure and fast moving environments, working closely alongside the execution intensive style of the General Partners.\n\nThis exposure has strengthened his adaptability, resilience, and ability to navigate complex situations with maturity beyond his years. Entrepreneurial by instinct, he brings a founder’s mindset to investing and execution, with long term ambitions of building ventures backed by a strong institutional and investment oriented foundation.",
    highlights: [],
  },
  {
    id: "m-kamesh-rao",
    name: "M Kamesh Rao",
    role: "Analyst",
    group: "Investment Team",
    photo: "",
    location: "",
    focus: [],
    bio:
      "As a Chartered Accountant, Kamesh brings a strong blend of financial acumen, real world forensic exposure, institutional grade due diligence capabilities, and risk assessment expertise. Working closely with the General Partner team, he has developed the ability to navigate complex personalities, diverse thought processes, and high pressure decision making environments with maturity and analytical discipline.\n\nHe is involved across deal origination, due diligence, financial modeling, transaction structuring, and investment execution, with past exposure to transactions exceeding USD 250 million across venture capital, banking, and risk consulting environments.\n\nPassionate about investing and institutional finance, Kamesh combines strategic thinking with execution focus to support scalable investment opportunities and long term value creation across emerging sectors. His long term ambition is to eventually build and manage an investment fund of his own.",
    highlights: [],
  },
  {
    id: "srb-ramesh-chandra",
    name: "SRB Ramesh Chandra",
    role: "Entrepreneur in Residence",
    group: "Operating Partners",
    photo: "",
    location: "",
    focus: [],
    bio:
      "S R B Ramesh Chandra is a seasoned industrialist and business leader with extensive experience across the cement and infrastructure sectors. He is one of the original promoters of Bheema Cements and has played a significant role in industrial operations, project development, manufacturing scale up, and large scale business management over several decades. With deep expertise in infrastructure led growth, asset intensive industries, and execution driven operations, he brings valuable insight into building, scaling, and managing complex industrial enterprises.\n\nHis experience spans project execution, operational management, industrial ecosystems, and long term business development within highly capital intensive sectors. As one of the platform’s Entrepreneurs in Residence, he is actively supporting SVP in the development of a 10 MTPA integrated cement plant designed around ESG aligned operational and sustainability norms. His focus lies in creating scalable, efficient, and future ready industrial infrastructure capable of addressing the capital intensity and operational inefficiencies that continue to challenge the cement sector.",
    highlights: [],
  },
  {
    id: "swaroop-chandra",
    name: "Swaroop Chandra",
    role: "Entrepreneur in Residence",
    group: "Operating Partners",
    photo: "/Assets/People/swaroop.jpeg",
    location: "",
    focus: [],
    bio:
      "Swarop Chandra brings experience across industrial operations, infrastructure development, and business management through his association with Bheema Cements. As part of the promoter family behind Bheema Cements, he has had close exposure to the evolution of a greenfield cement enterprise since the 1990s, giving him deep firsthand insight into the opportunities and systemic challenges that shape large scale infrastructure industries. Educated in the UK and exposed to both global perspectives and Indian industrial realities, he brings a nuanced understanding of how critical infrastructure businesses evolve, scale, and often struggle due to structural, financial, and policy related constraints.\n\nHe is also extremely well connected with HNIs and UHNIs across Andhra Pradesh and Telangana, maintaining strong relationships within industrial, business, and investment circles. He serves on the board of Vasavi Group of Institutions, adding to his exposure across education, institutional governance, and business ecosystems. Currently, he is focused on establishing a specialized solution center for the cement industry designed to support private equity firms and institutional investors in evaluating investments, operational risks, efficiency gaps, and long term industrial value creation opportunities within the sector.",
    highlights: [],
  },
  {
    id: "abhyuday-sharma",
    name: "Abhyuday Sharma",
    role: "Management Trainee",
    group: "Investment Team",
    photo: "",
    location: "",
    focus: [],
    bio:
      "Abhyuday Sharma brings a strong analytical and research driven approach to investing, with interests spanning venture capital, technology, and innovation led businesses. A graduate of the 5 year Integrated Master of Science in Economics program at Indian Institute of Technology Kharagpur, he combines technical depth with a sharp understanding of emerging markets, scalable business models, and entrepreneurial ecosystems.\n\nHe began his journey with the firm as an intern and continues to work closely with the team in a Management Trainee role, gaining exposure across investment research, strategy, and transaction execution. His focus lies in supporting the General Partners in strategic decision making while bringing structured, economist driven thinking and analytical discipline to the investment process.",
    highlights: [],
  },
  {
    id: "kashish-goyal",
    name: "Kashish Goyal",
    role: "Management Trainee",
    group: "Investment Team",
    photo: "",
    location: "",
    focus: [],
    bio:
      "Kashish Goyal is a MBA from Woxsen University with a strong flair for customer and stakeholder relationship management. As a Management Trainee, her focus lies in ensuring seamless engagement and coordination across the firm’s diverse stakeholder ecosystem, including investors, partners, team, portfolio companies, and service partners.\n\nWith a people centric and professionally driven approach, she plays a key role in supporting communication, relationship continuity, and organizational coordination across the platform. She aspires to build her mark in the complex private equity ecosystem by bridging academic understanding of investments with the practical demands of corporate execution and stakeholder management.",
    highlights: [],
  },
  {
    id: "kiran-kumar-palisetty",
    name: "Kiran Kumar Palisetty",
    role: "Admin",
    group: "Operating Partners",
    photo: "/Assets/People/kiran.jpg",
    location: "",
    focus: [],
    bio:
      "Kiran Kumar Palisetti is part of the operations team, supporting coordination functions. Having previously worked as a technician in an automotive company, he brings a hands on, execution driven mindset and a strong problem solving attitude to the team. Kiran manages events, meetings, logistics, and real time execution demands with reliability and adaptability. His ability to step into fast moving situations and get things done makes him an important support pillar within the organization.",
    highlights: [],
  },
];

export const PEOPLE_GROUPS: PeopleGroup[] = [
  "Leadership",
  "Advisory Board",
  "Investment Team",
  "Operating Partners",
];
