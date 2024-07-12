// const API_KEY = `724a32d25d164af99927618bc2cc1b7e`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");
menus.forEach(menu =>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
let url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
let totalResult = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews =async()=>{ 
    try{  
        url.searchParams.set("page",page); //=> $page=page
        url.searchParams.set("pageSize",pageSize);
        //url호출 전에 호출해야함
        let response = await fetch(url);
        let data = await response.json();
        if(response.status===200){ 
            if(data.articles.length===0){
                throw new Error("No result for this search")
            }
            newsList = data.articles;
            totalResult = data.totalResults;
            render();
            paginationRender();
        }else{
            throw new Error(data.message);
        }
    }catch(error){
        console.log("error",error.message)
        errorRender(error.message);
    }
}


const getLatestNews = async () => { 
        // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`);
    //new URL : url 인스턴스를 새로만든다 
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines`);
    await getNews();
} 

const getNewsByCategory = async(event) =>{
    const category = event.target.textContent.toLowerCase();
    //console.log("category");
    page = 1;
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}`);
    await getNews(); 
}

const getNewsByKeyword = async() =>{
    const keyword = document.getElementById("search-input").value; 
    url = new URL(`https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&q=${keyword}`);
    await getNews();
}

const render = ()=>{
    let newsHtml =newsList.map(
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
        news.publishedAt
     ).fromNow()}</div>
                </div>
        </div>`).join(" ");
    document.getElementById("news-board").innerHTML=newsHtml;
}

const errorRender= (errorMessage) =>{
    let errorHTML=`<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`
document.getElementById("news-board").innerHTML=errorHTML;
}


const paginationRender=()=>{
    //totalResult, page, pageSize, groupSize, 
    //totalPage
    let totalPages = Math.ceil(totalResult/pageSize);
    //pageGroup, 
    let pageGroup = Math.ceil(page/groupSize);

    //lastPage,
    let lastPage = pageGroup*groupSize;
    //마지막 페이지그룹이 그룹사이즈보다 작다? 
    if(lastPage>totalPages){
        lastPage=totalPages;
    }

    //firstPage, 
    let firstPage = lastPage - (groupSize-1)<=0? 1:lastPage - (groupSize-1);

    let paginationHTML=`<li class="page-item"><a class="page-link" onclick="moveToPage(${page-1})">Previous</a></li>`;

    for(let i=firstPage;i<=lastPage;i++){
        paginationHTML+=`<li class="page-item ${i===page? "active":''}"><a class="page-link" onclick="moveToPage(${i})">${i}</a></li>`
    }
paginationHTML+=`<li class="page-item"><a class="page-link" onclick="moveToPage(${page+1})">Next</a></li>`
    document.querySelector(".pagination").innerHTML=paginationHTML;
//     <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item"><a class="page-link" href="#">Next</a></li>
//   </ul>
// </nav>
}

const moveToPage= (pageNum) =>{
    page=pageNum;
    console.log("pageNum",pageNum);
    getNews();
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