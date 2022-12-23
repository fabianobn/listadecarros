import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import api from '../../services/api';
import './styles.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Lists() {
  const [token] = useState(localStorage.getItem('token'));
  const [carrosList, setCarrosList] = useState([]);
  const [listId,setListId] = useState('');

  const history = useNavigate();

  useEffect(() => {
    api.get('api/carro', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => {
      if(response.data.status && response.data.status === (401 || 498)){
        localStorage.clear();
        history('/');
      }else{
        setCarrosList(response.data.data);
      }
    }).catch(err => {
      alert(err)
    })
  }, [token]);
  
  return (
    <React.Fragment>
      <Header />

      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {carrosList.length > 0 ? carrosList.map((list) => 
            ( 
              <Grid item xs={3} key={list.id}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 240 }}
                    image={"http://localhost/storage/" + list.foto}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {list.nome}
                    </Typography>
                    {list.ano || list.km || list.cidade &&
                      <Typography variant="body2" color="text.secondary">
                        {list.ano} {list.km} {list.cidade}
                      </Typography>
                    }
                    {list.valor &&
                    <Typography gutterBottom variant="h5" component="div" color="#304ffe">
                      R$ {list.valor}
                    </Typography>
                    }
                  </CardContent>
                </Card>
              </Grid>
            )) : null 
          }
        </Grid>
      </Container>
    </React.Fragment>
  );
}