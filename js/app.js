// Pathfinder — one-question-at-a-time purpose assessment.
// Sources for every instrument and recommendation are listed in methodology.html.

// Ikigai-9 (Imai et al., 2012; English version: Fido, Kotera & Asano, 2020)
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

// Original three-factor grouping (Imai et al., 2012). The English validation favoured a
// single total, so these are shown only as a rough guide next to the total score.
const ikigaiDimensions = [
    { name: "Positive feelings about life", items: [0, 5, 6] },
    { name: "Drive toward the future", items: [1, 3, 7] },
    { name: "Sense that you matter", items: [2, 4, 8] }
];

const ikigaiScale = ["Does not apply at all", "Rarely applies", "Somewhat applies", "Mostly applies", "Applies very much"];
const interestScale = ["Strongly dislike", "Dislike", "Not sure", "Like", "Strongly like"];

// Activity items written for Pathfinder, four per Holland type, interleaved so the
// same type never appears twice in a row (reduces response-pattern bias).
const riasecQuestions = [
    { text: "Repair a bike, car or household appliance", type: "R" },
    { text: "Figure out why something works the way it does", type: "I" },
    { text: "Write stories, songs or poems", type: "A" },
    { text: "Teach someone a new skill", type: "S" },
    { text: "Convince people to back your idea", type: "E" },
    { text: "Keep accurate records or a budget", type: "C" },
    { text: "Build or assemble something with your hands", type: "R" },
    { text: "Run an experiment to test an idea", type: "I" },
    { text: "Design a logo, a room, an outfit or a website", type: "A" },
    { text: "Support a friend who is going through a hard time", type: "S" },
    { text: "Start and run your own project or business", type: "E" },
    { text: "Organize files, schedules or a workspace", type: "C" },
    { text: "Work outdoors with plants, animals or the land", type: "R" },
    { text: "Analyze data to find a pattern", type: "I" },
    { text: "Perform on stage: act, sing, dance or play music", type: "A" },
    { text: "Help people stay healthy or recover", type: "S" },
    { text: "Lead a team toward a goal", type: "E" },
    { text: "Check work carefully for errors", type: "C" },
    { text: "Use tools or operate machinery", type: "R" },
    { text: "Study a science or medical topic in depth", type: "I" },
    { text: "Photograph, draw or paint something", type: "A" },
    { text: "Volunteer to help people in your community", type: "S" },
    { text: "Negotiate a deal or sell a product", type: "E" },
    { text: "Follow a clear step-by-step process to get a job done right", type: "C" }
];

// Holland's hexagon order: neighbours are similar types, opposites are least similar.
const HEXAGON = "RIASEC";

const riasecInfo = {
    R: { name: "Realistic", verb: "build, fix and make practical things for", desc: "Practical and hands-on. You like working with tools, machines, the body or nature, and seeing real results.", careers: ["Engineer or technician", "Electrician or mechanic", "Architect or builder", "Agriculture or conservation specialist", "Physical therapist or surgeon"] },
    I: { name: "Investigative", verb: "investigate and solve problems for", desc: "Curious and analytical. You like understanding how things work and solving complex problems.", careers: ["Researcher or scientist", "Data scientist or analyst", "Doctor or pharmacist", "Psychologist", "Software engineer"] },
    A: { name: "Artistic", verb: "create work that inspires and moves", desc: "Expressive and original. You like making new things and environments that value imagination.", careers: ["Designer (graphic, product or UX)", "Writer or content creator", "Musician or performer", "Photographer or filmmaker", "Art director"] },
    S: { name: "Social", verb: "support, guide and empower", desc: "Warm and people-oriented. You find fulfilment in teaching, caring for and supporting others.", careers: ["Teacher or trainer", "Counselor or social worker", "Nurse or health worker", "Coach or mentor", "HR or community manager"] },
    E: { name: "Enterprising", verb: "lead, organize and champion change for", desc: "Energetic and ambitious. You like leading, persuading and building ventures.", careers: ["Entrepreneur or founder", "Sales or business development", "Marketing manager", "Consultant", "Advocate or public leader"] },
    C: { name: "Conventional", verb: "bring order, clarity and reliability to", desc: "Organized and dependable. You like clear structure, accuracy and getting the details right.", careers: ["Accountant or financial analyst", "Project or operations manager", "Data or quality analyst", "Administrator or office manager", "Logistics coordinator"] }
};

