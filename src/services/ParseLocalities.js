// import { pool } from "./pool.js";
// import fs from "fs";

// function generateMySQLQueriesFromJSONLocalities(localities) {
//     const { localidades_censales } = JSON.parse(localities);
//     const buenosAiresLocalities = localidades_censales.filter(
//         (locality) => locality.provincia.id === "06",
//     );
//     const formattedData = buenosAiresLocalities.map((locality) => ({
//         id: locality.id,
//         name: locality.nombre,
//     }));

//     const values = formattedData
//         .map((data, index) => [index, data.name])
//         .slice(0, 40);

//     const query = `INSERT INTO locality (idlocality, locality_name) VALUES ${pool.escape(values)}`;

//     return query;
// }

// // Read JSON file using fs
// const filePath = "../../database/localities.json";
// const jsonData = fs.readFileSync(filePath, "utf8");

// // Generate the SQL query
// const sqlQuery = generateMySQLQueriesFromJSONLocalities(jsonData);

// // Write the query to an SQL file
// const outputFilePath = "../../database/insert-localities.sql";
// fs.writeFileSync(outputFilePath, sqlQuery, "utf8");

// console.log(`SQL query written to ${outputFilePath}`);
