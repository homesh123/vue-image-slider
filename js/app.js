// Ikigai-9 questions (validated scale - Imai et al., 2012; Fido & Kotera, 2019)
const ikigaiQuestions = [
    "I often feel that I am happy.",
    "I would like to learn something new or start something.",
    "I think that my existence is needed by something or someone.",
    "I have some goals or dreams in my life.",
    "I feel that I have something worth passing on to the next generation.",
    "I feel that the things I do are making some contribution to society.",
    "My life is mentally rich and fulfilled.",
    "I would like to develop myself.",
    "I have a role to fulfill in my life."
];

// Three-factor structure of the Ikigai-9, three items each (0-based indexes)
const ikigaiDimensions = [
    { name: "Positive Emotions About Life", items: [0, 5, 6] },
    { name: "Proactive Attitude to the Future", items: [1, 3, 7] },
    { name: "Recognizing Your Life's Meaning", items: [2, 4, 8] }
];

// RIASEC questions (activity-based markers)
const riasecQuestions = [
    { text: "Repairing electrical or mechanical equipment", type: "R" },
    { text: "Working with plants, animals, or nature", type: "R" },
    { text: "Building or constructing things with my hands", type: "R" },
    { text: "Solving complex math or logic problems", type: "I" },
    { text: "Conducting research or experiments", type: "I" },
    { text: "Analyzing data to understand patterns", type: "I" },
    { text: "Creating art, music, or writing creatively", type: "A" },
    { text: "Designing things with original ideas", type: "A" },
    { text: "Performing or expressing ideas artistically", type: "A" },
    { text: "Helping, teaching, or counseling others", type: "S" },
    { text: "Working in teams to support people's wellbeing", type: "S" },
    { text: "Resolving conflicts and bringing people together", type: "S" },
    { text: "Leading projects or persuading others", type: "E" },
    { text: "Starting a business or selling ideas", type: "E" },
    { text: "Taking risks to achieve ambitious goals", type: "E" },
    { text: "Organizing data, files, or schedules", type: "C" },
    { text: "Following procedures with precision and accuracy", type: "C" },
    { text: "Managing budgets or keeping detailed records", type: "C" }
];

const values = [
    "Autonomy & Freedom", "Helping Others", "Creativity & Innovation", "Growth & Learning",
    "Financial Security", "Impact & Change", "Family & Relationships", "Adventure & Exploration",
    "Justice & Fairness", "Stability & Structure", "Recognition & Achievement", "Health & Wellbeing",
    "Spirituality & Meaning", "Nature & Environment", "Knowledge & Wisdom", "Community & Belonging"
];

// What the world needs: who you serve, the change you want, and roles that do this work
const causes = [
    { label: "Mental health", who: "people who are struggling", outcome: "no one has to face their struggles alone", roles: ["Counselor or therapist", "Peer-support worker", "Wellbeing program designer"] },
    { label: "Education & learning", who: "learners of every age", outcome: "everyone gets the chance to learn and grow", roles: ["Teacher or tutor", "Instructional designer", "Education nonprofit coordinator"] },
    { label: "Climate & nature", who: "communities and the natural world", outcome: "the planet stays livable for generations to come", roles: ["Sustainability consultant", "Conservation worker", "Renewable energy technician"] },
    { label: "Poverty & opportunity", who: "people facing hardship", outcome: "more people can build a secure, dignified life", roles: ["Social worker", "Community development officer", "Job skills trainer"] },
    { label: "Health & healing", who: "people who are sick or in pain", outcome: "people live healthier, fuller lives", roles: ["Nurse or health worker", "Public health educator", "Health-tech product builder"] },
    { label: "Children & youth", who: "children and young people", outcome: "young people grow up safe, seen and confident", roles: ["Youth worker or coach", "Pediatric professional", "Mentoring program leader"] },
    { label: "Elderly & caregiving", who: "older people and their families", outcome: "people age with dignity and connection", roles: ["Care coordinator", "Occupational therapist", "Elder-care service founder"] },
    { label: "Animals", who: "animals", outcome: "animals are protected and treated with kindness", roles: ["Veterinary professional", "Animal shelter manager", "Wildlife conservationist"] },
    { label: "Justice & equality", who: "people who are treated unfairly", outcome: "everyone is treated fairly and with respect", roles: ["Lawyer or paralegal", "Policy advocate", "Inclusion and equity lead"] },
    { label: "Arts & culture", who: "audiences and communities", outcome: "life feels more beautiful, expressive and connected", roles: ["Artist or designer", "Arts program manager", "Cultural content creator"] },
    { label: "Community & belonging", who: "my local community", outcome: "people feel they truly belong somewhere", roles: ["Community organizer", "Event or community space host", "Nonprofit program manager"] },
    { label: "Technology for good", who: "people technology leaves behind", outcome: "technology makes life better for everyone", roles: ["Accessible-tech developer", "Digital skills trainer", "Civic tech product manager"] },
    { label: "Faith & spirituality", who: "people seeking meaning", outcome: "people find peace and meaning in their lives", roles: ["Chaplain or spiritual guide", "Mindfulness teacher", "Faith community leader"] },
    { label: "Family & relationships", who: "families", outcome: "families and relationships thrive", roles: ["Family therapist", "Parenting coach", "Relationship educator"] },
    { label: "Local economy & work", who: "small businesses and workers", outcome: "people can earn a good living doing honest work", roles: ["Small-business advisor", "Career coach", "Social enterprise founder"] }
];

