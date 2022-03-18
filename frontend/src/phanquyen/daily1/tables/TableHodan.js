import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { getComparator } from "../../../utils";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsHodan } from "./headCells";
import DialogMaterial from "../../../components/DialogMaterial";
import styled from "styled-components";
import apiDaily1 from "../../../axios/apiDaily1";
import { toast } from "react-toastify";
import Popup from "../../../popup/Popup";
import { useContext } from "react";
import { StateContext } from "../../../Context/StateContext";

const TableHodan = ({
  dsHodan = [],
  setSuccess,
  daily1Id,
  setRefresh,
  readOnly,
}) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [modalDuyetOpen, setModalDuyetOpen] = React.useState(false);
  const [rowOfDuyet, setrowOfDuyet] = React.useState("");

  const handleOpenModalDuyet = async (id) => setModalDuyetOpen(true);

  const onClickDuyet = () => handleOpenModalDuyet();

  const handleDuyetHodan = async () => {
    const { success } = await apiDaily1.activeHodan(rowOfDuyet, daily1Id);
    if (success) {
      setRefresh(true);
      toast.success("Duyệt thành công!", { theme: "colored" });
      setSuccess(true);
    }
  };

  const handleCloseModalDuyet = () => setModalDuyetOpen(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsHodan.map((item) => item._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsHodan.length) : 0;
  const context = useContext(StateContext);
  return (
    <>
      <Popup show={context.show} />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="small"
              id="tableMaterial"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={dsHodan.length}
                headCells={headCellsHodan}
              />
              <TableBody>
                {dsHodan
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row._id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">
                          {readOnly ? (
                            row.daidien
                          ) : (
                            <Link to={`/daily1/hodan/chitiet/${row._id}`}>
                              {row.daidien}
                            </Link>
                          )}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row.user,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row.sdt}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row.user,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row.cmnd}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row.user,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row.namsinh}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row.user,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row?.loaisanpham?.ten}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row.user,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row.langnghe.ten}
                        </TableCell>
                        <TableCell align="right">
                          {row.active ? (
                            <Badge className="success">Đã kích hoạt</Badge>
                          ) : (
                            <Badge className="danger">Chờ duyệt</Badge>
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {!row.active ? (
                            readOnly ? (
                              <button
                                type="button"
                                class="btn btn-outline-danger"
                              >
                                Chờ duyệt...
                              </button>
                            ) : (
                              <button
                                className="btn btn-info"
                                onClick={() => {
                                  onClickDuyet();
                                  setrowOfDuyet(row._id);
                                }}
                              >
                                <i class="fas fa-user-edit"></i> Duyệt
                              </button>
                            )
                          ) : (
                            <button type="button" class="btn btn-outline-info">
                              <i class="fas fa-check"></i> Đã duyệt
                            </button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            colSpan={3}
            count={dsHodan.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
            component="div"
          />
        </Paper>
      </Box>

      <DialogMaterial
        open={modalDuyetOpen}
        onClose={handleCloseModalDuyet}
        title="Duyệt hộ dân"
        content="Xác nhận hộ dân đăng ký tài khoản"
        text1="Hủy"
        text2="Đồng ý"
        onClick1={handleCloseModalDuyet}
        onClick2={handleDuyetHodan}
      />
    </>
  );
};

const Badge = styled.div`
  display: inline-block;
  text-align: center;
  color: #fff;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 4px;
  &.success {
    background-color: #28a745;
  }
  &.danger {
    background-color: #dc3545;
  }
`;

export default TableHodan;
