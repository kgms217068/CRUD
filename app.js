const express = require('express');
const mongoose = require('mongoose');
const Diary = require('./models/Diary');
const app = express();

mongoose.connect('mongodb://localhost:27017/diaryApp');

app.use(express.json());

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use((req, res, next) => {
  console.log('🛠', req.method, req.url);
  next();
});

//전체 조회
app.get('/diaries',async (req, res) => {
    const diaries = await Diary.find().sort({date: -1});
    res.render('diaries',{diaries}); //ejs 템플릿으로 넘김
})

app.get('/diaries/new', (req, res) => {
    res.render('new');
})

//작성
app.post('/diaries',async (req, res) => {
    const newDiary = new Diary(req.body);
    await newDiary.save();
    res.redirect('/diaries'); //다시목록으로 이동동
})

app.get('/diaries/:id/edit',async(req,res) => {
    const diary = await Diary.findById(req.params.id);
    res.render('edit', {diary});
    
})

//수정
app.put('/diaries/:id/', async (req, res) => {
    const { id } = req.params;
    const { title, content }= req.body;
  await Diary.findByIdAndUpdate(id, { title, content });
    
    res.redirect('/diaries');
});

app.delete('/diaries/:id', async (req, res) => {
        await Diary.findByIdAndDelete(req.params.id);
        res.redirect('/diaries');
});

app.listen(3000, ()=> console.log('서버 실행 중'));