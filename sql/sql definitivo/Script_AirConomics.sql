
	create database AirConomics;
	use AirConomics;

	create table tb_endereco(
	id_endereco int primary key auto_increment,
	rua varchar(65),
	bairro varchar(65),
	cidade varchar(65),
	cep char(10),
	estado char(2),
	complemento varchar(100),
	numero varchar(5)
	);
	create table tb_empresa(
	id_empresa int primary key auto_increment,
	nome_empresa varchar(45),
	cnpj_empresa char(14),
	nomeFantasia_empresa varchar(45),
	RazaoSocial_empresa varchar(45),
	responsavel_empresa varchar(45),
	telefone_responsavel char(13),
	fk_endereco int,
	constraint fk_endereco foreign key (fk_endereco) references tb_endereco(id_endereco));


	create table tb_usuario(
	id_usuario int primary key auto_increment,
	nome_usuario varchar(45),
	telefone_usuario char(13),
	email_login varchar(45),
	senha_login varchar(100),
	dt_nascimento DATE,
	fk_empresa int,
	usuario_tecnico BOOLEAN
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

	create table tb_alerta (
	id_alerta int auto_increment,
	fk_dado int,
	constraint fk_dado foreign key (fk_dado) references tb_dado(id_dado),
	primary key(id_alerta,fk_dado)
	);

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

	insert into tb_usuario (nome_usuario, email_usuario, telefone_usuario, fk_empresa) values 
	('Lucas Almeida', 'lucas.almeida@email.com', '11987654321',1), 
	('Fernanda Costa', 'fernanda.costa@email.com', '21987654321', 2), 
	('Marcos Oliveira', 'marcos.oliveira@email.com', '31987654321', 3), 
	('Juliana Ferreira', 'juliana.ferreira@email.com', '41987654321', 4), 
	('Renato Santos', 'renato.santos@email.com', '51987654321', 5), 
	('Carla Martins', 'carla.martins@email.com', '61987654321', 6), 
	('Eduardo Lima', 'eduardo.lima@email.com', '71987654321', 7), 
	('Patricia Rocha', 'patricia.rocha@email.com', '81987654321', 8), 
	('Felipe Souza', 'felipe.souza@email.com', '91987654321', 9), 
	('Ana Beatriz', 'ana.beatriz@email.com', '11976543210', 10);

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

	SELECT 
		d.temperatura_dado as "Temperatura",
		dataColeta_dado as "Data da coleta",
		s.numero_sensor as "Numero do sensor",
		s.numeroSala_sensor as "Numero da sala",
		e.nome_empresa as "Nome da emoresa",
		e.nomeFantasia_empresa as "Nome fantasia"
	FROM 
		tb_usuario as u
	JOIN 
		tb_empresa as e ON u.fk_empresa = e.id_empresa
	JOIN 
		tb_sensor as s ON e.id_empresa = s.fk_empresa
	JOIN 
		tb_dado as d ON s.id_sensor = d.fk_sensor
	WHERE 
		e.nome_empresa = "Banco do Brasil";