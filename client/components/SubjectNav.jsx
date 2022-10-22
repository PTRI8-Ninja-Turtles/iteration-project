import { Book, Calculate, HistoryEdu, Language, School, Science } from '@mui/icons-material';
import { Button } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import React from 'react';


function SubjectNav({ subject, setSubject }) {
  // navbar will send back new subject as updated state via useContext
  const subjectObj = {
    'math': <Calculate className='subject-link-icon'/>,
    'english': <Book className='subject-link-icon'/>,
    'history': <HistoryEdu className='subject-link-icon'/>,
    'science': <Science className='subject-link-icon'/>,
    'languages': <Language className='subject-link-icon'/>,
    'miscellaneous': <School className='subject-link-icon'/>
  };
  const subjects = Object.entries(subjectObj);

  const subjectBtns = subjects.map((e, i) => {
    return (
      <Button variant='outlined'
        key={i}
        value={e[0]}
        id='subject-links'
        onClick={(event) => handleClick(event.target.value)}>
        {e[1]}
        {e[0]}
      </Button>
    );
  });

  const handleClick = (value) => {
    // react router????
    setSubject(value);
  };

  return (
    <div className='subject-nav'>
      {/* <h2 >Subjects</h2> */}
      <div id='subject-links-container'>
        {subjectBtns}
        {/* <Button id='subj-btn' variant="contained" startIcon={<PushPinIcon className='push-pin' />}>Test</Button> */}
      </div>

    </div>
  );
}

export default SubjectNav;