const bizIdeas = {
    R: ["A repair, installation or maintenance service", "Gardening, landscaping or local food", "Making and selling a physical product"],
    I: ["A research or data analysis service", "An educational course or explainer channel", "A tool that solves a technical problem you understand"],
    A: ["A creative studio or freelance practice", "Content, media or a newsletter", "Workshops that teach your craft"],
    S: ["A coaching, tutoring or training practice", "A wellbeing or care service", "A community or support group"],
    E: ["A service business solving a problem you've seen", "A marketing or sales agency for causes you believe in", "A social enterprise"],
    C: ["Bookkeeping or admin services for small businesses", "Process and systems consulting", "A carefully run online shop"]
};

// What the world needs: who you serve, the change you want, and roles that do this work
const causes = [
    { label: "Mental health", who: "people who are struggling", outcome: "no one has to face their struggles alone", roles: ["Counselor or therapist", "Peer-support worker", "Wellbeing program designer"] },
    { label: "Education", who: "learners of every age", outcome: "everyone gets the chance to learn and grow", roles: ["Teacher or tutor", "Learning designer", "Education nonprofit coordinator"] },
    { label: "Climate & nature", who: "communities and the natural world", outcome: "the planet stays livable for generations to come", roles: ["Sustainability specialist", "Conservation worker", "Renewable energy technician"] },
    { label: "Poverty & opportunity", who: "people facing hardship", outcome: "more people can build a secure, dignified life", roles: ["Social worker", "Community development officer", "Job skills trainer"] },
    { label: "Health & healing", who: "people who are sick or in pain", outcome: "people live healthier, fuller lives", roles: ["Nurse or health worker", "Public health educator", "Health-tech builder"] },
    { label: "Children & youth", who: "children and young people", outcome: "young people grow up safe, seen and confident", roles: ["Youth worker or coach", "Early-years educator", "Mentoring program leader"] },
    { label: "Older people & caregiving", who: "older people and their families", outcome: "people age with dignity and connection", roles: ["Care coordinator", "Occupational therapist", "Elder-care service founder"] },
    { label: "Animals", who: "animals", outcome: "animals are protected and treated with kindness", roles: ["Veterinary professional", "Animal shelter manager", "Wildlife conservationist"] },
    { label: "Justice & equality", who: "people who are treated unfairly", outcome: "everyone is treated fairly and with respect", roles: ["Lawyer or paralegal", "Policy advocate", "Inclusion lead"] },
    { label: "Arts & culture", who: "audiences and communities", outcome: "life feels more beautiful, expressive and connected", roles: ["Artist or designer", "Arts program manager", "Cultural content creator"] },
    { label: "Community & belonging", who: "my local community", outcome: "people feel they truly belong somewhere", roles: ["Community organizer", "Community space host", "Nonprofit program manager"] },
    { label: "Technology for good", who: "people technology leaves behind", outcome: "technology makes life better for everyone", roles: ["Accessibility specialist", "Digital skills trainer", "Civic tech product manager"] },
    { label: "Faith & spirituality", who: "people seeking meaning", outcome: "people find peace and meaning in their lives", roles: ["Chaplain or spiritual guide", "Mindfulness teacher", "Faith community leader"] },
    { label: "Family & relationships", who: "families", outcome: "families and relationships thrive", roles: ["Family therapist", "Parenting coach", "Relationship educator"] },
    { label: "Local economy & work", who: "small businesses and workers", outcome: "people can earn a good living doing honest work", roles: ["Small-business advisor", "Career coach", "Social enterprise founder"] }
];

// What you're good at, with the phrase used in the purpose statement
const strengths = [
    { label: "Explaining & teaching", phrase: "ability to explain things" },
    { label: "Listening & empathy", phrase: "empathy" },
    { label: "Fixing & building", phrase: "practical skill" },
    { label: "Organizing & planning", phrase: "gift for organizing" },
    { label: "Coming up with ideas", phrase: "creativity" },
    { label: "Solving problems", phrase: "problem-solving mind" },
    { label: "Leading & motivating", phrase: "leadership" },
    { label: "Caring for others", phrase: "care for others" },
    { label: "Writing & storytelling", phrase: "storytelling" },
    { label: "Persuading", phrase: "power to persuade" },
    { label: "Noticing details", phrase: "eye for detail" },
    { label: "Staying calm under pressure", phrase: "calm under pressure" },
    { label: "Learning quickly", phrase: "hunger to learn" },
    { label: "Bringing people together", phrase: "ability to bring people together" },
    { label: "Humor", phrase: "humor" },
    { label: "Patience & persistence", phrase: "persistence" },
    { label: "Working with technology", phrase: "technical skill" },
    { label: "Making things beautiful", phrase: "sense of beauty" }
];

