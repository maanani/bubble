CREATE TABLE IF NOT EXISTS todocategories ( `idCategorie` INTEGER NOT NULL UNIQUE, `nomCategorie` TEXT NOT NULL, PRIMARY KEY(`idCategorie`) );
CREATE TABLE IF NOT EXISTS todolistes ( `idTodo` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `categorieId` INTEGER NOT NULL, `title` TEXT NOT NULL, `description` TEXT,`isDone` INTEGER DEFAULT 0, FOREIGN KEY(`categorieId`) REFERENCES `todocategories`(`idCategorie`) );
INSERT INTO todocategories (idCategorie,nomCategorie) VALUES(1,'Administratif');
INSERT INTO todocategories (idCategorie,nomCategorie) VALUES(2,'Agence');
INSERT INTO todocategories (idCategorie,nomCategorie) VALUES(3,'Préparatif');
INSERT INTO todocategories (idCategorie,nomCategorie) VALUES(4,'Achats');
