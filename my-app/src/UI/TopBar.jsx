import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import home from './home.png';

const LogoContainer = styled.div`    
    &:hover {
    cursor: pointer;   
    }
`;

export default function TopBar(props) {
    const navigate = useNavigate();

    return (
        <div
            style={{
                background: 'linear-gradient(59deg, rgba(23,55,117,1) 0%, rgba(75,100,148,1) 100%)',
                height: "60px",
                display: "flex",
                justifyContent: "space-between",
                position: 'relative',
                zIndex: '2',
                borderBottom: '4px solid white'
            }}
        >
            <LogoContainer
                style={{
                    fontSize: '35px',
                    paddingLeft: '100px'
                }}
            >
                <btn onClick={() => {
                        navigate('/home');
                }}>
                    <img src={home} alt='home' style={{ height: '100%', width: '100%', objectFit: 'cover' }}></img>
                </btn>
            </LogoContainer>
            <div
                style={{
                    display: 'flex'
                }}
            >
                {props.children}
            </div>
        </div>
    )
}