const values = [
    "Freedom", "Helping others", "Creativity", "Growth & learning",
    "Financial security", "Making an impact", "Family", "Adventure",
    "Fairness & justice", "Stability", "Achievement", "Health",
    "Faith & spirituality", "Nature", "Knowledge & wisdom", "Belonging"
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
    { key: "flow", label: "When do you lose track of time?" },
    { key: "thanks", label: "What do people thank you for or ask your help with?" },
    { key: "moved", label: "What problem in the world moves you most?" },
    { key: "who", label: "Who would you most love to help?", placeholder: "e.g. new parents, kids in my town", short: true }
];

const limits = { strengths: 5, values: 5, causes: 3 };

// Each screen is one question or one choice. Parts drive the progress label.
const parts = [
    { id: "ikigai", name: "Your life right now" },
    { id: "riasec", name: "What you enjoy" },
    { id: "strengths", name: "Your strengths" },
    { id: "values", name: "Your values" },
    { id: "causes", name: "What the world needs" },
    { id: "stage", name: "Your life stage" },
    { id: "reflect", name: "In your own words" }
];

const screens = [
    ...ikigaiQuestions.map((q, i) => ({ part: "ikigai", type: "rating", index: i })),
    ...riasecQuestions.map((q, i) => ({ part: "riasec", type: "rating", index: i })),
    { part: "strengths", type: "chips" },
    { part: "values", type: "chips" },
    { part: "causes", type: "chips" },
    { part: "stage", type: "single" },
    { part: "reflect", type: "reflect" }
];

const STORAGE_KEY = "pathfinder-v2";
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let state = freshState();
let advanceTimer = null;

function freshState() {
    return {
        ikigai: Array(ikigaiQuestions.length).fill(0),
        riasec: Array(riasecQuestions.length).fill(0),
        strengths: [],
        values: [],
        causes: [],
        stage: "",
        reflections: {},
        screen: 0,
        statement: "",
        statementEdited: false,
        firstStep: "",
        firstStepEdited: false,
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
        if (saved && Array.isArray(saved.ikigai) && saved.ikigai.length === ikigaiQuestions.length &&
            Array.isArray(saved.riasec) && saved.riasec.length === riasecQuestions.length) {
            state = Object.assign(freshState(), saved);
            state.screen = Math.min(Math.max(0, state.screen | 0), screens.length - 1);
        }
    } catch (e) { /* ignore corrupt or unavailable storage */ }
}

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function hasProgress() {
    return state.ikigai.some(Boolean) || state.riasec.some(Boolean) || state.strengths.length > 0;
}

function scrollBehavior() {
    return reducedMotion ? "auto" : "smooth";
}

/* ---------- Quiz rendering ---------- */

function isAnswered(screen) {
    switch (screen.type) {
        case "rating": return state[screen.part][screen.index] > 0;
        case "chips": return state[screen.part].length > 0;
        case "single": return Boolean(state.stage);
        default: return true;
    }
}

function renderScreen(focus) {
    const screen = screens[state.screen];
    const card = document.getElementById("quizCard");
    const partIndex = parts.findIndex(p => p.id === screen.part);
    const partScreens = screens.filter(s => s.part === screen.part);
    const posInPart = partScreens.indexOf(screen) + 1;

    document.getElementById("quizStep").textContent = `Part ${partIndex + 1} of ${parts.length} · ${parts[partIndex].name}`;
    document.getElementById("quizCount").textContent = partScreens.length > 1 ? `${posInPart} of ${partScreens.length}` : "";
    const pct = Math.round((state.screen / screens.length) * 100);
    document.getElementById("progressFill").style.width = pct + "%";
    document.getElementById("progressBar").setAttribute("aria-valuenow", pct);
    document.getElementById("quizHint").hidden = screen.type !== "rating";

    let body;
    if (screen.type === "rating") body = ratingHtml(screen);
    else if (screen.type === "chips") body = chipsHtml(screen.part);
    else if (screen.type === "single") body = stageHtml();
    else body = reflectHtml();

    const isLast = state.screen === screens.length - 1;
    card.innerHTML = `
        ${body}
        <div class="quiz-nav">
            <button class="btn btn-plain" id="quizBack" ${state.screen === 0 ? "disabled" : ""}>‹ Back</button>
            <button class="btn btn-primary" id="quizNext" ${isAnswered(screen) ? "" : "disabled"}>${isLast ? "See my results" : "Next"}</button>
        </div>`;

    card.classList.remove("enter");
    void card.offsetWidth;
    card.classList.add("enter");

    bindScreen(screen);
    document.getElementById("quizBack").addEventListener("click", goBack);
    document.getElementById("quizNext").addEventListener("click", goNext);

    if (focus) {
        const heading = card.querySelector(".quiz-question");
        if (heading) heading.focus({ preventScroll: true });
    }
}

