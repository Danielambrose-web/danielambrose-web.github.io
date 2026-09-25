const contactForm = document.querySelector(".contact-form");
const emailJsUrl =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
let emailJsLoader;

function loadEmailJs() {
    if (window.emailjs) return Promise.resolve(window.emailjs);
    if (emailJsLoader) return emailJsLoader;

    emailJsLoader = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = emailJsUrl;
        script.async = true;
        script.onload = () => {
            window.emailjs.init({ publicKey: "6UmDm4PB9vilPTpS8" });
            resolve(window.emailjs);
        };
        script.onerror = () => reject(new Error("Email service could not load."));
        document.head.append(script);
    });

    return emailJsLoader;
}

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const status = contactForm.querySelector(".form-status");
        submitButton.disabled = true;
        status.textContent = "Sending your message...";

        try {
            const emailjs = await loadEmailJs();
            await emailjs.send("service_4jm1p6r", "template_c08474w", {
                name: contactForm.elements.name.value,
                email: contactForm.elements.email.value,
                message: contactForm.elements.message.value,
            });
            status.textContent = "Your message was sent successfully.";
            contactForm.reset();
        } catch {
            status.textContent =
                "Your message could not be sent. Please try again later.";
        } finally {
            submitButton.disabled = false;
        }
    });
}