
const loadCategories = () => {
    const URL = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(URL)
        .then(res => res.json())
        .then(data => displayCategories(data.data))
}
// loadCategories()

displayCategories=(data)=>{
    const categoriesContainer=document.getElementById('category-container');
    data.news_category.forEach(category => {
        categoriesContainer.innerHTML+=`<a class="nav-link" href="#" onclick="loadCategoryNews('${category.category_id}','${category.category_name}')">${category?.category_name}</a>`
        
    });

}
// category news 
const loadCategoryNews=(categoryId,categoryName)=>{
    const URL=`https://openapi.programming-hero.com/api/news/category/${categoryId}`
    fetch(URL)
    .then(res=>res.json())
    .then(data=>displayAllNews(data.data,categoryName))
}
const displayAllNews=(data,categoryName)=>{
    // console.log(data.data.length);
    document.getElementById('category-name-alert').innerText=categoryName;
    document.getElementById('item-found').innerText=data.length;
    console.log(data);
    // data.forEach(singleNews => {
    //     console.log(singleNews);
    // });
}