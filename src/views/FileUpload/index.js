import React, {useCallback, useEffect, useState } from 'react'
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CustomLoader from '../../components//CustomLoader';
import { uploadFile } from 'react-s3';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar';
window.Buffer = window.Buffer || require("buffer").Buffer;


const S3_BUCKET = process.env.REACT_APP_S3_BUCKET;
const REGION = process.env.REACT_APP_REGION;
const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;

const config = {
	bucketName: S3_BUCKET,
	region: REGION,
	accessKeyId: ACCESS_KEY,
	secretAccessKey: SECRET_ACCESS_KEY,
}

const DropZoneContainer = styled.div`
	const S3_BUCKET ='YOUR_BUCKET_NAME';
	const REGION ='YOUR_REGION_NAME';
	const ACCESS_KEY ='YOUR_ACCESS_KEY';
	const SECRET_ACCESS_KEY ='YOUR_SECRET_ACCESS_KEY';
	width: 100%;
	overflow: hidden;
`;
const DropZone = styled.div`
	border: dashed;
	cursor: pointer;
	overflow: hidden;
	position: relative;
	box-sizing: border-box;
	min-height: 250px;
	width: 40%;
	border-color: rgba(0, 0, 0, 0.12);
	border-radius: 4px;
	margin: 50px 10px 10px 50px;
	background-color: #D3D3D3;
	float: left;
`;

const TextCenter = styled.p`
	text-align: center;
	padding-top: 20px;
	font-size: 24px;
`;

const ResultButtonsContainer = styled.div`
	text-align:center;
	margin-top: 120px;
`;

const ButtonCenter = styled.div`
	margin: 100px 0px 100px 0px;
	float: left;
`;

const ValidationText = styled.p`
	text-align: center;
	padding-top: 10px;
	font-size: 18px;
	color: red;
`;

const FileName = styled.div`
	font-size: 14px;
`;

const FileNameDisplayContainer = styled.div`
	width: 50%;
	float: left;
`;

export const FileUpload = () => {
	const [qrelFile, setQrelFile] = useState([]);
	const [resultFiles, setResultFiles] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const navigate = useNavigate()
	const uuid = uuidv4();

	useEffect(() => {
		localStorage.setItem("uuid", uuid);
		localStorage.setItem('fileMeta', null)
	}, []);
	console.log('RESULT files====>', resultFiles);

	useEffect(() => {
		if (qrelFile.length > 0 && resultFiles.length > 0) {
			setMessage('');
		}
	}, [qrelFile, resultFiles])

	const setQrelFileFunc = (fileData) => {
		setQrelFile(fileData);
	}

	const setResultFilesFunc = (fileData) => {
		setResultFiles(fileData);
	}

	const removeMessage = () => {
		if (qrelFile.length > 0 && resultFiles.length > 0) {
			if (message.length !== 0) {
				setMessage('');	
			}
		}
	}

	console.log('QREL files====>', qrelFile);

	const removeFile = (file, index) => {
		let filesData = (file.type === 'qrel') ? JSON.parse(JSON.stringify(qrelFile)) : JSON.parse(JSON.stringify(resultFiles));
		
		filesData.splice(index, 1);

		if (file.type === 'qrel') {
			setQrelFile(filesData)	
		} else {
			setResultFiles(filesData);
		}
	}

	const setLoader = (flag) => {
		setLoading(flag);
	}

	const redirectToResultPage = (type) => {
		if(resultFiles.length < 1 || qrelFile.length < 1){
			setMessage('Please upload aleast one file of each type!!')
			return;
		}
		const fileMeta = getFileMeta();
		const payload = {
			"id": localStorage.getItem("uuid"),
			"fileDetailsList": fileMeta
		};
		localStorage.setItem('fileMeta', JSON.stringify(payload));
		localStorage.setItem('requestType', type)
		navigate('/ir/result');
	}

	const getFileMeta = () => {
		const data = [];

		qrelFile.forEach((file) => {
			const fileQrelMeta = {
				"fileName": file.name,
				"fileType": file.type
			};
			data.push(fileQrelMeta);
		});

		resultFiles.forEach((file) => {
			const fileResultMeta = {
				"fileName": file.name,
				"fileType": file.type
			};
			data.push(fileResultMeta);
		});

		return data;
	}

	removeMessage();

	return(
		<div>
	<Navbar/>
		<React.Fragment>
			{(isLoading) && <CustomLoader />}
			<DropZoneContainer>
			<DropZone>
				<MyDropzone fileType="qrel" files={qrelFile} setFile={setQrelFileFunc} setLoader={setLoader} uuid={uuid}/>
			</DropZone>
			<DropZone>
				<MyDropzone fileType="result" files={resultFiles} setFile={setResultFilesFunc} setLoader={setLoader} uuid={uuid}/>
			</DropZone>
		</DropZoneContainer>
		{message.length > 0 && <TextCenter><span style={{color: "red"}}>{message}</span></TextCenter> }
		{(qrelFile && qrelFile.length > 0) &&
			<FileNameDisplayContainer>
				<p style={{ marginLeft: '50px' }}>Qrel File Uploaded:</p>
					{qrelFile && 
						qrelFile.map((file, index) => {
							return(<><FileName key={file.name + file.type + index} style={{marginLeft: '50px', float: 'left'}}>{file.name}</FileName><CloseIcon style={{ cursor: 'pointer', marginTop: '-4px'}} onClick={()=> {removeFile(file, index)}} /></>)
						})
					}
			</FileNameDisplayContainer>
		}
		{(resultFiles && resultFiles.length > 0) &&
			<FileNameDisplayContainer>
				<p>Result File Uploaded:</p>
					{resultFiles && 
						resultFiles.map((file, index) => {
							return(<p key={file.name + file.type + index}>{file.name}<CloseIcon style={{ cursor: 'pointer', marginTop: '0px'}} onClick={()=> {removeFile(file, index)}}/> </p>)
						})
					}
			</FileNameDisplayContainer>
		}
		<ResultButtonsContainer>
			<Button variant='contained' color="primary" style={{marginRight: '220px'}} onClick={()=> {redirectToResultPage('summary')}}>Summary Result</Button>
			<Button variant='contained' color="primary" onClick={()=> {redirectToResultPage('detailed')}}>Detailed Result</Button>
		</ResultButtonsContainer>
		</React.Fragment>
		</div>
	)
}


function MyDropzone({fileType, files, setFile, setLoader, uuid}) {
	const [validationMessage, setValidationMessage] = useState('');
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach(async(file) => {
			if(file && file.type !== 'text/plain') {
				setValidationMessage('Please upload text file!');
				return;
			}

			setValidationMessage('');
			console.log(file);
			setLoader(true);
			let uniqueID = localStorage.getItem("uuid");
			config.dirName = `${uniqueID}/${fileType}`
			uploadFile(file, config)
			.then(data => {
				console.log('File uploaded===>', data)
				let fileData = { name: file.name };
				fileData.type = fileType;
				files.push(fileData);
				setFile(files);
				setLoader(false);
			})
			.catch(err => {
				setLoader(false);
				console.error(err)
			})
    })
    
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
	
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <TextCenter>{`Please upload your ${fileType} ${ (fileType === 'qrel') ? 'file' : 'files'}`}</TextCenter>
			<ValidationText>{validationMessage}</ValidationText>
			<TextCenter><Button variant="contained">Upload</Button></TextCenter>
    </div>
  )
}