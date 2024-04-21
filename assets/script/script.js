let usuario_logueado = null;
let id_usuario = null;
let lista = null;
let posicion_lista = 0;
let lista_avatares = ["u01.gif", "u02.gif", "u03.gif", "u04.gif", "u05.gif", "u06.gif", "u07.gif", "u08.gif", "u09.gif", "u10.gif", "u11.gif", "u12.gif", "u14.gif", "u15.gif", "u16.gif"];
let imagen_guardada = null;
let admin = null;
let tema_actual = null;
let mensaje_actual = null;

function fMostrarModal() {
    document.querySelector("#div_modal").style.display = "flex";
}
function fMostrarModalRegistro() {
    document.querySelector("#logIn").style.transform = "rotateY(360deg)";
    document.querySelector("#logIn").style.transitionDuration = 2 + "s";
    fOcultarLogin();
    fMostrarRegistro();
    fCargarAvatares();
}
function fMostrarModalLogin() {
    document.querySelector("#Registrarse").style.transform = "rotateY(360deg)";
    document.querySelector("#Registrarse").style.transitionDuration = 2 + "s";
    fOcultarRegistro();
    fMostrarLogin();
}
function fMostrarLogin() {
    document.querySelector("#logIn").style.display = "block";
}
function fOcultarLogin() {
    document.querySelector("#logIn").style.display = "none";
}
function fMostrarRegistro() {
    document.querySelector("#Registrarse").style.display = "block";
}
function fOcultarRegistro() {
    document.querySelector("#Registrarse").style.display = "none";
}
function fOcultarModal() {
    document.querySelector("#div_modal").style.display = "none";
}
function fOcultarDatosUsuario() {
    document.querySelector("#tarjeta_usuario").style.display = "none";
}

//FUNCION PARA CARGAR LOS AVATARES EN EL FORMULARIO DE REGISTRO
function fCargarAvatares() {
    let html = "";
    html += `<div id="texto_avatares"> Selecciona tu avatar:</div>`;
    //Recorremos la lista de avatares creada en la parte superior
    for (i = 0; i < lista_avatares.length; i++) {
        //console.log(lista_avatares[i]);
        html += `<div class="div_avatares" onclick="fGuardarImagen(${i})"><img src='assets/images/${lista_avatares[i]}'></div>`
    }
    document.querySelector("#avatares").innerHTML = html;
}

//FUNCION PARA GUARDAR LA IMAGEN QUE ELIGE EL USUARIO EN EL FORMULARIO DE REGISTRO
function fGuardarImagen(posicion) {
    for (i = 0; i < lista_avatares.length; i++) {
        imagen_guardada = lista_avatares[posicion];
        //console.log(lista_avatares[posicion]);
    }
}

//FUNCION PARA MOSTRAR UNA TARJETA CON LOS DATOS DEL USUARIO
function fMostrarDatosUsuario() {
    //Mostrar el modal y ocultar los dos formularios de login y registro
    fMostrarModal();
    fOcultarLogin();
    fOcultarRegistro();
    //Generar los datos del usuario
    document.querySelector("#foto_user > img").src = "assets/images/" + usuario_logueado.usu_foto;
    document.querySelector("#nombre_user").innerHTML = "Tu nombre de usuario: " + usuario_logueado.usu_alias;
    document.querySelector("#password_user").innerHTML = "Tu contraseña: ************";
    document.querySelector("#post_creados").innerHTML = "Tus post: ";
    document.querySelector("#tarjeta_usuario").style.display = "flex";
}

//FUNCION PARA MOSTRAR LOS TEMAS DEL FORO EN LA WEB
function fMostrarTemas() {
    const URL = 'assets/php/servidor.php?peticion=cargar_temas';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            let html = "";
            document.querySelector("#inicio").style.display = "none";
            document.querySelector("#siginLogin").style.display = "block";
            document.querySelector("#temas").style.display = "block";
            if (admin == 1) {
                for (i = 0; i < data.datos.length; i++) {
                    html += 
                        `<div class="div_temas">
                            <div class="div_tema_nombre"><h1>${data.datos[i].tema_nombre}</h1> </div>
                            <div class="div_tema_descripcion">${data.datos[i].tema_descripcion} </div>
                            <div class="div_mostrar_mensajes" onclick="fMostrarMensajes(${data.datos[i].tema_id})">Entrar</div>
                            <div class="eliminarTema" onclick="fEliminarTema(${data.datos[i].tema_id})"> Eliminar tema </div>
                        </div>`;
                }
                    html +=
                        `<div class="div_temas">
                            <div class="div_tema_nombre"><h1>Nuevo tema</h1> </div>
                            <input type="text" value"texto" placeholder="Nombre del tema" id="nombre_nuevo_tema">
                            <input type="text" value"texto" placeholder="Descripción" id="descripcion_nuevo_tema">
                            <div id="boton_insertar_tema" onclick="fInsertarTema()"> <div>Insertar</div> </div>
                        </div>`;

            } else {
                for (i = 0; i < data.datos.length; i++) {
                    html += 
                        `<div class="div_temas">
                            <div class="div_tema_nombre"> <h1>${data.datos[i].tema_nombre}</h1> </div>
                            <div class="div_tema_descripcion">${data.datos[i].tema_descripcion} </div>
                            <div class="div_mostrar_mensajes" onclick="fMostrarMensajes('${data.datos[i].tema_id}','${data.datos[i].tema_nombre}')"> Entrar </div>
                        </div>`;
                }
            }
            document.querySelector("section").innerHTML = html;
        })
}

