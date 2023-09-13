const accessKey="Kr_YJlxyMabjuT6q1JWCOnaQy3d6D0mUYS1vtDEdYA0";
const formEl=document.querySelector("form");
const inputEl=document.getElementById("search-input");
const searchResultsEl=document.querySelector(".search-results");
const showMoreButtonEl=document.getElementById("show-more-button")

let page=1;
let inputData="";
async function searchImages() {
   inputData=inputEl.value;
  const  url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
  const response=await fetch(url)
  const responseJson= await response.json()
  const results=responseJson.results;


    if(page===1){
      searchResultsEl.innerHTML=""
    }
   results.map((result)=>{
    const imageWrapper=document.createElement("div");
    imageWrapper.classList.add("search-result")
    const image=document.createElement("img")
    image.src=result.urls.small
    image.alt=result.alt_description
    const image_link=document.createElement("a");
    image_link.href=result.links.html;
    image_link.target="_blank"
    image_link.textContent=result.alt_description
    imageWrapper.appendChild(image)
    imageWrapper.appendChild(image_link)
    searchResultsEl.appendChild(imageWrapper)
   })
   page++;
  if(page>1){
    showMoreButtonEl.style.display="block"
  }

}


formEl.addEventListener("submit",(event)=>{
event.preventDefault();
page=1;
searchImages()

})

showMoreButtonEl.addEventListener("click",()=>{
  searchImages()
})