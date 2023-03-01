
const loadCategories = () => {
    const URL = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(URL)
        .then(res => res.json())
        .then(data => displayCategories(data.data))
}
// loadCategories()

displayCategories = (data) => {
    const categoriesContainer = document.getElementById('category-container');
    data.news_category.forEach(category => {
        categoriesContainer.innerHTML += `<a class="nav-link" href="#" onclick="loadCategoryNews('${category.category_id}','${category.category_name}')">${category?.category_name}</a>`

    });

}
// category news 
const loadCategoryNews = (categoryId, categoryName) => {
    const URL = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(URL)
        .then(res => res.json())
        .then(data => displayAllNews(data.data, categoryName))
}
const displayAllNews = (data, categoryName) => {
    // console.log(data.data.length);
    document.getElementById('category-name-alert').innerText = categoryName;
    document.getElementById('item-found').innerText = data.length;
    // console.log(data);
    const allNewsContainer = document.getElementById('all-news-container')
    allNewsContainer.innerHTML = ''
    data.forEach(singleNews => {
        const date = new Date(singleNews.author.published_date)
        const newDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        allNewsContainer.innerHTML += `
        <div class="card mb-3" >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${singleNews.title}</h5>
              <p class="card-text">${singleNews.details.slice(0, 200)}...</p>
              
            </div>
            <div class="card-footer border-0 bg-body d-flex justify-content-center justify-content-between">
              <div class="d-flex gap-2 align-items-center">
                <div>
                <img src="${singleNews.author.img}" class="img-fluid rounded-circle" height="40px" width="40" alt="...">
                </div>
                <div>
                  <p class="m-0 p-0">${singleNews.author.name?singleNews.author.name:'Mr. Unknown'}</p>
                  <p class="m-0 p-0">${newDate}</p>
                </div>                
              </div>

              <div class="d-flex ">
                <div class="d-flex gap-2 justify-content-center align-items-center">
                    <i class="fa-solid fa-eye "></i>
                    <p class="m-0 p-0" >${singleNews.total_view?singleNews.total_view:'0'}</p>
                </div>
              </div>
              
              
              <div class="d-flex gap-2 justify-content-center align-items-center">
              <i class="fa-solid fa-star "></i>
              <i class="fa-solid fa-star "></i>
              <i class="fa-solid fa-star "></i>
              <i class="fa-solid fa-star "></i>
              <i class="fa-solid fa-star-half"></i>
              </div>

              <div class="d-flex gap-2 justify-content-center align-items-center">
              <i onclick="loadNewsDetail('${singleNews._id}')" class="fa-solid fa-arrow-right " data-bs-toggle="modal" data-bs-target="#newsDetails"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        
        `
    });
}

const loadNewsDetail = news_id => {
    const URL = `https://openapi.programming-hero.com/api/news/${news_id}`;

    fetch(URL).then(res => res.json()).then(data => displayNewDetail(data.data[0]))

}
const displayNewDetail = detailData => {

    const date = new Date(detailData.author.published_date)
    const newDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });


    const modalDetailBody = document.getElementById('modalDetailBody');

    modalDetailBody.innerHTML = `
    <div class="card mb-3" >
    <div class="row g-0">
      <div class="col-md-12">
        <img src="${detailData.image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-12">
        <div class="card-body">
          <h5 class="card-title">${detailData.title} <span class="badge text-bg-info">${detailData.others_info.is_trending ? 'Trending' : ''}</span></h5>
          <p class="card-text">${detailData.details}</p>
          
        </div>
        <div class="card-footer border-0 bg-body d-flex justify-content-center justify-content-between">
          <div class="d-flex gap-2 align-items-center">
            <div>
            <img src="${detailData.author.img}" class="img-fluid rounded-circle" height="40px" width="40" alt="...">
            </div>
            <div>
              <p class="m-0 p-0">${detailData.author.name?detailData.author.name:'Mr. Unknown'}</p>
              <p class="m-0 p-0">${newDate}</p>
            </div>                
          </div>

          <div class="d-flex ">
            <div class="d-flex gap-2 justify-content-center align-items-center">
                <i class="fa-solid fa-eye "></i>
                <p class="m-0 p-0" >${detailData.total_view?detailData.total_view:'0'}</p>
            </div>
          </div>
          
          
          <div class="d-flex gap-2 justify-content-center align-items-center">
          <i class="fa-solid fa-star "></i>
          <i class="fa-solid fa-star "></i>
          <i class="fa-solid fa-star "></i>
          <i class="fa-solid fa-star "></i>
          <i class="fa-solid fa-star-half"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
}