function radioTabIndex(isChecked, hasValue, i) {
    return (hasValue ? isChecked : i === 0) ? 0 : -1;
}

function ratingHtml(screen) {
    const isIkigai = screen.part === "ikigai";
    const question = isIkigai ? ikigaiQuestions[screen.index] : riasecQuestions[screen.index].text;
    const scale = isIkigai ? ikigaiScale : interestScale;
    const current = state[screen.part][screen.index];
    const help = isIkigai
        ? "How much does this apply to you today?"
        : "Would you enjoy doing this? Don't think about skill, training or money.";
    return `
        <p class="quiz-group">${isIkigai ? "How you feel today" : "Would you enjoy it?"}</p>
        <h3 class="quiz-question" id="q-heading" tabindex="-1">${escapeHtml(question)}</h3>
        <p class="quiz-help">${help}</p>
        <div class="options" role="radiogroup" aria-labelledby="q-heading">
            ${scale.map((label, i) => `
                <button class="option" role="radio" aria-checked="${current === i + 1}" data-value="${i + 1}" tabindex="${radioTabIndex(current === i + 1, current > 0, i)}">
                    <span class="key" aria-hidden="true">${i + 1}</span>${label}
                </button>`).join("")}
        </div>`;
}

const chipCopy = {
    strengths: {
        title: "What are you naturally good at?",
        help: "Pick up to 5. Not sure? Choose what a close friend would say about you.",
        items: strengths.map(s => s.label)
    },
    values: {
        title: "What matters most to you in life?",
        help: "Pick up to 5 values you'd want your life to be guided by.",
        items: values
    },
    causes: {
        title: "Which problems in the world move you?",
        help: "Pick up to 3 — think of what makes you angry, sad or hopeful when you see it.",
        items: causes.map(c => c.label)
    }
};

function chipsHtml(key) {
    const copy = chipCopy[key];
    return `
        <p class="quiz-group">${escapeHtml(parts.find(p => p.id === key).name)}</p>
        <h3 class="quiz-question" id="q-heading" tabindex="-1">${copy.title}</h3>
        <p class="quiz-help">${copy.help}</p>
        <div class="chips" role="group" aria-labelledby="q-heading">
            ${copy.items.map(label => `<button class="chip" aria-pressed="${state[key].includes(label)}" data-label="${escapeHtml(label)}">${escapeHtml(label)}</button>`).join("")}
        </div>
        <p class="chip-counter" id="chipCounter" aria-live="polite">${counterText(key)}</p>`;
}

function counterText(key) {
    const n = state[key].length;
    return n ? `${n} of ${limits[key]} selected` : "";
}

function stageHtml() {
    return `
        <p class="quiz-group">Your life stage</p>
        <h3 class="quiz-question" id="q-heading" tabindex="-1">Where are you in life right now?</h3>
        <p class="quiz-help">This makes your 30-day plan realistic for your situation.</p>
        <div class="options" role="radiogroup" aria-labelledby="q-heading">
            ${lifeStages.map((s, i) => `
                <button class="option" role="radio" aria-checked="${state.stage === s.id}" data-value="${s.id}" tabindex="${radioTabIndex(state.stage === s.id, Boolean(state.stage), i)}">${s.label}</button>`).join("")}
        </div>`;
}

function reflectHtml() {
    return `
        <p class="quiz-group">Optional · In your own words</p>
        <h3 class="quiz-question" id="q-heading" tabindex="-1">A few words make your results much more personal.</h3>
        <p class="quiz-help">Skip any you like.</p>
        ${reflectionPrompts.map(p => `
            <label class="field">
                <span>${p.label}</span>
                ${p.short
                    ? `<input type="text" data-key="${p.key}" maxlength="80" placeholder="${escapeHtml(p.placeholder || "")}" value="${escapeHtml(state.reflections[p.key] || "")}">`
                    : `<textarea data-key="${p.key}" rows="2" maxlength="400">${escapeHtml(state.reflections[p.key] || "")}</textarea>`}
            </label>`).join("")}`;
}

