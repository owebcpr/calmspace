/* =========================================================
   CALMSPACE — головний скрипт
   ========================================================= */


/* =========================================================
   1. ОСНОВНІ ЕЛЕМЕНТИ
   ========================================================= */

const welcome = document.querySelector(".welcome");
const stateCards = document.querySelectorAll(".state-card");

const breathing = document.querySelector(".breathing");
const activityOptions = document.querySelector(".activity-options");

const grounding = document.querySelector(".grounding");
const groundingContent = document.querySelector(".grounding__content");
const groundingInstruction = document.querySelector("#grounding-instruction");
const groundingIcon = document.querySelector("#grounding-icon");
const groundingActions = document.querySelector(".grounding__actions");
const groundingSuccess = document.querySelector(".grounding__action");
const groundingCheck = document.querySelector(".grounding__check");
const groundingHelp = document.querySelector(".grounding__help");
const groundingTitle = document.querySelector(".grounding__title");
const groundingScene = document.querySelector(".grounding__scene");
const groundingSceneTargets = document.querySelectorAll(".grounding__scene-target");
const groundingSceneImage = document.querySelector(".grounding__scene-image");

const sad = document.querySelector(".sad");
const sadTitle = document.querySelector(".sad__title");
const sadModal = document.querySelector('[data-modal="sad-emotions"]');
const sadEmotionView = document.querySelector(".sad__emotion-view");
const sadCustomView = document.querySelector(".sad__custom-view");
const sadLetter = document.querySelector(".sad__letter");

const angry = document.querySelector(".angry");
const angryFinal = document.querySelector(".angry-final");
const angrySteam = document.querySelector(".angry-steam");
const angryCalm = document.querySelector(".angry-calm");


/* =========================================================
   2. ГРА «РОЗПЛУТАЙ НИТКИ»
   ========================================================= */

const angryGame = document.querySelector(".angry-game");
const angryGameFinish = document.querySelector(".angry-game__finish");
const angryGameCounter = document.querySelector("[data-thread-count]");

const angryEllyAngry =
    document.querySelector(".angry-game__elly-image--angry");

const angryEllyHalfCalm =
    document.querySelector(".angry-game__elly-image--half-calm");

const angryEllyCalm =
    document.querySelector(".angry-game__elly-image--calm");

const angryEllyBlink =
    document.querySelector(".angry-game__elly-image--blink");

let angryGameThreads = [];
let angryThreadsRemaining = 5;
let angryBlinkTimer = null;
let angryBlinkTimeout = null;

const SWIPE_THRESHOLD = 0.75;
const SWIPE_MIN_DISTANCE = 6;
const threadProgress = new Map();
const angryThreadsSorted = [];
let currentActiveThread = null;


/* =========================================================
   3. ГРА «ВИПУСТИ ПАРУ»
   ========================================================= */

const angrySteamStage =
    document.querySelector(".angry-steam__stage");

const angrySteamBalloonsContainer =
    document.querySelector("[data-balloons-container]");

const angrySteamHint =
    document.querySelector("[data-steam-hint]");

const angrySteamCounter =
    document.querySelector("[data-balloon-count]");

const angrySteamTime =
    document.querySelector("[data-steam-time]");

const angrySteamFinish =
    document.querySelector(".angry-steam__finish");

const angrySteamEllyFull =
    document.querySelector(".angry-steam__elly-image--full-steam");

const angrySteamEllySome =
    document.querySelector(".angry-steam__elly-image--some-steam");

const angrySteamEllyCalm =
    document.querySelector(".angry-steam__elly-image--calm");

const angrySteamEllyBlink =
    document.querySelector(".angry-steam__elly-image--blink");

let steamBalloonsPopped = 0;
let steamGameActive = false;
let steamSpawnInterval = null;
let steamGameTimer = null;
let steamIdleTimer = null;
let steamBlinkTimer = null;
let steamBlinkTimeout = null;
let steamSpeedMultiplier = 1;
let steamElapsedSeconds = 0;
let steamCurrentEllyState = "full";

const STEAM_GAME_DURATION = 30;
const STEAM_SPAWN_INTERVAL = 700;
const STEAM_BALLOON_MIN_SIZE = 44;
const STEAM_BALLOON_MAX_SIZE = 64;
const STEAM_IDLE_STEP_1 = 7000;
const STEAM_BALLOON_COLORS = [
    "lilac",
    "blue",
    "pink",
    "sand",
    "mint",
    "peach"
];


/* =========================================================
   4. ГРА «ЛОВИ СПОКІЙ»
   ========================================================= */

const angryCalmLightsContainer =
    document.querySelector("[data-calm-lights]");

const angryCalmHint =
    document.querySelector("[data-calm-hint]");

const angryCalmProgress =
    document.querySelector("[data-calm-progress]");

const angryCalmTitle =
    document.querySelector("[data-calm-title]");    

const angryCalmFinish =
    document.querySelector("[data-calm-finish]");

const angryCalmElly1 =
    document.querySelector(".angry-calm__elly-image--fireflies1");

const angryCalmElly2 =
    document.querySelector(".angry-calm__elly-image--fireflies2");

const angryCalmElly3 =
    document.querySelector(".angry-calm__elly-image--fireflies3");

let calmLightsCaught = 0;
let calmGamesPlayed = 0;
let calmGameActive = false;
let calmLightTimer = null;
let calmMoveAnimation = null;

const CALM_LIGHTS_TOTAL = 5;


/* =========================================================
   5. ФІНАЛ
   ========================================================= */

let angryFinalBlinkTimer = null;
let angryFinalBlinkTimeout = null;


/* =========================================================
   6. ЗАГАЛЬНІ ЗМІННІ
   ========================================================= */

let activityBack = null;
let ellyImg = null;
let sadTimers = [];

let groundingUsedTasks = [];
let groundingStep = 0;

let currentScene = "scene1";
let currentSceneTask = null;
let sceneTaskIndex = 0;
let sceneUsedTasks = [];
let sceneWrongAttempts = 0;
let sceneCount = 0;
let availableScenes = [];

let angryReturnsCount = 0;


/* =========================================================
   7. ДАНІ ЗАЗЕМЛЕННЯ
   ========================================================= */

const groundingTasks = [
    { text: "Подивись навколо. Бачиш щось синє?", icon: "grounding-blue.webp" },
    { text: "Добре. А тепер спробуй помітити щось м'яке", icon: "grounding-toy.webp" },
    { text: "Не поспішай. Чи є поруч щось кругленьке?", icon: "grounding-ball.webp" },
    { text: "А тепер просто подивись навколо. Що тут є зеленого?", icon: "grounding-plant.webp" },
    { text: "Цікаво, а чи помітиш щось жовте?", icon: "grounding-yellow.webp" },
    { text: "Тепер зверни увагу на щось маленьке", icon: "grounding-small.webp" },
    { text: "Подивись уважніше. Чи є поруч щось дерев'яне?", icon: "grounding-pencil.webp" },
    { text: "А тепер спробуй знайти щось, що тобі подобається", icon: "grounding-favorite.webp" },
    { text: "Знайди, будь ласка, щось мокре або рідину", icon: "grounding-water.webp" },
    { text: "Пошукай навколо місце, де можна присісти", icon: "grounding-seat.webp" }
];

const sceneTasks = {
    scene1: {
        favoriteItem: "teddy",
        tasks: [
            { text: "Цікаво, чи є тут щось синеньке?", retryText: "О, цікава знахідка 😊 А синє ще десь заховалося. Спробуємо?", correctItems: ["cup"] },
            { text: "А де тут сховалося щось зелене?", retryText: "Ммм, не воно 😊 Подивись уважніше. Зелене тут точно є", correctItems: ["plant"] },
            { text: "Ой, а мені цікаво — чи знайдеш тут щось жовте?", retryText: "Цікаво! Але я зараз шукаю саме щось жовтеньке. Давай ще раз", correctItems: ["book"] },
            { text: "А як думаєш, де тут можна знайти щось м'яке?", retryText: "Ого! Але я шукаю щось, до чого хочеться доторкнутися", correctItems: ["pillow", "teddy"] },
            { text: "Скільки тут всього цікавого... А бачиш щось кругленьке?", retryText: "Може, з іншого боку воно й кругленьке 😊 Давай пошукаємо ще", correctItems: ["clock", "ball"] },
            { text: "Давай знайдемо щось червоне", retryText: "Майже 😊 Спробуй пошукати щось червоне і смачне", correctItems: ["strawberry"] },
            { text: "А що тобі тут найбільше подобається?", retryText: "", correctItems: "favorite" }
        ]
    },

    scene2: {
        favoriteItem: "cloud",
        tasks: [
            { text: "Цікаво, чи є тут хтось, хто вміє співати?", retryText: "О, цікава знахідка 😊 Але цього разу я шукаю когось, хто може співати. Спробуємо ще?", correctItems: ["bird"] },
            { text: "А чи помітиш тут щось, від чого стає тепліше?", retryText: "Ммм, не воно 😊 Подивись уважніше. Десь тут є те, що може зігріти", correctItems: ["sun"] },
            { text: "Чи є тут щось біле й пухнасте?", retryText: "Майже 😊 Десь тут є щось біле й пухнасте. Давай пошукаємо ще", correctItems: ["cloud"] },
            { text: "А де тут можна трохи присісти й відпочити?", retryText: "О, тут справді багато цікавого 😊 Але місце для відпочинку ще десь тут", correctItems: ["bench"] },
            { text: "Цікаво, що тут може покотитися?", retryText: "Ого 😊 А тепер спробуй подумати, що тут може покотитися", correctItems: ["bike"] },
            { text: "А чи бачиш тут щось із яскравими крильцями?", retryText: "Гарна спроба 😊 Але я зараз думаю про щось із яскравими крильцями", correctItems: ["butterfly"] },
            { text: "Як думаєш, що тут можна зустріти під час прогулянки в лісі?", retryText: "Цікаво 😊 Але я загадала дещо, що можна зустріти в лісі. Подивись ще", correctItems: ["mushroom"] },
            { text: "Чи помітиш тут маленькі пелюстки на стеблинці?", retryText: "Не зовсім 😊 Подивись уважніше. Тут є щось із пелюстками", correctItems: ["flowers"] },
            { text: "А що тобі тут найбільше подобається?", retryText: "", correctItems: "favorite" }
        ]
    },

    scene3: {
        favoriteItem: "teacher-pencils",
        tasks: [
            { text: "Чи є тут те, на чому пишуть крейдою?", retryText: "Майже 😊 Подивись уважніше на те, що написано на стіні", correctItems: ["board"] },
            { text: "А спробуй знайти нашу планету (ну майже планету)?", retryText: "Не зовсім 😊 Подивись уважніше на стіл у вікна", correctItems: ["globe"] },
            { text: "Чи бачиш тут щось зелене, що росте в горщику?", retryText: "Ммм, не воно 😊 Пошукай щось зелене в горщику", correctItems: ["classroom-plant"] },
            { text: "Не може бути! Подивись де вчитель тримає олівці?", retryText: "Гарна спроба 😊 Подивись на стіл учителя, бачиш чашку?", correctItems: ["teacher-pencils"] },
            { text: "Цікаво, де тут лежить стопка зошитів на перевірку?", retryText: "Майже 😊 Подивись уважніше на стіл учителя", correctItems: ["notebooks"] },
            { text: "А чи бачиш тут відкритий зошит учня?", retryText: "Не зовсім 😊 Подивись уважніше на парту", correctItems: ["open-notebook"] },
            { text: "Як гадаеш, де учень тримає свої підручники?", retryText: "Ммм 😊 Подивись уважніше внизу", correctItems: ["backpack"] },
            { text: "Через що зіваки дівляться на вулицю?", retryText: "Майже 😊 Спробуй ще", correctItems: ["window"] },
            { text: "Чи помітиш тут портрет, який намалювала дівчинка?", retryText: "Подивись уважніше на стіну 😊 Там є один особливий малюнок", correctItems: ["drawings"] },
            { text: "А що тобі тут найбільше подобається?", retryText: "", correctItems: "favorite" }
        ]
    },

    scene4: {
        favoriteItem: "teddy-room",
        tasks: [
            { text: "Спробуєш знайди тут щось, що може літати?", retryText: "Майже 😊 Подивись уважніше на стіну", correctItems: ["airplane"] },
            { text: "Чи є тут щось, що намалювала дитина?", retryText: "Не зовсім 😊 Подивись уважніше на стіну", correctItems: ["room-drawings", "room-drawings1"] },
            { text: "А де тут можна зручно відпочити?", retryText: "Ммм 😊 Спробуй пошукати місце, де можна прилягти", correctItems: ["bed"] },
            { text: "Чи бачиш тут щось, що може світити?", retryText: "Майже 😊 Подивись уважніше біля ліжка", correctItems: ["bed-lamp"] },
            { text: "Знайди тут щось, що можна читати", retryText: "Не зовсім 😊 Подивись уважніше на полицю", correctItems: ["shelf-books"] },
            { text: "Чи є тут щось, що зберігає важливий спогад?", retryText: "Майже 😊 Подивись уважніше на стіну", correctItems: ["photo"] },
            { text: "А чи помітиш тут щось м'яке з синім бантиком?", retryText: "Ммм 😊 Воно десь зовсім поруч. Подивись уважніше", correctItems: ["teddy-room"] },
            { text: "Що дає нам можливість дивитися на зорі?", retryText: "Майже 😊 але на зорі подивись, десь там мене побачиш!", correctItems: ["room-window"] },
            { text: "Що можна побачити в нічному небі окрім зірок?", retryText: "Подивись уважніше у вікно 😊", correctItems: ["moon"] },
            { text: "А де тут можна знайти щось, що показує, як виглядає наша планета?", retryText: "Майже 😊 Подивись уважніше в кімнаті", correctItems: ["room-globe"] },
            { text: "Цікаво, де тут можна знайти щось, що носять до школи?", retryText: "Не зовсім 😊 Подивись уважніше внизу", correctItems: ["room-backpack"] },
            { text: "А чи помітиш тут маленьку тваринку з великими вухами?", retryText: "Майже 😊 Подивись уважніше, в нього є довгий ніс", correctItems: ["elephant"] },
            { text: "А що тобі тут найбільше подобається?", retryText: "", correctItems: "favorite" }
        ]
    }
};


