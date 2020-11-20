import React from "react";
import { useDispatch } from "react-redux";
import DetailBottom from "../../components/DetailBottom/DetailBottom";
import DetailTop from "../../components/DetailTop/DetailTop";
import { setDetailMovie } from "../../redux/actions/detailActions";
import WithHeaderAndFooter from "../WithHeaderAndFooter/WithHeaderAndFooter";

const DetailPagae = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setDetailMovie(props.match.params.maPhim));
  }, [dispatch, props.match.params.maPhim]);

  return (
    <>
      <WithHeaderAndFooter>
        <DetailTop />
        <DetailBottom />
      </WithHeaderAndFooter>
    </>
  );
};

export default DetailPagae;
