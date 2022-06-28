const fs = require(`fs`);
const http = require(`http`);
const WebSocket = require(`ws`); // npm i ws
const uuid = require('uuid').v4;
const board = [
  [
    "card back",
    "card rank-2 spades",
    "card rank-3 spades",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-10 diams",
    "card rank-q diams",
    "card rank-k diams",
    "card rank-a diams",
    "card back",
  ],

  [
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-3 clubs",
    "card rank-2 clubs",
    "card rank-4 spades",
    "card rank-5 spades",
    "card rank-6 spades",
    "card rank-7 spades",
    "card rank-a clubs",
  ],

  [
    "card rank-7 clubs",
    "card rank-a spades",
    "card rank-2 diams",
    "card rank-3 diams",
    "card rank-4 diams",
    "card rank-k clubs",
    "card rank-q clubs",
    "card rank-10 clubs",
    "card rank-8 spades",
    "card rank-k clubs",
  ],

  [
    "card rank-8 clubs",
    "card rank-k spades",
    "card rank-6 clubs",
    "card rank-5 clubs",
    "card rank-4 clubs",
    "card rank-9 hearts",
    "card rank-8 hearts",
    "card rank-9 clubs",
    "card rank-9 spades",
    "card rank-6 spades",
  ],

  [
    "card rank-9 clubs",
    "card rank-q spades",
    "card rank-7 clubs",
    "card rank-6 hearts",
    "card rank-5 hearts",
    "card rank-2 hearts",
    "card rank-7 hearts",
    "card rank-8 clubs",
    "card rank-10 spades",
    "card rank-10 clubs",
  ],

  [
    "card rank-a spades",
    "card rank-7 hearts",
    "card rank-9 diams",
    "card rank-a hearts",
    "card rank-4 hearts",
    "card rank-3 hearts",
    "card rank-k hearts",
    "card rank-10 diams",
    "card rank-6 hearts",
    "card rank-2 diams",
  ],

  [
    "card rank-k spades",
    "card rank-8 hearts",
    "card rank-8 diams",
    "card rank-2 clubs",
    "card rank-3 clubs",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-q diams",
    "card rank-5 hearts",
    "card rank-3 diams",
  ],

  [
    "card rank-q spades",
    "card rank-9 hearts",
    "card rank-7 diams",
    "card rank-6 diams",
    "card rank-5 diams",
    "card rank-a clubs",
    "card rank-a diams",
    "card rank-k diams",
    "card rank-4 hearts",
    "card rank-4 diams",
  ],

  [
    "card rank-10 spades",
    "card rank-10 hearts",
    "card rank-q hearts",
    "card rank-k hearts",
    "card rank-a hearts",
    "card rank-3 spades",
    "card rank-2 spades",
    "card rank-2 hearts",
    "card rank-3 hearts",
    "card rank-5 diams",
  ],

  [
    "card back",
    "card rank-9 spades",
    "card rank-8 spades",
    "card rank-7 spades",
    "card rank-6 spades",
    "card rank-9 diams",
    "card rank-8 diams",
    "card rank-7 diams",
    "card rank-6 diams",
    "card back",
  ],
];

const positionBoard = [
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
];

const deck = [
  "card rank-a spades",
  "card rank-2 spades",
  "card rank-3 spades",
  "card rank-4 spades",
  "card rank-5 spades",
  "card rank-6 spades",
  "card rank-7 spades",
  "card rank-8 spades",
  "card rank-9 spades",
  "card rank-10 spades",
  "card rank-j spades",
  "card rank-q spades",
  "card rank-k spades",
  "card rank-a clubs",
  "card rank-2 clubs",
  "card rank-3 clubs",
  "card rank-4 clubs",
  "card rank-5 clubs",
  "card rank-6 clubs",
  "card rank-7 clubs",
  "card rank-8 clubs",
  "card rank-9 clubs",
  "card rank-10 clubs",
  "card rank-j clubs",
  "card rank-q clubs",
  "card rank-k clubs",
  "card rank-a diams",
  "card rank-2 diams",
  "card rank-3 diams",
  "card rank-4 diams",
  "card rank-5 diams",
  "card rank-6 diams",
  "card rank-7 diams",
  "card rank-8 diams",
  "card rank-9 diams",
  "card rank-10 diams",
  "card rank-j diams",
  "card rank-q diams",
  "card rank-k diams",
  "card rank-a hearts",
  "card rank-2 hearts",
  "card rank-3 hearts",
  "card rank-4 hearts",
  "card rank-5 hearts",
  "card rank-6 hearts",
  "card rank-7 hearts",
  "card rank-8 hearts",
  "card rank-9 hearts",
  "card rank-10 hearts",
  "card rank-j hearts",
  "card rank-q hearts",
  "card rank-k hearts",
];

