// const API_KEY = `724a32d25d164af99927618bc2cc1b7e`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu =>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
let url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines`);

const getNews =async()=>{ 
    let response = await fetch(url);
    let data = await response.json();
    newsList = data.articles;
    render();
}


const getLatestNews = async () => { 
        // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    //new URL : url 인스턴스를 새로만든다 
    url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines`);
    getNews();
} 

const getNewsByCategory = async(event) =>{
    const category = event.target.textContent.toLowerCase();
    //console.log("category");
    url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines?country=kr&category=${category}`);
    getNews(); 
}

const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("search-input").value; 
    url = new URL(`https://relaxed-liger-259fb5.netlify.app/top-headlines?country=kr&q=${keyword}`);
    getNews();
}

const render = ()=>{
    const newsHtml =newsList.map(
        (news)=>`<div class="row news">
                <div class="col-lg-4"><img class="news-img-size" src="${news.urlToImage ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
    }" /></div>
                <div class="col-lg-8">
                    <h2>${news.title}</h2>
                    <p>${news.description == null || news.description == ""
                        ? "내용없음"
                        : news.description.length > 200
                        ? news.description.substring(0, 200) + "..."
                        : news.description
                 }</p>
                    <div>${news.source.name || "no source"} *  ${moment(
        news.published_date
     ).fromNow()}</div>
                </div>
        </div>`).join(" ");
    document.getElementById('news-board').innerHTML=newsHtml;
}

const openSearchBox = () =>{
    let inputArea=document.getElementById("input-area");
    if(inputArea.style.display==="inline"){
        inputArea.style.display = "none";
    }else{
        inputArea.style.display = "inline";
    }
}
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
} 


getLatestNews();