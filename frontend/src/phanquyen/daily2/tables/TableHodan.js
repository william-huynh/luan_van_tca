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
import apiHodan from "../../../axios/apiHodan";
import { useHistory } from "react-router";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { alpha } from "@mui/material/styles";
import TableButton from "../../../components/TableButton";
import styled from "styled-components";
import { toast } from "react-toastify";
import Popup from "../../../popup/Popup";
import { useContext } from "react";
import { StateContext } from "../../../Context/StateContext";

const EnhancedTableToolbar = ({
  numSelected,
  rowsSelected,
  onClickCapnhat,
  onClickXoa,
}) => {
  return numSelected > 0 ? (
    <>
      <Toolbar
        sx={{
          pl: { sm: 8 },
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
                  <TableButton onClick={onClickCapnhat}>C???p nh???t</TableButton>
                  <TableButton onClick={onClickXoa}>X??a</TableButton>
                </>
              ) : (
                <TableButton onClick={onClickXoa}>X??a</TableButton>
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

const TableHodan = ({ dsHodan = [], setRowsRemoved, readOnly }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const history = useHistory();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickCapnhat = () =>
    history.push(`/daily2/hodan/chinhsua/${selected[0]}`);

  const onClickXoa = () => handleOpen();

  const handleDeleteRow = async () => {
    const { success } = await apiHodan.xoaNhieuHodan({ arrayOfId: selected });
    if (success) {
      toast.success("X??a th??nh c??ng!", { theme: "colored" });
      setRowsRemoved(true);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dsHodan?.map((item) => item._id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dsHodan?.length) : 0;
  const context = useContext(StateContext);
  return (
    <>
      <Popup show={context.show} />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          {!readOnly && (
            <EnhancedTableToolbar
              numSelected={selected.length}
              rowsSelected={selected}
              onClickCapnhat={onClickCapnhat}
              onClickXoa={onClickXoa}
            />
          )}
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
                rowCount={dsHodan?.length}
                headCells={headCellsHodan}
              />
              <TableBody>
                {dsHodan
                  ?.slice()
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
                            row?.daidien
                          ) : (
                            <Link to={`/daily2/hodan/chitiet/${row?._id}`}>
                              {row?.daidien}
                            </Link>
                          )}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row._id,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row?.sdt}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row._id,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row?.cmnd}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row._id,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row?.namsinh}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row._id,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row?.loaisanpham.ten}
                        </TableCell>
                        <TableCell
                          align="right"
                          onClick={() => {
                            context.handleGetQrcode(
                              row._id,
                              "hodan",
                              row.active
                            );
                          }}
                        >
                          {row?.langnghe}
                        </TableCell>
                        <TableCell align="right">
                          {row?.active ? (
                            <Badge className="success">???? k??ch ho???t</Badge>
                          ) : (
                            <Badge className="danger">Ch??? duy???t</Badge>
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
            count={dsHodan?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "s??? d??ng tr??n trang",
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
        title="X??a h??? d??n"
        content="B???n ch???c x??a nh???ng h??? d??n n??y ch????"
        text1="H???y"
        text2="X??a"
        onClick1={handleClose}
        onClick2={handleDeleteRow}
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
