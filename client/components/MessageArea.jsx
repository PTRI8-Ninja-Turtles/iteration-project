import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { styled } from '@mui/system';
import { Grid, ListItem, List, Avatar, ListItemIcon, ListItemText, Divider, TextField, Fab} from '@mui/material';
import Send from '@mui/icons-material/Send';
const SERVER = 'http://127.0.0.1:3000';

import '../stylesheets/main.scss';

const socket = io.connect(SERVER);

socket.on('connection', (socket) => {
  console.log('connected with front end');
} );

const messages = [{content: 'Hey man, What\'s up ?', pos: 'left'}, {content: 'Hey, Iam Good! What about you ?', pos: 'right'}, {content: 'Cool. i am good, let\'s catch up!', pos: 'left'} ]; 

const msgCmp = messages.map((val, i) => 
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

const useStyles = styled({
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});
  

function MessageArea( username ) {
  const [newMessage, setNewMsg] = useState('');
  const classes = useStyles();

  const sendMsg = (e) => {
    console.log('inside sendMsg', newMessage);
    const msg = newMessage;
    socket.on('chat message', (msg) => {
      console.log('inside of socketon from frontend');
      const newMsg = formatMsg(msg);
      msgCmp.push(newMsg);
    });
  };

  return (
    <Grid item xs={9}>
      <List className={classes.messageArea} id='msgArea' >
        {msgCmp}
      </List>
      <Divider />
      <Grid container style={{padding: '20px'}}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" onChange={ e=>setNewMsg(e.target.value)} label="Type Something" fullWidth />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add"><Send onClick={sendMsg}/></Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MessageArea;