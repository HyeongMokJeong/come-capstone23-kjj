import styled from "styled-components";
import { makeImagePath } from "../api&utils";
import { useState } from "react";
import { useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import axios from 'axios';
import { AiFillCloseCircle } from "react-icons/ai";
import Navtop from "../Components/Navtop";
import { BsToggle2Off,BsToggle2On ,BsFillCheckCircleFill} from "react-icons/bs";
import Overlay from "../Components/Overlay";
import { AiFillPlusCircle } from "react-icons/ai";
import shortid from "shortid";

const Wrapper = styled.div`
display:flex;
flex-direction:column;
width:85vw;
height:100vh;
position:relative;
margin-top:8px;
`;
const Tip = styled.ul`
    display:flex;
    flex-direction:column;
    align-items:space-evenly;
    justify-content:center;
    width:33vw;
    height:10vh;
    position:absolute;
    right:0;
    margin-top:1vh;
    margin-right:26vw;
    li{
        font-weight:500;
        font-size:15px;
        color:#C63333;
    }
`;
const ItemWrapper = styled.div`
    width:85vw;
    height:100vh;
    span{
        margin-left:30px;
        font-weight:600;
    }
`;
const Item = styled.div`
    width:57vw;
    height:18vh;
    background-color:#C8D5EF;
    margin:10px 30px;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Itemimg = styled.div`
width:11vw;
margin-left:12px;
height:15vh;
background-image:url(${props => props.bgPhoto});
background-size:cover;
background-position:center center;
`;
const ItemInfo = styled.div`
    width:30vw;
    height:15vh;
    display:flex;
    position:relative;
    flex-direction:column;
    justify-content:center;
    align-items:flex-start;
    span{
        font-size:13px;
    }
    span:first-child{
        margin-left:28px;
        font-size:24px;
        font-weight:600;
    }
    button{
        margin-left:14vw;
        background-color:#6F4FF2;
        width:5vw;
        height:4vh;
        color:white;
        border:1px solid #6F4FF2;
        border-radius:5px;
    }
`;
const ItemUD = styled.div`
    width:7vw;
    height:15vh;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    align-items:center;
    button{
        width:6vw;
        height:4vh;
        margin-bottom:5px;
        background-color:#DC3546;
        color:white;
        border-radius:5px;
        border:1px solid #DC3546;
    }
`;
const Itemfinal = styled.div`
    width:10vw;
    height:15vh;
    display:flex;
    justify-content:center;
    align-items:flex-end;
    button{
        width:7vw;
        height:4vh;
        margin-bottom:5px;
        background-color:#6F4FF2;
        color:white;
        border-radius:5px;
        border:1px solid #6F4FF2;
    }
`;
const CheckDelete = styled.div`
    width:24vw;
    z-index:1;
    height:36vh;
    background-color:white;
    border:1px solid #1473E6;
    position:absolute; 
    margin:0 auto;
    left:0;
    right:0;
    top:250px;
    position:fixed;
    display:flex;
    flex-direction:column;
    align-items:center;
`;
const CheckDelete_img = styled.div`
    width:10vw;
    height:15vh;
    background-image:url(${props => props.bgPhoto});
    background-size:cover;
    background-position:center center;
    
`;
const CheckDelete_btn = styled.div`
    width:12vw;
    height:15vh;
    display:flex;
    align-items:center;
    justify-content:space-between;
    button{
        width:4.5vw;
        height:4vh;
        border-radius:5px;
        color:white;
    }
    button:first-child{
        background-color:#DC3546;
        border:1px solid #DC3546;
    }
    button:last-child{
        background-color:#6F4FF2;
        border:1px solid #6F4FF2;
    }
`;
const UpdateWrapper = styled.div`
    z-index:1;
    width:34vw;
    height:80vh;
    border-radius:15px;
    background-color:white;
    position:absolute;
    border:1px solid white;
    left:0;
    right:0;
    margin:0 auto;
    top:100px;
    position:fixed;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    button{
        width:6vw;
        height:5vh;
        background-color:#6F4FF2;
        border:1px solid #6F4FF2;
        border-radius:15px;
        margin-bottom:25px;
        color:white;
    }
`;
const UpdateTitle = styled.div`
    width:34.2vw;
    margin-top:-1.2px;
    height:10vh;
    border-top-left-radius:15px;
    border-top-right-radius:15px;
    display:flex;
    background-color:#d9d9d9;
    justify-content:space-between;
    align-items:center;
    span{
        font-size:20px;
        font-weight:600;
        margin-left:20px;
    }
`;
const UpdateText = styled.form`
    width:32vw;
    height:25vh;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    div{
        width:28vw;
        height:10vh;
        display:flex;
        justify-content:space-between;
        align-items:center;
        span{
            font-size:15px;
            font-weight:600;
            color:#A5A5A5;
        }
        input{
            width:14vw;
            height:3vh;
            border-radius:25px;
            border:1px solid #a9a9a9;
        }
    }
`;
const UpdateImg = styled.div`
    width:32vw;
    height:17vh;
    display:flex;
    justify-content:space-between;
    align-items:center;
    input{
        width:15vw;
        height:5vh;
    }
`;
const UpdateImg_defaultimg = styled.div`
width: 90px;
height: 90px;
border-radius:50px;
background-color:white;
display:flex;
justify-content:center;
align-items:center;
color:#979797;
border:1px solid #979797;
margin-left:20px;
`;
const UpdateImg_img = styled.div`
    width:10vw;
    height:20vh;
    background-image:url(${props => props.bgPhoto});
    background-size:cover;
    background-position:center center;
    margin-left:20px;
`;
const Updatebackban = styled.div`
    width:32vw;
    height:10vh;
    display:flex;
    justify-content:space-between;
    align-items:center;
`;
const Updatebackban_text = styled.div`
    display:flex;
    flex-direction:column;
    align-items:space-between;
    justify-content:center;
    span{
        font-size:20px;
        color:#a9a9a9;
    }
    span:last-child{
        font-size:10px;
        color:#a9a9a9;
    }
`;


function Menu(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [savedData, setSaveddata] = useState([]);

    // 이미지 조회
    const [getimage, setgetimage] = useState(null)

    const deletePathMatch = useMatch('/menu/:deleteId'),UpdatePathMatch = useMatch('/menu/update/:updateId');
    
     // 식단표 사용 (백반 지정)
    const [isSickdan, setIsSickdan] = useState(false);
    const [isBackban, setIsbackban] = useState(false);
    
    // 메뉴페이지 시작시, 첫 api호출
    useEffect(() => {
        axios.get('/api/manager/menu')
        .then(res => setSaveddata(res.data))
        .then(setIsLoading(false))

        axios.get('/api/manager/menu/planner')
        .then(res => setIsSickdan(res.data))

        axios.get('/api/image').then(res => console.log(res))

    },[]) 

    // 메뉴 삭제 or 수정하기 위해
    const DeletePath = deletePathMatch?.params.deleteId && savedData?.find(data => data.id == deletePathMatch.params.deleteId);
    const UpdatePath = UpdatePathMatch?.params.updateId && savedData?.find(data => data.id == UpdatePathMatch.params.updateId);
    
    // 메뉴 품절
    const on품절 = (id) => {
        axios.patch(`/api/manager/menu/${id}/sold/n`)
        .then(()=>{
            axios.get(`/api/manager/menu`)
            .then(res => setSaveddata(res.data))
        })
    };
    const on재판매 = (id) => {
        axios.patch(`/api/manager/menu/${id}/sold/y`)
        .then(()=>{
            axios.get(`/api/manager/menu`)
            .then(res => setSaveddata(res.data))
        })
    }

    // 메뉴 추가, 수정
    const [name, setName] = useState(''),[cost, setCost] = useState(''),[info, setInfo] = useState(''),[details, setDetails] = useState('');
    const [image, setImage] = useState(null);

    const onUpdate = (id) => {
        navigate(`/menu/update/${id}`);
    }
    const onMenuAdd = () => {
        const formdata = new FormData();
          let body = {
            name,
            cost,
            info : '알레르기 정보: '+info,
            details,
            usePlanner: isSickdan ? false : isBackban ? true : false
          };
        const blob = new Blob([JSON.stringify(body)], {type:"application/json"})
        formdata.append("data",blob);
        formdata.append("file",image);

        axios({
            method:'POST',
            url:'/api/manager/menu/add',
            data:formdata,
            headers: {
                "Content-Type": "multipart/form-data", // Content-Type을 반드시 이렇게 하여야 한다.
              }
        }).then(() => {
            // 새로운 메뉴가 추가되거나 메뉴가 업데이트 되면, 전체 메뉴 목록을 다시 가져옴.
            axios.get(`/api/manager/menu`).then(res=>setSaveddata(res.data))
        }).then(() => {
            axios.get('/api/manager/menu/get/planner').then(res => setIsSickdan(res.data))
        }).catch(err => {
            if(err.response.status == 400){
                alert('메뉴명과 가격은 필수입니다.');
                return;
            }
            else if(err.response.status == 409){
                alert('중복된 메뉴명이 있습니다.');
                return;
            }
        })

        setCost('');
        setInfo('');
        setDetails('');
        setName('');
        setImage(null);
        setIsbackban(false);
        navigate('/menu');
    } 
    const onMenuUpdate = (id) => {
        const formdata = new FormData();
        let 백반여부 = savedData.filter(sd => sd.id ==id)[0].usePlanner;
        
        if(savedData.filter(a => a.id != id).filter(n => n.name == name).length != 0){
            alert("중복된 메뉴명입니다.");
            return;
        }

          let body = {
            name: name === '' ? UpdatePath.name : name,
            cost: cost === '' ? UpdatePath.cost : cost,
            info: info === '' ? UpdatePath.info : '알레르기 정보: '+info,
            details: details === '' ? UpdatePath.details : details,
            usePlanner: 백반여부 ? true : isBackban ? true : false
          };

        const blob = new Blob([JSON.stringify(body)], {type:"application/json"})
        formdata.append("data",blob);
        image != null && formdata.append("file",image);
        axios({
            method:'PATCH',
            url:`/api/manager/menu/${id}/update`,
            data:formdata,
            headers:{
                "Content-Type": "multipart/form-data",
            }
        }).then(()=>{
            axios.get(`/api/manager/menu`).then(res=>setSaveddata(res.data))
        }).then(() => {
            axios.get('/api/manager/menu/get/planner').then(res => setIsSickdan(res.data))
        })
        setCost('');
        setInfo('');
        setDetails('');
        setName('');
        setIsbackban(false);
        navigate('/menu');
    }

    // 메뉴 삭제
    const onDelete = (id) => {
        navigate(`/menu/${id}`);
    }
    const onFinalDelete = (id) => {
        axios.delete(`/api/manager/menu/${id}`)
        .then(() => {
            axios.get(`/api/manager/menu`).then(res=>setSaveddata(res.data))
        })
        .then(() => {
            axios.get(`/api/manager/menu/planner`).then(res=> setIsSickdan(res.data))
        })
        setName('');
        navigate('/menu');
    }

    return(
        <>
        <Wrapper>
            <Navtop pages={"메뉴 관리"}/>
            <Tip>
                <li>요일별 다른 메뉴가 있다면 백반으로 지정해보세요!</li>
                <li>백반으로 지정된 메뉴는 백반관리 페이지에서 요일별 식단표를 추가할 수 있어요!</li>
            </Tip>

            {isLoading ? 
                <h1 style={{marginTop:'100px',marginLeft:'20px'}}>Loading...</h1> 
                : 
                <ItemWrapper>
                <span>전체 {savedData?.length}종</span>
                {savedData?.map(data => 
                <Item style={{backgroundColor: data?.sold == true ? '#C8D5EF': 'rgba(0,0,0,0.4)'}}
                        key={shortid.generate()}>
                    {/* <Itemimg bgPhoto={makeImagePath(data?.image,'w400'||'')}/> */}
                    <div>
                        <img src={data.image} alt="이미지 없음"/>
                    </div>
                    <ItemInfo>
                        <span>{data?.name}</span>  
                        <span>{data?.details}</span>
                        <span>{data?.info}</span>
                        <span>{data?.cost}</span>
                        {data?.sold == true ? null 
                        :
                        <div style={{position:'absolute'}}>
                            <span 
                                style={{marginLeft:'12vw',color:'#DC3546',fontSize:'24px',marginTop:'-2vh'}}>
                                품 절 되었어요.
                            </span> 
                            <button 
                                style={{marginTop:'1vh'}}
                                onClick={() => on재판매(data?.id)}>
                                재판매
                            </button> 
                        </div>}

                        {data?.usePlanner ? 
                        <div style={{position:'absolute',right:0,marginRight:'-15vw',marginTop:'-90px'}}>
                            <span style={{fontSize:'13px'}}>
                                백반으로 지정됨
                                <BsFillCheckCircleFill style={{marginLeft:'1px',color:'#DC3546',marginBottom:'-1.7px'}}/>
                            </span>
                        </div>
                        :null
                        }
                    </ItemInfo> 
                    <ItemUD>
                        <button onClick={() => onDelete(data?.id)}>
                            삭제
                        </button> 
                        <button onClick={() => on품절(data?.id)}>
                            품절
                        </button>    
                    </ItemUD>    
                    <Itemfinal>
                        <button type="submit" onClick={() => onUpdate(data?.id)}>
                            메뉴 수정
                        </button>
                    </Itemfinal>
                </Item>)}
                </ItemWrapper>}
        
            <AiFillPlusCircle
                style={{position:'absolute',right:0,top:'85px',marginRight:'25.2vw',fontSize:'30px'}}
                onClick={() => navigate('/menu/update/0')}/>
        </Wrapper>

        {deletePathMatch?
            <>
            <CheckDelete>
            <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
            <CheckDelete_img bgPhoto={makeImagePath(DeletePath?.image,'w400'||'')}/>
            <div style={{display:'flex',flexDirection:'column',width:'10vw',height:'15vh',alignItems:'center',justifyContent:'center',marginLeft:'10px'}}>
                <span style={{fontSize:'22px',fontWeight:'600'}}>
                    {DeletePath?.name}
                </span>
                <span>
                    {DeletePath?.cost}
                </span>
            </div>
            </div>
            <span style={{marginTop:'30px',fontWeight:'600'}}>
            정말 삭제하시겠습니까?
            </span>
            <CheckDelete_btn>
            <button onClick={() => onFinalDelete(DeletePath?.id)}>
                삭제
            </button>
            <button onClick={() => navigate('/menu')}>
                취소
            </button>
            </CheckDelete_btn>
            </CheckDelete>
            <Overlay/>
            </>
            :null}

        {UpdatePathMatch?
            <>
            <UpdateWrapper>
            <UpdateTitle>
                <span>
                    {UpdatePathMatch.params.updateId == 0 ? '메뉴 추가' : '메뉴 수정'}
                </span>
                <AiFillCloseCircle 
                    onClick={() => navigate('/menu')} 
                    style={{fontSize:'20px',fontWeight:600,marginRight:'20px'}}/>
            </UpdateTitle>

            <UpdateText id="data">
                <div>
                    <span>메뉴명</span>
                    <input 
                        placeholder={UpdatePath?.name}
                        value={name} 
                        onChange={(e) => setName(e.target.value)}/>
                </div>
                <hr style={{color:'#a9a9a9',width:'34vw', marginLeft:'-1vw'}}/>
                <div>
                    <span>가격</span>
                    <input 
                        placeholder={UpdatePath?.cost}
                        value={cost} 
                        onChange={e => setCost(e.target.value)}/>
                </div>
                <hr style={{color:'#a9a9a9',width:'34vw', marginLeft:'-1vw'}}/>
                <div>
                    <span>소개</span>
                    <input 
                        placeholder={UpdatePath?.details}
                        value={details} 
                        onChange={e=> setDetails(e.target.value)}/>
                </div>
                <hr style={{color:'#a9a9a9',width:'34vw', marginLeft:'-1vw'}}/>
                <div>
                    <span>알레르기 정보</span>
                    <input 
                        placeholder={UpdatePath?.info}
                        value={info} 
                        onChange={e => setInfo(e.target.value)}/>
                </div>
                <hr style={{color:'#a9a9a9',width:'34vw', marginLeft:'-1vw'}}/>
            </UpdateText>

            <UpdateImg>
                <UpdateImg_defaultimg>
                    이미지없음
                </UpdateImg_defaultimg>
                <input type="file" accept="image/*" onChange={e => setImage(e.target.files[0])}/>
            </UpdateImg>
            <hr style={{width:'34vw'}}/>

                {
                    // 식단이 등록되있는 경우
                    isSickdan ?
                    <Updatebackban>
                    <Updatebackban_text>
                    <span>지정된 백반이 이미 있습니다.</span>
                    <span>백반을 등록하시려면 우선 지정된 백반을 삭제해주세요.</span>
                    </Updatebackban_text>
                    <BsToggle2On
                    // onClick={()=> setIsSickdan(false)}
                    style={{fontSize:'30px',marginRight:'20px',color:'#5856D6'}}/>
                    </Updatebackban> 
                    :

                    // 식단이 등록되지 않았을 경우
                    isBackban == false ? 
                    <Updatebackban>
                    <Updatebackban_text>
                        <span>백반으로 지정하시겠습니까?</span>
                        <span>백반은 최대 1개의 메뉴만 저장가능하며, 요일 별 식단표는 백반관리에서 등록할 수 있습니다.</span>
                    </Updatebackban_text>
                    <BsToggle2Off
                        onClick={()=> setIsbackban(true)}
                        style={{fontSize:'30px',marginRight:'20px',color:'#d9d9d9'}}/>
                    </Updatebackban> 
                    :
                    <Updatebackban>
                    <Updatebackban_text>
                    <span>'
                        {UpdatePath ? UpdatePath?.name : name}
                        '을 백반으로 지정함.
                    </span>
                    <span>백반으로 등록하시려면 저장을 눌러주세요.</span>
                    </Updatebackban_text>
                    <BsToggle2On
                    onClick={()=> setIsbackban(false)}
                    style={{fontSize:'30px',marginRight:'20px',color:'#5856D6'}}/>
                    </Updatebackban> 
                }
        
            <button onClick={UpdatePathMatch.params.updateId == 0 ? onMenuAdd : () => onMenuUpdate(UpdatePathMatch.params.updateId)}>저장</button>

        </UpdateWrapper>
        <Overlay/>
            </>:null}
            </>
    )}

export default Menu;