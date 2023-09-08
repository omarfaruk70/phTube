const loadData = async() =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    const result = data.data
    const tabContainer = document.getElementById('tab-container');
    result.forEach(category=>{
        tabContainer.classList = `mt-5 gap-5 flex justify-center items-center`;
        const div = document.createElement('div');
        div.innerHTML = ` 
        <a onclick="showEachData(${category?.category_id})"  class="tab font-bold rounded-md bg-gray-500 text-white">${category.category}</a> 
        `;
        tabContainer.appendChild(div)
        // console.log(category)   
    })
};

const showEachData = async(categoryId)=>{
    const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await response.json();
    const result = data.data;
    const datacontainer = document.getElementById('show-data-container');
    datacontainer.textContent = '';
    const noContent = document.getElementById('noData-container')
    datacontainer.classList = 'mt-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'
    result.forEach(eachData=>{
        const div = document.createElement('div');
        const totalSecond = eachData?.others?.posted_date;
        const hours = Math.floor( totalSecond / (60 * 60));
        const mins = Math.floor((totalSecond % 3600) / 60)
        // console.log(hours, mins)
        div.classList = `card w-90 bg-base-100 shadow-xl`
        div.innerHTML = ` 
        <figure class='relative'><img src="${eachData.thumbnail}" alt="Shoes" />
        <span class='text-white bg-black absolute bottom-0 right-10'>${hours} hours ${mins} mins ago</span>
        </figure>
        <div class="card-actions items-center mx-5 mt-3 gap-5 flex">
        <img class='h-10 w-10 rounded-full' src="${eachData.authors[0]?.profile_picture}" alt="Shoes" />
        <div>
        <h2 class='text-2xl font-bold'>${eachData.title}</h2>
        <div class='flex gap-5'>
        <div>
        <p class='font-bold'>${eachData?.authors[0]?.profile_name}</p>
        </div>
        <div>
        <p class='italic'>${eachData.authors[0]?.verified? 'Verified' : ''}</p>
        </div>
        </div>
        <small>${eachData.others?.views} views</small>
        </div>
        </div>
        
        `;
      
        // console.log(eachData)
        datacontainer.appendChild(div)
    });
    if(datacontainer.innerHTML == ''){
        noContent.classList.remove('hidden')
    }
    else{
        noContent.classList.add('hidden')
    }
    
}

// let arr = [];
// const sortbyview = async(id)=>{
//     const response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${id}`);
//     const data = await response.json();
//     arr.push(...data.data);
//     console.log(data)
//     data.sort((a,b)=>{
//         const viewA = parseFloat(a.others.views ? a.others.views : '')
//         const viewB = parseFloat(b.others.views ? b.others.views : '')
//     });
//     if(viewA < viewB){
//         return 1;
//     }
//     else if(viewA > viewB){
//         return -1;
//     }
//     else{
//         return 0
//     }
//     showEachData();
// }
// sort by view function


loadData();
showEachData('1000')

