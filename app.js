import sublinks from './data.js';

const toggleBtn = document.querySelector(".toggle-btn");
const closeBtn = document.querySelector(".close-btn");

const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const links = [...document.querySelectorAll(".link")];
const submenu = document.querySelector(".submenu");
const hero = document.querySelector(".hero");
const nav = document.querySelector(".nav");
const sidebar = document.querySelector(".sidebar");


/* sidebar-inner */
sidebar.innerHTML = sublinks.map(sublink => {
  const {page, links} = sublink;
  
return ` 
<div class="sidebar-content">
<h4>${page}</h4>
  ${links.map(link => {
    const {label, icon, url} = link;
    return ` 
    <a class="sidebar-link" href="${url}">
    <i class="${icon}"></i><p>${label}</p>
    </a>
    `
  }).join("")}
</div>
`
}).join("");








/* toggle-btn */
toggleBtn.addEventListener("click", () => {
  sidebarWrapper.classList.add("show");
});

/* close-btn */
closeBtn.addEventListener("click", () => {
  sidebarWrapper.classList.remove("show");
});



/* link-mouseover */
links.forEach(link => {
  link.addEventListener("mouseover", (e) => {
    const temp = e.currentTarget.getBoundingClientRect();
    const bottom = temp.bottom + 10;
    const center = (temp.left + temp.right) / 2;
    const text = e.currentTarget.textContent;

    const tempPage = sublinks.find(link => link.page === text);
    if (tempPage) {
      const {page, links} = tempPage;
      submenu.classList.add("show");
      submenu.style.left = `${center}px`;
      submenu.style.top = `${bottom}px`;
      
      let columns = "col-2";
      if (links.length === 3) {
        columns = "col-3"
      };
      if (links.length > 3) {
        columns = "col-4"
      }
      
      submenu.innerHTML = `
      <section class="submenu-content">
      <h4>${page}</h4>
      <div class="submenu-links ${columns}">
      ${links.map(sublink => {
        const {label, icon, url} = sublink;
        return `
        <a class="submenu-link" href="${url}">
          <i class="${icon}"></i><p>${label}</p>
        </a>`
      }).join("")}
       </div>
      `
    }
  });
});

hero.addEventListener("mouseover", () => {
  submenu.classList.remove("show")
});
/*nav.addEventListener("mouseover", (e) => {
  if (!e.target.classList.contains("link")) {
    submenu.classList.remove("show")
  }
})
*/



