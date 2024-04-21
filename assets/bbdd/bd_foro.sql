-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-03-2024 a las 19:31:38
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_foro`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `mensajes_eliminar` (IN `id` INT)   DELETE FROM mensajes WHERE mens_id = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensajes_eliminar_todos` (IN `id` INT)  COMMENT 'FUNCION PARA ELIMINAR TODOS LOS MENSAJES DE UN TEMA' DELETE 
	FROM mensajes 
	WHERE mens_tema_id = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensajes_insertar` (IN `texto` TEXT, IN `tema` INT, IN `usuario` INT)   INSERT INTO mensajes VALUES
(null,texto,CURRENT_TIMESTAMP,tema,usuario)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensajes_Select_All` ()   SELECT * FROM mensajes$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `mensajes_Select_ID` (IN `id` INT)   SELECT * FROM mensajes WHERE mens_tema_id = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `temas_eliminar` (IN `id` INT)   DELETE FROM temas WHERE tema_id = id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `temas_insertar` (IN `nombre` VARCHAR(50), IN `descripcion` TEXT)   INSERT INTO temas VALUES
(null,nombre,descripcion)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `temas_Select_All` ()   SELECT * FROM temas ORDER BY tema_nombre$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usuarios_insertar` (IN `alias` VARCHAR(50), IN `contraseña` VARCHAR(50), IN `foto` VARCHAR(50), IN `administrador` BOOLEAN)   INSERT INTO usuarios VALUES
(null,alias, md5(contraseña), foto, administrador)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `usuarios_Select_All` ()   SELECT * FROM usuarios ORDER BY usu_alias$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `mens_id` int(10) UNSIGNED NOT NULL,
  `mens_texto` text DEFAULT NULL,
  `mens_fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `mens_tema_id` int(10) UNSIGNED NOT NULL,
  `mens_usu_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`mens_id`, `mens_texto`, `mens_fecha`, `mens_tema_id`, `mens_usu_id`) VALUES
(1, 'El Real Madrid es el mejor equipo del mundo', '2024-03-07 09:57:59', 1, 1),
(2, '¿Hay alguien a quien le gusten los Strings en Java? ¡Los odio!', '2024-03-07 09:57:59', 2, 1),
(4, 'Alguien sabe como descargar el mod del Heroes III en HD?', '2024-03-07 10:16:09', 2, 5),
(5, 'God of War II <<<<<<<< The Last of Us 2', '2024-03-08 18:54:10', 4, 5),
(35, 'Yo soy más de XBOX', '2024-03-19 18:29:09', 4, 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temas`
--

CREATE TABLE `temas` (
  `tema_id` int(10) UNSIGNED NOT NULL,
  `tema_nombre` varchar(50) DEFAULT NULL,
  `tema_descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `temas`
--

INSERT INTO `temas` (`tema_id`, `tema_nombre`, `tema_descripcion`) VALUES
(1, 'Fifa 24', 'En esta sección se pueden poner comentarios acerca de los partidos de la jornada de FutChampions, tradeos, SBC\'s... Sean bienvenidos al mejor foro de Fifa de España!'),
(2, 'Programación', 'Java, Python, C++.... ¿Tienes dudas acerca de algún lenguaje en concreto? Cuéntanos tus dudas, aquí hay muchos patos dispuestos a escucharte!'),
(4, 'Exclusivos PlayStation', 'God of War, Spiderman, The Last of Us...\r\nPlayStation y su catálogo de juegos propio da para muuchas líneas.\r\nPara vosotros, jugadores.'),
(15, 'TEMA A ELIMINAR', 'Puedes eliminar este tema Javi'),
(16, 'OTRO TEMA A ELIMINAR', 'Eliminalo sin prolema');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usu_id` int(10) UNSIGNED NOT NULL,
  `usu_alias` varchar(50) DEFAULT NULL,
  `usu_password` varchar(50) DEFAULT NULL,
  `usu_foto` varchar(50) DEFAULT NULL,
  `usu_admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usu_id`, `usu_alias`, `usu_password`, `usu_foto`, `usu_admin`) VALUES
(1, 'admin', '91f5167c34c400758115c2a6826ec2e3', 'u10.gif', 1),
(2, 'batistaker47', '4a4f1931254afb6148a04c67bcdceba4', 'u15.gif', 0),
(5, 'pepopipu', 'b9577b57ae9a1592d1f1deb64041bca3', 'u09.gif', 0),
(8, 'gontu', '3ecc4241abf07930a1ff35d90110f683', 'u10.gif', 0),
(9, 'sotomayors', 'f43c40a1ad89860f03bc18b0cc652bd5', 'u16.gif', 0),
(10, 'nuria', 'cc776813221a1ae893d844b9f1c794b6', 'u16.gif', 0),
(11, 'Antuan', 'ca1ba7c9efeb37eacf3c3a3ca6ecd2b5', 'u16.gif', 0),
(12, 'Vigara', '9fab064348ccba4784c16fafdf93f5f7', 'u16.gif', 0),
(13, 'gabriel', '647431b5ca55b04fdf3c2fce31ef1915', 'u16.gif', 0),
(14, 'javi', 'a14f8a540e78dae706d255750010a0f8', 'u06.gif', 0),
(24, 'celia', 'a0ee94b392b37c57751877cd6de5c586', 'u02.gif', 0),
(26, '1', 'c4ca4238a0b923820dcc509a6f75849b', 'u01.gif', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`mens_id`),
  ADD KEY `mens_tema_id` (`mens_tema_id`),
  ADD KEY `mens_usu_id` (`mens_usu_id`);

--
-- Indices de la tabla `temas`
--
ALTER TABLE `temas`
  ADD PRIMARY KEY (`tema_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usu_id`),
  ADD UNIQUE KEY `usu_alias` (`usu_alias`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `mens_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `temas`
--
ALTER TABLE `temas`
  MODIFY `tema_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usu_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`mens_tema_id`) REFERENCES `temas` (`tema_id`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`mens_usu_id`) REFERENCES `usuarios` (`usu_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
