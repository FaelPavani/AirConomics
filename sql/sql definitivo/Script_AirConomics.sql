create database AirConomics;
use AirConomics;

create table tb_login(
id_login int primary key auto_increment,
usuario_login varchar(45),
senha_login varchar(100)
);
create table tb_endereco(
id_endereco int primary key auto_increment,
rua varchar(65),
bairro varchar(65),
cidade varchar(65),
cep char(10),
estado char(2)
);
create table tb_empresa(
id_empresa int primary key auto_increment,
nome_empresa varchar(45),
cnpj_empresa char(14),
nomeFantasia_empresa varchar(45),
RazaoSocial_empresa varchar(45),
fk_endereco int,
constraint fk_endereco foreign key (fk_endereco) references tb_endereco(id_endereco));

create table tb_usuario(
id_usuario int primary key auto_increment,
nome_usuario varchar(45),
email_usuario varchar(45),
telefone_usuario char(13),
fk_login int,
fk_empresa int,
constraint fk_login foreign key (fk_login) references tb_login(id_login),
constraint fk_empresa_usuario foreign key (fk_empresa) references tb_empresa(id_empresa)
);

create table tb_sensor (
id_sensor int primary key auto_increment,
numero_sensor int,
numeroSala_sensor char(6),
fk_empresa int,
constraint fk_empresa_sensor foreign key (fk_empresa) references tb_empresa(id_empresa)
);

create table tb_dado(
id_dado int  auto_increment,
dataColeta_dado datetime,
temperatura_dado decimal(5,2),
fk_sensor int,
constraint fk_sensor_dado foreign key (fk_sensor) references tb_sensor(id_sensor),
primary key(id_dado,fk_sensor)
);

create table tb_ciclo (
id_ciclo int auto_increment, 
ciclos_esperados int,
ciclos_reais int, 
fk_sensor int,
constraint fk_sensor_ciclo foreign key (fk_sensor) references tb_sensor(id_sensor),
primary key (id_ciclo,fk_sensor)
);

create table tb_alerta (
id_alerta int auto_increment,
fk_dado int,
constraint fk_dado foreign key (fk_dado) references tb_dado(id_dado),
primary key(id_alerta,fk_dado )
);

insert into tb_login (usuario_login, senha_login) values 
('rafael.nascimento', md5('senhaSegura123')), 
('luciana.martins', md5('Password!2024')), 
('marcos.tavares', md5('SecurePass456')), 
('fernanda.souza', md5('StrongPassword789')), 
('tiago.silveira', md5('MySecretKey101')), 
('camila.rodrigues', md5('TopSecret2022')), 
('andre.melo', md5('HiddenPass!2023')), 
('natasha.pires', md5('Complex1234')), 
('diego.castro', md5('UltraSecure!567')), 
('renata.farias', md5('SafePassword88'));

insert into tb_endereco (rua, bairro, cidade, cep, estado) values 
('Av. Brigadeiro Faria Lima, 4221', 'Itaim Bibi', 'São Paulo', '04538-133', 'SP'), 
('Rua Pio XI, 1200', 'Alto da Lapa', 'São Paulo', '05468-901', 'SP'), 
('Av. das Nações Unidas, 12901', 'Brooklin', 'São Paulo', '04578-000', 'SP'), 
('Av. Presidente Vargas, 500', 'Centro', 'Rio de Janeiro', '20071-000', 'RJ'), 
('Av. Getúlio Vargas, 151', 'Centro', 'Belo Horizonte', '30112-021', 'MG'), 
('Rua do Ouro, 50', 'Centro', 'Salvador', '40026-020', 'BA'), 
('Av. Rio Branco, 45', 'Centro', 'Rio de Janeiro', '20090-001', 'RJ'), 
('Rua Gomes de Carvalho, 151', 'Vila Olímpia', 'São Paulo', '04547-003', 'SP'), 
('Av. Afonso Pena, 4000', 'Centro', 'Belo Horizonte', '30130-003', 'MG'), 
('Rua Sete de Setembro, 1234', 'Centro', 'Curitiba', '80420-000', 'PR');

insert into tb_empresa (nome_empresa, cnpj_empresa, nomeFantasia_empresa, RazaoSocial_empresa, fk_endereco) values 
('Itaú Unibanco', '60701190', 'Itaú', 'Itaú Unibanco S.A.', 1), 
('Banco do Brasil', '00000000', 'BB', 'Banco do Brasil S.A.', 2), 
('Bradesco', '60665730', 'Bradesco', 'Banco Bradesco S.A.', 3), 
('Vale S.A.', '33019620', 'Vale', 'Vale S.A.', 4), 
('Petrobras', '00000000', 'Petrobras', 'Petróleo Brasileiro S.A.', 5), 
('Ambev', '00000000', 'Ambev', 'Companhia de Bebidas das Américas', 6), 
('Magazine Luiza', '00000000', 'Magalu', 'Magazine Luiza S.A.', 7), 
('Natura', '00000000', 'Natura', 'Natura Cosméticos S.A.', 8), 
('Embraer', '00000000', 'Embraer', 'Embraer S.A.', 9), 
('Movile', '00000000', 'Movile', 'Movile S.A.', 10);

