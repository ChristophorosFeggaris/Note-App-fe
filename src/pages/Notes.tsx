import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NoteCard from '../components/NoteCard';
import { Box, Button, Divider, Grid, Modal, TextField, Typography } from '@mui/material';
import * as yup from "yup";
import Layout from '../components/Layout';

const NotesSchema = yup.object().shape({
  title: yup.string().required("Please add a name."),
  description: yup.string().required("Please add a description."),
})


export function Notes(): JSX.Element {

  const [notes, setNotes] = useState([]);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editNoteId, setEditNoteId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState({title:'', description:''});

  const noteUrl = 'http://localhost:3001/notes';


  const {
    control: createFormControl,
    handleSubmit: createFormSubmit,
    reset: resetCreateForm,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(NotesSchema),
  });
  
  const {
    control: editModalControl,
    handleSubmit: editModalSubmit,
    reset: resetEditModal,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
    resolver: yupResolver(NotesSchema),
  });
  
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setEditNoteId(null);
  }

  const handleEditNote = (noteid: number) => {
    console.log('note on handleEdit:',noteid);
    setEditNoteId(noteid);
    // resetEditModal({
    //   title: note.title,
    //   description: note.description,
    // });
    
    setIsModalOpen(true);
  }

  async function getNotes() {
    try{
      const response: any = await axios.get(noteUrl);
      console.log(response.data)
      const notesData = response.data; 
      notesData.forEach((note: any) => {
        console.log("Note ID:", note.noteid);
      });
      setEditNoteId(response.data.noteid);
      console.log('editnoteid on getNotes: ',editNoteId);
      setNotes(response.data);
    }catch(error){
      console.log(error);
    }
  }

  

  const onSubmit = createFormSubmit(async (data:any) => {
    try{
      const response = await axios.post(noteUrl, data);
      setRefetch(!refetch);
    }catch(error){
      console.log(error);
    }
  });

  

  async function updateNote(noteid: number, data:any) {
    try{
      const response = await axios.patch(noteUrl+`/${noteid}`, {
        title : data.title,
        description : data.description,
      });
      console.log('The data:',data);
      console.log('the id:',noteid);
      setRefetch(!refetch);
    }catch(error){
      console.log(error);
    }
  }

  async function deleteNote(editNoteId: number) {
    try{

      const response = await axios.delete(`${noteUrl}/${editNoteId}`);
      console.log('The note deleted successfuly');
      setRefetch(!refetch);
    }catch(error){
      console.log(error);
    }
  }

  const handleFormSubmit = editModalSubmit((data) => {
    try {
      const noteData = {
        noteid: editNoteId,
        title: data.title,
        description: data.description, 
      };
      console.log(editNoteId);
  
      if (editNoteId !== null) {
        updateNote(editNoteId, noteData);
      } 
      console.log(noteData);
  
      closeModal();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getNotes();
  }, [refetch]);

  return (
    <div>
      {/* <Layout> */}
       <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', borderRadius: '8px', boxShadow: 24, p: 4, minWidth: 100 }}>
          <Typography variant="h6">
            Edit Note
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <Controller
              name="title"
              control={editModalControl}
              defaultValue={editNoteId ? editFormData.title : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  margin="normal"
                  error={!!editModalControl._formState.errors.title}
                  helperText={editModalControl._formState.errors.title?.message}
                />
              )}
            />
            <Controller
              name="description"
              control={editModalControl}
              defaultValue={editNoteId ? editFormData.description : ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  margin="normal"
                  error={!!editModalControl._formState.errors.description}
                  helperText={editModalControl._formState.errors.description?.message}
                />
              )}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" type="submit">
                Update
              </Button>
              <Button variant="outlined" onClick={closeModal}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      
      <Typography variant="h3" fontWeight={700} >
          Notes Page
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
      <form onSubmit={onSubmit}>
      <Grid item xs={12}>
              <Controller
                name="title"
                control={createFormControl}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title"
                    error={!!createFormControl._formState.errors.title}
                    helperText={createFormControl._formState.errors.title?.message}
                    fullWidth
                  />
                )}
              />
              </Grid>

              <Grid item xs={12}>
              <Controller
                name="description"
                control={createFormControl}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Description"
                    error={!!createFormControl._formState.errors.description}
                    helperText={createFormControl._formState.errors.description?.message}
                    multiline
                    rows={4}
                    fullWidth
                  />
                )}
              />
              </Grid>

              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Note
            </Button>
        </form>
        <Box display="flex" flexDirection="column" alignItems="center" mt={3}> {/* Increase the mt value */}
  <Divider variant="middle" />
</Box>
      <div>
        {notes.map((note: any) => (
          // <div key={note.noteid} style={{ marginBottom: '16px' }}>
          <Box key={note.noteid} mb={4}>
          <NoteCard
            noteid={note.noteid}
            title={note.title}
            description={note.description}
            onDelete={deleteNote}
            onEdit={handleEditNote}
          />
          </Box>
        ))}
      </div>
      </Box>
      {/* </Layout> */}
    </div>
  );
};