/* =========================================================
   8. КНОПКА «ПОВЕРНУТИСЯ»
   ========================================================= */

function createActivityBack() {
    if (activityBack) return activityBack;

    activityBack = document.createElement("button");
    activityBack.type = "button";
    activityBack.className = "button button__back activity-back";
    activityBack.textContent = "Повернутися";
    activityBack.addEventListener("click", handleActivityBack);

    return activityBack;
}

function showActivityBack(container) {
    if (!container) return;

    const button = createActivityBack();

    if (button.parentElement !== container) {
        container.append(button);
    }
}

function hideActivityBack() {
    if (!activityBack) return;
    activityBack.remove();
}


/* =========================================================
   9. ПРИХОВУВАННЯ ВСІХ АКТИВНОСТЕЙ
   ========================================================= */

const activitySections = [
    breathing,
    grounding,
    sad,
    angry,
    angryFinal,
    angrySteam,
    angryCalm
];

function hideAllActivities() {
    activitySections.forEach((section) => {
        if (!section) return;

        section.classList.remove("is-active");
        section.setAttribute("aria-hidden", "true");
    });

    if (angryGame) {
        angryGame.classList.remove("is-active");
        angryGame.setAttribute("aria-hidden", "true");
    }

    if (angrySteam) {
        angrySteam.classList.remove("is-active");
        angrySteam.setAttribute("aria-hidden", "true");
    }

    if (angryCalm) {
        angryCalm.classList.remove("is-active");
        angryCalm.setAttribute("aria-hidden", "true");
    }
}


/* =========================================================
   10. СКИДАННЯ ЗАЗЕМЛЕННЯ
   ========================================================= */

function resetGrounding() {
    groundingStep = 0;
    groundingUsedTasks = [];
    sceneCount = 0;
    sceneTaskIndex = 0;
    sceneUsedTasks = [];
    sceneWrongAttempts = 0;
    currentSceneTask = null;

    groundingTitle.textContent =
        "Давай на хвилинку озирнемося навколо";

    groundingInstruction.textContent = "";
    groundingInstruction.classList.remove("is-empty");
    groundingInstruction.style.display = "";

    groundingIcon.src = "";
    groundingIcon.style.display = "none";
    groundingSuccess.style.display = "none";
    groundingHelp.style.display = "none";

    groundingCheck.classList.remove("is-visible");
    groundingCheck.setAttribute("aria-hidden", "true");

    groundingScene.classList.remove("is-visible");
    groundingScene.setAttribute("aria-hidden", "true");

    groundingSceneTargets.forEach((target) => {
        target.classList.remove(
            "is-found",
            "is-hint",
            "is-favorite",
            "is-active"
        );

        target.style.pointerEvents = "";
    });

    if (ellyImg) {
        ellyImg.remove();
        ellyImg = null;
    }

    const existingElly =
        document.querySelector("#grounding-elly-js");

    if (existingElly) existingElly.remove();

    groundingActions.classList.remove("is-hidden");
}


/* =========================================================
   11. ПОВЕРНЕННЯ НА ГОЛОВНИЙ ЕКРАН
   ========================================================= */

function handleActivityBack() {
    hideActivityBack();
    hideAllActivities();

    document.body.style.overflow = "";
    activityOptions.classList.remove("is-visible");

    angryReturnsCount = 0;

    resetGrounding();
    resetSad();
    resetAngryGame();
    resetAngrySteam();
    resetAngryCalm();
    resetAngryFinal();

    stateCards.forEach((card) => {
        card.classList.remove("is-selected");
    });

    welcome.style.display = "";
}


/* =========================================================
   12. ТАЙМЕРИ ДЛЯ СУМНОГО ЕКРАНА
   ========================================================= */

function setSadTimeout(callback, delay) {
    const timer = setTimeout(() => {
        sadTimers = sadTimers.filter((item) => item !== timer);
        callback();
    }, delay);

    sadTimers.push(timer);
    return timer;
}

function clearSadTimers() {
    sadTimers.forEach((timer) => clearTimeout(timer));
    sadTimers = [];
}


/* =========================================================
   13. СУМНІ ЕМОЦІЇ
   ========================================================= */

function initSadEmotionButtons() {
    document.querySelectorAll(".button_sad-emotion").forEach((button) => {
        button.addEventListener("click", () => {
            const emotion = button.textContent.trim();

            sadModal.setAttribute("aria-hidden", "true");

            showSadLetterReceived(emotion);
        });
    });
}


/* =========================================================
   14. ЗАЗЕМЛЕННЯ
   ========================================================= */

function getRandomGroundingTask() {
    const availableTasks =
        groundingTasks.filter(
            (task) => !groundingUsedTasks.includes(task)
        );

    if (availableTasks.length === 0) return null;

    const randomIndex =
        Math.floor(Math.random() * availableTasks.length);

    const task = availableTasks[randomIndex];

    groundingUsedTasks.push(task);

    return task;
}

function getRandomSceneTask() {
    const scene = sceneTasks[currentScene];

    if (!scene) return null;

    if (sceneTaskIndex === 3) {
        return scene.tasks.find(
            (task) => task.correctItems === "favorite"
        );
    }

    const availableTasks =
        scene.tasks.filter(
            (task) =>
                task.correctItems !== "favorite" &&
                !sceneUsedTasks.includes(task)
        );

    if (availableTasks.length === 0) return null;

    const randomIndex =
        Math.floor(Math.random() * availableTasks.length);

    const task = availableTasks[randomIndex];

    sceneUsedTasks.push(task);

    return task;
}

function getRandomScenes() {
    const scenes = [
        "scene1",
        "scene2",
        "scene3",
        "scene4"
    ];

    scenes.sort(() => Math.random() - 0.5);

    return scenes.slice(0, 2);
}

function showSceneTask(task) {
    if (!task) return;

    currentSceneTask = task;
    sceneWrongAttempts = 0;

    groundingInstruction.classList.remove("is-empty");

    groundingSceneTargets.forEach((target) => {
        target.classList.remove("is-hint");

        if (task.correctItems === "favorite") {
            target.style.pointerEvents = "auto";
        }
    });

    groundingInstruction.textContent = task.text;
}

function showGroundingTask(task) {
    if (!task) return;

    groundingInstruction.classList.remove("is-empty");
    groundingInstruction.textContent = task.text;
    groundingIcon.src = `icons/${task.icon}`;
}

function showGroundingScene(sceneName = "scene1") {
    currentScene = sceneName;

    if (currentScene === "scene1") {
        groundingSceneImage.src = "images/scene1.webp";
        groundingSceneImage.alt = "Затишна кімната";
    }

    if (currentScene === "scene2") {
        groundingSceneImage.src = "images/scene2.webp";
        groundingSceneImage.alt = "Природа";
    }

    if (currentScene === "scene3") {
        groundingSceneImage.src = "images/scene3.webp";
        groundingSceneImage.alt = "Шкільний клас";
    }

    if (currentScene === "scene4") {
        groundingSceneImage.src = "images/scene4.webp";
        groundingSceneImage.alt = "Дитяча кімната";
    }

    sceneTaskIndex = 0;
    sceneUsedTasks = [];
    sceneWrongAttempts = 0;

    groundingInstruction.classList.remove("is-empty");
    groundingInstruction.style.display = "";

    groundingSceneTargets.forEach((target) => {
        target.classList.remove(
            "is-found",
            "is-hint",
            "is-favorite"
        );

        target.style.pointerEvents = "";
    });

    groundingSceneTargets.forEach((target) => {
        target.classList.toggle(
            "is-active",
            target.dataset.scene === currentScene
        );
    });

    groundingIcon.style.display = "none";
    groundingSuccess.style.display = "none";
    groundingHelp.style.display = "none";

    groundingCheck.classList.remove("is-visible");
    groundingCheck.setAttribute("aria-hidden", "true");

    const sceneBoard =
        groundingScene.querySelector(".grounding__scene-board");

    sceneBoard.classList.remove("is-appearing");

    groundingScene.classList.add("is-visible");
    groundingScene.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        groundingScene.classList.add("is-visible");

        requestAnimationFrame(() => {
            sceneBoard.classList.add("is-appearing");
        });
    });

    showSceneTask(getRandomSceneTask());
}

function finishGroundingScene() {
    setTimeout(() => {
        groundingScene.classList.remove("is-visible");
        groundingScene.setAttribute("aria-hidden", "true");

        groundingTitle.textContent = "Як ти зараз?";

        groundingInstruction.textContent =
            "Ось. Ти тут. Навколо тебе є багато знайомих речей";

        groundingInstruction.style.display = "";

        groundingCheck.classList.add("is-visible");
        groundingCheck.setAttribute("aria-hidden", "false");
    }, 5000);
}


