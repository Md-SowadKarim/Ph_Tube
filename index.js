
const dataFetch=async()=>{
    console.log("hi");
    const res=await fetch("https://openapi.programming-hero.com/api/videos/categories")
    const data=await res.json()
    const info=data.data
    console.log(data)
    const tabContainer=document.getElementById("tabContainer")

    info.forEach(info => {
        const div=document.createElement("div")
        div.innerHTML=`
        <a onclick="handelDisplay('${info.category_id}','false')" class="tab m-1   px-6 rounded-lg  text-white bg-[#FF1F3D]">${info.category}</a>       
        `
        tabContainer.appendChild(div)
    });
   
}
const sorted=(id)=>{
    handelDisplay(id,true)
}
const handelDisplay=async(catId=catId,x)=>{

    const res=await fetch(`https://openapi.programming-hero.com/api/videos/category/${catId}`)
    const data=await res.json()
   let info=data.data
   console.log(info);
   if(x==true){
    info.sort(function(a, b){return parseInt(a.others.views) - parseInt(b.others.views)});
   }

   

  console.log(info);
   
   const card=document.getElementById("card")
   const sorted=document.getElementById("sorted")
   sorted.setAttribute("onclick",`sorted('${catId}')`)
   card.innerHTML=''
   info.forEach(data=>{
  //  console.log(data.others.posted_date);
    const hour=parseInt(data.others.posted_date/3600)
   // console.log(hour+"hour");
    const min=parseInt((data.others.posted_date%3600)/60)
   // console.log(min+"   min");
       const div=document.createElement("div")
     
       div.innerHTML=`
       <div class=" bg-white rounded-2xl">
       <div class="w-full h-[300px] relative ">
       <img class="w-full h-full rounded-lg" src="${data.thumbnail}" alt="Shoes" />
       <div>
       ${data.others.posted_date? ` <h1 class="absolute bottom-4 right-3 py-2 px-4 rounded-xl bg-slate-400 text-white ">${hour + " hour  " +min+ " min" } </h1>`:''  }
      
      
       </div>
       </div>
       <div class="card-body">
           <div class="flex">
               <div class="rounded-full">
                   <img class="rounded-full h-[40px] w-[40px] " src="${data.authors[0].profile_picture}" alt="">
               </div>
               <div class=" flex items-center mx-2">
                   <h1 class="font-extrabold text-md text-black">${data.title}</h1>
               </div>
           </div>
           <div class="flex items-center">
               <h2 class="card-title p-1">${data.authors[0].profile_name}</h2>
               <h1>${data.authors[0].verified== true ?  `<i class="fa-regular fa-circle-check text-black flex items-center mx-2" ari></i>`:'' }</h1>
              
              
           </div>
         
         <p> ${data.others.views} Views</p>
       </div>
       </div>
     


       `
    card.classList.add("grid")
       card.appendChild(div)
   })
 console.log(catId);
console.log(info.length);
if(info.length == 0){
        const view=document.getElementById("card")
        view.innerHTML=''
        const div=document.createElement("div")
        div.innerHTML=`
        <div class="text-center">
        <img class="mx-auto my-2" src="./image/Icon.png" alt="Shoes" />
        </figure>
        <h1 class="text-3xl my-2">Oops!! Sorry, There is no content here</h1>
        </div>
       
        
        `
        view.classList.remove("grid")
    view.appendChild(div)
}


}

dataFetch()
handelDisplay("1000",false);