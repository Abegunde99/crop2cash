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
    static async createDatabase(database) { 
        return new Promise((resolve, reject) => {
            db.query(`CREATE DATABASE IF NOT EXISTS ${database} `, (err, result) => {
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

    static async createFarmer({first_name, last_name, phone_number, age, address,crops}) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO farmers SET ?', {first_name, last_name, phone_number, age, address,crops}, (err, result) => {
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

            if (!attributes) {
                query = 'SELECT * FROM farmers';
                queryParams = [];
            } else {
                if (attributes.includes(',')) {
                    const attributesArray = attributes.split(',');
                    for (let i = 0; i < attributesArray.length; i++) {
                        attributesArray[i] = attributesArray[i].trim();
                    }
                    queryParams = [attributesArray];
                }
            }
            
            if(filter === undefined && attributes === undefined) {
                query = 'SELECT * FROM farmers';
                queryParams = [];
            }

        
            if (filter) {
                if (filter.includes(',')) {
                    const filterArray = filter.split(',');
                    for (let i = 0; i < filterArray.length; i++) {
                        filterArray[i] = filterArray[i].trim();
                    }
                    filter = filterArray;
                }
                if (typeof filter === 'object') {
                    filter.forEach((filter) => {
                        const [filter_Key, filter_Value] = filter.split(':');
                        if (filter_Key === 'age') {
                            if (filter_Value.includes('-')) {
                                const [minAge, maxAge] = filter_Value.split('-');
                                if (query.includes('WHERE')) {
                                    query += ' AND age BETWEEN ? AND ?';
                                } else {
                                    query += ' WHERE age BETWEEN ? AND ?';
                                }
                                queryParams.push(minAge, maxAge);
                            } else {
                                if (query.includes('WHERE')) {
                                    query += ' AND age = ?';
                                } else {
                                    query += ' WHERE age = ?';
                                }
                                queryParams.push(filter_Value);
                            }
                        }
                        if (filter_Key !== 'age' && filter_Key !== 'crops') {
                            if (query.includes('WHERE')) {
                                query += ' AND ?? = ?';
                            } else {
                                query += ' WHERE ?? = ?';
                            }
                            queryParams.push(filter_Key, filter_Value);
                        }

                        if (filter_Key === 'crops') {
                            if (query.includes('WHERE')) {
                                query += ' AND crops LIKE ?';
                            } else {
                                query += ' WHERE crops LIKE ?';
                            }
                            queryParams.push(`%${filter_Value}%`);
                        }

                        if(filter_Key != 'age' && filter_Key != 'crops' && filter_Key != 'first_name' && filter_Key != 'last_name' && filter_Key != 'phone_number' && filter_Key != 'address') {
                            reject(new ErrorResponse(`Invalid filter key: ${filter_Key}`, 400));
                        }
                    });
                } else {
                    let [filter_Key, filter_Value] = filter.split(':');
        
                    if (filter_Key === 'age') {
                        if (filter_Value.includes('-')) {
                            const [minAge, maxAge] = filter_Value.split('-');
                            query += ' WHERE age BETWEEN ? AND ?';
                            queryParams.push(minAge, maxAge);
                        } else {
                            query += ' WHERE age = ?';
                            queryParams.push(filter_Value);
                        }
                    }

                    if (filter_Key !== 'age' && filter_Key !== 'crops') {
                        query += ' WHERE ?? = ?';
                        queryParams.push(filter_Key, filter_Value);
                    }

                    if (filter_Key === 'crops') {
                        query += ' WHERE crops LIKE ?';
                        queryParams.push(`%${filter_Value}%`);
                    }

                    if(filter_Key != 'age' && filter_Key != 'crops' && filter_Key != 'first_name' && filter_Key != 'last_name' && filter_Key != 'phone_number' && filter_Key != 'address') {
                        reject(new ErrorResponse(`Invalid filter key: ${filter_Key}`, 400));
                    }
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