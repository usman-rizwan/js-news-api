let userInput = document.getElementById("input");
let newsContainer = document.getElementById("newsContainer");
// let loaderSpin = document.getElementById("loaderSpin");
// loaderSpin.style.display = "none";

const getNews = () => {
    return new Promise((resolve, reject) => {
        let apiKey = `6a69ca8858854fff89b81c1fbb7278b1`;
        let api = `https://newsapi.org/v2/everything?q=${userInput.value}&from=2023-10-28&sortBy=publishedAt&apiKey=${apiKey}`;
        axios.get(api)
            .then((res) => {
                if (
                    Array.isArray(res.data.articles) && res.data.articles.length === 0) {
                    reject(err);
                } else {
                    resolve(res);
                  
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const renderNews = async () => {

    try {
        if (userInput.value.trim()) {
    
        newsContainer.innerHTML = "";
        let response = await getNews();
        console.log(response.data.articles);
        let newsData = response.data.articles;
        for (let i = 0; i < newsData.length; i++) {
            newsContainer.innerHTML += `<div class="p-4 md:w-1/3">
        <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
          <img class="lg:h-48 md:h-36 w-full object-cover object-center" src="${newsData[i].urlToImage}" alt="blog">
          <div class="p-6">
            <h2 class="tracking-widest text-xs title-font font-medium text-black mb-1"><span class="text-indigo-500 font-bold text-lg"> Title: </span>${newsData[i].title} </h2>
            <p class="leading-relaxed mb-3">${newsData[i].description}</p>
            <div class="flex items-center flex-wrap ">
              <a class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0" href="${newsData[i].url}" target="_blank">Learn More
              <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
              </a>
              <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <i class="fa-solid fa-share-from-square text-indigo-500"></i> <span class="text-indigo-500">${newsData[i].source.name}</span> 
              </span>
            </div>
          </div>
        </div>
      </div>`;
            // console.log("Source ======> " + newsData[i].source.name);
            // console.log("Source ======> " + newsData[i].url);
            // console.log("author ======> " + newsData[i].author);
            // console.log("descri ======> " + newsData[i].urlToImage);
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "success",
                title: "Found successfully",
            });
            input.value = "";
        }}else{
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });
            Toast.fire({
                icon: "error",
                title: "Enter Valid Input",
            });
        }
    } catch (err) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });
        Toast.fire({
            icon: "error",
            title: "Not found: No news matching your search.",
        });
        console.log("Not Found");
    }
};