//FUNCION PARA MOSTRAR LOS MENSAJES DE UN TEMA
function fMostrarMensajes(tema) {
    const URL = 'assets/php/servidor.php?peticion=cargar_mensajes&tema=' + tema;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            let html = "";
            tema_actual = tema;
            //Capturamos el tema actual en el que se hace click para mostrar los mensajes de ese tema
            //console.log(tema_actual);
            //Si el usuario logueado no es administrador
            if (admin == 0) {
                for (i = 0; i < data.datos.length; i++) {
                    html += `
                    <div class="mensajesForo">
                        <div class="infoUser">
                            <div class="fotoUser"> <img src='assets/images/${data.datos[i].usu_foto}'></img> </div>
                            <div class="AliasUser"> Usuario: ${data.datos[i].usu_alias} || </div>
                            <div class="HoraUser"> Fecha y hora: ${data.datos[i].mens_fecha} </div>`
                            if (id_usuario == data.datos[i].usu_id) {
                                html += `<div class="eliminarMensaje" onclick="fEliminarMensaje(${data.datos[i].mens_id})"> Eliminar mensaje </div>`
                            }
                        html += `</div>
                        <div class="comentarioUser"> 
                            <div>${data.datos[i].mens_texto}</div> 
                        </div>
                    </div>`;
                }
                html += `<div id="insertar_texto">
                        <input type="text" value"texto" placeholder="¿Quieres añadir algún mensaje?">
                        <div id="boton_mensaje"onclick="fInsertarMensaje()"><div>Enviar</div></div>
                    </div>`;
                //Si el usuario logueado es administrador   
            } else if (admin == 1) {
                for (i = 0; i < data.datos.length; i++) {
                    html += `
                    <div class="mensajesForo">
                        <div class="infoUser">
                            <div class="fotoUser"> <img src='assets/images/${data.datos[i].usu_foto}'></img> </div>
                            <div class="AliasUser"> Usuario: ${data.datos[i].usu_alias} || </div>
                            <div class="HoraUser"> Fecha y hora: ${data.datos[i].mens_fecha} </div>
                            <div class="eliminarMensaje" onclick="fEliminarMensaje(${data.datos[i].mens_id})"> Eliminar mensaje </div>
                        </div>
                            <div class="comentarioUser"> 
                            <div>${data.datos[i].mens_texto}</div> 
                        </div>
                    </div>`
                    html += `</div>`;
                }
                html += `<div id="insertar_texto">
                        <input type="text" value"texto" placeholder="¿Quieres añadir algún mensaje?">
                        <div id="boton_mensaje"onclick="fInsertarMensaje()"><div>Enviar</div></div>
                    </div>`;
                //Si el usuario no ha hecho login     
            } else {
                for (i = 0; i < data.datos.length; i++) {
                    html += `
                    <div class="mensajesForo">
                        <div class="infoUser">
                            <div class="fotoUser"> <img src='assets/images/${data.datos[i].usu_foto}'></img> </div>
                            <div class="AliasUser"> Usuario: ${data.datos[i].usu_alias} || </div>
                            <div class="HoraUser"> Fecha y hora: ${data.datos[i].mens_fecha} </div>
                        </div>
                            <div class="comentarioUser"> 
                            <div>${data.datos[i].mens_texto}</div> 
                        </div>
                    </div>`
                    html += `</div>`;
                }
            }
            document.querySelector("section").innerHTML = html;
        })
}

//FUNCION PARA PERMITIR A LOS USUARIOS INICIAR SESION EN EL FORO
function fControlLogin() {
    //Leer el alias
    let alias = document.querySelector("#alias").value;
    //Leer el password
    let password = document.querySelector("#password").value;
    //Enviar al server
    let URL = "assets/php/servidor.php?peticion=ControlLogin"
    URL += "&alias=" + alias;
    URL += "&password=" + password;
    URL += "&admin=" + admin;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            //Si no está el user con el password --> 
            if (data.datos.length == 0) {
                document.querySelector("#div_error1").style.display = "block";
                return;
            }
            //Desde aquí el user es correcto
            //Guardar los datos del usuario
            usuario_logueado = data.datos[0];
            id_usuario = usuario_logueado.usu_id;
            //console.log("ID USUARIOOOOOOOOOOOOOOOOOOOOO",id_usuario)
            admin = data.datos[0].usu_admin;
            //console.log("DATOS DEL USUARIO LOGEADO:", usuario_logueado);
            fOcultarModal();
            document.querySelector("#nav_perfil").style.display = "block";
        })
        .finally(() => {
            fMostrarTemas();
        });
}