function bindScreen(screen) {
    const card = document.getElementById("quizCard");

    if (screen.type === "rating" || screen.type === "single") {
        const radios = [...card.querySelectorAll('[role="radio"]')];
        radios.forEach((btn, i) => {
            btn.addEventListener("click", () => selectRadio(screen, btn));
            // Arrow keys move between options, as in a native radio group
            btn.addEventListener("keydown", e => {
                const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
                if (!delta) return;
                e.preventDefault();
                e.stopPropagation();
                const next = radios[(i + delta + radios.length) % radios.length];
                radios.forEach(r => { r.tabIndex = -1; });
                next.tabIndex = 0;
                next.focus();
            });
        });
    }

    if (screen.type === "chips") {
        const key = screen.part;
        card.querySelectorAll(".chip").forEach(chip => {
            chip.addEventListener("click", () => {
                const label = chip.dataset.label;
                const counter = document.getElementById("chipCounter");
                if (state[key].includes(label)) {
                    state[key] = state[key].filter(x => x !== label);
                    chip.setAttribute("aria-pressed", "false");
                } else if (state[key].length >= limits[key]) {
                    counter.textContent = `You can pick up to ${limits[key]}. Unselect one to choose another.`;
                    counter.classList.add("limit");
                    return;
                } else {
                    state[key].push(label);
                    chip.setAttribute("aria-pressed", "true");
                }
                counter.classList.remove("limit");
                counter.textContent = counterText(key);
                document.getElementById("quizNext").disabled = state[key].length === 0;
                saveState();
            });
        });
    }

    if (screen.type === "reflect") {
        card.querySelectorAll("[data-key]").forEach(field => {
            field.addEventListener("input", () => {
                state.reflections[field.dataset.key] = field.value;
                saveState();
            });
        });
    }
}

function selectRadio(screen, btn) {
    const card = document.getElementById("quizCard");
    card.querySelectorAll('[role="radio"]').forEach(r => {
        r.setAttribute("aria-checked", "false");
        r.tabIndex = -1;
    });
    btn.setAttribute("aria-checked", "true");
    btn.tabIndex = 0;

    if (screen.type === "single") state.stage = btn.dataset.value;
    else state[screen.part][screen.index] = parseInt(btn.dataset.value, 10);
    saveState();
    document.getElementById("quizNext").disabled = false;

    // Auto-advance so a tap is all it takes; the short delay shows the selection
    clearTimeout(advanceTimer);
    advanceTimer = setTimeout(goNext, reducedMotion ? 120 : 260);
}

function goNext() {
    clearTimeout(advanceTimer);
    const screen = screens[state.screen];
    if (!isAnswered(screen)) return;
    if (state.screen === screens.length - 1) {
        calculateResults(true);
        return;
    }
    state.screen++;
    saveState();
    renderScreen(true);
}

function goBack() {
    clearTimeout(advanceTimer);
    if (state.screen === 0) return;
    state.screen--;
    saveState();
    renderScreen(true);
}

function handleKeys(e) {
    const active = document.activeElement;
    const quiz = document.getElementById("quiz");
    if (active !== document.body && !quiz.contains(active)) return;
    if (/^(INPUT|TEXTAREA)$/.test(active.tagName) || active.isContentEditable) return;
    if (e.metaKey || e.ctrlKey || e.altKey || state.completed) return;
    const screen = screens[state.screen];
    if (screen.type === "rating" && /^[1-5]$/.test(e.key)) {
        const btn = document.querySelector(`#quizCard .option[data-value="${e.key}"]`);
        if (btn) selectRadio(screen, btn);
    } else if (e.key === "ArrowLeft") {
        goBack();
    }
}

/* ---------- Scoring ---------- */

function riasecResults() {
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    riasecQuestions.forEach((q, i) => { scores[q.type] += state.riasec[i]; });
    const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    return { ranked, code: ranked.slice(0, 3).map(x => x[0]).join("") };
}

// Holland's differentiation (how clearly one interest stands out) and
// consistency (how close the top two types sit on the hexagon).
function interestInsight(ranked) {
    const spread = ranked[0][1] - ranked[5][1];
    const a = HEXAGON.indexOf(ranked[0][0]);
    const b = HEXAGON.indexOf(ranked[1][0]);
    const distance = Math.min(Math.abs(a - b), 6 - Math.abs(a - b));
    const top = riasecInfo[ranked[0][0]].name;
    const second = riasecInfo[ranked[1][0]].name;

    if (spread <= 4) {
        return "Your interests are broad — no single type stands out yet. That's normal, especially early on. Try small experiments in two or three different areas to see which ones energize you most.";
    }
    if (distance === 1) {
        return `Your top two types, ${top} and ${second}, sit next to each other on Holland's hexagon. They point in a similar direction, which usually makes career choices feel easier.`;
    }
    if (distance === 3) {
        return `${top} and ${second} sit opposite each other on Holland's hexagon. That's a rare mix — look for roles or side projects that combine both rather than choosing one.`;
    }
    return `${top} and ${second} are related but different. Roles that blend both will likely suit you best.`;
}

