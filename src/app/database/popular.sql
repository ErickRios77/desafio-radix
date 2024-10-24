USE Leituras;

TRUNCATE leitura;

DROP PROCEDURE IF EXISTS randomMonitoramento ;
CREATE PROCEDURE randomMonitoramento (IN NumRows INT, IN MinVal INT, IN MaxVal INT, IN sensor VARCHAR(9))
    BEGIN
        DECLARE i INT;
        DECLARE varValor DECIMAL(5,2);
        SET i = 1;
        START TRANSACTION;
        WHILE i<=NumRows DO
            SET varValor = MinVal + RAND() * (MaxVal - MinVal);
            INSERT INTO leitura (equipmentID, dataLeitura, valor) VALUES (sensor, CURDATE()-INTERVAL i DAY, varValor);
            SET i = i + 1;
        END WHILE;
        COMMIT;
    END;

CALL randomMonitoramento(30, 5, 30, "EQ-12544");
CALL randomMonitoramento(30, 5, 30, "EQ-12571");
CALL randomMonitoramento(30, 5, 30, "EQ-12536");
CALL randomMonitoramento(30, 5, 30, "EQ-12507");
CALL randomMonitoramento(30, 5, 30, "EQ-12526");
CALL randomMonitoramento(30, 5, 30, "EQ-12552");
CALL randomMonitoramento(30, 5, 30, "EQ-12565");

SELECT * FROM leitura;