const sidebar = document.getElementById('sidebar');
const openBtn = document.getElementById('openSidebarBtn');
const closeBtn = document.getElementById('closeSidebarBtn');
const overlay = document.getElementById('overlay');

// open/close helpers
function openSidebar(){
  sidebar.classList.add('open');
  overlay.hidden = false;
  sidebar.setAttribute('aria-hidden', 'false');
  openBtn.setAttribute('aria-expanded', 'true');
  closeBtn.setAttribute('aria-expanded', 'true');
  // trap focus entry
  sidebar.querySelector('a,button')?.focus();
}
function closeSidebar(){
  sidebar.classList.remove('open');
  overlay.hidden = true;
  sidebar.setAttribute('aria-hidden', 'true');
  openBtn.setAttribute('aria-expanded', 'false');
  closeBtn.setAttribute('aria-expanded', 'false');
  openBtn.focus();
}

// events
openBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
});

// close sidebar when a nav link is clicked (on mobile style)
sidebar.addEventListener('click', (e)=>{
  const target = e.target;
  if(target.matches('.nav__link')) closeSidebar();
});
// NewsAPI sample endpoint with health news
    const apiUrl = "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json";

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const newsContainer = document.getElementById("news");
        newsContainer.innerHTML = "";

        data.articles.forEach(article => {
          const div = document.createElement("div");
          div.className = "article";

          div.innerHTML = `
            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="News image">` : ""}
            <h2>${article.title}</h2>
            <p>${article.description || ""}</p>
            <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
          `;

          newsContainer.appendChild(div);
        });
      })
      .catch(error => {
        console.error("Error fetching news:", error);
        document.getElementById("news").innerText = "Sorry, failed to load news.";
      });