// What you're good at, with the phrase used in the purpose statement
const strengths = [
    { label: "Explaining & teaching", phrase: "ability to explain and teach" },
    { label: "Listening & empathy", phrase: "empathy" },
    { label: "Fixing & building", phrase: "practical, hands-on skill" },
    { label: "Organizing & planning", phrase: "gift for organizing" },
    { label: "Coming up with ideas", phrase: "creativity" },
    { label: "Analyzing problems", phrase: "analytical mind" },
    { label: "Leading & motivating", phrase: "leadership" },
    { label: "Caring for others", phrase: "care for others" },
    { label: "Writing & storytelling", phrase: "storytelling" },
    { label: "Persuading & selling", phrase: "power to persuade" },
    { label: "Noticing details", phrase: "eye for detail" },
    { label: "Staying calm under pressure", phrase: "calm under pressure" },
    { label: "Learning quickly", phrase: "hunger to learn" },
    { label: "Bringing people together", phrase: "ability to bring people together" },
    { label: "Humor & lifting moods", phrase: "humor" },
    { label: "Patience & persistence", phrase: "persistence" },
    { label: "Working with technology", phrase: "technical skill" },
    { label: "Making things beautiful", phrase: "sense of beauty" }
];

const lifeStages = [
    { id: "student", label: "Student" },
    { id: "early", label: "Early in my career" },
    { id: "mid", label: "Established in my career" },
    { id: "change", label: "Wanting a career change" },
    { id: "between", label: "Between jobs" },
    { id: "caregiver", label: "Parent or caregiver" },
    { id: "retired", label: "Retired or semi-retired" }
];

const reflectionPrompts = [
    { key: "flow", label: "When do you lose track of time? What were you doing?" },
    { key: "thanks", label: "What do people often thank you for or ask your help with?" },
    { key: "moved", label: "What problem in the world moves you to anger, tears or hope?" },
    { key: "freeDay", label: "If money were no issue, how would you spend your days?" },
    { key: "who", label: "Who would you most love to help? (e.g. \"new parents\", \"kids in my town\")", short: true }
];

const riasecInfo = {
    R: { name: "Realistic", verb: "build, fix and make practical things for", desc: "Practical, hands-on, and mechanically inclined. Thrive in environments working with tools, machines, or nature.", careers: ["Engineer", "Mechanic or Technician", "Architect", "Farmer/Agricultural Specialist", "Surgeon"] },
    I: { name: "Investigative", verb: "investigate and solve problems for", desc: "Analytical, curious, and scientific. Enjoy solving complex problems through research and thinking.", careers: ["Data Scientist", "Researcher", "Physician", "Psychologist", "Environmental Scientist"] },
    A: { name: "Artistic", verb: "create work that inspires and moves", desc: "Creative, expressive, and original. Thrive in unstructured environments that value imagination.", careers: ["Designer", "Writer", "Musician", "Photographer", "UX/UI Designer"] },
    S: { name: "Social", verb: "support, guide and empower", desc: "Helpful, empathetic, and people-oriented. Find fulfillment in teaching, caring, and supporting others.", careers: ["Counselor", "Teacher", "Nurse", "Social Worker", "HR Specialist"] },
    E: { name: "Enterprising", verb: "lead, organize and champion change for", desc: "Persuasive, ambitious, and leadership-oriented. Enjoy influencing, leading, and building ventures.", careers: ["Entrepreneur", "Sales Manager", "Marketing Director", "Consultant", "Politician/Advocate"] },
    C: { name: "Conventional", verb: "bring order, clarity and reliability to", desc: "Organized, detail-oriented, and reliable. Thrive in structured environments with clear rules.", careers: ["Accountant", "Project Manager", "Data Analyst", "Banker", "Systems Analyst"] }
};

