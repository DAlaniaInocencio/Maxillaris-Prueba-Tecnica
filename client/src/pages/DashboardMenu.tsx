import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'peso', headerName: 'Peso', width: 130 },
  { field: 'tipo', headerName: 'Tipo', width: 130 },
  { field: 'cantidad', headerName: 'Cantidad', width: 130 },
];

export default function DataTable() {
  const [files, setFiles] = React.useState<any[]>([]);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const fetchFiles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/files', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('Por favor selecciona un archivo.');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', selectedFile);
    
    try {
      const response = await axios.post('http://localhost:3000/api/files', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Archivo subido exitosamente.');
      fetchFiles(); 
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/files/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Archivo eliminado exitosamente.');
      fetchFiles(); 
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleFileUpdate = async (id: number) => {
    if (!selectedFile) {
      alert('Por favor selecciona un archivo.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    try {
      const response = await axios.put(`http://localhost:3000/api/files/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data', 
        },
      });
  
      alert('Archivo actualizado exitosamente.');
      fetchFiles();
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  React.useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Gestión de Archivos
      </Typography>

      <input type="file" onChange={handleFileSelect} />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Subir archivo
      </Button>

      <Paper sx={{ height: 400, width: '100%', maxWidth: '800px', marginTop: 2 }}>
        <DataGrid
          rows={files}
          columns={columns}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      <Box sx={{ marginTop: 2 }}>
        {files.map((file) => (
          <Box key={file.id} sx={{ marginBottom: 1 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleFileUpdate(file.id)}
            >
              Actualizar archivo {file.id}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleFileDelete(file.id)}
              sx={{ marginLeft: 1 }}
            >
              Eliminar archivo {file.id}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
