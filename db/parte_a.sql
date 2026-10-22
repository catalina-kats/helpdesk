
-- Database clear
IF OBJECT_ID('dbo.Comments', 'U') IS NOT NULL DROP TABLE dbo.Comments;
IF OBJECT_ID('dbo.Tickets',  'U') IS NOT NULL DROP TABLE dbo.Tickets;
IF OBJECT_ID('dbo.Users',    'U') IS NOT NULL DROP TABLE dbo.Users;
GO

--Users
CREATE TABLE dbo.Users (
    Id          INT IDENTITY(1,1) NOT NULL,
    Email       NVARCHAR(256) NOT NULL,
    DisplayName NVARCHAR(100) NOT NULL,
    CONSTRAINT PK_Users PRIMARY KEY (Id),
    CONSTRAINT UQ_Users_Email UNIQUE (Email)
);
GO

-- Tickets
CREATE TABLE dbo.Tickets (
    Id          INT IDENTITY(1,1) NOT NULL,
    Title       NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX) NULL,
    Status      INT NOT NULL,
    Priority    INT NOT NULL,
    CreatedAt   DATETIME2 NOT NULL,
    UpdatedAt   DATETIME2 NULL,
    CreatedBy   INT NOT NULL,
    CONSTRAINT PK_Tickets PRIMARY KEY (Id),
    CONSTRAINT FK_Tickets_Users_CreatedBy FOREIGN KEY (CreatedBy)
        REFERENCES dbo.Users (Id)
);
GO

--Comments
CREATE TABLE dbo.Comments (
    Id        INT IDENTITY(1,1) NOT NULL,
    TicketId  INT NOT NULL,
    Text      NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL,
    CreatedBy INT NOT NULL,
    CONSTRAINT PK_Comments PRIMARY KEY (Id),
    CONSTRAINT FK_Comments_Tickets_TicketId FOREIGN KEY (TicketId)
        REFERENCES dbo.Tickets (Id) ON DELETE CASCADE,
    CONSTRAINT FK_Comments_Users_CreatedBy FOREIGN KEY (CreatedBy)
        REFERENCES dbo.Users (Id)
);
GO


GO


-- Test data
INSERT INTO dbo.Users (Email, DisplayName) VALUES
    ('ana.garcia@example.com',   'Ana Garcia'),
    ('luis.perez@example.com',   'Luis Perez'),
    ('maria.lopez@example.com',  'Maria Lopez'),
    ('support@example.com',      'Support Agent');
GO

INSERT INTO dbo.Tickets (Title, Description, Status, Priority, CreatedAt, UpdatedAt, CreatedBy) VALUES
    ('Cannot log in to the portal',
     'I get an "invalid credentials" error even after resetting my password.',
     0, 2, '2026-10-15T09:12:00', NULL, 1),

    ('Printer on 2nd floor is offline',
     'The shared printer does not respond since this morning.',
     1, 1, '2026-10-16T08:30:00', '2026-10-16T10:05:00', 2),

    ('Request for a new monitor',
     'My current monitor flickers. I would like a replacement.',
     0, 0, '2026-10-17T14:45:00', NULL, 3),

    ('VPN disconnects every few minutes',
     'The VPN drops while working from home, mostly in the afternoon.',
     2, 2, '2026-10-12T11:00:00', '2026-10-18T16:20:00', 1),

    ('Email signature not updating',
     'The new company signature does not show up in Outlook.',
     3, 0, '2026-10-05T13:10:00', '2026-10-08T09:00:00', 2),

    ('Server room temperature alert',
     'Monitoring reported temperatures above the threshold.',
     1, 3, '2026-10-20T07:50:00', '2026-10-20T08:15:00', 4);
GO

INSERT INTO dbo.Comments (TicketId, Text, CreatedAt, CreatedBy) VALUES
    (1, 'Could you tell us which browser you are using?',            '2026-10-15T09:40:00', 4),
    (1, 'Chrome, latest version. Same result in incognito mode.',    '2026-10-15T10:05:00', 1),
    (2, 'We are checking the print server now.',                     '2026-10-16T09:00:00', 4),
    (2, 'Restarted the spooler service, please test again.',         '2026-10-16T10:05:00', 4),
    (2, 'Working again, thanks!',                                    '2026-10-16T10:20:00', 2),
    (4, 'Updated the VPN client to the latest version.',             '2026-10-17T15:00:00', 4),
    (4, 'Stable for two days now, marking as resolved.',             '2026-10-18T16:20:00', 4),
    (5, 'Signature deployed through the admin console.',             '2026-10-08T09:00:00', 4),
    (6, 'On-site technician has been notified.',                     '2026-10-20T08:15:00', 4),
    (6, 'Signature deployed through the admin console.',             '2026-10-08T09:00:00', 4),
    (6, 'Cant look into this right now.',                            '2026-10-20T08:15:00', 4);
GO
