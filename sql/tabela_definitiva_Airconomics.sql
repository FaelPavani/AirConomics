create database Pesquisa_e_Inovacao;

use pesquisa_e_inovacao;

create table tb_login (
id_login int primary key auto_increment,
usuario_login varchar(45),
senha_login varchar(26)
);

insert into tb_login (usuario_login, senha_login) values
('ana.silva', MD5('A1234@ana!')),
('bruno.rodrigues', MD5('Bruno#2024$')),
('carla.martins', MD5('C@rlaM123')),
('davi.souza', MD5('D@vi#Pass!')),
('elena.junior', MD5('Elen@2023*')),
('felipe.oliveira', MD5('F3lipe*Secure')),
('gabriela.pereira', MD5('G@briela22!')),
('henrique.tavares', MD5('Henriq#2024')),
('isabela.garcia', MD5('Is@bel4#Pass')),
('joao.santos', MD5('J0a0$S@nt0s!'));


create table tb_usuario (
id_usuario int primary key auto_increment,
 nome_usuario varchar(55),
 email_usuario varchar(55),
 telefone_usuario char(13),
 fk_login int,
 constraint fk_login foreign key (fk_login)
 references tb_login(id_login)
 );
 
insert into tb_usuario (nome_usuario, email_usuario, telefone_usuario, fk_login) values
('Ana Silva', 'ana.silva@example.com', '1191234-5678', 1),
('Bruno Rodrigues', 'bruno.rodrigues@example.com', '2199876-5432', 2),
('Carla Martins', 'carla.martins@example.com', '3198765-4321', 3),
('Davi Souza', 'davi.souza@example.com', '4197654-3210', 4),
('Elena Junior', 'elena.junior@example.com', '5196543-2109', 5),
('Felipe Oliveira', 'felipe.oliveira@example.com', '6195432-1098', 6),
('Gabriela Pereira', 'gabriela.pereira@example.com', '7194321-0987', 7),
('Henrique Tavares', 'henrique.tavares@example.com', '8193210-9876', 8),
('Isabela Garcia', 'isabela.garcia@example.com', '9192109-8765', 9),
('João Santos', 'joao.santos@example.com', '1191098-7654', 10);

create table tb_endereco (
id_endereco int primary key auto_increment,
 rua varchar (45),
 bairro varchar(45),
 cidade varchar(45),
 cep char(9),
 estado char(2)
 );
 
 insert into tb_endereco (rua, bairro, cidade, cep, estado) values
('Rua das Flores', 'Jardim das Acácias', 'São Paulo', '01234-567', 'SP'),
('Avenida Brasil', 'Centro', 'Rio de Janeiro', '23456-789', 'RJ'),
('Rua 15 de Novembro', 'Bairro Alto', 'Curitiba', '34567-890', 'PR'),
('Avenida dos Trabalhadores', 'Vila Nova', 'Belo Horizonte', '45678-901', 'MG'),
('Rua do Comércio', 'Centro Histórico', 'Salvador', '56789-012', 'BA'),
('Rua das Palmeiras', 'Jardim Botânico', 'Brasília', '67890-123', 'DF'),
('Avenida Paulista', 'Consolação', 'São Paulo', '78901-234', 'SP'),
('Rua dos Lírios', 'Vila Mariana', 'São Paulo', '89012-345', 'SP'),
('Rua das Orquídeas', 'Vila da Serra', 'Nova Lima', '90123-456', 'MG'),
('Avenida Santos Dumont', 'Aeroporto', 'Fortaleza', '01234-567', 'CE');

create table tb_empresa (
id_empresa int primary key auto_increment,
 nome_emresa varchar(45),
 email_empresa varchar(45),
 cnpj_empresa char(14),
 fk_usuario int,
 fk_endereco int,
 constraint fk_usuario foreign key (fk_usuario)
 references tb_usuario(id_usuario),
 constraint fk_endereco foreign key (fk_endereco)
 references tb_endereco(id_endereco)
 );
 
 insert into tb_empresa (nome_emresa, email_empresa, cnpj_empresa, fk_usuario, fk_endereco) values
('Tech Solutions', 'contato@techsolutions.com.br', '12345678000195', 1, 1),
('Green Energy', 'info@greenenergy.com.br', '23456789000156', 2, 2),
('Educação Digital', 'suporte@educacaodigital.com.br', '34567890000167', 3, 3),
('Comércio Local', 'vendas@comerciolocal.com.br', '45678901000178', 4, 4),
('Saúde em Foco', 'contato@saudeemfoco.com.br', '56789012000189', 5, 5),
('Viagens Incríveis', 'reservas@viagensincriveis.com.br', '67890123000190', 6, 6),
('Moda & Estilo', 'atendimento@modaestilo.com.br', '78901234000101', 7, 7),
('Alimentos Naturais', 'info@alimentosnaturais.com.br', '89012345000112', 8, 8),
('Construções Sólidas', 'orçamento@construcoessolidas.com.br', '90123456000123', 9, 9),
('Beleza e Estética', 'contato@belezaestetica.com.br', '01234567000134', 10, 10);
 

create table tb_dado (
id_dado int auto_increment,
dataColeta_dado datetime not null,
temp_dado float,
fk_empresa int,
primary key (id_dado, fk_empresa),
constraint fk_empresa foreign key(fk_empresa)
references tb_empresa(id_empresa)
);

insert into tb_dado (id_dado, dataColeta_dado, temp_dado, fk_empresa) values
(1, '2023-10-01 08:00:00', 22.5, 1),
(1, '2023-10-01 12:00:00', 23.0, 1),
(2, '2023-10-01 14:00:00', 21.5, 1),
(2, '2023-10-01 16:00:00', 22.0, 1),
(3, '2023-10-02 09:00:00', 25.0, 2),
(3, '2023-10-02 11:00:00', 24.8, 2),
(4, '2023-10-02 13:00:00', 23.5, 2),
(4, '2023-10-02 15:00:00', 24.0, 2),
(5, '2023-10-03 10:00:00', 19.0, 3),
(5, '2023-10-03 12:00:00', 18.5, 3),
(6, '2023-10-03 14:00:00', 19.5, 3),
(6, '2023-10-03 16:00:00', 20.0, 3),
(7, '2023-10-04 09:00:00', 26.0, 4),
(7, '2023-10-04 11:00:00', 25.5, 4),
(8, '2023-10-04 13:00:00', 24.0, 4),
(8, '2023-10-04 15:00:00', 24.5, 4),
(9, '2023-10-05 08:30:00', 22.2, 1),
(9, '2023-10-05 10:30:00', 22.8, 1),
(10, '2023-10-05 13:30:00', 23.1, 2),
(10, '2023-10-05 15:30:00', 23.7, 2),
(11, '2023-10-06 09:15:00', 20.5, 3),
(11, '2023-10-06 11:15:00', 21.0, 3);

