const ws = new WebSocket(`ws://localhost:8080/ws`);

const Sequence = () => {
  const [board, setBoard] = React.useState([[]]);
  const [positionBoard, setPositionBoard] = React.useState([[]]);
  const [cards, setCards] = React.useState([]);
  const [message, setMessage] = React.useState("Game not started yet");
  const [color, setColor] = React.useState("");
  const [boxcolor, setBoxcolor] = React.useState("");


  let diams = "♦";
  let heart = "♥";
  let spades = "♠";
  let clubs = "♣";
  React.useEffect((h,g) => {
    let data;
    let b1;
      ws.onopen = ("message", (msgString) => {
       //ws.send([5,1]);
        ws.onmessage = function (event) {
        console.log("here is the :", event.data.toString());
        let a=board;
         data = JSON.parse(event.data);
      if (data.type === "newboard") {
        b1=data.board;
        setBoard(data.board);
        setPositionBoard(data.positionBoard);
        setCards(data.cardDeck);
        setColor(data.color);
        let a=data.color;
        a=a.split(" ").pop()
        a="color "+a;
        setBoxcolor(a);
        setMessage(data.message);
      }
      else
      {console.log("in use effect")
      setPositionBoard(data.positionBoard);
      setMessage(data.message);
      console.log(b1);
      setBoard(b1);
      setTimeout(changeboard(data.positionBoard,b1), 100000);
      b1=board;
    }
      }
      //  ws.send(JSON.stringify(msg));
      });
    },[positionBoard],[message],[sendVerificationEmail()],[board])
 

   //return code here
   return (
     <React.Fragment>
    <div class="container">
            <div class="playingCards fourColours rotateHand">
                          <ul class="table">
  { board && Object.keys(board).map(el => 
          {
             //console.log(el)
              return(
                <div>
                    { board && (board[el]).map(sub_el =>    
                              <li>
                                <a className={sub_el}  
                                async onClick={()=>{
                                 // console.log(cards.length,"len")
                                 // console.log(sub_el,"sel")
                                 // console.log(el,"el")
                                  let d=cards.length;
                                  if(sub_el.substr(0,9)=="card card")
                                  {
                                    return;
                                  }
                                  if (!cards.includes(sub_el))
                                  {
                                    if (cards.includes("card rank-j spades") || cards.includes("card rank-j clubs") || cards.includes ("card rank-j diams") || cards.includes("card rank-j hearts"))
                                    {
                                      setCards(cards.filter(x => x[10] !== "j"));  
                                    }
                                    else{
                                    return;
                                  }
                                  }
                                  for(let i=0;i<d;i++)
                                  {
                                    let c=cards;
                                    if(cards[i]===sub_el)
                                    {
                                     // console.log(cards,"ded")
                                      let index = cards.indexOf(sub_el);
                                      c.splice(index, 1);
                                      setCards(cards.filter(x => x !== sub_el));
                                      //setCards(c);
                                      //console.log(cards,"f")
                                    }
                                    //setCards(c);
                                  }
                                  for(let i=0;i<10;i++)
                                  {
                                   // console.log(board[el][i],"f")
                                    //setCards(c);
                                    let a=board[el][i];
                                    console.log(a,"a")
                                    console.log(sub_el,"s")
                                    if(a==sub_el)
                                    {
                                  // console.log("in server")

                                   let c1=board;
                                  for (let i = 0; i < 10; i++)
                                 {
                                  for (let j = 0; j < 10; j++)
                                    {
                                         if(positionBoard[i][j]!="-")
                                        {
                                        c1[i][j]=positionBoard[i][j];
                                        }
                                    }
                                 }
                                    c1[el][i]=color;
                                    setBoard(c1);
                                    let bp;
                                    bp=sendVerificationEmail( parseInt(el),i);
                                    //setPositionBoard(bp);
                                    // setPositionBoard(o => {
                                    //   setPositionBoard(bp);
                                    //   console.log(bp);
                                    //   console.log("inyqsqsq");
                                    //   console.log(positionBoard);
                                    // })
                                //     setChecked(data => ({
                                //       ...data,
                                //       [ind]: !checked[ind]
                                // }))
                                    console.log(positionBoard)
                                    }
                                  }
                                }
                                } 
                                > 
                                     <div>
                                     <span className="rank">{sub_el[10]}</span><span className="suit">♦</span> 
                                     </div>
                             
                                
                                </a >
          
                              </li>
                               )
                    }
                </div>
                    );
          })
    }
                </ul>                           
       </div>
  </div>




  
 <div class="container">
  <div class="playingCards fourColours rotateHand">
                <ul class="table">
                <h1>Your cards</h1>

{
cards.map( name => {
 return(
            <li>
             <a className={name}   >
                <span className="rank">{name[10]}</span><span className="suit">♦</span> 
                 </a > 
              </li>
              
      );

})
}
</ul>
<div class="text_box">{message}</div>
          <div class={boxcolor}></div>              
</div>

</div> 
          
</React.Fragment> 

);
async function sendVerificationEmail (h,i) 
 { if (h==undefined)
  {return;}
   //console.log(h);
   let o;

  //  ws.onopen = function() {
  //   ws.send('Hello server')
  //   ws.close()
  // }
 ws.onopen = ("message", (on) => {
   console.log("connection is open");

  try
  {
    ws.send([h, i]);
   }
  catch (ex)
  {
      console.log("an error occured when sending");
      console.log(ex);
  }
    ws.onmessage = function (event) {
    console.log("here is the server:", event.data.toString());
    let data = JSON.parse(event.data);
    o=data.positionBoard;
    setPositionBoard(data.positionBoard);
    setMessage(data.message);
    //console.log(positionBoard);
    let a=board;
   // console.log(a);
    setTimeout(changeboard(o,a), 100000);
    setTimeout(checkwinner(), 200000);
    if (message=="winner found")
    {
      ws.send("winner found");
    }


  }
  });
  // async function myFunction (){
  //   setPositionBoard(o);
  //   console.log("inside")
  //   console.log(positionBoard);
  // }
  // myFunction();
  await ws.onopen ("message", (msgString) => {
    ws.send([h, i], function() {
      console.log("Connected to server");
    });
       ws.onmessage = function (event) {
      console.log("here is the server:", event.data.toString());
      let data = JSON.parse(event.data);
      o=data.positionBoard;
       setPositionBoard(o);
    
    }
    });
    return o;
 }
 async function changeboard(o,a)
 {
  //  console.log(o);
  //  console.log(a);

   for (let i = 0; i < 10; i++)
   {
     for (let j = 0; j < 10; j++)
     {
       //console.log(i,j);
       if(o[i][j]!="-")
       {
         a[i][j]=o[i][j];
       }
 
     }
   }
   console.log(a);
   setBoard(a);


 }
 //7cols 6 rows
 function chkLine(a,b,c,d,e) {
  // Check first cell non-zero and all cells match
  return ((a == color) && (a ==b) && (a == c) && (a == d)&& (a == e));
}
 async function checkwinner()
 {
       // Check down
  for (let r = 0; r < 5; r++)
  {
    for (let c = 0; c < 10; c++)
    {  if (chkLine(board[r][c], board[r+1][c], board[r+2][c], board[r+3][c], board[r+4][c]))
       { 
         setMessage ("You are the winner");
         return "winner found";
        }
      }}
// Check right
for (let r = 0; r < 10; r++)
  {for (let c = 0; c < 6; c++)
    {  if (chkLine(board[r][c], board[r][c+1], board[r][c+2], board[r][c+3], board[r][c+4] ))
      { 
        setMessage ("You are the winner");
        return "winner found";       }
      }}
// Check down-right
for (let r = 0; r < 5; r++)
  {for (let c = 0; c < 6; c++)
    {  if (chkLine(board[r][c], board[r+1][c+1], board[r+2][c+2], board[r+3][c+3],board[r+4][c+4]))
      { 
        setMessage ("You are the winner");
        return "winner found";       }
      }}
// Check down-left
for (let r = 5; r < 10; r++)
 { for (let c = 0; c < 6; c++)
     { if (chkLine(board[r][c], board[r-1][c+1], board[r-2][c+2], board[r-3][c+3], board[r-4][c+4]))
      { 
        setMessage ("You are the winner");
        return "winner found";
             }
      }
 }
return 0;

 }
   //return end

  // return (
  //        <div class="container">
  //         <div class="playingCards fourColours rotateHand">
  //           <ul class="table">
  //             <li>
  //               {/* {
  //               board.map(function(name, index,row){
  //                 return (
  //                   <React.Fragment> 
  //                 <li key={ index[row] }>{name}{">"}{row[index[index]]}</li>
  //                 name
  //                 <a class="card rank-6 diams" >
  //                   <span class="rank">6</span><span class="suit">♦</span>
  //                </a >
                 
  //                 </React.Fragment>

  //                 );
  //               })
  //             } */}
  //             {
  //                Object.keys(board).map(el => {
  //                  console.log(el)
  //               return(
  //               board[el].map(sub_el => 
  //                 <div>
  //                 <li>
  //              <a className={sub_el} >
  //                 <span className="rank">{sub_el[10]}</span><span className="suit">♦</span>
  //              </a >
  //              </li>
  //               </div>
  //                )
  //               );
  //               })
                  
                  
  //             }
  //               <a class="card rank-6 diams" >
  //                   <span class="rank">6</span><span class="suit">♦</span>
  //                </a >
  //             </li>
  //             <li>
  //               <a class="card rank-q diams"
  //                 ><span class="rank">q</span><span class="suit">♦</span></a
  //               >
  //             </li>
  //             <li>
  //               <a class="card rank-5 hearts"
  //                 ><span class="rank">5</span><span class="suit">♥</span></a
  //               >
  //             </li>
  //             <li>
  //               <a class="card rank-2 diams"
  //                 ><span class="rank">2</span><span class="suit">♦</span></a
  //               >
  //             </li>
  //             <li>
  //               <a class="card rank-8 clubs"
  //                 ><span class="rank">8</span><span class="suit">♣</span></a
  //               >
  //             </li>
  //             <li>
  //               <a class="card rank-7 spades"
  //                 ><span class="rank">7</span><span class="suit">♠</span></a
  //               >
  //             </li>
  //           </ul>
        //   </div>//firt div
        //    <div class="text_box">Game not started yet</div>
        //   <div class="color green"></div> 
        // </div>
  // );
};

ReactDOM.render(<Sequence />, document.querySelector(`#root`));

/////////////////////////////////

let msg = {
  type: "message",
  text: "Hello World!",
  // id: clientID,
  date: Date.now(),
};

// ws.send(JSON.stringify(msg));