/* =========================================================
   15. СУМНИЙ ЕКРАН
   ========================================================= */

function resetSad() {
    clearSadTimers();

    sadTitle.textContent =
        "Мені шкода, що тобі зараз сумно. Я побуду поруч";

    sadTitle.style.opacity = "1";

    const sadEllyCurrent =
        document.querySelector(".sad__elly-image--current");

    const sadEllyNext =
        document.querySelector(".sad__elly-image--next");

    const sadEllyImage =
        document.querySelector(".sad__elly-image");

    if (sadEllyCurrent) {
        sadEllyCurrent.src =
            "images/elly/elly_sadly.webp";

        sadEllyCurrent.style.opacity = "1";
    }

    if (sadEllyNext) {
        sadEllyNext.src =
            "images/elly/elly_sadly1.webp";

        sadEllyNext.style.opacity = "0";
    }

    if (sadEllyImage) {
        sadEllyImage.src =
            "images/elly/elly_sadly1.webp";

        sadEllyImage.style.opacity = "1";
    }

    sadEmotionView.style.display = "";
    sadEmotionView.setAttribute("aria-hidden", "false");

    sadCustomView.style.display = "none";
    sadCustomView.setAttribute("aria-hidden", "true");

    sadModal.setAttribute("aria-hidden", "true");

    const sadMessage =
        document.querySelector(".sad__message");

    if (sadMessage) sadMessage.value = "";

    const sadCanvas =
        document.querySelector(".sad__canvas");

    if (sadCanvas) {
        const context = sadCanvas.getContext("2d");

        context.clearRect(
            0,
            0,
            sadCanvas.width,
            sadCanvas.height
        );
    }

    const sadElly =
        document.querySelector(".sad__elly");

    if (sadElly) sadElly.classList.remove("is-raised");

    activityOptions.classList.remove("is-visible");
    hideActivityBack();

    sadLetter.setAttribute("aria-hidden", "true");
    sadLetter.classList.remove("is-flying");
    sadLetter.style.display = "none";
}

function showSadEmotionModal() {
    setSadTimeout(() => {
        const ellyImage =
            document.querySelector(".sad__elly-image");

        ellyImage.style.opacity = "0";
        sadTitle.style.opacity = "0";

        setSadTimeout(() => {
            sadModal.setAttribute("aria-hidden", "false");
        }, 300);
    }, 3000);
}

function changeSadEllyImage(image, callback) {
    const ellyImage =
        document.querySelector(".sad__elly-image");

    ellyImage.style.opacity = "0";

    setSadTimeout(() => {
        ellyImage.src = image;

        requestAnimationFrame(() => {
            ellyImage.style.opacity = "1";
        });

        if (callback) callback();
    }, 500);
}

function blinkElly(selector, openImage, closedImage) {
    const ellyImage =
        document.querySelector(selector);

    if (!ellyImage) return;

    ellyImage.src = closedImage;

    setTimeout(() => {
        ellyImage.src = openImage;
    }, 300);
}

function changeSadEllyScene(imageSrc, callback) {
    const currentImage =
        document.querySelector(".sad__elly-image--current");

    const nextImage =
        document.querySelector(".sad__elly-image--next");

    nextImage.src = imageSrc;
    nextImage.style.opacity = "0";

    requestAnimationFrame(() => {
        nextImage.style.opacity = "1";
    });

    setSadTimeout(() => {
        currentImage.src = imageSrc;
        currentImage.style.opacity = "1";
        nextImage.style.opacity = "0";

        if (callback) callback();
    }, 400);
}

function startEllyBlinking(
    selector,
    openImage,
    closedImage,
    delays
) {
    delays.forEach((delay) => {
        setSadTimeout(() => {
            blinkElly(
                selector,
                openImage,
                closedImage
            );
        }, delay);
    });
}

function getSadEmotionPhrase(emotion) {
    const emotionPhrases = {
        "Сумно": "Хочеться вірити, що сум уже не такий сильний",
        "Самотньо": "Сподіваюсь, що самотність уже не така гостра",
        "Образливо": "Сподіваюсь, тобі вже не так образливо",
        "Страшно": "Хочеться вірити, що страх став меншим",
        "Нудно": "Сподіваюсь, що нудьга вже позаду",
        "Злюся": "Сподіваюсь, ти вже не так злишся",
        "Розгублено": "Сподіваюсь, що розгубленість минає",
        "Не знаю": "Сподіваюсь, що невизначеність скоро проясниться",
        "custom": "Сподіваюсь, тобі вже трохи легше 💛"
    };

    return (
        emotionPhrases[emotion] ||
        "Сподіваюсь, тобі вже не так сумно"
    );
}


/* =========================================================
   16. МАЛЮВАННЯ
   ========================================================= */

function initSadCanvas() {
    const canvas =
        document.querySelector(".sad__canvas");

    if (!canvas || canvas.dataset.initialized === "true") {
        return;
    }

    canvas.dataset.initialized = "true";

    const context = canvas.getContext("2d");
    const sadClearButton =
        document.querySelector(".button_sad-clear");

    let isDrawing = false;

    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        context.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

        context.lineWidth = 3;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.strokeStyle = "#555";
    }

    function getPosition(event) {
        const rect = canvas.getBoundingClientRect();

        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }

    function startDrawing(event) {
        isDrawing = true;

        const position = getPosition(event);

        context.beginPath();
        context.moveTo(
            position.x,
            position.y
        );

        canvas.setPointerCapture(event.pointerId);
    }

    function draw(event) {
        if (!isDrawing) return;

        const position = getPosition(event);

        context.lineTo(
            position.x,
            position.y
        );

        context.stroke();
    }

    function stopDrawing(event) {
        if (!isDrawing) return;

        isDrawing = false;
        context.closePath();

        if (event.pointerId !== undefined) {
            canvas.releasePointerCapture(
                event.pointerId
            );
        }
    }

    canvas.addEventListener(
        "pointerdown",
        startDrawing
    );

    canvas.addEventListener(
        "pointermove",
        draw
    );

    canvas.addEventListener(
        "pointerup",
        stopDrawing
    );

    canvas.addEventListener(
        "pointercancel",
        stopDrawing
    );

    canvas.addEventListener(
        "pointerleave",
        stopDrawing
    );

    resizeCanvas();

    if (sadClearButton) {
        sadClearButton.addEventListener(
            "click",
            () => {
                const rect =
                    canvas.getBoundingClientRect();

                context.clearRect(
                    0,
                    0,
                    rect.width,
                    rect.height
                );
            }
        );
    }
}


/* =========================================================
   17. ЛИСТ ЕЛЛІ
   ========================================================= */

function showSadLetterReceived(emotion) {
    const ellyImage =
        document.querySelector(".sad__elly-image");

    sadLetter.style.display = "";
    sadLetter.classList.remove("is-flying");
    sadLetter.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        sadLetter.classList.add("is-flying");
    });

    setSadTimeout(() => {
        sadLetter.setAttribute("aria-hidden", "true");
        sadLetter.classList.remove("is-flying");
        sadLetter.style.display = "none";

        ellyImage.src =
            "images/elly/elly_cuddles1.webp";

        sadTitle.style.opacity = "1";

        sadTitle.textContent =
            "Я почула тебе. Дякую за твоє повідомлення 💌";

        requestAnimationFrame(() => {
            ellyImage.style.opacity = "1";
        });

        setSadTimeout(() => {
            changeSadEllyImage(
                "images/elly/elly_cuddles2.webp",
                () => {
                    sadTitle.textContent =
                        "А тепер хочеш маленькі обійми?";
                }
            );

            setSadTimeout(() => {
                const ellyImage =
                    document.querySelector(".sad__elly-image");

                ellyImage.src =
                    "images/elly/elly_cuddles3.webp";

                sadTitle.textContent =
                    "Обійми себе за плечі і просто побудь так кілька секунд";

                startEllyBlinking(
                    ".sad__elly-image",
                    "images/elly/elly_cuddles3.webp",
                    "images/elly/elly_cuddles2.webp",
                    [2000, 3700, 5900, 8000, 10000]
                );

                setSadTimeout(() => {
                    sadTitle.textContent =
                        getSadEmotionPhrase(emotion);

                    startEllyBlinking(
                        ".sad__elly-image",
                        "images/elly/elly_cuddles3.webp",
                        "images/elly/elly_cuddles2.webp",
                        [1800, 4000, 6500]
                    );

                    setSadTimeout(() => {
                        changeSadEllyScene(
                            "images/elly/elly_sadly3.webp",
                            () => {
                                startEllyBlinking(
                                    ".sad__elly-image--current",
                                    "images/elly/elly_sadly3.webp",
                                    "images/elly/elly_sadly3-1.webp",
                                    [1800, 4000, 6500, 10000, 12000, 15000]
                                );

                                setSadTimeout(() => {
                                    showSadActivityOptions();
                                }, 500);
                            }
                        );
                    }, 8000);
                }, 10500);
            }, 3200);
        }, 5000);
    }, 2500);
}


/* =========================================================
   18. АКТИВНОСТІ
   ========================================================= */

function showSadActivityOptions() {
    const sadAction =
        document.querySelector(".sad__action");

    const sadElly =
        document.querySelector(".sad__elly");

    moveActivityOptions(sadAction);

    requestAnimationFrame(() => {
        sadElly.classList.add("is-raised");
    });

    activityOptions.classList.remove("is-visible");
    hideActivityBack();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            activityOptions.classList.add("is-visible");
            showActivityBack(sadAction);
        });
    });
}

function showActivityOptions(container) {
    if (!container) return;

    hideActivityBack();

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            activityOptions.classList.add("is-visible");
            showActivityBack(container);
        });
    });
}

function moveActivityOptions(container) {
    if (!container) return;

    container.append(activityOptions);
}


/* =========================================================
   19. КАРТКИ СТАНУ
   ========================================================= */

stateCards.forEach((card) => {
    card.addEventListener("click", () => {

        stateCards.forEach((item) =>
            item.classList.remove("is-selected")
        );

        card.classList.add("is-selected");

        const state = card.dataset.state;

        welcome.style.display = "none";

        hideAllActivities();
        activityOptions.classList.remove("is-visible");
        hideActivityBack();

        moveActivityOptions(
            state === "worry"
                ? groundingContent
                : breathing
        );

        /* ─── "Я хвилююся" → ЗАЗЕМЛЕННЯ ─── */

        if (state === "worry") {
            sceneCount = 0;
            availableScenes = getRandomScenes();

            groundingActions.classList.remove("is-hidden");

            groundingStep = 0;
            groundingUsedTasks = [];

            groundingTitle.textContent =
                "Давай на хвилинку озирнемося навколо";

            showGroundingTask(
                getRandomGroundingTask()
            );

            groundingInstruction.style.display = "";
            groundingIcon.style.display = "";
            groundingSuccess.style.display = "";
            groundingHelp.style.display = "";

            groundingCheck.classList.remove("is-visible");
            groundingCheck.setAttribute(
                "aria-hidden",
                "true"
            );

            groundingScene.classList.remove("is-visible");
            groundingScene.setAttribute(
                "aria-hidden",
                "true"
            );

            groundingSceneTargets.forEach((target) => {
                target.classList.remove("is-found");
            });

            grounding.classList.add("is-active");
            grounding.setAttribute(
                "aria-hidden",
                "false"
            );

            showActivityBack(groundingContent);

            return;
        }

        /* ─── "Мені сумно" → ПІДТРИМКА ЕЛЛІ ─── */

        if (state === "sad") {
            resetSad();

            sad.classList.add("is-active");
            sad.setAttribute(
                "aria-hidden",
                "false"
            );

            showSadEmotionModal();

            return;
        }

        /* ─── "Я ЗЛЮСЯ" ─── */

        if (state === "angry") {
            angryReturnsCount = 0;

            angry.classList.add("is-active");
            angry.setAttribute(
                "aria-hidden",
                "false"
            );

            setAngryPhrase();

            showActivityBack(
                angry.querySelector(".angry__content")
            );

            return;
        }

        /* ─── ІНШІ СТАНИ → ДИХАЛЬНА ВПРАВА ─── */

        breathing.classList.add("is-active");
        breathing.setAttribute(
            "aria-hidden",
            "false"
        );

        setTimeout(() => {
            showActivityOptions(breathing);
        }, 8000);
    });
});


