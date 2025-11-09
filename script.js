const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// WhatsApp booking form
document.getElementById("testForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const test = document.getElementById("test").value;

  const message = `Hello Testeasy,%0AName: ${name}%0APhone: ${phone}%0ATest: ${test}%0AI want to book this test.`;
  const whatsappNumber = "919105179774"; // your real WhatsApp number
  const url = `https://wa.me/${whatsappNumber}?text=${message}`;

  window.open(url, "_blank");
});
