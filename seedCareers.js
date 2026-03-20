

import admin from "firebase-admin";
import fs from "fs";

// 🔐 Load service account key
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

// 🔥 Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// 📦 Firestore reference
const db = admin.firestore();

// ================== DATA ==================

const sectors = [
  "IT",
  "AGRICULTURE",
  "GOVERNMENT",
  "EDUCATION",
  "BANKING",
  "HEALTHCARE",
];
const sampleRoles = {
  IT: [
    ["Flutter Developer", "Build cross-platform mobile apps", "₹6–16 LPA"],
    ["Frontend Developer", "Create performant web UIs", "₹6–18 LPA"],
    ["Backend Developer", "Design APIs and services", "₹7–20 LPA"],
    ["Full Stack Dev", "Own end-to-end features", "₹8–22 LPA"],
    ["Data Analyst", "Analyze business data", "₹6–14 LPA"],
    ["Data Engineer", "Build data pipelines", "₹8–22 LPA"],
    ["ML Engineer", "Deploy ML models", "₹10–28 LPA"],
    ["DevOps Engineer", "Automate CI/CD", "₹8–20 LPA"],
    ["Cloud Engineer", "Manage cloud infra", "₹9–22 LPA"],
    ["QA Engineer", "Ensure quality via tests", "₹5–12 LPA"],
    ["Security Engineer", "Secure apps/infrastructure", "₹10–26 LPA"],
    ["Product Manager", "Lead product strategy", "₹15–35 LPA"],
    ["UX Designer", "Design intuitive experiences", "₹6–18 LPA"],
    ["BI Developer", "Build dashboards", "₹7–16 LPA"],
    ["Technical Writer", "Document products", "₹5–12 LPA"]
  ],
  AGRICULTURE: [
    ["Agronomist", "Advise crop planning", "₹3–8 LPA"],
    ["Agri Produce Manager", "Oversee procurement", "₹4–9 LPA"],
    ["Farm Manager", "Run farm operations", "₹3–7 LPA"],
    ["Supply Chain Coordinator", "Manage logistics", "₹4–8 LPA"],
    ["Quality Inspector", "Ensure product quality", "₹3–6 LPA"],
    ["Agri Extension Officer", "Train farmers", "₹3–7 LPA"],
    ["AgriTech Sales", "Sell inputs/solutions", "₹4–9 LPA"],
    ["Soil Scientist", "Analyze soil health", "₹4–9 LPA"],
    ["Irrigation Specialist", "Optimize water use", "₹4–8 LPA"],
    ["Horticulture Specialist", "Manage fruits/vegetables", "₹3–7 LPA"],
    ["Post-Harvest Specialist", "Reduce losses", "₹4–9 LPA"],
    ["FPO Coordinator", "Support producer orgs", "₹3–7 LPA"],
    ["Seed Production Officer", "Plan seed cultivation", "₹4–8 LPA"],
    ["Agri Export Executive", "Handle exports", "₹5–10 LPA"],
    ["Cold Chain Ops", "Manage cold storage", "₹4–9 LPA"]
  ],
  
  GOVERNMENT: [
    ["Civil Services (UPSC)", "Policy & administration", "₹10–20 LPA (CTC)"],
    ["State PSC Admin", "State-level admin", "₹8–16 LPA (CTC)"],
    ["RRB Technical JE", "Railways technical", "₹5–9 LPA"],
    ["Bank Clerk", "Public sector banking", "₹4–7 LPA"],
    ["Bank PO", "Branch operations", "₹6–12 LPA"],
    ["SSC CGL", "Various group B/C posts", "₹5–10 LPA"],
    ["Police SI", "Law enforcement", "₹5–9 LPA"],
    ["Village Extension Officer", "Rural development", "₹3–6 LPA"],
    ["Municipal Engineer", "Urban projects", "₹6–12 LPA"],
    ["Forest Ranger", "Wildlife/forest mgmt", "₹5–9 LPA"],
    ["Public Health Inspector", "Community health", "₹4–8 LPA"],
    ["Junior Accountant", "Govt accounting", "₹4–7 LPA"],
    ["Junior Engineer (PWD)", "Public works", "₹5–9 LPA"],
    ["Transport Inspector", "Compliance & safety", "₹4–8 LPA"],
    ["Assistant Section Officer", "Dept operations", "₹5–9 LPA"]
  ],
  
  EDUCATION: [
    ["Instructional Designer", "Design learning content", "₹5–12 LPA"],
    ["School Teacher", "Teach K–12", "₹3–8 LPA"],
    ["Lecturer", "College teaching", "₹5–12 LPA"],
    ["Academic Counselor", "Guide students", "₹4–8 LPA"],
    ["EdTech Content Writer", "Create course content", "₹4–9 LPA"],
    ["Curriculum Developer", "Plan curricula", "₹5–12 LPA"],
    ["Training Facilitator", "Run workshops", "₹4–9 LPA"],
    ["Assessment Designer", "Create evaluations", "₹5–10 LPA"],
    ["LMS Administrator", "Manage e-learning", "₹5–10 LPA"],
    ["Education Researcher", "Study pedagogy", "₹5–11 LPA"],
    ["Special Educator", "Support learners", "₹4–9 LPA"],
    ["Academic Operations", "Run programs", "₹5–10 LPA"],
    ["Career Coach", "Advise careers", "₹4–9 LPA"],
    ["E-learning Developer", "Build modules", "₹5–11 LPA"],
    ["Academic QA", "Quality audits", "₹4–9 LPA"]
  ],
  BANKING: [
    ["Bank PO", "Branch operations", "₹6–12 LPA"],
    ["Bank Clerk", "Customer service", "₹4–7 LPA"],
    ["Credit Analyst", "Assess loans", "₹6–12 LPA"],
    ["Relationship Manager", "Manage clients", "₹6–13 LPA"],
    ["Investment Analyst", "Analyze markets", "₹8–18 LPA"],
    ["Risk Analyst", "Manage risk", "₹7–15 LPA"],
    ["Treasury Analyst", "Liquidity & FX", "₹8–18 LPA"],
    ["Compliance Officer", "Regulatory adherence", "₹7–15 LPA"],
    ["Operations Analyst", "Process optimization", "₹6–12 LPA"],
    ["Mortgage Advisor", "Housing loans", "₹5–10 LPA"],
    ["Collections Officer", "Recover dues", "₹4–8 LPA"],
    ["Trade Finance Exec", "Imports/exports", "₹6–12 LPA"],
    ["Financial Planner", "Personal finance", "₹5–10 LPA"],
    ["Wealth Manager", "HNI portfolios", "₹9–20 LPA"],
    ["Branch Manager", "Branch leadership", "₹10–20 LPA"]
  ],
  
  HEALTHCARE: [
    ["Health Data Analyst", "Analyze hospital KPIs", "₹6–14 LPA"],
    ["Medical Coder", "Code clinical data", "₹4–8 LPA"],
    ["Hospital Admin", "Ops management", "₹6–14 LPA"],
    ["Clinical Research Associate", "Run trials", "₹6–12 LPA"],
    ["Public Health Analyst", "Community programs", "₹6–12 LPA"],
    ["Pharma Sales", "Promote drugs", "₹5–10 LPA"],
    ["Biomedical Engineer", "Medical devices", "₹6–12 LPA"],
    ["Radiology Tech", "Imaging specialist", "₹4–9 LPA"],
    ["Diagnostic Lab Manager", "Lab operations", "₹6–12 LPA"],
    ["Health Informatics", "Data & systems", "₹7–15 LPA"],
    ["Quality & Accreditation", "NABH/NABL audits", "₹6–12 LPA"],
    ["Clinical Ops Coordinator", "Dept coordination", "₹5–10 LPA"],
    ["Patient Experience Lead", "Improve PX", "₹5–10 LPA"],
    ["Medical Writer", "Clinical documentation", "₹5–11 LPA"],
    ["Telehealth Coordinator", "Virtual care", "₹5–10 LPA"]
  ],
  resources: [
    { label: "Behance", url: "https://www.behance.net" },
    { label: "Canva Design School", url: "https://www.canva.com/learn/" },
    { label: "Skillshare Creative", url: "https://www.skillshare.com" },
    { label: "Coursera Arts", url: "https://www.coursera.org/browse/arts-and-humanities" },
    { label: "National Gallery of Art", url: "https://www.nga.gov" }
  ]
};

