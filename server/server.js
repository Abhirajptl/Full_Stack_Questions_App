import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import PostRoute from './routes/post.route.js'
import connectWithMongoDB from './db/Connection1.js'
import cors from 'cors'

app.use(cors({}));
    

connectWithMongoDB();

// For parsing application/json
app.use(express.json());

// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', PostRoute);

app.get('/',(req,res)=>{
    res.send({
        activeStatus:true,
        error:false,
    })
})

app.listen(8000, () => {
    console.log("Server is listening on port http://localhost:8000");
})

/*
Imagine you're filling out a form on a website, like when you're signing up for
something.This form might ask for your name and age.
When you click the "Submit" button, your web browser needs to send this information
to the server.One way it can do this is by using something called "URL encoding."
Here's what URL-encoded data looks like:

name=John+Doe&age=30

It's like a long string where each piece of information is connected with "&",
and spaces are replaced with "+".
Now, when this data reaches the server, the server needs to understand it.
That's where express.urlencoded() comes in.
express.urlencoded({ extended: true }) is like a translator for the server.
It takes this long string and turns it into something the server can easily use,
like this:
    {
        name: "John Doe",
        age: "30"
    }

Now the server can easily read your name and age!
The {extended: true} part allows this translator to handle more complex data,

like if you were sending a list of your favorite colors:
URL-encoded: favorites=red&favorites=blue&favorites=green
Translated:
{
    favorites: ["red", "blue", "green"]
}

Without this "translator"(middleware), when your server tries to read req.body,
it would just see the original string, which isn't very useful.

*/