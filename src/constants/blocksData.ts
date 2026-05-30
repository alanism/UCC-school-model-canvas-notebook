export interface DecisionOption {
  label: string;
  text: string;
}

export interface DecisionGrid {
  title: string;
  options: DecisionOption[];
}

export interface BlockStaticData {
  id: string;
  label: string;
  category: string;
  color: string; // Accent color hex
  explainer: string;
  guidingQuestions: string[];
  exampleGood: string;
  exampleWeak: string;
  templateFormat?: string;
  grids?: DecisionGrid[];
}

export const BLOCKS_STATIC_DATA: Record<string, BlockStaticData> = {
  teaching_approach: {
    id: 'teaching_approach',
    label: 'Teaching Approach',
    category: 'structural_frame',
    color: '#4EABBC',
    explainer: 'How learning actually happens here. Methods beat intentions. Pick how you teach, or chaos will pick for you.',
    guidingQuestions: [
      'Who leads learning most days?',
      'How do we know when the child has learned something?',
      'What happens when motivation drops?'
    ],
    exampleGood: 'Our teaching approach is guided choice, measuring progress through hands-on demonstration, adjusting pace to fit the child\'s daily focus.',
    exampleWeak: 'We will teach nicely and learn when we feel like it, hoping they get smart.',
    templateFormat: 'Our teaching approach is mostly [control], with progress measured by [feedback]. Pacing is styled as [pacing].',
    grids: [
      {
        title: 'Content Control',
        options: [
          { label: 'Parent Led', text: 'Instruction is 100% parent-led and structured.' },
          { label: 'Guided Choice', text: 'Parent defines the scope; student chooses the sequence.' },
          { label: 'Student Led', text: 'Student initiates topics; parent facilitates resources.' },
          { label: 'Collaborative', text: 'Learning is a shared project-based dialogue.' }
        ]
      },
      {
        title: 'Pacing',
        options: [
          { label: 'Fixed Schedule', text: 'Follow a strict time-based daily routine.' },
          { label: 'Mastery Based', text: 'Move forward only when the concept is fully owned.' },
          { label: 'Cyclic', text: 'Deep dives followed by periods of rest and reflection.' },
          { label: 'Flow State', text: 'Work until the natural energy for the task dissipates.' }
        ]
      },
      {
        title: 'Feedback Method',
        options: [
          { label: 'Quantitative', text: 'Use scores and data to track progress.' },
          { label: 'Qualitative', text: 'Use verbal reviews and reflective journals.' },
          { label: 'Portfolio', text: 'Success is measured by the quality of finished work.' },
          { label: 'Demonstration', text: 'Student \'teaches back\' to prove understanding.' }
        ]
      }
    ]
  },
  child_interests: {
    id: 'child_interests',
    label: 'Child\'s Interests',
    category: 'structural_frame',
    color: '#E9604F',
    explainer: 'What pulls them in naturally. Interest is the strongest learning accelerator you have.',
    guidingQuestions: [
      'What does the child naturally return to?',
      'What topics create energy without much pushing?',
      'Should interests be used for joy, skill-building, projects, or business experiments?'
    ],
    exampleGood: 'We will use building projects and mechanics as a learning accelerator by connecting it to math and physics.',
    exampleWeak: 'They like video games so we will let them play games all day.',
    templateFormat: 'We will use [interests] as a learning accelerator by connecting it to [output]. We map this via [mapping] and [choice] choice level.',
    grids: [
      {
        title: 'Interest Mapping',
        options: [
          { label: 'Generalist', text: 'Explore many surface-level topics to find a spark.' },
          { label: 'Specialist', text: 'Go deep into one obsession for months or years.' },
          { label: 'Seasonal', text: 'Shift core focus every 6-8 weeks based on whim.' },
          { label: 'Anchored', text: 'Tie all core subjects to one primary interest.' }
        ]
      },
      {
        title: 'Choice Level',
        options: [
          { label: 'Full Freedom', text: 'Student decides 100% of the interest-based time.' },
          { label: 'The Menu', text: 'Parent offers 3-4 viable paths; student picks one.' },
          { label: 'Earned Choice', text: 'Interest time is \'unlocked\' by finishing core work.' },
          { label: 'Negotiated', text: 'Interests are pursued in partnership with parent goals.' }
        ]
      },
      {
        title: 'Output of Interest',
        options: [
          { label: 'Enjoyment', text: 'The goal is pure engagement and curiosity.' },
          { label: 'Skill Building', text: 'Turn interests into measurable, useful capabilities.' },
          { label: 'Exhibition', text: 'Interests must lead to a public show, talk, or blog.' },
          { label: 'Entrepreneur', text: 'Experiment with turning the interest into a business.' }
        ]
      }
    ]
  },
  learning_materials: {
    id: 'learning_materials',
    label: 'Learning Materials',
    category: 'tools_systems',
    color: '#4EABBC',
    explainer: 'What the student touches: books, videos, apps, tools. This is the fuel. Bad inputs = bad thinking.',
    guidingQuestions: [
      'What are the main sources of learning?',
      'Are we using a full curriculum or picking best-in-class resources?',
      'What materials are banned, limited, or low priority?'
    ],
    exampleGood: 'Our learning materials will prioritize classic living books and analog math tools, chosen for depth and tactile engagement.',
    exampleWeak: 'Whatever worksheets we find for free online, mixed with YouTube videos.',
    templateFormat: 'Our learning materials will prioritize [medium], chosen for [quality]. Curation follows an [philosophy] approach.',
    grids: [
      {
        title: 'Primary Medium',
        options: [
          { label: 'Physical Books', text: 'Primary focus on analog, high-quality print materials.' },
          { label: 'Digital Core', text: 'Leverage curated apps and online platforms.' },
          { label: 'First-Hand', text: 'Focus on primary sources, nature, and raw artifacts.' },
          { label: 'Hybrid', text: 'Strategic mix of screen-based and paper-based tools.' }
        ]
      },
      {
        title: 'Curation Philosophy',
        options: [
          { label: 'All-in-One', text: 'Use a pre-designed, comprehensive curriculum.' },
          { label: 'Eclectic', text: 'Hand-pick the best tool for each specific subject.' },
          { label: 'Living Books', text: 'Avoid textbooks; use high-quality literature only.' },
          { label: 'Minimalist', text: 'Fewer tools, used more deeply and repeatedly.' }
        ]
      },
      {
        title: 'Input Quality',
        options: [
          { label: 'Classic', text: 'Focus on the \'Great Books\' and timeless ideas.' },
          { label: 'Modern', text: 'Prioritize current science, tech, and global trends.' },
          { label: 'Functional', text: 'Focus on materials with immediate real-world utility.' },
          { label: 'Expressive', text: 'Focus on tools that allow for creation and output.' }
        ]
      }
    ]
  },
  physical_activities: {
    id: 'physical_activities',
    label: 'Physical Activities',
    category: 'child_development',
    color: '#4EABBC',
    explainer: 'Bodies power brains. If the body is bored, the mind will be too.',
    guidingQuestions: [
      'How often should the child move?',
      'What physical activities build discipline, joy, or social connection?',
      'What movement breaks support focus?'
    ],
    exampleGood: 'Physical activity will support learning through daily martial arts and wilderness hiking, with emphasis on discipline and mental rest.',
    exampleWeak: 'They run around in the yard sometimes when they get hyper.',
    templateFormat: 'Physical activity will support learning through [type] at a [discipline] pace, with emphasis on [connection].',
    grids: [
      {
        title: 'Activity Type',
        options: [
          { label: 'Team Sports', text: 'Focus on competition, cooperation, and social play.' },
          { label: 'Outdoor/Wild', text: 'Hiking, climbing, and interacting with the elements.' },
          { label: 'Strength/Skill', text: 'Martial arts, gymnastics, or lifting for discipline.' },
          { label: 'Functional', text: 'Walking, gardening, and daily chores as movement.' }
        ]
      },
      {
        title: 'Discipline Level',
        options: [
          { label: 'Free Play', text: 'Activity is unstructured and driven by the child\'s mood.' },
          { label: 'Consistent', text: 'Physical work happens at the same time every day.' },
          { label: 'High Effort', text: 'Pushing limits and tracking physical performance.' },
          { label: 'Movement Breaks', text: 'Short bursts of activity every hour of study.' }
        ]
      },
      {
        title: 'Mental Connection',
        options: [
          { label: 'Mental Rest', text: 'Exercise is a \'brain break\' from intellectual work.' },
          { label: 'Character', text: 'Using physical hardship to build mental endurance.' },
          { label: 'Connection', text: 'Activity is the primary time for making friends.' },
          { label: 'Complex Skill', text: 'Focus on learning difficult physical patterns (dance).' }
        ]
      }
    ]
  },
  social_efforts: {
    id: 'social_efforts',
    label: 'Socializing Efforts',
    category: 'child_development',
    color: '#4EABBC',
    explainer: 'How the student practices being human: friends, teamwork, conflict, cooperation.',
    guidingQuestions: [
      'Who should the child regularly interact with?',
      'How often does social time need to happen?',
      'What social skills are we intentionally training?'
    ],
    exampleGood: 'Social development will happen through multi-generational co-ops twice weekly, focusing on leadership and debate skills.',
    exampleWeak: 'Going to the playground and playing with whoever is there.',
    templateFormat: 'Social development will happen through [group] with [frequency], focusing on building [skill].',
    grids: [
      {
        title: 'Peer Group',
        options: [
          { label: 'Similar Age', text: 'Socializing primarily with kids of the same age/grade.' },
          { label: 'Multi-Generational', text: 'Focus on mixed-age groups and interacting with adults.' },
          { label: 'Community', text: 'Focus on local service and neighborhood belonging.' },
          { label: 'Interest-Based', text: 'Finding peers through shared obsessions and hobbies.' }
        ]
      },
      {
        title: 'Frequency',
        options: [
          { label: 'Daily Social', text: 'High-frequency interaction is essential every day.' },
          { label: 'Deep & Sparse', text: 'Fewer, but longer and more intense social sessions.' },
          { label: 'Event Driven', text: 'Focus on meetups, co-ops, and organized events.' },
          { label: 'Family First', text: 'Prioritize sibling and extended family bonds.' }
        ]
      },
      {
        title: 'Skill Focus',
        options: [
          { label: 'Harmony', text: 'Focus on empathy, kindness, and conflict avoidance.' },
          { label: 'Debate/Logic', text: 'Socializing as a place to test ideas and challenge others.' },
          { label: 'Leadership', text: 'Taking responsibility for organizing others.' },
          { label: 'Solitude', text: 'Learning to be social when needed, but happy alone.' }
        ]
      }
    ]
  },
  communication_style: {
    id: 'communication_style',
    label: 'Communication Style',
    category: 'operating_conditions',
    color: '#4EABBC',
    explainer: 'How feedback flows between student and adults. Praise, correction, boundaries. If this breaks, learning breaks.',
    guidingQuestions: [
      'How do adults give feedback?',
      'How are disagreements handled?',
      'What tone should authority have?'
    ],
    exampleGood: 'Our communication style will be discussion-based coaching, resolving conflicts immediately through logical consequences and mutual respect.',
    exampleWeak: 'Yelling when we get frustrated, or ignoring problems until they explode.',
    templateFormat: 'Our communication style will be [loop], with conflict handled through [conflict]. Authority is styled as [tone].',
    grids: [
      {
        title: 'Feedback Loop',
        options: [
          { label: 'Direct/Blunt', text: 'Feedback is clear, objective, and unemotional.' },
          { label: 'Gentle/Coaching', text: 'Focus on encouragement and soft corrections.' },
          { label: 'Discussion', text: 'Feedback is a two-way street; student critiques parent.' },
          { label: 'Periodic', text: 'Weekly reviews rather than constant daily correction.' }
        ]
      },
      {
        title: 'Conflict Strategy',
        options: [
          { label: 'Cool Off', text: 'Walk away when things heat up; talk only when calm.' },
          { label: 'Immediate', text: 'Resolve issues as they happen to prevent resentment.' },
          { label: 'Mediation', text: 'Use a neutral \'third thing\' (rules/values) to decide.' },
          { label: 'Logical Consequences', text: 'Actions have built-in results; talk is secondary.' }
        ]
      },
      {
        title: 'Authority Tone',
        options: [
          { label: 'Partnership', text: 'We are equals on a journey; decisions are consensus.' },
          { label: 'Mentor/Apprentice', text: 'I have the map, but you are the one walking the path.' },
          { label: 'The Captain', text: 'Clear hierarchy; parent makes the tough calls.' },
          { label: 'Coach', text: 'I ask the questions; you find the answers.' }
        ]
      }
    ]
  },
  child_learning_style: {
    id: 'child_learning_style',
    label: 'Child Learning Style',
    category: 'structural_frame',
    color: '#4EABBC',
    explainer: 'How this learner actually processes information. One size never fits all.',
    guidingQuestions: [
      'Does the child learn best visually, verbally, physically, socially, or logically?',
      'Does the child need quiet, interaction, or variety?',
      'Does the child thrive with repetition, novelty, or deep dives?'
    ],
    exampleGood: 'This child learns best through hands-on builder methods, especially when the environment is structured and permits physical movement.',
    exampleWeak: 'Standard style. They just need to study harder.',
    templateFormat: 'This child learns best through [preference] methods, especially when the environment is [env]. Learning pace focuses on [novelty].',
    grids: [
      {
        title: 'Input Preference',
        options: [
          { label: 'Visual', text: 'Learn best through diagrams, charts, and video.' },
          { label: 'Auditory', text: 'Learn through lectures, discussion, and audiobooks.' },
          { label: 'Hands-On', text: 'Must touch, build, and move to understand.' },
          { label: 'Logical/Math', text: 'Prefer abstract systems, codes, and logic.' }
        ]
      },
      {
        title: 'Processing Environment',
        options: [
          { label: 'Solitary', text: 'Needs quiet, alone time to digest new info.' },
          { label: 'Interactive', text: 'Processes thoughts by talking them out with others.' },
          { label: 'Ambient', text: 'Works better with background noise and activity.' },
          { label: 'Variable', text: 'Environment must change based on task difficulty.' }
        ]
      },
      {
        title: 'Novelty Seeking',
        options: [
          { label: 'Consistency', text: 'High comfort in repetition and predictable patterns.' },
          { label: 'Novelty', text: 'Needs frequent shifts in topic and method to stay alert.' },
          { label: 'Deep Dive', text: 'Stay on one topic until it is mastered, no matter what.' },
          { label: 'Horizontal', text: 'Prefer connecting many different ideas at once.' }
        ]
      }
    ]
  },
  technology_use: {
    id: 'technology_use',
    label: 'Technology Use',
    category: 'tools_systems',
    color: '#4EABBC',
    explainer: 'Where screens help and where they hurt. Tech should multiply thinking, not replace it.',
    guidingQuestions: [
      'What should technology be used for?',
      'What should technology not be used for?',
      'How should AI fit into learning?'
    ],
    exampleGood: 'Technology will be used as a creative hub for programming and media design, limiting passive streaming and distraction.',
    exampleWeak: 'We use the computer for everything, or we ban it entirely because screens are bad.',
    templateFormat: 'Technology will be used as a [role] focusing on [consumption] interaction, with AI integrated as [ai].',
    grids: [
      {
        title: 'Device Role',
        options: [
          { label: 'Pure Tool', text: 'Technology is only for specific utility (math, coding).' },
          { label: 'Portal', text: 'Tech is the gateway to global lectures and experts.' },
          { label: 'Creative Hub', text: 'Used primarily for video editing, design, or music.' },
          { label: 'Low-Tech', text: 'Deliberate restriction of screens to prevent fatigue.' }
        ]
      },
      {
        title: 'Consumption Ratio',
        options: [
          { label: 'Watch/Read', text: 'Tech used for high-quality passive intake (documentaries).' },
          { label: 'Interact', text: 'Tech used for interactive sims and dynamic learning.' },
          { label: 'Output Only', text: 'Screens only go on when the student is producing work.' },
          { label: 'Balanced', text: 'Controlled mix of learning intake and creative output.' }
        ]
      },
      {
        title: 'AI Integration',
        options: [
          { label: 'AI Tutor', text: 'AI used as a personalized Socratic guide.' },
          { label: 'Research', text: 'AI used to synthesize large amounts of data quickly.' },
          { label: 'Analog Only', text: 'AI is restricted to maintain fundamental skills.' },
          { label: 'Logic/Code', text: 'AI used to help build and debug student projects.' }
        ]
      }
    ]
  },
  enrichment_programs: {
    id: 'enrichment_programs',
    label: 'Enrichment Programs',
    category: 'tools_systems',
    color: '#4EABBC',
    explainer: 'The extras that turn curiosity into skill. Clubs, projects, mentors, weird stuff that makes learning stick.',
    guidingQuestions: [
      'Which experiences should every child have?',
      'Which mentors, coaches, classes, or clubs matter?',
      'Are we sampling many things or going deep on one?'
    ],
    exampleGood: 'Enrichment will focus on real-world apprenticeships and deep-mastery chess programs, keeping social exposure secondary.',
    exampleWeak: 'Signing up for whatever classes are available at the local community center.',
    templateFormat: 'Enrichment will focus on [focus] via [mentor] resources, at a [intensity] level.',
    grids: [
      {
        title: 'Mentor Source',
        options: [
          { label: 'In-Person', text: 'Classes, co-ops, and local clubs.' },
          { label: 'Mastery', text: 'Hiring specialized coaches (piano, coding, sport).' },
          { label: 'Virtual', text: 'Masterclasses, online bootcamps, and global tutors.' },
          { label: 'Apprenticeship', text: 'Shadowing real workers in the real world.' }
        ]
      },
      {
        title: 'Focus Area',
        options: [
          { label: 'The Arts', text: 'Music, theater, visual arts as the primary \'extra\'.' },
          { label: 'STEM', text: 'Robotics, science fairs, and math clubs.' },
          { label: 'Leadership', text: 'Volunteering, debate, and community involvement.' },
          { label: 'Exploration', text: 'Tinker time, long projects, and maker spaces.' }
        ]
      },
      {
        title: 'Intensity',
        options: [
          { label: 'The Sampler', text: 'Try 10 things once; see what sticks.' },
          { label: 'Deep Mastery', text: 'Pick one thing and practice until world-class.' },
          { label: 'Social First', text: 'Extras are primarily for making friends.' },
          { label: 'Casual', text: 'Low pressure; enrichment is only for fun.' }
        ]
      }
    ]
  },
  self_confidence: {
    id: 'self_confidence',
    label: 'Self Confidence Building',
    category: 'child_development',
    color: '#E9604F',
    explainer: 'How the student learns to try, fail, and try again. Confidence is trained, not gifted.',
    guidingQuestions: [
      'Does confidence come from encouragement, competence, public proof, or hard challenges?',
      'What risks should the child practice taking?',
      'How will progress be remembered?'
    ],
    exampleGood: 'Confidence will be built through competence and grit, supported by moonshot goals and visible tracking of hard wins.',
    exampleWeak: 'Saying "good job" a lot and making sure they never feel bad.',
    templateFormat: 'Confidence will be built through [driver], supported by [risk] and [talk] practices.',
    grids: [
      {
        title: 'Growth Driver',
        options: [
          { label: 'Encouragement', text: 'Build confidence through high levels of specific praise.' },
          { label: 'Competence', text: 'Confidence is an output of actually being good at things.' },
          { label: 'Validation', text: 'Share work with others to receive outside feedback.' },
          { label: 'Grit', text: 'Confidence comes from surviving difficult failures.' }
        ]
      },
      {
        title: 'Risk Level',
        options: [
          { label: 'Safe Wins', text: 'Build momentum with tasks the student can definitely do.' },
          { label: 'Moonshots', text: 'Encourage big, scary goals that might fail.' },
          { label: 'Social Risk', text: 'Focus on confidence in groups and public speaking.' },
          { label: 'Physical Risk', text: 'Use physical challenges to prove mental strength.' }
        ]
      },
      {
        title: 'Self-Talk & Reflection',
        options: [
          { label: 'Journaling', text: 'Internalize growth through private reflection.' },
          { label: 'Artifacts', text: 'Keep a \'win wall\' of past successes to look at.' },
          { label: 'Identity', text: 'Explicitly state family values and personal strengths.' },
          { label: 'Evidence', text: 'Focus on data and proof of improvement over time.' }
        ]
      }
    ]
  },
  family_beliefs: {
    id: 'family_beliefs',
    label: 'Family Beliefs',
    category: 'foundation',
    color: '#4EABBC',
    explainer: 'The values running this learning system. What gets rewarded, tolerated, and ignored shows up here.',
    guidingQuestions: [
      'What virtue matters most?',
      'How open should the child be to difficult or conflicting ideas?',
      'What motivates learning in this family?'
    ],
    exampleGood: 'Our family learning system values agency and treats learning as a preparation for life, remaining experimental and open to failures.',
    exampleWeak: 'We believe education is good and hope they get a decent job.',
    templateFormat: 'Our family learning system values [virtue] as a primary driver, taking an [risk] approach to ideas and leveraging [motivation] as a source.',
    grids: [
      {
        title: 'Primary Virtue',
        options: [
          { label: 'Agency', text: 'The ability to act on the world and take responsibility.' },
          { label: 'Curiosity', text: 'Maintaining a sense of wonder and constant inquiry.' },
          { label: 'Excellence', text: 'Commitment to doing difficult work at a high level.' },
          { label: 'Service', text: 'Using one\'s gifts to help the community and others.' }
        ]
      },
      {
        title: 'Risk Tolerance',
        options: [
          { label: 'Protected', text: 'Filter inputs to maintain a specific worldview.' },
          { label: 'Open', text: 'Engage with all ideas and learn to critique them.' },
          { label: 'Experimental', text: 'Value \'failure as learning\' above being right.' },
          { label: 'Inherited', text: 'Prioritize the wisdom of the past and traditions.' }
        ]
      },
      {
        title: 'Motivation Source',
        options: [
          { label: 'Internal', text: 'Focus on joy and innate drive; avoid rewards.' },
          { label: 'Standardized', text: 'Use grades and external goals as markers.' },
          { label: 'Identity', text: 'We do the work because it\'s \'who we are\' as a family.' },
          { label: 'Utility', text: 'Focus on the practical necessity of being capable.' }
        ]
      }
    ]
  },
  learning_environment: {
    id: 'learning_environment',
    label: 'Learning Environment',
    category: 'operating_conditions',
    color: '#4EABBC',
    explainer: 'Where learning happens. Chaos or calm? Distraction or focus? Space shapes behavior.',
    guidingQuestions: [
      'Where does learning happen best?',
      'What level of noise, light, comfort, or movement helps?',
      'Does the child need one stable place or rotating environments?'
    ],
    exampleGood: 'Learning will happen best in a minimalist home study environment with natural light and private ownership over workspace.',
    exampleWeak: 'Sitting at the kitchen counter while the TV is on and people are talking.',
    templateFormat: 'Learning will happen best in [vibe] settings, prioritizing [sensory] elements and a [ownership] layout.',
    grids: [
      {
        title: 'Spatial Vibe',
        options: [
          { label: 'Minimalist', text: 'Clean, empty surfaces; low visual clutter.' },
          { label: 'Resource Rich', text: 'Surrounded by books, art supplies, and tools.' },
          { label: 'No Desk', text: 'Learning happens anywhere: couch, floor, park.' },
          { label: 'Formal', text: 'Dedicated \'school room\' or desk to signal focus.' }
        ]
      },
      {
        title: 'Sensory Input',
        options: [
          { label: 'Silent', text: 'Deep silence is required for intellectual work.' },
          { label: 'Soundscape', text: 'Uses music or ambient noise to mask distractions.' },
          { label: 'Natural Light', text: 'Prioritize being near windows or outdoors.' },
          { label: 'Tactile', text: 'Focus on comfort: blankets, soft chairs, fidgets.' }
        ]
      },
      {
        title: 'Ownership',
        options: [
          { label: 'Communal', text: 'Learning happens in the heart of the home (kitchen).' },
          { label: 'Private Den', text: 'Child has absolute control over their own workspace.' },
          { label: 'The World', text: 'The primary environment is the city, museum, or forest.' },
          { label: 'Rotating', text: 'Move between 2-3 different locations daily.' }
        ]
      }
    ]
  },
  resources_committed: {
    id: 'resources_committed',
    label: 'Resources Commitment',
    category: 'energy_fuel',
    color: '#E9604F',
    explainer: 'Time, money, energy. What you\'re actually willing to invest—not what you wish you would.',
    guidingQuestions: [
      'How much time can the parent realistically commit?',
      'What budget exists for curriculum, tutors, travel, tools, or classes?',
      'What will the family not spend money or energy on?'
    ],
    exampleGood: 'We will commit 10 hours weekly, a moderate budget for high-quality books, focusing energy on static home-based learning loops.',
    exampleWeak: 'We want to spend $50,000 and 40 hours a week, but we both work full-time.',
    templateFormat: 'We will commit our resources focusing on a [priority] financial approach, dedicating [time] of parent support, anchored by a [energy] lifestyle.',
    grids: [
      {
        title: 'Financial Priority',
        options: [
          { label: 'Low Cost', text: 'Focus on free resources, libraries, and hand-me-downs.' },
          { label: 'Invested', text: 'Willing to spend on the best books and tools available.' },
          { label: 'Travel/Ex', text: 'Budget goes primarily to trips, museums, and classes.' },
          { label: 'Tech Driven', text: 'Primary spend is on hardware and software subscriptions.' }
        ]
      },
      {
        title: 'Parent\'s Time',
        options: [
          { label: 'Few Hours', text: 'Parent works or has other duties; learning is efficient.' },
          { label: 'Immersed', text: 'Parent\'s primary \'job\' is homeschooling and planning.' },
          { label: 'Alternating', text: 'Parents share the load or swap duties seasonally.' },
          { label: 'As Needed', text: 'No set hours; parent helps only when the student stalls.' }
        ]
      },
      {
        title: 'Energy Source & Focus',
        options: [
          { label: 'Home Hub', text: 'Focus energy on creating a rich, static home life.' },
          { label: 'On the Go', text: 'Energy is spent on logistics, meetups, and exploring.' },
          { label: 'Study Deep', text: 'Mental energy is primary focus; chores/life are secondary.' },
          { label: 'Life Skills', text: 'Energy is split between \'school\' and \'managing a home\'.' }
        ]
      }
    ]
  },
  parents_expectations: {
    id: 'parents_expectations',
    label: 'Parent\'s Expectations',
    category: 'foundation',
    color: '#E9604F',
    explainer: 'What success really means here. If this is fuzzy, pressure leaks into everything.',
    guidingQuestions: [
      'Is success about today\'s work, the future adult, academics, or whole-child balance?',
      'How involved should the parent be?',
      'What standard should finished work meet?'
    ],
    exampleGood: 'Success means cultivating a capable future adult who works independently, striving for process-focused struggle and original thinking.',
    exampleWeak: 'Getting all As in everything and never making a mistake.',
    templateFormat: 'Success primarily means [timeline], with parent involvement set at [involvement] and standard of output oriented around [standard].',
    grids: [
      {
        title: 'Success Timeline',
        options: [
          { label: 'Daily Result', text: 'Focus on what was produced and finished today.' },
          { label: 'Future Self', text: 'Focus on the type of adult we are cultivating.' },
          { label: 'Academic', text: 'Prioritize standardized readiness and transcript quality.' },
          { label: 'Wholeness', text: 'Success is a happy, balanced daily life right now.' }
        ]
      },
      {
        title: 'Involvement',
        options: [
          { label: 'High Support', text: 'Parent is very involved in every detail of the work.' },
          { label: 'Independent', text: 'Parent expects child to manage their own load.' },
          { label: 'Outsourced', text: 'Parent acts as \'CEO\', hiring mentors and tutors.' },
          { label: 'Partners', text: 'Side-by-side learning; parent and child study together.' }
        ]
      },
      {
        title: 'Output Standard',
        options: [
          { label: 'Polish', text: 'The work should be \'finished\' and presentable to others.' },
          { label: 'Process', text: 'Value the raw struggle and volume over a clean finish.' },
          { label: 'Innovation', text: 'Expect original thinking and unique projects.' },
          { label: 'Benchmarking', text: 'Compare progress to peers or national standards.' }
        ]
      }
    ]
  }
};
