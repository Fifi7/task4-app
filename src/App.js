import React, { useState, useEffect} from 'react';
import './App.css';
import MemberForm from './Components/js/MemberForm';
import MemberList from './Components/js/MemberList';
import EditMemberForm from './Components/js/EditMemberForm'; 
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import membersReducer from './Components/js/membersReducer'; // Your reducer file


const store = createStore(membersReducer);

const App = () => {
  const [members, setMembers] = useState([]);
  const [editedMember, setEditedMember] = useState(null);

  const addMember = (member) => {
    setMembers([...members, member]);
    const updatedMembers = [...members, member]
    setMembers(updatedMembers);
    localStorage.setItem('members', JSON.stringify(updatedMembers));
  };

  useEffect(() => {
    const storedMembers = localStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  const editMember = (updatedMember) => {
    const memberIndex = members.findIndex((m) => m.id === updatedMember.id);
  if (memberIndex !== -1) {
    const updatedMembers = [...members];
    updatedMembers[memberIndex] = updatedMember;
    setMembers(updatedMembers);
  }

  };

  const updateMember = (updatedMember) => {
    const memberIndex = members.findIndex((member) => member.id === updatedMember.id);
    const updatedMembers = [...members];
    updatedMembers[memberIndex] = updatedMember;
    
    setMembers(updatedMembers);
    setEditedMember(null);
  };

  
  const deleteMember = (memberId) => {
    const updatedMembers = members.filter((member) => member.id !== memberId);
    setMembers(updatedMembers);
  };

  const handleModalClose = () => {
    setEditedMember(null);
  };

  return (
    <Provider store={store}>
    <BrowserRouter>
    <div className="app">
      <Routes>
      <Route path="/" element={<MemberForm onAddMember={addMember} />} />
      <Route path="/member-list" element={<MemberList members={members}  editMember={editMember} deleteMember={deleteMember}/>} />
      <Route path = "/edit/:id" element={<EditMemberForm member={editedMember} onClose={handleModalClose} editMember={editMember} onUpdateMember={updateMember} />} />
        </Routes>
      </div>
    </BrowserRouter>
    </Provider>
  );
};
    
   

export default App;




