/* =========================================================
   20. ЗАЗЕМЛЕННЯ — ПЕРШИЙ РІВЕНЬ
   ========================================================= */

groundingSuccess.addEventListener("click", () => {
    groundingStep++;

    if (groundingStep < 4) {
        const nextTask =
            getRandomGroundingTask();

        showGroundingTask(nextTask);

        return;
    }

    groundingTitle.textContent =
        "Як ти зараз себе почуваєш?";

    groundingInstruction.style.display = "none";
    groundingSuccess.style.display = "none";
    groundingHelp.style.display = "none";
    groundingIcon.style.display = "none";

    groundingCheck.classList.add("is-visible");
    groundingCheck.setAttribute(
        "aria-hidden",
        "false"
    );
});


/* =========================================================
   21. «НЕ ВИХОДИТЬ» → СЦЕНИ
   ========================================================= */

groundingHelp.addEventListener("click", () => {
    groundingHelp.blur();

    sceneCount = 0;
    availableScenes = getRandomScenes();

    groundingInstruction.textContent = "";
    groundingInstruction.classList.add("is-empty");

    groundingIcon.style.display = "none";
    groundingSuccess.style.display = "none";
    groundingHelp.style.display = "none";

    groundingTitle.textContent =
        "Пропоную пошукати предмети тут";

    showGroundingScene(
        availableScenes[sceneCount]
    );

    sceneCount++;
});


/* =========================================================
   22. ПОПЕРЕДНЄ ЗАВАНТАЖЕННЯ
   ========================================================= */

function preloadImages(urls) {
    return Promise.all(
        urls.map(
            (url) =>
                new Promise((resolve) => {
                    const img = new Image();

                    img.onload = resolve;
                    img.onerror = resolve;

                    img.src = url;
                })
        )
    );
}


/* =========================================================
   23. ВИБІР ПІСЛЯ ЗАЗЕМЛЕННЯ
   ========================================================= */

function initGroundingChoices() {
    const groundingChoices =
        document.querySelectorAll(".grounding__choice");

    groundingChoices.forEach((choice, index) => {
        choice.addEventListener("click", () => {

            groundingCheck.classList.remove(
                "is-visible"
            );

            groundingCheck.setAttribute(
                "aria-hidden",
                "true"
            );

            /* ПЕРША КНОПКА */

            if (index === 0) {
                groundingTitle.textContent =
                    "Добре. Я поруч";

                ellyImg =
                    document.createElement("img");

                ellyImg.id =
                    "grounding-elly-js";

                ellyImg.src =
                    "images/elly/elly_angry_2.webp";

                ellyImg.alt = "Еллі";

                ellyImg.className =
                    "grounding__elly";

                ellyImg.width = 300;
                ellyImg.height = 250;

                groundingTitle.insertAdjacentElement(
                    "afterend",
                    ellyImg
                );

                groundingInstruction.textContent = "";
                groundingInstruction.classList.add(
                    "is-empty"
                );

                setTimeout(() => {
                    moveActivityOptions(
                        groundingContent
                    );

                    showActivityOptions(
                        groundingContent
                    );

                    preloadImages([
                        "images/elly/elly_angry_2.webp",
                        "images/elly/elly_angry_1.webp"
                    ]).then(() => {
                        startEllyBlinking(
                            "#grounding-elly-js",
                            "images/elly/elly_angry_2.webp",
                            "images/elly/elly_angry_1.webp",
                            [
                                800,
                                3800,
                                6800,
                                10800,
                                14200,
                                17800,
                                20800
                            ]
                        );
                    });
                }, 1800);

                return;
            }

            /* ДРУГА КНОПКА */

            groundingInstruction.textContent = "";
            groundingInstruction.classList.add(
                "is-empty"
            );

            sceneCount++;

            if (sceneCount <= 2) {
                groundingTitle.textContent =
                    "Пропоную пошукати предмети тут";

                showGroundingScene(
                    availableScenes[sceneCount - 1]
                );

                return;
            }

            groundingTitle.textContent =
                "Тоді просто побудемо тут. Тобі не потрібно поспішати";

            setTimeout(() => {
                groundingTitle.textContent =
                    "Що тобі зараз хочеться?";

                moveActivityOptions(
                    groundingContent
                );

                showActivityOptions(
                    groundingContent
                );
            }, 3500);
        });
    });
}


/* =========================================================
   24. ПОШУК ПРЕДМЕТІВ У СЦЕНАХ
   ========================================================= */

groundingSceneTargets.forEach((target) => {
    target.addEventListener("click", () => {

        const selectedItem =
            target.dataset.sceneItem;

        /* ОСТАННЄ ЗАВДАННЯ */

        if (
            currentSceneTask.correctItems ===
            "favorite"
        ) {
            const wasFound =
                target.classList.contains("is-found");

            const favoriteItem =
                sceneTasks[currentScene].favoriteItem;

            target.style.pointerEvents = "auto";

            target.classList.add(
                "is-found",
                "is-favorite"
            );

            if (wasFound) {
                groundingInstruction.textContent =
                    "О, ти знову вибрав це 😊 Супер!";
            } else if (selectedItem === favoriteItem) {

                if (favoriteItem === "teddy") {
                    groundingInstruction.textContent =
                        "О! Тобі теж подобається ведмедик? Супер! 🧸";
                } else if (favoriteItem === "cloud") {
                    groundingInstruction.textContent =
                        "О! Тобі подобається хмарка? Супер! ☁️";
                } else if (
                    favoriteItem === "teacher-pencils"
                ) {
                    groundingInstruction.textContent =
                        "О, я би теж їх вибрала! Малювати — це моє хоббі!";
                } else if (
                    favoriteItem === "teddy-room"
                ) {
                    groundingInstruction.textContent =
                        "О, ти теж обрав ведмедика! Здається, він тут справжній господар цієї кімнати 🧸";
                }

            } else {

                if (favoriteItem === "teddy") {
                    groundingInstruction.textContent =
                        "Гарний вибір! 😊 А мені подобається ведмедик 🧸";
                } else if (favoriteItem === "cloud") {
                    groundingInstruction.textContent =
                        "Здорово! 😊 А мені подобається хмарка. Бо я сама — хмарка ☁️";
                } else if (
                    favoriteItem === "teacher-pencils"
                ) {
                    groundingInstruction.textContent =
                        "Чудовий вибір! А я вибрала олівці. Обожнюю малювати!";
                } else if (
                    favoriteItem === "teddy-room"
                ) {
                    groundingInstruction.textContent =
                        "Чудовий вибір! А я найбільше люблю ведмедика. Він такий затишний 🧸";
                }
            }

            finishGroundingScene();

            return;
        }

        /* ЗВИЧАЙНІ ЗАВДАННЯ */

        const isCorrect =
            currentSceneTask.correctItems.includes(
                selectedItem
            );

        if (!isCorrect) {
            sceneWrongAttempts++;

            target.blur();

            groundingSceneTargets.forEach(
                (item) =>
                    item.classList.remove("is-hint")
            );

            if (sceneWrongAttempts >= 2) {
                groundingInstruction.textContent =
                    "Спробуй ось сюди 😊";

                const correctTarget =
                    Array.from(
                        groundingSceneTargets
                    ).find(
                        (item) =>
                            currentSceneTask.correctItems.includes(
                                item.dataset.sceneItem
                            )
                    );

                if (correctTarget) {
                    correctTarget.classList.add(
                        "is-hint"
                    );
                }

                return;
            }

            groundingInstruction.textContent =
                currentSceneTask.retryText;

            return;
        }

        target.classList.remove("is-hint");
        target.classList.add("is-found");

        sceneTaskIndex++;

        setTimeout(() => {
            if (sceneTaskIndex < 3) {
                showSceneTask(
                    getRandomSceneTask()
                );

                return;
            }

            if (sceneTaskIndex === 3) {
                showSceneTask(
                    getRandomSceneTask()
                );
            }
        }, 1200);
    });
});


/* =========================================================
   25. СУМНИЙ ЕКРАН — КНОПКИ
   ========================================================= */

function initSadControls() {
    const buttonSadCustom =
        document.querySelector(".button_sad-custom");

    const sadSendButton =
        document.querySelector(".button_sad-send");

    const sadBackButton =
        document.querySelector(".button_sad-back");

    if (buttonSadCustom) {
        buttonSadCustom.addEventListener(
            "click",
            () => {
                sadEmotionView.style.display = "none";

                sadCustomView.style.display = "";

                sadCustomView.setAttribute(
                    "aria-hidden",
                    "false"
                );

                initSadCanvas();
            }
        );
    }

    if (sadSendButton) {
        sadSendButton.addEventListener(
            "click",
            () => {
                sadModal.setAttribute(
                    "aria-hidden",
                    "true"
                );

                showSadLetterReceived("custom");
            }
        );
    }

    if (sadBackButton) {
        sadBackButton.addEventListener(
            "click",
            () => {

                const sadMessage =
                    document.querySelector(
                        ".sad__message"
                    );

                const sadCanvas =
                    document.querySelector(
                        ".sad__canvas"
                    );

                if (sadMessage) {
                    sadMessage.value = "";
                }

                if (sadCanvas) {
                    const context =
                        sadCanvas.getContext("2d");

                    context.clearRect(
                        0,
                        0,
                        sadCanvas.width,
                        sadCanvas.height
                    );
                }

                sadCustomView.style.display =
                    "none";

                sadCustomView.setAttribute(
                    "aria-hidden",
                    "true"
                );

                sadEmotionView.style.display = "";

                sadModal.setAttribute(
                    "aria-hidden",
                    "false"
                );
            }
        );
    }
}


/* =========================================================
   26. ФРАЗИ ЕКРАНА ЗЛОСТІ
   ========================================================= */

function setAngryPhrase() {
    const angryTitle =
        document.querySelector(".angry__title");

    if (!angryTitle) return;

    if (angryReturnsCount === 0) {
        angryTitle.textContent =
            "Давай спробуємо заспокоїтися! Разом впораємось";
    } else if (angryReturnsCount === 1) {
        angryTitle.textContent =
            "Нічого, іноді треба більше часу. Що спробуємо ще?";
    } else if (angryReturnsCount === 2) {
        angryTitle.textContent =
            "Я бачу, тобі ще непросто. Я з тобою! Хочеш спробувати ще одну гру?";
    } else {
        angryTitle.textContent =
            "Я нікуди не поспішаю. Побуду поруч, скільки потрібно. Може, тобі зараз хочеться щось інше?";
    }
}


/* =========================================================
   27. ФІНАЛЬНИЙ ЕКРАН ПІСЛЯ ІГОР
   ========================================================= */

