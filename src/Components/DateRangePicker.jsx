// components/DateRangePicker.jsx
import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  const [selectedRange, setSelectedRange] = useState({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  const handleDateSelection = (range) => {
    setSelectedRange(range);
    if (range.from) setStartDate(format(range.from, "yyyy-MM-dd"));
    if (range.to) setEndDate(format(range.to, "yyyy-MM-dd"));
  };

  const formatRange = () => {
    const { from, to } = selectedRange;
    if (from && to) return `${format(from, "MMM dd, yyyy")} - ${format(to, "MMM dd, yyyy")}`;
    if (from) return format(from, "MMM dd, yyyy");
    return "Select range";
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="px-4 py-2 border rounded-md bg-white dark:bg-[#002760] dark:border-slate-300 shadow-sm text-sm w-48">
          {formatRange()}
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-4 bg-white dark:bg-[#002760] rounded-md shadow-lg">
        <DayPicker
          mode="range"
          selected={selectedRange}
          onSelect={handleDateSelection}
          numberOfMonths={1}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker;
