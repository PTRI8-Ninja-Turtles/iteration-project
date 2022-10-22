import Send from '@mui/icons-material/Send';
import { Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const SERVER = 'http://127.0.0.1:3000';

import '../stylesheets/main.scss';

const socket = io.connect(SERVER);


const messages = [{content: 'Hey man, What\'s up ?', pos: 'left', un:'someone'}, {content: 'Hey, Iam Good! What about you ?', pos: 'right', un:'someone'}, {content: 'Cool. i am good, let\'s catch up!', pos: 'left', un:'someone'} ]; 

// const useStyles = styled({
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto'
//   }
// });
  

function MessageArea( username ) {
  const [newMessage, setNewMsg] = useState('');
  const [allMsg, setAllMsg] = useState(messages);
  const myUsername = username.username.username.username;

  useEffect(() => {
    socket.on('connection', (socket) => {
      console.log('connected!');
      socket.emit('chat message', 'test');
    } );
  }, []);



  const msgCmp = allMsg.map((val, i) => {
    const pos =  val.un === myUsername ? 'right' : 'left'; 
    return (
      <ListItem key={i + 1}>
        <Grid container>
          <Grid item xs={12}>
            <ListItemText align={pos} primary={val.content}></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText align={pos} secondary={val.un}></ListItemText>
          </Grid>
        </Grid>
      </ListItem>);
  });

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
    console.log('inside sendMsg', myUsername);
    socket.emit('chat message', {content: msg, un: myUsername});
    setNewMsg('');
  };

  socket.on('message', message => {
    console.log('msg getting from front end ->', message);
    setAllMsg([...allMsg, {content: message.content, un: message.un}]);
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