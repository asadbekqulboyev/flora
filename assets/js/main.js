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
  document.addEventListener("DOMContentLoaded", () => {
    // Sahifadagi barcha <form> elementlarni topamiz
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      const button = form.querySelector("button"); // har bir formaning o‘z tugmasi

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Tugma matnini o'zgartirish
        if (button) button.textContent = "Подождите...";

        // Formadagi barcha inputlarni avtomatik yig‘amiz
        const formData = new FormData(form);

        try {
          const response = await fetch("send.php", {
            method: "POST",
            body: new URLSearchParams(formData),
          });

          if (response.ok) {
            // Agar muvaffaqiyatli yuborilsa:
            if (button) button.textContent = "Отправлено ✅";
            form.reset();

            // Modal yoki overlay bor bo‘lsa, yopamiz
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

    // Barcha modal chiqish (yopish) tugmalariga hodisa qo‘shamiz
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

    nextBtn.addEventListener("click", () => {
      const currentItem = items[currentStep];
      const inputs = currentItem.querySelectorAll("input");
      let valid = false;

      inputs.forEach((input) => {
        if (
          (input.type === "text" && input.value.trim() !== "") ||
          (["radio", "checkbox"].includes(input.type) && input.checked)
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
      } else {
        nextBtn.textContent = "Готово";
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