const divideDeckIntoPieces = (deck) => {
  let shuffled = deck
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  const result = new Array(Math.ceil(shuffled.length / 6))
    .fill()
    .map((_) => shuffled.splice(0, 6));
    // console.log("deckcalled");
    // console.log(result,"rfrwewfewrf");
  return result;
};
//console.log("calling deck",divideDeckIntoPieces(deck) )
const card= divideDeckIntoPieces(deck);
const cardDeck=card[0];
// code to read file
const readFile = (fileName) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, `utf-8`, (readErr, fileContents) => {
      if (readErr) {
        reject(readErr);
      } else {
        resolve(fileContents);
      }
    });
  });

// code to create a server
const server = http.createServer(async (req, resp) => {
  console.log(`browser asked for ${req.url}`);
  if (req.url == `/mydoc`) {
    const clientHtml = await readFile(`client.html`);
    resp.end(clientHtml);
  } else if (req.url == `/myjs`) {
    const clientJs = await readFile(`client.js`);
    resp.end(clientJs);
  } else if (req.url == `/sequence.css`) {
    const sequenceCss = await readFile(`sequence.css`);
    resp.end(sequenceCss);
  } else {
    resp.end(`not found`);
  }
});

// to listen for clients
server.listen(8000);

// creating a web socket
const wss = new WebSocket.Server({ port: 8080 });
//////////////////
var msg = {
  type: "newboard",
  board: board,
};
//let f=JSON.parse(msg);
// wss.on("connection", (ws) => {
//   // clientId = clientId + 1;
//   // const id = clientId;
//   // const clientInfo = { id };
//   // clients.set(ws, clientInfo);
//   //console.log("message from client ", msgString);
//   //ws.send("hello server");
//   //console.log(ws,"client")
//   ws.send(JSON.stringify({ type: "newboard", board: board, positionBoard: positionBoard, cardDeck: cardDeck}));
//   //ws.send(JSON.stringify({ type: "deck", }));
//   ws.on("message", (msgString) => {
//     console.log("message from client ", ": ", msgString.toString());
//     msgString=msgString.toString()
//     //console.log( msgString(1))
//     let a= msgString.split(",");
//    // console.log(a,"a")
//     let b= msgString.split(",").pop();
//     //console.log(b,"b")
//     a=parseInt(a);
//     b=parseInt(b);
//     // console.log(a,"a")
//     // console.log(b,"b")
//     // console.log(typeof a)
//     positionBoard[a][b]="card card green";
//     //console.log(positionBoard);
//     ws.send(JSON.stringify({positionBoard: positionBoard}));


