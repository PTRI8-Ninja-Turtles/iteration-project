import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

function RoomEditor({ fetchUser, closeModal, action, id, sub }) {

  const [warning, setWarning] = useState(false);
  const [updatedRoom, setRoom] = useState({subject: sub ? sub : 'math', restricted: false});

  // create function to add card via post req and update room list
  const addRoom = async () => {
    // check that all fields are filled
    if (!updatedRoom.subject) {
      console.log(updatedRoom);
      setWarning(true);
      return;
    }
    // fetch request will return new room doc
    const newRoomData = await fetch('/api/rooms', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        ...updatedRoom, 
        allowedUsers: [], 
        pendingUsers: [],
        active: true})
    }).then(response => response.json());

    // update user to reset state
    fetchUser();
  };

  // edit function to edit card via patch req and update room list
  const editRoom = async (e) => {
    closeModal(e);
    // check that all fields are filled
    if (!updatedRoom.subject) {
      setWarning(true);
      return;
    }
    // fetch request will return new room doc
    const updatedRoomData = await fetch(`/api/rooms/update/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedRoom)
    }).then(response => response.json());

    // update user to reset state
    fetchUser();
  };

  const addRoomBtn = <Button variant='contained' onClick={(event) => {
    event.preventDefault();
    addRoom();
    closeModal(event);
  }}>Add new room</Button>;

  const editRoomBtn = <Button variant='contained' onClick={(event) => {
    event.preventDefault();
    editRoom(event);}}>Update room</Button>;

  return (
    <div id='room-editor-modal'>
      <form>
        <InputLabel id="subject-label">Subject</InputLabel>
        <Select
          labelId="subject-label"
          id="subject-select"
          value={updatedRoom.subject}
          label="Subject"
          onChange={event => setRoom({...updatedRoom, subject: event.target.value})}
        >
          <MenuItem value={'math'}>Math</MenuItem>
          <MenuItem value={'english'}>English</MenuItem>
          <MenuItem value={'history'}>History</MenuItem>
          <MenuItem value={'science'}>Science</MenuItem>
          <MenuItem value={'languages'}>Languages</MenuItem>
          <MenuItem value={'miscellaneous'}>Miscellaneous</MenuItem>
        </Select>
        {/* restrcited room is not functioning, so we decided to hide it */}
        {/* <label className='room-editor-label'>Restricted: </label> */}
        {/* <Switch onClick={() => setRoom({...updatedRoom, restricted: !updatedRoom.restricted})} /> */}
        {warning && <p className="warning">All fields must be filled!</p>}
      </form>
      <div id='room-editor-modal-btns'>
        <Button variant='text' onClick={closeModal}>Cancel</Button>
        {action === 'add' ? addRoomBtn : editRoomBtn}
        
      </div>

    </div>
  );
}

export default RoomEditor;