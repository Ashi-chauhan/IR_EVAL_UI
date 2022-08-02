import React, { Fragment, useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../navbar";
import Filter from "./filter-dropdown";
import AppService from '../../service';
import CustomLoader from '../../components//CustomLoader';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import TablePagination from '@material-ui/core/TablePagination';
import { v4 as uuidv4 } from 'uuid';
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#0d88df",
    color: theme.palette.common.white,
    fontWeight: "bold",
    maxWidth: 3,
     overflow:"hidden", 
    textOverflow:"ellipsis",
    cursor:"pointer",
  },
  body: {
    fontSize: 14,
    border: "2px solid black",
  },
}))(TableCell);


const useStyles = makeStyles({
  table: {
    maxWidth: "90%",
    minWidth:"50%",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "3%",
    overflowX: "auto",
  },
});


const PaginationContainer = styled.div`
  margin: 20px 40px 20px 0px;
`;

export const ResultPage = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState({});
  const headers = tableData ? tableData.header : [];
  const metaData = tableData ? tableData.metaData : [];
  const graph1Data = tableData ? tableData.graph1Data : [];
  const graph2Data = tableData ? tableData.graph2Data : [];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const uniqueId = localStorage.getItem("uuid");

    if (uniqueId &&  tableData && Object.keys(tableData).length === 0) {
      const payload = localStorage.getItem('fileMeta');
      const requestType = localStorage.getItem('requestType');
      //setLoader(true);
      AppService.getResult(JSON.parse(payload), requestType)
      .then((res) => {
        if (typeof res === 'object' && res) {
          setTableData(res);
          setFilterTable(res.metaData);
        } else {
          alert('Something went wrong while fetching Table Data!!!');
        }
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
    }
  }, [])

  const setLoader = (flag) => {
		setLoading(flag);
	}

  const redirectToGraph = () => {
    localStorage.setItem("graph1Data", JSON.stringify(graph1Data));
    localStorage.setItem("graph2Data", JSON.stringify(graph2Data));
    navigate('/ir/graph');
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    const downloadResultFiles = () => {
    const uniqueId = localStorage.getItem("uuid");
    const url = `${process.env.REACT_APP_API_URL}/download?id=${uniqueId}`;
    window.open(url, '_blank');
  }

  const [tableFilter, setFilterTable] = useState(metaData);
const updateFilter = (filterData) => { 
    let filteredResult = metaData.filter((item) => filterData.indexOf(Object.keys(item)[0]) >= 0);
    filteredResult = filterData.length > 0 ? filteredResult : metaData;
    setFilterTable([]);
    setFilterTable(filteredResult);
  };
  const requestType = localStorage.getItem('requestType');

  return (
    <div>
    <Navbar />
    <Filter filterChange={updateFilter}></Filter>
      {(isLoading) && <CustomLoader />}
      <PaginationContainer>
      { tableFilter && tableFilter.length > 0 &&
        <Fragment>
          <TablePagination
            component="div"
            style={{float: "left", alignSelf:"center"}}
            count={tableFilter.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {requestType === "summary" && 
          <BarChartIcon title={"View in Graph"} style={{fontSize: "40px", cursor: 'pointer'}} onClick={()=> {redirectToGraph()}}/>
          }
          <CloudDownloadIcon title={"Download"} style={{fontSize: "40px", cursor: 'pointer'}} onClick={()=>{downloadResultFiles()}}/>
       
        </Fragment>
      }
      </PaginationContainer >
     
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ border: "2px solid black", fontWeight: "bold" }}>
            <TableRow>
              {headers &&
                headers.map((_column, index) => {
                  return <StyledTableCell title={_column} key={index} >{_column}</StyledTableCell>;
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableFilter && (rowsPerPage > 0
            ? tableFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tableFilter).map((row) => (
              <TableRow
                key={uuidv4()}
                style={{ border: "2px solid black" }}
              >
                <TableCell component="th" scope="row">
                  {Object.keys(row)}
                </TableCell>
                {row[Object.keys(row)] &&
                  row[Object.keys(row)].map((rowData, index) => {
                    return (
                      <StyledTableCell key={index} align="right">
                        {rowData.value}
                      </StyledTableCell>
                    );
                  })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
};
