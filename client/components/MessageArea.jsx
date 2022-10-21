import Send from '@mui/icons-material/Send';
import { Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const SERVER = 'http://127.0.0.1:3000';

import '../stylesheets/main.scss';

const socket = io.connect(SERVER);


const messages = [{content: 'Hey man, What\'s up ?', pos: 'left'}, {content: 'Hey, Iam Good! What about you ?', pos: 'right'}, {content: 'Cool. i am good, let\'s catch up!', pos: 'left'} ]; 

// const useStyles = styled({
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto'
//   }
// });
  

function MessageArea( username ) {
  const [newMessage, setNewMsg] = useState('test');
  const [allMsg, setAllMsg] = useState(messages);

  useEffect(() => {
    socket.on('connection', (socket) => {
      console.log('connected!');
      socket.emit('chat message', 'test');
    } );
  }, []);

  const msgCmp = allMsg.map((val, i) => 
    <ListItem key={i + 1}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={val.pos} primary={val.content}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );

  const formatMsg = (msg) => {
    const key = msgCmp.length;
    return (
      <ListItem key={key}>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align="right" primary={msg}></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    );
  };
  // const classes = useStyles();



  const sendMsg = (e) => {
    console.log('inside sendMsg', newMessage);
    const msg = newMessage;

    socket.emit('chat message', msg);
    setNewMsg('');
  };

  socket.on('message', message => {
    console.log('msg getting from front end ->', message);
    setAllMsg([...allMsg, {content: message,  pos: 'left'}]);
  });

  return (
    <Grid item xs={9}>
      <List id='msgArea' >
        {/* <List className={classes.messageArea} id='msgArea' > */}
        {msgCmp}
      </List>
      <Divider />
      <Grid container style={{padding: '20px'}}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" onChange={ e=>setNewMsg(e.target.value)} value={newMessage} label="Type Something" fullWidth />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add"><Send onClick={sendMsg}/></Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MessageArea;