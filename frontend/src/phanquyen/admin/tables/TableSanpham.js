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
import { useHistory } from "react-router-dom";
import img_placeholder from "../../../assets/images/img_placeholder.png";
import EnhancedTableHead from "../../../components/table/EnhancedTableHead";
import { formatMoney, getComparator } from "../../../utils";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { headCellsSanpham } from "./headCells";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import DialogMaterial from "../../../components/DialogMaterial";
import TableButton from "../../../components/TableButton";
import apiSanpham from "../../../axios/apiSanpham";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const EnhancedTableToolbar = ({
  numSelected,
  rowsSelected,
  onClickChitiet,
  onClickCapnhat,
  handleRedirectToTaisudung,
  onClickXoa,
}) => {
  return numSelected > 0 ? (
    <>
      <Toolbar
        sx={{
          pl: { sm: 7 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            <div className="d-flex align-items-center">
              {rowsSelected.length === 1 ? (
                <>
                  <TableButton onClick={onClickChitiet}>Chi tiết</TableButton>
                  <TableButton onClick={onClickCapnhat}>Cập nhật</TableButton>
                  <TableButton onClick={onClickXoa}>Xóa</TableButton>
                  <TableButton onClick={handleRedirectToTaisudung}>
                    Tái sử dụng
                  </TableButton>
                </>
              ) : (
                <TableButton onClick={onClickXoa}>Xóa</TableButton>
              )}
            </div>
          </Typography>
        ) : (
          <Typography
            sx={{ flex: "1 1 100%" }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Nutrition
          </Typography>
        )}
      </Toolbar>
    </>
  ) : null;
};

const TableSanpham = ({ dsSanpham = [], setRowsRemoved }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
 

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickChitiet = () =>
    history.push(`/admin/sanpham/chitiet/${selected[0]}`);

  const onClickCapnhat = () =>
    history.push(`/admin/sanpham/chinhsua/${selected[0]}`);

  const onClickXoa = () => handleOpen();

  const handleDeleteRow = async () => {
    const { success } = await apiSanpham.xoaNhieuSanpham({
      arrOfIds: selected,
    });
    if (success) {
      toast.success("Xóa thành công!", { theme: "colored" });
      setRowsRemoved(true);
    }
  };

  const handleRedirectToTaisudung = () => {
    history.push(`/admin/sanpham/taisudung/${selected[0]}`);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsSanpham.map((item) => item._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsSanpham.length) : 0;
 //style Qrcode
  const style = {
    width: '60px',
    height: '60px'
  }
  // Get and Render Qrcode
  const [qrcode, setQrcode] = useState([])
  useEffect(() => {
    const getQrcode = async () => {
      try {
          const res = await axios.post('http://localhost:3000/api/qrcode/scan',
          { role: JSON.parse(localStorage.getItem('userInfo')).vaitro })
          setQrcode(res.data.listId)
      }catch(error) {
         console.log(error)
      }
    } 
    getQrcode()
  },[])
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            rowsSelected={selected}
            onClickChitiet={onClickChitiet}
            onClickCapnhat={onClickCapnhat}
            onClickXoa={onClickXoa}
            handleRedirectToTaisudung={handleRedirectToTaisudung}
          />
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
                rowCount={dsSanpham.length}
                headCells={headCellsSanpham}
              />
                <TableBody>
                {dsSanpham
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
                          <Link to={`/admin/sanpham/chitiet/${row._id}`}>
                            {row.ma}
                          </Link>
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <img
                            src={
                              row.hinhanh
                                ? `/uploads/${row.hinhanh}`
                                : img_placeholder
                            }
                            alt="anhcongcu"
                            style={{ width: "30px" }}
                            className={!row.hinhanh && "noImage"}
                          />
                        </TableCell>
                        <TableCell align="right">{row.ten}</TableCell>
                        <TableCell align="right">
                          {row.loaisanpham.ten}
                        </TableCell>
                        <TableCell align="right">
                          {formatMoney(row.gia)}
                        </TableCell>
                        {qrcode.map( qr => {
                          if (qr.id === row._id) 
                            return <TableCell align="right">
                                      <img style={style} src={qr.qrcode} />
                                   </TableCell>
                        })}
                        <TableCell align="right">{row.ngaytao}</TableCell>
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
            count={dsSanpham.length}
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
        open={open}
        onClose={handleClose}
        title="Xóa sản phẩm"
        content="Bạn chắc xóa sản phẩm này chứ?"
        text1="Hủy"
        text2="Xóa"
        onClick1={handleClose}
        onClick2={handleDeleteRow}
      />
    </>
  );
};

export default TableSanpham;
