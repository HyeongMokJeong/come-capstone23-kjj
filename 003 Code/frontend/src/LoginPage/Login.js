import styled from 'styled-components';
import background from '../image/capstone_background.png';
import { useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import axios from 'axios';
import { R_login } from '../store';

const Inputstyle = {width:'320px',height:'30px',borderRadius:'15px',border:'1px solid gray'};

const Wrapper = styled.div`
    background-image:url(${background});
    background-repeat:no-repeat;
    background-position:top center;
    background-size:cover;
    background-attachment:fixed;
    width:100vw;
    height:100vh;
    z-index:5;
    display:flex;
    justify-content:center;
    align-items:center;
`

const LoginW = styled.div`
    width:500px;
    height:500px;
    background-color:white;
    z-index:1;
    display:flex;
    border-radius:30px;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
`

const Title = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin-top:60px;
flex-direction:column;
    span:first-child{
        font-size:50px;
        color:#0A376E;
        font-weight:600;
        font-family:'Alegreya';
    }
    span:last-child{
        font-size:35px;
        color:#0A376E;
        font-weight:600;
        font-family:'Alegreya';
    }
`

const LogininputW = styled.form`
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;
width:450px;
height:270px;
button{
    width:100px;
    height:30px;
    border-radius:15px;
    background-color:#1473E6;
    color:white;
    font-size:20px;
    margin-bottom:50px;
    border:1px solid #1473E6;
}
`

const IDD = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width:450px;
span{
    font-weight:600; 
}
`

const PWW = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
width:450px;
span{
    font-weight:600; 
}
margin-bottom:80px;
`

function Login(){
    const dispatch = useDispatch();
    const [ID,setID] = useState(''), [PW,setPW] = useState('');
    const onSubmit = (event) => {
        event.preventDefault();
        let body = {ID,PW}
        axios.get(`http://localhost:3000/users`)
        .then(res => res.data.filter(res_ID => res_ID.ID === body.ID != '') ?
        res.data.filter(res_PW => res_PW.ID === body.ID)[0].PW === body.PW?
        axios.post(`http://localhost:3000/users`,body)
        .then(res => dispatch(R_login(res.data)))
        :null:null)
    }
    return(
        <Wrapper>
            <LoginW onSubmit={onSubmit}>
                <Title>
                    <span>ZanbanZero</span>
                    <span>관리자</span>
                </Title>
                
                <LogininputW>
                    <IDD>
                        <span>ID</span>
                        <input type='text' value={ID} onChange={e => setID(e.target.value)} style={Inputstyle}/>
                    </IDD>
                    <PWW>
                        <span>Password</span>
                        <input type='password' value={PW} onChange={e => setPW(e.target.value)} style={Inputstyle}/>
                    </PWW>
                    <button type='submit'>LOGIN</button>
                </LogininputW>

            </LoginW>
        </Wrapper>
    )
}

export default Login;