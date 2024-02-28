const dataLoad = async (inputText = "iphone", isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    const data = await res.json();
    // console.log(data.data)
    const phones = data.data;
    displayPhones(phones, isShowAll)
}




const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all-container');

    if(phones.length > 10 && !isShowAll){
        showAll.classList.remove('hidden')
    }

    else{
        showAll.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0,10);
    }

    phones.forEach(phone => {
        // console.log(phone)


        const phoneCard = document.createElement('div');

        phoneCard.classList = `card bg-gray-100 shadow-xl`

        phoneCard.innerHTML = `
       <figure class="px-10 pt-10">
                      <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions">
                        <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
       `

        phoneContainer.appendChild(phoneCard)
    });
    loadingSpinner(false)
}

const searchPhone = (isShowAll) => {
    loadingSpinner(true);
    const inputField = document.getElementById('input-field')
    const inputText = inputField.value;
    // console.log(inputText)
    dataLoad(inputText, isShowAll)
    // inputField.value = ''
}

const loadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');

    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const showAll = () => {
    searchPhone(true);
}

const showDetails = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data;
    phoneDetails(phone);
}

const phoneDetails = (phone) =>{
    console.log(phone)
    const phoneDetails = document.getElementById('phone-details-container')
    phoneDetails.innerHTML = `
    <img src="${phone.image}" alt="">
    <h2 class="text-xl font-bold my-4">${phone.name}</h2>
    <h2 class="my-4"><span class="font-bold text-xl">Brand: </span> ${phone?.brand}</h2>
    <p class="my-2"><span class="font-bold">Storage: </span> ${phone?.mainFeatures?.storage}</p>
    <p class="my-2"><span class="font-bold">Display Size: </span> ${phone?.mainFeatures?.displaySize}</p>
    <p class="my-2"><span class="font-bold">Chipset: </span> ${phone?.mainFeatures?.chipSet}</p>
    <p class="my-2"><span class="font-bold">Memory: </span> ${phone?.mainFeatures?.memory}</p>
    <p class="my-2"><span class="font-bold">Slug: </span> ${phone?.slug}</p>
    <p class="my-2"><span class="font-bold">Release data: </span> ${phone?.releaseDate}</p>
    <p class="my-2"><span class="font-bold">GPS: </span> ${phone?.others?.GPS || 'NO GPS available'}</p>

    `
    show_details_modal.showModal()

}

dataLoad()