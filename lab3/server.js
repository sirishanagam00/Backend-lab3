
const express = require("express");
const connectDB = require("./db");

const app = express();
const PORT = 3000;

// Middleware to read JSON data
app.use(express.json());

// Start server and connect database
async function startServer() {
    const db = await connectDB();

    // 1. GET ALL BOOKS WITH SEARCH, SORTING AND FILTERING
    app.get("/books", async (req, res) => {
        try {
            const {
                search_q = "",
                order_by = "id",
                order = "ASC",
                limit = "10",
                offset = "0",
                min_price,
                max_price
            } = req.query;

            // Validate sorting column
            const allowedColumns = ["id", "title", "author", "price"];

            if (!allowedColumns.includes(order_by)) {
                return res.status(400).json({
                    message: "Invalid order_by column"
                });
            }

            // Validate sorting order
            const sortOrder = order.toUpperCase();

            if (!["ASC", "DESC"].includes(sortOrder)) {
                return res.status(400).json({
                    message: "Order must be ASC or DESC"
                });
            }

            // Validate limit and offset
            const pageLimit = Number(limit);
            const pageOffset = Number(offset);

            if (
                !Number.isInteger(pageLimit) ||
                !Number.isInteger(pageOffset) ||
                pageLimit < 1 ||
                pageOffset < 0
            ) {
                return res.status(400).json({
                    message: "Invalid limit or offset"
                });
            }

            // Build SQL query
            let sql = "SELECT * FROM books WHERE 1=1";
            const params = [];

            // Search by title
            if (search_q) {
                sql += " AND title LIKE ?";
                params.push(`%${search_q}%`);
            }

            // Minimum price filter
            if (min_price !== undefined) {
                const min = Number(min_price);

                if (!Number.isFinite(min) || min < 0) {
                    return res.status(400).json({
                        message: "Invalid minimum price"
                    });
                }

                sql += " AND price >= ?";
                params.push(min);
            }

            // Maximum price filter
            if (max_price !== undefined) {
                const max = Number(max_price);

                if (!Number.isFinite(max) || max < 0) {
                    return res.status(400).json({
                        message: "Invalid maximum price"
                    });
                }

                sql += " AND price <= ?";
                params.push(max);
            }

            if (
                min_price !== undefined &&
                max_price !== undefined &&
                Number(min_price) > Number(max_price)
            ) {
                return res.status(400).json({
                    message: "Minimum price cannot exceed maximum price"
                });
            }

            // Sorting
            sql += ` ORDER BY ${order_by} ${sortOrder}`;

            // Pagination
            sql += " LIMIT ? OFFSET ?";
            params.push(pageLimit, pageOffset);

            const books = await db.all(sql, params);

            res.status(200).json({
                message: "Books retrieved successfully",
                data: books
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });


    // 2. GET BOOK BY ID
    app.get("/books/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id < 1) {
                return res.status(400).json({
                    message: "Invalid book ID"
                });
            }

            const book = await db.get(
                "SELECT * FROM books WHERE id = ?",
                [id]
            );

            if (!book) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            res.status(200).json({
                message: "Book retrieved successfully",
                data: book
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });


    // 3. ADD NEW BOOK
    app.post("/books", async (req, res) => {
        try {
            const { title, author, price } = req.body;

            if (
                typeof title !== "string" ||
                title.trim() === ""
            ) {
                return res.status(400).json({
                    message: "Title is required"
                });
            }

            if (
                typeof author !== "string" ||
                author.trim() === ""
            ) {
                return res.status(400).json({
                    message: "Author is required"
                });
            }

            if (
                typeof price !== "number" ||
                !Number.isFinite(price) ||
                price < 0
            ) {
                return res.status(400).json({
                    message: "Price must be a valid non-negative number"
                });
            }

            const result = await db.run(
                "INSERT INTO books (title, author, price) VALUES (?, ?, ?)",
                [title.trim(), author.trim(), price]
            );

            const newBook = await db.get(
                "SELECT * FROM books WHERE id = ?",
                [result.lastID]
            );

            res.status(201).json({
                message: "Book added successfully",
                data: newBook
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });


    // 4. UPDATE BOOK
    app.put("/books/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { title, author, price } = req.body;

            if (!Number.isInteger(id) || id < 1) {
                return res.status(400).json({
                    message: "Invalid book ID"
                });
            }

            if (
                typeof title !== "string" ||
                title.trim() === ""
            ) {
                return res.status(400).json({
                    message: "Title is required"
                });
            }

            if (
                typeof author !== "string" ||
                author.trim() === ""
            ) {
                return res.status(400).json({
                    message: "Author is required"
                });
            }

            if (
                typeof price !== "number" ||
                !Number.isFinite(price) ||
                price < 0
            ) {
                return res.status(400).json({
                    message: "Price must be a valid non-negative number"
                });
            }

            const existingBook = await db.get(
                "SELECT * FROM books WHERE id = ?",
                [id]
            );

            if (!existingBook) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            await db.run(
                `UPDATE books
                 SET title = ?, author = ?, price = ?
                 WHERE id = ?`,
                [title.trim(), author.trim(), price, id]
            );

            const updatedBook = await db.get(
                "SELECT * FROM books WHERE id = ?",
                [id]
            );

            res.status(200).json({
                message: "Book updated successfully",
                data: updatedBook
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });


    // 5. DELETE BOOK
    app.delete("/books/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id < 1) {
                return res.status(400).json({
                    message: "Invalid book ID"
                });
            }

            const existingBook = await db.get(
                "SELECT * FROM books WHERE id = ?",
                [id]
            );

            if (!existingBook) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            await db.run(
                "DELETE FROM books WHERE id = ?",
                [id]
            );

            res.status(200).json({
                message: "Book deleted successfully"
            });

        } catch (error) {
            res.status(500).json({
                message: "Internal server error"
            });
        }
    });


    // Handle invalid routes
    app.use((req, res) => {
        res.status(404).json({
            message: "Route not found"
        });
    });

    // Start server
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

startServer().catch(error => {
    console.error("Failed to start server:", error);
});
