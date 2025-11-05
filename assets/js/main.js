document.addEventListener("DOMContentLoaded", () => {
    const telInputs = document.querySelectorAll('input[type="tel"]');

    telInputs.forEach((input) => {
        Inputmask({
            mask: "+7 (999) 999-99-99",
            showMaskOnHover: false,
            showMaskOnFocus: true, // fokusda mask ko‘rinadi
            clearIncomplete: true, // to‘liq kiritilmasa avtomatik tozalaydi
        }).mask(input);
    });
    const modal_btn = document.querySelectorAll(".modal_open");
    const modal = document.querySelector(".modal");
    const modal_close = document.querySelectorAll(".modal_exit");
    modal_btn.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.classList.add("active");
        });
    });
    modal_close.forEach((btn) => {
        btn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    });

    // modal send backend
    // modal send backend
    document.addEventListener("DOMContentLoaded", () => {
        const forms = document.querySelectorAll("form");

        forms.forEach((form) => {
            const button = form.querySelector("button");
            const checkbox = form.querySelector('input[type="checkbox"]');

            // === Agar formda checkbox bo‘lsa, tugmani boshida bloklaymiz ===
            if (checkbox && button) {
                button.disabled = !checkbox.checked;

                // Checkbox o‘zgarishini kuzatamiz
                checkbox.addEventListener("change", () => {
                    button.disabled = !checkbox.checked;
                });
            }

            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                // === Agar checkbox bo‘lsa va belgilanmagan bo‘lsa — yubormaymiz ===
                if (checkbox && !checkbox.checked) {
                    alert("Iltimos, shartlarga rozilikni belgilang ✅");
                    return;
                }

                // === Inputlar tekshiruvi (faqat checkbox bo‘lmagan formalar uchun) ===
                if (!checkbox) {
                    const inputs = form.querySelectorAll(
                        "input[required], textarea[required], select[required]"
                    );
                    for (let input of inputs) {
                        if (!input.value.trim()) {
                            alert("Iltimos, barcha majburiy maydonlarni to‘ldiring!");
                            return;
                        }
                    }
                }

                // === Endi yuborish jarayoni ===
                if (button) button.textContent = "Подождите...";

                const formData = new FormData(form);

                try {
                    const response = await fetch("send.php", {
                        method: "POST",
                        body: new URLSearchParams(formData),
                    });

                    if (response.ok) {
                        if (button) button.textContent = "Отправлено ✅";
                        form.reset();

                        // Agar checkbox bo‘lsa, yana tugmani disable qilamiz
                        if (checkbox && button) button.disabled = true;

                        const modal = form.closest(".modal_content");
                        if (modal) {
                            modal.classList.add("success");
                            setTimeout(() => {
                                modal.classList.remove("active", "success");
                            }, 3000);
                        }
                    } else {
                        if (button) button.textContent = "Ошибка!";
                    }
                } catch (error) {
                    console.error("Xatolik:", error);
                    if (button) button.textContent = "Ошибка!";
                }

                // 3 soniyadan keyin tugma matnini tiklash
                setTimeout(() => {
                    if (button) button.textContent = "Отправить";
                }, 3000);
            });
        });

        // Modalni yopish tugmalari
        document.querySelectorAll(".modal_exit").forEach((exitBtn) => {
            exitBtn.addEventListener("click", () => {
                const modal = exitBtn.closest(".modal_content");
                if (modal) modal.classList.remove("active");
            });
        });
    });

    const reviewSwiperEl = document.querySelector(".review-swiper");

    if (reviewSwiperEl) {
        const reviewSwiper = new Swiper(reviewSwiperEl, {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 16,

            navigation: {
                nextEl: reviewSwiperEl.querySelector(".swiper-next"),
                prevEl: reviewSwiperEl.querySelector(".swiper-prev"),
            },

            speed: 800,
            autoHeight: true,
        });
    }

    if (document.querySelector(".question")) {
        const nextBtn = document.querySelector(".question-next");
        const stepSpan = document.querySelector(".question-step span");
        const progressBar = document.querySelector(".progress-bar");
        const wrap = document.querySelector(".question-wrap");
        const items = document.querySelectorAll(".question-item");

        let currentStep = 0;
        const totalSteps = items.length;
        const stepPercent = 100 / totalSteps;

        nextBtn.addEventListener("click", async () => {
            const currentItem = items[currentStep];
            const inputs = currentItem.querySelectorAll("input, textarea, select");
            let valid = false;

            // Validation check
            inputs.forEach((input) => {
                if (
                    (input.type === "text" && input.value.trim() !== "") ||
                    (["radio", "checkbox"].includes(input.type) && input.checked) ||
                    (input.tagName === "TEXTAREA" && input.value.trim() !== "")
                ) {
                    valid = true;
                }
            });

            if (!valid) {
                currentItem.classList.add("error");
                return;
            }

            currentItem.classList.remove("error");

            if (currentStep < totalSteps - 1) {
                currentStep++;

                stepSpan.textContent = currentStep + 1;

                const width = ((currentStep + 1) / totalSteps) * 100;
                progressBar.style.width = width + "%";
                progressBar.dataset.width = width;

                wrap.style.transform = `translateX(-${currentStep * 100}%)`;

                if (currentStep === totalSteps - 1) {
                    nextBtn.textContent = "Отправить";
                }
            } else {
                const formData = new FormData();

                document.querySelectorAll(".question-item input, .question-item textarea, .question-item select").forEach((el) => {
                    if ((el.type === "radio" || el.type === "checkbox") && !el.checked) return;
                    if (el.name) formData.append(el.name, el.value);
                });

                nextBtn.disabled = true;
                nextBtn.textContent = "Отправка...";

                try {
                    const response = await fetch("send.php", {
                        method: "POST",
                        body: formData,
                    });

                    if (response.ok) {
                        nextBtn.textContent = "Отправлено";
                    } else {
                        nextBtn.textContent = "Ошибка";
                        nextBtn.disabled = false;
                    }
                } catch (error) {
                    nextBtn.textContent = "Ошибка";
                    nextBtn.disabled = false;
                }
            }
        });
    }


    if (document.querySelector(".contact-swiper")) {
        const contactSwiper = new Swiper(".contact-swiper", {
            slidesPerView: 2,
            spaceBetween: 32,
            slidesPerGroup: 2,
            loop: false,
            navigation: {
                nextEl: ".contact-swiper .swiper-next",
                prevEl: ".contact-swiper .swiper-prev",
            },
            breakpoints: {
                0: {
                    spaceBetween: 16,
                },
                992: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 32,
                },
            },
        });
    }
});
