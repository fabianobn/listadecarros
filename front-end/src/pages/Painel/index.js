import React, { useState, useEffect } from 'react';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import Container from '@mui/material/Container';
import api from '../../services/api';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { create } from '@mui/material/styles/createTransitions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

export default function Painel() {
    const [token] = useState(localStorage.getItem('token'));
    const [carrosList, setCarrosList] = useState([]);
    const [createCarro, setCreateCarro] = useState({
        nome: '',
        marca: '',
        modelo: '',
        foto: '',
        valor: '',
        ano: '',
        km: '',
        cidade: '',
    });
    const history = useNavigate();
    
    const handleChange = (event) => {
        setCreateCarro({ ...createCarro, [event.target.name]: event.target.value });
    };

    // Dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    function handleClose() {
        setCreateCarro({
            nome: '',
            marca: '',
            modelo: '',
            foto: '',
            valor: '',
            ano: '',
            km: '',
            cidade: '',
        });
        setOpen(false);
    }

    useEffect(() => {
      api.get('api/carro', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(response => {
        if(response.data.status && (response.data.status === 401 || response.data.status == 498)){
          localStorage.clear();
          history('/login');
        }else{
          setCarrosList(response.data.data);
        }
      }).catch(err => {
        alert(err)
      })
    }, [token]);

    async function handleRegister(e) {
        if (createCarro.nome == '' || createCarro.foto == '' || createCarro.marca == '' || createCarro.modelo == '') {
            alert('Contém Campos obrigatórios vazios!');
            return false;
        }
        e.preventDefault();

        try {
            api.post('api/carro/add', createCarro, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res =>{
                console.log(res);
                if(res.data.status){
                    setCarrosList([...carrosList, res.data.data]);
                    handleClose();
                }
            });
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    const onFileChange = (event) => {
        // setCreateCarro({ ...createCarro, [event.target.name]: event.target.files[0] });
        // setFotoCarro({ selectedFile: event.target.files[0] });
        let reader = new FileReader() 
        reader.readAsDataURL(event.target.files[0])
        
        
        reader.onload = () => {
            setCreateCarro({ ...createCarro, [event.target.name]: reader.result });
        }
    };

    const handleDelete = async (carro_id, i) => {
        api.delete(`/api/carro/${carro_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            let tmpArray = [...carrosList];
            tmpArray.splice(i, 1);
            setCarrosList(tmpArray);
        }).catch(err => {
          alert(err)
        });
    }

    const handleUpdate = async (carro_id) => {
        api.put(`/api/carro/${carro_id}`, createCarro, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            if (res.data.status) {
                window.location.reload(false);
            }
        })
    }

    const handleEdit = async (carro_id) => {
        api.get(`/api/carro/${carro_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then(res => {
            setCreateCarro({
                nome: res.data.data.nome ? res.data.data.nome : '',
                marca: res.data.data.marca ? res.data.data.marca : '',
                modelo: res.data.data.modelo ? res.data.data.modelo : '',
                foto: res.data.data.foto ? "http://localhost/storage/"+res.data.data.foto : '',
                valor: res.data.data.valor ? res.data.data.valor : '',
                ano: res.data.data.ano ? res.data.data.ano : '',
                km: res.data.data.km ? res.data.data.km : '',
                cidade: res.data.data.cidade ? res.data.data.cidade : '',
                id: res.data.data.id ? res.data.data.id : '',
            });
            handleClickOpen();
        })
    }

    return (
        <React.Fragment>
            <Header />

            <Container maxWidth="xl">
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                    '& > *': {
                    m: 1,
                    },
                }}
                >
                    <ButtonGroup
                        orientation="horizontal"
                        aria-label="horizontal contained button group"
                    >
                        <Button key="add" onClick={handleClickOpen}>Adicionar Carro</Button>
                    </ButtonGroup>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Foto</TableCell>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Marca</TableCell>
                            <TableCell align="center">Modelo</TableCell>
                            <TableCell align="center">Valor</TableCell>
                            <TableCell align="center">Ano</TableCell>
                            <TableCell align="center">Km</TableCell>
                            <TableCell align="center">Cidade</TableCell>
                            <TableCell align="center">Ação</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {carrosList.map((row, index) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">
                                    <Avatar alt={row.nome} src={"http://localhost/storage/" + row.foto} />
                                </TableCell>
                                <TableCell align="center">{row.nome}</TableCell>
                                <TableCell align="center">{row.marca}</TableCell>
                                <TableCell align="center">{row.modelo}</TableCell>
                                <TableCell align="center">{row.valor}</TableCell>
                                <TableCell align="center">{row.ano}</TableCell>
                                <TableCell align="center">{row.km}</TableCell>
                                <TableCell align="center">{row.cidade}</TableCell>
                                <TableCell align="center">
                                    <Tooltip title="Editar">
                                        <IconButton size="small" variant="outlined" color="primary" onClick={() => handleEdit(row.id)}>
                                            <FiEdit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Deletar">
                                        <IconButton size="small" color="error" variant="outlined" onClick={() => handleDelete(row.id, index)}>
                                            <FiTrash2 />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Adicionar Carro</DialogTitle>
                    <DialogContent>
                        {createCarro.id &&
                            <Avatar alt={createCarro.nome} src={createCarro.foto}/>
                        }
                        <TextField 
                            fullWidth
                            variant="standard"
                            margin="dense"
                            id="foto"
                            label="Foto"
                            required
                            type="file"
                            onChange={onFileChange}
                            name="foto" />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="nome"
                            label="Nome"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="nome"
                            required
                            value={createCarro.nome}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="marca"
                            label="Marca"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="marca"
                            required
                            value={createCarro.marca}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="modelo"
                            label="Modelo"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="modelo"
                            required
                            value={createCarro.modelo}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="valor"
                            label="Valor"
                            type="number"
                            fullWidth
                            variant="standard"
                            name="valor"
                            value={createCarro.valor}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="ano"
                            label="Ano"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="ano"
                            value={createCarro.ano}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="km"
                            label="KM"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="km"
                            value={createCarro.km}
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="cidade"
                            label="Cidade"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="cidade"
                            value={createCarro.cidade}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        {createCarro.id ?
                            <Button onClick={() => handleUpdate(createCarro.id)}>Atualizar</Button>
                        :
                            <Button onClick={handleRegister}>Adicionar</Button>
                        }
                    </DialogActions>
                </Dialog>
            </Container>
        </React.Fragment>
    );
}