const roadmaps = {
  IT: [
    "Master programming fundamentals (JavaScript, Python, etc.)",
    "Learn frameworks like React, Flutter, Node.js",
    "Build real projects and contribute to open source",
    "Gain internships or freelance experience",
    "Apply for developer roles and grow into senior positions"
  ],
  AGRICULTURE: [
    "Study basics of crop science and soil health",
    "Get a degree/diploma in agriculture or related fields",
    "Work on farms or agri‑projects for hands‑on experience",
    "Learn modern tools (IoT, drones, agri‑tech platforms)",
    "Specialize in agronomy, supply chain, or agri‑business"
  ],
  GOVERNMENT: [
    "Understand Indian polity, economy, and current affairs",
    "Prepare for UPSC/SSC/Bank exams with coaching or self‑study",
    "Clear preliminary and main exams",
    "Complete training and probation in government service",
    "Progress into senior administrative roles"
  ],
  EDUCATION: [
    "Earn a degree in education or subject specialization",
    "Develop teaching skills and pedagogy knowledge",
    "Start as a school teacher or lecturer",
    "Adopt digital tools and e‑learning platforms",
    "Advance into curriculum design or academic leadership"
  ],
  BANKING: [
    "Learn basics of finance, accounting, and economics",
    "Prepare for IBPS/Bank PO/Clerk exams",
    "Gain entry‑level banking experience",
    "Specialize in credit, risk, or investment analysis",
    "Move into branch management or corporate banking"
  ],
  HEALTHCARE: [
    "Complete relevant medical or paramedical degree",
    "Get certified in healthcare specialization",
    "Work in hospitals, clinics, or research labs",
    "Learn health informatics and modern medical tools",
    "Advance into senior clinical or administrative roles"
  ]
};

