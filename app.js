/* Sermon Outline Studio
 * Instant outline engine (on-device) + optional Groq LLM enhancement.
 * Verse text: bible-api.com (free, no key). Nothing else leaves the browser.
 * Built Nov 2026 for the AI for Church Hackathon 2026.
 */
'use strict';

/* ------------------------------------------------------------------ */
/* Passage-specific outlines (hand-written, theologically checked).    */
/* Keys are normalised references: lowercase, no spaces, no punctuation */
/* except the colon. "psalm23" matches "Psalm 23", "Psalm 23:1-6", etc. */
/* ------------------------------------------------------------------ */
const PASSAGES = {
  'john3:16': {
    verse: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    title: 'God So Loved the World',
    bigIdea: 'God\'s love is not a vague feeling — it is a gift given, a Son sent, and eternal life offered to whoever believes.',
    points: [
      { title: 'A love with a source: God so loved', focus: 'The initiative is God\'s, not ours.',
        explanation: 'The verse begins with God, not with us. Before we loved Him, He loved the world — not just the deserving, not just one nation, but the whole world.',
        verse: '1 John 4:19 — "We love because he first loved us."',
        illustration: 'A parent who runs toward a wandering child before the child turns around. God\'s love moves first.',
        application: 'Begin the week by receiving, not achieving. Spend ten minutes each morning simply remembering that you are loved before you have done anything.' },
      { title: 'A love with a cost: He gave His one and only Son', focus: 'Love that gives what is most precious.',
        explanation: '"Gave" is the hinge of the verse. God did not lend, suggest, or symbolise — He gave His Son. The cross is the measure of the love, not an afterthought to it.',
        verse: 'Romans 5:8 — "God demonstrates his own love for us in this: While we were still sinners, Christ died for us."',
        illustration: 'A gift is measured by what it costs the giver, not by how it looks to the receiver. The cross is the most expensive gift ever given.',
        application: 'Name one thing you have been holding back from God — time, money, a decision — and give it this week as a response, not a payment.' },
      { title: 'A love with an invitation: whoever believes will not perish', focus: 'The offer is wide open, and the response is trust.',
        explanation: '"Whoever" leaves no one out, and "believes" is not mere agreement — it is entrusting your whole life to Jesus. The result is not just survival, but eternal life, starting now.',
        verse: 'John 17:3 — "Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent."',
        illustration: 'A door standing open with your name on the invitation. Belief is walking through it, not just admiring it from outside.',
        application: 'If you have never trusted Christ, today is the day to say so — to God, and to one Christian friend. If you have, tell one person this week what eternal life has changed for you.' }
    ],
    questions: [
      'What changes when you believe God loved the world before you loved Him back?',
      'What has God\'s gift of His Son cost Him — and what does that tell you about your worth to Him?',
      'Who is one "whoever" in your life who needs to hear this invitation this week?'
    ],
    prayer: 'Father, thank You that You loved the world — and loved me — first. Thank You for giving Your Son so that I would not perish but have eternal life. Help me to receive that love deeply, and to carry it to someone else this week. In Jesus\' name, Amen.'
  },
  'psalm23': {
    verse: "The LORD is my shepherd; I shall not want. He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake. Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me. Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over. Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.",
    title: 'The Lord Is My Shepherd',
    bigIdea: 'Because the Lord is my shepherd, I lack nothing I truly need — in green pastures, in dark valleys, and at a table set before my enemies.',
    points: [
      { title: 'He provides: I shall not want', focus: 'Contentment is a Person, not a pile.',
        explanation: 'David does not say "I have everything I want" but "I shall not want" — the Shepherd\'s care turns wanting into rest. Provision follows relationship.',
        verse: 'Philippians 4:19 — "My God will meet all your needs according to the riches of his glory in Christ Jesus."',
        illustration: 'Sheep do not manage the pasture; they follow the shepherd. Our job is nearness, His job is provision.',
        application: 'Write down one need you have been carrying alone, and pray it aloud to the Shepherd each morning this week.' },
      { title: 'He guides: He leads me beside still waters', focus: 'Rest and righteousness travel together.',
        explanation: 'The Shepherd restores the soul and then leads in paths of righteousness — rest is not an escape from obedience, it is the fuel for it.',
        verse: 'Matthew 11:28 — "Come to me, all you who are weary and burdened, and I will give you rest."',
        illustration: 'Still waters are not found by striving sheep. They are found by sheep who let themselves be led.',
        application: 'Build one still-water moment into each day this week — ten unhurried minutes with Scripture and silence, phone in another room.' },
      { title: 'He stays: even in the valley of the shadow of death', focus: 'The valley does not mean the Shepherd left.',
        explanation: 'David\'s language changes in verse 4 — from "He" to "You". The valley turns theology into conversation. The rod and staff, tools of guidance and rescue, become comforts.',
        verse: 'Isaiah 43:2 — "When you pass through the waters, I will be with you."',
        illustration: 'A child in a dark hallway is not afraid when holding a parent\'s hand. The valley is real; so is the hand.',
        application: 'If you are in a valley, tell one trusted believer this week — don\'t walk it alone. If you are not, ask God who near you is, and go and sit with them.' }
    ],
    questions: [
      'Where in your life are you trying to be your own shepherd right now?',
      'What would "still waters" look like in your actual week — not in theory?',
      'How has God\'s presence felt different in a valley season than in a green-pasture season?'
    ],
    prayer: 'Lord, my Shepherd, thank You that I lack nothing I truly need because I have You. Lead me beside still waters, restore my soul, and walk with me through every valley. I will fear no evil, for You are with me. Amen.'
  },
  'romans8:28': {
    verse: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    title: 'God Works All Things for Good',
    bigIdea: 'God does not call everything good — He works all things, even the hard ones, toward good for those who love Him and are called according to His purpose.',
    points: [
      { title: 'We know: confidence, not guesswork', focus: '"We know" — this is settled truth.',
        explanation: 'Paul does not say "we hope" or "we feel". For the believer, God\'s sovereign goodness is something to know — a rock to stand on when feelings shift.',
        verse: 'Romans 8:32 — "He who did not spare his own Son... how will he not also, along with him, graciously give us all things?"',
        illustration: 'A weaver sees the underside of the tapestry — knots and loose threads. The pattern is only visible from above, and God is above.',
        application: 'Write this verse on a card and put it where you will see it on hard days. Knowing comes before feeling.' },
      { title: 'All things: no exceptions, no leftovers', focus: 'God wastes nothing — not even pain.',
        explanation: '"All things" includes the things we would never choose. God does not say they are good; He says He works them for good. Redemption, not denial.',
        verse: 'Genesis 50:20 — "You intended to harm me, but God intended it for good."',
        illustration: 'Joseph\'s brothers, the pit, the prison — none of it was good. All of it was used. God is the great recycler of human evil and suffering.',
        application: 'Name one hard thing from your past or present and ask: what good might God be growing from this that I cannot see yet?' },
      { title: 'For good: defined by His purpose, not our comfort', focus: 'The "good" is becoming like Christ.',
        explanation: 'Verse 29 defines the good: to be conformed to the image of His Son. God\'s goal is not our comfort but our Christlikeness — and that is better news than comfort.',
        verse: 'Romans 8:29 — "For those God foreknew he also predestined to be conformed to the image of his Son."',
        illustration: 'A sculptor\'s chisel hurts the stone — and reveals the statue. God\'s "good" is the finished likeness of Jesus in us.',
        application: 'In one current difficulty, ask not only "When will this end?" but "What is God forming in me through this?"' }
    ],
    questions: [
      'What is the difference between "everything is good" and "God works all things for good"?',
      'Which "all things" in your life are hardest to trust God with right now?',
      'How does knowing the goal is Christlikeness change how you pray about a hard situation?'
    ],
    prayer: 'Father, thank You that You work all things for good for those who love You. I confess I cannot see the pattern yet. Give me faith to trust Your hands with the threads of my life, and patience to become more like Jesus through it all. Amen.'
  },
  'luke15:11-24': {
    title: 'The Father Who Runs',
    bigIdea: 'God is not a distant judge waiting for an apology — He is a Father who runs toward returning sinners while they are still far off.',
    points: [
      { title: 'The leaving: every far country starts with "give me"', focus: 'Sin promises freedom and delivers slavery.',
        explanation: 'The younger son\'s request was effectively "I wish you were dead." He got what he asked for — and found that the far country feeds pigs, not sons.',
        verse: 'Proverbs 14:12 — "There is a way that appears to be right, but in the end it leads to death."',
        illustration: 'The far country always advertises freedom and charges everything. Every addiction, every rebellion, follows the same arc.',
        application: 'Be honest about one "far country" in your life — a habit, a grudge, a secret — and name it to God today, without excuses.' },
      { title: 'The turning: he came to his senses', focus: 'Repentance begins with seeing clearly.',
        explanation: 'The son rehearsed a speech about being a hired servant. He did not yet understand grace — but he turned toward home, and that was enough to start.',
        verse: 'Acts 3:19 — "Repent, then, and turn to God, so that your sins may be wiped out."',
        illustration: 'Coming to your senses is the first miracle of grace: seeing the pigpen for what it is, and home for what it is.',
        application: 'Take one step home this week — a confession, a restored conversation, a returned habit — before you feel ready.' },
      { title: 'The running: while he was still a long way off', focus: 'The Father moves first, and He moves fast.',
        explanation: 'In that culture, a dignified patriarch did not run. But this Father hikes up His robe and runs — grace is undignified, urgent, and public. The robe, ring and feast come before any probation.',
        verse: 'Ephesians 2:4-5 — "Because of his great love for us, God, who is rich in mercy, made us alive with Christ even when we were dead in transgressions."',
        illustration: 'The son prepared a speech. The Father prepared a party. Grace always outruns our repentance.',
        application: 'If you are far off, come home today — the Father is already running. If you are home, who is one person you can run toward with welcome instead of judgment?' }
    ],
    questions: [
      'Are you more like the younger son, the older son, or the Father in this story — and why?',
      'What keeps people from believing God would run toward them?',
      'Who in your life needs to experience a "running Father" welcome from you this week?'
    ],
    prayer: 'Father, thank You for running toward me while I was still far off. I come home — not as a hired servant, but as Your child. Clothe me in Your grace, and teach me to run toward others the way You ran toward me. Amen.'
  },
  'philippians4:13': {
    verse: "I can do all things through Christ which strengtheneth me.",
    title: 'Strength in Christ',
    bigIdea: 'The strength Christ gives is not success at everything we attempt — it is contentment and endurance in everything He assigns, in plenty and in need.',
    points: [
      { title: 'The context: learned contentment', focus: 'This verse is about need and plenty, not achievement.',
        explanation: 'Paul writes this from prison, having learned to be content in any circumstance. The "all things" is defined by verse 12: hunger and fullness, abundance and need.',
        verse: 'Philippians 4:12 — "I have learned the secret of being content in any and every situation."',
        illustration: 'A verse about contentment has been turned into a slogan for striving. Put it back in its prison cell and it becomes far more powerful.',
        application: 'This week, when you catch yourself using this verse as a pep talk for ambition, pause and ask: what has Christ actually assigned me today?' },
      { title: 'The source: through Him who strengthens me', focus: 'Strength is a Person, received, not a power we summon.',
        explanation: 'The strength flows from union with Christ — "through him". It is not willpower baptised; it is Christ\'s own strength made available to the weak.',
        verse: '2 Corinthians 12:9 — "My grace is sufficient for you, for my power is made perfect in weakness."',
        illustration: 'A branch does not strain to produce fruit; it stays connected to the vine. Strength is a by-product of abiding.',
        application: 'Begin each day this week with a two-minute prayer of dependence: "Lord, I cannot do today in my strength. Strengthen me for what You have given me."' },
      { title: 'The scope: all things — including the hard ones', focus: 'Christ\'s strength covers endurance, not just victory.',
        explanation: 'The promise includes enduring prison, going without, and facing need — not escaping them. Christ strengthens us to be faithful in the assignment, whatever it is.',
        verse: 'Isaiah 40:31 — "Those who hope in the LORD will renew their strength."',
        illustration: 'A marathon runner and a patient in a hospital bed both need strength — one to keep going, one to keep trusting. Christ gives both.',
        application: 'Name the hardest "all things" in your life right now, and pray this verse over it specifically — not as a guarantee of escape, but as a promise of strength within it.' }
    ],
    questions: [
      'How have you heard this verse used in ways that ignore its context?',
      'What is one hard circumstance where you need Christ\'s strength for endurance rather than escape?',
      'What is the difference between self-reliance with a Bible verse attached and dependence on Christ?'
    ],
    prayer: 'Lord Jesus, thank You that Your strength is made perfect in my weakness. Teach me contentment in every circumstance, and strengthen me — not for my ambitions, but for everything You have assigned me today. Amen.'
  },
  'jeremiah29:11': {
    verse: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    title: 'Plans to Give You Hope',
    bigIdea: 'God\'s plans for His people are plans for welfare, not harm — a future and a hope — and they unfold even in exile, on a seventy-year horizon.',
    points: [
      { title: 'The promise: plans for welfare, not for evil', focus: 'God\'s intentions toward His people are good.',
        explanation: 'God declares His own thoughts toward His people: peace, not disaster. The promise is about His character before it is about our circumstances.',
        verse: 'Romans 8:28 — "In all things God works for the good of those who love him."',
        illustration: 'A good father\'s plans for his children include hard seasons — school, discipline, waiting — but never harm as the goal.',
        application: 'Write down one area where you doubt God\'s intentions toward you, and bring it to Him honestly in prayer this week.' },
      { title: 'The context: spoken to exiles, not to the comfortable', focus: 'Hope is most needed — and most real — in exile.',
        explanation: 'This promise was given to people dragged to Babylon for seventy years. God told them to build houses, plant gardens, and seek the city\'s welfare — hope looks like faithfulness right where you are.',
        verse: 'Jeremiah 29:5-7 — "Build houses and settle down; plant gardens and eat what they produce... seek the peace and prosperity of the city."',
        illustration: 'Hope is not a shortcut out of exile; it is a reason to plant a garden in exile. God\'s future does not cancel today\'s faithfulness.',
        application: 'What is one "garden" God is asking you to plant right where you are — in this job, this town, this season — instead of waiting for escape?' },
      { title: 'The future: a hope that outlasts the wait', focus: 'Seventy years is a long time — and God is patient.',
        explanation: 'Most of the original hearers would not live to see the return. The promise was for their children. Hope in God can be generational, not just personal.',
        verse: 'Hebrews 11:13 — "All these people were still living by faith when they died. They did not receive the things promised; they only saw them and welcomed them from a distance."',
        illustration: 'A farmer plants trees whose shade he will never sit in. Faith plants for a future it may not see.',
        application: 'What are you building or praying for that may bless the next generation more than it blesses you — and will you keep building it anyway?' }
    ],
    questions: [
      'How does knowing this verse was spoken to exiles change how you use it?',
      'What does it look like to "plant a garden" in your current season instead of waiting to be rescued from it?',
      'What hope are you carrying that may be fulfilled for others more than for you?'
    ],
    prayer: 'Lord, thank You that Your plans for me are good — to give me a future and a hope. Help me to trust Your timing, to be faithful where I am, and to plant gardens in exile, believing You are working even when I cannot see it. Amen.'
  },
  'matthew6:9-13': {
    verse: "Our Father which art in heaven, Hallowed be thy name. Thy kingdom come. Thy will be done in earth, as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we forgive our debtors. And lead us not into temptation, but deliver us from evil: For thine is the kingdom, and the power, and the glory, for ever. Amen.",
    title: 'Teach Us to Pray',
    bigIdea: 'Jesus\' model prayer moves from God\'s name to our needs and back to His kingdom — prayer is first about God, and only then about us.',
    points: [
      { title: 'Our Father: prayer begins with relationship', focus: 'We pray to a Father, not a force.',
        explanation: 'Jesus teaches us to begin with "Our Father" — intimate ("Father") and shared ("our"). Prayer is a family conversation before it is a request line.',
        verse: 'Romans 8:15 — "You received the Spirit of adoption. And by him we cry, \'Abba, Father.\'"',
        illustration: 'A child does not book an appointment with a parent. Prayer is coming home, not calling a helpline.',
        application: 'Begin your prayers this week by sitting with "Father" for a full minute before any request — let relationship set the tone.' },
      { title: 'Your kingdom come: prayer aligns our will', focus: 'The first petitions are God\'s, not ours.',
        explanation: 'Before daily bread, Jesus puts God\'s name, kingdom and will. Prayer reorders our desires: His agenda first, and ours reframed inside it.',
        verse: 'Matthew 6:33 — "Seek first his kingdom and his righteousness, and all these things will be given to you as well."',
        illustration: 'Prayer is less like handing God a shopping list and more like tuning an instrument — we come out sounding like His kingdom.',
        application: 'Each morning, pray one sentence of surrender before any request: "Your will be done in my day today."' },
      { title: 'Give us, forgive us, deliver us: prayer brings real needs', focus: 'God wants our daily, ordinary, honest requests.',
        explanation: 'Bread, forgiveness, protection — Jesus invites the ordinary and the painful alike. We ask for today\'s bread, we confess real debts, and we admit we need deliverance from evil.',
        verse: '1 Peter 5:7 — "Cast all your anxiety on him because he cares for you."',
        illustration: 'The Lord\'s Prayer is short enough for a child and deep enough for a lifetime. God is not impressed by length; He is moved by honesty.',
        application: 'Pray this prayer slowly, phrase by phrase, each day this week — and pause after each line to make it your own in your own words.' }
    ],
    questions: [
      'Why does Jesus put God\'s name, kingdom and will before our daily bread?',
      'What changes when you pray "our Father" instead of "my Father"?',
      'Which line of the Lord\'s Prayer is hardest for you to pray honestly right now — and why?'
    ],
    prayer: 'Our Father in heaven, hallowed be Your name. Your kingdom come, Your will be done, on earth as it is in heaven. Give us today our daily bread. Forgive us our debts, as we forgive our debtors. Lead us not into temptation, but deliver us from evil. For Yours is the kingdom, the power, and the glory forever. Amen.'
  },
  '1corinthians13:4-7': {
    verse: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; rejoiceth not in iniquity, but rejoiceth in the truth; beareth all things, believeth all things, hopeth all things, endureth all things.",
    title: 'Love That Lasts',
    bigIdea: 'Real love is not a feeling that comes and goes — it is patient, kind, truthful and enduring, and it is the measure of everything else we do.',
    points: [
      { title: 'Love is patient and kind', focus: 'Love shows up first as patience.',
        explanation: 'Paul begins love\'s portrait not with passion but with patience — long-suffering toward people who are difficult, and kindness that acts, not just feels.',
        verse: 'Ephesians 4:2 — "Be completely humble and gentle; be patient, bearing with one another in love."',
        illustration: 'Patience is love with its sleeves rolled up. Anyone can feel love for a lovely person; patience proves it toward a difficult one.',
        application: 'Choose one difficult person this week and practice one concrete act of patience toward them — a slow reply, a second chance, a kind word.' },
      { title: 'Love does not envy, boast, or keep score', focus: 'Love clears out the rivals.',
        explanation: 'Envy, pride and scorekeeping are love\'s counterfeits. Love refuses to measure itself against others or to keep a ledger of wrongs.',
        verse: 'Proverbs 10:12 — "Hatred stirs up conflict, but love covers over all wrongs."',
        illustration: 'A ledger of wrongs is heavy to carry and impossible to love with. Love sets the ledger down.',
        application: 'Is there a wrong you have been recording — mentally replaying, retelling? This week, choose to stop adding entries, and tell God about it instead.' },
      { title: 'Love always protects, trusts, hopes, perseveres', focus: 'Love is the last thing standing.',
        explanation: 'Paul ends with four "always" verbs. Love does not give up when it is hard; it bears, believes, hopes and endures — because this is how God has loved us.',
        verse: 'Romans 5:8 — "While we were still sinners, Christ died for us."',
        illustration: 'A roof protects a house in every season, not just in sunshine. Love is the roof over a relationship.',
        application: 'In your most important relationship, ask: what would it look like to protect, trust, hope and persevere this week — not in theory, but in one action?' }
    ],
    questions: [
      'Which word in Paul\'s description of love convicts you most — patient, kind, not envious, not keeping score?',
      'How is God\'s love for you the model — and the fuel — for loving others this way?',
      'What relationship in your life most needs the "always perseveres" kind of love right now?'
    ],
    prayer: 'Lord, You are patient, You are kind, and You have loved me when I was unlovely. Teach me to love like that — not in feelings only, but in patience, kindness, and perseverance. Let Your love in me be the roof over the people You have given me. Amen.'
  },
  'hebrews11:1': {
    verse: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    title: 'Faith Is Being Sure',
    bigIdea: 'Faith is not wishful thinking — it is confidence in what we hope for and assurance about what we do not see, grounded in who God is.',
    points: [
      { title: 'Faith is confidence, not a guess', focus: 'Assurance is the substance of faith.',
        explanation: 'The writer defines faith with legal language: substance, evidence, conviction. Faith rests on God\'s character and promises, not on our optimism.',
        verse: 'Hebrews 11:6 — "Without faith it is impossible to please God, because anyone who comes to him must believe that he exists and that he rewards those who earnestly seek him."',
        illustration: 'Sitting in a chair is faith in the chair — you do not test it forever, you trust it with your weight. Faith in God is trusting Him with your weight.',
        application: 'Name one promise of God you are standing on, and write it where you will see it daily. Confidence grows by rehearsing truth, not by rehearsing fear.' },
      { title: 'Faith looks forward: what we hope for', focus: 'Hope is faith pointed at the future.',
        explanation: 'Faith and hope are inseparable: faith is the present confidence in a future God has promised. The heroes of chapter 11 lived — and died — looking forward.',
        verse: 'Hebrews 11:13 — "They only saw them and welcomed them from a distance."',
        illustration: 'A traveller trusts the road because of the destination. Hope is the destination that makes today\'s road worth walking.',
        application: 'What future promise of God do you need to set your eyes on this week — and what would change if you lived as if it were certain?' },
      { title: 'Faith sees the unseen: what we do not see', focus: 'The most real things are invisible.',
        explanation: 'Faith is the evidence of realities our eyes cannot check — God\'s presence, His promises, the coming kingdom. The unseen is not the unreal.',
        verse: '2 Corinthians 4:18 — "What is seen is temporary, but what is unseen is eternal."',
        illustration: 'You cannot see the wind, but you can see what it moves. Faith reads the movement of God in a life, a church, a world.',
        application: 'This week, keep a short list of "unseen evidence": moments you saw God at work that no camera could capture. Review it on Sunday.' }
    ],
    questions: [
      'How is biblical faith different from "believing really hard" or positive thinking?',
      'Which of God\'s promises feels hardest to be sure about right now?',
      'Who is a person of faith — in Scripture or in your life — whose example strengthens your own?'
    ],
    prayer: 'Father, thank You that faith is not a leap into the dark but confidence in You. Give me assurance in what I hope for and conviction about what I cannot see. Help me to live today as if Your promises are certain — because they are. Amen.'
  },
  'isaiah40:31': {
    verse: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    title: 'Strength for the Weary',
    bigIdea: 'Those who wait on the Lord do not just get a second wind — they exchange their strength for His, and rise, run, and walk without fainting.',
    points: [
      { title: 'The promise: renewed strength', focus: 'God exchanges our strength for His.',
        explanation: '"Renew" here means to exchange — like changing clothes. We trade our exhausted strength for His inexhaustible strength. It is not self-improvement; it is divine exchange.',
        verse: '2 Corinthians 12:9 — "My power is made perfect in weakness."',
        illustration: 'A tired runner does not need a pep talk; she needs to be carried for a stretch. God carries the weary — that is the promise.',
        application: 'Instead of pushing harder this week, try waiting longer: ten minutes of stillness before God before you start the day\'s hardest task.' },
      { title: 'The wings: they will soar like eagles', focus: 'God lifts us above what we cannot climb.',
        explanation: 'Eagles do not flap their way to altitude; they ride the thermal. Waiting on God is learning to ride His rising air instead of flapping in our own effort.',
        verse: 'Psalm 46:10 — "Be still, and know that I am God."',
        illustration: 'An eagle on a thermal looks effortless because the wind is doing the work. Soaring is what happens when waiting replaces striving.',
        application: 'Identify one area where you have been flapping — striving, worrying, controlling — and practice one day of deliberate release: do the next faithful thing, and leave the outcome to God.' },
      { title: 'The walk: they will run and not grow weary, walk and not faint', focus: 'Most of faithfulness is walking, not soaring.',
        explanation: 'The verse ends not with flying but with walking — ordinary, daily, unglamorous endurance. God\'s strength is most often proved in the long walk, not the dramatic flight.',
        verse: 'Galatians 6:9 — "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up."',
        illustration: 'A marathon is won by walking the water stations well. The Christian life is mostly faithful walking — and God promises strength for every step.',
        application: 'What is the next faithful step in front of you — not the whole journey, just the next step? Take it today, and trust God for tomorrow\'s strength tomorrow.' }
    ],
    questions: [
      'Are you weary from doing too much, or from waiting too little?',
      'What is the difference between waiting on God and doing nothing?',
      'Where do you most need strength to walk — not to soar, just to keep walking?'
    ],
    prayer: 'Lord, I am weary, and my strength is spent. Thank You that those who wait on You renew their strength. Teach me to wait, to ride Your wind instead of flapping in my own, and to walk — one faithful step at a time — without fainting. Amen.'
  }
};

