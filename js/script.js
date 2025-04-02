//Al cargar el DOM, la aplicación tiene que llamar una función que realiza una solicitud a la API para obtener información sobre todos los países.

//La información se ordena alfabéticamente.

//Al clickar en cada una de las banderas tendrá que mostrar la información detallada en una ventana flotante del país seleccionado. 
//Información detallada sobre el país seleccionado, incluyendo la bandera, la capital, la población, el lado de la carretera por el que se circula.
//Tendrá un botón cerrar para hacer desaparecer esa información.


const countriesList = document.getElementById('countries-list')
const modal = document.getElementById('modal')
const modalContent = document.getElementById('modalContent')
const closeModal = document.getElementById('closeModal')

window.addEventListener('load', () => {
    modal.style.display = "none"})

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";}})
        
const getCountries = async () => {
    try {
        const fetchCountries = await fetch('https://restcountries.com/v3/all');
        if (!fetchCountries.ok) {
            throw new Error ('Error en la respuesta', fetchCountries.status);
        }
        const responseCountries = await fetchCountries.json ()
        console.log (responseCountries);
        responseCountries.sort ((a,b) => a.name.common.localeCompare(b.name.common));
        responseCountries.forEach (country => {
            const countryDiv = document.createElement('div');
                countryDiv.classList.add('countryDiv');
                countryDiv.innerHTML = `
                <img src="${country.flags[0]}" alt=Bandera de ${country.name.common}>
                <p>${country.name.common}</p>`
                countryDiv.addEventListener('click', () => showContent(country))
            countriesList.appendChild(countryDiv);
            })
        } catch (error) {
            console.log ('Error al obtener los datos', error)
        }
    }
    
    function showContent (country) {
        const ladoConduccion = country.car.side === 'left' ? 'izquierda' : 'derecha'
        modalContent.innerHTML = `
        <img src="${country.flags[0]}" alt=Bandera de ${country.name.common}>
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital[0]}</p>
        <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Conducen por la:</strong> ${ladoConduccion}</p>`;
        modal.style.display = 'flex';
    }
    
    closeModal.addEventListener('click', () => modal.style.display = 'none')

getCountries ()
