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

const riasecInfo = {
    R: { name: "Realistic", desc: "Practical, hands-on, and mechanically inclined. Thrive in environments working with tools, machines, or nature.", careers: ["Engineer", "Mechanic", "Architect", "Farmer/Agricultural Specialist", "Surgeon"] },
    I: { name: "Investigative", desc: "Analytical, curious, and scientific. Enjoy solving complex problems through research and thinking.", careers: ["Data Scientist", "Researcher", "Physician", "Psychologist", "Environmental Scientist"] },
    A: { name: "Artistic", desc: "Creative, expressive, and original. Thrive in unstructured environments that value imagination.", careers: ["Designer", "Writer", "Musician", "Photographer", "UX/UI Designer"] },
    S: { name: "Social", desc: "Helpful, empathetic, and people-oriented. Find fulfillment in teaching, caring, and supporting others.", careers: ["Counselor", "Teacher", "Nurse", "Social Worker", "HR Specialist"] },
    E: { name: "Enterprising", desc: "Persuasive, ambitious, and leadership-oriented. Enjoy influencing, leading, and building ventures.", careers: ["Entrepreneur", "Sales Manager", "Marketing Director", "Consultant", "Politician/Advocate"] },
    C: { name: "Conventional", desc: "Organized, detail-oriented, and reliable. Thrive in structured environments with clear rules.", careers: ["Accountant", "Project Manager", "Data Analyst", "Banker", "Systems Analyst"] }
};

let ikigaiAnswers = Array(9).fill(0);
let riasecAnswers = Array(18).fill(0);
let selectedValues = [];

function init() {
    renderIkigaiQuestions();
    renderRiasecQuestions();
    renderValues();
    
    document.getElementById('navStart').addEventListener('click', scrollToAssessment);
    document.getElementById('heroStart').addEventListener('click', scrollToAssessment);
    
    document.getElementById('next1').addEventListener('click', () => goToSection(2));
    document.getElementById('prev2').addEventListener('click', () => goToSection(1));
    document.getElementById('next2').addEventListener('click', () => goToSection(3));
    document.getElementById('prev3').addEventListener('click', () => goToSection(2));
    document.getElementById('calculate').addEventListener('click', calculateResults);
    document.getElementById('restart').addEventListener('click', restartAssessment);
    document.getElementById('saveResults').addEventListener('click', () => window.print());
}

function scrollToAssessment() {
    document.getElementById('assessment').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderIkigaiQuestions() {
    const container = document.getElementById('ikigaiQuestions');
    container.innerHTML = '';
    ikigaiQuestions.forEach((q, idx) => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.innerHTML = `
            <div class="question-text">${idx + 1}. ${q}</div>
            <div class="rating-options">
                ${[1,2,3,4,5].map(val => `
                    <button class="rating-option" data-section="ikigai" data-index="${idx}" data-value="${val}">
                        ${val}
                    </button>
                `).join('')}
            </div>
        `;
        container.appendChild(item);
    });
    
    container.querySelectorAll('.rating-option[data-section="ikigai"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            const val = parseInt(btn.dataset.value);
            ikigaiAnswers[idx] = val;
            
            // Update selected state
            container.querySelectorAll(`.rating-option[data-section="ikigai"][data-index="${idx}"]`).forEach(b => {
                b.classList.remove('selected');
            });
            btn.classList.add('selected');
            
            updateProgress();
        });
    });
}

function renderRiasecQuestions() {
    const container = document.getElementById('riasecQuestions');
    container.innerHTML = '';
    riasecQuestions.forEach((q, idx) => {
        const item = document.createElement('div');
        item.className = 'question-item';
        item.innerHTML = `
            <div class="question-text">${q.text}</div>
            <div class="rating-options">
                ${['Strongly Dislike', 'Dislike', 'Neutral', 'Like', 'Strongly Like'].map((label, i) => {
                    const val = i + 1;
                    return `<button class="rating-option" data-section="riasec" data-index="${idx}" data-value="${val}" title="${label}">${val}</button>`;
                }).join('')}
            </div>
        `;
        container.appendChild(item);
    });
    
    container.querySelectorAll('.rating-option[data-section="riasec"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.index);
            const val = parseInt(btn.dataset.value);
            riasecAnswers[idx] = val;
            
            container.querySelectorAll(`.rating-option[data-section="riasec"][data-index="${idx}"]`).forEach(b => {
                b.classList.remove('selected');
            });
            btn.classList.add('selected');
            
            updateProgress();
        });
    });
}