function startAngryFinalBlinking() {
    stopAngryFinalBlinking();

    const blink =
        document.querySelector(
            "[data-angry-final-blink]"
        );

    if (!blink) return;

    function doBlink() {
        blink.style.opacity = "1";

        setTimeout(() => {
            blink.style.opacity = "0";
        }, 350);
    }

    angryFinalBlinkTimeout =
        setTimeout(() => {
            doBlink();

            angryFinalBlinkTimer =
                setInterval(() => {
                    if (Math.random() > 0.4) {
                        doBlink();
                    }
                }, 3500);
        }, 1500);
}

function stopAngryFinalBlinking() {
    if (angryFinalBlinkTimer) {
        clearInterval(
            angryFinalBlinkTimer
        );
    }

    if (angryFinalBlinkTimeout) {
        clearTimeout(
            angryFinalBlinkTimeout
        );
    }

    angryFinalBlinkTimer = null;
    angryFinalBlinkTimeout = null;

    const blink =
        document.querySelector(
            "[data-angry-final-blink]"
        );

    if (blink) {
        blink.style.opacity = "0";
    }
}

function showAngryFinal(type) {
    if (!angryFinal) return;

    const title =
        angryFinal.querySelector(
            "[data-angry-final-title]"
        );

    const image =
        angryFinal.querySelector(
            "[data-angry-final-image]"
        );

    const blink =
        angryFinal.querySelector(
            "[data-angry-final-blink]"
        );

    hideAllActivities();
    hideActivityBack();

    if (type === "calm") {
        if (title) {
            title.textContent =
                "Рада допомогти! Я з тобою поруч";
        }

        if (image) {
            image.src =
                "images/elly/elly_angry_2.webp";
        }

        if (blink) {
            blink.src =
                "images/elly/elly_angry_1.webp";
        }

    } else if (type === "still-angry") {

        if (title) {
            title.textContent =
                "Я з тобою. Побудемо разом, скільки потрібно";
        }

        if (image) {
            image.src =
                "images/elly/elly_ag.webp";
        }

        if (blink) {
            blink.src =
                "images/elly/elly_ag1.webp";
        }
    }

    angryFinal.classList.add("is-active");
    angryFinal.setAttribute(
        "aria-hidden",
        "false"
    );

    showActivityBack(
        angryFinal.querySelector(
            ".angry-final__content"
        )
    );

    setTimeout(() => {
        startAngryFinalBlinking();
    }, 200);

    setTimeout(() => {
        const content =
            angryFinal.querySelector(
                ".angry-final__content"
            );

        if (content) {
            moveActivityOptions(content);
            showActivityOptions(content);
        }
    }, 1500);
}

function resetAngryFinal() {
    stopAngryFinalBlinking();

    if (angryFinal) {
        angryFinal.classList.remove(
            "is-active"
        );

        angryFinal.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    const image =
        document.querySelector(
            "[data-angry-final-image]"
        );

    if (image) {
        image.src =
            "images/elly/elly_angry_2.webp";
    }

    const blink =
        document.querySelector(
            "[data-angry-final-blink]"
        );

    if (blink) {
        blink.src =
            "images/elly/elly_angry_1.webp";
    }

    const title =
        document.querySelector(
            "[data-angry-final-title]"
        );

    if (title) {
        title.textContent =
            "Рада допомогти! Я з тобою поруч";
    }
}


/* =========================================================
   28. РОЗПЛУТАЙ НИТКИ — ФУНКЦІЇ
   ========================================================= */

function preloadAngryEllyImages() {
    [
        "images/elly/elly_angry.webp",
        "images/elly/elly_ag.webp",
        "images/elly/elly_angry_1.webp",
        "images/elly/elly_angry_2.webp"
    ].forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

if (angryGame) {
    preloadAngryEllyImages();
}

function startEllyBlinkingGame() {
    stopEllyBlinkingGame();

    function blink() {
        angryEllyBlink.style.opacity = "1";

        setTimeout(() => {
            angryEllyBlink.style.opacity = "0";
        }, 300);
    }

    angryBlinkTimeout =
        setTimeout(() => {
            blink();

            angryBlinkTimer =
                setInterval(() => {
                    if (Math.random() > 0.4) {
                        blink();
                    }
                }, 3500);
        }, 1500);
}

function stopEllyBlinkingGame() {
    if (angryBlinkTimer) {
        clearInterval(
            angryBlinkTimer
        );
    }

    if (angryBlinkTimeout) {
        clearTimeout(
            angryBlinkTimeout
        );
    }

    angryBlinkTimer = null;
    angryBlinkTimeout = null;

    if (angryEllyBlink) {
        angryEllyBlink.style.opacity = "0";
    }
}

function showEllyHalfCalm() {
    angryEllyAngry.style.opacity = "0";
    angryEllyHalfCalm.style.opacity = "1";
}

function showEllyCalm() {
    angryEllyHalfCalm.style.opacity = "0";
    angryEllyCalm.style.opacity = "1";

    setTimeout(() => {
        startEllyBlinkingGame();
    }, 1500);
}

function activateThread(thread) {
    if (!thread) return;

    currentActiveThread = thread;
    thread.classList.add("is-active");
    thread.classList.add("is-trembling");
}

function resetAngryGame() {
    if (!angryGame) return;

    stopEllyBlinkingGame();

    document.body.style.overflow = "";

    const angryGames =
        document.querySelector(".angry__games");

    if (angryGames) {
        angryGames.style.display = "";
    }

    setAngryPhrase();

    angryThreadsRemaining = 5;

    if (angryGameCounter) {
        angryGameCounter.textContent = "5";
    }

    const counter =
        document.querySelector(
            ".angry-game__counter"
        );

    if (counter) {
        counter.style.display = "";
    }

    if (angryEllyAngry) {
        angryEllyAngry.style.opacity = "1";
    }

    if (angryEllyHalfCalm) {
        angryEllyHalfCalm.style.opacity = "0";
    }

    if (angryEllyCalm) {
        angryEllyCalm.style.opacity = "0";
    }

    if (angryEllyBlink) {
        angryEllyBlink.style.opacity = "0";
    }

    currentActiveThread = null;

    const elly =
        angryGame.querySelector(
            ".angry-game__elly"
        );

    if (elly) {
        elly.classList.remove("is-raised");
    }

    angryGame
        .querySelectorAll(
            ".angry-game .thread"
        )
        .forEach((thread) => {

            thread.classList.remove(
                "is-active",
                "is-trembling",
                "is-calming",
                "is-calm",
                "is-jerking"
            );

            thread.style.display = "";
            thread.style.opacity = "";
            thread.style.transform = "";

            threadProgress.set(
                thread,
                0
            );

            const line =
                thread.querySelector(
                    ".thread__line"
                );

            if (line) {
                line.style.opacity = "";
            }
        });

    angryGameThreads = [];
    angryThreadsSorted.length = 0;

    if (angryGameFinish) {
        angryGameFinish.classList.remove(
            "is-visible"
        );

        angryGameFinish.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}

function setAngryGameTitle(isFinal = false) {
    const title =
        document.querySelector(
            ".angry-game__title"
        );

    if (!title) return;

    if (isFinal) {

        if (angryReturnsCount === 0) {
            title.textContent =
                "Дякую за допомогу. Я вже не злюся";
        } else if (angryReturnsCount === 1) {
            title.textContent =
                "Дякую! Здається, тобі вже легше";
        } else {
            title.textContent =
                "Ти впорався! Я вже спокійна";
        }

        return;
    }

    if (angryReturnsCount === 0) {
        title.textContent =
            "Допоможи мені розплутати нитки";
    } else if (angryReturnsCount === 1) {
        title.textContent =
            "Допоможи мені ще раз";
    } else {
        title.textContent =
            "В тебе здорово виходить. Допоможи мені ще трохи";
    }
}

function setAngryGameTexts() {
    const thanks =
        document.querySelector(
            ".angry-game__thanks"
        );

    if (!thanks) return;

    if (angryReturnsCount === 0) {
        thanks.textContent =
            "А ти як зараз?";
    } else if (angryReturnsCount === 1) {
        thanks.textContent =
            "Ну що, вийшло трохи заспокоїтись?";
    } else {
        thanks.textContent =
            "Як ти зараз почуваєшся?";
    }
}

function startAngryGame() {
    if (!angryGame) return;

    if (document.activeElement) {
        document.activeElement.blur();
    }

    resetAngryGame();

    const oldSvg =
        angryGame.querySelector(
            ".angry-game__svg"
        );

    if (oldSvg) {
        const newSvg =
            oldSvg.cloneNode(true);

        oldSvg.parentNode.replaceChild(
            newSvg,
            oldSvg
        );
    }

    angryGameThreads =
        Array.from(
            angryGame.querySelectorAll(
                ".angry-game .thread"
            )
        );

    angryThreadsSorted.length = 0;

    Array.from(angryGameThreads)
        .sort(
            (a, b) =>
                Number(a.dataset.order || 0) -
                Number(b.dataset.order || 0)
        )
        .forEach((t) =>
            angryThreadsSorted.push(t)
        );

    angryGameThreads.forEach(
        (thread) =>
            initThread(thread)
    );

    setAngryGameTitle(false);
    setAngryGameTexts();

    angry.classList.remove("is-active");
    angry.setAttribute(
        "aria-hidden",
        "true"
    );

    angryGame.classList.add("is-active");
    angryGame.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    showActivityBack(
        angryGame.querySelector(
            ".angry-game__content"
        )
    );

    const firstThread =
        angryThreadsSorted.find(
            (t) =>
                t.dataset.order === "1"
        );

    if (firstThread) {
        activateThread(firstThread);
    }
}

function initThread(thread) {
    const line =
        thread.querySelector(
            ".thread__line"
        );

    const knot =
        thread.querySelector(
            ".thread__knot"
        );

    if (!line) return;

    let pathLength = 0;

    try {
        pathLength =
            line.getTotalLength();
    } catch (e) {
        pathLength = 0;
    }

    threadProgress.set(
        thread,
        0
    );

    let pointerDown = null;
    let isSwiping = false;
    let movedEnough = false;
    let isDone = false;

    function getProgressFromEvent(event) {
        if (!pathLength) return null;

        const svg =
            line.ownerSVGElement;

        if (!svg) return null;

        const svgRect =
            svg.getBoundingClientRect();

        const viewBox =
            svg.viewBox.baseVal;

        const scaleX =
            viewBox.width /
            svgRect.width;

        const scaleY =
            viewBox.height /
            svgRect.height;

        const x =
            (event.clientX -
                svgRect.left) *
            scaleX;

        const y =
            (event.clientY -
                svgRect.top) *
            scaleY;

        const step =
            pathLength / 100;

        let bestDist = Infinity;
        let bestLength = 0;

        for (
            let l = 0;
            l <= pathLength;
            l += step
        ) {
            const p =
                line.getPointAtLength(l);

            const dx = p.x - x;
            const dy = p.y - y;

            const dist =
                dx * dx + dy * dy;

            if (dist < bestDist) {
                bestDist = dist;
                bestLength = l;
            }
        }

        const MAX_DIST = 25;

        if (
            Math.sqrt(bestDist) >
            MAX_DIST
        ) {
            return null;
        }

        return bestLength /
            pathLength;
    }

    function doJerk() {
        if (isDone) return;

        thread.classList.remove(
            "is-jerking"
        );

        void thread.offsetWidth;

        thread.classList.add(
            "is-jerking"
        );

        setTimeout(() => {
            thread.classList.remove(
                "is-jerking"
            );
        }, 240);
    }

    function calmDown() {
        if (isDone) return;

        isDone = true;

        thread.classList.remove(
            "is-active",
            "is-trembling",
            "is-calming",
            "is-jerking"
        );

        thread.classList.add(
            "is-calm"
        );

        setTimeout(() => {

            thread.style.display =
                "none";

            angryThreadsRemaining--;

            if (angryGameCounter) {
                angryGameCounter.textContent =
                    angryThreadsRemaining;
            }

            if (
                angryThreadsRemaining === 3
            ) {
                showEllyHalfCalm();
            }

            const nextThread =
                angryThreadsSorted.find(
                    (t) =>
                        !t.classList.contains(
                            "is-calm"
                        ) &&
                        t !== thread
                );

            if (nextThread) {
                activateThread(
                    nextThread
                );
            }

            if (angryThreadsRemaining === 0) {
                setTimeout(() => {

                    showEllyCalm();
                    setAngryGameTitle(true);

                    const elly = angryGame.querySelector(".angry-game__elly");

                    if (elly) {
                        elly.classList.add("is-raised");
                    }

                    const counter = document.querySelector(".angry-game__counter");

                    if (counter) {
                        counter.style.display =
                            "none";
                    }

                    document.body.style.overflow = "";

                    angryGameFinish.setAttribute("aria-hidden", "false");

                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            angryGameFinish.classList.add(
                                "is-visible"
                            );
                        });
                    });
                    hideActivityBack();

                }, 600);
            }

        }, 800);
    }

    function onPointerDown(event) {
        if (isDone) return;

        if (
            !thread.classList.contains(
                "is-active"
            )
        ) {
            return;
        }

        thread.classList.remove(
            "is-calming",
            "is-jerking"
        );

        pointerDown = {
            x: event.clientX,
            y: event.clientY
        };

        isSwiping = true;
        movedEnough = false;

        window.addEventListener(
            "pointermove",
            onPointerMove
        );

        window.addEventListener(
            "pointerup",
            onPointerUp
        );

        window.addEventListener(
            "pointercancel",
            onPointerUp
        );
    }

    function onPointerMove(event) {
        if (
            !isSwiping ||
            isDone ||
            !pointerDown
        ) {
            return;
        }

        const dx =
            event.clientX -
            pointerDown.x;

        const dy =
            event.clientY -
            pointerDown.y;

        const dist =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        if (
            dist >
            SWIPE_MIN_DISTANCE
        ) {
            movedEnough = true;
        }

        if (!movedEnough) return;

        thread.classList.remove(
            "is-trembling"
        );

        thread.classList.add(
            "is-calming"
        );

        const progress =
            getProgressFromEvent(event);

        if (progress === null) return;

        const prevProgress =
            threadProgress.get(thread) ||
            0;

        if (
            progress >
            prevProgress
        ) {
            threadProgress.set(
                thread,
                progress
            );

            const current =
                threadProgress.get(thread) ||
                0;

            line.style.opacity =
                String(
                    1 -
                    current * 0.4
                );
        }
    }

    function onPointerUp(event) {
        if (!isSwiping) return;

        window.removeEventListener(
            "pointermove",
            onPointerMove
        );

        window.removeEventListener(
            "pointerup",
            onPointerUp
        );

        window.removeEventListener(
            "pointercancel",
            onPointerUp
        );

        const wasMovedEnough =
            movedEnough;

        isSwiping = false;
        movedEnough = false;
        pointerDown = null;

        line.style.opacity = "";

        if (isDone) return;

        if (!wasMovedEnough) {
            doJerk();

            if (
                !thread.classList.contains(
                    "is-calm"
                )
            ) {
                thread.classList.add(
                    "is-trembling"
                );
            }

            return;
        }

        const progress =
            threadProgress.get(thread) ||
            0;

        if (
            progress >=
            SWIPE_THRESHOLD
        ) {
            calmDown();
        } else {
            thread.classList.remove(
                "is-calming"
            );

            thread.classList.add(
                "is-trembling"
            );
        }
    }

    line.addEventListener(
        "pointerdown",
        onPointerDown
    );

    if (knot) {
        knot.addEventListener(
            "pointerdown",
            (event) => {
                event.preventDefault();
                event.stopPropagation();

                doJerk();
            }
        );
    }
}


