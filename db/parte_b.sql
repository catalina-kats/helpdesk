
-- Caso 1
DECLARE @Page     INT = 1;
DECLARE @PageSize INT = 3;
 
SELECT t.Id, t.Title, t.Status, t.Priority, u.DisplayName AS Creator,
       (SELECT COUNT(*) FROM dbo.Comments c WHERE c.TicketId = t.Id) AS CommentCount,
       COUNT(*) OVER () AS TotalCount 
FROM dbo.Tickets t
JOIN dbo.Users u ON u.Id = t.CreatedBy
ORDER BY t.CreatedAt DESC, t.Id DESC
OFFSET (@Page - 1) * @PageSize ROWS
FETCH NEXT @PageSize ROWS ONLY;
GO

-- Caso 2
SELECT DISTINCT TOP 5 u.DisplayName AS Creator,
       (SELECT COUNT(*) FROM dbo.Comments c WHERE c.TicketId = t.Id) AS CommentCount
FROM dbo.Tickets t
JOIN dbo.Users u ON u.Id = t.CreatedBy
ORDER BY CommentCount DESC 

-- Caso 3
SELECT *
FROM dbo.Tickets t
WHERE t.Title LIKE '%Q%' COLLATE SQL_Latin1_General_CP1_CI_AS OR t.Description LIKE '%Q%' COLLATE SQL_Latin1_General_CP1_CI_AS

-- Caso 4
DECLARE @DaysLate    INT = -3;
SELECT *
FROM dbo.Tickets t
WHERE t.CreatedAt <= DATEADD(DAY, @DaysLate, SYSUTCDATETIME())
AND t.Status != 3
ORDER BY t.CreatedAt
GO