/* Theme keyword engine for passages/topics not in the map. */
const THEMES = [
  { keys: ['faith', 'believe', 'trust'], theme: 'Faith',
    points: [
      { title: 'Faith begins with hearing God', focus: 'Faith comes from the Word.',
        explanation: 'Faith is not manufactured by effort; it is born when God speaks and we hear Him. That is why the sermon starts with Scripture, not with our opinions.',
        verse: 'Romans 10:17 — "Faith comes from hearing the message, and the message is heard through the word about Christ."',
        illustration: 'A radio does not create the broadcast — it receives it. Faith is tuning in to what God has already said.',
        application: 'Read the passage aloud, slowly, three times this week — and ask God to let one phrase take root.' },
      { title: 'Faith is tested in the waiting', focus: 'Trust grows under pressure.',
        explanation: 'God often answers faith with a wait, because waiting is where trust becomes real. The delay is not denial; it is formation.',
        verse: 'James 1:3 — "The testing of your faith produces perseverance."',
        illustration: 'A muscle grows under resistance, not at rest. Faith grows the same way.',
        application: 'Name one area where you are waiting on God, and choose one act of trust this week — obedience before the answer arrives.' },
      { title: 'Faith acts on what it believes', focus: 'Real faith moves.',
        explanation: 'Faith that never acts is not faith but opinion. The heroes of Scripture believed God — and then they walked, built, gave, and went.',
        verse: 'James 2:17 — "Faith by itself, if it is not accompanied by action, is dead."',
        illustration: 'Believing a bridge will hold you is one thing; walking across it is faith.',
        application: 'Take one concrete step this week that only makes sense if God is who He says He is.' }
    ] },
  { keys: ['hope'], theme: 'Hope',
    points: [
      { title: 'Hope is anchored, not wished', focus: 'Christian hope is certain.',
        explanation: 'Biblical hope is not optimism; it is confidence in God\'s promises. It holds because the anchor holds, not because the sea is calm.',
        verse: 'Hebrews 6:19 — "We have this hope as an anchor for the soul, firm and secure."',
        illustration: 'An anchor does not stop the storm; it stops the drift. Hope does the same for a soul.',
        application: 'Write down one promise of God that anchors you, and return to it each morning this week.' },
      { title: 'Hope is learned in suffering', focus: 'Suffering produces hope — through endurance.',
        explanation: 'Paul traces a chain: suffering produces perseverance, perseverance produces character, and character produces hope. God grows hope in hard soil.',
        verse: 'Romans 5:3-4 — "Suffering produces perseverance; perseverance, character; and character, hope."',
        illustration: 'A seed must go into the dark ground before it becomes a tree. Hope often grows the same way.',
        application: 'Instead of asking God only to remove a hardship, ask Him what He is growing through it.' },
      { title: 'Hope overflows into others', focus: 'Hope is contagious.',
        explanation: 'When hope fills a person, it spills over. A hopeful church is a visible argument for the gospel in a despairing world.',
        verse: 'Romans 15:13 — "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope."',
        illustration: 'One lit candle can light a whole room without losing its own flame. Hope multiplies by sharing.',
        application: 'Share one reason for hope with one discouraged person this week — in person, not just in a message.' }
    ] },
  { keys: ['love', 'grace', 'mercy'], theme: 'Love and grace',
    points: [
      { title: 'Love starts with God, not with us', focus: 'We love because He first loved us.',
        explanation: 'Every true love in our lives is a reflection of God\'s prior love. We do not generate love; we receive it and pass it on.',
        verse: '1 John 4:19 — "We love because he first loved us."',
        illustration: 'The moon has no light of its own — it reflects the sun. Our love shines the same way.',
        application: 'Spend ten minutes this week simply receiving God\'s love in prayer before trying to give love to anyone.' },
      { title: 'Love is measured by giving', focus: 'God gave His Son — love gives.',
        explanation: 'The cross is the definition of love: not a feeling, but a gift. Love that costs nothing is not yet love.',
        verse: 'John 15:13 — "Greater love has no one than this: to lay down one\'s life for one\'s friends."',
        illustration: 'A gift is measured by what it costs the giver. The cross is love\'s price tag.',
        application: 'Give something this week that costs you — time, comfort, pride — to someone who cannot repay you.' },
      { title: 'Love is proven by endurance', focus: 'Love keeps going.',
        explanation: 'Real love does not expire when feelings fade or people disappoint. It protects, trusts, hopes and perseveres — because God\'s love for us does.',
        verse: '1 Corinthians 13:7 — "Love always protects, always trusts, always hopes, always perseveres."',
        illustration: 'A roof protects a house in every season, not only in sunshine.',
        application: 'Choose one relationship where love has grown tired, and commit to one faithful, loving action this week.' }
    ] },
  { keys: ['pray', 'prayer'], theme: 'Prayer',
    points: [
      { title: 'Prayer begins with who God is', focus: 'We pray to a Father, not a force.',
        explanation: 'Prayer starts with relationship: "Our Father." Before any request, we remember who we are speaking to — and who we are to Him.',
        verse: 'Matthew 6:9 — "Our Father in heaven, hallowed be your name."',
        illustration: 'A child does not book an appointment with a parent. Prayer is coming home.',
        application: 'Begin each prayer this week with a minute of simply addressing God as Father, before any request.' },
      { title: 'Prayer brings real needs honestly', focus: 'God invites our daily, ordinary requests.',
        explanation: 'Jesus teaches us to ask for daily bread, forgiveness, and deliverance — the ordinary and the painful alike. Nothing is too small or too shameful to bring.',
        verse: 'Philippians 4:6 — "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."',
        illustration: 'Prayer is less like a formal audience and more like a kitchen-table conversation with someone who already knows.',
        application: 'Pray one honest, specific request this week — not a vague one. Name it plainly to God.' },
      { title: 'Prayer changes the one who prays', focus: 'We come out different than we went in.',
        explanation: 'Prayer does not only change circumstances; it changes us. Time with God reorders our desires, calms our fears, and aligns our will with His.',
        verse: 'Psalm 46:10 — "Be still, and know that I am God."',
        illustration: 'Time in the sun changes your skin without you trying. Time with God changes a heart the same way.',
        application: 'Build one unhurried ten-minute prayer time into your day this week — no phone, no agenda, just presence.' }
    ] },
  { keys: ['forgiv', 'mercy', 'reconcil'], theme: 'Forgiveness',
    points: [
      { title: 'We forgive because we have been forgiven', focus: 'Forgiveness flows downhill from the cross.',
        explanation: 'Our forgiveness of others is never the first forgiveness — it is a response to the far greater forgiveness we have received in Christ.',
        verse: 'Ephesians 4:32 — "Forgive each other, just as in Christ God forgave you."',
        illustration: 'A forgiven debtor who refuses to forgive a small debt has forgotten the size of his own.',
        application: 'This week, write down the forgiveness you have received, and one person you are still withholding it from.' },
      { title: 'Forgiveness is a decision before it is a feeling', focus: 'We can forgive before we feel like it.',
        explanation: 'Forgiveness begins as an act of the will: releasing the debt, refusing revenge, entrusting justice to God. Feelings often follow — sometimes slowly.',
        verse: 'Romans 12:19 — "Do not take revenge, my dear friends, but leave room for God\'s wrath."',
        illustration: 'Forgiveness is unlocking a door: the prisoner who walks free is often yourself.',
        application: 'Make a concrete decision this week: "I release this debt to God." Say it aloud in prayer — even if the feelings have not caught up.' },
      { title: 'Forgiveness opens the way to reconciliation', focus: 'Forgiveness is the door; reconciliation is the road.',
        explanation: 'Forgiveness can be given unilaterally, but reconciliation takes two. We forgive freely, and we pursue peace wisely — with boundaries where needed, and with hope where possible.',
        verse: 'Romans 12:18 — "If it is possible, as far as it depends on you, live at peace with everyone."',
        illustration: 'Forgiveness clears the rubble; reconciliation rebuilds the road. Both matter, and they move at different speeds.',
        application: 'Take one step toward peace this week — a conversation, a letter, a boundary held kindly — as far as it depends on you.' }
    ] },
  { keys: ['peace', 'anxiet', 'worry', 'fear', 'courage'], theme: 'Peace and courage',
    points: [
      { title: 'Peace is a Person, not a circumstance', focus: 'Christ Himself is our peace.',
        explanation: 'The peace God gives does not depend on calm circumstances — it depends on a present Christ. That is why it can hold in the middle of a storm.',
        verse: 'John 14:27 — "Peace I leave with you; my peace I give you. I do not give to you as the world gives."',
        illustration: 'The world\'s peace is the absence of trouble. God\'s peace is the presence of Christ in trouble.',
        application: 'When anxiety rises this week, practice a two-minute pause: name the fear, then name the presence of Christ with you in it.' },
      { title: 'Peace is guarded by prayer', focus: 'Prayer is the gate where peace enters.',
        explanation: 'Paul ties peace to prayer directly: present your requests to God, and the peace of God will guard your heart and mind. Prayer is not a technique; it is the turning point.',
        verse: 'Philippians 4:6-7 — "Present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."',
        illustration: 'A guard stands at the gate of a city. Prayer posts God\'s peace at the gate of the heart.',
        application: 'Turn one specific worry into a specific prayer this week — written down, dated, and prayed daily.' },
      { title: 'Peace is carried into the world', focus: 'Peacemakers show the gospel.',
        explanation: 'Those who have received Christ\'s peace become peacemakers — people who carry calm into conflict, kindness into tension, and reconciliation into division.',
        verse: 'Matthew 5:9 — "Blessed are the peacemakers, for they will be called children of God."',
        illustration: 'A calm person in a tense room changes the whole room. That is what a peacemaker does.',
        application: 'Identify one tense relationship or situation this week, and go into it as a peacemaker — listening first, speaking gently, seeking understanding.' }
    ] }
];

