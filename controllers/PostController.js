import PostModel from '../models/Post.js'
export const getLastTags = async (req, res) => {
try {
const posts = await PostModel.find().limit(5).exec() //finde(js) без аргумента выводит всё
const tags = posts.map((obj) => obj.tags).flat().slice(0, 5)
res.json(tags)  // limit 5 у полседних пяти статей бер'т теги
}
catch (err) {
console.log(err)
res.status(500).json({
    message: 'Не могу получить теги'
})

}
}
export const getAll = async (req, res) => {
try {
    const posts = await PostModel.find().populate('user').exec(); //exec ищет совпадение в регуляной строке// Вернуть все статьи
    res.json(posts); // Вернуть массив всех статей //Populate заменяет ключи на обїекті(Mongoose)
} catch (err) {
console.log(err);
res.status(600).json({
    message: 'Не удалось получить статьи'
})
}
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id; // получить динамический айди
        PostModel.findOneAndUpdate (
            {
            _id: postId
        }, {
        $inc: {viewsCount: 1}  // Задать количество просмотров   
        },
        {
    returnDocument: 'after' // После обновления вернуть актуальній документ
        }
        
        ).then(
            (doc, err) => {
                if (err){
                console.log(err);
                return res.status(500).json({
                message: "Не удалось вернуть статью"
                });
                } 
                
                if(!doc) { 
                 return res.status(404).json({
                    message: 'Статья не найдена'
                 });   
                }
                res.json(doc);
                
                    }
    
        )} 
     catch (err) {
    console.log(err);
    res.status(500).json({
    message: "Не удалось получить статьи"
    });
     }
    }

export const remove = async (req, res) => {
    try {
        const postId = req.params.id; // получить динамический айди
       PostModel.findOneAndDelete({
        _id: postId,
       }).then( (doc, err) => {
if(err) {
    console.log(err);
    return res.status(500).json({
    message: "Не удалось удалить статью"
    });
}
if(!doc) { 
    return res.status(404).json({
       message: 'Статья не найдена'
    });   
   }
res.json({
success: true

});
       });
     } 
     catch (err) {
    console.log(err);
    res.status(500).json({
    message: "Не удалось получить статьи"
    });
     }
    }
    
    

export const create = async (req, res) => {
try {
const doc = new PostModel({
title: req.body.title,
text: req.body.text,
imageUrl: req.body.imageUrl,
tags: req.body.tags,
user: req.userId,
});

const post = await doc.save();
res.json(post)
} catch (err) {
   
        console.log(err);
res.status(500).json({
message: "Не удалось создать статью"
});

    }
}

export const update = async (req, res) => {
try {
const postId = req.params.id;
await PostModel.updateOne(
{
_id: postId
},
{
    title: req.body.title,
    text: req.body.text,
    imageUrl: req.body.imageUrl,
    tags: req.body.tags,
    user: req.userId,   
}
);
res.json({
    sucess:true
})
} catch (err) {
console.log(err);
res.status(500).json({
message: 'Не удалось обновить статью'
}
)

}
}