/* =========================================================
   29. ВИПУСТИ ПАРУ — ФУНКЦІЇ
   ========================================================= */

function preloadAngrySteamEllyImages() {
    [
        "images/elly/elly_angry_4.webp",
        "images/elly/elly_angry_5.webp",
        "images/elly/elly_angry_2.webp",
        "images/elly/elly_angry_1.webp"
    ].forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

if (angrySteam) {
    preloadAngrySteamEllyImages();
}

function pluralizeBalloons(count) {
    const lastDigit = count % 10;
    const lastTwo = count % 100;

    if (
        lastTwo >= 11 &&
        lastTwo <= 14
    ) {
        return "кульок";
    }

    if (lastDigit === 1) {
        return "кулька";
    }

    if (
        lastDigit >= 2 &&
        lastDigit <= 4
    ) {
        return "кульки";
    }

    return "кульок";
}

function getSteamFinalPhrase(count) {
    if (count === 0) {
        return "Нічого, спробуємо ще разом! Я поруч.";
    }

    if (
        count >= 1 &&
        count <= 4
    ) {
        return "Трохи пари випустив. Дякую, що спробував!";
    }

    if (
        count >= 5 &&
        count <= 9
    ) {
        return "Ого, як гарно! Уже легше дихати.";
    }

    if (
        count >= 10 &&
        count <= 19
    ) {
        return "Скільки пари ти розвіяв! Мені вже спокійніше.";
    }

    if (
        count >= 20 &&
        count <= 39
    ) {
        return "Ти справжній помічник! Я вже майже спокійна.";
    }

    return "Неймовірно! Від пари нічого не залишилось!";
}

function setSteamEllyState(state) {
    if (
        steamCurrentEllyState === state
    ) {
        return;
    }

    steamCurrentEllyState = state;

    if (state === "full") {
        angrySteamEllyFull.style.opacity = "1";
        angrySteamEllySome.style.opacity = "0";
        angrySteamEllyCalm.style.opacity = "0";
    } else if (state === "some") {
        angrySteamEllyFull.style.opacity = "0";
        angrySteamEllySome.style.opacity = "1";
        angrySteamEllyCalm.style.opacity = "0";
    } else if (state === "calm") {
        angrySteamEllyFull.style.opacity = "0";
        angrySteamEllySome.style.opacity = "0";
        angrySteamEllyCalm.style.opacity = "1";

        startSteamBlinking();
    }
}

function startSteamBlinking() {
    stopSteamBlinking();

    function blink() {
        angrySteamEllyBlink.style.opacity =
            "1";

        setTimeout(() => {
            angrySteamEllyBlink.style.opacity =
                "0";
        }, 300);
    }

    steamBlinkTimeout =
        setTimeout(() => {
            blink();

            steamBlinkTimer =
                setInterval(() => {
                    if (Math.random() > 0.4) {
                        blink();
                    }
                }, 3500);
        }, 1500);
}

function stopSteamBlinking() {
    if (steamBlinkTimer) {
        clearInterval(
            steamBlinkTimer
        );
    }

    if (steamBlinkTimeout) {
        clearTimeout(
            steamBlinkTimeout
        );
    }

    steamBlinkTimer = null;
    steamBlinkTimeout = null;

    if (angrySteamEllyBlink) {
        angrySteamEllyBlink.style.opacity =
            "0";
    }
}

function createSteamBalloon() {
    if (!angrySteamBalloonsContainer) {
        return;
    }

    const balloon =
        document.createElement("span");

    balloon.className = "balloon";

    const color =
        STEAM_BALLOON_COLORS[
            Math.floor(
                Math.random() *
                STEAM_BALLOON_COLORS.length
            )
        ];

    balloon.classList.add(
        `balloon--${color}`
    );

    const size =
        STEAM_BALLOON_MIN_SIZE +
        Math.random() *
        (
            STEAM_BALLOON_MAX_SIZE -
            STEAM_BALLOON_MIN_SIZE
        );

    balloon.style.width =
        `${size}px`;

    balloon.style.height =
        `${size}px`;

    const stageWidth =
        angrySteamStage.clientWidth;

    const left =
        Math.random() *
        (stageWidth - size);

    balloon.style.left =
        `${left}px`;

    balloon.style.top =
        `${angrySteamStage.clientHeight + size}px`;

    const baseDuration = 9;

    const duration =
        baseDuration /
        steamSpeedMultiplier;

    balloon.style.transition =
        `transform ${duration}s linear`;

    let popped = false;

    balloon.addEventListener(
        "pointerdown",
        (event) => {
            event.preventDefault();
            event.stopPropagation();

            if (popped) return;

            popped = true;

            steamBalloonsPopped++;

            updateSteamCounter();
            checkSteamEllyState();
            resetSteamIdleTimer();

            balloon.style.transform =
                "scale(1.4)";

            balloon.style.opacity =
                "0";

            balloon.style.transition =
                "transform 300ms ease, opacity 300ms ease";

            setTimeout(
                () => balloon.remove(),
                320
            );
        }
    );

    angrySteamBalloonsContainer.appendChild(
        balloon
    );

    requestAnimationFrame(() => {
        const distance =
            angrySteamStage.clientHeight +
            size +
            20;

        balloon.style.transform =
            `translateY(-${distance}px)`;
    });

    setTimeout(() => {
        if (balloon.parentNode) {
            balloon.remove();
        }
    }, duration * 1000 + 200);
}

function updateSteamCounter() {
    if (angrySteamCounter) {
        angrySteamCounter.textContent =
            steamBalloonsPopped;
    }
}

function checkSteamEllyState() {
    if (steamBalloonsPopped >= 20) {
        setSteamEllyState("calm");
    } else if (steamBalloonsPopped >= 10) {
        setSteamEllyState("some");
    } else {
        setSteamEllyState("full");
    }
}

function resetSteamIdleTimer() {
    if (steamIdleTimer) {
        clearTimeout(
            steamIdleTimer
        );
    }

    if (angrySteamHint) {
        angrySteamHint.classList.remove(
            "is-visible"
        );

        angrySteamHint.textContent = "";
    }

    steamIdleTimer =
        setTimeout(() => {
            if (angrySteamHint) {
                angrySteamHint.textContent =
                    "Спробуй лопнути кульку!";

                angrySteamHint.classList.add(
                    "is-visible"
                );
            }
        }, STEAM_IDLE_STEP_1);
}

function startAngrySteam() {
    if (!angrySteam) return;

    resetAngrySteam();

    angry.classList.remove("is-active");
    angry.setAttribute(
        "aria-hidden",
        "true"
    );

    angrySteam.classList.add(
        "is-active"
    );

    angrySteam.setAttribute(
        "aria-hidden",
        "false"
    );

    showActivityBack(
        angrySteam.querySelector(
            ".angry-steam__content"
        )
    );

    steamGameActive = true;
    steamElapsedSeconds = 0;
    steamSpeedMultiplier = 1;
    steamBalloonsPopped = 0;
    steamCurrentEllyState = "full";

    setSteamEllyState("full");
    updateSteamCounter();

    steamSpawnInterval =
        setInterval(() => {
            if (!steamGameActive) return;

            createSteamBalloon();
        }, STEAM_SPAWN_INTERVAL);

    createSteamBalloon();

    steamGameTimer =
        setInterval(() => {
            steamElapsedSeconds++;

            if (angrySteamTime) {
                angrySteamTime.textContent =
                    Math.max(
                        0,
                        STEAM_GAME_DURATION -
                        steamElapsedSeconds
                    );
            }

            if (
                steamElapsedSeconds % 10 === 0
            ) {
                steamSpeedMultiplier += 0.25;
            }

            if (
                steamElapsedSeconds >=
                STEAM_GAME_DURATION
            ) {
                finishAngrySteam();
            }
        }, 1000);

    resetSteamIdleTimer();
}

function finishAngrySteam() {
    steamGameActive = false;

    if (steamSpawnInterval) {
        clearInterval(
            steamSpawnInterval
        );
    }

    if (steamGameTimer) {
        clearInterval(
            steamGameTimer
        );
    }

    if (steamIdleTimer) {
        clearTimeout(
            steamIdleTimer
        );
    }

    steamSpawnInterval = null;
    steamGameTimer = null;
    steamIdleTimer = null;

    if (angrySteamBalloonsContainer) {
        angrySteamBalloonsContainer.innerHTML =
            "";
    }

    if (angrySteamHint) {
        angrySteamHint.classList.remove(
            "is-visible"
        );

        angrySteamHint.textContent = "";
    }

    setSteamEllyState("calm");

    const plural =
        pluralizeBalloons(
            steamBalloonsPopped
        );

    const phrase =
        getSteamFinalPhrase(
            steamBalloonsPopped
        );

    const steamTitle =
        document.querySelector(
            ".angry-steam__title"
        );

    if (steamTitle) {
        steamTitle.textContent =
            phrase;
    }

    const liveInfo =
        document.querySelector(
            ".angry-steam__live-info"
        );

    if (liveInfo) {
        liveInfo.classList.add(
            "is-hidden"
        );
    }

    const summary =
        document.querySelector(
            "[data-steam-summary]"
        );

    if (summary) {
        summary.textContent =
            `Розвіяно ${steamBalloonsPopped} ${plural} пари.`;

        summary.setAttribute(
            "aria-hidden",
            "false"
        );

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                summary.classList.add(
                    "is-visible"
                );
            });
        });
    }

    document.body.style.overflow = "";

    if (angrySteamFinish) {
        angrySteamFinish.setAttribute(
            "aria-hidden",
            "false"
        );

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                angrySteamFinish.classList.add(
                    "is-visible"
                );
            });
        });
    }
    hideActivityBack();
}

