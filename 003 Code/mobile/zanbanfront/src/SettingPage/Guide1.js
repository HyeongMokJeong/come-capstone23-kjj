import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Guide1() {
    const weekstyle = {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        border: '1px solid black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const textstyle = {
        textAlign: 'center',
        color: '#A93528'
    }

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 style={{ ...textstyle, marginTop: '50px', marginBottom: 0 }}>한밭대학교</h1>
                <h2 style={textstyle}>이용 요일과 메뉴를 설정해주세요.</h2>
                <p style={{ textAlign: 'center', marginTop: '70px' }}>
                    · 구내식당을 이용할 요일을 설정해주세요
                    <br />· 이용 요일은 수정할 수 있어요.
                    <br />· 개인 일정에 따라 일별로도 수정할 수 있어요.</p>
                <p style={{ textAlign: 'center', marginTop: '50px' }}>
                    이용요일<br />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px', marginTop: '10px' }}>
                        <div style={{ ...weekstyle, backgroundColor: '#A3F394' }}>월</div>
                        <div style={weekstyle}>화</div>
                        <div style={{ ...weekstyle, backgroundColor: '#A3F394' }}>수</div>
                        <div style={weekstyle}>목</div>
                        <div style={{ ...weekstyle, backgroundColor: '#A3F394' }}>금</div>
                    </div>
                </p>
                <Link to='/Guide1' style={{ color: 'inherit', textDecoration: 'none' }}>이용 가이드</Link>
                <div style={{ position: 'absolute', bottom: '100px', right: '30px' }}>
                    <button>
                        <Link to='/Guide2' style={{ display: 'flex', alignItems: 'center' }}>
                            <FaArrowRight style={{ marginTop: '5px', marginBottom: '5px' }} />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Guide1;