const bizIdeas = {
    R: ["Hands-on service business (repairs, installations)", "Sustainable agriculture or landscaping", "Product design/manufacturing", "Outdoor/adventure services"],
    I: ["Research/analysis consultancy", "EdTech or learning platform", "Health/wellness tech", "Environmental solutions"],
    A: ["Creative agency or studio", "Content creation/media", "Design products/merch", "Arts education/workshops"],
    S: ["Coaching/consulting practice", "Wellness/counseling services", "Community platform", "Education/training business"],
    E: ["Service-based business solving a problem", "Marketing/agency", "Franchise/reseller", "Social enterprise"],
    C: ["Bookkeeping/finance services", "Process optimization consulting", "Systems/tools business", "Niche e-commerce with systems"]
};

const STORAGE_KEY = 'pathfinder-v1';
const TOTAL_STEPS = 5;
const limits = { values: 5, causes: 3, strengths: 5, stage: 1 };

let state = freshState();

function freshState() {
    return {
        ikigai: Array(ikigaiQuestions.length).fill(0),
        riasec: Array(riasecQuestions.length).fill(0),
        values: [],
        causes: [],
        strengths: [],
        stage: [],
        reflections: {},
        statement: '',
        statementEdited: false,
        completed: false
    };
}

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* storage unavailable: answers just won't persist */ }
}

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (saved && saved.ikigai && saved.ikigai.length === ikigaiQuestions.length &&
            saved.riasec && saved.riasec.length === riasecQuestions.length) {
            state = Object.assign(freshState(), saved);
        }
    } catch (e) { /* ignore corrupt or unavailable storage */ }
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function init() {
    loadState();
    renderRatings('ikigaiQuestions', ikigaiQuestions.map((q, i) => `${i + 1}. ${q}`), 'ikigai',
        ['Not at all', 'Slightly', 'Somewhat', 'Mostly', 'Very much']);
    renderRatings('riasecQuestions', riasecQuestions.map(q => q.text), 'riasec',
        ['Strongly Dislike', 'Dislike', 'Neutral', 'Like', 'Strongly Like']);
    renderChips('valuesGrid', values, 'values');
    renderChips('causesGrid', causes.map(c => c.label), 'causes');
    renderChips('strengthsGrid', strengths.map(s => s.label), 'strengths');
    renderChips('stageGrid', lifeStages.map(s => s.label), 'stage');
    renderReflections();

    document.getElementById('navStart').addEventListener('click', scrollToAssessment);
    document.getElementById('heroStart').addEventListener('click', scrollToAssessment);

    document.getElementById('next1').addEventListener('click', () => tryAdvance(1));
    document.getElementById('prev2').addEventListener('click', () => goToSection(1));
    document.getElementById('next2').addEventListener('click', () => tryAdvance(2));
    document.getElementById('prev3').addEventListener('click', () => goToSection(2));
    document.getElementById('next3').addEventListener('click', () => tryAdvance(3));
    document.getElementById('prev4').addEventListener('click', () => goToSection(3));
    document.getElementById('next4').addEventListener('click', () => tryAdvance(4));
    document.getElementById('prev5').addEventListener('click', () => goToSection(4));
    document.getElementById('calculate').addEventListener('click', () => {
        if (validateSection(5)) calculateResults(true);
    });
    document.getElementById('restart').addEventListener('click', restartAssessment);
    document.getElementById('saveResults').addEventListener('click', () => window.print());
    document.getElementById('copyStatement').addEventListener('click', copyStatement);

    const statementEl = document.getElementById('purposeStatement');
    statementEl.addEventListener('input', () => {
        state.statement = statementEl.textContent.trim();
        state.statementEdited = true;
        saveState();
    });

    updateProgress(1);
    if (state.completed) calculateResults(false);
}