//   });
// });
let clientarray=[];
let clients=[];
let clientseq=0;
wss.on("connection", function connection (client)  {
  client.on("message", (msgString) => {
    console.log("message from client ", ": ", msgString.toString());})
  client.id = uuid();
  console.log(`Client ${client.id} Connected!`)
  if (!clientarray.includes(client.id))
  { 
    clientarray.push(client.id);
    clients.push(client);
  }
  console.log(clientarray.length);
 if (clientarray.length==4)
 {
   for (let i=0;i<4;i++)
  {
    if (i==0 || i==2)
    {
      clients[i].send(JSON.stringify({ type: "newboard", board: board, positionBoard: positionBoard, cardDeck: card[i],color:"card card green",message:"turn of player 1" }));
  }
  if (i==1 || i==3)
  {
    clients[i].send(JSON.stringify({ type: "newboard", board: board, positionBoard: positionBoard, cardDeck: cardDeck, color:"card card blue", message:"turn of player 1" }));
  }
  }
}
 //ws.send(JSON.stringify({ type: "deck", }));
   client.on("message", (msgString) => {
   console.log("message from client ", ": ", msgString.toString());
   if( msgString.toString()=="winner found")
   { let a;
    for (let i=0;i<4;i++)
    {
      if (client==clients[i])
      {
        a="winner is client "+i;
      }
    }  
    for (let i=0;i<4;i++)
    {
      clients[i].send(JSON.stringify({message:a}));
    }  
    return;
   }
   if(clientseq==0)
     { console.log("in len==0 ")
       if (client==clients[0])
        {
          console.log("in client 0 ")
            msgString=msgString.toString()
          let a= msgString.split(",");
          let b= msgString.split(",").pop();
          a=parseInt(a);
          b=parseInt(b);
          positionBoard[a][b]="green";
          if((client==clients[0]) || (client==clients[2]))
          { 
            positionBoard[a][b]="card card green";
          }
          if((client==clients[1]) || (client==clients[3]))
          { 
            positionBoard[a][b]="card card blue";
          }
          for (let i=0;i<4;i++)
          {
            clients[i].send(JSON.stringify({positionBoard: positionBoard,message:"Turn of player 2"}));
          }  
          clientseq++;
          console.log(clientseq,"clieseq len");
          console.log("sent to all servers ")
          return;
        }
     }
     console.log(clientseq,"clieseq len");
     if(clientseq>0)
     {      
       console.log("in client  > 0")
       if (client==clients[0])
       {
         console.log("in client 0 ")} 
         if (client==clients[2])
         {
           console.log("in client 2 ")} 
           if (client==clients[3])
           {
             console.log("in client 3 ")} 
      if((client==clients[1]))
          {console.log("in client 1")}     
                              //1                                             //2                                           //3
       if ( ((client==clients[0]) && (clientseq%4)==0 ) || ((client==clients[1]) && (clientseq%4)==1 ) || ((client==clients[2]) && (clientseq%4)==2 ) || ((client==clients[3]) && (clientseq%4)==3 ))
        {  
          console.log("condition matched client number is ");
          msgString=msgString.toString()
          let a= msgString.split(",");
          let b= msgString.split(",").pop();
          a=parseInt(a);
          b=parseInt(b);
          if((client==clients[0]) || (client==clients[2]))
          { 
            positionBoard[a][b]="card card green";
          }
          if((client==clients[1]) || (client==clients[3]))
          { 
            positionBoard[a][b]="card card blue";
          }
          let mes;
          for (let i=0;i<4;i++)
          {
            if (client==clients[i])
            {
              if (i==3)
              {
                mes="Turn of player 1 ";
                break;
              }
              mes="Turn of player  "+(i+2);
              break;
            }
          }  
          for (let i=0;i<4;i++)
          {        
            clients[i].send(JSON.stringify({positionBoard: positionBoard, message:mes}));
          }  
        clientseq++;
        console.log("clientseq len ",clientseq);
        }
        if (clientseq==24)
        {
          for (let i=0;i<4;i++)
          {
            
              clients[i].send(JSON.stringify({ cardDeck: card[i+4] }));
          }
        }
        if (clientseq==48)
        {
          for (let i=0;i<4;i++)
          {
            
              clients[i].send(JSON.stringify({ message:"It is a draw" }));

          }
          return;
        }
     }
  //   msgString=msgString.toString()
  //   //console.log( msgString(1))
  //   let a= msgString.split(",");
  //  // console.log(a,"a")
  //   let b= msgString.split(",").pop();
  //   //console.log(b,"b")
  //   a=parseInt(a);
  //   b=parseInt(b);
  //   // console.log(a,"a")
  //   // console.log(b,"b")
  //   // console.log(typeof a)
  //   positionBoard[a][b]="green";
  //   for (let i=0;i<4;i++)
  //   {
  //     clientarray[i].send(JSON.stringify({positionBoard: positionBoard}));
  //   }
  });

});

