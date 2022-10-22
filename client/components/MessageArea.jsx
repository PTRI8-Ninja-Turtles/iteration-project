import Send from '@mui/icons-material/Send';
import { Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const SERVER = 'http://127.0.0.1:3000';

import '../stylesheets/main.scss';

const socket = io.connect(SERVER);

// const useStyles = styled({
//   messageArea: {
//     height: '70vh',
//     overflowY: 'auto'
//   }
// });
  

function MessageArea( {username, info} ) {
  const [newMessage, setNewMsg] = useState('');
  const [allMsg, setAllMsg] = useState([]);


  useEffect(() => {
  }, []);

  const msgCmp = allMsg.map((val, i) => {
    const pos =  val.un === username ? 'right' : 'left'; 
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

  socket.on('connect', (socket) => {
    console.log('connect to socket - client')
  });

  const sendMsg = (e) => {
    const msg = newMessage;
    socket.emit('chat message', {content: msg, un: username});
    setNewMsg('');
  };

  socket.on('message', message => {
    // console.log('msg getting from front end ->', message);
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