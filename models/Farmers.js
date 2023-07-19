const db = require("../config/db");
const { ErrorResponse } = require("../utils/errorResponse");

class Farmer {
    // constructor(id, first_name, last_name, phone_number, age, address, crop) {
    //     this.id = id;
    //     this.first_name = first_name;
    //     this.last_name = last_name;
    //     this.phone_number = phone_number;
    //     this.age = age;
    //     this.address = address;
    //     this.crop = crop;
    // }
    static async createDatabase() { 
        return new Promise((resolve, reject) => {
            db.query('CREATE DATABASE IF NOT EXISTS CROP2CASH', (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async createTable() { 
        return new Promise((resolve, reject) => {
            db.query(`CREATE TABLE IF NOT EXISTS farmers (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                phone_number VARCHAR(255) NOT NULL,
                age INT NOT NULL,
                address VARCHAR(255) NOT NULL,
                crops VARCHAR(255) NOT NULL
            )`, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async createFarmer(farmer) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO farmers SET ?', farmer, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
  
    static async getFarmers(attributes, filter) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT ?? FROM farmers';
            let queryParams = [attributes];
        
            if (filter) {
                const [filter_Key, filter_Value] = filter.split(':');
        
                if (filter_Key === 'age') {
                    if (filter_Value.includes('-')) {
                        const [minAge, maxAge] = filter_Value.split('-');
                        query += ' WHERE age BETWEEN ? AND ?';
                        queryParams.push(minAge, maxAge);
                    } else {
                        query += ' WHERE age = ?';
                        queryParams.push(filter_Value);
                    }
                } else if (filter_Key === 'crops') {
                    query += ' WHERE crops LIKE ?';
                    queryParams.push(`%${filter_Value}%`);
                }
            }
        
            db.query(query, queryParams, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Farmer;