function chosen(list, labels) {
    return labels.map(label => list.find(item => item.label === label)).filter(Boolean);
}

function buildStatement(code) {
    const chosenStrengths = chosen(strengths, state.strengths);
    const cause = chosen(causes, state.causes)[0];
    const strengthText = chosenStrengths.length > 1
        ? `${chosenStrengths[0].phrase} and ${chosenStrengths[1].phrase}`
        : chosenStrengths[0].phrase;
    const who = (state.reflections.who || "").trim() || cause.who;
    return `My purpose is to use my ${strengthText} to ${riasecInfo[code[0]].verb} ${who}, so that ${cause.outcome}.`;
}

function withArticle(noun) {
    return (/^[aeiou]/i.test(noun) ? "an " : "a ") + noun;
}

// A concrete role to talk to or try, e.g. "an engineer or a counselor",
// avoiding repeats like "a counselor or a counselor"
function exampleRole(code, cause) {
    const career = riasecInfo[code[0]].careers[0].toLowerCase().split(" or ")[0];
    const causeRole = cause.roles[0].toLowerCase().split(" or ")[0];
    return career === causeRole ? withArticle(career) : `${withArticle(career)} or ${withArticle(causeRole)}`;
}

function buildFirstStep(code) {
    const cause = chosen(causes, state.causes)[0];
    return `When it's Saturday at 10 a.m., I will message one person who works as ${exampleRole(code, cause)} and ask what their work is really like.`;
}

function calculateResults(scroll) {
    const { code } = riasecResults();
    if (!state.statementEdited || !state.statement) state.statement = buildStatement(code);
    if (!state.firstStepEdited || !state.firstStep) state.firstStep = buildFirstStep(code);
    state.completed = true;
    saveState();

    displayResults();
    renderDone();

    const results = document.getElementById("results");
    results.classList.add("active");
    if (scroll) {
        results.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        results.focus({ preventScroll: true });
    }
}

function renderDone() {
    document.getElementById("resumeBanner").hidden = true;
    document.getElementById("quizStep").textContent = "Complete";
    document.getElementById("quizCount").textContent = "";
    document.getElementById("progressFill").style.width = "100%";
    document.getElementById("progressBar").setAttribute("aria-valuenow", 100);
    document.getElementById("quizHint").hidden = true;
    document.getElementById("quizCard").innerHTML = `
        <p class="quiz-group">Done</p>
        <h3 class="quiz-question" tabindex="-1">Your Purpose Blueprint is ready.</h3>
        <p class="quiz-help">You can go back and change any answer — your results will update.</p>
        <div class="quiz-nav">
            <button class="btn btn-plain" id="reviewAnswers">‹ Review answers</button>
            <a class="btn btn-primary" href="#results">View results</a>
        </div>`;
    document.getElementById("reviewAnswers").addEventListener("click", () => {
        state.completed = false;
        state.screen = screens.length - 1;
        saveState();
        renderScreen(true);
    });
}

function list(items) {
    return items.map(i => `<li>${i}</li>`).join("");
}

function chipsOut(items) {
    return items.map(v => `<span class="result-chip">${escapeHtml(v)}</span>`).join("");
}

