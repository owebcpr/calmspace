const stateCards = document.querySelectorAll(".state-card");

const welcome = document.querySelector(".welcome");
const buttonBack = document.querySelectorAll(".button__back");
const activityBack = document.querySelector("[data-activity-back]");
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
const groundingCalm = document.querySelector(".grounding__choice");
const groundingScene = document.querySelector(".grounding__scene");
const groundingSceneTargets = document.querySelectorAll(".grounding__scene-target");
const groundingSceneImage = document.querySelector(".grounding__scene-image");
const groundingWorryAgain = document.querySelector(".grounding__choice:nth-child(2)");
const sad = document.querySelector(".sad");
const sadTitle = document.querySelector(".sad__title");
const sadModal = document.querySelector('[data-modal="sad-emotions"]');
const sadEmotionButtons = document.querySelectorAll(".button_sad-emotion");
const buttonSadCustom = document.querySelector(".button_sad-custom");
const sadEmotionView = document.querySelector(".sad__emotion-view");
const sadCustomView = document.querySelector(".sad__custom-view");
const sadClearButton = document.querySelector(".button_sad-clear");
const sadSendButton = document.querySelector(".button_sad-send");
const sadLetter = document.querySelector(".sad__letter");

let ellyImg = null;
let groundingUsedTasks = [];
let groundingStep = 0;
let currentScene = "scene1";

let currentSceneTask = null;
let sceneTaskIndex = 0;
let sceneUsedTasks = [];
let sceneWrongAttempts = 0;
let sceneCount = 0;
let availableScenes = [];

const groundingTasks = [
    {
        text: "Подивись навколо. Бачиш щось синє?",
        icon: "grounding-blue.webp"
    },
    {
        text: "Добре. А тепер спробуй помітити щось м'яке",
        icon: "grounding-toy.webp"
    },
    {
        text: "Не поспішай. Чи є поруч щось кругленьке?",
        icon: "grounding-ball.webp"
    },
    {
        text: "А тепер просто подивись навколо. Що тут є зеленого?",
        icon: "grounding-plant.webp"
    },
    {
        text: "Цікаво, а чи помітиш щось жовте?",
        icon: "grounding-yellow.webp"
    },
    {
        text: "Тепер зверни увагу на щось маленьке",
        icon: "grounding-small.webp"
    },
    {
        text: "Подивись уважніше. Чи є поруч щось дерев'яне?",
        icon: "grounding-pencil.webp"
    },
    {
        text: "А тепер спробуй знайти щось, що тобі подобається",
        icon: "grounding-favorite.webp"
    },
    {
        text: "Знайди, будь ласка, щось мокре або рідину",
        icon: "grounding-water.webp"
    },
    {
        text: "Пошукай навколо місце, де можна присісти",
        icon: "grounding-seat.webp"
    }
];

