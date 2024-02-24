const api = `https://cors-everywhere.onrender.com/https://portal.api.gupy.io/api/v1/jobs?`;
const modal = document.querySelector(".modal");

const fetchGupy = async (jobSettign) => {
  document.getElementById("loading").style.display = "block";

  const APIResponse = await fetch(`${api}${jobSettign}`);

  document.getElementById("loading").style.display = "none";

  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  } else {
    alert("Erro ao buscar dados");
  }
};

const renderGupy = async (jobSettign) => {
  const response = await fetchGupy(jobSettign);

  // Sort the jobs by published date in descending order
  const sortedJobs = response.data.sort((a, b) => {
    return new Date(b.publishedDate) - new Date(a.publishedDate);
  });

  // Create an array of job cards
  const jobCards = sortedJobs.map((element) => {
    return `
      <div class="cards">
          
        <div class="title">
        <div class="info-company">
        <img src="${element["careerPageLogo"]}" alt="${
      element["careerPageName"]
    }" >
        
        <h1 class="job-company">${element["careerPageName"]}</h1>
          
        </div>
          
          <h3>${element["name"]}</h3>

        </div>

        <div class="location">
          <span>${element["city"]}</span>
          <span>/</span>
          <span>${element["state"]}</span>
        </div>

        <span>Vaga publicada em: ${new Date(
          element["publishedDate"]
        ).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })}</span>
      
      <div class="remote-work">
      <span class="tooltip">Trabalho remoto:  ${
        element["isRemoteWork"] === true
          ? `<i class="ph-house"></i> <span class="tooltiptext">Sim
        </span>`
          : `<i class="ph-buildings"></i> <span class="tooltiptext">Não
        </span>`
      }</span>
      </div>
      
      <div class="gupy">
      <span class="tooltip">Tem Selo Gupy: ${
        element["badges"]["friendlyBadge"] === true
          ? `<i class="ph-circle-wavy-check"></i>
      
      <span class="tooltiptext">Empresas com alta taxa de retorno e atividade nas vagas nos últimos 3 meses</span>`
          : `<i class="ph-circle-wavy-warning"></i> 
      
      <span class="tooltiptext">Sem informações</span>`
      }
      </span>
      </div>

        <a href="${element["careerPageUrl"]}" target="_blank">
        Ver vaga
        <i class="ph-arrow-square-out-fill"></i>
        </a>
      </div>
    `;
  });

  // Join the job cards into a single string
  const jobCardsString = jobCards.join("");

  // Insert the job cards string into the HTML
  document.getElementById("cards-container").innerHTML = jobCardsString;
};

document
  .getElementById("formJobs")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const chosenJob = document.querySelector('input[name="option"]:checked');

    modal.style.display = "none";

    let jobSettign = "";

    if (chosenJob.value === "front") {
      jobSettign = `&jobName=front-end&type=vacancy_type_effective&isRemoteWork=true&limit=3000`;
      renderGupy(jobSettign);
    }

    if (chosenJob.value === "design") {
      jobSettign = `&jobName=design&limit=3000&type=vacancy_type_internship&&isRemoteWork=true`;
      renderGupy(jobSettign);
    }
  });
