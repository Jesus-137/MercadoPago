create database gestion_usuarios;
use gestion_usuarios;

SELECT DATE_FORMAT(fecha_creacion, '%Y-%m-%D') AS dia, COUNT(*) AS total_publicaciones FROM publicaciones where id_cliente=4 GROUP BY dia ORDER BY dia;

create table leads(
id int primary key unique auto_increment not null,
uuid varchar(100) not null unique,
username varchar(50) not null unique,
telefono varchar(10) not null unique,
correo varchar (100) not null unique,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table usuarios(
id int not null primary key auto_increment,
uuid varchar(100) not null unique,
nombre varchar(50) not null,
id_lead int not null unique,
password varchar(100) not null unique,
foreign key (id_lead) references leads(id) on delete cascade
);

create table clientes(
id int not null primary key auto_increment,
uuid varchar(100) not null unique,
id_lead int not null unique,
foto_perfil varchar(100) not null,
nombre varchar(50) not null,
password varchar (100) not null unique,
tipo varchar(50) not null,
genero_musical varchar (50) not null,
tipo_evento VARCHAR(50) not null,
ubicacion VARCHAR(50) not null,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
foreign key (id_lead) references leads(id) on delete cascade
);

create table historial(
id int not null primary key auto_increment,
uuid varchar(100) not null unique,
id_usuario int not null,
busqueda varchar(250) not null,
foreign key (id_usuario) references usuarios(id) on delete cascade,
fecha_busqueda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table publicaciones(
id int not null primary key auto_increment,
uuid varchar(50) not null unique,
descripcion varchar(100),
contenido varchar (300) not null,
titulo varchar(50) not null,
id_cliente int not null,
foreign key (id_cliente) references clientes (id) on delete cascade,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table resenas(
id int not null primary key auto_increment,
uuid varchar (100) not null unique,
comentador int not null,
comentado int not null,
comentario varchar (250),
estrellas int not null,
foreign key (comentador) references clientes (id) on delete cascade,
foreign key (comentado) references clientes (id) on delete cascade,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

drop table resenas;
drop table publicaciones;
drop table historial;
drop table usuarios;
drop table clientes;
drop table leads;

create database autentificacion;
use autentificacion;

create table tokens (
id int not null primary key auto_increment,
uuid varchar (100) not null unique,
token varchar (500) not null unique,
habilitado boolean not null,
fecha_creacion timestamp default current_timestamp,
ultima_actualizacion timestamp default current_timestamp on update current_timestamp
);

drop table tokens;

create database registros;
use registros;

create table logs(
id int primary key auto_increment not null,
uuid varchar (100) not null unique,
tarjet int not null,
accion varchar(50) not null,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

drop table logs;

create database gestion_pagos;
use gestion_pagos;

create table payments(
id int not null primary key auto_increment,
uuid varchar(100) not null unique,
id_cliente varchar(100) not null unique,
plan varchar (50) not null,
fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
drop table payments;

create database notificaciones;
use notificaciones;

create table Whats(
id int primary key not null auto_increment unique,
uuid varchar (100) not null unique,
telefono varchar(10) not null,
id_user varchar(100) not null,
codigo int not null unique,
fecha_creacion timestamp default current_timestamp,
ultima_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

create table correo(
id int primary key not null auto_increment,
uuid varchar (100) not null unique,
id_user varchar (100) not null unique,
correo varchar(100) not null unique,
fecha_creacion timestamp default current_timestamp,
ultima_actualizacion timestamp default current_timestamp on update current_timestamp
);

drop table Whats;
drop table correo;