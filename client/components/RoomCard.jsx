import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//info passed down is info about room. id & username is used to identified loggedin user
function RoomCard( { info, id, username } ) {
  const [roomInfoBoolean, setRoomInfoBoolean] = useState(false);
  const [saved, setSaved] = useState(false);

  // create a new patch request function to add clicked user as "allowed user" to show all users in the room
  async function joinRoom () {
    const roomid = info._id;
    const options = {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'newUser': `${username}`})};
    await fetch(`/api/rooms/newUser/${roomid}`, options);
  }

  async function saveRoom () {
    const options = {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({'savedRooms': `${info._id}`})};
    await fetch('/api/users/saveroom', options);
    console.log('Room Saved!');
    setSaved(true);
  }

  const showRoomInfo = event => {
    setRoomInfoBoolean(!roomInfoBoolean);
  };


  const mainRoom = (
    <div className='frame'>
    <div className="mainRoom" onClick={showRoomInfo}>
      <div id='main-button'>
        <Link to={`/main/room/${info._id}`} state={{ info }}><Button variant='contained' id='joinRoomBtn' onClick={joinRoom}>Join Room</Button></Link>
        {!saved && <Button variant='contained' id="saveMyRoomBtn" onClick={saveRoom}>Save</Button>}
        {saved && <Button variant='outlined' id="saveMyRoomBtn">Saved!</Button>}
        {/* <Button id="exitRoomInfo" onClick={showRoomInfo}>Back</Button> */}
      </div>

      <div className='door'>
        <div className="roomInfo">
          <div className='infoSpans'>
            {/* <p><span>Subject:  </span>{info.subject.toUpperCase()} </p>
            <p><span>Creator:  </span>{info.host.username} </p> */}
            <p>{info.host.username}'s {info.subject} room</p>
            {/* <p><span>Active Users: </span>{info.allowedUsers} </p> */}
            {/* <div id='main-button'>
              <Link to={`/main/room/${info._id}`} state={{ info }}><Button variant='contained' onClick={joinRoom}>Join Room</Button></Link>
              {!saved && <Button variant='contained' id="saveMyRoom" onClick={saveRoom}>Save</Button>}
              {saved && <Button variant='outlined' id="saveMyRoom">Saved!</Button>}
              <Button id="exitRoomInfo" onClick={showRoomInfo}>Back</Button>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div > */}
      {/* <div>
          <img src='https://csunshinetoday.csun.edu/wp-content/uploads/Math4-web.jpg' width="192" height="144"/>
        </div> */}
      {/* {info.host.nickname} Room */}
      {/* <InfoIcon fontSize="small" onClick={showRoomInfo}></InfoIcon> */}
      {/* </div> */}
      {/* <form>
        <input id="nameInput" type="text" placeholder="Your Name Here" onChange={handleChange}></input>
        <button id="onSubmitButton" onClick={textOnSubmit}>Enter</button>
        <button id="showRoomInfo" onClick={showRoomInfo}>Show Room Info</button>
      </form> */}
    </div>
    </div>
  );

  // const roomInfo = (
  //   <div className="roomInfo">
  //     <p><span>Subject:  </span>{info.subject.toUpperCase()} </p>
  //     <p><span>Creator:  </span>{info.host.username} </p>
  //     <p><span>People who visted: </span>{info.allowedUsers} </p>
  //     <div id='main-button'>
  //       <Link to={`/main/room/${info._id}`} state={{ info }}><Button variant='contained' onClick={joinRoom}>Join Room</Button></Link>
  //       {!saved && <Button variant='contained' id="saveMyRoom" onClick={saveRoom}>Save</Button>}
  //       {saved && <Button variant='outlined' id="saveMyRoom">Saved!</Button>}
  //       <Button id="exitRoomInfo" onClick={showRoomInfo}>Back</Button>
  //     </div>
  //   </div>
  // );

  if (!roomInfoBoolean) {
    return mainRoom;
  } else if (roomInfoBoolean) {
    return roomInfo;
  }
}

export default RoomCard;