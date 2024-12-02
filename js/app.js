const marvel = { // objeto marvel que contiene un método render para mostrar información de héroes de Marvel
  render: () => {
    const urlAPI = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1b2f9838fe19538ac61c619caf1d944c&hash=ffecff536715461380b30acdf37a4d35';  // URL de la api de Marvel con parámetros necesarios (timestamp, API key y hash)
    
    const container = document.querySelector('#marvel-row');     //selecciona el contenedor donde se insertará el contenido generado
    
    // inicia la variable para acumular el contenido HTML
    let contentHTML = '';
    //intenta ejecutar el bloque de código que llama a la api y procesa los datos
    try {
      fetch(urlAPI)
        .then(res => {
          //si la respuesta no es exitosa, lanza un error
          if (!res.ok) {
            throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);
          }
          return res.json(); //convierte la respuesta en JSON
        })
        .then((json) => {
          for (const hero of json.data.results) {  // itera sobre los resultados de los héroes obtenidos de la API
            let urlHero = hero.urls[0].url;   //obtiene la URL del héroe para más información

            //genera el HTML para cada héroe, incluyendo imagen y nombre
            contentHTML += `
              <div class="col-md-4">
                  <a href="${urlHero}" target="_blank">
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                  </a>
                  <h3 class="title">${hero.name}</h3>
              </div>`;
          }
          container.innerHTML = contentHTML;    //inserta el contenido generado en el contenedor de la página
        })
        .catch(error => {
          console.error('Error al procesar la solicitud:', error.message); //captura errores ocurridos durante el fetch o en el procesamiento de datos
        });
    } catch (error) {
      
      console.error('Error inesperado:', error.message); //Captura errores que ocurran fuera de las promesas
    }
  }
};
marvel.render();