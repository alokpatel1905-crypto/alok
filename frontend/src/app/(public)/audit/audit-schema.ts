export interface SubCriterion {
  id: string;
  title: string;
  hint?: string;
}

export interface AuditSection {
  id: string;
  number: number;
  title: string;
  purpose: string;
  icon: string;
  color: string;
  subCriteria: SubCriterion[];
}

export const AUDIT_SECTIONS: AuditSection[] = [
  {
    id: 'governance',
    number: 1,
    title: 'Governance & Leadership',
    purpose:
      "To assess whether the school's leadership, governance systems, and institutional planning formally support and drive greening education and sustainability outcomes.",
    icon: '🏛️',
    color: '#1C2B1A',
    subCriteria: [
      {
        id: 'g1',
        title: 'Vision and Policy Commitment',
        hint: 'The school has a written sustainability/green school policy approved by leadership.',
      },
      {
        id: 'g2',
        title: 'Leadership Accountability',
        hint: 'School leadership (principal/management) is formally accountable for greening education and sustainability performance.',
      },
      {
        id: 'g3',
        title: 'Green School Committee',
        hint: 'A formal green school committee exists with representation from leadership, teachers, students, support staff, and parents/community.',
      },
      {
        id: 'g4',
        title: 'Annual Green Action Plan',
        hint: 'The school prepares an annual green action plan with goals, activities, timelines, and responsible persons.',
      },
      {
        id: 'g5',
        title: 'Budget Allocation for Sustainability',
        hint: 'The school allocates budget/resources for sustainability activities, infrastructure, and greening education initiatives.',
      },
      {
        id: 'g6',
        title: 'Integration into School Development Planning',
        hint: 'Sustainability is integrated into the school development/improvement plan and institutional priorities.',
      },
      {
        id: 'g7',
        title: 'Monitoring and Review Mechanism',
        hint: 'The school monitors progress through indicators, review meetings, internal audits, and corrective actions.',
      },
      {
        id: 'g8',
        title: 'Student Leadership and Participation',
        hint: 'Students have structured roles in eco-clubs, audits, campaigns, and sustainability decision-making.',
      },
      {
        id: 'g9',
        title: 'Staff Capacity and Role Assignment',
        hint: 'Teachers and staff have defined sustainability responsibilities and receive orientation/training.',
      },
      {
        id: 'g10',
        title: 'Stakeholder Engagement and Transparency',
        hint: 'The school communicates sustainability progress to parents/community and maintains evidence/records of actions.',
      },
    ],
  },
  {
    id: 'design',
    number: 2,
    title: 'Sustainable Design',
    purpose:
      "To assess whether the school campus design, built environment, and physical planning support climate resilience, resource efficiency, safety, and learning.",
    icon: '🏗️',
    color: '#2D5016',
    subCriteria: [
      {
        id: 'd1',
        title: 'Climate-Responsive Site Planning',
        hint: 'Campus layout responds to sun path, wind direction, heat exposure, and local climatic conditions.',
      },
      {
        id: 'd2',
        title: 'Daylighting in Learning Spaces',
        hint: 'Classrooms and common spaces are designed to maximize natural daylight and reduce artificial lighting dependence.',
      },
      {
        id: 'd3',
        title: 'Natural Ventilation and Thermal Comfort',
        hint: 'Buildings support cross-ventilation, passive cooling, and shaded openings for indoor comfort.',
      },
      {
        id: 'd4',
        title: 'Energy-Efficient Building Envelope',
        hint: 'Roof, walls, windows, and shading systems reduce heat gain and energy demand.',
      },
      {
        id: 'd5',
        title: 'Water-Sensitive Design Features',
        hint: 'Campus design incorporates rainwater harvesting, drainage planning, permeable surfaces, and water reuse provisions.',
      },
      {
        id: 'd6',
        title: 'Green Landscape and Biodiversity Design',
        hint: 'Campus design includes trees, native planting, shaded areas, habitat spaces, and learning gardens.',
      },
      {
        id: 'd7',
        title: 'Waste-Smart Infrastructure by Design',
        hint: 'Campus has designated and functional spaces for segregation, composting, and safe waste storage/collection.',
      },
      {
        id: 'd8',
        title: 'Safe, Inclusive, and Accessible Design',
        hint: 'Infrastructure ensures safety and accessibility for all learners (ramps, pathways, handrails, universal access).',
      },
      {
        id: 'd9',
        title: 'Low-Impact and Sustainable Materials Use',
        hint: 'Buildings/campus improvements use local, recycled, low-toxicity, and durable materials where feasible.',
      },
      {
        id: 'd10',
        title: 'Green Commuting and Parking Infrastructure',
        hint: 'School campus design supports low-emission commuting and safe parking through walkability, cycle parking, managed vehicle movement, and no-idling zones.',
      },
    ],
  },
  {
    id: 'water',
    number: 3,
    title: 'Water Management Practices',
    purpose:
      "To assess how effectively the school governs, conserves, monitors, reuses, and educates around water resources.",
    icon: '💧',
    color: '#1565C0',
    subCriteria: [
      {
        id: 'w1',
        title: 'Water Governance, Policy and Responsibility',
        hint: 'The school has a water management policy/SOP, defined roles, and periodic review of water conservation actions.',
      },
      {
        id: 'w2',
        title: 'Water Source Mapping and Supply Security',
        hint: 'The school documents all water sources and plans for water security during shortages.',
      },
      {
        id: 'w3',
        title: 'Water Use Monitoring and Recordkeeping',
        hint: 'The school tracks water consumption through logs/meter readings and reviews trends.',
      },
      {
        id: 'w4',
        title: 'Water-Efficient Plumbing Fixtures',
        hint: 'Water-efficient taps, flush systems, and fittings are installed and maintained.',
      },
      {
        id: 'w5',
        title: 'Leak Detection, Repair and Preventive Maintenance',
        hint: 'The school has a system to identify leaks and conduct timely repairs and preventive checks.',
      },
      {
        id: 'w6',
        title: 'Rainwater Harvesting (Roof and Non-Roof)',
        hint: 'Rooftop and/or surface runoff rainwater harvesting systems are installed and maintained.',
      },
      {
        id: 'w7',
        title: 'Wastewater Treatment and Safe Disposal',
        hint: 'The school has wastewater treatment and/or safe disposal systems compliant with local norms.',
      },
      {
        id: 'w8',
        title: 'Greywater Reuse / Use of Treated Water',
        hint: 'Treated greywater/wastewater is reused safely for gardening, flushing, or cleaning where feasible.',
      },
      {
        id: 'w9',
        title: 'Water-Efficient Landscaping and Irrigation Design',
        hint: 'Landscape and irrigation systems reduce water demand through native plants, mulching, zoning, and efficient irrigation.',
      },
      {
        id: 'w10',
        title: 'Water Awareness, Student Participation and Continuous Improvement',
        hint: 'Students and staff are engaged in water conservation campaigns, audits, and annual improvement actions.',
      },
    ],
  },
  {
    id: 'energy',
    number: 4,
    title: 'Energy Management Practices',
    purpose:
      "To assess how effectively the school manages energy use, improves efficiency, and adopts clean energy systems and energy-saving behavior.",
    icon: '⚡',
    color: '#F57F17',
    subCriteria: [
      {
        id: 'e1',
        title: 'Energy Governance, Policy and Responsibility',
        hint: 'The school has an energy management policy/SOP, assigned responsibilities, and an annual energy-saving plan.',
      },
      {
        id: 'e2',
        title: 'Energy Use Monitoring and Recordkeeping',
        hint: 'The school tracks energy use through bills, meter readings, and periodic reviews.',
      },
      {
        id: 'e3',
        title: 'Energy Sub-Metering and Load Segregation',
        hint: 'Sub-metering or load-wise monitoring is used (where feasible) for better control of major consumption zones.',
      },
      {
        id: 'e4',
        title: 'Energy-Efficient Lighting Fixtures',
        hint: 'The school uses energy-efficient lighting systems (e.g., LED) and phases out inefficient fixtures.',
      },
      {
        id: 'e5',
        title: 'Energy-Efficient Fans and Air Movement Systems',
        hint: 'The school uses and maintains efficient fans/air movement systems to reduce electricity use.',
      },
      {
        id: 'e6',
        title: 'Energy-Efficient Appliances and Equipment',
        hint: 'Appliances and equipment are selected and maintained for energy efficiency (star-rated where applicable).',
      },
      {
        id: 'e7',
        title: 'Cooling Efficiency and Eco-Friendly Refrigerants',
        hint: 'Cooling systems are operated efficiently and use environmentally safer refrigerants where feasible.',
      },
      {
        id: 'e8',
        title: 'ODS Compliance and Refrigerant Management',
        hint: 'The school avoids/phases out ODS-based refrigerants and maintains servicing/leakage/replacement records.',
      },
      {
        id: 'e9',
        title: 'On-Site Renewable Energy Systems',
        hint: 'The school installs and/or uses on-site renewable energy systems (e.g., solar PV) with basic generation/use records.',
      },
      {
        id: 'e10',
        title: 'Thermal Energy and Energy-Saving Practices',
        hint: 'The school implements energy-saving practices and thermal energy systems (e.g., solar water heating where relevant).',
      },
    ],
  },
  {
    id: 'air',
    number: 5,
    title: 'Air Quality Level',
    purpose:
      "To assess how the school monitors, protects, and improves indoor and outdoor air quality for student and staff wellbeing.",
    icon: '🌬️',
    color: '#0277BD',
    subCriteria: [
      {
        id: 'a1',
        title: 'Outdoor Air Quality Risk Assessment',
        hint: 'The school identifies nearby pollution sources and assesses exposure risks.',
      },
      {
        id: 'a2',
        title: 'Indoor Ventilation Adequacy',
        hint: 'Learning and common spaces have adequate natural and/or mechanical ventilation.',
      },
      {
        id: 'a3',
        title: 'Classroom Airflow and Cross-Ventilation',
        hint: 'Classrooms are arranged and operated to support airflow and reduce stagnant indoor air.',
      },
      {
        id: 'a4',
        title: 'Dust Control in Campus and Classrooms',
        hint: 'The school implements dust-reduction measures in classrooms, pathways, and maintenance practices.',
      },
      {
        id: 'a5',
        title: 'Air Quality Monitoring and Recordkeeping',
        hint: 'The school monitors key air-quality indicators (where feasible) and maintains records.',
      },
      {
        id: 'a6',
        title: 'No Open Burning Policy and Practice',
        hint: 'The school prohibits open burning and follows safe waste disposal practices.',
      },
      {
        id: 'a7',
        title: 'Low-Emission Transport and Idling Control',
        hint: 'The school encourages low-emission commuting and enforces no-idling at pickup/drop zones.',
      },
      {
        id: 'a8',
        title: 'Ventilation Equipment / HVAC / Filter Maintenance',
        hint: 'Fans, ACs, coolers, purifiers, and ventilation systems are regularly maintained.',
      },
      {
        id: 'a9',
        title: 'Green Buffer and Pollution Mitigation Planting',
        hint: 'The school uses trees/hedges/green barriers to reduce dust and pollution exposure.',
      },
      {
        id: 'a10',
        title: 'Air Quality Awareness and Response Protocol',
        hint: 'The school runs awareness activities and has protocols for poor air-quality days.',
      },
    ],
  },
  {
    id: 'health',
    number: 6,
    title: 'Health & Hygiene',
    purpose:
      "To assess the school's systems for sanitation, safe water, nutrition, hygiene, physical wellbeing, and health-conscious campus practices.",
    icon: '🏥',
    color: '#AD1457',
    subCriteria: [
      {
        id: 'h1',
        title: 'Safe and Adequate Toilet Facilities',
        hint: 'The school provides sufficient, functional, clean, and gender-appropriate toilets.',
      },
      {
        id: 'h2',
        title: 'Handwashing and Hygiene Stations',
        hint: 'Handwashing points with water, soap, and hygiene messaging are available and functional.',
      },
      {
        id: 'h3',
        title: 'Safe Drinking Water Facility',
        hint: 'Safe, adequate, and accessible drinking water is provided for all learners and staff.',
      },
      {
        id: 'h4',
        title: 'Menstrual Hygiene Management and Dignity Provisions',
        hint: 'Menstrual hygiene support, privacy, disposal, and sensitization systems are in place (where applicable).',
      },
      {
        id: 'h5',
        title: 'Access to Healthy Food and Nutrition',
        hint: 'The school promotes healthy food systems and discourages unhealthy/junk food practices.',
      },
      {
        id: 'h6',
        title: 'Green Housekeeping and Sanitation Practices',
        hint: 'Cleaning practices use safe, low-toxicity materials and regular sanitation routines.',
      },
      {
        id: 'h7',
        title: 'Safe Use of Organic Fertilisers and Pesticides',
        hint: 'Gardens/landscape management avoids hazardous chemicals and prioritizes safe/organic alternatives.',
      },
      {
        id: 'h8',
        title: 'Minimum Sports and Physical Activity Amenities',
        hint: 'The school provides basic facilities/equipment for sports and physical activity.',
      },
      {
        id: 'h9',
        title: 'Dedicated Playground and Active Recreation Space',
        hint: 'The school provides a designated, safe play/active recreation area (or equivalent space).',
      },
      {
        id: 'h10',
        title: 'Health, Safety and Hygiene Awareness Systems',
        hint: 'The school conducts regular health and hygiene awareness, with basic protocols and records.',
      },
    ],
  },
  {
    id: 'waste',
    number: 7,
    title: 'Waste Management Practices',
    purpose:
      "To assess how effectively the school prevents, segregates, processes, reuses, and responsibly disposes of waste.",
    icon: '♻️',
    color: '#2E7D32',
    subCriteria: [
      {
        id: 'wm1',
        title: 'Waste Segregation at Source',
        hint: 'Waste is segregated at source using clearly labeled bins (wet, dry, sanitary, recyclable, hazardous/e-waste as applicable).',
      },
      {
        id: 'wm2',
        title: 'Organic Waste Management',
        hint: 'Organic waste is processed through composting or equivalent systems.',
      },
      {
        id: 'wm3',
        title: 'Dry Waste Collection and Sorting System',
        hint: 'Dry waste is collected, sorted, and stored safely for recycling/authorized pickup.',
      },
      {
        id: 'wm4',
        title: 'Safe Storage and Disposal of Sanitary Waste',
        hint: 'Sanitary and hygiene waste is handled separately and disposed of safely.',
      },
      {
        id: 'wm5',
        title: 'E-Waste and Hazardous Waste Handling',
        hint: 'E-waste and hazardous waste are identified and managed through authorized channels.',
      },
      {
        id: 'wm6',
        title: 'Waste Reduction and Low-Waste Procurement',
        hint: 'The school reduces waste through reusable systems and low-waste purchasing choices.',
      },
      {
        id: 'wm7',
        title: 'Reuse and Salvaged Materials Integration',
        hint: 'The school promotes reuse and the use of salvaged materials for learning and campus functions.',
      },
      {
        id: 'wm8',
        title: 'Sustainable Materials Use in Campus Works',
        hint: 'Campus repairs/improvements prefer eco-friendly, recycled-content, and local materials where feasible.',
      },
      {
        id: 'wm9',
        title: 'Waste Collection Partnerships and Recordkeeping',
        hint: 'The school maintains waste collection partnerships and basic records of disposal/recycling.',
      },
      {
        id: 'wm10',
        title: 'Waste Literacy, Student Participation and Monitoring',
        hint: 'Waste practices are supported by student participation, awareness, signage, and periodic monitoring.',
      },
    ],
  },
  {
    id: 'education',
    number: 8,
    title: 'Greening Education Practices',
    purpose:
      "To assess how deeply sustainability and climate-conscious learning are integrated into curriculum, pedagogy, school culture, and student experience.",
    icon: '📚',
    color: '#1B5E20',
    subCriteria: [
      {
        id: 'ed1',
        title: 'Sustainability Integration in Curriculum',
        hint: 'Sustainability and climate themes are integrated across subjects and grade levels.',
      },
      {
        id: 'ed2',
        title: 'Climate-Conscious Lesson Planning',
        hint: 'Lesson plans include local environmental issues, problem-solving, and responsible behavior.',
      },
      {
        id: 'ed3',
        title: 'Teacher Capacity Building in Greening Education',
        hint: 'Teachers receive training/orientation in greening education and sustainability pedagogy.',
      },
      {
        id: 'ed4',
        title: 'Experiential and Outdoor Learning',
        hint: 'Students engage in hands-on learning through gardens, audits, field activities, and campus systems.',
      },
      {
        id: 'ed5',
        title: 'Student-Led Green Action Projects',
        hint: 'Students implement structured sustainability projects with visible outcomes.',
      },
      {
        id: 'ed6',
        title: 'Sustainability Learning Assessment and Reflection',
        hint: 'The school assesses sustainability learning through projects, portfolios, presentations, or rubrics.',
      },
      {
        id: 'ed7',
        title: 'Eco-Club / Green Team Functionality',
        hint: 'An active eco-club/green team exists with regular meetings and assigned responsibilities.',
      },
      {
        id: 'ed8',
        title: 'Whole-School Greening Campaigns and Events',
        hint: 'The school organizes assemblies, campaigns, exhibitions, and events on environmental themes.',
      },
      {
        id: 'ed9',
        title: 'Community and Parent Engagement in Greening Education',
        hint: 'Parents and community stakeholders are engaged in greening education activities.',
      },
      {
        id: 'ed10',
        title: 'Campus as a Living Laboratory',
        hint: 'Campus infrastructure and systems are actively used as daily learning tools.',
      },
    ],
  },
  {
    id: 'innovation',
    number: 9,
    title: 'Greening Innovation',
    purpose:
      "To assess the school's capacity to foster student-led, locally relevant, and practical innovation for sustainability challenges.",
    icon: '💡',
    color: '#E65100',
    subCriteria: [
      {
        id: 'i1',
        title: 'Student-Led Green Innovation Projects',
        hint: 'Students create original/adapted solutions for local sustainability problems.',
      },
      {
        id: 'i2',
        title: 'Innovation Problem-Solving Approach',
        hint: 'The school uses a structured innovation process (problem, prototype, test, improve).',
      },
      {
        id: 'i3',
        title: 'Low-Cost and Local Solutions Development',
        hint: 'Innovation emphasizes local materials, reuse, and frugal/context-appropriate design.',
      },
      {
        id: 'i4',
        title: 'Eco-STEM / Maker-Based Sustainability Learning',
        hint: 'Students apply STEM and maker skills to sustainability-focused innovation.',
      },
      {
        id: 'i5',
        title: 'Prototype Development and Demonstration',
        hint: 'Students develop and demonstrate working models/prototypes.',
      },
      {
        id: 'i6',
        title: 'Innovation Integration with Campus Operations',
        hint: 'Innovations are applied to improve real school systems and practices.',
      },
      {
        id: 'i7',
        title: 'Green Innovation Mentorship and Guidance',
        hint: 'Students receive mentorship from teachers, alumni, experts, NGOs, or local practitioners.',
      },
      {
        id: 'i8',
        title: 'Documentation, Testing and Improvement Cycle',
        hint: 'Innovation work is documented, tested, and improved iteratively.',
      },
      {
        id: 'i9',
        title: 'Innovation Showcasing and Knowledge Sharing',
        hint: 'The school provides platforms to present and share innovations.',
      },
      {
        id: 'i10',
        title: 'Innovation Impact and Scalability',
        hint: 'The school tracks outcomes and explores replication/scaling of successful innovations.',
      },
    ],
  },
  {
    id: 'localization',
    number: 10,
    title: 'Localization of Education',
    purpose:
      "To assess how well the school connects learning with local language, culture, ecology, community, and place-based sustainability realities.",
    icon: '🌍',
    color: '#4527A0',
    subCriteria: [
      {
        id: 'l1',
        title: 'Local Community Engagement in Learning',
        hint: 'Student learning is connected with local community realities, institutions, and issues.',
      },
      {
        id: 'l2',
        title: 'Partnerships with Local NGOs / CBOs / Civil Society',
        hint: 'The school collaborates with local organizations to support sustainability learning.',
      },
      {
        id: 'l3',
        title: 'Parent and Family Engagement in Greening Education',
        hint: 'Parents/families participate as co-educators in sustainability and values-based learning.',
      },
      {
        id: 'l4',
        title: 'Alumni Engagement for Local Relevance and Mentoring',
        hint: 'Alumni contribute to mentoring, field exposure, and local pathways.',
      },
      {
        id: 'l5',
        title: 'Integration of Local Language in Learning and Communication',
        hint: 'The school uses local/regional language meaningfully in greening education and school communication.',
      },
      {
        id: 'l6',
        title: 'Promotion of Local Culture, Heritage and Values',
        hint: 'Teaching-learning includes local culture, traditions, ethics, and ecological heritage.',
      },
      {
        id: 'l7',
        title: 'Indigenous Games, Sports and Physical Culture',
        hint: 'The school promotes local/indigenous games and traditional physical activities.',
      },
      {
        id: 'l8',
        title: 'Local Nature Knowledge and Ecological Skills',
        hint: 'Students build place-based ecological knowledge and practical local nature skills.',
      },
      {
        id: 'l9',
        title: 'Participation in Local Fairs, Exhibitions and Public Platforms',
        hint: 'The school participates in local public platforms to showcase student learning and community contribution.',
      },
      {
        id: 'l10',
        title: 'Localized Curriculum Contextualization and Applied Learning',
        hint: 'Teaching and projects are adapted to local environmental, social, and economic realities.',
      },
    ],
  },
];

export const TOTAL_STEPS = AUDIT_SECTIONS.length + 2; // profile + 10 sections + consent
