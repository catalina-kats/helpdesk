
-- Index

--Scrum masters, devs, testers y demases filtran sus tickets continuamente segun su estado, ya que deben estar revisando constanemente el flujo de resolucion de tickets, avanzar en lo pendiente y observar los tickets resueltos, por lo que hace sentido crear un indice para esta columna.
CREATE INDEX IX_Tickets_Status     ON dbo.Tickets  (Status);

--Cada vez que se visite el detalle de un ticket, apareceran todos sus comentarios, por lo que es necesario optimizar para que no escanee toda la tabla cada vez que abramos dicho modal
CREATE INDEX IX_Comments_TicketId  ON dbo.Comments (TicketId);


--Mejoras
---Agregaria una tabla para llevar una auditoria de todo lo que sucede en la base de datos, lo que se modifica, lo que se crea y lo que se 'elimina'
---Integraria triggers para el caso de arriba, asi se registran automaticamente los movimientos
---Implementaria mas constraints para Status y Priority segun reglas de negocio

--Posibles antipatrones
---El unico que se me ocurre es que las subconsultas (como la utilizada en el caso 2) pueden ser poco optimas para la base de datos y probablemente haya una forma mas eficiente de realizar la consulta
