document.addEventListener("DOMContentLoaded", (event) => {
    Inputmask({ 
        mask: "+7 (999) 999-99-99",
        showMaskOnHover: false
      }).mask("#phone");
});