function displayResults() {
    const { ranked, code } = riasecResults();
    const top = riasecInfo[code[0]];
    const second = riasecInfo[code[1]];
    const chosenCauses = chosen(causes, state.causes);
    const ikigaiTotal = state.ikigai.reduce((a, b) => a + b, 0);

    document.getElementById("purposeStatement").textContent = state.statement;
    document.getElementById("firstStep").textContent = state.firstStep;

    // Ikigai map: the four overlapping areas
    const loved = riasecQuestions
        .map((q, i) => ({ text: q.text, score: state.riasec[i] }))
        .filter(q => q.score >= 4)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(q => escapeHtml(q.text));
    const flow = (state.reflections.flow || "").trim();
    if (flow) loved.unshift(`<em>“${escapeHtml(flow)}”</em>`);
    const paid = [...new Set([top.careers[0], top.careers[1], second.careers[0], chosenCauses[0].roles[0]])];
    const quadrants = [
        { title: "What you love", sub: "Passion", color: "#d6336c", items: loved.length ? loved : [`${top.name} and ${second.name} activities`] },
        { title: "What you're good at", sub: "Strengths", color: "#6e4ff6", items: state.strengths.map(escapeHtml) },
        { title: "What the world needs", sub: "Mission", color: "#0a9396", items: state.causes.map(escapeHtml) },
        { title: "What you can be paid for", sub: "Vocation", color: "#c77700", items: paid }
    ];
    document.getElementById("ikigaiMap").innerHTML = quadrants.map(q => `
        <div class="map-quadrant" style="--q: ${q.color}">
            <div class="map-sub">${q.sub}</div>
            <h4>${q.title}</h4>
            <ul>${list(q.items)}</ul>
        </div>`).join("");

    // Ikigai-9
    let meaning, desc;
    if (ikigaiTotal >= 40) {
        meaning = "Strong sense of purpose";
        desc = "Your life feels meaningful and worth living. Your next step is to deepen it and share it with others.";
    } else if (ikigaiTotal >= 32) {
        meaning = "Growing purpose";
        desc = "You have a solid foundation of meaning. Small changes in your lowest area below will matter most.";
    } else if (ikigaiTotal >= 24) {
        meaning = "Exploring purpose";
        desc = "You're in the middle of discovering what makes life feel worth living. Your 30-day experiment is designed for exactly this stage.";
    } else {
        meaning = "Seeking purpose";
        desc = "Many people with a strong purpose started here. Purpose usually grows from small actions, not from waiting to find it.";
    }
    document.getElementById("ikigaiScore").textContent = ikigaiTotal;
    document.getElementById("scoreRing").style.setProperty("--pct", Math.round(((ikigaiTotal - 9) / 36) * 100));
    document.getElementById("ikigaiMeaning").textContent = meaning;
    document.getElementById("ikigaiDesc").textContent = desc;
    document.getElementById("supportNote").hidden = ikigaiTotal > 22;
    document.getElementById("ikigaiDimensions").innerHTML = ikigaiDimensions.map(d => {
        const avg = d.items.reduce((sum, i) => sum + state.ikigai[i], 0) / d.items.length;
        return `<div class="dimension"><div class="dimension-name">${d.name}</div><div class="dimension-score">${avg.toFixed(1)} / 5</div></div>`;
    }).join("");

    // RIASEC
    const maxScore = 4 * 5;
    document.getElementById("riasecCode").textContent = code;
    document.getElementById("riasecDesc").textContent = `${top.name} · ${second.name} · ${riasecInfo[code[2]].name}. ${top.desc}`;
    document.getElementById("riasecBars").innerHTML = ranked.map(([letter, score]) => `
        <div class="bar">
            <span>${riasecInfo[letter].name}</span>
            <div class="bar-track" aria-hidden="true"><div class="bar-fill" style="width: ${(score / maxScore) * 100}%"></div></div>
            <span class="bar-value">${score}/${maxScore}</span>
        </div>`).join("");
    document.getElementById("riasecInsight").textContent = interestInsight(ranked);

    document.getElementById("resultsValues").innerHTML = chipsOut(state.values);
    document.getElementById("resultsCauses").innerHTML = chipsOut(state.causes);
    document.getElementById("resultsStrengths").innerHTML = chipsOut(state.strengths);

    const answered = reflectionPrompts.filter(p => (state.reflections[p.key] || "").trim());
    document.getElementById("reflectionCard").hidden = answered.length === 0;
    document.getElementById("reflectionEcho").innerHTML = answered.map(p =>
        `<dt>${p.label}</dt><dd>${escapeHtml(state.reflections[p.key].trim())}</dd>`).join("");

    generatePlan(code, chosenCauses);
}