function resetAngrySteam() {
    steamGameActive = false;

    if (steamSpawnInterval) {
        clearInterval(
            steamSpawnInterval
        );
    }

    if (steamGameTimer) {
        clearInterval(
            steamGameTimer
        );
    }

    if (steamIdleTimer) {
        clearTimeout(
            steamIdleTimer
        );
    }

    stopSteamBlinking();

    steamSpawnInterval = null;
    steamGameTimer = null;
    steamIdleTimer = null;

    steamBalloonsPopped = 0;
    steamElapsedSeconds = 0;
    steamSpeedMultiplier = 1;
    steamCurrentEllyState = "full";

    const steamTitle =
        document.querySelector(
            ".angry-steam__title"
        );

    if (steamTitle) {
        steamTitle.textContent =
            "Допоможи мені випустити пару";
    }

    const liveInfo =
        document.querySelector(
            ".angry-steam__live-info"
        );

    if (liveInfo) {
        liveInfo.classList.remove(
            "is-hidden"
        );
    }

    if (angrySteamBalloonsContainer) {
        angrySteamBalloonsContainer.innerHTML =
            "";
    }

    if (angrySteamCounter) {
        angrySteamCounter.textContent =
            "0";
    }

    if (angrySteamTime) {
        angrySteamTime.textContent =
            STEAM_GAME_DURATION;
    }

    if (angrySteamHint) {
        angrySteamHint.classList.remove(
            "is-visible"
        );

        angrySteamHint.textContent = "";
    }

    if (angrySteamEllyFull) {
        angrySteamEllyFull.style.opacity =
            "1";
    }

    if (angrySteamEllySome) {
        angrySteamEllySome.style.opacity =
            "0";
    }

    if (angrySteamEllyCalm) {
        angrySteamEllyCalm.style.opacity =
            "0";
    }

    if (angrySteamEllyBlink) {
        angrySteamEllyBlink.style.opacity =
            "0";
    }

    const summary =
        document.querySelector(
            "[data-steam-summary]"
        );

    if (summary) {
        summary.textContent = "";
        summary.classList.remove(
            "is-visible"
        );

        summary.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    if (angrySteamFinish) {
        angrySteamFinish.classList.remove(
            "is-visible"
        );

        angrySteamFinish.setAttribute(
            "aria-hidden",
            "true"
        );
    }
}


/* =========================================================
   30. «ЛОВИ СПОКІЙ» — ФУНКЦІЇ
   ========================================================= */
/* =========================================================
   30. «ЛОВИ СПОКІЙ» — ФУНКЦІЇ
   ========================================================= */


/* ---------------------------------------------------------
   Тексти заголовків за рівнями
--------------------------------------------------------- */

const CALM_TITLE_DEFAULT =
    "Спіймай світло — просто торкнись його";

const CALM_TITLE_LEVEL_2 =
    "Тепер світлячків більше. Серед них — справжній";

const CALM_TITLE_LEVEL_3 =
    "Складно? Спробуй відчути, який із них справжній";

const CALM_TITLE_FINAL =
    "Як ти зараз?";


/* ---------------------------------------------------------
   Попереднє завантаження картинок Еллі
--------------------------------------------------------- */

function preloadAngryCalmEllyImages() {

    [
        "images/elly/elly_angry_fireflies1.webp",
        "images/elly/elly_angry_fireflies2.webp",
        "images/elly/elly_angry_fireflies3.webp"
    ].forEach((url) => {
        const img = new Image();
        img.src = url;
    });
}

if (angryCalm) {
    preloadAngryCalmEllyImages();
}


/* ---------------------------------------------------------
   Зміна стану Еллі
--------------------------------------------------------- */

function setCalmEllyState(state) {

    if (
        !angryCalmElly1 ||
        !angryCalmElly2 ||
        !angryCalmElly3
    ) {
        return;
    }

    angryCalmElly1.classList.remove("is-visible");
    angryCalmElly2.classList.remove("is-visible");
    angryCalmElly3.classList.remove("is-visible");

    if (state === "angry") {
        angryCalmElly1.classList.add("is-visible");
    }

    if (state === "calmer") {
        angryCalmElly2.classList.add("is-visible");
    }

    if (state === "calm") {
        angryCalmElly3.classList.add("is-visible");
    }
}


/* ---------------------------------------------------------
   Оновлення крапочок прогресу
--------------------------------------------------------- */

function updateCalmProgress() {

    if (!angryCalmProgress) {
        return;
    }

    angryCalmProgress.innerHTML = "";

    for (
        let i = 0;
        i < CALM_LIGHTS_TOTAL;
        i++
    ) {
        const dot =
            document.createElement("span");

        dot.className =
            "angry-calm__progress-dot";

        if (i < calmLightsCaught) {
            dot.classList.add("is-caught");
        }

        angryCalmProgress.appendChild(dot);
    }
}


/* ---------------------------------------------------------
   Зміна тексту заголовка
--------------------------------------------------------- */

function setCalmTitle(text) {

    if (!angryCalmTitle) {
        return;
    }

    angryCalmTitle.style.opacity = "0";

    setTimeout(() => {
        angryCalmTitle.textContent = text;
        angryCalmTitle.style.opacity = "1";
    }, 300);
}


/* ---------------------------------------------------------
   Заголовок за рівнем
--------------------------------------------------------- */

function getCalmTitleByLevel(level) {

    if (level === 1) {
        return CALM_TITLE_DEFAULT;
    }

    if (level === 2) {
        return CALM_TITLE_LEVEL_2;
    }

    return CALM_TITLE_LEVEL_3;
}


/* ---------------------------------------------------------
   Кількість світлячків за рівнем
--------------------------------------------------------- */

function getCalmLightCount(level) {

    /*
        1-й рівень — 1 світлячок
        2-й рівень — 3 світлячки
        3-й рівень — 5 світлячків
    */

    if (level === 1) {
        return 1;
    }

    if (level === 2) {
        return 3;
    }

    return 5;
}


/* ---------------------------------------------------------
   Плавний рух світлячка
--------------------------------------------------------- */

function moveCalmLight(light, stage) {

    if (!angryCalmLightsContainer) {
        return;
    }

    const paths = [

        /* Траєкторія 1 */
        [
            { x: 18, y: 25 },
            { x: 28, y: 32 },
            { x: 40, y: 24 },
            { x: 52, y: 35 },
            { x: 65, y: 27 },
            { x: 76, y: 39 }
        ],

        /* Траєкторія 2 */
        [
            { x: 76, y: 25 },
            { x: 65, y: 36 },
            { x: 53, y: 24 },
            { x: 41, y: 39 },
            { x: 28, y: 30 },
            { x: 18, y: 45 }
        ],

        /* Траєкторія 3 */
        [
            { x: 24, y: 55 },
            { x: 35, y: 45 },
            { x: 48, y: 52 },
            { x: 60, y: 42 },
            { x: 72, y: 52 },
            { x: 62, y: 62 }
        ],

        /* Траєкторія 4 */
        [
            { x: 78, y: 58 },
            { x: 68, y: 48 },
            { x: 55, y: 58 },
            { x: 43, y: 48 },
            { x: 30, y: 60 },
            { x: 20, y: 50 }
        ],

        /* Траєкторія 5 */
        [
            { x: 22, y: 35 },
            { x: 34, y: 50 },
            { x: 48, y: 40 },
            { x: 58, y: 52 },
            { x: 70, y: 42 },
            { x: 52, y: 30 }
        ]
    ];

    const path =
        paths[
            Math.min(
                stage - 1,
                paths.length - 1
            )
        ];

    /*
        Стартовий індекс — випадковий,
        щоб світлячки не збиралися в одній точці.
    */

    let currentIndex = Math.floor(Math.random() * path.length);

    let startTime = null;

    /*
        Швидкість руху залежить від рівня.
        Більше світлячків — повільніше,
        щоб дитина встигала думати,
        а не панікувати.
    */

    let duration = 1900;

    if (calmGamesPlayed === 2) {
        duration = 3000;
    }

    if (calmGamesPlayed >= 3) {
        duration = 4000;
    }

    function animate(timestamp) {

        if (
            !calmGameActive ||
            !light.isConnected
        ) {
            return;
        }

        /*
            Якщо світлячок летить до Еллі —
            зупиняємо рух.
        */

        if (light.classList.contains("is-flying")) {
            return;
        }

        if (startTime === null) {
            startTime = timestamp;
        }

        const elapsed =
            timestamp - startTime;

        const progress =
            Math.min(
                elapsed / duration,
                1
            );

        const current =
            path[currentIndex];

        const next =
            path[
                (currentIndex + 1) %
                path.length
            ];

        const eased =
            progress < 0.5
                ? 2 * progress * progress
                : 1 -
                    Math.pow(
                        -2 * progress + 2,
                        2
                    ) / 2;

        const x =
            current.x +
            (next.x - current.x) *
            eased;

        const y =
            current.y +
            (next.y - current.y) *
            eased;

        light.style.left = `${x}%`;
        light.style.top = `${y}%`;

        if (progress >= 1) {
            currentIndex =
                (currentIndex + 1) %
                path.length;

            startTime = timestamp;
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}


/* ---------------------------------------------------------
   Створення одного світлячка
--------------------------------------------------------- */

function createCalmLight(stage, index) {

    if (!angryCalmLightsContainer) {
        return null;
    }

    const light =
        document.createElement("button");

    light.type = "button";

    light.className =
        "angry-calm__light";

    light.setAttribute(
        "aria-label",
        "Спіймати світло"
    );

    /* Зберігаємо траєкторію та індекс */

    light.dataset.stage = String(stage);
    light.dataset.index = String(index);
    light.dataset.real = "false";

    /* Розмір */

    const size =
        stage === 5
            ? 38
            : 28 + Math.random() * 6;

    light.style.width = `${size}px`;
    light.style.height = `${size}px`;

    angryCalmLightsContainer.appendChild(light);

    light.addEventListener(
        "pointerdown",
        () => catchCalmLight(light),
        { once: true }
    );

    moveCalmLight(light, stage);

    return light;
}


/* ---------------------------------------------------------
   Політ до Еллі
--------------------------------------------------------- */

function flyToElly(light, onComplete) {

    const stage =
        document.querySelector(".angry-calm__stage");

    const elly =
        document.querySelector(".angry-calm__elly");

    if (!stage || !elly) {
        light.remove();
        if (onComplete) onComplete();
        return;
    }

    const stageRect = stage.getBoundingClientRect();

    const ellyRect = elly.getBoundingClientRect();

    const ellyCenterX = ellyRect.left + ellyRect.width / 2;

    const ellyTargetY = ellyRect.top + ellyRect.height * 0.75;

    const targetLeft = ((ellyCenterX - stageRect.left) / stageRect.width) * 100;

    const targetTop = ((ellyTargetY - stageRect.top) / stageRect.height) * 100;

    light.classList.add("is-flying");

    requestAnimationFrame(() => {

        light.style.left = `${targetLeft}%`;
        light.style.top = `${targetTop}%`;

        light.style.transform =
            "translate(-50%, -50%) scale(0.3)";

        light.style.opacity = "0";
    });

    setTimeout(() => {

        light.remove();

        if (onComplete) onComplete();

    }, 900);
}


/* ---------------------------------------------------------
   Ловимо світлячка
--------------------------------------------------------- */

function catchCalmLight(light) {

    if (!calmGameActive) {
        return;
    }

    const isReal =
        light.dataset.real === "true";

    const stage =
        Number(light.dataset.stage) || 1;

    const index =
        Number(light.dataset.index) || 0;

    /*
        Одразу створюємо нового світлячка
        на тому самому місці.
    */

    const respawned =
        createCalmLight(stage, index);

    /* Позначаємо всіх декоративними */

    if (angryCalmLightsContainer) {
        angryCalmLightsContainer
            .querySelectorAll(".angry-calm__light")
            .forEach((item) => {
                item.dataset.real = "false";
            });
    }

    /*
        Якщо це був справжній —
        призначаємо нового справжнього
        серед усіх, крім того, що летить.
    */

    if (isReal) {

        light.style.pointerEvents = "none";

        flyToElly(light, () => {

            calmLightsCaught++;

            updateCalmProgress();

            /* Змінюємо заголовок по ходу */

            if (calmLightsCaught === 1) {
                setCalmTitle("Гарно! Ще трохи");
            }

            if (calmLightsCaught === 2) {
                setCalmTitle("Спокій поруч. Лови далі");
            }

            if (calmLightsCaught === 3) {
                setCalmTitle("Ти добре тримаєш увагу");
            }

            if (calmLightsCaught === 4) {
                setCalmTitle("Ще зовсім трохи");
            }

            if (calmLightsCaught === 5) {
                setCalmTitle("Останній!");
            }

            /* Стан Еллі */

            if (calmLightsCaught <= 1) {
                setCalmEllyState("angry");
            } else if (calmLightsCaught <= 3) {
                setCalmEllyState("calmer");
            } else {
                setCalmEllyState("calm");
            }

            if (
                calmLightsCaught >=
                CALM_LIGHTS_TOTAL
            ) {
                finishAngryCalm();
                return;
            }

            assignRealCalmLight();
        });

    } else {

        light.style.pointerEvents = "none";
        light.classList.add("is-fading");

        setTimeout(() => {
            light.remove();
        }, 320);

        assignRealCalmLight();
    }
}


/* ---------------------------------------------------------
   Призначення нового справжнього світлячка
--------------------------------------------------------- */

function assignRealCalmLight() {

    if (!angryCalmLightsContainer) {
        return;
    }

    /*
        Вибираємо серед світлячків,
        які ще не летять і не згасають.
    */

    const allLights =
        angryCalmLightsContainer.querySelectorAll(
            ".angry-calm__light:not(.is-flying):not(.is-fading)"
        );

    if (allLights.length === 0) {
        return;
    }

    const realIndex =
        Math.floor(
            Math.random() *
            allLights.length
        );

    allLights[realIndex].dataset.real = "true";
}


/* ---------------------------------------------------------
   Ініціалізація світлячків
--------------------------------------------------------- */

function initCalmLights(level) {

    if (!angryCalmLightsContainer) {
        return;
    }

    angryCalmLightsContainer.innerHTML = "";

    const count =
        getCalmLightCount(level);

    for (let i = 0; i < count; i++) {
        createCalmLight(i + 1, i);
    }

    assignRealCalmLight();
}


/* ---------------------------------------------------------
   Запуск гри
--------------------------------------------------------- */

function startAngryCalm() {

    if (!angryCalm) {
        return;
    }

    if (document.activeElement) {
        document.activeElement.blur();
    }

    /* Збільшуємо лічильник запусків */

    calmGamesPlayed++;

    const level =
        Math.min(calmGamesPlayed, 3);

    resetAngryCalm();

    angry.classList.remove("is-active");
    angry.setAttribute("aria-hidden", "true");

    angryCalm.classList.add("is-active");
    angryCalm.setAttribute("aria-hidden", "false");

    calmGameActive = true;

    showActivityBack(
        angryCalm.querySelector(".angry-calm__content")
    );

    setCalmTitle(
        getCalmTitleByLevel(level)
    );

    setCalmEllyState("angry");
    updateCalmProgress();

    initCalmLights(level);
}


/* ---------------------------------------------------------
   Завершення гри
--------------------------------------------------------- */

function finishAngryCalm() {

    calmGameActive = false;

    setCalmTitle(CALM_TITLE_FINAL);

    angryCalm.classList.add("is-final");

     hideActivityBack();

    setTimeout(() => {

        if (angryCalmFinish) {

            angryCalmFinish.setAttribute(
                "aria-hidden",
                "false"
            );

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    angryCalmFinish.classList.add(
                        "is-visible"
                    );
                });
            });
        }

    }, 500);
}


