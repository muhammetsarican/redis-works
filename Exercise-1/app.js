const redis = require("redis");
const client = redis.createClient()

client.on("message", (channel, msg)=>{
    console.log(`${channel} isimli kanala ${msg} geldi.`)
});

client.connect().then(() => {
    console.log("connected")
    // If you subscribe to a channel, if someone sends a message to that channel, you can see the message with the code above.
    client.subscribe("muhammetsarican");

    // SET, you can fill a variable with your datas.
    client.set("user_name", "Muhammet", (err, msg)=>{
        if(err){
            console.log(err);
        }
        console.log(msg);
    });

    // GET, it gets your datas.
    client.get("user_name",(err, msg)=>{
        if(err){
            console.log(err);
        }
        console.log(msg);
    });

    // EXISTS, it checks is your variable exist or not.
    client.exists("user_name", (err, msg)=>{
        if(err){
            console.log(err);
        }
        console.log(msg?"Exist":"Not Exist");
    });
    
    // DEL, it deletes data as you know.
    client.del("user_name", (err, msg)=>{
        if(err){
            console.log(err);
        }
        console.log(msg?"Deleted":"Delete process was fail");
    });
    // APPEND, it adds the data on previous data.
    client.append("last_name", "Sarıcan", (err, msg)=>{
        if(err){
            console.log(err);
        }
        console.log(msg?"Appended": "Not Append");
        client.get("last_name", (err, msg)=>{
            if(err){
                console.log(err);
            }
            console.log(msg);
        })
    });
    //  FLUSHALL deletes all keys.
    client.flushAll();
    // You can add a data as json.
    client.set("user", JSON.stringify({
        name:"Muhammet",
        surname:"Sarıcan",
        age:24,
        isStudying:true
    }), (err, msg)=>{
        if(err){
            console.log(err);
        }
        console.log(msg);
    });
    client.get("user", (err, msg)=>{
        if(err){
            console.log(err);
        }
        console.log(msg);
    });
    client.publish("muhammetsarican", "I love coding");
})
.catch((err)=>console.error(err))