const sceneTasks = {
    scene1: {
        favoriteItem: "teddy",

        tasks: [
            {
                text: "Цікаво, чи є тут щось синеньке?",
                retryText: "О, цікава знахідка 😊 А синє ще десь заховалося. Спробуємо?",
                correctItems: ["cup"]
            },

            {
                text: "А де тут сховалося щось зелене?",
                retryText: "Ммм, не воно 😊 Подивись уважніше. Зелене тут точно є",
                correctItems: ["plant"]
            },

            {
                text: "Ой, а мені цікаво — чи знайдеш тут щось жовте?",
                retryText: "Цікаво! Але я зараз шукаю саме щось жовтеньке. Давай ще раз",
                correctItems: ["book"]
            },

            {
                text: "А як думаєш, де тут можна знайти щось м'яке?",
                retryText: "Ого! Але я шукаю щось, до чого хочеться доторкнутися",
                correctItems: ["pillow", "teddy"]
            },

            {
                text: "Скільки тут всього цікавого... А бачиш щось кругленьке?",
                retryText: "Може, з іншого боку воно й кругленьке 😊 Давай пошукаємо ще",
                correctItems: ["clock", "ball"]
            },

            {
                text: "Давай знайдемо щось червоне",
                retryText: "Майже 😊 Спробуй пошукати щось червоне і смачне",
                correctItems: ["strawberry"]
            },

            {
                text: "А що тобі тут найбільше подобається?",
                retryText: "",
                correctItems: "favorite"
            }
        ]
    },

    scene2: {
        favoriteItem: "cloud",

        tasks: [
            {
                text: "Цікаво, чи є тут хтось, хто вміє співати?",
                retryText: "О, цікава знахідка 😊 Але цього разу я шукаю когось, хто може співати. Спробуємо ще?",
                correctItems: ["bird"]
            },

            {
                text: "А чи помітиш тут щось, від чого стає тепліше?",
                retryText: "Ммм, не воно 😊 Подивись уважніше. Десь тут є те, що може зігріти",
                correctItems: ["sun"]
            },

            {
                text: "Чи є тут щось біле й пухнасте?",
                retryText: "Майже 😊 Десь тут є щось біле й пухнасте. Давай пошукаємо ще",
                correctItems: ["cloud"]
            },

            {
                text: "А де тут можна трохи присісти й відпочити?",
                retryText: "О, тут справді багато цікавого 😊 Але місце для відпочинку ще десь тут",
                correctItems: ["bench"]
            },

            {
                text: "Цікаво, що тут може покотитися?",
                retryText: "Ого 😊 А тепер спробуй подумати, що тут може покотитися",
                correctItems: ["bike"]
            },

            {
                text: "А чи бачиш тут щось із яскравими крильцями?",
                retryText: "Гарна спроба 😊 Але я зараз думаю про щось із яскравими крильцями",
                correctItems: ["butterfly"]
            },

            {
                text: "Як думаєш, що тут можна зустріти під час прогулянки в лісі?",
                retryText: "Цікаво 😊 Але я загадала дещо, що можна зустріти в лісі. Подивись ще",
                correctItems: ["mushroom"]
            },

            {
                text: "Чи помітиш тут маленькі пелюстки на стеблинці?",
                retryText: "Не зовсім 😊 Подивись уважніше. Тут є щось із пелюстками",
                correctItems: ["flowers"]
            },

            {
                text: "А що тобі тут найбільше подобається?",
                retryText: "",
                correctItems: "favorite"
            }
        ]
    },
    scene3: {
        favoriteItem: "teacher-pencils",

        tasks: [
            {
                text: "Чи є тут те, на чому пишуть крейдою?",
                retryText: "Майже 😊 Подивись уважніше на те, що написано на стіні",
                correctItems: ["board"]
            },

            {
                text: "А спробуй знайти нашу планету (ну майже планету)?",
                retryText: "Не зовсім 😊 Подивись уважніше на стіл у вікна",
                correctItems: ["globe"]
            },

            {
                text: "Чи бачиш тут щось зелене, що росте в горщику?",
                retryText: "Ммм, не воно 😊 Пошукай щось зелене в горщику",
                correctItems: ["classroom-plant"]
            },

            {
                text: "Не може бути! Подивись де вчитель тримає олівці?",
                retryText: "Гарна спроба 😊 Подивись на стіл учителя, бачиш чашку?",
                correctItems: ["teacher-pencils"]
            },

            {
                text: "Цікаво, де тут лежить стопка зошитів на перевірку?",
                retryText: "Майже 😊 Подивись уважніше на стіл учителя",
                correctItems: ["notebooks"]
            },

            {
                text: "А чи бачиш тут відкритий зошит учня?",
                retryText: "Не зовсім 😊 Подивись уважніше на парту",
                correctItems: ["open-notebook"]
            },

            {
                text: "Як гадаеш, де учень тримає свої підручники?",
                retryText: "Ммм 😊 Подивись уважніше внизу",
                correctItems: ["backpack"]
            },

            {
                text: "Через що зіваки дівляться на вулицю?",
                retryText: "Майже 😊 Спробуй ще",
                correctItems: ["window"]
            },

            {
                text: "Чи помітиш тут портрет, який намалювала дівчинка?",
                retryText: "Подивись уважніше на стіну 😊 Там є один особливий малюнок",
                correctItems: ["drawings"]
            },

            {
                text: "А що тобі тут найбільше подобається?",
                retryText: "",
                correctItems: "favorite"
            }
        ]
    },

    scene4: {
        favoriteItem: "teddy-room",

        tasks: [
            {
                text: "Спробуєш знайди тут щось, що може літати?",
                retryText: "Майже 😊 Подивись уважніше на стіну",
                correctItems: ["airplane"]
            },

            {
                text: "Чи є тут щось, що намалювала дитина?",
                retryText: "Не зовсім 😊 Подивись уважніше на стіну",
                correctItems: ["room-drawings", "room-drawings1"]
            },

            {
                text: "А де тут можна зручно відпочити?",
                retryText: "Ммм 😊 Спробуй пошукати місце, де можна прилягти",
                correctItems: ["bed"]
            },

            {
                text: "Чи бачиш тут щось, що може світити?",
                retryText: "Майже 😊 Подивись уважніше біля ліжка",
                correctItems: ["bed-lamp"]
            },

            {
                text: "Знайди тут щось, що можна читати",
                retryText: "Не зовсім 😊 Подивись уважніше на полицю",
                correctItems: ["shelf-books"]
            },

            {
                text: "Чи є тут щось, що зберігає важливий спогад?",
                retryText: "Майже 😊 Подивись уважніше на стіну",
                correctItems: ["photo"]
            },

            {
                text: "А чи помітиш тут щось м'яке з синім бантиком?",
                retryText: "Ммм 😊 Воно десь зовсім поруч. Подивись уважніше",
                correctItems: ["teddy-room"]
            },

            {
                text: "Що дає нам можливість дивитися на зорі?",
                retryText: "Майже 😊 але на зорі подивись, десь там мене побачиш!",
                correctItems: ["room-window"]
            },

            {
                text: "Що можна побачити в нічному небі окрім зірок?",
                retryText: "Подивись уважніше у вікно 😊",
                correctItems: ["moon"]
            },

            {
                text: "А де тут можна знайти щось, що показує, як виглядає наша планета?",
                retryText: "Майже 😊 Подивись уважніше в кімнаті",
                correctItems: ["room-globe"]
            },

            {
                text: "Цікаво, де тут можна знайти щось, що носять до школи?",
                retryText: "Не зовсім 😊 Подивись уважніше внизу",
                correctItems: ["room-backpack"]
            },

            {
                text: "А чи помітиш тут маленьку тваринку з великими вухами?",
                retryText: "Майже 😊 Подивись уважніше, в нього є довгий ніс",
                correctItems: ["elephant"]
            },

            {
                text: "А що тобі тут найбільше подобається?",
                retryText: "",
                correctItems: "favorite"
            }
        ]
    }
};


sadEmotionButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const emotion = button.textContent.trim();

        console.log("Обрана емоція:", emotion);

        sadModal.setAttribute("aria-hidden", "true");

        showSadLetterReceived(emotion);

    });

});

function getRandomGroundingTask() {
    const availableTasks = groundingTasks.filter(
        (task) => !groundingUsedTasks.includes(task)
    );

    if (availableTasks.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * availableTasks.length
    );

    const task = availableTasks[randomIndex];

    groundingUsedTasks.push(task);

    return task;
}

function getRandomSceneTask() {
    const scene = sceneTasks[currentScene];

    if (!scene) {
        return null;
    }

    // Останнє завдання — фаворит
    if (sceneTaskIndex === 3) {
        return scene.tasks.find(
            (task) => task.correctItems === "favorite"
        );
    }

    const availableTasks = scene.tasks.filter(
        (task) =>
            task.correctItems !== "favorite" &&
            !sceneUsedTasks.includes(task)
    );

    if (availableTasks.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(
        Math.random() * availableTasks.length
    );

    const task = availableTasks[randomIndex];

    sceneUsedTasks.push(task);

    return task;
}

function getRandomScenes() {
    const scenes = ["scene1", "scene2", "scene3", "scene4"];

    // Перемішуємо масив
    scenes.sort(() => Math.random() - 0.5);

    // Беремо тільки дві різні сцени
    return scenes.slice(0, 2);
}

function showSceneTask(task) {
    if (!task) {
        return;
    }

    currentSceneTask = task;
    sceneWrongAttempts = 0;

    groundingInstruction.classList.remove("is-empty");

    groundingSceneTargets.forEach((target) => {
        target.classList.remove("is-hint");

        // Під час завдання "улюблений предмет"
        // можна знову натискати вже знайдені предмети
        if (task.correctItems === "favorite") {
            target.style.pointerEvents = "auto";
        }
    });

    groundingInstruction.textContent = task.text;
}

function showGroundingTask(task) {
    if (!task) {
        return;
    }
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
        target.classList.remove("is-found", "is-hint", "is-favorite");
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

function showNextGroundingScene(sceneName) {
    groundingTitle.textContent =
        "Пропоную пошукати предмети тут";

    showGroundingScene(sceneName);
}

function showSadEmotionModal() {

    setTimeout(() => {

        const ellyImage = document.querySelector(".sad__elly-image");

        // Еллі починає плавно зникати
        ellyImage.style.opacity = "0";

        // Ховаємо заголовок основного екрана
        sadTitle.style.opacity = "0";

        // Після початку зникнення відкриваємо модальне вікно
        setTimeout(() => {
            sadModal.setAttribute("aria-hidden", "false");
        }, 300);

    }, 3000);
}

function changeSadEllyImage(image, callback) {

    const ellyImage = document.querySelector(".sad__elly-image");

    ellyImage.style.opacity = "0";

    setTimeout(() => {

        ellyImage.src = image;

        requestAnimationFrame(() => {
            ellyImage.style.opacity = "1";
        });

        if (callback) {
            callback();
        }

    }, 500);
}

function blinkElly(selector, openImage, closedImage) {

    const ellyImage = document.querySelector(selector);

    if (!ellyImage) {
        return;
    }

    ellyImage.src = closedImage;

    setTimeout(() => {

        ellyImage.src = openImage;

    }, 180);
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

    setTimeout(() => {

        currentImage.src = imageSrc;

        currentImage.style.opacity = "1";
        nextImage.style.opacity = "0";

        if (callback) {
            callback();
        }

    }, 400);
}

function startEllyBlinking(
    selector,
    openImage,
    closedImage,
    delays
) {

    delays.forEach((delay) => {

        setTimeout(() => {

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


    return emotionPhrases[emotion] ||
        "Сподіваюсь, тобі вже не так сумно";
}

function initSadCanvas() {

    const canvas = document.querySelector(".sad__canvas");

    if (!canvas || canvas.dataset.initialized === "true") {
        return;
    }

    canvas.dataset.initialized = "true";

    const context = canvas.getContext("2d");

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

        if (!isDrawing) {
            return;
        }

        const position = getPosition(event);

        context.lineTo(
            position.x,
            position.y
        );

        context.stroke();
    }

    function stopDrawing(event) {

        if (!isDrawing) {
            return;
        }

        isDrawing = false;

        context.closePath();

        if (event.pointerId !== undefined) {
            canvas.releasePointerCapture(event.pointerId);
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
    sadClearButton.addEventListener("click", () => {

        const rect = canvas.getBoundingClientRect();

        context.clearRect(
            0,
            0,
            rect.width,
            rect.height
        );

    });
}

function showSadLetterReceived(emotion) {

    console.log("Еллі отримала листа:", emotion);

    const ellyImage = document.querySelector(".sad__elly-image");
    
    // Еллі вже зникла під час показу модального вікна

    // Запускаємо лист
    sadLetter.style.display = "";
    sadLetter.classList.remove("is-flying");
    sadLetter.setAttribute("aria-hidden", "false");

    requestAnimationFrame(() => {
        sadLetter.classList.add("is-flying");
    });

    // Лист летить 2500 мс
    setTimeout(() => {

        sadLetter.setAttribute("aria-hidden", "true");
        sadLetter.classList.remove("is-flying");
        sadLetter.style.display = "none";

        // З'являється Еллі з листом
        ellyImage.src = "images/elly/elly_cuddles1.webp";

        sadTitle.style.opacity = "1";
        sadTitle.textContent =
            "Я почула тебе. Дякую за твоє повідомлення 💌";

        requestAnimationFrame(() => {
            ellyImage.style.opacity = "1";
        });

        // Далі — перехід до обіймів
        setTimeout(() => {

            // Плавно переходимо до cuddles2
            changeSadEllyImage(
                "images/elly/elly_cuddles2.webp",
                () => {

                    sadTitle.textContent =
                        "А тепер хочеш маленькі обійми?";

                }
            );

            // Даємо трохи побути із закритими очима
            setTimeout(() => {

                const ellyImage = document.querySelector(".sad__elly-image");

                // Відкриваємо очі
                ellyImage.src = "images/elly/elly_cuddles3.webp";

                sadTitle.textContent =
                    "Обійми себе за плечі. Можеш трохи притиснути руки. І просто побудь так кілька секунд.";

                // Через паузу — починаємо природне моргання
                startEllyBlinking(
                    ".sad__elly-image",
                    "images/elly/elly_cuddles3.webp",
                    "images/elly/elly_cuddles2.webp",
                    [2000, 3700, 5900, 8000, 10000]
                );

                // Після завершення обіймів показуємо фразу
                setTimeout(() => {

                    sadTitle.textContent =
                        getSadEmotionPhrase(emotion);

                    // Еллі ще трохи моргає, поки дитина читає фразу
                    startEllyBlinking(
                        ".sad__elly-image",
                        "images/elly/elly_cuddles3.webp",
                        "images/elly/elly_cuddles2.webp",
                        [1800, 4000, 6500]
                    );

                    setTimeout(() => {

                       changeSadEllyScene(
                            "images/elly/elly_sadly3.webp",
                            () => {

                                // Еллі моргає в останньому кадрі
                                startEllyBlinking(
                                    ".sad__elly-image--current",
                                    "images/elly/elly_sadly3.webp",
                                    "images/elly/elly_sadly3-1.webp",
                                    [1800, 4000, 6500, 10000, 12000, 15000]
                                );

                                setTimeout(() => {
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

function showSadActivityOptions() {

    const sadAction = document.querySelector(".sad__action");
    const sadElly = document.querySelector(".sad__elly");

    sadAction.append(activityOptions);

    requestAnimationFrame(() => {
        sadElly.classList.add("is-raised");
    });

    activityOptions.classList.remove("is-visible");
    activityBack.classList.remove("is-visible");

   requestAnimationFrame(() => {
        requestAnimationFrame(() => {

            activityOptions.classList.add("is-visible");

            console.log("КНОПКА:", activityBack);
            console.log("КЛАСИ КНОПКИ:", activityBack.className);

            activityBack.classList.add("is-visible");

            console.log("КЛАСИ ПІСЛЯ:", activityBack.className);
        });
    });
}

function showActivityOptions() {
    activityOptions.classList.remove("is-visible");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            activityOptions.classList.add("is-visible");
            activityBack.classList.add("is-visible");
        });
    });
}

function moveActivityOptions(container) {
    const backButton = container.querySelector(".button__back");

    if (backButton) {
        backButton.before(activityOptions);
    } else {
        container.append(activityOptions);
    }
}


stateCards.forEach((card) => {
    card.addEventListener("click", () => {

        // Снимаємо попередній вибір
        stateCards.forEach((item) => {
            item.classList.remove("is-selected");
        });

        card.classList.add("is-selected");

        // Визначаємо вибраний стан
        const state = card.dataset.state;

        // Ховаємо початковий екран
        welcome.style.display = "none";

        // ----------------------------------------
        // Спочатку повністю скидаємо екрани
        // ----------------------------------------

        breathing.classList.remove("is-active");
        breathing.setAttribute("aria-hidden", "true");

        grounding.classList.remove("is-active");
        grounding.setAttribute("aria-hidden", "true");

        sad.classList.remove("is-active");
        sad.setAttribute("aria-hidden", "true");

        activityOptions.classList.remove("is-visible");
        activityBack.classList.remove("is-visible");


        // ----------------------------------------
        // "Я хвилююся" → заземлення
        // ----------------------------------------

        moveActivityOptions(
            state === "worry" ? groundingContent : breathing
        );
        if (state === "worry") {
            sceneCount = 0;
            availableScenes = getRandomScenes();
            groundingActions.classList.remove("is-hidden");
            groundingStep = 0;
            groundingUsedTasks = [];

            groundingTitle.textContent = "Давай на хвилинку озирнемося навколо";

            showGroundingTask(getRandomGroundingTask());

            groundingInstruction.style.display = "";
            groundingIcon.style.display = "";
            groundingSuccess.style.display = "";
            groundingHelp.style.display = "";

            groundingCheck.classList.remove("is-visible");
            groundingCheck.setAttribute("aria-hidden", "true");

            groundingScene.classList.remove("is-visible");
            groundingScene.setAttribute("aria-hidden", "true");

            groundingSceneTargets.forEach((target) => {
                target.classList.remove("is-found");
            });

            grounding.classList.add("is-active");
            grounding.setAttribute("aria-hidden", "false");

            return;
        }

        // ----------------------------------------
        // "Мені сумно" → підтримка Еллі
        // ----------------------------------------

        if (state === "sad") {

            sad.classList.add("is-active");
            sad.setAttribute("aria-hidden", "false");

            showSadEmotionModal();

            return;
        }

        // ----------------------------------------
        // Усі інші стани → дихальна вправа
        // ----------------------------------------

        breathing.classList.add("is-active");
        breathing.setAttribute("aria-hidden", "false");

        // Після одного повного циклу
        // показуємо вибір активності
        setTimeout(() => {
            showActivityOptions();
        }, 8000);

    });
});


document.addEventListener("click", (event) => {

    const backButton = event.target.closest(".button__back");

    if (!backButton) {
        return;
    }

    backButton.blur();

    setTimeout(() => {

        if (ellyImg) {
            ellyImg.remove(); // Повністю видаляємо з DOM
        }

        grounding.classList.remove("is-active");
        grounding.setAttribute("aria-hidden", "true");

        breathing.classList.remove("is-active");
        breathing.setAttribute("aria-hidden", "true");

        sad.classList.remove("is-active");
        sad.setAttribute("aria-hidden", "true");

        // Починаємо новий маршрут наступного разу
        sceneCount = 0;
        availableScenes = [];
        currentScene = "scene1";
        sceneTaskIndex = 0;
        sceneUsedTasks = [];
        sceneWrongAttempts = 0;

        activityOptions.classList.remove("is-visible");
        activityBack.classList.remove("is-visible");

        welcome.style.display = "";

    }, 0);
});

groundingSuccess.addEventListener("click", () => {
    groundingStep++;

    if (groundingStep < 4) {
        const nextTask = getRandomGroundingTask();

        showGroundingTask(nextTask);
        return;
    }

    groundingTitle.textContent = "Як ти зараз себе почуваєш?";

    groundingInstruction.style.display = "none";
    groundingSuccess.style.display = "none";
    groundingHelp.style.display = "none";
    groundingIcon.style.display = "none";

    groundingCheck.classList.add("is-visible");
    groundingCheck.setAttribute("aria-hidden", "false");
});

groundingCalm.addEventListener("click", () => {

    groundingCheck.classList.remove("is-visible");
    groundingCheck.setAttribute("aria-hidden", "true");

    groundingTitle.textContent =
        "Добре. Я поруч";

    ellyImg = document.createElement("img");
        ellyImg.id = "grounding-elly-js";
        ellyImg.src = "images/elly/elly_lag.webp";
        ellyImg.alt = "Еллі";
        ellyImg.className = "grounding__elly";
        
    // Вставляємо після заголовка (перед інструкцією)
    groundingTitle.insertAdjacentElement("afterend", ellyImg);
    startEllyBlinking(
        "#grounding-elly-js",
        "images/elly/elly_lag.webp",
        "images/elly/elly_lag1.webp",
        [2000, 5000, 8000, 12000, 15400, 17500, 20500]
    );

    groundingInstruction.textContent = "";
    groundingInstruction.classList.add("is-empty");
    setTimeout(() => {

        moveActivityOptions(groundingContent);
        showActivityOptions();

    }, 1800);
});

groundingHelp.addEventListener("click", () => {

    groundingCheck.classList.remove("is-visible");
    groundingCheck.setAttribute("aria-hidden", "true");

    sceneCount++;

    // Перша або друга сцена
    if (sceneCount <= 2) {

        groundingTitle.textContent =
            "Пропоную пошукати предмети тут";

        showGroundingScene(availableScenes[sceneCount - 1]);

        return;
    }

    // Після двох сцен — меню
    groundingInstruction.textContent = "";
    groundingInstruction.classList.add("is-empty");

    groundingTitle.textContent =
        "Тоді просто побудемо тут. Тобі не потрібно поспішати";

    setTimeout(() => {

        groundingTitle.textContent =
            "Що тобі зараз хочеться?";

        moveActivityOptions(groundingContent);
        showActivityOptions();

    }, 3500);
});

groundingSceneTargets.forEach((target) => {
    target.addEventListener("click", () => {

        const selectedItem = target.dataset.sceneItem;

        // ----------------------------------------
        // ОСТАННЄ ЗАВДАННЯ — УЛЮБЛЕНИЙ ПРЕДМЕТ
        // ----------------------------------------

        if (currentSceneTask.correctItems === "favorite") {

            const wasFound = target.classList.contains("is-found");

            const favoriteItem =
                sceneTasks[currentScene].favoriteItem;

            // Дозволяємо вибирати навіть предмет,
            // який уже знаходили раніше
            target.style.pointerEvents = "auto";

            target.classList.add("is-found");
            target.classList.add("is-favorite");

            // Предмет уже знаходили раніше
            if (wasFound) {

                groundingInstruction.textContent =
                    "О, ти знову вибрав його 😊 Мабуть, він тобі справді сподобався";

            }

            // Дитина вибрала саме фаворита Еллі
            else if (selectedItem === favoriteItem) {

                if (favoriteItem === "teddy") {

                    groundingInstruction.textContent =
                        "О! Тобі теж подобається ведмедик? Супер! 🧸";

                } else if (favoriteItem === "cloud") {

                    groundingInstruction.textContent =
                        "О! Тобі подобається хмарка? Супер! ☁️";

                } else if (favoriteItem === "teacher-pencils") {

                    groundingInstruction.textContent =
                        "О, я би теж їх вибрала! Малювати — це моє хоббі!";

                } else if (favoriteItem === "teddy-room") {

                    groundingInstruction.textContent =
                        "О, ти теж обрав ведмедика! Здається, він тут справжній господар цієї кімнати 🧸";

                }

            }

            // Дитина вибрала інший предмет
            else {

                if (favoriteItem === "teddy") {

                    groundingInstruction.textContent =
                        "Гарний вибір! 😊 А мені подобається ведмедик 🧸";

                } else if (favoriteItem === "cloud") {

                    groundingInstruction.textContent =
                        "Здорово! 😊 А мені подобається хмарка. Бо я сама — хмарка ☁️";

                } else if (favoriteItem === "teacher-pencils") {

                    groundingInstruction.textContent =
                        "Чудовий вибір! А я вибрала олівці. Обожнюю малювати!";

                } else if (favoriteItem === "teddy-room") {

                    groundingInstruction.textContent =
                        "Чудовий вибір! А я найбільше люблю ведмедика. Він такий затишний 🧸";

                }
            }

            finishGroundingScene();

            return;
        }

        // ----------------------------------------
        // ЗВИЧАЙНІ ЗАВДАННЯ
        // ----------------------------------------

        const isCorrect =
            currentSceneTask.correctItems.includes(selectedItem);

        // Неправильний предмет
        if (!isCorrect) {

            sceneWrongAttempts++;

            target.blur();

            groundingSceneTargets.forEach((item) => {
                item.classList.remove("is-hint");
            });

            if (sceneWrongAttempts >= 2) {

                groundingInstruction.textContent =
                    "Спробуй ось сюди 😊";

                const correctTarget = Array.from(groundingSceneTargets).find((item) =>
                    currentSceneTask.correctItems.includes(
                        item.dataset.sceneItem
                    )
                );

                if (correctTarget) {
                    correctTarget.classList.add("is-hint");
                }

                return;
            }

            groundingInstruction.textContent =
                currentSceneTask.retryText;

            return;
        }

        // Правильний предмет
        target.classList.remove("is-hint");
        target.classList.add("is-found");

        sceneTaskIndex++;

        setTimeout(() => {

            // Ще не виконано три звичайні завдання
            if (sceneTaskIndex < 3) {

                showSceneTask(getRandomSceneTask());

                return;
            }

            // Три звичайні завдання виконані —
            // наступним буде favorite
            if (sceneTaskIndex === 3) {

                showSceneTask(getRandomSceneTask());

                return;
            }

        }, 1200);
    });
});

groundingWorryAgain.addEventListener("click", () => {

    groundingCheck.classList.remove("is-visible");
    groundingCheck.setAttribute("aria-hidden", "true");

    sceneCount++;

    // Якщо ще залишилася невикористана сцена
    if (sceneCount <= 2) {

        groundingTitle.textContent =
            "Нічого страшного. Побудемо тут ще трохи";

        groundingInstruction.textContent = "";
        groundingInstruction.classList.add("is-empty");

        setTimeout(() => {

            groundingTitle.textContent =
                "Пропоную пошукати предмети тут";

            showGroundingScene(
                availableScenes[sceneCount - 1]
            );

        }, 3000);

        return;
    }

    // Після двох сцен — переходимо до опцій

    groundingInstruction.textContent = "";
    groundingInstruction.classList.add("is-empty");

    groundingTitle.textContent =
        "Тоді просто побудемо тут. Тобі не потрібно поспішати";

    setTimeout(() => {

        groundingTitle.textContent =
            "Що тобі зараз хочеться?";

        moveActivityOptions(groundingContent);
        showActivityOptions();

    }, 3500);
});

buttonSadCustom.addEventListener("click", () => {

    sadEmotionView.style.display = "none";

    sadCustomView.setAttribute("aria-hidden", "false");

    initSadCanvas();

});
sadSendButton.addEventListener("click", () => {

    sadModal.setAttribute("aria-hidden", "true");

    showSadLetterReceived("custom");

});