function renderValues() {
    const grid = document.getElementById('valuesGrid');
    grid.innerHTML = '';
    values.forEach((v, idx) => {
        const chip = document.createElement('button');
        chip.className = 'value-chip';
        chip.textContent = v;
        chip.dataset.value = v;
        chip.addEventListener('click', () => {
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                selectedValues = selectedValues.filter(x => x !== v);
            } else {
                if (selectedValues.length >= 5) {
                    return; // Max 5
                }
                chip.classList.add('selected');
                selectedValues.push(v);
            }
            updateProgress();
        });
        grid.appendChild(chip);
    });
}

function updateProgress() {
    let answered = 0;
    // Count ikigai answers
    answered += ikigaiAnswers.filter(a => a > 0).length;
    // Count riasec answers
    answered += riasecAnswers.filter(a => a > 0).length;
    // Count values
    if (selectedValues.length > 0) answered += 1;
    
    const total = 9 + 18 + 1;
    const percent = Math.min(100, (answered / total) * 100);
    document.getElementById('progressFill').style.width = percent + '%';
}

function goToSection(num) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('section' + num).classList.add('active');
    
    document.getElementById('currentSection').textContent = `Section ${num} of 3`;
    document.getElementById('questionCounter').textContent = 
        num === 1 ? `Question ${ikigaiAnswers.filter(a=>a>0).length + 1} of 9` :
        num === 2 ? `Question ${riasecAnswers.filter(a=>a>0).length + 1} of 18` :
        `Values: ${selectedValues.length}/5 selected`;
    
    document.getElementById('section' + num).scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function calculateResults() {
    // Calculate Ikigai score
    const ikigaiTotal = ikigaiAnswers.reduce((a,b) => a + b, 0);
    
    // Calculate RIASEC scores
    const riasecScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    riasecQuestions.forEach((q, idx) => {
        riasecScores[q.type] += riasecAnswers[idx];
    });
    
    // Sort RIASEC
    const sortedRiasec = Object.entries(riasecScores)
        .sort((a,b) => b[1] - a[1])
        .map(x => x[0]);
    const riasecCode = sortedRiasec.slice(0, 3).join('');
    
    // Display results
    displayResults(ikigaiTotal, riasecScores, riasecCode);
    
    document.getElementById('results').classList.add('active');
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function displayResults(ikigaiTotal, riasecScores, riasecCode) {
    // Ikigai
    document.getElementById('ikigaiScore').textContent = ikigaiTotal;
    let ikigaiMeaning, ikigaiDesc;
    if (ikigaiTotal >= 40) {
        ikigaiMeaning = "Strong Sense of Purpose";
        ikigaiDesc = "You have a well-developed sense of ikigai. You feel meaning in life, have direction, and recognize your value to others.";
    } else if (ikigaiTotal >= 32) {
        ikigaiMeaning = "Growing Purpose";
        ikigaiDesc = "You have a solid foundation of meaning, with room to deepen specific areas of your purpose.";
    } else if (ikigaiTotal >= 24) {
        ikigaiMeaning = "Exploring Purpose";
        ikigaiDesc = "You're in the process of discovering your ikigai. Focus on what energizes you and where you can contribute.";
    } else {
        ikigaiMeaning = "Seeking Purpose";
        ikigaiDesc = "This is a natural starting point. Purpose often emerges through action and exploration rather than waiting to find it.";
    }
    document.getElementById('ikigaiMeaning').textContent = ikigaiMeaning;
    
    // Ikigai dimensions (approximate grouping)
    const dims = [
        { name: "Positive Emotions", score: Math.round((ikigaiAnswers[0] + ikigaiAnswers[6]) / 2 * 5) / 5 },
        { name: "Future Orientation", score: Math.round((ikigaiAnswers[1] + ikigaiAnswers[3] + ikigaiAnswers[7]) / 3 * 5) / 5 },
        { name: "Meaning & Contribution", score: Math.round((ikigaiAnswers[2] + ikigaiAnswers[4] + ikigaiAnswers[5] + ikigaiAnswers[8]) / 4 * 5) / 5 }
    ];
    const dimsDiv = document.getElementById('ikigaiDimensions');
    dimsDiv.innerHTML = dims.map(d => `
        <div class="dimension-item">
            <div class="dimension-name">${d.name}</div>
            <div class="dimension-score">${d.score.toFixed(1)} / 5</div>
        </div>
    `).join('');
    
    // RIASEC
    document.getElementById('riasecCode').textContent = riasecCode;
    document.getElementById('riasecDesc').textContent = 
        `Your profile: ${riasecInfo[riasecCode[0]].name}-${riasecInfo[riasecCode[1]].name}-${riasecInfo[riasecCode[2]].name}. ` +
        riasecInfo[riasecCode[0]].desc;
    
    const barsDiv = document.getElementById('riasecBars');
    const maxScore = 15;
    barsDiv.innerHTML = Object.entries(riasecScores)
        .sort((a,b) => b[1] - a[1])
        .map(([letter, score]) => `
            <div class="riasec-bar-item">
                <span class="riasec-letter">${letter}</span>
                <div class="riasec-bar-track">
                    <div class="riasec-bar-fill" style="width: ${(score/maxScore)*100}%"></div>
                </div>
                <span class="riasec-percent">${Math.round((score/maxScore)*100)}%</span>
            </div>
        `).join('');
    
    // Values
    const valsDiv = document.getElementById('resultsValues');
    valsDiv.innerHTML = selectedValues.map(v => `<span class="value-result-chip">${v}</span>`).join('');
    
    // Suggestions
    generateSuggestions(riasecCode, selectedValues);
}

function generateSuggestions(riasecCode, values) {
    const top = riasecCode[0];
    const info = riasecInfo[top];
    
    // Careers
    const careers = document.getElementById('careerSuggestions');
    careers.innerHTML = info.careers.slice(0, 4).map(c => `<li><strong>${c}</strong> — Aligns with your ${info.name} strengths</li>`).join('');
    
    // Business ideas
    const bizIdeas = {
        R: ["Hands-on service business (repairs, installations)", "Sustainable agriculture or landscaping", "Product design/manufacturing", "Outdoor/adventure services"],
        I: ["Research/analysis consultancy", "EdTech or learning platform", "Health/wellness tech", "Environmental solutions"],
        A: ["Creative agency or studio", "Content creation/media", "Design products/merch", "Arts education/workshops"],
        S: ["Coaching/consulting practice", "Wellness/counseling services", "Community platform", "Education/training business"],
        E: ["Service-based business solving a problem", "Marketing/agency", "Franchise/reseller", "Social enterprise"],
        C: ["Bookkeeping/finance services", "Process optimization consulting", "Systems/tools business", "Niche e-commerce with systems"]
    };
    const business = document.getElementById('businessSuggestions');
    business.innerHTML = bizIdeas[top].slice(0, 4).map(b => `<li>${b}</li>`).join('');
    
    // Meaning suggestions
    const meaning = document.getElementById('meaningSuggestions');
    const meaningIdeas = [
        "Volunteer in an area where your strengths meet a need",
        "Mentor someone who's earlier in their journey",
        "Create something useful that solves a real problem",
        "Invest time in relationships that energize you",
        "Combine your values with a cause you care about"
    ];
    meaning.innerHTML = meaningIdeas.map(m => `<li>${m}</li>`).join('');
    
    // Action steps
    const actions = document.getElementById('actionSteps');
    actions.innerHTML = [
        `<li><strong>Today:</strong> Reflect on a moment this week when you felt most alive and engaged.</li>`,
        `<li><strong>This Week:</strong> Have a conversation with someone in one of your suggested career fields.</li>`,
        `<li><strong>Next 2 Weeks:</strong> Test one small action related to your top value (${values[0] || 'your core value'}).</li>`,
        `<li><strong>Ongoing:</strong> Keep a journal of activities that give you energy vs. drain you - this reveals your ikigai in action.</li>`
    ].join('');
}

function restartAssessment() {
    ikigaiAnswers = Array(9).fill(0);
    riasecAnswers = Array(18).fill(0);
    selectedValues = [];
    
    document.querySelectorAll('.rating-option').forEach(b => b.classList.remove('selected'));
    document.querySelectorAll('.value-chip').forEach(c => c.classList.remove('selected'));
    
    document.getElementById('results').classList.remove('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById('section1').classList.add('active');
    
    document.getElementById('progressFill').style.width = '33%';
    document.getElementById('currentSection').textContent = 'Section 1 of 3';
    document.getElementById('questionCounter').textContent = 'Question 1 of 12';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', init);
