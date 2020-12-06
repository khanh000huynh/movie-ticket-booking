import {
  Box,
  CircularProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookingHistory } from "../../redux/actions/ticketBookingActions";
import theme from "../../theme/theme";
import { toDMY, toYMD } from "../../utils/showDate";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
    borderRadius: 0,
    boxSizing: "border-box",
    padding: theme.spacing(4, 2, 0, 2),
    "& .MuiTableSortLabel-root": {
      color: theme.palette.text.primary,
      "& svg, & path": {
        color: theme.palette.text.primary,
      },
    },
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  container: {
    border: "1px solid " + theme.palette.grey[250],
    width: "100%",
    height: 275,
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.grey[250],
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.grey[100],
    },
  },
  loader: {
    minHeight: 520,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid " + theme.palette.grey[250],
    margin: theme.spacing(2, 0),
    "& > div": {
      color: theme.palette.warning.main,
    },
  },
  notFound: {
    color: theme.palette.grey[250],
    textAlign: "center",
  },
});

const BookingHistory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const rowsPerPage = React.useMemo(() => 10, []);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("ngayDat");
  const history = useSelector((state) => state.ticketBookingInfo.history);
  const user = useSelector((state) => state.user.credentials);

  const descendingComparator = React.useCallback((a, b, orderBy) => {
    let cloneA = a[orderBy];
    let cloneB = b[orderBy];
    if (orderBy === "ngayDat") {
      cloneA = toYMD(a[orderBy]);
      cloneB = toYMD(b[orderBy]);
    }
    if (cloneB < cloneA) {
      return -1;
    }
    if (cloneB > cloneA) {
      return 1;
    }
    return 0;
  }, []);

  const getComparator = React.useCallback(
    (order, orderBy) => {
      return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    },
    [descendingComparator]
  );

  const stableSort = React.useCallback((array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }, []);

  const summary = React.useCallback((input, length) => {
    if (input && input.length > length) return input.substr(0, length) + "...";
    return input;
  }, []);

  const createData = React.useCallback(
    (rap, danhSachGhe, tenPhim, giaVe, ngayDat) => {
      if (!history) return;
      const ghe = danhSachGhe.map((ghe) => ghe).join(", ");
      ngayDat = toDMY(new Date(ngayDat));
      return { rap, ghe, tenPhim, giaVe, ngayDat };
    },
    [history]
  );

  const columns = React.useMemo(
    () => [
      {
        id: "rap",
        label: "Rạp",
        width: "35%",
        align: "left",
      },
      {
        id: "ghe",
        label: "Ghế",
        width: "20%",
        align: "left",
      },
      { id: "tenPhim", label: "Tên phim", width: "25%", align: "left" },
      { id: "giaVe", label: "Giá vé (VND)", width: "10%", align: "right" },
      {
        id: "ngayDat",
        label: "Ngày đặt vé",
        width: "10%",
        align: "left",
      },
    ],
    []
  );

  const rows = React.useMemo(() => {
    return (
      history &&
      history.map((info) =>
        createData(
          info.rap,
          info.danhSachGhe,
          summary(info.tenPhim, 50),
          Intl.NumberFormat().format(info.giaVe),
          info.ngayDat
        )
      )
    );
  }, [history, createData, summary]);

  const handleChangePage = React.useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleRequestSort = React.useCallback(
    (property) => (event) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const renderHead = React.useCallback(() => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ width: column.width }}
          >
            {!["ghe"].includes(column.id) ? (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={handleRequestSort(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
      </TableRow>
    );
  }, [columns, order, orderBy, handleRequestSort]);

  const renderHistory = React.useCallback(
    (row) => {
      return columns.map((column) => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {value}
          </TableCell>
        );
      });
    },
    [columns]
  );

  const renderBody = React.useCallback(() => {
    return stableSort(rows, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, index) => (
        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
          {renderHistory(row)}
        </TableRow>
      ));
  }, [
    stableSort,
    rows,
    getComparator,
    order,
    orderBy,
    rowsPerPage,
    page,
    renderHistory,
  ]);

  const renderFormWithNoData = React.useCallback(() => {
    if (!history || !history.length)
      return (
        <Box className={classes.loader}>
          <CircularProgress size={80} />
        </Box>
      );
    return <Box className={classes.notFound}>Bạn chưa đặt vé lần nào.</Box>;
  }, [history, classes.loader, classes.notFound]);

  React.useEffect(() => {
    user.taiKhoan && dispatch(setBookingHistory(user.taiKhoan));
  }, [dispatch, user.taiKhoan]);

  React.useEffect(() => {
    const rowsPerPageParagraph = document.querySelector(
      "#tablePagination > div > p:nth-child(2)"
    );
    const rowsPerPageSelect = document.querySelector(
      "#tablePagination div:nth-child(3)"
    );
    if (!rowsPerPageParagraph || !rowsPerPageSelect) return;
    rowsPerPageParagraph.innerHTML = `Số dòng: ${rowsPerPage}`;
    rowsPerPageParagraph.style.marginRight = "16px";
    rowsPerPageSelect.style.display = "none";
  });

  return (
    <Box className={classes.root}>
      {rows && rows.length ? (
        <>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>{renderHead()}</TableHead>
              <TableBody>{renderBody()}</TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            id="tablePagination"
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
          />
        </>
      ) : (
        renderFormWithNoData()
      )}
    </Box>
  );
};

export default BookingHistory;
