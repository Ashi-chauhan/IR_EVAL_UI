import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Main = styled.div`
  text-align: center;
	margin: 200px 50px 200px 300px;
	width: 50%
`;

const StartButton = styled.button`
	margin-top: 20px;
	text-decoration: none;
	color: white;
	background-color: blue;
	display: inline-block;
	border: none;
	font-size: 14px;
	padding: 15px 32px;
	cursor: pointer;
`;

export const Home = () => {
	localStorage.setItem("uuid", null);
	return(
		<Main>
			<div>Welcome to the Information Retrieval.</div>
			<div>Please click on below button to upload the files and see the results</div>
			<Link to={'/ir/file-uploads'}><StartButton>Start</StartButton></Link>
		</Main>
	)
}