const resourcesBySector = {
  IT: [
    { label: "React Docs", url: "https://react.dev" },
    { label: "Flutter Docs", url: "https://docs.flutter.dev" },
    { label: "AWS Training", url: "https://aws.amazon.com/training/" },
    { label: "Google Cloud Learning", url: "https://cloud.google.com/training" },
    { label: "Microsoft Learn", url: "https://learn.microsoft.com" },
    { label: "FreeCodeCamp", url: "https://www.freecodecamp.org" },
    { label: "Coursera IT Courses", url: "https://www.coursera.org/browse/computer-science" },
    { label: "Udemy Programming", url: "https://www.udemy.com/courses/development/" },
    { label: "Kaggle Learn", url: "https://www.kaggle.com/learn" }
  ],
  AGRICULTURE: [
    { label: "ICAR eCourses", url: "https://ecourses.icar.gov.in" },
    { label: "FAO Knowledge Hub", url: "https://www.fao.org/home/en/" },
    { label: "NABARD Training", url: "https://www.nabard.org" },
    { label: "APEDA Export Guide", url: "https://apeda.gov.in/apedawebsite/" },
    { label: "Agri Extension Portal", url: "https://agri-extension.com" },
    { label: "TNAU Agritech Portal", url: "https://agritech.tnau.ac.in" },
    { label: "World Bank Agriculture", url: "https://www.worldbank.org/en/topic/agriculture" },
    { label: "AgFunder News", url: "https://agfundernews.com" }
  ],
  GOVERNMENT: [
    { label: "UPSC Official", url: "https://upsc.gov.in" },
    { label: "SSC Official", url: "https://ssc.nic.in" },
    { label: "RRB Recruitment", url: "https://rrbcdg.gov.in" },
    { label: "IBPS Bank Exams", url: "https://www.ibps.in" },
    { label: "Civil Services India", url: "https://www.civilserviceindia.com" },
    { label: "PRS Legislative Research", url: "https://prsindia.org" },
    { label: "IndiaGov Portal", url: "https://www.india.gov.in" },
    { label: "NITI Aayog Reports", url: "https://www.niti.gov.in" }
  ],
  EDUCATION: [
    { label: "NCERT Resources", url: "https://ncert.nic.in" },
    { label: "UGC India", url: "https://www.ugc.ac.in" },
    { label: "EdX Courses", url: "https://www.edx.org" },
    { label: "Coursera Education", url: "https://www.coursera.org/browse/education" },
    { label: "Khan Academy", url: "https://www.khanacademy.org" },
    { label: "Teach For India", url: "https://www.teachforindia.org" },
    { label: "UNESCO Education", url: "https://www.unesco.org/en/education" },
    { label: "FutureLearn Teaching", url: "https://www.futurelearn.com/subjects/teaching" }
  ],
  BANKING: [
    { label: "RBI Official", url: "https://www.rbi.org.in" },
    { label: "SEBI India", url: "https://www.sebi.gov.in" },
    { label: "NSE India", url: "https://www.nseindia.com" },
    { label: "Investopedia", url: "https://www.investopedia.com" },
    { label: "Coursera Finance", url: "https://www.coursera.org/browse/business/finance" },
    { label: "CFA Institute", url: "https://www.cfainstitute.org" },
    { label: "World Bank Finance", url: "https://www.worldbank.org/en/topic/financialsector" },
    { label: "IMF Finance Resources", url: "https://www.imf.org/en/Data" }
  ],
  HEALTHCARE: [
    { label: "WHO Health Topics", url: "https://www.who.int/health-topics" },
    { label: "NIH Clinical Trials", url: "https://clinicaltrials.gov" },
    { label: "CDC Healthcare Resources", url: "https://www.cdc.gov" },
    { label: "PubMed", url: "https://pubmed.ncbi.nlm.nih.gov" },
    { label: "BMJ Learning", url: "https://learning.bmj.com" },
    { label: "Coursera Healthcare", url: "https://www.coursera.org/browse/health" },
    { label: "MedlinePlus", url: "https://medlineplus.gov" },
    { label: "NABH Accreditation", url: "https://www.nabh.co" }
  ],
};

// ================== HELPERS ==================

function createDoc(sector, role, index) {
  const [title, description, salary] = role;

  const id = `${sector.toLowerCase()}-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")}-${index}`;

  return {
    id,
    sector,
    title,
    description,
    salaryRange: salary,
    skills: ["Communication", "Domain Knowledge", "Problem Solving"],
    roadmap: roadmaps[sector] || [],
    resources: resourcesBySector[sector] || [],
    educationRequirement: "Relevant degree / certification",
    growth: "Moderate to high growth",
    cities: ["Pan India"],
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  };
}

// ================== SEED SCRIPT ==================

async function seedCareers() {
  for (const sector of sectors) {
    const roles = sampleRoles[sector];

    for (let i = 0; i < roles.length; i++) {
      const docData = createDoc(sector, roles[i], i);

      await db.collection("careers").doc(docData.id).set(docData);
      console.log(`✅ Seeded: ${docData.id}`);
    }
  }

  console.log("🎉 Career seeding completed successfully!");
  process.exit(0);
}

seedCareers().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
