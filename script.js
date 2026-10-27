
document.addEventListener("DOMContentLoaded", () => {

  const cover = document.getElementById("cover");
  const openButton = document.getElementById("openInvitation");

  function openInvitation() {
    if (!cover || cover.classList.contains("hide")) return;

    cover.classList.add("hide");
    launchConfetti(100);

    setTimeout(() => {
      cover.remove();
    }, 1000);
  }

  // Ambas botellas abren la invitación.
  document.querySelectorAll(".bottle").forEach((bottle) => {
    bottle.addEventListener("click", openInvitation);
  });

  openButton.addEventListener("click", openInvitation);


  // =====================================
  // 2. CONTADOR REGRESIVO
  // Viernes 30 octubre 2026, 3:30 PM
  // Hora local de la computadora
  // =====================================

  const eventDate = new Date(2026, 9, 30, 15, 30, 0);

  function updateCountdown() {
    const remaining = eventDate.getTime() - Date.now();

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");
    const message = document.getElementById("countdownMessage");

    if (remaining <= 0) {
      days.textContent = "00";
      hours.textContent = "00";
      minutes.textContent = "00";
      seconds.textContent = "00";

      message.textContent =
        remaining > -86400000
          ? "¡Llegó el gran día! ¡A celebrar! 🍻"
          : "La fecha de la celebración ya pasó.";

      return;
    }

    days.textContent = String(
      Math.floor(remaining / 86400000)
    ).padStart(2, "0");

    hours.textContent = String(
      Math.floor((remaining % 86400000) / 3600000)
    ).padStart(2, "0");

    minutes.textContent = String(
      Math.floor((remaining % 3600000) / 60000)
    ).padStart(2, "0");

    seconds.textContent = String(
      Math.floor((remaining % 60000) / 1000)
    ).padStart(2, "0");

    message.textContent = "¡Cada segundo estamos más cerca!";
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  // =====================================
  // 3. CARRUSEL DE FOTOGRAFÍAS
  // Sustituye las URL por tus propias fotos.
  // =====================================

  const photos = [
    {
      src: "uno.png",
      caption: "Grandes momentos."
    },
    {
      src: "dos.png",
      caption: "Que nunca falten motivos para celebrar."
    },
    {
      src: "tres.png",
      caption: "Las mejores historias se viven juntos."
    },
    {
      src: "cuatro.png",
      caption: "Amistades que se convierten en familia."
    },
    {
      src: "cinco.png",
      caption: "¡Vamos a celebrar a Alejandro!"
    }
  ];

  let currentPhoto = 0;

  const image = document.getElementById("carouselImage");
  const caption = document.getElementById("photoCaption");
  const counter = document.getElementById("photoCounter");
  const dotsContainer = document.getElementById("photoDots");

  // Crear los indicadores inferiores.
  photos.forEach((photo, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "photo-dot";
    dot.setAttribute("aria-label", `Ver foto ${index + 1}`);

    dot.addEventListener("click", () => {
      showPhoto(index);
      restartCarousel();
    });

    dotsContainer.appendChild(dot);
  });

  function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;

    image.style.opacity = "0";

    const nextSrc = photos[currentPhoto].src;

    const updateImage = () => {
      image.src = nextSrc;
      image.alt = photos[currentPhoto].caption;
      caption.textContent = photos[currentPhoto].caption;
      counter.textContent = `${currentPhoto + 1} / ${photos.length}`;

      [...dotsContainer.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === currentPhoto);
      });

      image.style.opacity = "1";
    };

    const testImage = new Image();

    testImage.onload = updateImage;

    testImage.onerror = () => {
      caption.textContent =
        "No se pudo cargar esta foto. Comprueba tu conexión o cambia la URL.";
      image.style.opacity = "1";
    };

    testImage.src = nextSrc;
  }

  document.getElementById("prevPhoto").addEventListener("click", () => {
    showPhoto(currentPhoto - 1);
    restartCarousel();
  });

  document.getElementById("nextPhoto").addEventListener("click", () => {
    showPhoto(currentPhoto + 1);
    restartCarousel();
  });

  let carouselTimer;

  function restartCarousel() {
    clearInterval(carouselTimer);

    carouselTimer = setInterval(() => {
      showPhoto(currentPhoto + 1);
    }, 5000);
  }

  showPhoto(0);
  restartCarousel();


  // =====================================
  // 4. CONFIRMACIÓN POR WHATSAPP
  // =====================================

  const whatsappNumber = "526572759439";

  const whatsappMessage =
    "¡Hola! Confirmo mi asistencia a la celebración de Alejandro " +
    "el viernes 30 de octubre de 2026 a las 3:30 PM " +
    "en El Camarón Picant, Puebla. ¡Nos vemos ahí! 🍻";

  const whatsappButton = document.getElementById("whatsappButton");

  whatsappButton.href =
    "https://wa.me/" +
    whatsappNumber +
    "?text=" +
    encodeURIComponent(whatsappMessage);

  whatsappButton.addEventListener("click", () => {
    launchConfetti(30);
  });


  // =====================================
  // 5. CONFETI PLATEADO
  // =====================================

  function launchConfetti(amount = 50) {
    const container = document.getElementById("confetti");

    const colors = [
      "#ffffff",
      "#d9dadd",
      "#aeb2b8",
      "#777b82",
      "#f2f2f2"
    ];

    for (let i = 0; i < amount; i++) {
      const piece = document.createElement("span");

      piece.className = "confetti-piece";

      piece.style.left = `${Math.random() * 100}%`;

      piece.style.setProperty(
        "--piece-color",
        colors[Math.floor(Math.random() * colors.length)]
      );

      piece.style.setProperty(
        "--fall-time",
        `${3 + Math.random() * 4}s`
      );

      piece.style.setProperty(
        "--drift",
        `${Math.random() * 180 - 90}px`
      );

      piece.style.animationDelay = `${Math.random() * 0.8}s`;

      container.appendChild(piece);

      setTimeout(() => piece.remove(), 8000);
    }
  }


  // =====================================
  // 6. APARICIÓN ANIMADA AL DESPLAZARSE
  // =====================================

  const sections = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12   
    });

    sections.forEach((section) => observer.observe(section));
  } else {
    sections.forEach((section) => section.classList.add("visible"));
  }
 
});