const GENERIC_POINTS = (topic) => [
  { title: 'What God says', focus: 'Start with the text, not with our opinions.',
    explanation: `Look carefully at what this passage actually says about ${topic}. Read it slowly, notice what is repeated, and let the text set the agenda — the sermon serves the Scripture, not the other way around.`,
    verse: '2 Timothy 3:16 — "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness."',
    illustration: 'A good sermon is like a guided tour of a passage: the guide points at what is already there, so the group sees it for themselves.',
    application: `Read the passage aloud three times this week, and underline the one phrase about ${topic} that you cannot ignore.` },
  { title: 'What it means for us', focus: 'Truth that stays in the head has not finished its work.',
    explanation: `The passage about ${topic} is not information for a test — it is a claim on our lives. Ask what it reveals about God, about us, and about the gap between the two.`,
    verse: 'James 1:22 — "Do not merely listen to the word, and so deceive yourselves. Do what it says."',
    illustration: 'A recipe you never cook is not a meal. A truth you never live is not yet yours.',
    application: `Name one specific way ${topic} should change how you live on Monday — not in theory, but in a decision, a conversation, or a habit.` },
  { title: 'How we respond', focus: 'Every sermon ends with a step.',
    explanation: `God's Word always asks for a response. The sermon is not finished when the outline ends — it is finished when God's people take a step. Make the step small, concrete, and this week.`,
    verse: 'Romans 12:1 — "Offer your bodies as a living sacrifice, holy and pleasing to God — this is your true and proper worship."',
    illustration: 'A sermon without a response is like a letter never answered. The reply is part of the conversation.',
    application: `Choose one response step for this week — and tell one other person what it is, so they can ask you about it on Sunday.` }
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const normRef = (ref) => ref.toLowerCase().replace(/[^a-z0-9:]/g, '');
const findPassage = (ref) => {
  const n = normRef(ref);
  if (PASSAGES[n]) return PASSAGES[n];
  const base = n.split(':')[0];
  return PASSAGES[base] || null;
};
const findTheme = (text) => {
  const t = (text || '').toLowerCase();
  return THEMES.find((th) => th.keys.some((k) => t.includes(k))) || null;
};
const wordCount = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length;

let currentOutline = null; // {title, bigIdea, passage, verseText, translation, topic, audience, length, tone, points, questions, prayer, source}

/* ------------------------------------------------------------------ */
/* Verse lookup (bible-api.com — free, no key)                         */
/* ------------------------------------------------------------------ */
async function fetchVerse(ref, translation) {
  const url = 'https://bible-api.com/' + encodeURIComponent(ref) + '?translation=' + encodeURIComponent(translation);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Verse lookup failed (HTTP ' + res.status + ')');
  const data = await res.json();
  if (data.text) return data.text.trim();
  if (data.verses && data.verses.length) return data.verses.map((v) => v.text.trim()).join(' ');
  throw new Error('No verse text returned for that reference.');
}

/* ------------------------------------------------------------------ */
/* Outline generation                                                  */
/* ------------------------------------------------------------------ */
function buildOutline({ passage, topic, audience, length, tone, verseText }) {
  const specific = findPassage(passage);
  const theme = !specific ? findTheme(topic + ' ' + passage) : null;
  const title = specific ? specific.title : (topic ? topic.charAt(0).toUpperCase() + topic.slice(1) : 'Sermon on ' + passage);
  const points = specific ? specific.points : (theme ? theme.points : GENERIC_POINTS(topic || passage));
  const bigIdea = specific ? specific.bigIdea
    : theme ? `A faithful look at ${theme.theme.toLowerCase()} from ${passage} — what God says, what it means, and how we respond.`
    : `What ${passage} teaches us about ${topic || 'walking with God'} — and what we do with it this week.`;
  const questions = specific ? specific.questions : [
    `What does this passage say about ${topic || 'our life with God'} that you had not noticed before?`,
    `Where is God asking you to trust Him more in this area?`,
    `What is one concrete step you will take this week in response?`
  ];
  const prayer = specific ? specific.prayer
    : `Father, thank You for Your Word in ${passage}. Help us not only to hear it but to do it. Give us courage to take one faithful step this week, and let our lives show what we believe. In Jesus' name, Amen.`;
  return { title, bigIdea, passage, verseText, topic, audience, length, tone,
    points, questions, prayer,
    source: specific ? 'Passage-specific outline' : (theme ? `Theme outline (${theme.theme})` : 'Structured outline') };
}

/* ------------------------------------------------------------------ */
/* Rendering                                                           */
/* ------------------------------------------------------------------ */
function outlineToMarkdown(o) {
  const lines = [];
  lines.push('# ' + o.title, '');
  lines.push('**Scripture:** ' + o.passage);
  lines.push('**Topic:** ' + (o.topic || '—') + '  |  **Audience:** ' + o.audience + '  |  **Length:** ~' + o.length + ' min  |  **Tone:** ' + o.tone);
  lines.push('');
  lines.push('> ' + o.verseText);
  lines.push('> — ' + o.passage);
  lines.push('');
  lines.push('**Big idea:** ' + o.bigIdea, '');
  o.points.forEach((p, i) => {
    lines.push(`## ${i + 1}. ${p.title}`);
    lines.push(`*${p.focus}*`, '');
    lines.push(p.explanation, '');
    lines.push(`Support: ${p.verse}`, '');
    lines.push(`Illustration: ${p.illustration}`, '');
    lines.push(`Application: ${p.application}`, '');
  });
  lines.push('## Discussion questions', '');
  o.questions.forEach((q) => lines.push('- ' + q));
  lines.push('', '## Closing prayer', '', o.prayer, '');
  lines.push('---', '*Drafted with Sermon Outline Studio. AI drafts — the pastor decides. Verify every verse in your own Bible before preaching.*');
  return lines.join('\n');
}

function renderOutline(o) {
  const body = $('resultBody');
  const words = wordCount(o.points.map((p) => p.explanation + ' ' + p.application).join(' ')) + wordCount(o.bigIdea);
  body.innerHTML = `
    <p class="meta-line">${esc(o.source)} &middot; ${esc(o.passage)} &middot; ${esc(o.audience)} &middot; ~${esc(o.length)} min &middot; outline draft ~${words} words</p>
    <h2>${esc(o.title)}</h2>
    <p class="big-idea">${esc(o.bigIdea)}</p>
    <div class="scripture"><blockquote>${esc(o.verseText)}</blockquote><cite>&mdash; ${esc(o.passage)}</cite></div>
    ${o.points.map((p, i) => `
      <div class="point">
        <h3><span class="num">${i + 1}.</span>${esc(p.title)}</h3>
        <p><span class="tag">${esc(p.focus)}</span></p>
        <p>${esc(p.explanation)}</p>
        <p class="support">Support: ${esc(p.verse)}</p>
        <p><strong>Illustration:</strong> ${esc(p.illustration)}</p>
        <p><strong>Application:</strong> ${esc(p.application)}</p>
      </div>`).join('')}
    <p class="section-label">Discussion questions</p>
    <ol class="qa-list">${o.questions.map((q) => `<li>${esc(q)}</li>`).join('')}</ol>
    <p class="section-label">Closing prayer</p>
    <p class="prayer">${esc(o.prayer)}</p>
    <div class="result-actions">
      <button class="btn btn-primary" type="button" id="copyBtn">Copy as Markdown</button>
      <button class="btn btn-ghost" type="button" id="downloadBtn">Download .md</button>
      <button class="btn btn-ghost" type="button" id="printBtn">Print</button>
      <button class="btn btn-ghost" type="button" id="saveBtn">Save to My outlines</button>
    </div>
    <p class="fineprint">AI drafts &mdash; the pastor decides. Please verify every verse in your own Bible before preaching.</p>`;
  $('resultEmpty').hidden = true;
  body.hidden = false;
  $('enhanceBtn').disabled = false;
  $('copyBtn').onclick = async () => {
    try { await navigator.clipboard.writeText(outlineToMarkdown(o)); $('copyBtn').textContent = 'Copied!'; setTimeout(() => { $('copyBtn').textContent = 'Copy as Markdown'; }, 2000); }
    catch (e) { alert('Copy failed — select the text and copy manually.'); }
  };
  $('downloadBtn').onclick = () => {
    const blob = new Blob([outlineToMarkdown(o)], { type: 'text/markdown' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = o.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-outline.md';
    a.click(); URL.revokeObjectURL(a.href);
  };
  $('printBtn').onclick = () => window.print();
  $('saveBtn').onclick = () => saveToLibrary(o);
}

/* ------------------------------------------------------------------ */
/* Library (localStorage only)                                         */
/* ------------------------------------------------------------------ */
const LIB_KEY = 'sos-library-v1';
const loadLibrary = () => { try { return JSON.parse(localStorage.getItem(LIB_KEY) || '[]'); } catch (e) { return []; } };
const storeLibrary = (items) => localStorage.setItem(LIB_KEY, JSON.stringify(items));
function renderLibrary() {
  const items = loadLibrary();
  const list = $('libraryList');
  if (!items.length) { list.innerHTML = '<li class="muted">No saved outlines yet. Generate one, then press "Save to My outlines".</li>'; return; }
  list.innerHTML = '';
  items.forEach((it, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span><strong>${esc(it.title)}</strong> — ${esc(it.passage)} <span class="muted">(${esc(it.savedAt)})</span></span>`;
    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost btn-small'; btn.type = 'button'; btn.textContent = 'Open';
    btn.onclick = () => { currentOutline = it; renderOutline(it); document.getElementById('builder').scrollIntoView({ behavior: 'smooth' }); };
    const del = document.createElement('button');
    del.className = 'btn btn-ghost btn-small'; del.type = 'button'; del.textContent = 'Delete';
    del.onclick = () => { const rest = loadLibrary().filter((_, i) => i !== idx); storeLibrary(rest); renderLibrary(); };
    li.append(btn, del); list.appendChild(li);
  });
}
function saveToLibrary(o) {
  const items = loadLibrary();
  items.unshift({ ...o, savedAt: new Date().toLocaleDateString() });
  storeLibrary(items.slice(0, 20));
  renderLibrary();
  $('saveBtn').textContent = 'Saved!';
  setTimeout(() => { const b = $('saveBtn'); if (b) b.textContent = 'Save to My outlines'; }, 2000);
}

/* ------------------------------------------------------------------ */
/* Generate flow                                                       */
/* ------------------------------------------------------------------ */
async function generate() {
  const passage = $('passage').value.trim();
  const topic = $('topic').value.trim();
  const translation = $('translation').value;
  const audience = $('audience').value;
  const length = $('length').value;
  const tone = $('tone').value;
  if (!passage) { alert('Please enter a Scripture passage first.'); return; }
  const btn = $('generateBtn');
  btn.disabled = true; btn.textContent = 'Fetching Scripture…';
  $('resultEmpty').hidden = true;
  const body = $('resultBody');
  body.hidden = false;
  body.innerHTML = '<p class="loading">Fetching the verse text, then drafting your outline…</p>';
  try {
    let verseText;
    try { verseText = await fetchVerse(passage, translation); }
    catch (e) {
      const fb = findPassage(passage);
      if (fb && fb.verse) { verseText = fb.verse + ' (KJV)'; }
      else if (fb) { verseText = '(Verse text could not be fetched right now — please check the reference in your own Bible.)'; }
      else throw e;
    }
    btn.textContent = 'Drafting outline…';
    currentOutline = buildOutline({ passage, topic, audience, length, tone, verseText });
    renderOutline(currentOutline);
    $('resultPanel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  } catch (e) {
    body.innerHTML = `<div class="error-box"><strong>Could not fetch that passage.</strong><br>${esc(e.message)}<br>Check the reference (e.g. "John 3:16" or "Psalm 23:1-6") and your connection, then try again.</div>`;
  } finally {
    btn.disabled = false; btn.textContent = 'Generate outline';
  }
}

/* ------------------------------------------------------------------ */
/* Optional LLM enhancement (Groq, OpenAI-compatible, user key only)   */
/* ------------------------------------------------------------------ */
async function enhanceWithAI() {
  const key = $('apiKey').value.trim();
  const model = $('apiModel').value.trim() || 'openai/gpt-oss-120b';
  const status = $('aiStatus');
  if (!key) { status.textContent = 'Add your free Groq API key first — it stays in this browser only.'; $('apiKey').focus(); return; }
  if (!currentOutline) { status.textContent = 'Generate an outline first.'; return; }
  const btn = $('enhanceBtn');
  btn.disabled = true; status.textContent = 'Asking the model to sharpen the points…';
  const prompt = `You are helping a pastor polish a sermon outline. Keep the SAME Scripture passage, the SAME three point titles, and the SAME structure. Improve only the wording of each point's explanation, illustration and application so it is vivid, concrete and faithful to the passage. Do not invent new Bible verses. Do not change doctrine. Return ONLY valid JSON with this shape: {"points":[{"explanation":"...","illustration":"...","application":"..."}]} — exactly ${currentOutline.points.length} points, in order.\n\nPassage: ${currentOutline.passage}\nVerse text: ${currentOutline.verseText}\nTopic: ${currentOutline.topic}\nAudience: ${currentOutline.audience}\nTone: ${currentOutline.tone}\nCurrent outline:\n${JSON.stringify(currentOutline.points, null, 2)}`;
  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
      body: JSON.stringify({ model, temperature: 0.7, messages: [{ role: 'user', content: prompt }] })
    });
    if (!res.ok) throw new Error('Groq returned HTTP ' + res.status + ' — check the key and model name.');
    const data = await res.json();
    const text = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : '';
    const parsed = JSON.parse(text.replace(/^```json\s*/i, '').replace(/```\s*$/, ''));
    if (!parsed.points || parsed.points.length !== currentOutline.points.length) throw new Error('The model returned an unexpected shape — the original outline is unchanged.');
    parsed.points.forEach((p, i) => {
      if (p.explanation) currentOutline.points[i].explanation = p.explanation;
      if (p.illustration) currentOutline.points[i].illustration = p.illustration;
      if (p.application) currentOutline.points[i].application = p.application;
    });
    currentOutline.source += ' · Enhanced with ' + model;
    renderOutline(currentOutline);
    status.textContent = 'Done — the points were sharpened by ' + model + '. Review every change before preaching.';
  } catch (e) {
    status.textContent = 'Enhancement failed: ' + e.message + ' The original outline is unchanged.';
  } finally { btn.disabled = false; }
}

/* ------------------------------------------------------------------ */
/* Wiring                                                              */
/* ------------------------------------------------------------------ */
$('outlineForm').addEventListener('submit', (e) => { e.preventDefault(); generate(); });
$('enhanceBtn').addEventListener('click', enhanceWithAI);
$('forgetKeyBtn').addEventListener('click', () => {
  localStorage.removeItem('sos-groq-key');
  $('apiKey').value = '';
  $('aiStatus').textContent = 'Key forgotten.';
});
$('apiKey').addEventListener('input', () => localStorage.setItem('sos-groq-key', $('apiKey').value));
$('apiKey').value = localStorage.getItem('sos-groq-key') || '';
document.querySelectorAll('.chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const [ref, topic] = chip.dataset.example.split('|');
    $('passage').value = ref; $('topic').value = topic;
    generate();
  });
});
$('heroExample').addEventListener('click', () => {
  $('passage').value = 'John 3:16'; $('topic').value = 'The love of God';
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
  generate();
});
$('clearLibraryBtn').addEventListener('click', () => {
  if (confirm('Delete all saved outlines in this browser?')) { storeLibrary([]); renderLibrary(); }
});
renderLibrary();

/* Deep link: ?example=john316 | psalm23 | romans828 | luke15 | phil413 | jer2911 | matt6 | 1cor13 | heb111 | isa4031 */
const params = new URLSearchParams(location.search);
const ex = params.get('example');
const EXAMPLE_MAP = { john316: ['John 3:16', 'The love of God'], psalm23: ['Psalm 23', 'The Lord is my shepherd'], romans828: ['Romans 8:28', 'God works all things for good'], luke15: ['Luke 15:11-24', 'The Father who runs'], phil413: ['Philippians 4:13', 'Strength in Christ'], jer2911: ['Jeremiah 29:11', 'Plans to give you hope'], matt6: ['Matthew 6:9-13', 'Teach us to pray'], '1cor13': ['1 Corinthians 13:4-7', 'Love that lasts'], heb111: ['Hebrews 11:1', 'Faith is being sure'], isa4031: ['Isaiah 40:31', 'Strength for the weary'] };
if (ex && EXAMPLE_MAP[ex]) {
  $('passage').value = EXAMPLE_MAP[ex][0];
  $('topic').value = EXAMPLE_MAP[ex][1];
  generate();
}