insert into tb_usuario (nome_usuario, email_usuario, telefone_usuario, fk_login, fk_empresa) values 
('Lucas Almeida', 'lucas.almeida@email.com', '11987654321', 1, 1), 
('Fernanda Costa', 'fernanda.costa@email.com', '21987654321', 2, 2), 
('Marcos Oliveira', 'marcos.oliveira@email.com', '31987654321', 3, 3), 
('Juliana Ferreira', 'juliana.ferreira@email.com', '41987654321', 4, 4), 
('Renato Santos', 'renato.santos@email.com', '51987654321', 5, 5), 
('Carla Martins', 'carla.martins@email.com', '61987654321', 6, 6), 
('Eduardo Lima', 'eduardo.lima@email.com', '71987654321', 7, 7), 
('Patricia Rocha', 'patricia.rocha@email.com', '81987654321', 8, 8), 
('Felipe Souza', 'felipe.souza@email.com', '91987654321', 9, 9), 
('Ana Beatriz', 'ana.beatriz@email.com', '11976543210', 10, 10);

insert into tb_sensor (numero_sensor, numeroSala_sensor, fk_empresa) values 
(101, '101', 1), 
(102, '102', 1), 
(103, '103', 1), 
(201, '201', 2), 
(202, '202', 2), 
(301, '301', 3), 
(302, '302', 3), 
(401, '401', 4), 
(402, '402', 4), 
(501, '501', 5), 
(502, '502', 5), 
(601, '601', 6), 
(602, '602', 6), 
(701, '701', 7), 
(702, '702', 7), 
(801, '801', 8), 
(901, '901', 9), 
(1001, '1001', 10), 
(1002, '1002', 10), 
(1003, '1003', 10), 
(1101, '1101', 10);

insert into tb_dado (dataColeta_dado, temperatura_dado, fk_sensor) values 
('2024-10-01 08:00:00', 22.5, 1), 
('2024-10-01 08:15:00', 22.7, 1), 
('2024-10-01 08:30:00', 22.6, 1), 
('2024-10-01 08:00:00', 23.1, 2), 
('2024-10-01 08:15:00', 23.0, 2), 
('2024-10-01 08:30:00', 22.9, 2), 
('2024-10-01 08:00:00', 24.3, 3), 
('2024-10-01 08:15:00', 24.5, 3), 
('2024-10-01 08:30:00', 24.2, 3), 
('2024-10-01 08:00:00', 21.8, 4), 
('2024-10-01 08:15:00', 21.6, 4), 
('2024-10-01 08:30:00', 21.9, 4), 
('2024-10-01 08:00:00', 25.4, 5), 
('2024-10-01 08:15:00', 25.5, 5), 
('2024-10-01 08:30:00', 25.6, 5), 
('2024-10-01 08:00:00', 20.5, 6), 
('2024-10-01 08:15:00', 20.7, 6), 
('2024-10-01 08:30:00', 20.6, 6), 
('2024-10-01 08:00:00', 22.0, 7), 
('2024-10-01 08:15:00', 22.2, 7), 
('2024-10-01 08:30:00', 22.1, 7);

insert into tb_ciclo (ciclos_esperados, ciclos_reais, fk_sensor) values 
(30, 28, 1), 
(40, 35, 1), 
(50, 48, 2), 
(45, 42, 2), 
(35, 30, 3), 
(33, 30, 3), 
(60, 55, 4), 
(55, 52, 4), 
(25, 22, 5), 
(30, 27, 5), 
(38, 35, 6), 
(32, 30, 6), 
(40, 38, 7), 
(42, 40, 7), 
(35, 33, 8), 
(45, 42, 8), 
(50, 48, 9), 
(30, 29, 9), 
(20, 18, 10), 
(25, 24, 10);

SELECT 
    u.nome_usuario,
    u.email_usuario,
    u.telefone_usuario,
    e.nome_empresa,
    e.nomeFantasia_empresa,
    d.dataColeta_dado,
    d.temperatura_dado,
    c.ciclos_esperados,
    c.ciclos_reais,
    s.numero_sensor,
    s.numeroSala_sensor
FROM 
    tb_usuario u
JOIN 
    tb_login l ON u.fk_login = l.id_login
JOIN 
    tb_empresa e ON u.fk_empresa = e.id_empresa
JOIN 
    tb_sensor s ON e.id_empresa = s.fk_empresa
JOIN 
    tb_dado d ON s.id_sensor = d.fk_sensor
JOIN 
    tb_ciclo c ON s.id_sensor = c.fk_sensor;