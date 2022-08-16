const express = require('express');
const router = express.Router();
const todos = require('../models/express-models/todos');
module.exports = router;

// parses url-encoded bodies
router.use(express.urlencoded({ extended: false }));

// parses json bodies
router.use(express.json())

// write your routes here. Feel free to split into multiple files if you like.
router.get('/', (req, res, next) => {
    try {
      res.send(todos.listPeople());
    } catch (error) {
      next(error);
    }
  });

router.get('/:name/tasks', (req, res, next) => {
    try {
        let name = req.params.name;
        let def = todos.list(name);
        let filters = req.query;

        if(filters.status){
            res.send(todos.filter(name, filters.status));
        }

        if(def == undefined){
            res.status(404).json({message:'Not Found'});
        }
        let namedTasks = todos.list(req.params.name);
        res.send(namedTasks);
    } catch (error) {
        next(error);
    }
});

router.post('/:name/tasks', (req, res, next) => {
    try{
        let post = req.body
        let name = req.params.name;
        let result = todos.add(name,post);

        if(post.content === '' || post.content == undefined){
            res.sendStatus(400).json({message:'Bad Request'});
        }

        else if(todos.list(name) == undefined){
            res.status(404).json({message:'Not Found'});
        }
        else{
            res.send(result);
            res.sendStatus(201).json({message:'Created'})
        }
    }
    catch(err){
        next(err);
    }
})

router.put('/:name/tasks/:idx', (req, res, next) => {
    try{
        let name = req.params.name;
        let idx = req.params.idx;

        res.send(todos.complete(name,idx));
    }
    catch(err){
        next(err);
    }
})

router.delete('/:name/tasks/:idx', (req, res, next) => {
    try{
        let name = req.params.name;
        let idx = req.params.idx;

        todos.remove(name,idx);

        res.sendStatus(204);
    }
    catch(err){
        next(err);
    }
})