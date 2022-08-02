import React from 'react';
import { Routes, Navigate, Route } from 'react-router-dom';
import { Home, FileUpload, ResultPage, Graphs } from './views';

export const MyRoutes = () => {
	return(
		<Routes>
			<Route exact path="/ir" element={<Home/>} />
			<Route exact path="/ir/file-uploads" element={<FileUpload />}/>
			<Route exact path="/ir/result" element={<ResultPage />} />
			<Route exact path="/ir/graph" element={<Graphs />} />
			<Route component={Navigate} to="/ir" />
		</Routes>
	);
}