/* ---------------------------------------------------------
   Повне скидання гри
--------------------------------------------------------- */

function resetAngryCalm() {

    calmGameActive = false;
    calmLightsCaught = 0;

    if (angryCalmLightsContainer) {
        angryCalmLightsContainer.innerHTML = "";
    }

    if (angryCalmFinish) {

        angryCalmFinish.classList.remove("is-visible");

        angryCalmFinish.setAttribute(
            "aria-hidden",
            "true"
        );
    }

    if (angryCalm) {
        angryCalm.classList.remove("is-final");
    }

    updateCalmProgress();
    setCalmEllyState("angry");
}


/* =========================================================
   31. КНОПКИ ФІНАЛУ ІГОР
   ========================================================= */


/* ── Розплутай нитки ── */

document
    .querySelectorAll(
        ".angry-game__choice"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const choice =
                    button.dataset.angryChoice;

                if (choice === "calm") {

                    stopEllyBlinkingGame();

                    angryGame.classList.remove(
                        "is-active"
                    );

                    angryGame.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    showAngryFinal(
                        "calm"
                    );

                    return;
                }

                if (
                    choice === "still-angry"
                ) {

                    stopEllyBlinkingGame();

                    angryGame.classList.remove(
                        "is-active"
                    );

                    angryGame.setAttribute(
                        "aria-hidden",
                        "true"
                    );

                    angryReturnsCount++;

                    if (
                        angryReturnsCount >= 3
                    ) {
                        showAngryFinal(
                            "still-angry"
                        );

                        return;
                    }

                    angry.classList.add(
                        "is-active"
                    );

                    angry.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    setAngryPhrase();

                    const angryGames =
                        angry.querySelector(
                            ".angry__games"
                        );

                    if (angryGames) {
                        angryGames.style.display =
                            "";
                    }

                    hideActivityBack();

                    showActivityBack(
                        angry.querySelector(
                            ".angry__content"
                        )
                    );
                }
            }
        );
    });


/* ── Випусти пару ── */

document.querySelectorAll(".angry-steam__choice")
    .forEach((button) => {

        button.addEventListener("click", () => {

                const choice = button.dataset.angryChoice;

                if (choice === "calm") {

                    resetAngrySteam();

                    angrySteam.classList.remove("is-active");

                    angrySteam.setAttribute("aria-hidden", "true" );

                    showAngryFinal("calm");

                    return;
                }

                if (choice === "still-angry") {

                    resetAngrySteam();

                    angrySteam.classList.remove("is-active");

                    angrySteam.setAttribute("aria-hidden", "true");

                    angryReturnsCount++;

                    if (angryReturnsCount >= 3) {
                        showAngryFinal("still-angry");
                        return;
                    }

                    angry.classList.add("is-active");

                    angry.setAttribute("aria-hidden", "false");

                    setAngryPhrase();

                    const angryGames = angry.querySelector(".angry__games");

                    if (angryGames) {
                        angryGames.style.display = "";
                    }

                    hideActivityBack();

                    showActivityBack(angry.querySelector(".angry__content"));
                }
            }
        );
    });

    /* ── Лови спокій ── */

document.querySelectorAll(".angry-calm__choice").forEach((button) => {

        button.addEventListener("click", () => {

            const choice = button.dataset.calmChoice;

            /* ─── «Мені вже спокійніше» ─── */

            if (choice === "calm") {

                resetAngryCalm();

                angryCalm.classList.remove("is-active");
                angryCalm.setAttribute("aria-hidden", "true");

                showAngryFinal("calm");

                return;
            }

            /* ─── «Я все ще злюся» ─── */

            if (choice === "angry") {

                resetAngryCalm();

                angryCalm.classList.remove("is-active");
                angryCalm.setAttribute("aria-hidden", "true");

                angryReturnsCount++;

                if (angryReturnsCount >= 3) {

                    showAngryFinal("still-angry");

                    return;
                }

                angry.classList.add("is-active");
                angry.setAttribute("aria-hidden", "false");

                setAngryPhrase();

                const angryGames =
                    angry.querySelector(".angry__games");

                if (angryGames) {
                    angryGames.style.display = "";
                }

                hideActivityBack();
                showActivityBack(angry.querySelector(".angry__content"));
            }
        });
    });



/* =========================================================
   32. ЗАПУСК ІГОР ЗА КЛІКОМ НА КАРТКУ
   ========================================================= */

document
    .querySelectorAll(
        ".angry__game"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const game =
                    button.dataset.angryGame;

                if (
                    game === "cloud"
                ) {
                    startAngryGame();
                }

                if (
                    game === "steam"
                ) {
                    startAngrySteam();
                }

                if (
                    game === "calm"
                ) {
                    startAngryCalm();
                }
            }
        );
    });


/* =========================================================
   33. ІНІЦІАЛІЗАЦІЯ
   ========================================================= */

initSadEmotionButtons();
initGroundingChoices();
initSadControls();