const express = require('express');
const db = require(__dirname + '/../modules/mysql-connect');

const moment = require('moment-timezone');
const Joi = require('joi');
const upload = require(__dirname + '/../modules/upload-images')

const router = express.Router(); // 建立 router 物件
const fake_user = 5;

const getUserCart = async(user_id)=>{
    const sql = `SELECT p.*, c.quantity
    FROM carts c
    JOIN products p
    ON c.product_id=p.sid
    WHERE user_id=?
    ORDER BY c.created_at`;

    const [r] = await db.query(sql, [user_id]);
    return r;
};


router.post('/', async (req, res)=>{

    const output = {
        success: false,
        error: ''
    }

    if (!req.body.product_id || !req.body.quantity){
        output.error = '參數不足';
        return res.json(output);
    }

    if ( +req.body.quantity <1){
        output.error = '數量不能小於 1';
        return res.json(output);
    }

})





router.use((req, res, next)=>{

    next();
});
// CRUD

router.post('/', async (req, res)=>{
    // product_id, quantity
});

router.get('/', async (req, res)=>{

});

router.put('/', async (req, res)=>{
    // product_id, quantity
});
router.delete('/', async (req, res)=>{
    // product_id
});

module.exports = router;