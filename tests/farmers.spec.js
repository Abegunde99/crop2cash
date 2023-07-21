const app = require("../app");
const request = require("supertest");
const db = require("../config/db");

describe("Farmers", () => { 
    beforeAll(async () => {
        db.query('CREATE DATABASE IF NOT EXISTS CROP2CASH');
        db.query(`CREATE TABLE IF NOT EXISTS farmers (
            id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            phone_number VARCHAR(255) NOT NULL,
            age INT NOT NULL,
            address VARCHAR(255) NOT NULL,
            crops VARCHAR(255) NOT NULL
        )`);
    });

    it("should create a farmer", async () => {
        const res = await request(app)
            .post("/api/v1/farmers")
            .send({
                first_name: "John",
                last_name: "Doe",
                phone_number: "08012345678",
                age: 20,
                address: "No 1, John Doe Street, Lekki, Lagos",
                crops: "Rice, Beans, Maize"
            });
        expect(200);
        expect(res.body).toHaveProperty("success");
        expect(res.body).toHaveProperty("message");
    });

    it("should get all farmers", async () => {
        const res = await request(app).get("/api/v1/farmers");
        expect(200);
        expect(res.body).toHaveProperty("success");
        expect(res.body).toHaveProperty("message");
        expect(res.body).toHaveProperty("data");
    });
});