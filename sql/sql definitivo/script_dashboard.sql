SELECT * FROM tb_usuario;
SELECT * FROM tb_empresa;
SELECT * FROM tb_sensor;
SELECT * FROM tb_dado;
SELECT * FROM tb_alerta;

-- Trazendo nome, email do usuario e nome da empresa
-- Ja trazemos o id da empresa tbm para que possamos realizar outras consultas futuramente
SELECT 
	u.nome_usuario AS nome_usuario,
    u.email_usuario AS email_usuario,
    e.nome_empresa AS nome_empresa,
    e.id_empresa AS id_empresa
FROM tb_usuario AS u
JOIN tb_empresa AS e
ON u.fk_empresa = e.id_empresa
WHERE e.id_empresa = 1;

-- Trazendo os dados da sala e do sensor, para popular os "filtros"
SELECT
	s.id_sensor AS id_sensor,
	s.numeroSala_sensor AS sala_sensor,
    s.numero_sensor AS num_sensor
FROM tb_empresa AS e
JOIN tb_sensor AS s
ON s.fk_empresa = e.id_empresa
WHERE e.id_empresa = 1;

-- qnd selecionarmos a sala, deverá rodar essa query, pra pegar os sensores da sala específica
SELECT 
	s.id_sensor AS id_sensor,
	s.numeroSala_sensor AS sala_sensor
FROM tb_empresa AS e
JOIN tb_sensor AS s
ON s.fk_empresa = e.id_empresa
WHERE e.id_empresa = 1 AND s.numeroSala_sensor = 101;

-- Trazendo as datas que temos registro, para popularmos os filtros, de acordo com um sensor selecionado
SELECT 
	DISTINCT d.dataColeta_dado AS data_dado
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
WHERE s.id_sensor = 1;

-- Trazendo os dados de um sensor específico, e de uma sala específica
SELECT 
	d.dataColeta_dado AS data_dado,
    d.temperatura_dado AS temp_dado
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
WHERE s.id_sensor = 1
AND s.numeroSala_sensor = 101;

-- Pegando o ultimo dado, ou seja, temperatura atual
SELECT 
	d.dataColeta_dado AS data_dado,
    d.temperatura_dado AS temp_dado
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
WHERE s.id_sensor = 1
AND s.numeroSala_sensor = 101
ORDER BY d.id_dado DESC
LIMIT 1;


-- temperatura maxima
SELECT 
    MAX(d.temperatura_dado) AS temp_max
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
WHERE s.id_sensor = 1
AND s.numeroSala_sensor = 101;

-- temperatura minima
SELECT 
    MIN(d.temperatura_dado) AS temp_min
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
WHERE s.id_sensor = 1
AND s.numeroSala_sensor = 101;

-- média
SELECT 
    ROUND(AVG(d.temperatura_dado),2) AS temp_media
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
WHERE s.id_sensor = 1
AND s.numeroSala_sensor = 101;

-- quantiade de alertas por sala
SELECT 
	COUNT(a.id_alerta) AS qtd_alerta
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
JOIN tb_alerta AS a
ON a.fk_dado = d.id_dado
WHERE s.id_sensor = 1
AND s.numeroSala_sensor = 101;

-- alertas especifico da sala, por dia
SELECT 
	COUNT(a.id_alerta) AS qtd_alerta,
    d.dataColeta_dado AS data_dado
FROM tb_dado AS d
JOIN tb_sensor AS s
ON d.fk_sensor = s.id_sensor
JOIN tb_alerta AS a
ON a.fk_dado = d.id_dado
WHERE s.id_sensor = 1
AND s.numeroSala_sensor = 101
GROUP BY d.dataColeta_dado;
