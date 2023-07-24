const API_KEY="4a9371b610e7498a9428c97fba52bb2c";

const url="https://newsapi.org/v2/everything?q="

window.addEventListener("load",()=>fetchNews("India"));

async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`)

    const data= await res.json();
    console.log(data);

    bindData(data.articles);
}

function bindData(articles){
    const cardContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-cards");
    cardContainer.innerHTML="";

    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg=cardClone.querySelector("#news-img");
    const newsTitle=cardClone.querySelector("#news-title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#news-desc");

    newsImg.src= article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{timeZone: "Asia/Jakarta"});
    newsSource.innerHTML=`${article.source.name} ◾ ${date}`;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}
let curSelectedNav=null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById("search-text");

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query) return;
    curSelectedNav?.classList.remove("active");
    fetchNews(query)
})

function reload(){
    window.location.reload();
}

const navLinks=document.getElementsByClassName("nav-links-search-bar")[0];
const hamburger=document.getElementById("ham-burger-icon");

hamburger.addEventListener("click",()=>{
    navLinks.classList.toggle("active");
})