import React from "react";
import BookingHistory from "../../components/BookingHistory/BookingHistory";
import WithHeaderAndFooter from "../WithHeaderAndFooter/WithHeaderAndFooter";

const BookingHistoryPage = () => {
  return (
    <WithHeaderAndFooter>
      <BookingHistory />
    </WithHeaderAndFooter>
  );
};

export default BookingHistoryPage;
