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

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = 'testusername';
  p.innerHTML += '<span>12:00pm</span>';
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message;
  div.appendChild(para);
  document.getElementById('msgArea').appendChild(div);
}


socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
  });


const useStyles = styled({
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});
  

function MessageArea( username ) {
  const classes = useStyles();
  return (
    <Grid item xs={9}>
      <List className={classes.messageArea} id='msgArea' >
        <ListItem key="1">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="09:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="2">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="left" secondary="09:31"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
        <ListItem key="3">
          <Grid container>
            <Grid item xs={12}>
              <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
            </Grid>
            <Grid item xs={12}>
              <ListItemText align="right" secondary="10:30"></ListItemText>
            </Grid>
          </Grid>
        </ListItem>
      </List>
      <Divider />
      <Grid container style={{padding: '20px'}}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
        </Grid>
        <Grid xs={1} align="right">
          <Fab color="primary" aria-label="add"><Send /></Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MessageArea;