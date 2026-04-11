// ===== Example CV Carousel =====
const cvData = [
  { img: "images/marketing.png", title: "Marketing — Professional CV", desc: "Clean and minimal layout suitable for marketing and content roles.", pdf: "cv example/Black and Grey Minimalist Professional CV Resume.pdf" },
  { img: "images/software engineer.png", title: "Software Engineer CV", desc: "List-based structure with skills and projects — ideal for developers.", pdf: "cv example/White and Black Simple Lined Engineer Resume.pdf" },
  { img: "images/graphic designer.png", title: "Creative / Designer CV", desc: "Modern creative layout perfect for designers and portfolio roles.", pdf: "cv example/White Minimalist Graphic Designer Professional Cv Resume.pdf" },
  { img:"images/MBA.png", title: "Business / Management CV", desc: "Professional layout suitable for leadership and business roles.", pdf: "cv example/White Simple Professional Business Consultant Resume CV.pdf" },
  { img:"images/data analysis.png", title: "Data Analyst CV", desc: "Analytics-focused layout with charts & metrics sections.", pdf: "cv example/Black and White Simple Data Analyst Resume.pdf" },
  { img: "images/HR.png", title: "HR / Recruiter CV", desc: "Simple and clean layout suitable for HR specialists.", pdf: "cv example/White Simple Corporate CV Resume.pdf" }
];

const carouselInner = document.getElementById("cvCarouselInner");
if(carouselInner) {
  let slideHTML = "";
  const itemsPerSlide = 3;

  for (let i = 0; i < cvData.length; i += itemsPerSlide) {
    const slideItems = cvData.slice(i, i + itemsPerSlide);
    slideHTML += `<div class="carousel-item ${i === 0 ? "active" : ""}"><div class="row g-4 justify-content-center">`;

    slideItems.forEach(cv => {
      slideHTML += `
        <div class="col-12 col-sm-6 col-md-4">
          <div class="cv-card d-flex flex-column">
            <div class="cv-thumb">
              <img src="${cv.img}" alt="CV Sample">
            </div>
            <h5>${cv.title}</h5>
            <p>${cv.desc}</p>
            <div class="d-flex justify-content-around mt-auto">
              <button class="btn w-45 btn-preview" data-pdf="${cv.pdf}">Preview</button>
              <a href="${cv.pdf}" download class="btn  w-45">Download</a>
            </div>
          </div>
        </div>
      `;
    });

    slideHTML += `</div></div>`;
  }

  carouselInner.innerHTML = slideHTML;

  // PDF Preview Buttons
  document.querySelectorAll(".btn-preview").forEach(btn => {
    btn.addEventListener("click", function() {
      const pdfUrl = this.dataset.pdf;
      const pdfIframe = document.getElementById("pdfIframe");
      const pdfModalEl = document.getElementById("pdfModal");

      if(pdfIframe && pdfModalEl) {
        pdfIframe.src = pdfUrl;
        const modal = new bootstrap.Modal(pdfModalEl);
        modal.show();
      }
    });
  });
}

// ===== Feature Navigation =====
function openFeature(featureKey) {
  if(featureKey) {
    localStorage.setItem('currentFeature', featureKey);
    window.location.href = 'feature-template.html'; 
  }
}

// ===== CV Update Modal Logic =====
const updateModalEl = document.getElementById('updateCvModal');
if(updateModalEl) {
  const updateModal = new bootstrap.Modal(updateModalEl);
  const saveCvBtn = document.getElementById('saveCvBtn');
  const cvInput = document.getElementById('cvInput');

  if(saveCvBtn && cvInput) {
    saveCvBtn.addEventListener('click', () => {
      if (!cvInput.files.length) {
        alert("Please select a CV first");
        return;
      }
      const file = cvInput.files[0];
      console.log("Selected CV:", file.name);
      updateModal.hide();
    });
  }
}
 // ===== Typing effect =====
    function typeEffect(element, speed = 100) {
      const text = element.textContent;
      element.textContent = '';
      let i = 0;
      const typing = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
          clearInterval(typing);
          element.parentElement.classList.add('show'); // show paragraph after typing
        }
      }, speed);
    }

    document.addEventListener('DOMContentLoaded', () => {
      const heroH1 = document.querySelector('#theme-video-overlay .hero-text h1');
      if (heroH1) typeEffect(heroH1, 100);
    });

    // ===== Hero theme switch =====
const themes = document.querySelectorAll('.hero-theme');
const dots = document.querySelectorAll('.dot');
let current = 0;

function showTheme(index) {
  themes.forEach((t,i) => t.classList.toggle('active', i===index));
  dots.forEach((d,i) => d.classList.toggle('active', i===index));
  current = index;
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    showTheme(parseInt(dot.dataset.index));
  });
});

setInterval(() => {
  let next = (current + 1) % themes.length;
  showTheme(next);
}, 10000);
// ===== Safe Feature Template Updates =====
const featureTitle = document.getElementById('feature-title');
const featureDescription = document.getElementById('feature-description');
const featureContent = document.getElementById('feature-content');

if(featureTitle) featureTitle.textContent = "Feature Title Here";
if(featureDescription) featureDescription.textContent = "Feature Description Here";
if(featureContent) featureContent.textContent = "Feature Content Here";




