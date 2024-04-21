<?php
require_once("BBDD_CTRLR.php");

if (isset($_REQUEST['peticion'])) {
    switch ($_REQUEST['peticion']) {
        case "cargar_temas":
            $sql = "SELECT * FROM temas ORDER BY tema_nombre";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);
            break;
        case "cargar_mensajes":
            $tema = $_REQUEST['tema'];
            $sql = "SELECT * FROM temas,mensajes,usuarios WHERE usu_id = mens_usu_id AND tema_id = mens_tema_id AND mens_tema_id = '$tema'";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);
            break;
        case "ControlLogin":
             //Recuperar alias de la url
            $alias = $_REQUEST['alias'];
            //Recuperar password de la url
            $password = $_REQUEST['password'];
            $admin = $_REQUEST['admin'];
            $sql = "SELECT * FROM usuarios 
            WHERE
                usu_alias = '$alias' AND
                usu_password = md5('$password')";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);
            break;
        case "Registrar":
            //Recuperar alias de la url
            $aliasNuevo = $_REQUEST['aliasNuevo'];
            //Recuperar password de la url
            $passwordNuevo = $_REQUEST['passwordNuevo'];
            //Recuperar foto
            $fotoNueva = $_REQUEST['fotoNueva'];
            //Recuperar admin
            $admin = $_REQUEST['admin'];
            //Utilizando el porcedure -->
            $sql = "CALL usuarios_insertar('$aliasNuevo', '$passwordNuevo','$fotoNueva','$admin')";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);
            break;

        case "InsertarMensajes":
            //Recuperar el id
            $usuario = $_REQUEST['usuario'];
             //Recuperar el tema
            $tema = $_REQUEST['tema'];
            //Recuperar el texto escrito por el usuario
            $texto = $_REQUEST['texto'];
            //Utilizando el porcedure -->
            $sql = "CALL mensajes_insertar('$texto','$tema','$usuario')";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);
            break;
        
        case "InsertarTema":
            $tema = $_REQUEST['tema'];
            $descripcion = $_REQUEST['descripcion'];
            $sql = "CALL temas_insertar('$tema','$descripcion')";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);
            break;

        case "EliminarMensaje":
            //Recuperar el ID del mensaje
            $mensajeElegido = $_REQUEST['mensajeElegido'];
            $sql = "CALL mensajes_eliminar('$mensajeElegido')";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);
            break;
        
        case "EliminarTema":
            //Recuperar el tema
            $temaElegido = $_REQUEST['temaElegido'];
            $sql = "CALL temas_eliminar('$temaElegido')";
            $datos['sql'] = $sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);
            break;

        // case "EliminarTodosMensajes":
        //     //Recuperar el tema
        //     $temaAEliminar = $_REQUEST['temaAEliminar'];
        //     $sql = "CALL mensajes_eliminar_todos('$temaAEliminar')";
        //     $datos['sql'] = $sql;
        //     $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
        //     echo json_encode($datos);
        //     break;
}
}