function scrollToAssessment() {
    document.getElementById('assessment').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderRatings(containerId, questions, key, labels) {
    const container = document.getElementById(containerId);
    container.innerHTML = questions.map((text, idx) => `
        <div class="question-item" data-index="${idx}">
            <div class="question-text">${text}</div>
            <div class="rating-options">
                ${labels.map((label, i) => `
                    <button class="rating-option${state[key][idx] === i + 1 ? ' selected' : ''}" data-index="${idx}" data-value="${i + 1}" title="${label}">
                        ${i + 1}<span class="rating-label">${label}</span>
                    </button>`).join('')}
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.rating-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            state[key][idx] = parseInt(btn.dataset.value);
            const item = btn.closest('.question-item');
            item.querySelectorAll('.rating-option').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            item.classList.remove('missing');
            saveState();
            updateProgress();
        });
    });
}

function renderChips(containerId, labels, key) {
    const grid = document.getElementById(containerId);
    const max = limits[key];
    grid.innerHTML = '';
    labels.forEach(label => {
        const chip = document.createElement('button');
        chip.className = 'value-chip' + (state[key].includes(label) ? ' selected' : '');
        chip.textContent = label;
        chip.addEventListener('click', () => {
            if (state[key].includes(label)) {
                state[key] = state[key].filter(x => x !== label);
                chip.classList.remove('selected');
            } else if (max === 1) {
                state[key] = [label];
                grid.querySelectorAll('.value-chip').forEach(c => c.classList.remove('selected'));
                chip.classList.add('selected');
            } else {
                if (state[key].length >= max) {
                    flashError(grid, `You can pick up to ${max}. Unselect one to choose another.`);
                    return;
                }
                state[key].push(label);
                chip.classList.add('selected');
            }
            saveState();
            updateProgress();
        });
        grid.appendChild(chip);
    });
}

function renderReflections() {
    const container = document.getElementById('reflectionFields');
    container.innerHTML = reflectionPrompts.map(p => `
        <label class="reflection-field">
            <span>${p.label}</span>
            ${p.short
                ? `<input type="text" data-key="${p.key}" maxlength="80">`
                : `<textarea data-key="${p.key}" rows="2" maxlength="500"></textarea>`}
        </label>
    `).join('');
    container.querySelectorAll('[data-key]').forEach(field => {
        field.value = state.reflections[field.dataset.key] || '';
        field.addEventListener('input', () => {
            state.reflections[field.dataset.key] = field.value;
            saveState();
        });
    });
}

function flashError(el, msg) {
    const error = el.closest('.section').querySelector('.section-error');
    error.textContent = msg;
}

function validateSection(num) {
    const error = document.getElementById('error' + num);
    error.textContent = '';

    if (num === 1 || num === 2) {
        const key = num === 1 ? 'ikigai' : 'riasec';
        const container = document.getElementById(num === 1 ? 'ikigaiQuestions' : 'riasecQuestions');
        const missing = state[key].map((v, i) => v === 0 ? i : -1).filter(i => i >= 0);
        container.querySelectorAll('.question-item').forEach(item => {
            item.classList.toggle('missing', missing.includes(parseInt(item.dataset.index)));
        });
        if (missing.length) {
            error.textContent = `Please answer the ${missing.length} highlighted question${missing.length > 1 ? 's' : ''}.`;
            container.querySelector('.question-item.missing').scrollIntoView({ behavior: 'smooth', block: 'center' });
            return false;
        }
    }
    if (num === 3 && (!state.values.length || !state.causes.length)) {
        error.textContent = 'Pick at least one value and one cause — even a rough guess is a great start.';
        return false;
    }
    if (num === 4 && !state.strengths.length) {
        error.textContent = 'Pick at least one strength. If you are unsure, choose what a close friend would say about you.';
        return false;
    }
    if (num === 5 && !state.stage.length) {
        error.textContent = 'Choose the life stage that fits you best so your plan is realistic.';
        return false;
    }
    return true;
}

function tryAdvance(num) {
    if (validateSection(num)) goToSection(num + 1);
}

function sectionProgress(num) {
    switch (num) {
        case 1: return `${state.ikigai.filter(a => a > 0).length} of ${ikigaiQuestions.length} answered`;
        case 2: return `${state.riasec.filter(a => a > 0).length} of ${riasecQuestions.length} answered`;
        case 3: return `Values: ${state.values.length}/${limits.values} • Causes: ${state.causes.length}/${limits.causes}`;
        case 4: return `Strengths: ${state.strengths.length}/${limits.strengths} selected`;
        default: return state.stage.length ? 'Almost there' : 'Choose your life stage';
    }
}

function currentSectionNum() {
    const active = document.querySelector('.section.active');
    return active ? parseInt(active.id.replace('section', '')) : 1;
}

function updateProgress(num) {
    num = num || currentSectionNum();
    const answered = state.ikigai.filter(a => a > 0).length +
        state.riasec.filter(a => a > 0).length +
        ['values', 'causes', 'strengths', 'stage'].filter(k => state[k].length > 0).length;
    const total = ikigaiQuestions.length + riasecQuestions.length + 4;
    document.getElementById('progressFill').style.width = Math.min(100, (answered / total) * 100) + '%';
    document.getElementById('currentSection').textContent = `Step ${num} of ${TOTAL_STEPS}`;
    document.getElementById('questionCounter').textContent = sectionProgress(num);
}

function goToSection(num) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('section' + num).classList.add('active');
    updateProgress(num);
    document.getElementById('assessment').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function riasecResults() {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    riasecQuestions.forEach((q, idx) => {
        scores[q.type] += state.riasec[idx];
    });
    const code = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(x => x[0]).slice(0, 3).join('');
    return { scores, code };
}

function buildStatement(code) {
    const chosenStrengths = state.strengths.map(label => strengths.find(s => s.label === label)).filter(Boolean);
    const chosenCauses = state.causes.map(label => causes.find(c => c.label === label)).filter(Boolean);
    const strengthText = chosenStrengths.length > 1
        ? `${chosenStrengths[0].phrase} and ${chosenStrengths[1].phrase}`
        : chosenStrengths[0].phrase;
    const who = (state.reflections.who || '').trim() || chosenCauses[0].who;
    return `My purpose is to use my ${strengthText} to ${riasecInfo[code[0]].verb} ${who}, so that ${chosenCauses[0].outcome}.`;
}

function calculateResults(scroll) {
    const ikigaiTotal = state.ikigai.reduce((a, b) => a + b, 0);
    const { scores, code } = riasecResults();

    // Keep the person's own wording once they've edited the draft
    if (!state.statementEdited || !state.statement) {
        state.statement = buildStatement(code);
    }
    state.completed = true;
    saveState();

    displayResults(ikigaiTotal, scores, code);

    document.getElementById('results').classList.add('active');
    if (scroll) {
        document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function list(items) {
    return items.map(i => `<li>${i}</li>`).join('');
}

function displayResults(ikigaiTotal, riasecScores, riasecCode) {
    const chosenCauses = state.causes.map(label => causes.find(c => c.label === label)).filter(Boolean);
    const top = riasecInfo[riasecCode[0]];
    const second = riasecInfo[riasecCode[1]];

    // Purpose statement
    document.getElementById('purposeStatement').textContent = state.statement;

    // Ikigai map: the four overlapping circles
    const loved = riasecQuestions
        .map((q, i) => ({ text: q.text, score: state.riasec[i] }))
        .filter(q => q.score >= 4)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(q => escapeHtml(q.text));
    if (state.reflections.flow && state.reflections.flow.trim()) {
        loved.unshift(`<em>"${escapeHtml(state.reflections.flow.trim())}"</em>`);
    }
    const paid = [top.careers[0], top.careers[1], second.careers[0]];
    if (chosenCauses[0] && !paid.some(c => chosenCauses[0].roles[0].toLowerCase().includes(c.toLowerCase()))) {
        paid.push(chosenCauses[0].roles[0]);
    }
    const quadrants = [
        { title: "What you love", sub: "Passion", items: loved.length ? loved : [`${top.name} and ${second.name} activities`] },
        { title: "What you're good at", sub: "Strengths", items: state.strengths.map(escapeHtml) },
        { title: "What the world needs", sub: "Mission", items: state.causes.map(escapeHtml) },
        { title: "What you can be paid for", sub: "Vocation", items: [...new Set(paid)] }
    ];
    document.getElementById('ikigaiMap').innerHTML = quadrants.map(q => `
        <div class="map-quadrant">
            <div class="map-sub">${q.sub}</div>
            <h4>${q.title}</h4>
            <ul>${list(q.items)}</ul>
        </div>
    `).join('');

    // Ikigai-9 profile
    document.getElementById('ikigaiScore').textContent = ikigaiTotal;
    let ikigaiMeaning, ikigaiDesc;
    if (ikigaiTotal >= 40) {
        ikigaiMeaning = "Strong Sense of Purpose";
        ikigaiDesc = "You have a well-developed sense of ikigai. You feel meaning in life, have direction, and recognize your value to others. Your next step is to deepen and share it.";
    } else if (ikigaiTotal >= 32) {
        ikigaiMeaning = "Growing Purpose";
        ikigaiDesc = "You have a solid foundation of meaning, with room to deepen specific areas of your purpose. Look at your lowest dimension below — that's where small changes will matter most.";
    } else if (ikigaiTotal >= 24) {
        ikigaiMeaning = "Exploring Purpose";
        ikigaiDesc = "You're in the process of discovering your ikigai. Focus on what energizes you and where you can contribute — your 30-day experiment below is designed for exactly this stage.";
    } else {
        ikigaiMeaning = "Seeking Purpose";
        ikigaiDesc = "This is a natural starting point, and many people with deep purpose began here. Purpose usually emerges through small actions rather than waiting to find it — start with week 1 of your plan.";
    }
    document.getElementById('ikigaiMeaning').textContent = ikigaiMeaning;
    document.getElementById('ikigaiDesc').textContent = ikigaiDesc;
    document.getElementById('supportNote').hidden = ikigaiTotal > 22;

    document.getElementById('ikigaiDimensions').innerHTML = ikigaiDimensions.map(d => {
        const avg = d.items.reduce((sum, i) => sum + state.ikigai[i], 0) / d.items.length;
        return `
            <div class="dimension-item">
                <div class="dimension-name">${d.name}</div>
                <div class="dimension-score">${avg.toFixed(1)} / 5</div>
            </div>`;
    }).join('');

    // RIASEC
    document.getElementById('riasecCode').textContent = riasecCode;
    document.getElementById('riasecDesc').textContent =
        `Your profile: ${top.name}-${second.name}-${riasecInfo[riasecCode[2]].name}. ` + top.desc;

    const maxScore = 15;
    document.getElementById('riasecBars').innerHTML = Object.entries(riasecScores)
        .sort((a, b) => b[1] - a[1])
        .map(([letter, score]) => `
            <div class="riasec-bar-item">
                <span class="riasec-letter" title="${riasecInfo[letter].name}">${letter}</span>
                <div class="riasec-bar-track">
                    <div class="riasec-bar-fill" style="width: ${(score / maxScore) * 100}%"></div>
                </div>
                <span class="riasec-percent">${Math.round((score / maxScore) * 100)}%</span>
            </div>
        `).join('');

    // Values and causes
    document.getElementById('resultsValues').innerHTML = state.values.map(v => `<span class="value-result-chip">${escapeHtml(v)}</span>`).join('');
    document.getElementById('resultsCauses').innerHTML = state.causes.map(v => `<span class="value-result-chip">${escapeHtml(v)}</span>`).join('');

    // Reflection answers echoed back
    const answered = reflectionPrompts.filter(p => (state.reflections[p.key] || '').trim());
    document.getElementById('reflectionCard').hidden = answered.length === 0;
    document.getElementById('reflectionEcho').innerHTML = answered.map(p => `
        <dt>${p.label}</dt>
        <dd>${escapeHtml(state.reflections[p.key].trim())}</dd>
    `).join('');

    generateSuggestions(riasecCode, chosenCauses);
}

function generateSuggestions(riasecCode, chosenCauses) {
    const top = riasecInfo[riasecCode[0]];
    const second = riasecInfo[riasecCode[1]];
    const cause = chosenCauses[0];
    const who = (state.reflections.who || '').trim() || cause.who;
    const strength = state.strengths[0].toLowerCase();
    const value = state.values[0];
    const stage = (lifeStages.find(s => s.label === state.stage[0]) || lifeStages[1]).id;
    // Avoid "Counselor or Counselor or therapist" when the two overlap
    const exampleRole = cause.roles[0].toLowerCase().includes(top.careers[0].toLowerCase())
        ? cause.roles[0]
        : `${top.careers[0]} or ${cause.roles[0]}`;

    // Careers from the top two interest types
    document.getElementById('careerSuggestions').innerHTML = list([
        ...top.careers.slice(0, 3).map(c => `<strong>${c}</strong> — fits your ${top.name} interests`),
        ...second.careers.slice(0, 2).map(c => `<strong>${c}</strong> — draws on your ${second.name} side`)
    ]);

    // Roles that directly serve the causes chosen
    document.getElementById('causeRoles').innerHTML = list(chosenCauses.flatMap(c =>
        c.roles.map(r => `<strong>${r}</strong> — ${escapeHtml(c.label.toLowerCase())}`)
    ).slice(0, 6));

    document.getElementById('businessSuggestions').innerHTML = list([
        ...bizIdeas[riasecCode[0]].slice(0, 3),
        `A small service or product that helps ${escapeHtml(who)} — start with 3 real conversations about their biggest problem`
    ]);

    // Purpose doesn't require a job change
    document.getElementById('meaningSuggestions').innerHTML = list([
        `Give 1–2 hours a week to a ${escapeHtml(cause.label.toLowerCase())} group or cause near you (or online).`,
        `Use your strength in <strong>${escapeHtml(strength)}</strong> to help one person this week — no strings attached.`,
        `Make one decision this month guided by your value of <strong>${escapeHtml(value)}</strong>.`,
        `Mentor someone earlier in their journey — your experience is more valuable than you think.`,
        `At work or at home, notice the tasks that use your strengths and do a little more of them.`
    ]);

    const week3 = {
        student: `Join a club, course or project connected to ${escapeHtml(cause.label.toLowerCase())}, or shadow someone working as a ${top.careers[0]}.`,
        early: `Volunteer for one task at work that uses your ${escapeHtml(strength)}, or start a tiny side project for ${escapeHtml(who)}.`,
        mid: `Craft your current job: move about 10% of your week toward work that uses your ${escapeHtml(strength)} and serves ${escapeHtml(who)}.`,
        change: `Test before you leap: take a short course or do one small project as a ${exampleRole} and see how it feels.`,
        between: `Offer your ${escapeHtml(strength)} on a short freelance or volunteer project for ${escapeHtml(who)} — it builds proof, contacts and confidence.`,
        caregiver: `Find a 1–2 hour weekly way to serve ${escapeHtml(who)} that fits around your care duties, even from home (online mentoring, a community group, writing).`,
        retired: `Offer your lifetime of experience: mentor, volunteer or teach in an area connected to ${escapeHtml(cause.label.toLowerCase())}.`
    }[stage];

    document.getElementById('actionSteps').innerHTML = list([
        `<strong>Week 1 — Notice:</strong> Read your purpose statement each morning. Each evening, write down one moment that gave you energy and one that drained you.`,
        `<strong>Week 2 — Talk:</strong> Have two conversations with people who work as a ${exampleRole}, or who serve ${escapeHtml(who)}. Ask what a normal day looks like.`,
        `<strong>Week 3 — Try:</strong> ${week3}`,
        `<strong>Week 4 — Reflect:</strong> What energized you most? Rewrite your purpose statement with what you learned, then choose your next 90-day experiment.`
    ]);
}

function copyStatement() {
    const feedback = document.getElementById('copyFeedback');
    const text = document.getElementById('purposeStatement').textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => { feedback.textContent = 'Purpose statement copied.'; })
            .catch(() => { feedback.textContent = 'Could not copy — select the statement and copy it manually.'; });
    } else {
        feedback.textContent = 'Could not copy — select the statement and copy it manually.';
    }
}

function restartAssessment() {
    if (!confirm('Start over? Your current answers and purpose statement will be cleared.')) return;
    state = freshState();
    saveState();

    document.querySelectorAll('.rating-option, .value-chip').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.question-item').forEach(q => q.classList.remove('missing'));
    document.querySelectorAll('.section-error').forEach(e => { e.textContent = ''; });
    document.querySelectorAll('#reflectionFields [data-key]').forEach(f => { f.value = ''; });
    document.getElementById('copyFeedback').textContent = '';

    document.getElementById('results').classList.remove('active');
    goToSection(1);
}

document.addEventListener('DOMContentLoaded', init);
