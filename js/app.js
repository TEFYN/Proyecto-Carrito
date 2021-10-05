//variables

const carrito = document.querySelector("#carrito"),
  contenedorCarrito = document.querySelector("#lista-carrito tbody"),
  vaciarCarritoBtn = document.querySelector("#vaciar-carrito"),
  listaCursos = document.querySelector("#lista-cursos");

let articulosCarrito = [];

//  registro todos mis addEventListener
cargarEventListeners();

function cargarEventListeners() {
  //cuando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  //elimina cursos de carrito
  carrito.addEventListener("click", eliminarCurso);

  //vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = [];
    limpiarHTML();
  });
}

//FUNCIONES
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCursos(cursoSeleccionado);
  }
}

function eliminarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => {
      if (curso.id === cursoId) {
        if (curso.cantidad > 1) {
          curso.cantidad--;
          return curso;
        }
      } else {
        return curso;
      }
    });

    carritoHTML(); //iterar sobre el carrito y mostrar su HTML
  }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCursos(cursoSeleccionado) {
  const infoCurso = {
    imagen: cursoSeleccionado.querySelector("img").src,
    titulo: cursoSeleccionado.querySelector("h4").textContent,
    precio: cursoSeleccionado.querySelector(".precio span").textContent,
    id: cursoSeleccionado.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some(
    (cursoSeleccionado) => cursoSeleccionado.id === infoCurso.id
  );
  if (existe) {
    const cursos = articulosCarrito.map((cursoSeleccionado) => {
      if (cursoSeleccionado.id === infoCurso.id) {
        cursoSeleccionado.cantidad++;
        return cursoSeleccionado; //retorna el objeto actualizado
      } else {
        return cursoSeleccionado; //retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  carritoHTML();
}

//muestra el carrito de compras en el HTML
function carritoHTML() {
  //limpiar el HTML
  limpiarHTML();

  articulosCarrito.forEach((infoCurso) => {
    const { imagen, titulo, precio, cantidad, id } = infoCurso;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src=${imagen} width="100" >
        </td>
        <td>${titulo}</td>  
        <td>${precio}</td>  
        <td>${cantidad}</td>  

        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>  

        `;

    //agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
    //AGREGA CADA ROW EN CADA INTERACCION
  });
}

//Elimina los cursos de Tbody
function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
} 