function generatePlan(code, chosenCauses) {
    const top = riasecInfo[code[0]];
    const second = riasecInfo[code[1]];
    const cause = chosenCauses[0];
    const who = escapeHtml((state.reflections.who || "").trim() || cause.who);
    const strength = escapeHtml(state.strengths[0].toLowerCase());
    const value = escapeHtml((state.values[0] || "what matters to you").toLowerCase());
    const causeName = escapeHtml(cause.label.toLowerCase());
    const role = exampleRole(code, cause);

    const week3 = {
        student: `Join a club, course or project connected to ${causeName}, or shadow someone who works as ${role}.`,
        early: `Volunteer for one task at work that uses your ${strength}, or start a tiny side project for ${who}.`,
        mid: `Craft your current job: move about 10% of your week toward tasks that use your ${strength} and help ${who}.`,
        change: `Test before you leap: take a short course or do one small project as ${role}. Notice how it feels.`,
        between: `Offer your ${strength} on a short freelance or volunteer project for ${who}. It builds proof, contacts and confidence.`,
        caregiver: `Find one or two hours a week to help ${who} that fits around your care duties — even from home.`,
        retired: `Share your experience: mentor, volunteer or teach in an area connected to ${causeName}.`
    }[state.stage] || `Try one small project that uses your ${strength} to help ${who}.`;

    document.getElementById("actionSteps").innerHTML = list([
        `<strong>Week 1 — Use your strength in a new way.</strong> Each day, use your ${strength} in a way you haven't before. Each evening, note one moment that gave you energy and one that drained you.`,
        `<strong>Week 2 — Talk to people.</strong> Have two short conversations with people who work as ${role} or who serve ${who}. Ask what a normal day is like.`,
        `<strong>Week 3 — Try it.</strong> ${week3}`,
        `<strong>Week 4 — Reflect and rewrite.</strong> What energized you most? Update your purpose statement and choose your next 90-day experiment.`
    ]);

    document.getElementById("careerSuggestions").innerHTML = list([
        ...top.careers.slice(0, 3).map(c => `<strong>${c}</strong> — fits your ${top.name} interests`),
        ...second.careers.slice(0, 2).map(c => `<strong>${c}</strong> — uses your ${second.name} side`)
    ]);

    document.getElementById("causeRoles").innerHTML = list(chosenCauses.flatMap(c =>
        c.roles.map(r => `<strong>${r}</strong> — ${escapeHtml(c.label.toLowerCase())}`)).slice(0, 6));

    document.getElementById("meaningSuggestions").innerHTML = list([
        `Give one or two hours a week to a ${causeName} group near you or online.`,
        `Use your ${strength} to help one person this week, with no strings attached.`,
        `Make one decision this month guided by your value of <strong>${value}</strong>.`,
        `At work or at home, notice the tasks that use your strengths — and do a little more of them.`,
        `Mentor someone a few steps behind you. Your experience is worth more than you think.`
    ]);

    document.getElementById("businessSuggestions").innerHTML = list([
        ...bizIdeas[code[0]],
        `A small service that helps ${who}. Start with three conversations about their biggest problem.`
    ]);
}

/* ---------- Results actions ---------- */

function toast(msg) {
    document.getElementById("toast").textContent = msg;
}

function copyStatement() {
    const text = document.getElementById("purposeStatement").textContent.trim();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => toast("Purpose statement copied."))
            .catch(() => toast("Couldn't copy — select the statement and copy it manually."));
    } else {
        toast("Couldn't copy — select the statement and copy it manually.");
    }
}

function shareSite() {
    navigator.share({
        title: "Pathfinder — Find your purpose",
        text: "A free, private 10-minute test that helps you write your own purpose statement.",
        url: "https://homesh123.github.io/Purposefinder/"
    }).catch(() => { /* share sheet dismissed */ });
}

function restartAssessment() {
    if (!confirm("Start over? Your answers and purpose statement will be cleared.")) return;
    state = freshState();
    saveState();
    document.getElementById("results").classList.remove("active");
    document.getElementById("resumeBanner").hidden = true;
    toast("");
    renderScreen(false);
    document.getElementById("quiz").scrollIntoView({ behavior: scrollBehavior(), block: "start" });
}

function bindEditable(id, textKey, editedKey) {
    const el = document.getElementById(id);
    el.addEventListener("input", () => {
        state[textKey] = el.textContent.trim();
        state[editedKey] = true;
        saveState();
    });
}

function init() {
    loadState();

    document.querySelectorAll("[data-start]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const quiz = document.getElementById("quiz");
            quiz.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
            const heading = quiz.querySelector(".quiz-question");
            if (heading) heading.focus({ preventScroll: true });
        });
    });

    document.getElementById("startOver").addEventListener("click", restartAssessment);
    document.getElementById("restart").addEventListener("click", restartAssessment);
    document.getElementById("saveResults").addEventListener("click", () => window.print());
    document.getElementById("copyStatement").addEventListener("click", copyStatement);
    if (navigator.share) {
        const share = document.getElementById("shareSite");
        share.hidden = false;
        share.addEventListener("click", shareSite);
    }
    bindEditable("purposeStatement", "statement", "statementEdited");
    bindEditable("firstStep", "firstStep", "firstStepEdited");
    document.addEventListener("keydown", handleKeys);

    if (state.completed) {
        calculateResults(false);
    } else {
        document.getElementById("resumeBanner").hidden = !hasProgress();
        renderScreen(false);
    }
}

document.addEventListener("DOMContentLoaded", init);
