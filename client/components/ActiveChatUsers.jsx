import React, { useState, useEffect, useContext } from 'react';
import { styled } from '@mui/system';
import { Grid, ListItem, List, Avatar, ListItemIcon, ListItemText, Divider } from '@mui/material';

const useStyles = styled({
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
});

function ActiveChatUsers( ) {
  const classes = useStyles();
  return (
    <Grid item xs={3} className={classes.borderRight500}>
      <List>
        <ListItem button key="MattS">
          <ListItemIcon>
            <Avatar alt="Matt S" src="https://www.codesmith.io/hubfs/Codesmith_June2021/Images/Matt%20Severyn.jpg" />
          </ListItemIcon>
          <ListItemText primary="Matt S"></ListItemText>
        </ListItem>
      </List>
      <Divider />
      <Divider />
      <List>
        <ListItem button key="SamA">
          <ListItemIcon>
            <Avatar alt="Sam A" src="https://www.codesmith.io/hs-fs/hubfs/Screen%20Shot%202022-06-07%20at%202.01.49%20PM.png?width=336&height=316&name=Screen%20Shot%202022-06-07%20at%202.01.49%20PM.png" />
          </ListItemIcon>
          <ListItemText primary="Sam A">Sam A</ListItemText>
          <ListItemText align="right"></ListItemText>
        </ListItem>
        <ListItem button key="Hannah P">
          <ListItemIcon>
            <Avatar alt="Hannah P" src="https://www.codesmith.io/hs-fs/hubfs/Screen%20Shot%202022-04-05%20at%201.44.39%20PM.png?width=1046&height=1038&name=Screen%20Shot%202022-04-05%20at%201.44.39%20PM.png" />
          </ListItemIcon>
          <ListItemText primary="Hannah P">Hannah P</ListItemText>
        </ListItem>
        <ListItem button key="MattB">
          <ListItemIcon>
            <Avatar alt="Matt B" src="https://www.codesmith.io/hs-fs/hubfs/Screen%20Shot%202022-09-08%20at%204.35.30%20PM.png?width=317&height=346&name=Screen%20Shot%202022-09-08%20at%204.35.30%20PM.png" />
          </ListItemIcon>
          <ListItemText primary="Matt B">Matt B</ListItemText>
        </ListItem>
      </List>
    </Grid>
  );
}

export default ActiveChatUsers;