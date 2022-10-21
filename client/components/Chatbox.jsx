import React, { useState } from 'react';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/TYpography';

import ActiveChatUsers from './ActiveChatUsers';
import MessageArea from './MessageArea';

const useStyles = styled({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

function Chatbox( username ) {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <ActiveChatUsers />
        <MessageArea username={username}/>
      </Grid>
    </div>
  );
}


// function Chatbox() {
//   const fakeMessages = [
//     {from: 'lewis', body: 'yo!'},
//     {from: 'peipei', body: 'bye'}
//   ];
//   const [messageList, setMessages] = useState(fakeMessages);
//   // need function to retrieve messages

//   const messages = messageList.map((e, i) => {
//     return (<p key={i}>{e.from}: {e.body}</p>);
//   });

//   return (
//     <div className='chatbox'>
//       <div id='message-container'>
//         {messages}
//       </div>
//       <form>
//         <input type='text'></input>
//         <Button variant='text'>Send</Button>
//       </form>
//     </div>
//   );
// }

export default Chatbox;