//FUNCION PARA PERMITIR A LOS USUARIOS REGISTRARSE EN EL FORO
function fControlRegistro() {
    //Leer el alias
    let aliasNuevo = document.querySelector("#aliasRegistro").value;
    //console.log("usuario:" + aliasNuevo);
    //Leer el password
    let passwordNuevo = document.querySelector("#passwordRegistro").value;
    //console.log("contraseña:" + passwordNuevo);
    let passwordRegistroRepetir = document.querySelector("#passwordRegistroRepetir").value;
    //console.log("contraseña2:" + passwordRegistroRepetir);
    let fotoNueva = imagen_guardada;
    admin = 0;
    let URL = "assets/php/servidor.php?peticion=Registrar";
        URL += "&aliasNuevo=" + aliasNuevo;
        URL += "&passwordNuevo=" + passwordNuevo;
        URL += "&fotoNueva=" + fotoNueva;
        URL += "&admin=" + admin;

    if (passwordNuevo == passwordRegistroRepetir) {
        fetch(URL)
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);

                fOcultarModal();
            });
    } else {
        document.querySelector("#div_error2").style.display = "flex";
    }
}

//FUNCION PARA PERMITIR AL ADMIN INSERTAR UN TEMA
function fInsertarTema() {
    //Leer el id del usuario
    let tema = document.querySelector("#nombre_nuevo_tema").value;
    //console.log(tema);
    let descripcion = document.querySelector("#descripcion_nuevo_tema").value;
    //console.log(descripcion);
    let URL = "assets/php/servidor.php?peticion=InsertarTema";
    URL += "&tema=" + tema;
    URL += "&descripcion=" + descripcion;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
        })
        .finally(() => {
            fMostrarTemas();
        });
}

//FUNCION PARA PERMITIR A LOS USUARIOS INSERTAR MENSAJES EN UN TEMA
function fInsertarMensaje() {
    //Leer el id del usuario
    let usuario = usuario_logueado.usu_id;
    //Leer el tema en el que estamos
    let tema = tema_actual;
    //Leer el texto escrito por el usuario
    let texto = document.querySelector("#insertar_texto input").value;
    //console.log(texto);
    let URL = "assets/php/servidor.php?peticion=InsertarMensajes";
    URL += "&usuario=" + usuario;
    URL += "&tema=" + tema;
    URL += "&texto=" + texto;
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
           //console.log(data);
        })
        .finally(() => {
            fMostrarMensajes(tema_actual);
        });

}

//FUNCION PARA CERRAR LA SESION ACTUAL DEL USUARIO
function fCerrarSesion() {
    //El usuario logueado y el administrador vuelven a su valor por defecto al arrancar la página
    usuario_logueado = null;
    admin = null;
    //Vaciar el input del login para que no aparezca el usuario anterior al abrir la modal
    document.querySelector("#nav_perfil").style.display = "none";
    document.querySelector("#div_modal input").value = "";
    //Ocultamos modal y tarjeta de datos de usuario
    fOcultarModal();
    fOcultarDatosUsuario();
    // //Dejamos mostrada la modal del login, para poder iniciar una nueva sesion si se hace click en Sign in/Log in
    fMostrarLogin();
    // location.reload();
}

//FUNCION PARA PERMITIR AL ELIMINAR MENSAJES
function fEliminarMensaje(mensajeElegido) {
    const URL = "assets/php/servidor.php?peticion=EliminarMensaje&mensajeElegido=" + mensajeElegido;
    //console.log("ID_Mensaje", mensaje_actual);
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
        })
        .finally(() => {
            fMostrarMensajes(tema_actual);
        });

}

//FUNCION PARA ELIMINAR TODOS LOS MENSAJES DE UN TEMA
// function fEliminarTodosLosMensajes(tema_actual) {
//     const URL = "assets/php/servidor.php?peticion=EliminarTodosMensajes&temaAEliminar=" + tema_actual;
//     console.log("ID_Tema", temaElegido);
//     fetch(URL)
//         .then((response) => response.json())
//         .then((data) => {
//             console.log(data);
//         })
//         .finally(() => {
//             fMostrarTemas();
//         });
// }

//FUNCION PARA ELIMINAR TEMAS
function fEliminarTema(temaElegido) {
    const URL = "assets/php/servidor.php?peticion=EliminarTema&temaElegido=" + temaElegido;
    //console.log("TEMA: ", temaElegido);
    //fEliminarTodosLosMensajes(tema_actual);
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
        })
        .finally(() => {
            fMostrarTemas();
        });
}
