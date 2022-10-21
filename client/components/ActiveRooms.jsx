import React, { useEffect, useState } from 'react';

const ActiveRooms = () => {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const fetchRooms = async () => {
    // GET request to server api endpoint with subject in params
    const roomData = await fetch('/api/rooms/allRooms').then(response => response.json());
    if(Array.isArray(roomData)) setRooms(roomData);
    else setRooms([]);


    let [ temp, users ] = '';
    const usersArr = [];

    for (let i = 0; i < roomData.length; i++){
      // console.log(roomData[i]);
      temp = roomData[i];
      users = temp['allowedUsers'];
      usersArr.push(...users);
    }
  
    const noDupesUsersArr = [...new Set(usersArr)];
    if (noDupesUsersArr[0] === 'undefined') noDupesUsersArr.shift();

    setUsers(noDupesUsersArr);
    

  };

  useEffect(() => {
    fetchRooms();
  }, []);



  // const [ Test1, Test2, Test3, Test4, Test5, Test6, , Test7, Test8] = 'Testing';
  // const rooms = [Test1, Test2, Test3, Test4, Test5, Test6, Test7, Test8];

  return (

    /* container */
    <div className='curr-active-rooms'>
      <h1>Current Active Rooms</h1>
      {/* grid item */}
      <div className='grid-container'>
        {rooms.map((rooms, i) => (
          <div className='grid-item' key={i}>
            <div className='grid-item-front'>
              <p>{users[i]}'s Room</p>
              {/* <p>Room {i + 1}</p> */}

              {/* we want to add description of room but make the font smaller */}
              {/* <p>{rooms.host.nickname}&apos;s {rooms.subject} Room</p> */}

              <a href='/main/home'>
                <button className='join-btn'>JOIN</button>
              </a>

            </div>
            {/* hover effect */}
            {/* <div className='grid-item-back'>
              <h2>Testing Card: Back</h2>
              <div className='hover-btns'>
                <a href='/main/home'>
                  <button>Join Room</button>
                </a>
              </div>
            </div> */}
          </div>
        ))}

      </div>

    </div>
  );
};

export default ActiveRooms;
